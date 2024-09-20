import { useEffect, useState, useMemo } from "react";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import {
  Container,
  MoveDirection,
  OutMode,
  ISourceOptions,
} from "@tsparticles/engine";

const StarryBackground: React.FC = () => {
  const [engineInitialized, setEngineInitialized] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setEngineInitialized(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    return new Promise((resolve) => {
      console.log("Particles loaded:", container);
      resolve();
    });
  };

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: -1, // Ensures the particles are behind all content
      },
      background: {
        color: {
          value: "#0d47a1",
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
    []
  );

  if (engineInitialized) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        particlesLoaded={particlesLoaded}
      />
    );
  }

  return null;
};

export default StarryBackground;
