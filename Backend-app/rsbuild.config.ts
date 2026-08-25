import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [
    pluginReact({
      reactCompiler: true,
    }),
  ],
  source: {
    // 1. Force Rsbuild to compile code using Stage 1 legacy decorators
    decorators: {
      version: 'legacy',
    },
  },
  tools: {
    // 2. Force the SWC compiler to emit TypeORM's required metadata
    swc: {
      jsc: {
        transform: {
          legacyDecorator: true,
          decoratorMetadata: true,
        },
      },
    },
  },
});
