const play = require('audio-play');
const load = require('audio-loader');
const _ = require('lodash');

const usedVariants = {
  'take-bet': [],
  'bet-taken': [],
  'result-loose': [],
  'result-won': [],
};

const variants = {
  'take-bet': [1, 2, 3],
  'bet-taken': [1, 2, 3], // 4
  'result-loose': [1, 2, 3],
  'result-won': [1, 2, 3],
  'dont-understand': [1, 2],
};

const getVariant = (file) => {
  if (usedVariants[file].length >= variants[file].length) {
    usedVariants[file] = [];
  }
  const selectables = _.difference(variants[file], usedVariants[file]);
  const variant = `${file}-v${selectables[0]}`;
  usedVariants[file].push(selectables[0]);
  return variant;
};

export const say = (file, variant) => {
  return new Promise((resolve) => {
    const fileName = variant ? getVariant(file) : file;
    load(`./static/sounds/speach/${fileName}.mp3`).then((audio) => {
      play(audio, () => {
        resolve(fileName);
      });
    });
  });
}
