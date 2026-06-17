import type { Prompt } from "../types/prompt";

const API_URL = "http://localhost:3001/prompts";

export async function getAllPrompts(): Promise<Prompt[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Не удалось загрузить шаблоны");
  }
  return response.json();
}

export async function getPromptById(id: string): Promise<Prompt> {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Шаблон не найден");
  }
  return response.json();
}

export async function createPrompt(prompt: Omit<Prompt, "id">): Promise<Prompt> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prompt),
  });
  if (!response.ok) {
    throw new Error("Не удалось сохранить шаблон");
  }
  return response.json();
}

export async function getUserPrompts(userId: string): Promise<Prompt[]> {
  const response = await fetch(`${API_URL}?user_id=${userId}`);
  if (!response.ok) {
    throw new Error("Не удалось получить шаблоны");
  }
  return response.json();
}