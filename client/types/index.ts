import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

export interface FormProps {
  email: string;
  name: string;
  password: string;
}

export interface LoginFormProps {
  email: string;
  password: string;
}

export interface CustomInputProps {
  name: string;
  type: string;
  index?: number;
  placeholder: string;
  required?: boolean;
  requiredMessage: string;
  reqPattern?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export interface InputErrorProps {
  message: any | undefined;
}

export interface SlideInProps {
  direction: "left" | "right" | "up" | "down";
  type: "spring" | "tween";
  delay: number;
  duration: number;
}

export interface NavbarLinkProps {
  id: number;
  reference: string;
  image: (selected: boolean) => React.ReactNode;
  title: string;
  selected: boolean;
}
