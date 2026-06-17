import type { Research } from "../types/research";

export const researches: Research[] = [
  {
    id: "research-001",
    slug: "rules-md-long-projects",
    title: "Файл RULES.md для долгосрочных проектов",
    description:"Правила предотвращения размазывания фокуса при работе AI-агентов.",
    paperId: "2601.03298",
    categoryId: "agents-tools",
  },

  {
    id: "research-002",
    slug: "compact-prompt",
    title: "CompactPrompt",
    description: "Удаление токенов, N-gram abbreviation и округление чисел.",
    paperId: "2510.18043",
    categoryId: "prompt-engineering",
  },

  {
    id: "research-003",
    slug: "short-but-accurate",
    title: "Ответь кратко, но точно",
    description:
      "Сокращение длины ответа на 37–80% без потери качества.",
    paperId: "2505.23480",
    categoryId: "prompt-engineering",
  },

  {
    id: "research-004",
    slug: "prompt-completeness",
    title: "Полнота формулировки",
    description:
      "Один из сильнейших факторов качества генерации.",
    paperId: "2409.08775",
    categoryId: "prompt-engineering",
  },

  {
    id: "research-005",
    slug: "pseudo-code-prompting",
    title: "Псевдокод-промптинг",
    description:
      "+36% точности и -87% токенов.",
    paperId: "2507.03254",
    categoryId: "prompt-engineering",
  },

  {
    id: "research-006",
    slug: "atomic-instructions",
    title: "Atomic Instructions",
    description:
      "Цепочка простых бинарных вопросов.",
    paperId: "2510.09970",
    categoryId: "prompt-engineering",
  },

  {
    id: "research-007",
    slug: "json-grouping",
    title: "JSON группирует связанные факты рядом",
    description:
      "Повышение точности за счет структурирования контекста.",
    paperId: "2504.07087",
    categoryId: "structured-data",
  },

  {
    id: "research-008",
    slug: "extract-then-answer",
    title: "Извлеки → Ответь",
    description:
      "JSON плюс двухэтапная обработка больших контекстов.",
    paperId: "2410.10813",
    categoryId: "structured-data",
  },

  {
    id: "research-009",
    slug: "think-of-structure",
    title: "Think-of-Structure",
    description:
      "Сначала формируется структура ответа, затем генерация.",
    paperId: "2502.18878",
    categoryId: "structured-data",
  },

  {
    id: "research-010",
    slug: "metaglyph",
    title: "MetaGlyph",
    description:
      "Символьные ограничения как псевдокод.",
    paperId: "2601.07354",
    categoryId: "metaglyph",
  },
];