import type { InlineToken } from "./tokenTypes";

import { CAPS_PATTERN } from "./rules/capsRule";

const INLINE_PATTERN =  /(\{\{.*?\}\}|\*\*.*?\*\*|\*.*?\*|`.*?`|<\/?[a-zA-Z][a-zA-Z0-9_-]*>|[A-ZА-ЯЁ]{2,}|[∈∩∪¬→⊕])/g;

export function parseInline(
  text: string
): InlineToken[] {
  const tokens: InlineToken[] = [];

  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_PATTERN)) {
    const start = match.index ?? 0;
    const value = match[0];

    if (start > lastIndex) {
      tokens.push({
        type: "text",
        value: text.slice(lastIndex, start),
      });
    }

    if (value.startsWith("{{")) {
      tokens.push({
        type: "variable",
        value: value.slice(2, -2),
      });
    } else if (value.startsWith("`")) {
      tokens.push({
        type: "code",
        value: value.slice(1, -1),
      });
    } else if (CAPS_PATTERN.test(value)) {
      tokens.push({
        type: "caps",
        value,
      });
    } else if (value.startsWith("<") && value.endsWith(">")) {
      tokens.push({
        type: "xmlTag",
        value,
      });
    } else if (value.startsWith("**") && value.endsWith("**")) {
      tokens.push({
        type: "bold",
        value: value.slice(2, -2),
      });
    } else if (value.startsWith("*") && value.endsWith("*")) {
      tokens.push({
        type: "italic",
        value: value.slice(1, -1),
      });
    } else {
      tokens.push({
        type: "metaglyph",
        value,
      });
    }
    lastIndex = start + value.length;
  }

  if (lastIndex < text.length) {
    tokens.push({
      type: "text",
      value: text.slice(lastIndex),
    });
  }

  return tokens;
}