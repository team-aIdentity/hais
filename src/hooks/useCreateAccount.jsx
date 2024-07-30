import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../components/firebase/firebase";
import useCryptoValue from "./useCryptoValue";

export default async function useCreateAccount(email, password) {
  try {
    const encryptPW = await useCryptoValue(password);
    sendEmailVerification(auth.currentUser);
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      encryptPW
    );
    return user;
  } catch (e) {
    if (e.code == "email-already-exists") {
      alert("이미 계정이 있습니다.");
    }
  }
}
