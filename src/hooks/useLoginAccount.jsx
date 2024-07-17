import axios from "axios";
import useCryptoValue from "./useCryptoValue";
import { auth } from "../components/firebase/firebase";

export default async function useLoginAccount(email, password) {
  try {
    const encryptPW = await useCryptoValue(password);
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      auth.app.options.apiKey;

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

    return response.data.localId;
  } catch (e) {
    console.error("Login Account >>>>> " + e);
  }
}
