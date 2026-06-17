import { conversionTypes } from "../data/conversionTypes";

export function ConversionTypesPage() {
  return (
    <section style={{ textAlign: 'left' }}>
      <h2>Типы конвертации</h2>
      <ul className="directory-list">
        {conversionTypes.map((type) => (
          <li key={type.id}>{type.name}</li>
        ))}
      </ul>
    </section>
  );
}