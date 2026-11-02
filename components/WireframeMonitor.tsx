"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface WireframeMonitorProps {
  color?: string;
  className?: string;
}

export default function WireframeMonitor({
  color = "#00FF4C",
  className = "",
}: WireframeMonitorProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 1000);
    camera.position.set(0, 0.35, 6.2);
    camera.lookAt(0, -0.05, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const domElement = renderer.domElement;
    domElement.style.display = "block";
    domElement.style.width = "100%";
    domElement.style.height = "100%";
    container.appendChild(domElement);

    const handleResize = () => {
      if (!container) return;
      const size = Math.max(container.clientWidth, container.clientHeight, 340);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      renderer.setSize(size, size, false);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // 2. Materials (Matrix Neon Green with Hover Support & Solid Occlusion)
    const baseColor = new THREE.Color(color);
    const hoverColor = new THREE.Color("#00C83D");

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: baseColor.clone(),
      transparent: true,
      opacity: 0.95,
    });

    const stripeMaterial = new THREE.LineBasicMaterial({
      color: baseColor.clone(),
      transparent: true,
      opacity: 0.42,
    });

    const screenGlowMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color("#00ff66"),
      transparent: true,
      opacity: 0.9,
    });

    // Dark occlusion material so back-facing wireframes don't clutter the front view
    const occluderMaterial = new THREE.MeshBasicMaterial({
      color: 0x070a08,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    const screenGlassMaterial = new THREE.MeshBasicMaterial({
      color: 0x031407,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    // Helper: Creates a Box with solid dark occlusion, crisp outer edges, and quad grid stripes (no triangle diagonals)
    const createStripedBox = (
      w: number,
      h: number,
      d: number,
      nx = 4,
      ny = 4,
      nz = 4
    ) => {
      const group = new THREE.Group();

      const boxGeo = new THREE.BoxGeometry(w, h, d);
      const occluder = new THREE.Mesh(boxGeo, occluderMaterial);
      group.add(occluder);

      const edges = new THREE.EdgesGeometry(boxGeo);
      const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
      group.add(edgeLines);

      // Build quad grid lines on all 6 faces
      const pts: number[] = [];
      const hw = w / 2;
      const hh = h / 2;
      const hd = d / 2;

      // Front & Back faces (XY plane at ±hd)
      for (const z of [-hd, hd]) {
        for (let i = 1; i < nx; i++) {
          const x = -hw + (w * i) / nx;
          pts.push(x, -hh, z, x, hh, z);
        }
        for (let j = 1; j < ny; j++) {
          const y = -hh + (h * j) / ny;
          pts.push(-hw, y, z, hw, y, z);
        }
      }

      // Left & Right faces (YZ plane at ±hw)
      for (const x of [-hw, hw]) {
        for (let j = 1; j < ny; j++) {
          const y = -hh + (h * j) / ny;
          pts.push(x, y, -hd, x, y, hd);
        }
        for (let k = 1; k < nz; k++) {
          const z = -hd + (d * k) / nz;
          pts.push(x, -hh, z, x, hh, z);
        }
      }

      // Top & Bottom faces (XZ plane at ±hh)
      for (const y of [-hh, hh]) {
        for (let i = 1; i < nx; i++) {
          const x = -hw + (w * i) / nx;
          pts.push(x, y, -hd, x, y, hd);
        }
        for (let k = 1; k < nz; k++) {
          const z = -hd + (d * k) / nz;
          pts.push(-hw, y, z, hw, y, z);
        }
      }

      if (pts.length > 0) {
        const stripeGeo = new THREE.BufferGeometry();
        stripeGeo.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(pts, 3)
        );
        group.add(new THREE.LineSegments(stripeGeo, stripeMaterial));
      }

      return group;
    };

    // Helper: Creates a 4-sided tapered frustum (for the CRT rear shell & inner bezel bevel)
    const createFrustum = (
      wFront: number,
      hFront: number,
      wBack: number,
      hBack: number,
      depth: number,
      segU = 6,
      segV = 5,
      segZ = 5,
      openEnds = false
    ) => {
      const group = new THREE.Group();
      const hz = depth / 2;
      const wf = wFront / 2;
      const hf = hFront / 2;
      const wb = wBack / 2;
      const hb = hBack / 2;

      // 8 corners: 0..3 front (+hz), 4..7 back (-hz)
      const c = [
        [-wf, -hf, hz],
        [wf, -hf, hz],
        [wf, hf, hz],
        [-wf, hf, hz],
        [-wb, -hb, -hz],
        [wb, -hb, -hz],
        [wb, hb, -hz],
        [-wb, hb, -hz],
      ];

      const indices = [
        // 4 side walls
        0, 1, 2, 0, 2, 3, // Front
        5, 4, 7, 5, 7, 6, // Back
        4, 0, 3, 4, 3, 7, // Left
        1, 5, 6, 1, 6, 2, // Right
        3, 2, 6, 3, 6, 7, // Top
        4, 5, 1, 4, 1, 0, // Bottom
      ];

      const sideOnlyIndices = [
        4, 0, 3, 4, 3, 7, // Left
        1, 5, 6, 1, 6, 2, // Right
        3, 2, 6, 3, 6, 7, // Top
        4, 5, 1, 4, 1, 0, // Bottom
      ];

      const meshGeo = new THREE.BufferGeometry();
      const flatVerts = c.flat();
      meshGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(flatVerts, 3)
      );
      meshGeo.setIndex(openEnds ? sideOnlyIndices : indices);
      meshGeo.computeVertexNormals();

      const occluder = new THREE.Mesh(meshGeo, occluderMaterial);
      group.add(occluder);

      // Structural outer edges (12 edges of frustum)
      const edgePairs = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];
      const edgePts: number[] = [];
      for (const [a, b] of edgePairs) {
        edgePts.push(...c[a], ...c[b]);
      }
      const edgeGeo = new THREE.BufferGeometry();
      edgeGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(edgePts, 3)
      );
      group.add(new THREE.LineSegments(edgeGeo, edgeMaterial));

      // Quad stripes along the 4 sloped walls
      const stripePts: number[] = [];
      const lerp3 = (p1: number[], p2: number[], t: number) => [
        p1[0] + (p2[0] - p1[0]) * t,
        p1[1] + (p2[1] - p1[1]) * t,
        p1[2] + (p2[2] - p1[2]) * t,
      ];

      // Depth rings around the frustum
      for (let k = 1; k < segZ; k++) {
        const t = k / segZ;
        const p0 = lerp3(c[0], c[4], t);
        const p1 = lerp3(c[1], c[5], t);
        const p2 = lerp3(c[2], c[6], t);
        const p3 = lerp3(c[3], c[7], t);
        stripePts.push(
          ...p0, ...p1,
          ...p1, ...p2,
          ...p2, ...p3,
          ...p3, ...p0
        );
      }

      // Longitudinal lines on Top & Bottom faces
      for (let i = 1; i < segU; i++) {
        const t = i / segU;
        const topF = lerp3(c[3], c[2], t);
        const topB = lerp3(c[7], c[6], t);
        const botF = lerp3(c[0], c[1], t);
        const botB = lerp3(c[4], c[5], t);
        stripePts.push(...topF, ...topB, ...botF, ...botB);
      }

      // Longitudinal lines on Left & Right faces
      for (let j = 1; j < segV; j++) {
        const t = j / segV;
        const leftF = lerp3(c[0], c[3], t);
        const leftB = lerp3(c[4], c[7], t);
        const rightF = lerp3(c[1], c[2], t);
        const rightB = lerp3(c[5], c[6], t);
        stripePts.push(...leftF, ...leftB, ...rightF, ...rightB);
      }

      const stripeGeo = new THREE.BufferGeometry();
      stripeGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(stripePts, 3)
      );
      group.add(new THREE.LineSegments(stripeGeo, stripeMaterial));

      return group;
    };

    // 3. Assemble the Complete Retro CRT Computer Model
    const monitorGroup = new THREE.Group();
    scene.add(monitorGroup);

    // Upper tilting CRT head group (tilted slightly upward like classic CRT monitors)
    const crtHead = new THREE.Group();
    crtHead.position.set(0, 0.22, 0);
    crtHead.rotation.x = -0.14; // Upward tilt
    monitorGroup.add(crtHead);

    // A) Front Outer Bezel Frame (4 bars around the screen opening so the cavity is hollow)
    const outerW = 2.8;
    const outerH = 2.35;
    const innerW = 2.12;
    const innerH = 1.68;
    const bezelDepth = 0.28;
    const bezelZ = 0.78;

    const frameThickX = (outerW - innerW) / 2; // 0.34
    const frameThickY = (outerH - innerH) / 2; // 0.335

    // Top & Bottom bezel bars
    const topBar = createStripedBox(outerW, frameThickY, bezelDepth, 8, 2, 2);
    topBar.position.set(0, (innerH + frameThickY) / 2, bezelZ);
    crtHead.add(topBar);

    const botBar = createStripedBox(outerW, frameThickY, bezelDepth, 8, 2, 2);
    botBar.position.set(0, -(innerH + frameThickY) / 2, bezelZ);
    crtHead.add(botBar);

    // Left & Right bezel side bars
    const leftBar = createStripedBox(frameThickX, innerH, bezelDepth, 2, 6, 2);
    leftBar.position.set(-(innerW + frameThickX) / 2, 0, bezelZ);
    crtHead.add(leftBar);

    const rightBar = createStripedBox(frameThickX, innerH, bezelDepth, 2, 6, 2);
    rightBar.position.set((innerW + frameThickX) / 2, 0, bezelZ);
    crtHead.add(rightBar);

    // Inner Beveled Frame sloping inward from the outer opening to the CRT glass
    const screenW = 1.92;
    const screenH = 1.48;
    const bevelDepth = 0.22;
    const innerBevel = createFrustum(
      innerW,
      innerH,
      screenW,
      screenH,
      bevelDepth,
      6,
      5,
      2,
      true
    );
    innerBevel.position.set(0, 0, bezelZ - 0.03);
    crtHead.add(innerBevel);

    // B) Curved CRT Glass Screen with Quad Grid & Terminal Prompt
    const segX = 12;
    const segY = 9;
    const screenPlane = new THREE.PlaneGeometry(screenW, screenH, segX, segY);
    const posAttr = screenPlane.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const px = posAttr.getX(i);
      const py = posAttr.getY(i);
      const nx = px / (screenW / 2);
      const ny = py / (screenH / 2);
      // Subtle spherical CRT glass bulge
      const bulge = Math.cos(nx * 0.85) * Math.cos(ny * 0.85) * 0.12;
      posAttr.setZ(i, bulge);
    }
    screenPlane.computeVertexNormals();

    const screenMesh = new THREE.Mesh(screenPlane, screenGlassMaterial);
    screenMesh.position.set(0, 0, bezelZ - 0.16);
    crtHead.add(screenMesh);

    // Quad grid on the curved screen (no diagonal triangles)
    const screenGridPts: number[] = [];
    const getScreenPt = (ix: number, iy: number): [number, number, number] => {
      const px = -screenW / 2 + (screenW * ix) / segX;
      const py = -screenH / 2 + (screenH * iy) / segY;
      const nx = px / (screenW / 2);
      const ny = py / (screenH / 2);
      const pz =
        bezelZ - 0.158 + Math.cos(nx * 0.85) * Math.cos(ny * 0.85) * 0.12;
      return [px, py, pz];
    };

    for (let iy = 0; iy <= segY; iy++) {
      for (let ix = 0; ix < segX; ix++) {
        screenGridPts.push(...getScreenPt(ix, iy), ...getScreenPt(ix + 1, iy));
      }
    }
    for (let ix = 0; ix <= segX; ix++) {
      for (let iy = 0; iy < segY; iy++) {
        screenGridPts.push(...getScreenPt(ix, iy), ...getScreenPt(ix, iy + 1));
      }
    }
    const screenGridGeo = new THREE.BufferGeometry();
    screenGridGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(screenGridPts, 3)
    );
    crtHead.add(new THREE.LineSegments(screenGridGeo, stripeMaterial));

    // Terminal UI Vectors on the CRT Screen (Prompt ">" + Code lines + Blinking Cursor)
    const termPts: number[] = [];
    const projectToScreen = (x: number, y: number): [number, number, number] => {
      const nx = x / (screenW / 2);
      const ny = y / (screenH / 2);
      const z =
        bezelZ - 0.152 + Math.cos(nx * 0.85) * Math.cos(ny * 0.85) * 0.12;
      return [x, y, z];
    };

    // Prompt chevron ">"
    termPts.push(
      ...projectToScreen(-0.74, 0.46),
      ...projectToScreen(-0.62, 0.38),
      ...projectToScreen(-0.62, 0.38),
      ...projectToScreen(-0.74, 0.30)
    );
    // Code line 1
    termPts.push(
      ...projectToScreen(-0.52, 0.38),
      ...projectToScreen(0.15, 0.38)
    );
    // Code line 2 & 3
    termPts.push(
      ...projectToScreen(-0.74, 0.16),
      ...projectToScreen(0.45, 0.16),
      ...projectToScreen(-0.74, -0.02),
      ...projectToScreen(0.05, -0.02),
      ...projectToScreen(-0.74, -0.20),
      ...projectToScreen(-0.18, -0.20)
    );
    const termGeo = new THREE.BufferGeometry();
    termGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(termPts, 3)
    );
    crtHead.add(new THREE.LineSegments(termGeo, screenGlowMaterial));

    // Blinking terminal block cursor on the CRT screen
    const cursorGeo = new THREE.PlaneGeometry(0.11, 0.14);
    const cursorMat = new THREE.MeshBasicMaterial({
      color: 0x00ff4c,
      side: THREE.DoubleSide,
    });
    const cursorMesh = new THREE.Mesh(cursorGeo, cursorMat);
    const [cx, cy, cz] = projectToScreen(-0.04, -0.20);
    cursorMesh.position.set(cx, cy, cz + 0.004);
    crtHead.add(cursorMesh);

    // C) Main Monitor Mid-Casing (with vertical seam groove like the reference photo)
    const midCaseFront = createStripedBox(2.74, 2.28, 0.56, 8, 7, 3);
    midCaseFront.position.set(0, 0, 0.34);
    crtHead.add(midCaseFront);

    // Subtle inset seam between front and back housing
    const seamRing = createStripedBox(2.66, 2.20, 0.06, 4, 4, 1);
    seamRing.position.set(0, 0, 0.03);
    crtHead.add(seamRing);

    const midCaseBack = createStripedBox(2.72, 2.24, 0.54, 8, 7, 3);
    midCaseBack.position.set(0, 0, -0.27);
    crtHead.add(midCaseBack);

    // D) Tapered Rear CRT Tube Housing (Frustum) + Side Vent Grilles
    const rearShell = createFrustum(2.26, 1.72, 1.38, 1.08, 0.95, 6, 5, 5);
    rearShell.position.set(0, -0.04, -1.01);
    crtHead.add(rearShell);

    // Rear CRT cap boss
    const rearCap = createStripedBox(0.92, 0.68, 0.18, 3, 2, 1);
    rearCap.position.set(0, -0.04, -1.56);
    crtHead.add(rearCap);

    // Ventilation Grille Slots on the Left & Right sides of the Mid/Rear Housing
    const ventPts: number[] = [];
    for (const side of [-1, 1]) {
      const vx = side * 1.365;
      for (let row = 0; row < 3; row++) {
        const vy = 0.62 - row * 0.14;
        for (let col = 0; col < 5; col++) {
          const vzStart = -0.06 - col * 0.085;
          const vzEnd = vzStart - 0.05;
          ventPts.push(vx, vy, vzStart, vx, vy, vzEnd);
          ventPts.push(vx, vy - 0.04, vzStart, vx, vy - 0.04, vzEnd);
        }
      }
    }
    const ventGeo = new THREE.BufferGeometry();
    ventGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(ventPts, 3)
    );
    crtHead.add(new THREE.LineSegments(ventGeo, edgeMaterial));

    // E) Lower Control Chin (under the front bezel, with 2 left buttons + 1 right power button)
    const chinW = 2.52;
    const chinH = 0.34;
    const chinD = 1.15;
    const chin = createStripedBox(chinW, chinH, chinD, 7, 2, 4);
    chin.position.set(0, -1.33, 0.25);
    crtHead.add(chin);

    // Two small adjustment buttons on the left of the chin
    const btnLeft1 = createStripedBox(0.13, 0.16, 0.08, 2, 2, 1);
    btnLeft1.position.set(-1.02, -1.32, 0.85);
    crtHead.add(btnLeft1);

    const btnLeft2 = createStripedBox(0.13, 0.16, 0.08, 2, 2, 1);
    btnLeft2.position.set(-0.83, -1.32, 0.85);
    crtHead.add(btnLeft2);

    // Larger square power button on the right of the chin
    const btnPower = createStripedBox(0.22, 0.20, 0.10, 2, 2, 1);
    btnPower.position.set(0.84, -1.32, 0.86);
    crtHead.add(btnPower);

    // Glowing Power LED indicator
    const ledGeo = new THREE.BoxGeometry(0.06, 0.04, 0.04);
    const ledMesh = new THREE.Mesh(
      ledGeo,
      new THREE.MeshBasicMaterial({ color: 0x00ff4c })
    );
    ledMesh.position.set(1.06, -1.32, 0.84);
    crtHead.add(ledMesh);

    // F) Swivel/Tilt Pedestal Neck & Classic Stepped Rectangular Base (level with desk)
    const neck = createStripedBox(0.78, 0.42, 0.78, 3, 2, 3);
    neck.position.set(0, -1.35, 0.02);
    monitorGroup.add(neck);

    const baseUpperPad = createStripedBox(1.85, 0.08, 1.48, 6, 1, 5);
    baseUpperPad.position.set(0, -1.56, 0.08);
    monitorGroup.add(baseUpperPad);

    const basePlatform = createStripedBox(2.38, 0.22, 1.88, 8, 2, 6);
    basePlatform.position.set(0, -1.70, 0.12);
    monitorGroup.add(basePlatform);

    // Initial position & presentation angle (matching the 3/4 hero angle of the reference)
    monitorGroup.position.y = 0.25;
    monitorGroup.rotation.x = 0.08;
    monitorGroup.rotation.y = -0.48;

    // 4. Hover & Drag Interaction
    let isHovered = false;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocityY = 0.0025;
    const defaultTiltX = 0.08;

    const onPointerEnter = () => {
      isHovered = true;
      container.style.filter = "drop-shadow(0 0 6px rgba(0, 200, 61, 0.65))";
    };

    const onPointerLeave = () => {
      isHovered = false;
      container.style.filter = "drop-shadow(0 0 4px rgba(0, 255, 76, 0.5))";
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      monitorGroup.rotation.y += deltaX * 0.005;
      monitorGroup.rotation.x += deltaY * 0.004;
      monitorGroup.rotation.x = Math.max(
        -0.4,
        Math.min(0.45, monitorGroup.rotation.x)
      );

      rotationVelocityY = deltaX * 0.001;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("pointerenter", onPointerEnter);
    container.addEventListener("pointerleave", onPointerLeave);
    domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // 5. Animation Loop
    let animationFrameId: number;
    let clock = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      clock += 0.05;

      // Terminal cursor blink (step on/off like a real CRT terminal)
      cursorMesh.visible = Math.floor(clock * 0.6) % 2 === 0;

      // Smoothly transition wireframe color on hover
      const targetColor = isHovered ? hoverColor : baseColor;
      edgeMaterial.color.lerp(targetColor, 0.08);
      stripeMaterial.color.lerp(targetColor, 0.08);

      if (!isDragging) {
        rotationVelocityY = THREE.MathUtils.lerp(
          rotationVelocityY,
          0.0022,
          0.05
        );
        monitorGroup.rotation.y += rotationVelocityY;
        monitorGroup.rotation.x = THREE.MathUtils.lerp(
          monitorGroup.rotation.x,
          defaultTiltX,
          0.05
        );
      }

      renderer.render(scene, camera);
    };
    animate();

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerleave", onPointerLeave);
      domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
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
      className={`w-full h-full aspect-square cursor-grab active:cursor-grabbing select-none relative flex items-center justify-center transition-[filter] duration-500 ease-out ${className}`}
      style={{
        filter: "drop-shadow(0 0 4px rgba(0, 255, 76, 0.5))",
      }}
    />
  );
}
