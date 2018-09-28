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

export default {
  getGreeting,
};
