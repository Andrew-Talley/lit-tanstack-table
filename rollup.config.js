import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      sourcemap: true,
      exports: "named",
      format: "cjs",
    },
    {
      file: "dist/index.esm.js",
      sourcemap: true,
      format: "esm",
    },
    {
      file: "dist/index.mjs",
      sourcemap: true,
      format: "esm",
    },
    {
      file: "dist/index.umd.js",
      sourcemap: true,
      format: "umd",
      name: "tanstack-lit-table",
      globals: {
        lit: "lit",
        "@tanstack/table-core": "tanstack-table",
      },
    },
  ],
  external: ["lit", "@tanstack/table-core"],
  plugins: [typescript()],
};
