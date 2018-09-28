import fetch from 'isomorphic-unfetch';

const apiUrl = 'http://hackathon.guidesmiths.com:4000';

const getGreeting = async () => {
  try {
    const res = await fetch(apiUrl);
    return await res.text();
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    // TODO implement some method for handling errors
    return 'Unable to fetch greeting';
  }
};

export const createUser = async (name) => {
  const res = await fetch("http://hackathon.guidesmiths.com:4000/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      "name": name
    }),
  });

  return res.json();
}

export const postBetResult = async (userName, bet, isWin) => {
  const res = await fetch("http://hackathon.guidesmiths.com:4000/api/nav/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      "gameId": "projectred",
      "userName": userName,
      "bet": bet,
      "change": isWin ? bet : bet * -1
    }),
  });

  return res.json();
}

export default {
  getGreeting
};
