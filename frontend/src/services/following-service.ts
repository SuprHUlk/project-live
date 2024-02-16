import httpInterceptor from "../shared/httpInterceptor";

export const get = async () => {
  try {
    const result = await httpInterceptor.get(
      "http://localhost:3000/following/get"
    );
    return result.data.result;
  } catch (err) {
    return err;
  }
};
