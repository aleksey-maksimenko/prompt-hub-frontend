import { parseInline } from "./parseInline";

import type {
  BlockToken,
} from "./tokenTypes";

export function parsePrompt(input: string): BlockToken[] {
  const lines = input.split("\n");
  const blocks: BlockToken[] = [];
  let inCodeBlock = false;

  let codeLanguage = "";
  let codeLines: string[] = [];

  for (const line of lines) {
    if (line.trim() === "") {
        blocks.push({
          type: "emptyLine",
        });
        continue;
    }
    // открытие/закрытие блока кода
    if (line.startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
        codeLines = [];
        continue;
      }
      blocks.push({
        type: "codeBlock",
        language: codeLanguage,
        content: codeLines.join("\n"),
      });
      inCodeBlock = false;
      codeLanguage = "";
      codeLines = [];
      continue;
    }

    // пока внутри блока кода, просто собираем строки
    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    // заголовок
    if (line.startsWith("## ")) {
      blocks.push({
        type: "heading",
        value: line.slice(3),
      });

      continue;
    }

    // разделитель горизонтальный ---
    if (line.trim() === "---") {
      blocks.push({
        type: "divider",
      });
      continue;
    }

    // Decorator +++
    if (line.startsWith("+++")) {
      blocks.push({
        type: "decorator",
        value: line.slice(3),
      });
      continue;
    }
    blocks.push({
      type: "paragraph",
      children: parseInline(line),
    });
  }

   // защита от незакрытого блока кода
   if (inCodeBlock) {
    blocks.push({
      type: "codeBlock",
      language: codeLanguage,
      content: codeLines.join("\n"),
    });
  }
  return blocks;
}