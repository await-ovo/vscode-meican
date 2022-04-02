const path = require('path');
module.exports = {
  content: [`${path.resolve(__dirname, '../src/client')}/**/*.{tsx, ts}`],
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
