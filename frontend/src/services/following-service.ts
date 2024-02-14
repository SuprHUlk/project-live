import httpInterceptor from "../shared/httpInterceptor";

export const get = () => {
  httpInterceptor.get("http://localhost:3000/following/get").then((res) => {
    console.log(res);
  });
};
