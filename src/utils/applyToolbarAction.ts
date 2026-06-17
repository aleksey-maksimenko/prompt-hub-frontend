import type { ToolbarActionId } from "../components/prompt-editor/toolbar/toolbarActions";

export interface ApplyActionResult {
  value: string;
  selectionStart: number;
  selectionEnd: number;
}

export function applyToolbarAction(
  text: string,
  selectionStart: number,
  selectionEnd: number,
  action: ToolbarActionId
): ApplyActionResult {
  const selectedText = text.slice(selectionStart, selectionEnd);
  const before = text.slice(0, selectionStart);
  const after = text.slice(selectionEnd);
  const hasSelection = selectionStart !== selectionEnd;

  switch (action) {
    case "bold": {
      const content = hasSelection ? selectedText : "текст";
      const replacement = `**${content}**`;
      const value = before + replacement + after;
      return {
        value,
        selectionStart: before.length + 2,
        selectionEnd: before.length + 2 + content.length,
      };
    }
    case "italic": {
      const content = hasSelection ? selectedText : "текст";
      const replacement = `*${content}*`;
      const value = before + replacement + after;
      return {
        value,
        selectionStart: before.length + 1,
        selectionEnd: before.length + 1 + content.length,
      };
    }
    case "variable": {
      const content = hasSelection ? selectedText : "переменная";
      const replacement = `{{${content}}}`;
      const value = before + replacement + after;
      return {
        value,
        selectionStart: before.length + 2,
        selectionEnd: before.length + 2 + content.length,
      };
    }
    case "xml": {
      const content = hasSelection ? selectedText : "tag";
      const replacement = `<${content}></${content}>`;
      const value = before + replacement + after;
      return {
        value,
        selectionStart: before.length + 1,
        selectionEnd: before.length + 1 + content.length,
      };
    }
    case "code": {
      const content = hasSelection ? selectedText : "код";
      const replacement = `\`${content}\``;
      const value = before + replacement + after;
      return {
        value,
        selectionStart: before.length + 1,
        selectionEnd: before.length + 1 + content.length,
      };
    }
    case "heading": {
      const replacement = "\n## Новый заголовок\n";
      const value = before + replacement + after;
      return {
        value,
        selectionStart: before.length + 3,
        selectionEnd: before.length + 19,
      };
    }
    case "decorator": {
      const replacement = "\n+++Reasoning\n";
      const value = before + replacement + after;
      return {
        value,
        selectionStart: before.length + 3,
        selectionEnd: before.length + 12,
      };
    }
    default:
      return {
        value: text,
        selectionStart,
        selectionEnd,
      };
  }
}