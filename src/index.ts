import Jimp from 'jimp';
import fs from 'fs';
import data from './data';

let currentArgs: string = '';
const args: Record<string, string[]> = process.argv.reduce((acc: Record<string, string[]> = {}, val) => {
  if (val.startsWith('-')) {
    currentArgs = val.substring(1);
  } else {
    if (!acc[currentArgs]) {
      acc[currentArgs] = [];
    }
    acc[currentArgs].push(val);
  }
  return acc;
}, {});

Jimp
  .read(args.i[0])
  .then((image) => {
    const greyScaleImg = image.greyscale().contrast(1);

    let result = '';
    for (let y = 0; y < Math.ceil(image.bitmap.height / 4); y += 1) {
      for (let x = 0; x < Math.ceil(image.bitmap.width / 2); x += 1) {
        const color00 = greyScaleImg.getPixelColor(x * 2, y * 4) === 255 ? 1 : 0;
        const color01 = greyScaleImg.getPixelColor(x * 2 + 1, y * 4) === 255 ? 1 : 0;
        const color10 = greyScaleImg.getPixelColor(x * 2, y * 4 + 1) === 255 ? 1 : 0;
        const color11 = greyScaleImg.getPixelColor(x * 2 + 1, y * 4 + 1) === 255 ? 1 : 0;
        const color20 = greyScaleImg.getPixelColor(x * 2, y * 4 + 2) === 255 ? 1 : 0;
        const color21 = greyScaleImg.getPixelColor(x * 2 + 1, y * 4 + 2) === 255 ? 1 : 0;
        const color30 = greyScaleImg.getPixelColor(x * 2, y * 4 + 3) === 255 ? 1 : 0;
        const color31 = greyScaleImg.getPixelColor(x * 2 + 1, y * 4 + 3) === 255 ? 1 : 0;

        result += data[`${color00}${color01}${color10}${color11}${color20}${color21}${color30}${color31}`];
      }

      result += '\n';
    }

    fs.writeFileSync('out.txt', result);
    console.log(result);
  })
  .catch(console.error)
;
