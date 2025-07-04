import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const FloatingSpheresBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // transparent background

    currentMount.appendChild(renderer.domElement);

    camera.position.z = 30;

    // Create several spheres with different sizes and colors
    const spheres = [];
    const sphereCount = 15;

    const colors = [
      0xff6b6b, 0xffcc5c, 0x88d8b0, 0x556270, 0xc7f464, 0x4eCDC4, 0xc44d58,
    ];

    for (let i = 0; i < sphereCount; i++) {
      const geometry = new THREE.SphereGeometry(
        1 + Math.random() * 2,
        32,
        32
      );
      const material = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        roughness: 0.7,
        metalness: 0.1,
        transparent: true,
        opacity: 0.8,
      });

      const sphere = new THREE.Mesh(geometry, material);

      // Random initial position in a box volume
      sphere.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20
      );

      scene.add(sphere);
      spheres.push({
        mesh: sphere,
        baseY: sphere.position.y,
        speed: 0.001 + Math.random() * 0.002,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Add subtle ambient and directional light for soft shading
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    let frameId;

    // Animation: spheres gently float up/down in sine wave pattern
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      spheres.forEach(({ mesh, baseY, speed, phase }) => {
        mesh.position.y = baseY + Math.sin(Date.now() * speed + phase) * 2;
        mesh.rotation.x += 0.001;
        mesh.rotation.y += 0.002;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;

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

      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }

      renderer.forceContextLoss();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        backgroundColor: '#fff', // dark subtle background color behind spheres
      }}
    />
  );
};

export default FloatingSpheresBackground;
