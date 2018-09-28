import fetch from 'isomorphic-unfetch';
import { say } from '../lib/dealer';
import { createUser, postBetResult } from '../lib/apiClient';

const speak = async () => {
  return await realSpeak();

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        text: Math.random(),
        bet: Math.floor(Math.random() * 90) + 50,
        check: Math.floor(Math.random() * 2) + 0
      });
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