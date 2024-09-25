import { motion } from "framer-motion";
import { MotionPathProps } from "@/types";

const MotionPath = ({
  d,
  selected,
  transitionDuration = 0,
}: MotionPathProps) => {
  return (
    <motion.path
      d={d}
      style={{ transition: `all ease-out ${transitionDuration}s` }}
      variants={{
        initial: { fill: selected ? "#FFFFFF" : "#4FD1C5" },
        hover: { fill: selected ? "#4FD1C5" : "#FFFFFF" },
      }}
    />
  );
};

export default MotionPath;
