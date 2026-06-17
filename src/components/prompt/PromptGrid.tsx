import type { Prompt } from "../../types/prompt";
import PromptCard from "./PromptCard";

type PromptGridProps = {
  prompts: Prompt[];
};

export default function PromptGrid({ prompts }: PromptGridProps) {
  return (
    <div className="prompt-grid">
      {prompts.map((prompt) => (
        <PromptCard key={prompt.id} prompt={prompt} />
      ))}
    </div>
  );
}