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
    if (e.code == "ERR_BAD_REQUEST") alert("올바른 계정을 입력해주세요");
    console.error("Login Account >>>>> " + e.code);
  }
}
