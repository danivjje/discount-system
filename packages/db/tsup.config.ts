import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/client.ts'],
  splitting: true,
  format: 'esm',
  sourcemap: true,
  clean: true,
  dts: true,
  tsconfig: 'tsconfig.build.json',
});
