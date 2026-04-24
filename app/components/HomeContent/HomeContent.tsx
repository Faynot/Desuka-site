"use client";
import { motion } from "framer-motion";
import { itemVariants, posMap } from "../../page";

export default function HomeContent() {
  const buttons = [
    {
      label: "Telegram",
      symbol: "/heart.svg",
      icon: "/tg.svg",
      link: "#",
      position: "tr",
      offset: -17,
    },
    {
      label: "Pinterest",
      symbol: "/circle.svg",
      icon: "/pi.svg",
      link: "#",
      position: "br",
      offset: -10,
    },
    {
      label: "Tiktok",
      symbol: "/star.svg",
      icon: "/tt.svg",
      link: "#",
      position: "tr",
      offset: -15,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="w-full"
    >
      <h1 className="flex flex-col w-fit mx-auto text-5xl mb-6">
        Hello!! Im Desuka :3
        <span className="text-xs self-end">wellcome to my site</span>
      </h1>

      <div className="self-start w-full">
        <ul className="mb-2 text-2xl">
          <li className="before:content-['•'] before:mr-3">
            My real name is Arina
          </li>
          <li className="before:content-['•'] before:mr-3">Im 15 y old</li>
          <li className="before:content-['•'] before:mr-3">Im from Russia</li>
        </ul>

        <p className="mb-8 text-2xl leading-relaxed">
          I love drawing the arts, and you can{" "}
          <img
            src="/order.svg"
            alt="order"
            className="inline-block h-[1.5em] w-auto align-middle mx-1"
          />{" "}
          any from me or just look at my work ^^
        </p>

        <p className="text-2xl mb-6">LOOK AT MY SOCIAL MEDIA!!!!</p>

        <div className="flex justify-between gap-5 w-full">
          {buttons.map((btn, index) => {
            const config =
              posMap[btn.position as keyof typeof posMap] || posMap.tr;
            const offsetValue = `${btn.offset ?? -12}px`;

            return (
              <motion.a
                key={index}
                href={btn.link}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative text-2xl flex items-center px-3 flex-1 p-1 bg-brand-purple rounded-2xl text-white font-bold"
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

                <img src={btn.icon} alt="" className="flex-shrink-0" />
                <span className="flex-1 text-center">{btn.label}</span>
                <div className="invisible flex-shrink-0" aria-hidden="true">
                  <img src={btn.icon} alt="" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
