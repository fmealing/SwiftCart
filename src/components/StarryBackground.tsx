// src/components/StarryBackground.tsx

import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // or loadFull if you prefer
import {
  MoveDirection,
  OutMode,
  Container,
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

  const particlesLoaded = (container?: Container) => {
    console.log("Particles loaded:", container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: true, // Disable full-screen mode
        zIndex: -1, // behind the content
      },
      background: {
        color: {
          value: "#000000", // Set background color
        },
      },
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            area: 800,
          },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.5,
        },
        size: {
          value: { min: 1, max: 3 },
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: MoveDirection.none,
          outModes: {
            default: OutMode.out,
          },
        },
      },
      interactivity: {
        events: {
          resize: true,
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!engineInitialized) {
    return null; // Don't render until the engine is initialized
  }

  return (
    <div className="starry-background">
      <Particles
        id="tsparticles"
        options={options}
        particlesLoaded={particlesLoaded}
      />
    </div>
  );
};

export default StarryBackground;
