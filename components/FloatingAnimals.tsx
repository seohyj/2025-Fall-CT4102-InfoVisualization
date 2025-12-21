"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { withBasePath } from "@/lib/basePath";

const ANIMAL_ICONS = [
  "/icons/mammals.svg",
  "/icons/birds.svg",
  "/icons/fish.svg",
  "/icons/reptiles.svg",
  "/icons/amphibians.svg",
  "/icons/insects.svg",
];

interface FloatingAnimal {
  icon: string;
  x: number; // percentage from left
  y: number; // percentage from top
  size: number; // size multiplier
  delay: number; // animation delay
  duration: number; // animation duration
}

export default function FloatingAnimals() {
  // Generate random floating animals around the globe
  const animals = useMemo(() => {
    const count = 40; // Increased number of floating animals
    const items: FloatingAnimal[] = [];

    for (let i = 0; i < count; i++) {
      // Completely random positioning
      const x = Math.random() * 100; // 0-100% across viewport
      const y = Math.random() * 100; // 0-100% down viewport

      items.push({
        icon: ANIMAL_ICONS[Math.floor(Math.random() * ANIMAL_ICONS.length)],
        x: Math.max(2, Math.min(98, x)), // Clamp to viewport with margin
        y: Math.max(2, Math.min(98, y)),
        size: 0.3 + Math.random() * 1.2, // 0.3x to 1.5x size (more variety)
        delay: Math.random() * 10, // More varied delay
        duration: 8 + Math.random() * 15, // 8-23 seconds (more variety)
      });
    }

    return items;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {animals.map((animal, index) => (
        <motion.div
          key={index}
          className="absolute opacity-30"
          style={{
            left: `${animal.x}%`,
            top: `${animal.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            y: [0, -30 + Math.random() * 60, 0],
            x: [0, -20 + Math.random() * 40, 0],
            rotate: [0, -10 + Math.random() * 20, 0],
            scale: [1, 1.1 + Math.random() * 0.3, 1],
          }}
          transition={{
            duration: animal.duration,
            delay: animal.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="relative"
            style={{
              width: `${64 * animal.size}px`,
              height: `${64 * animal.size}px`,
            }}
          >
            <Image
              src={withBasePath(animal.icon)}
              alt="Floating animal"
              width={64}
              height={64}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
