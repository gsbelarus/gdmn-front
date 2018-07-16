const fs = require('fs');
const muiColors = require('@material-ui/core/colors');

const muiTheme = require('../src/styles/muiTheme');
// const objectStyleToCss = require('./utils').objectStyleToCss;

const cssColorsWriteStream = fs.createWriteStream('./src/styles/_mui-colors.css');
cssColorsWriteStream.once('open', () => {
  cssColorsWriteStream.write(':root {\n');
  Object.keys(muiColors).forEach(colorName => {
    Object.keys(muiColors[colorName]).forEach(accentName => {
      cssColorsWriteStream.write(`  --${colorName}-${accentName}: ${muiColors[colorName][accentName]};\n`);
    });
  });
  cssColorsWriteStream.write('}');
  cssColorsWriteStream.end(() => console.log('_mui-colors.css generated.'));
});

// TODO TMP: replace with https://github.com/postcss/postcss-custom-properties

const cssThemeWriteStream = fs.createWriteStream('./src/styles/_mui-theme.css');
cssThemeWriteStream.once('open', () => {
  cssThemeWriteStream.write(':root {\n');
  // typography
  Object.keys(muiTheme.typography).forEach(typographyStyle => {
    if (muiTheme.typography[typographyStyle] !== Object(muiTheme.typography[typographyStyle])) {
      cssThemeWriteStream.write(`  --${typographyStyle}: ${muiTheme.typography[typographyStyle]};\n`);
    } else {
      // objectStyleToCss
    }
  });
  // spacing
  Object.keys(muiTheme.spacing).forEach(spacingStyle => {
    cssThemeWriteStream.write(`  --spacing-${spacingStyle}: ${muiTheme.spacing[spacingStyle]}px;\n`);
  });
  // palette
  Object.keys(muiTheme.palette).forEach(paletteStyle => {
    if (muiTheme.palette[paletteStyle] !== Object(muiTheme.palette[paletteStyle])) {
      cssThemeWriteStream.write(`  --palette-${paletteStyle}: ${muiTheme.palette[paletteStyle]};\n`);
    } else {
      Object.keys(muiTheme.palette[paletteStyle]).forEach(paletteItem => {
        cssThemeWriteStream.write(
          `  --palette-${paletteStyle}-${paletteItem}: ${muiTheme.palette[paletteStyle][paletteItem]};\n`
        );
      });
    }
  });
  cssThemeWriteStream.write('}');
  cssThemeWriteStream.end(() => console.log('_mui-theme generated.'));
});

// test
// fs.writeFile('./src/styles/muiTheme.json', JSON.stringify(muiTheme), function(err) {
//   if (err) return console.log(err);
//   console.log('muiTheme.json generated.');
// });
