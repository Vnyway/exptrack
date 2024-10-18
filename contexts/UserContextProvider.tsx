"use client";

import { ObjectId } from "mongodb";
import { createContext, useState, ReactNode, useEffect } from "react";

interface UserProps {
  _id: ObjectId;
  name: string;
  accounts: { id: number; title: string }[];
  transactions: {
    id: number;
    account: number;
    incomes: boolean;
    category: number;
    amount: number;
    date: Date;
  }[];
  balance: {
    date: string;
    balance: number;
    income: number;
    expense: number;
  }[];
  allTransactions: {
    id: number;
    category: string;
    amount: number;
    date: string;
    source: string;
    image: string;
    account: string;
    type: string;
  }[];
}

export interface UserContextType {
  userData: UserProps | null;
  setUserData: React.Dispatch<React.SetStateAction<UserProps | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [userData, setUserData] = useState<UserProps | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/users`
        );
        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
