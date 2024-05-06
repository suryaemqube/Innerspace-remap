import axios from "axios";

const WEBSITE_URL = process.env.REACT_APP_BASE_URL;

export const getToken = async () => {
  try {
    const response = await axios({
      method: "POST",
      url: `${WEBSITE_URL}/wp-json/jwt-auth/v1/token`,
      data: {
        username: process.env.REACT_APP_USERNAME,
        password: process.env.REACT_APP_PASSWORD,
      },
      headers: {
        Accept: "application/json",
      },
    });
    return response.data.token;
  } catch (error) {
    console.error("TokenError", error);
  }
};
