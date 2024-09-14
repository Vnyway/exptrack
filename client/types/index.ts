import { UseFormRegister, FieldError } from "react-hook-form";

export interface FormProps {
  email: string;
  name: string;
  password: string;
}

export interface CustomInputProps {
  name: string;
  type: string;
  index?: number;
  placeholder: string;
  required?: boolean;
  requiredMessage?: string;
  pattern?: string;
  patternMessage?: string;
  register: UseFormRegister<any>;
  errors: FieldError | undefined;
}

export interface InputErrorProps {
  message: string | undefined;
}

export interface SlideInProps {
  direction: "left" | "right" | "up" | "down";
  type: "spring" | "tween"; // You can add more transition types if needed
  delay: number; // Delay before the animation starts (in seconds)
  duration: number; // Duration of the animation (in seconds)
}
