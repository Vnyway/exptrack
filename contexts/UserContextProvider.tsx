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

interface CategoryProps {
  id: number;
  title: string;
  image: string;
}

export interface UserContextType {
  userData: UserProps | null;
  setUserData: React.Dispatch<React.SetStateAction<UserProps | null>>;
  categoriesIncomes: CategoryProps[] | null;
  setCategoriesIncomes: React.Dispatch<
    React.SetStateAction<CategoryProps[] | null>
  >;
  categoriesExpenses: CategoryProps[] | null;
  setCategoriesExpenses: React.Dispatch<
    React.SetStateAction<CategoryProps[] | null>
  >;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [userData, setUserData] = useState<UserProps | null>(null);
  const [categoriesIncomes, setCategoriesIncomes] = useState<
    CategoryProps[] | null
  >(null);
  const [categoriesExpenses, setCategoriesExpenses] = useState<
    CategoryProps[] | null
  >(null);

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

    const fetchCategoriesIncomes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/categories/incomes`
        );
        if (!response.ok) throw new Error("Failed to fetch incomes categories");

        const data = await response.json();
        if (data) {
          setCategoriesIncomes(data);
        }
      } catch (error) {
        console.error("Error fetching incomes categories:", error);
      }
    };

    const fetchCategoriesExpenses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/categories/expenses`
        );
        if (!response.ok)
          throw new Error("Failed to fetch expenses categories");

        const data = await response.json();
        if (data) {
          setCategoriesExpenses(data);
        }
      } catch (error) {
        console.error("Error fetching expenses categories:", error);
      }
    };

    fetchUser();
    fetchCategoriesExpenses();
    fetchCategoriesIncomes();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        categoriesIncomes,
        setCategoriesIncomes,
        categoriesExpenses,
        setCategoriesExpenses,
      }}>
      {children}
    </UserContext.Provider>
  );
};
