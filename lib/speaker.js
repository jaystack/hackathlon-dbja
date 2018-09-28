import fetch from 'isomorphic-unfetch';

const speak = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ text: Math.random(), bet: '15', check: '1' });
    }, 400);
  });
};

export default speak;
