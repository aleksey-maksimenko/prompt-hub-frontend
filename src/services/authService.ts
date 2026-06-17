import { createUser, getUserByEmail, getUserById, updateUser } from "../api/usersApi";

const STORAGE_KEY = "prompt-hub-user-id";

export async function login(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Пользователь не найден");
  }
  if (user.password !== password) {
    throw new Error("Неверный пароль");
  }
  localStorage.setItem(STORAGE_KEY, String(user.id));
  return user;
}

export async function register(email: string, name: string, password: string, photo?: string) {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("Пользователь уже существует");
  }
  const user = await createUser({ email, name, password, photo });
  localStorage.setItem(STORAGE_KEY, String(user.id));
  return user;
}

export async function getCurrentUser() {
  const userId = localStorage.getItem(STORAGE_KEY);

  if (!userId) {
    return null;
  }

  const numericId = Number(userId);
  if (Number.isNaN(numericId)) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }

  try {
    return await getUserById(numericId);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export async function updateProfile(id: number, data: { name: string; email: string; password?: string; photo?: string }) {
  return updateUser(id, data);
}