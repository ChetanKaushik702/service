const path = require('path');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // goober (react-hot-toast's CSS-in-JS dep) declares sideEffects:false
      // on a CommonJS build; webpack 4's production tree-shaking mishandles
      // that combination and silently drops the `keyframes` export
      // ("j.keyframes is not a function" at runtime). Its ESM build doesn't
      // have this problem since webpack's own static export analysis
      // (built for ESM) applies correctly there.
      goober: path.resolve(__dirname, 'node_modules/goober/dist/goober.esm.js'),
    },
    configure: (webpackConfig) => {
      // react-scripts 4 / webpack 4 predates the package.json "exports"
      // field and has flawed static named-export detection for many
      // packages' ESM ("module") builds (shadcn's deps: cva, tailwind-merge,
      // lucide-react, Radix primitives). Forcing CJS ("main") resolution
      // avoids that whole class of "can't import named export" failures.
      webpackConfig.resolve.mainFields = ['main', 'browser'];

      // react-scripts' fallback babel-loader rule for third-party JS
      // (babel-preset-react-app/dependencies) doesn't include optional
      // chaining (?.) / nullish coalescing (??) support, and webpack 4's
      // own parser (acorn 7) predates that syntax too -- so Radix UI's
      // CJS output (which uses both) fails to parse either way unless
      // we add the transform plugins to this specific babel rule.
      const oneOfRule = webpackConfig.module.rules.find((rule) => Array.isArray(rule.oneOf));
      if (oneOfRule) {
        const depsBabelRule = oneOfRule.oneOf.find(
          (rule) =>
            typeof rule.loader === 'string' &&
            rule.loader.includes('babel-loader') &&
            !rule.include &&
            rule.test &&
            rule.test.toString() === '/\\.(js|mjs)$/'
        );
        if (depsBabelRule) {
          depsBabelRule.options.plugins = [
            ...(depsBabelRule.options.plugins || []),
            require.resolve('@babel/plugin-proposal-optional-chaining'),
            require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
          ];
        }
      }

      return webpackConfig;
    },
  },
};
