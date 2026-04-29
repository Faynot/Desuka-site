"use client";
import { useState, useEffect } from "react"; // Добавили useEffect
import { createPortal } from "react-dom"; // Добавили createPortal
import { motion, AnimatePresence } from "framer-motion";
import { posMap } from "../../page";

export default function GalleryContent() {
  const [arts] = useState<string[]>([
    "https://i.imgur.com/47D1SPZ.jpeg",
    "https://i.imgur.com/8CuT7hp.jpeg",
    "https://i.imgur.com/47D1SPZ.jpeg",
    "https://i.imgur.com/8CuT7hp.jpeg",
  ]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Ждем, пока компонент смонтируется, чтобы иметь доступ к document
  useEffect(() => {
    setMounted(true);
  }, []);

  const symbols = ["/heart.svg", "/star.svg", "/circle.svg", "/flower.svg"];

  const dottedBackground = {
    backgroundColor: "#ffffff",
    backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
    backgroundSize: "20px 20px",
  };

  return (
    <div className="w-full py-12 px-6" style={dottedBackground}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {arts.map((image, i) => {
            const isEven = i % 2 === 0;
            const posKey = isEven ? "tr" : "br";
            const config = posMap[posKey];
            const symbol = symbols[i % symbols.length];
            const offsetValue = "-12px";

            return (
              <div
                key={i}
                className="flex items-center justify-center"
                style={{ isolation: "isolate" }}
              >
                <div className="relative inline-block">
                  <motion.div
                    className="absolute pointer-events-none"
                    style={{
                      zIndex: 10,
                      top:
                        "top" in config && config.top === "offset"
                          ? offsetValue
                          : "auto",
                      bottom:
                        "bottom" in config && config.bottom === "offset"
                          ? offsetValue
                          : "auto",
                      left:
                        "left" in config && config.left === "offset"
                          ? offsetValue
                          : "auto",
                      right:
                        "right" in config && config.right === "offset"
                          ? offsetValue
                          : "auto",
                      transform: `rotate(${config.rotate})`,
                    }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: i * 0.3,
                    }}
                  >
                    <img
                      src={symbol}
                      alt=""
                      className="w-8 h-8 select-none"
                      style={{ display: "block" }}
                    />
                  </motion.div>

                  <img
                    src={image}
                    alt={`Art ${i + 1}`}
                    onClick={() => setSelectedImage(image)}
                    className="block h-auto max-w-full rounded-2xl cursor-pointer transition-opacity hover:opacity-90"
                    style={{
                      position: "relative",
                      zIndex: 1,
                      filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.1))",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Используем портал, чтобы модалка вылетела за пределы scaled контейнера */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                // pointer-events-auto гарантирует кликабельность, z-[9999] поверх всего
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                style={{
                  // Явно сбрасываем масштаб для модалки, если вдруг родительские стили просочатся
                  transform: "none",
                }}
              >
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  src={selectedImage}
                  alt="Full size"
                  className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />

                <button
                  className="absolute top-6 right-6 text-white text-5xl font-light hover:text-gray-300 transition-colors"
                  onClick={() => setSelectedImage(null)}
                >
                  &times;
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
