import type { User } from "../types/user";

const API_URL = "http://localhost:3001/users";

export async function getUsers() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Ошибка загрузки пользователей");
  }
  return response.json();
}

export async function getUserById(id: number) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Пользователь не найден");
  }
  return response.json();
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const response = await fetch(`${API_URL}?email=${email}`);
  const users: User[] = await response.json();
  return users[0] ?? null;
}

export async function createUser(user: Omit<User, "id">) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("Ошибка создания пользователя");
  }
  return response.json();
}

export async function updateUser(id: number, data: Partial<User>) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Ошибка обновления профиля");
  }
  return response.json();
}