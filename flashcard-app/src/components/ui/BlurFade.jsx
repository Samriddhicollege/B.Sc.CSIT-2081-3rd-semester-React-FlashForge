import { useRef } from "react"
import { AnimatePresence, motion, useInView } from "framer-motion"
export function BlurFade({ children, className, duration = 0.4, delay = 0, yOffset = 6, inView = false, inViewMargin = "-50px", blur = "6px" }) {
  const ref = useRef(null)
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin })
  const isInView = !inView || inViewResult
  const variants = { hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` }, visible: { y: -yOffset, opacity: 1, filter: "blur(0px)" } }
  return (
    <AnimatePresence>
      <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} exit="hidden" variants={variants} transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }} className={className}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
