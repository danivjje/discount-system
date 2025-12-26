import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/app.ts'],
  splitting: false,
  format: 'esm',
  sourcemap: true,
  clean: true,
});
