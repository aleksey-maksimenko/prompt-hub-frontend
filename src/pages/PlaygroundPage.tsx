import {
  useRef,
  useState,
} from "react";

import { PromptEditor }
  from "../components/PromptEditor/PromptEditor";

import { PromptPreview }
  from "../components/PromptPreview/PromptPreview";

import { Toolbar } from "../components/Toolbar/Toolbar";

import type {
  ToolbarActionId,
} from "../components/Toolbar/toolbarActions";

import {
  applyToolbarAction,
} from "../utils/applyToolbarAction";

export const PlaygroundPage = () => {
  const [prompt, setPrompt] =
    useState(`## Заголовок

Введите текст промпта...
`);

  const editorRef =
    useRef<HTMLTextAreaElement>(null);

  const handleToolbarAction = (
    action: ToolbarActionId
  ) => {
    const textarea =
      editorRef.current;

    if (!textarea) {
      return;
    }

    const result =
      applyToolbarAction(
        prompt,
        textarea.selectionStart,
        textarea.selectionEnd,
        action
      );

    setPrompt(result.value);

    requestAnimationFrame(() => {
      textarea.focus();

      textarea.setSelectionRange(
        result.selectionStart,
        result.selectionEnd
      );
    });
  };

  return (
    <div className="playground">
      <div className="panel">
        <h2>Редактор</h2>

        <Toolbar
          onAction={
            handleToolbarAction
          }
        />

        <PromptEditor
          ref={editorRef}
          value={prompt}
          onChange={setPrompt}
        />
      </div>

      <div className="panel">
        <h2>Предпросмотр</h2>

        <PromptPreview
          content={prompt}
        />
      </div>
    </div>
  );
};