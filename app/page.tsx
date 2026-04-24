"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeContent from "./components/HomeContent/HomeContent";
import GalleryContent from "./components/GalleryContent/GalleryContent";
import MusicContent from "./components/MusicContent/MusicContent";

export interface PositionConfig {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate: string;
}

const globalScale = 1.3;

export const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const posMap: Record<string, PositionConfig> = {
  tr: { top: "offset", right: "offset", rotate: "12deg" },
  tl: { top: "offset", left: "offset", rotate: "-12deg" },
  br: { bottom: "offset", right: "offset", rotate: "12deg" },
  bl: { bottom: "offset", left: "offset", rotate: "-12deg" },
};

export default function Page() {
  const [activeTab, setActiveTab] = useState("home");

  const leftButtons = [
    {
      id: "home",
      label: "home",
      symbol: "/star2.svg",
      position: "tl",
      offset: -15,
    },
    {
      id: "gallery",
      label: "gallery",
      symbol: "/star2.svg",
      position: "tr",
      offset: -15,
    },
    {
      id: "music",
      label: "music",
      symbol: "/star3.svg",
      position: "bl",
      offset: -15,
    },
    {
      id: "blog",
      label: "blog",
      symbol: "/flower.svg",
      position: "br",
      offset: -15,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ scale: globalScale }}
        className="flex flex-col items-center justify-center origin-center"
      >
        <motion.img
          variants={itemVariants}
          className="max-w-sm w-full h-auto mb-8"
          src="/logo.svg"
          alt="Logo"
        />

        <div className="flex items-start justify-center">
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-5 w-50 mr-5"
          >
            {leftButtons.map((btn, index) => {
              const config =
                posMap[btn.position as keyof typeof posMap] || posMap.tr;
              const offsetValue = `${btn.offset ?? -12}px`;

              return (
                <motion.button
                  key={btn.id}
                  onClick={() => {
                    if (btn.id === "blog") {
                      window.open("https://t.me/desuka_pictures", "_blank");
                    } else {
                      setActiveTab(btn.id);
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative text-2xl flex-1 p-1 rounded-4xl text-center text-white font-bold transition-colors ${
                    activeTab === btn.id ? "bg-purple-500" : "bg-brand-purple"
                  }`}
                >
                  <motion.span
                    className="absolute text-2xl"
                    style={{
                      top: config.top === "offset" ? offsetValue : "auto",
                      bottom: config.bottom === "offset" ? offsetValue : "auto",
                      left: config.left === "offset" ? offsetValue : "auto",
                      right: config.right === "offset" ? offsetValue : "auto",
                      transform: `rotate(${config.rotate})`,
                    }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: index * 0.2,
                    }}
                  >
                    <img src={btn.symbol} alt="" />
                  </motion.span>
                  {btn.label}
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div
            layout
            transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
            variants={itemVariants}
            className="rounded-4xl bg-white p-5 max-w-xl flex flex-col items-center min-h-[438px] max-h-[438px] w-[576px] overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {activeTab === "home" && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col items-center"
                >
                  <HomeContent />
                </motion.div>
              )}
              {activeTab === "gallery" && (
                <motion.div
                  key="gallery"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-y-auto w-full"
                >
                  <h1 className="sticky top-1 bg-white z-10 text-3xl font-bold text-center text-gray-800">
                    Look at my arts!! :0
                  </h1>
                  <GalleryContent />
                </motion.div>
              )}
              {activeTab === "music" && (
                <motion.div
                  key="music"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col items-center overflow-y-auto"
                >
                  <MusicContent />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
