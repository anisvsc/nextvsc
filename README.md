# nextvsc

**nextvsc** is a modern and minimal Next.js starter template with full TypeScript support, Tailwind CSS, ShadCN UI, opinionated Prettier and ESLint configurations, and clean import sorting. Ideal for building high-quality apps out of the box.

## 🚀 Features

- ⚡️ **Next.js** with TypeScript
- 🎨 **Tailwind CSS** with Prettier plugin integration
- 🧩 **ShadCN/UI** components pre-installed
- 💅 **Prettier** with opinionated formatting
- 🔍 **ESLint** using Flat Config + Prettier
- 📦 Sorted and grouped imports via `@ianvs/prettier-plugin-sort-imports`
- ✅ Ready-to-code dev environment with minimal setup

---

## 🛠️ Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN/UI](https://ui.shadcn.com/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

---

## 📁 Folder Structure

```bash
.
├── app/
├── components/
├── public/
├── styles/
├── tsconfig.json
├── .prettierrc
└── eslint.config.mjs
```

---

## 🧹 Prettier Configuration

Custom Prettier setup with import sorting and Tailwind class sorting:

```json
{
  "trailingComma": "es5",
  "singleQuote": false,
  "semi": true,
  "printWidth": 80,
  "tabWidth": 2,
  "plugins": [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss"
  ],
  "importOrder": [
    "^react$",
    "",
    "^next(.*)$",
    "",
    "^lucide-react$",
    "",
    "^@components/(.*)$",
    "",
    "^[a-zA-Z0-9]",
    "",
    "^\\u0000",
    "",
    "<BUILTIN_MODULES>",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^[./]",
    "",
    "^.+\\.css$",
    ""
  ],
  "importOrderParserPlugins": [
    "typescript",
    "tsx",
    "jsx",
    "json",
    "decorators-legacy"
  ],
  "importOrderTypeScriptVersion": "5.0.0",
  "importOrderCaseSensitive": false
}
```

---

## 🔬 ESLint Configuration

Flat config with Prettier and Next.js rules, with custom rules disabled:

```ts
import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    plugins: {
      prettier: require("eslint-plugin-prettier"),
    },
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
    },
  }),
];

export default eslintConfig;
```

---

## 🧱 UI Components (ShadCN)

ShadCN UI is initialized and ready to use. You can start adding components using:

```bash
npx shadcn-ui@latest add button
```

Visit [shadcn/ui documentation](https://ui.shadcn.com/docs) for more components and usage.

---

## 🧑‍💻 Getting Started

1. **Clone the repo**

```bash
npx create-next-app@latest my-app -e https://github.com/your-username/nextvsc
cd my-app
```

2. **Install dependencies**

```bash
npm install
# or
yarn
# or
pnpm install
```

3. **Start the dev server**

```bash
npm run dev
```

---

## 📦 Scripts

| Command  | Description                  |
| -------- | ---------------------------- |
| `dev`    | Run the development server   |
| `build`  | Build the app for production |
| `lint`   | Run ESLint                   |
| `format` | Run Prettier formatting      |

---

## 📄 License

MIT — feel free to use and adapt this template for personal or commercial projects.

---

## 🙌 Contributions

Issues and PRs are welcome! If you have ideas or improvements, feel free to contribute.
