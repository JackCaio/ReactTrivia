const TOKEN_API_URL = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  try {
    const response = await fetch(TOKEN_API_URL);
    const json = await response.json();
    return json.token;
  } catch (error) {
    return error.message;
  }
};

export default getToken;
