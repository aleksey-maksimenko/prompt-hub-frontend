import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import { CreatePromptPage } from "../pages/CreatePromptPage";
import type { User } from "../types/user";

const mockUser: User = {
  id: 1,
  name: "Test User",
  email: "test@test.com",
  password: "123456",
};

vi.mock("../context/useAuth", () => {
  return {
    useAuth: () => ({
      user: mockUser,
      updateProfile: vi.fn(),
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    }),
  };
});

describe("CreatePromptPage integration", () => {
  it("updates prompt via toolbar", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <CreatePromptPage />
      </MemoryRouter>
    );

    const textarea = screen.getByRole("textbox", { name: "prompt-editor" });
    await user.clear(textarea);
    await user.type(textarea, "hello world");
    const boldButton = screen.getByRole("button", { name: /ж/i });
    await user.click(boldButton);
    expect((textarea as HTMLTextAreaElement).value.length).toBeGreaterThan(11);
  });
});