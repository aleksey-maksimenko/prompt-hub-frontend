import { createContext } from "react";

import type { User } from "../types/user";

export interface AuthContextType {
  user: User | null;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  register: (
    email: string,
    name: string,
    password: string,
    photo?: string
  ) => Promise<void>;

  updateProfile: (
    data: {
        name: string;
        email: string;
        password?: string;
        photo?: string;
    }
  ) => Promise<void>;

  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextType | null>(
    null
  );