import resolve from "@rollup/plugin-node-resolve";
// import { terser } from "rollup-plugin-terser";

export default {
  input: "src/app.mjs",
  output: {
    file: "dist/app.js",
    format: "iife",
  },
  plugins: [
    // terser({
    //   compress: {
    //     reduce_vars: false
    //   },
    //   output: {
    //     comments: false 
    //   },
    // }),
    resolve(),
  ],
};
