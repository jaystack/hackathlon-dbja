import fetch from 'isomorphic-unfetch';

const speak = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ text: 'I bet 15, please check 1', bet: '15', check: '1' });
    }, 400);
  });
};

export default speak;
