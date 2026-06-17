export type ToolbarActionId =
  | "heading"
  | "bold"
  | "italic"
  | "variable"
  | "decorator"
  | "xml"
  | "code";

export interface ToolbarAction {
  id: ToolbarActionId;
  label: string;
  title: string;
}

export const toolbarActions: ToolbarAction[] = [
  {
    id: "heading",
    label: "Заголовок",
    title: "Вставить заголовок",
  },

  {
    id: "bold",
    label: "Ж",
    title: "Жирный текст",
  },

  {
    id: "italic",
    label: "К",
    title: "Курсив",
  },

  {
    id: "variable",
    label: "{{}}",
    title: "Переменная",
  },

  {
    id: "xml",
    label: "<>",
    title: "XML-тег",
  },

  {
    id: "code",
    label: "`код`",
    title: "Фрагмент кода",
  },

  {
    id: "decorator",
    label: "+++",
    title: "Декоратор",
  },
];