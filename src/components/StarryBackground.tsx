import { useEffect, useState, useMemo } from "react";
import { Particles, initParticlesEngine } from "@tsparticles/react"; // Correctly import Particles as a named export
import { loadSlim } from "@tsparticles/slim"; // Use loadSlim for optimized particle size
import {
  Container,
  MoveDirection,
  OutMode,
  ISourceOptions,
} from "@tsparticles/engine";

const StarryBackground: React.FC = () => {
  const [engineInitialized, setEngineInitialized] = useState(false);

  // Run once to initialize the engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // Loads the slim version of the particles engine
    }).then(() => {
      setEngineInitialized(true); // Mark engine as initialized
    });
  }, []);

  // Handle particle loading and return a Promise
  const particlesLoaded = async (container?: Container): Promise<void> => {
    return new Promise((resolve) => {
      console.log("Particles loaded:", container);
      resolve();
    });
  };

  // Particle configuration options
  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#0d47a1", // Background color of the particle container
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [] // Empty array to memoize and avoid unnecessary re-renders
  );

  // Render the particles only if the engine is initialized
  if (engineInitialized) {
    return (
      <Particles
        id="tsparticles"
        options={options} // Particle options
        particlesLoaded={particlesLoaded} // Function triggered once particles are loaded
      />
    );
  }

  return null; // Render nothing while the engine is initializing
};

export default StarryBackground;
