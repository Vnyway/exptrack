"use client";

import { createContext, useState, ReactNode, useEffect } from "react";

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
        const response = await fetch("http://localhost:3000/api/users"); // API route to fetch users
        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();
        if (data && data.length > 0) {
          setUserData(data[0]); // Set the first user as userData
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
