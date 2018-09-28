import fetch from 'isomorphic-unfetch';


const speak = async () => {
  //const res = await fetch("http://localhost:5001/api/values");
  //const ttt = await res.json();
  //debugger;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ text: 'I bet 15, please check 1', bet: '15', check: '1' });
    }, 200);
  });
};

export default speak;
