import { Link } from "react-router-dom";
import type { Prompt } from "../../types/prompt";

type PromptCardProps = {
  prompt: Prompt;
};

export default function PromptCard({ prompt }: PromptCardProps) {
  return (
    <article className="prompt-card">
      <div className="prompt-card__header">
        <h3 className="prompt-card__title">{prompt.result}</h3>
        <span className="prompt-card__sphere">{prompt.sphere_id}</span>
      </div>

      <p className="prompt-card__tools">{prompt.tools.join(", ")}</p>

      <div className="prompt-card__footer">
        <span className="prompt-card__conversion">{prompt.conversion_type}</span>
        <span className="prompt-card__likes">👍 {prompt.likes}</span>
      </div>

      <Link to={`/prompts/${prompt.id}`} className="prompt-card__button">
        Открыть
      </Link>
    </article>
  );
}