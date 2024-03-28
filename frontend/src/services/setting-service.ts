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

export const changeBio = async (newBio: string) => {
  try {
    const data = {
      newBio: newBio,
    };
    const result = await httpInterceptor.post(
      "http://localhost:3000/setting/changeBio",
      data
    );
    return result.data.result;
  } catch (err) {
    return err;
  }
};

export const changeSocials = async (newSocials: {
  instagram: string;
  twitter: string;
  youtube: string;
  discord: string;
}) => {
  try {
    const result = await httpInterceptor.post(
      "http://localhost:3000/setting/changeSocials",
      { newSocials: newSocials }
    );

    return result.data.result;
  } catch (err) {
    return err;
  }
};

export const get = async () => {
  try {
    const result = await httpInterceptor.get(
      "http://localhost:3000/setting/get"
    );

    return result.data.result;
  } catch (err) {
    return err;
  }
};
