"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface WireframeCoreProps {
  color?: string;
  className?: string;
}

/** A small exploded CPU diagram; dragging is optional, never required to read content. */
export default function WireframeCore({
  color = "#00FF4C",
  className = "",
}: WireframeCoreProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      // The server-rendered diagram remains visible without WebGL.
      return;
    }

    const fallback = fallbackRef.current;
    if (fallback) fallback.hidden = true;
    const canvas = renderer.domElement;
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText =
      "display:block;width:100%;height:100%;touch-action:pan-y pinch-zoom";
    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        window.matchMedia("(pointer: coarse)").matches ? 1.5 : 2,
      ),
    );
    renderer.setClearColor(0x000000, 0);
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 30);
    camera.position.set(5.5, 4.6, 6.4);
    camera.lookAt(0, 0, 0);
    const core = new THREE.Group();
    scene.add(core);

    const mainMaterial = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.9,
    });
    const mutedMaterial = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.28,
    });
    const packetMaterial = new THREE.MeshBasicMaterial({ color });
    const geometries = new Set<THREE.BufferGeometry>();
    const box = (
      width: number,
      height: number,
      depth: number,
      material = mainMaterial,
    ) => {
      const source = new THREE.BoxGeometry(width, height, depth);
      const geometry = new THREE.EdgesGeometry(source);
      source.dispose();
      geometries.add(geometry);
      return new THREE.LineSegments(geometry, material);
    };
    const line = (points: THREE.Vector3[], material = mutedMaterial) => {
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      geometries.add(geometry);
      return new THREE.Line(geometry, material);
    };

    // Three separated layers expose the chip's architecture like a service manual.
    const plates = [
      { size: 2.65, y: -0.64 },
      { size: 2.25, y: 0 },
      { size: 1.7, y: 0.68 },
    ];
    for (const { size, y } of plates) {
      const plate = box(size, 0.14, size);
      plate.position.y = y;
      core.add(plate);
      for (let i = -2; i <= 2; i++) {
        const offset = (i * size) / 6;
        core.add(
          line([
            new THREE.Vector3(-size / 2, y + 0.075, offset),
            new THREE.Vector3(size / 2, y + 0.075, offset),
          ]),
        );
        core.add(
          line([
            new THREE.Vector3(offset, y + 0.075, -size / 2),
            new THREE.Vector3(offset, y + 0.075, size / 2),
          ]),
        );
      }
    }

    // The base has twelve socket pins per edge, joined to a floating die.
    for (const side of [-1, 1]) {
      for (let i = -5; i <= 5; i++) {
        const pin = box(0.085, 0.1, 0.38, mutedMaterial);
        pin.position.set(i * 0.2, -0.64, side * 1.48);
        core.add(pin);
        const perpendicular = box(0.38, 0.1, 0.085, mutedMaterial);
        perpendicular.position.set(side * 1.48, -0.64, i * 0.2);
        core.add(perpendicular);
      }
    }
    for (const x of [-0.7, 0.7]) {
      for (const z of [-0.7, 0.7]) {
        core.add(
          line([new THREE.Vector3(x, -0.56, z), new THREE.Vector3(x, 0.61, z)]),
        );
      }
    }
    const die = box(0.68, 0.09, 0.68);
    die.position.y = 0.82;
    core.add(die);

    // Data packets travel a square bus rather than an ornamental planetary orbit.
    const busSize = 2.12;
    const busY = -0.1;
    core.add(
      line([
        new THREE.Vector3(-busSize, busY, -busSize),
        new THREE.Vector3(busSize, busY, -busSize),
        new THREE.Vector3(busSize, busY, busSize),
        new THREE.Vector3(-busSize, busY, busSize),
        new THREE.Vector3(-busSize, busY, -busSize),
      ]),
    );
    const packetGeometry = new THREE.BoxGeometry(0.09, 0.09, 0.09);
    geometries.add(packetGeometry);
    const packets = Array.from({ length: 4 }, () => {
      const packet = new THREE.Mesh(packetGeometry, packetMaterial);
      core.add(packet);
      return packet;
    });
    const placePackets = (progress: number) => {
      packets.forEach((packet, index) => {
        const position = (progress + index) % 4;
        const edge = Math.floor(position);
        const offset = (position - edge) * busSize * 2;
        if (edge === 0) packet.position.set(-busSize + offset, busY, -busSize);
        else if (edge === 1)
          packet.position.set(busSize, busY, -busSize + offset);
        else if (edge === 2)
          packet.position.set(busSize - offset, busY, busSize);
        else packet.position.set(-busSize, busY, busSize - offset);
      });
    };
    placePackets(0.3);

    let visible = true;
    let dragging = false;
    let pointerId: number | null = null;
    let previousX = 0;
    let dirty = true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      camera.aspect = width / height;
      camera.zoom = Math.min(1, camera.aspect);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      dirty = true;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      dirty = true;
    });
    visibilityObserver.observe(container);

    const pointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      dragging = true;
      pointerId = event.pointerId;
      previousX = event.clientX;
    };
    const pointerMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return;
      core.rotation.y += (event.clientX - previousX) * 0.008;
      previousX = event.clientX;
      dirty = true;
    };
    const pointerUp = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      dragging = false;
      pointerId = null;
    };
    canvas.addEventListener("pointerdown", pointerDown);
    window.addEventListener("pointermove", pointerMove);
    window.addEventListener("pointerup", pointerUp);
    window.addEventListener("pointercancel", pointerUp);

    let frame = 0;
    let lastTime = 0;
    let progress = 0.3;
    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);
      if (!visible || document.hidden) {
        lastTime = time;
        return;
      }
      if (time - lastTime < 32) return;
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      if (!reducedMotion.matches) {
        if (!dragging) core.rotation.y += delta * 0.12;
        progress += delta * 0.32;
        placePackets(progress);
        dirty = true;
      }
      if (dirty) {
        renderer.render(scene, camera);
        dirty = false;
      }
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerup", pointerUp);
      window.removeEventListener("pointercancel", pointerUp);
      geometries.forEach((geometry) => geometry.dispose());
      mainMaterial.dispose();
      mutedMaterial.dispose();
      packetMaterial.dispose();
      scene.clear();
      renderer.dispose();
      canvas.remove();
      if (fallback) fallback.hidden = false;
    };
  }, [color]);

  return (
    <div
      ref={mountRef}
      role="img"
      aria-label="Microprocessador em wireframe: três camadas conectadas por pinos e um barramento de dados."
      className={`relative w-full h-full aspect-square select-none cursor-grab active:cursor-grabbing ${className}`}
    >
      <div ref={fallbackRef} className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-[19%] flex items-center justify-center border font-mono text-lg"
          style={{ color, borderColor: color }}
        >
          <div
            className="absolute inset-3 border"
            style={{ borderColor: color }}
          />
          <div
            className="absolute inset-6 border"
            style={{ borderColor: color }}
          />
          <span className="relative px-2 bg-[#0a0a0a]">CORE / 03</span>
        </div>
        <span className="absolute bottom-[12%] left-0 right-0 text-center font-mono text-sm text-zinc-400">
          ESQUEMA ESTÁTICO · WEBGL INDISPONÍVEL
        </span>
      </div>
    </div>
  );
}
