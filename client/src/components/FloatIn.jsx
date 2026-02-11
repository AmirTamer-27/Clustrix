import { motion } from "framer-motion";

export default function FloatIn({
    children,
    delay = 0,
    direction = "up",
    distance = 30,
}) {
    let initialY = 0;
    let initialX = 0;

    if (direction === "up") initialY = distance;
    if (direction === "down") initialY = -distance;
    if (direction === "left") initialX = distance;
    if (direction === "right") initialX = -distance;

    return (
        <motion.div
            initial={{ opacity: 0, x: initialX, y: initialY }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: delay,
            }}
        >
            {children}
        </motion.div>
    );
}
