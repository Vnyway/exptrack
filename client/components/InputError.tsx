import { InputErrorProps } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

const InputError = ({ message }: InputErrorProps) => {
  return (
    <div className="h-[27px]">
      <AnimatePresence mode="wait">
        {message && (
          <motion.span
            key="error-message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="font-[400] text-[14px] px-[5px] py-[3px] bg-[#3BCBBE] bg-opacity-80 text-white rounded-[4px] flex justify-center items-center">
            {message}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InputError;
