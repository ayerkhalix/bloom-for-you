"use client"

import { motion } from "framer-motion"

interface FlowerProps {
  type: "rose" | "lily"
  x: number
  bottomVh: number
  heightVh: number
  id: number
}

function RoseFlower() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 80 120"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stem */}
      <motion.path
        d="M40 120 Q38 90 40 55"
        stroke="#8b6aad"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      {/* Left leaf */}
      <motion.path
        d="M38 85 Q25 75 20 82 Q25 90 38 85Z"
        fill="#9b7ab8"
        fillOpacity={0.8}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      />
      {/* Right leaf */}
      <motion.path
        d="M42 75 Q55 65 58 72 Q53 80 42 75Z"
        fill="#9b7ab8"
        fillOpacity={0.8}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
      />
      {/* Outer petals - lavender */}
      <motion.ellipse
        cx="40" cy="42" rx="18" ry="16"
        fill="#c4a8e0"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
      />
      {/* Middle petals - soft purple */}
      <motion.ellipse
        cx="34" cy="38" rx="12" ry="14"
        fill="#b08ed0"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.4 }}
      />
      <motion.ellipse
        cx="46" cy="38" rx="12" ry="14"
        fill="#b08ed0"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.4 }}
      />
      {/* Top petal - light lavender with pink hint */}
      <motion.ellipse
        cx="40" cy="32" rx="10" ry="13"
        fill="#d4b8e8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      />
      {/* Inner glow - subtle pink accent */}
      <motion.ellipse
        cx="40" cy="38" rx="6" ry="7"
        fill="#c87aaa"
        fillOpacity={0.6}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ delay: 0.65, duration: 0.3 }}
      />
      {/* Highlight */}
      <motion.ellipse
        cx="36" cy="34" rx="3" ry="4"
        fill="white"
        fillOpacity={0.3}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.7, duration: 0.3 }}
      />
    </svg>
  )
}

function LilyFlower() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 80 130"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main stem */}
      <motion.path
        d="M40 130 Q42 95 40 50"
        stroke="#8b6aad"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      {/* Left small stem */}
      <motion.path
        d="M39 80 Q28 72 25 60"
        stroke="#8b6aad"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      />
      {/* Left leaf pair */}
      <motion.path
        d="M38 95 Q22 88 18 95 Q24 102 38 95Z"
        fill="#9b7ab8"
        fillOpacity={0.7}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.3 }}
      />
      <motion.path
        d="M42 88 Q56 80 60 87 Q54 94 42 88Z"
        fill="#9b7ab8"
        fillOpacity={0.7}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      />
      {/* Main flower petals - top - lavender */}
      <motion.path
        d="M40 22 Q32 35 26 42 Q34 44 40 38 Q46 44 54 42 Q48 35 40 22Z"
        fill="#d4b8e8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      />
      {/* Left petal */}
      <motion.path
        d="M26 42 Q18 34 22 26 Q30 30 32 38Z"
        fill="#c4a8e0"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.4 }}
      />
      {/* Right petal */}
      <motion.path
        d="M54 42 Q62 34 58 26 Q50 30 48 38Z"
        fill="#c4a8e0"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.4 }}
      />
      {/* Center - pink accent */}
      <motion.circle
        cx="40" cy="40" r="5"
        fill="#c87aaa"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.65, duration: 0.3 }}
      />
      {/* Highlight */}
      <motion.circle
        cx="38" cy="38" r="2"
        fill="white"
        fillOpacity={0.35}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 0.7, duration: 0.3 }}
      />
      {/* Side bud on left stem - lavender */}
      <motion.ellipse
        cx="25" cy="58" rx="6" ry="8"
        fill="#c4a8e0"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      />
      <motion.ellipse
        cx="24" cy="56" rx="3" ry="4"
        fill="#d4b8e8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ delay: 0.55, duration: 0.3 }}
      />
    </svg>
  )
}

export function Flower({ type, x, bottomVh, heightVh, id }: FlowerProps) {
  // SVG viewBox aspect ratios: rose=80/120, lily=80/130
  // Container width must be proportional to height for SVG to fill vertically
  const aspectRatio = type === "rose" ? 80 / 120 : 80 / 130
  // Width in vw units, derived from height in vh
  const widthVw = heightVh * aspectRatio

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        bottom: `${bottomVh}vh`,
        height: `${heightVh}vh`,
        width: `${widthVw}vw`,
        marginLeft: `-${widthVw / 2}vw`,
        transformOrigin: "bottom center",
      }}
      initial={{ opacity: 0, scaleY: 0, y: 10 }}
      animate={{
        opacity: 1,
        scaleY: 1,
        y: 0,
      }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
    >
      {/* Gentle swaying after bloom */}
      <motion.div
        className="h-full w-full"
        animate={{
          rotate: [0, -2, 2, -1.5, 1.5, 0],
        }}
        transition={{
          duration: 4 + (id % 3),
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{ transformOrigin: "bottom center" }}
      >
        {type === "rose" ? <RoseFlower /> : <LilyFlower />}
      </motion.div>
    </motion.div>
  )
}
