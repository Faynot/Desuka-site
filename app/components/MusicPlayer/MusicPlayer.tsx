"use client";

import React, { useEffect, useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MusicPlayerProps {
  title: string;
  artist: string;
  cover: string;
  source: string;
}

export default function MusicPlayer({
  title,
  artist,
  cover,
  source,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [offset, setOffset] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const requestRef = useRef<number | null>(null);

  const SVG_WIDTH = 400;
  const WAVE_STEP = 30;

  const animate = () => {
    if (isPlaying) {
      setOffset((prev) => (prev + 0.3) % WAVE_STEP);
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  const wavePath = `M 0 20 Q 7.5 15, 15 20 T 30 20 T 45 20 T 60 20 T 75 20 T 90 20 T 105 20 T 120 20 T 135 20 T 150 20 T 165 20 T 180 20 T 195 20 T 210 20 T 225 20 T 240 20 T 255 20 T 270 20 T 285 20 T 300 20 T 315 20 T 330 20 T 345 20 T 360 20 T 375 20 T 390 20 T 405 20 T 420 20 T 435 20 T 450 20 T 465 20`;

  const currentX = progress * SVG_WIDTH;

  let strokeDashLength = 0;
  let dashOffsetValue = -offset;

  if (pathRef.current) {
    const totalPathLength = pathRef.current.getTotalLength();
    const pathScale = totalPathLength / 465;
    strokeDashLength = currentX * pathScale;
    dashOffsetValue = -offset * pathScale;
  }

  return (
    <div className="w-[100%] flex items-center gap-5">
      <audio
        ref={audioRef}
        src={source}
        onTimeUpdate={() => {
          const audio = audioRef.current;
          if (audio && isFinite(audio.duration) && audio.duration > 0) {
            setProgress(audio.currentTime / audio.duration);
          }
        }}
        onEnded={() => setIsPlaying(false)}
      />

      <img
        src={cover}
        className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow-sm"
        alt="cover"
      />

      <motion.button
        whileHover={{ scale: 1.08, backgroundColor: "#D8C7FF" }}
        whileTap={{ scale: 0.92 }}
        onClick={() => {
          if (!audioRef.current) return;
          isPlaying
            ? audioRef.current.pause()
            : audioRef.current.play().catch(console.error);
          setIsPlaying(!isPlaying);
        }}
        className="w-16 h-16 rounded-2xl bg-[#EADDFF] border-none cursor-pointer flex items-center justify-center text-[#21005D] flex-shrink-0 relative overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isPlaying ? "pause" : "play"}
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause fill="currentColor" size={32} />
            ) : (
              <Play fill="currentColor" size={32} className="ml-1" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      <div className="flex flex-col flex-grow gap-[2px]">
        <div className="relative h-[35px] flex items-center">
          <svg
            width="100%"
            height="36"
            viewBox={`0 0 ${SVG_WIDTH} 40`}
            preserveAspectRatio="none"
            className="overflow-visible block"
          >
            <line
              x1={currentX}
              y1="20"
              x2={SVG_WIDTH}
              y2="20"
              stroke="#E6E0E9"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              ref={pathRef}
              d={wavePath}
              fill="none"
              stroke="#6750A4"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: `translateX(${-offset}px)`,
                strokeDasharray: `${strokeDashLength}, 5000`,
                strokeDashoffset: dashOffsetValue,
                transition: "none",
              }}
            />
            <motion.circle
              cx={currentX}
              cy="20"
              r="10"
              fill="#6750A4"
              animate={{ r: isPlaying ? 12 : 10 }}
              className="transition-none"
            />
          </svg>

          <input
            type="range"
            min="0"
            max="1"
            step="0.0001"
            value={progress}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (audioRef.current && isFinite(audioRef.current.duration)) {
                audioRef.current.currentTime = val * audioRef.current.duration;
                setProgress(val);
              }
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
        </div>

        <div className="pl-[2px]">
          <div className="text-[14px] text-[#1C1B1F] leading-[1.2] font-medium">
            {title}
          </div>
          <div className="text-[12px] text-[#49454F]">{artist}</div>
        </div>
      </div>
    </div>
  );
}
