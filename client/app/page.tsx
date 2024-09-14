"use client";

import CustomInput from "@/components/Input";
import { FormProps } from "@/types";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { registrationInputs } from "@/constants";
import { motion } from "framer-motion";
import { fadeIn } from "@/animations";
import { useEffect } from "react";
import CubesCanvas from "@/components/CubesCanvas";

const Login = () => {
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
    <main className="flex h-[100vh] w-full">
      <section className="w-[60%] h-full flex justify-center items-center">
        <div className="w-[60%] flex flex-col gap-[32px]">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeIn({
              direction: "right",
              type: "spring",
              delay: 0,
              duration: 0.8,
            })}
            className="flex flex-col">
            <h1 className="font-medium text-[32px]">Welcome to ExpTrack</h1>
            <p className="font-light text-[16px]">
              A powerful tool for tracking your expenses
            </p>
          </motion.div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[32px]">
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
            <motion.button
              initial="hidden"
              animate="show"
              variants={fadeIn({
                direction: "right",
                type: "spring",
                delay: 0.8,
                duration: 0.8,
              })}
              className="w-[256px] h-[59px] flex justify-center items-center text-white bg-[#C3C3C3] rounded-[32px] font-medium text-[22px]"
              type="submit">
              Create an account
            </motion.button>
            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeIn({
                direction: "right",
                type: "spring",
                delay: 1,
                duration: 0.8,
              })}
              className="font-thin text-[16px]">
              Already have an ccount?<Link href="/login"> Log in</Link>
            </motion.p>
          </form>
        </div>
      </section>
      <section
        className="w-[40%] h-full bg-[#151F2B]"
        // style={{
        //   backgroundImage: `url("/sign-in.svg")`,
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        <CubesCanvas />
      </section>
    </main>
  );
};

export default Login;
