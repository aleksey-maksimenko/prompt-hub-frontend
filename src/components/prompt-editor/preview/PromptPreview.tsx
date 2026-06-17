import { parsePrompt } from "../../../parser/parsePrompt";
import { PromptRenderer } from "./PromptRenderer";

type PromptPreviewProps = {
  content: string;
};

export const PromptPreview = ({ content }: PromptPreviewProps) => {
  const tokens = parsePrompt(content);
  return (
    <div className="preview">
      <PromptRenderer tokens={tokens} />
    </div>
  );
};