import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase/firebase";
import useCryptoValue from "./useCryptoValue";

export default async function useCreateAccount(email, password) {
  try {
    const encryptPW = await useCryptoValue(password);
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      encryptPW
    );
    return user;
  } catch (e) {
    console.log("createAccount >>>>> " + e);
  }
}
