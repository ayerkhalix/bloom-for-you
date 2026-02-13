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
      viewBox="0 0 100 140"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stem */}
      <motion.path
        d="M50 140 Q48 100 50 70"
        stroke="#8e7bb5"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Leaves */}
      <motion.path
        d="M48 105 Q25 95 22 105 Q35 115 48 105Z"
        fill="#7fb27f"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      />
      <motion.path
        d="M52 95 Q75 85 78 95 Q65 105 52 95Z"
        fill="#6aa86a"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.35, duration: 0.4 }}
      />

      {/* Outer Petals */}
      <motion.path
        d="M50 40 
           Q25 55 35 75 
           Q50 85 65 75 
           Q75 55 50 40Z"
        fill="#b784e5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />

      {/* Mid Petals */}
      <motion.path
        d="M50 45 
           Q35 58 42 70 
           Q50 75 58 70 
           Q65 58 50 45Z"
        fill="#c996f0"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      />

      {/* Inner Petals */}
      <motion.path
        d="M50 48 
           Q42 58 46 65 
           Q50 68 54 65 
           Q58 58 50 48Z"
        fill="#e1b5ff"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
      />

      {/* Spiral Center */}
      <motion.path
        d="M50 55 
           Q48 52 52 50 
           Q56 52 53 56 
           Q49 60 46 56"
        stroke="#a15ecb"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />

      {/* Highlight */}
      <motion.path
        d="M42 52 Q47 48 55 50"
        stroke="#ffffff"
        strokeOpacity={0.4}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      />
    </svg>
  )
}
function LilyFlower() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 140"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stem */}
      <motion.path
        d="M50 140 Q48 100 50 75"
        stroke="#8e7bb5"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Leaves */}
      <motion.path
        d="M48 115 Q25 105 22 115 Q35 125 48 115Z"
        fill="#7fb27f"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        style={{ transformOrigin: "48px 115px" }}
      />
      <motion.path
        d="M52 110 Q75 100 78 110 Q65 120 52 110Z"
        fill="#6aa86a"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        style={{ transformOrigin: "52px 110px" }}
      />

      {/* Blooming Petals */}
      <g transform="translate(0, 5)">
        {/* Back Left Petal */}
        <motion.path
          d="M50 75 Q25 65 30 40 Q50 45 50 75Z"
          fill="#9d79c3"
          initial={{ rotate: -65, scaleY: 0.6 }}
          animate={{ rotate: [-65, -10, -15], scaleY: [0.6, 1.1, 1] }}
          transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
          style={{ transformOrigin: "50px 75px" }}
        />

        {/* Back Right Petal */}
        <motion.path
          d="M50 75 Q75 65 70 40 Q50 45 50 75Z"
          fill="#9d79c3"
          initial={{ rotate: 65, scaleY: 0.6 }}
          animate={{ rotate: [65, 10, 15], scaleY: [0.6, 1.1, 1] }}
          transition={{ delay: 0.45, duration: 0.9, ease: "easeOut" }}
          style={{ transformOrigin: "50px 75px" }}
        />

        {/* Top Center Petal */}
        <motion.path
          d="M50 75 Q35 45 50 20 Q65 45 50 75Z"
          fill="#be95f2"
          initial={{ scaleY: 0.2 }}
          animate={{ scaleY: [0.2, 1.1, 1] }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          style={{ transformOrigin: "50px 75px" }}
        />

        {/* Front Left Petal */}
        <motion.path
          d="M50 75 Q32 60 40 50 Q48 58 50 75Z"
          fill="#d8b8ff"
          initial={{ rotate: -45, scale: 0.6 }}
          animate={{ rotate: [-45, -2, -5], scale: [0.6, 1.05, 1] }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "50px 75px" }}
        />

        {/* Front Right Petal */}
        <motion.path
          d="M50 75 Q68 60 60 50 Q52 58 50 75Z"
          fill="#d8b8ff"
          initial={{ rotate: 45, scale: 0.6 }}
          animate={{ rotate: [45, 2, 5], scale: [0.6, 1.05, 1] }}
          transition={{ delay: 0.65, duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "50px 75px" }}
        />
{/* Animated Stamen */}
<motion.g
  initial="hidden"
  animate="visible"
  transition={{ delay: 1.1 }}
  style={{ transformOrigin: "50px 70px" }}
>
  {/* Filaments draw upward */}
  <motion.path
    d="M50 70 L44 52"
    stroke="#f5f0dc"
    strokeWidth="2"
    strokeLinecap="round"
    variants={{
      hidden: { pathLength: 0 },
      visible: {
        pathLength: 1,
        transition: { duration: 0.6, ease: "easeOut" },
      },
    }}
  />

  <motion.path
    d="M50 70 L50 48"
    stroke="#f5f0dc"
    strokeWidth="2"
    strokeLinecap="round"
    variants={{
      hidden: { pathLength: 0 },
      visible: {
        pathLength: 1,
        transition: { duration: 0.7, ease: "easeOut", delay: 0.05 },
      },
    }}
  />

  <motion.path
    d="M50 70 L56 52"
    stroke="#f5f0dc"
    strokeWidth="2"
    strokeLinecap="round"
    variants={{
      hidden: { pathLength: 0 },
      visible: {
        pathLength: 1,
        transition: { duration: 0.6, ease: "easeOut", delay: 0.1 },
      },
    }}
  />

  {/* Buds bounce in */}
  <motion.circle
    cx="44"
    cy="52"
    r="2.5"
    fill="#f8f4e6"
    initial={{ scale: 0, y: 4 }}
    animate={{ scale: [0, 1.3, 1], y: [4, -2, 0] }}
    transition={{ delay: 1.6, duration: 0.5, ease: "easeOut" }}
    style={{ transformOrigin: "44px 52px" }}
  />

  <motion.circle
    cx="50"
    cy="48"
    r="2.5"
    fill="#f8f4e6"
    initial={{ scale: 0, y: 4 }}
    animate={{ scale: [0, 1.3, 1], y: [4, -2, 0] }}
    transition={{ delay: 1.65, duration: 0.5, ease: "easeOut" }}
    style={{ transformOrigin: "50px 48px" }}
  />

  <motion.circle
    cx="56"
    cy="52"
    r="2.5"
    fill="#f8f4e6"
    initial={{ scale: 0, y: 4 }}
    animate={{ scale: [0, 1.3, 1], y: [4, -2, 0] }}
    transition={{ delay: 1.7, duration: 0.5, ease: "easeOut" }}
    style={{ transformOrigin: "56px 52px" }}
  />
</motion.g>

      </g>
    </svg>
  )
}



export function Flower({ type, x, bottomVh, heightVh, id }: FlowerProps) {
  const aspectRatio =
    type === "rose"
      ? 100 / 140
      : 100 / 180

  const widthVw = heightVh * aspectRatio

  const swayAngle = 1 + (id % 4) * 0.5
  const swayDuration = 3 + (id % 5)
  const swayDelay = (id % 7) * 0.2

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
      initial={{ opacity: 0, scale: 0.6, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      <motion.div
        className="h-full w-full"
        animate={{
          rotate: [
            0,
            -swayAngle,
            swayAngle * 1.2,
            -swayAngle * 0.8,
            swayAngle * 0.6,
            0,
          ],
        }}
        transition={{
          duration: swayDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1 + swayDelay,
        }}
        style={{ transformOrigin: "bottom center" }}
      >
        {type === "rose" ? <RoseFlower /> : <LilyFlower />}
      </motion.div>
    </motion.div>
  )
}
