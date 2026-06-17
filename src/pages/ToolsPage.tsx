import { tools } from "../data/tools";

export function ToolsPage() {
  return (
    <section style={{ textAlign: 'left' }}>
      <h2>Инструменты</h2>
      <ul className="directory-list">
        {tools.map((tool) => (
          <li key={tool.id}>{tool.name}</li>
        ))}
      </ul>
    </section>
  );
}