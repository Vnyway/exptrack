import { CustomInputProps } from "@/types";
import InputError from "./InputError";
import { motion } from "framer-motion";
import { fadeIn } from "@/animations";

const CustomInput = ({
  name,
  placeholder,
  type,
  register,
  errors,
  index,
  requiredMessage,
  reqPattern,
}: CustomInputProps) => {
  console.log(reqPattern);
  return (
    <motion.label
      initial="hidden"
      animate="show"
      variants={fadeIn({
        direction: "right",
        type: "spring",
        delay: index ? 0.4 + index * 0.2 : 0.4,
        duration: 0.8,
      })}
      htmlFor={name}
      className="flex flex-col gap-[5px]">
      <div className="flex items-center justify-between">
        <span className="capitalize font-light text-[16px]">{name}</span>
        <InputError message={errors?.[name]?.message} />
      </div>
      {reqPattern ? (
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          className="w-full h-[56px] pl-4 outline-none border-[1.5px] focus:ring-2 ring-[#3A2D31] border-opacity-35 border-[#666666] rounded-[12px]"
          {...register(name, {
            required: { value: true, message: requiredMessage },
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email",
            },
          })}
        />
      ) : (
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          className="w-full h-[56px] pl-4 outline-none border-[1.5px] focus:ring-2 ring-[#3A2D31] border-opacity-35 border-[#666666] rounded-[12px]"
          {...register(name, {
            required: { value: true, message: requiredMessage },
          })}
        />
      )}
    </motion.label>
  );
};

export default CustomInput;
