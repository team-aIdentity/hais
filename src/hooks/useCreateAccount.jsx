import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase/firebase";
import useCryptoValue from "./useCryptoValue";

export default async function useCreateAccount(email, password) {
  const encryptPW = await useCryptoValue(password);
  try {
    // const url =
    //   `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=` +
    //   auth.app.options.apiKey;

    // const data = {
    //   email: email,
    //   password: encryptPW,
    //   returnSecureToken: true,
    // };

    // const response = await axios.post(url, data, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      encryptPW
    );
    return user;
  } catch (e) {
    if (e.code == "auth/email-already-in-use") {
      alert("이미 회원가입 된 아이디 입니다.");
    } else {
      alert("알수 없는 오류 입니다.");
    }
  }
}
