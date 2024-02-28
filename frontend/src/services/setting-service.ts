import httpInterceptor from "../shared/httpInterceptor";

export const changeUsername = async (newUsername: string) => {
  try {
    const data = {
      oldUsername: localStorage.getItem("username"),
      newUsername: newUsername,
    };
    const result = await httpInterceptor.post(
      "http://localhost:3000/setting/changeUsername",
      data
    );
    return result.data.result;
  } catch (err) {
    return err;
  }
};
