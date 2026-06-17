import { forwardRef } from "react";

type PromptEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export const PromptEditor = forwardRef<HTMLTextAreaElement, PromptEditorProps>(
  ({ value, onChange }, ref) => {
    return (
      <textarea
        aria-label="prompt-editor"
        ref={ref}
        className="editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
);

PromptEditor.displayName = "PromptEditor";