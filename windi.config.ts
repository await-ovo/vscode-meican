import path from 'path';
import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  extract: {
    // A common use case is scanning files from the root directory
    include: [`./src/**/*.{tsx,html}`],
    // if you are excluding files, make sure you always include node_modules and .git
    exclude: ['node_modules', '.git', 'dist'],
  },
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        yellow: {
          100: 'rgb(167 205 69)',
        },
        slate: {
          800: '#252525',
          700: '#2b2b2b',
          600: '#333',
          500: '#393939',
        },
      },
    },
  },
});
