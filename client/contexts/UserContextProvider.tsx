"use client";

import { createContext, useState, ReactNode } from "react";
import { user as initialUser } from "@/constants";

interface UserProps {
  id: number;
  name: string;
  accounts: { id: number; title: string }[];
  transactions: {
    id: number;
    accountId: number;
    incomes: boolean;
    category: number;
    amount: number;
    date: Date;
  }[];
}

interface UserContextType {
  userData: UserProps;
  setUserData: React.Dispatch<React.SetStateAction<UserProps>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [userData, setUserData] = useState<UserProps>(initialUser);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
