import { spheres } from "../data/spheres";

export function SpheresPage() {
  return (
    <section style={{ textAlign: 'left' }}>
      <h2>Сферы применения</h2>
      <ul className="directory-list">
        {spheres.map((sphere) => (
          <li key={sphere.id}>{sphere.name}</li>
        ))}
      </ul>
    </section>
  );
}