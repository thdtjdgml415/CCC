import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });
const config = compat.extends("next/core-web-vitals", "next/typescript");
const eslintConfig = [{ ignores: [".next/**", "node_modules/**", "next-env.d.ts"] }, ...config];
export default eslintConfig;
