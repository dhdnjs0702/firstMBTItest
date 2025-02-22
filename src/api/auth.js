import axios from "axios";

const Api = axios.create({
  baseURL: "https://www.nbcamp-react-auth.link",
});

const jsonApi = axios.create({
  baseURL: "https://scrawny-beaded-bookcase.glitch.me",
});

export default { Api, jsonApi };
