import { researches } from "../data/researches";
import { researchCategories } from "../data/researchCategories";

export function ResearchPage() {
  return (
    <section>
      <div className="research-grid">
        {researches.map((research) => {
          const category = researchCategories.find(
            (item) => item.id === research.categoryId
          );
          return (
            <article
              key={research.id}
              className="research-card"
            >
              <span className="research-card__category">
                {category?.name}
              </span>
              <h3>{research.title}</h3>
              <p>{research.description}</p>
              <div className="research-card__paper">
                Paper: {research.paperId}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}