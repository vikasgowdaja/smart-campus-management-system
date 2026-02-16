import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faRocket,
  faDatabase,
} from '@fortawesome/free-solid-svg-icons';

export default function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check if Three.js is available from CDN
    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded from CDN');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true, 
      alpha: true 
    });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0.1);
    camera.position.z = 5;

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 800;
    const positionArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positionArray[i] = (Math.random() - 0.5) * 2000;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 10,
      color: 0x3b82f6,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create rotating database cylinder
    const cylinderGeometry = new THREE.CylinderGeometry(3, 3, 8, 32);
    const cylinderMaterial = new THREE.MeshPhongMaterial({
      color: 0x00758f,
      emissive: 0x0d47a1,
      shininess: 100,
    });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.z = -10;
    scene.add(cylinder);

    // Add lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      particles.rotation.x += 0.0001;
      particles.rotation.y += 0.0002;
      cylinder.rotation.x += 0.005;
      cylinder.rotation.y += 0.008;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      cylinderGeometry.dispose();
      cylinderMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-content">
        <div className="hero-title">
          <FontAwesomeIcon icon={faRocket} className="hero-icon" />
          <h1>Production-Grade Database Management</h1>
        </div>

        <p className="hero-subtitle">
          Explore powerful database solutions for your enterprise applications
        </p>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-label">Major Databases</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Open Source</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">∞</span>
            <span className="stat-label">Scalability</span>
          </div>
        </div>

        <div className="hero-cta">
          <button className="btn-primary">
            <FontAwesomeIcon icon={faDatabase} className="btn-icon" />
            Get Started
          </button>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <FontAwesomeIcon icon={faChevronDown} className="scroll-icon" />
      </div>
    </section>
  );
}
