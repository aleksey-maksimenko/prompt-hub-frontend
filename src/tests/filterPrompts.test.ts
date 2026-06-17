import { describe, expect, it } from "vitest";
import { filterPrompts } from "../utils/filterPrompts";

const prompts = [
  {
    id: "1",
    user_id: "1",
    result: "ChatGPT Анализ",
    prompt: "",
    likes: 0,
    researches: ["1"],
    tools: ["chatgpt"],
    conversion_type: "summary",
    sphere_id: "business",
  },
  {
    id: "2",
    user_id: "1",
    result: "Маркетинговая стратегия",
    prompt: "",
    likes: 0,
    researches: ["2"],
    tools: ["claude"],
    conversion_type: "analysis",
    sphere_id: "marketing",
  },
  {
    id: "3",
    user_id: "1",
    result: "Учебный план",
    prompt: "",
    likes: 0,
    researches: ["3"],
    tools: ["chatgpt"],
    conversion_type: "generation",
    sphere_id: "education",
  },
];

describe("filterPrompts", () => {
  it("should filter prompts by title", () => {
    const result = filterPrompts(prompts, { query: "chatgpt" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("should filter prompts by sphere", () => {
    const result = filterPrompts(prompts, { sphere: "marketing" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("should apply multiple filters together", () => {
    const result = filterPrompts(prompts, { query: "анализ", sphere: "business", tool: "chatgpt" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });
});