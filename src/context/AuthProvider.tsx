import { useEffect, useState } from "react";
import type { User } from "../types/user";
import { AuthContext } from "./authContext";
import * as authService from "../services/authService";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    }
    loadUser();
  }, []);

  async function handleLogin(email: string, password: string) {
    const user = await authService.login(email, password);
    setUser(user);
  }

  async function handleRegister(email: string, name: string, password: string, photo?: string) {
    const user = await authService.register(email, name, password, photo);
    setUser(user);
  }

  function handleLogout() {
    authService.logout();
    setUser(null);
  }

  async function handleUpdateProfile(data: { name: string; email: string; password?: string; photo?: string }) {
    if (!user) {
      return;
    }
    const updatedUser = await authService.updateProfile(user.id, data);
    setUser(updatedUser);
  }

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        updateProfile: handleUpdateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}