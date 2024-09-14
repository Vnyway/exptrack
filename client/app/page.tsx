"use client";

import CustomInput from "@/components/Input";
import { FormProps } from "@/types";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { registrationInputs } from "@/constants";
import { motion } from "framer-motion";
import { fadeIn } from "@/animations";
import { useEffect } from "react";

const Registration = () => {
  const form = useForm<FormProps>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const { register, formState, handleSubmit, reset } = form;
  const { errors, isSubmitSuccessful } = formState;

  const onSubmit = (data: FormProps) => {
    console.log(data);
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <section className="w-[60%] h-full flex justify-center items-center">
      <div className="w-[60%] flex flex-col gap-[32px]">
        <div className="flex flex-col">
          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeIn({
              direction: "right",
              type: "spring",
              delay: 0,
              duration: 0.8,
            })}
            className="font-medium text-[32px]">
            Welcome to Exp
            <span className="text-[#E7822C] font-semibold">Track</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeIn({
              direction: "right",
              type: "spring",
              delay: 0.2,
              duration: 0.8,
            })}
            className="font-light text-[16px]">
            A powerful tool for tracking your expenses
          </motion.p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[12px]">
          {registrationInputs.map((input, index) => (
            <CustomInput
              index={index}
              key={input.name}
              name={input.name}
              placeholder={input.placeholder}
              type={input.type}
              register={register}
              requiredMessage={input.requiredMessage}
              errors={errors?.name}
            />
          ))}
          <div className="flex flex-col gap-[15px] mt-[20px]">
            <motion.button
              initial="hidden"
              animate="show"
              variants={fadeIn({
                direction: "right",
                type: "spring",
                delay: 1,
                duration: 0.8,
              })}
              className="w-[256px] h-[59px] flex justify-center items-center text-white bg-[#C3C3C3] rounded-[12px] font-medium text-[22px]"
              type="submit">
              Create an account
            </motion.button>
            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeIn({
                direction: "right",
                type: "spring",
                delay: 1.2,
                duration: 0.8,
              })}
              className="font-thin text-[16px]">
              Already have an ccount?<Link href="/login"> Log in</Link>
            </motion.p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Registration;
