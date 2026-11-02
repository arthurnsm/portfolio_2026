"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface WireframeGlobeProps {
  color?: string;
  className?: string;
}

export default function WireframeGlobe({
  color = "#00FF4C",
  className = "",
}: WireframeGlobeProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 5.4;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // 100% transparent background
    
    const domElement = renderer.domElement;
    domElement.style.display = "block";
    domElement.style.width = "100%";
    domElement.style.height = "100%";
    container.appendChild(domElement);

    const handleResize = () => {
      if (!container) return;
      const size = Math.max(container.clientWidth, container.clientHeight, 400);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      renderer.setSize(size, size, false);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // 2. Build Grid Sphere (Original Single-Layer Latitudes + Longitudes)
    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = 0.45;
    globeGroup.rotation.z = -0.1;
    scene.add(globeGroup);

    const radius = 1.8;
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.95,
    });

    const latCount = 14;
    const lonCount = 16;
    const segments = 64;

    // Latitude rings (horizontal circles)
    for (let i = 1; i < latCount; i++) {
      const phi = (i / latCount) * Math.PI - Math.PI / 2;
      const r = radius * Math.cos(phi);
      const y = radius * Math.sin(phi);

      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      globeGroup.add(line);
    }

    // Longitude lines (meridian great circles passing through poles)
    for (let i = 0; i < lonCount; i++) {
      const theta = (i / lonCount) * Math.PI;
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= segments; j++) {
        const phi = (j / segments) * Math.PI * 2;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        points.push(new THREE.Vector3(x, y, z));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      globeGroup.add(line);
    }

    // 3. Mouse / Touch Drag Interaction & Smooth Momentum
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocityY = -0.0025;
    const defaultTiltX = 0.45;

    const baseColor = new THREE.Color(color);
    const hoverColor = new THREE.Color("#00C83D");
    let isHovered = false;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;

      // Only horizontal (X-axis drag) rotates the globe around its Y axis
      globeGroup.rotation.y += deltaX * 0.0006;
      rotationVelocityY = deltaX * 0.00015;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onPointerOver = () => {
      isHovered = true;
      container.style.filter = "drop-shadow(0 0 5px rgba(0, 200, 61, 0.6))";
    };

    const onPointerOut = () => {
      isHovered = false;
      container.style.filter = "drop-shadow(0 0 3px rgba(0, 255, 76, 0.45))";
    };

    domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointerenter", onPointerOver);
    container.addEventListener("pointerleave", onPointerOut);

    // 4. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        // Smoothly return to default slow leftward spin
        rotationVelocityY = THREE.MathUtils.lerp(rotationVelocityY, -0.0025, 0.03);
        globeGroup.rotation.y += rotationVelocityY;
      }

      // Keep vertical tilt locked and stable
      globeGroup.rotation.x = defaultTiltX;

      // Smooth color transition
      const targetColor = isHovered ? hoverColor : baseColor;
      lineMaterial.color.lerp(targetColor, 0.05);

      renderer.render(scene, camera);
    };
    animate();

    // 5. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerenter", onPointerOver);
      container.removeEventListener("pointerleave", onPointerOut);
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [color]);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full aspect-square cursor-grab active:cursor-grabbing select-none relative flex items-center justify-center ${className}`}
      style={{
        filter: "drop-shadow(0 0 3px rgba(0, 255, 76, 0.45))",
        transition: "filter 0.5s ease",
      }}
    />
  );
}
