import { researchCategories } from "../data/researchCategories";

export function ResearchCategoriesPage() {
  return (
    <section style={{ textAlign: 'left' }}>
      <h2>Категории исследований</h2>
      <ul className="directory-list">
        {researchCategories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </section>
  );
}