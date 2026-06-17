# Prompt Hub

Учебный веб-сервис для хранения, изучения, создания и публикации шаблонов промптов для ИИ-инструментов.

Проект разрабатывается в рамках дисциплины **«Разработка интерфейса пользователя»** с акцентом на UX, информационную архитектуру, адаптивность, навигацию, формы, accessibility, тестирование и производительность.

---

## Технологии

- React
- TypeScript
- Vite
- React Router
- Context API
- react-hook-form
- json-server
- Vitest + React Testing Library (unit/integration тесты)

---

## Текущий функционал

### Навигация и структура

- базовая маршрутизация через React Router;
- общий Layout (`Header`, `Footer`, контентная зона);
- адаптивная навигация;
- mobile first подход, breakpoints для tablet и desktop.

---

### Справочники и исследования

Реализованы mock-справочники:

- сферы применения;
- инструменты;
- типы конвертации;
- категории исследований.

Добавлена отдельная страница исследований с mock-данными из учебного задания.

---

### Авторизация пользователей

Реализована mock authentication через `json-server`.

Доступно:

- регистрация;
- вход;
- восстановление пароля;
- mock session через `localStorage`.

После авторизации пользователю доступны:

- профиль;
- мои шаблоны;
- избранное;
- создание шаблона.
---

## Редактор промптов

Реализован кастомный Markdown-подобный редактор промптов с live-preview.

### Возможности:

- ввод и редактирование промпта;
- панель инструментов (Toolbar):
  - заголовки;
  - жирный / курсив;
  - переменные;
  - XML-блоки;
  - кодовые блоки;
  - декораторы;
- синхронный preview результата;
- работа с выделением текста (selection-based formatting);
- сохранение промпта в mock API;
- создание шаблонов с метаданными (сфера, инструмент, категория исследования, тип преобразования).

---

## Валидация форм

Все формы покрыты валидацией через **react-hook-form**.

Реализовано:

- обязательные поля (`required`);
- проверка email;
- минимальная длина пароля;
- подтверждение пароля;
- inline-подсветка ошибок;
- UX-friendly валидация (`onBlur`);
- валидация профиля пользователя;
- согласие на обработку персональных данных (152-ФЗ);
- согласие на рекламные рассылки.

---

## Тестирование

Проект покрыт тестами:

#### 1. Unit-тесты (filterPrompts.test.ts)

Проверяют чистую бизнес-логику:

- фильтрация по названию промпта;
- фильтрация по сфере;
- комбинированная фильтрация (несколько параметров одновременно);
- корректность работы утилитарных функций без UI.

#### 2. Интеграционный тест (promptEditor.integration.test.tsx)

Проверяет взаимодействие UI-компонентов:

- рендер страницы создания промпта;
- работа редактора (`textarea`);
- работа Toolbar кнопок (bold, italic, heading и др.);
- изменение содержимого промпта через действия Toolbar;
- корректное обновление состояния редактора.

---

### Как запустить тесты

Убедись, что зависимости установлены:

```bash
npm install
npm run test
```
---

## Запуск проекта

Установка зависимостей:

```bash
npm install
```
Запуск frontend:

```npm run dev```

Запуск mock API (json-server):

```npm run server```

Архитектура проекта
```
src
│
├── api
│   ├── usersApi.ts
│   └── promptsApi.ts
│
├── components
│   ├── auth
│   │   ├── AuthControls.tsx
│   │   └── UserMenu.tsx
│   │
│   ├── layout
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── Layout.tsx
│   │
│   ├── navigation
│   │   └── Navigation.tsx
│   │
│   └── prompt
│       ├── PromptGrid.tsx
│       ├── prompt-editor
│       │   ├── PromptEditor.tsx
│       │   ├── PromptPreview.tsx
│       │   └── toolbar
│       │       └── Toolbar.tsx
│
├── context
│   ├── authContext.ts
│   ├── AuthProvider.tsx
│   └── useAuth.ts
│
├── data
│   ├── conversionTypes.ts
│   ├── researchCategories.ts
│   ├── researches.ts
│   ├── spheres.ts
│   └── tools.ts
│
├── pages
│   ├── auth
│   │   ├── ForgotPasswordPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   │
│   ├── CreatePromptPage.tsx
│   ├── CatalogPage.tsx
│   ├── FavoritesPage.tsx
│   ├── HomePage.tsx
│   ├── MyPromptsPage.tsx
│   ├── ProfilePage.tsx
│   ├── ResearchCategoriesPage.tsx
│   ├── ResearchPage.tsx
│   ├── SpheresPage.tsx
│   └── ToolsPage.tsx
│
├── services
│   └── authService.ts
│
├── styles
│   ├── auth.css
│   ├── layout.css
│   └── pages.css
│
├── tests
│   ├── filterPrompts.test.ts
│   └── promptEditor.integration.test.tsx
│
├── types
│   ├── prompt.ts
│   ├── research.ts
│   └── user.ts
│
├── utils
│   └── applyToolbarAction.ts
│
├── App.tsx
├── main.tsx
└── index.css
```
