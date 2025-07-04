import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const LodExample = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 20, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Add axes helper for reference
    const axesHelper = new THREE.AxesHelper(20);
    scene.add(axesHelper);

    // Material to use for all LOD levels
    const material = new THREE.MeshNormalMaterial();

    // Create LOD object
    const lod = new THREE.LOD();

    // Level 0: high-poly icosahedron
    const highGeo = new THREE.IcosahedronGeometry(15, 4); // high detail
    const highMesh = new THREE.Mesh(highGeo, material);
    lod.addLevel(highMesh, 0);

    // Level 1: medium-poly icosahedron
    const medGeo = new THREE.IcosahedronGeometry(15, 2);
    const medMesh = new THREE.Mesh(medGeo, material);
    lod.addLevel(medMesh, 50);

    // Level 2: low-poly icosahedron
    const lowGeo = new THREE.IcosahedronGeometry(15, 0);
    const lowMesh = new THREE.Mesh(lowGeo, material);
    lod.addLevel(lowMesh, 100);

    scene.add(lod);

    // Animation Loop
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      lod.update(camera);

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);

      controls.dispose();

      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#111',
      }}
    />
  );
};

export default LodExample;
