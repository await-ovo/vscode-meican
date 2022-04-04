const path = require('path');

module.exports = {
  content: [`${path.resolve(__dirname, '../src/client')}/**/*.{tsx, ts}`],
  safelist: [
    // {
    //   pattern: /bg-*/,
    //   variants: [
    //     'first',
    //     'last',
    //     'odd',
    //     'even',
    //     'visited',
    //     'checked',
    //     'empty',
    //     'read-only',
    //     'group-hover',
    //     'group-focus',
    //     'focus-within',
    //     'hover',
    //     'focus',
    //     'focus-visible',
    //     'active',
    //     'disabled',
    //   ],
    // },
  ],
  theme: {
    container: 'center',
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      yellow: {
        100: 'rgb(167 205 69)',
      },
    },
  },
};
