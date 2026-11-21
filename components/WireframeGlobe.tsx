"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface WireframeGlobeProps {
  color?: string;
  className?: string;
}

export default function WireframeGlobe({
  color = "#5C29EA",
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.matchMedia("(pointer: coarse)").matches ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0); // 100% transparent background
    
    const domElement = renderer.domElement;
    container.appendChild(domElement);

    const handleResize = () => {
      if (!container) return;
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      camera.aspect = width / height;
      // Fit the complete model even in a narrow container.
      camera.zoom = Math.min(1, camera.aspect);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    visibilityObserver.observe(container);

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
    const hoverColor = new THREE.Color("#5C29EA");
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
    };

    const onPointerOut = () => {
      isHovered = false;
    };

    domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("pointerenter", onPointerOver);
    container.addEventListener("pointerleave", onPointerOut);

    // 4. Animation Loop
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible || document.hidden) return;

      if (!isDragging && !reducedMotion.matches) {
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
      visibilityObserver.disconnect();
      domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("pointerenter", onPointerOver);
      container.removeEventListener("pointerleave", onPointerOut);
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      scene.clear();
      renderer.dispose();
    };
  }, [color]);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full aspect-square cursor-grab active:cursor-grabbing select-none relative flex items-center justify-center [filter:drop-shadow(0_0_3px_rgba(92,41,234,0.45))] hover:[filter:drop-shadow(0_0_5px_rgba(92,41,234,0.6))] transition-[filter] duration-500 ease-[ease] [&>canvas]:block [&>canvas]:size-full [&>canvas]:[touch-action:pan-y_pinch-zoom] ${className}`}
    />
  );
}
