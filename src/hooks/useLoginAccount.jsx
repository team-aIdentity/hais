import axios from "axios";
import useCryptoValue from "./useCryptoValue";

export default async function useLoginAccount(email, password) {
  try {
    const encryptPW = await useCryptoValue(password);
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDoAXahn4mOzl6ioNd2HvkPI7RxSYoYA8I";

    const data = {
      email: `${email}`,
      password: `${encryptPW}`,
      returnSecureToken: true,
    };

    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);
    // const user = { uid: "EltPvJoDtJWD72L7HsH6STdQzpZ2" };
    return user;
  } catch (e) {
    console.log("Login Account >>>>> " + e);
  }
}
