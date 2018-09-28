import fetch from 'isomorphic-unfetch';
import { say } from '../lib/dealer';

const speak = async () => {
  //return await realSpeak();

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ text: 'I bet 15, please check 1', bet: '15', check: '1' });
    }, 400);
  });
};

export default speak;


const realSpeak = async () => {
  const res = await fetch("http://localhost:5001/api/values");
  const obj = await res.json();

  if(obj.error) {
    await say("dont-understand");
    return await realSpeak();
  }

  return obj;
}