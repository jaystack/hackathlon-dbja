const play = require('audio-play');
const load = require('audio-loader');

export const say = (file) => {
  return new Promise((resolve) => {
    load(`./static/sounds/speach/${file}.mp3`).then((audio) => {
      play(audio, () => {
        resolve();
      });
    });
  });
}
