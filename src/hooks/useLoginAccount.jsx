import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import useCryptoValue from "./useCryptoValue";

export default async function useLoginAccount(email, password) {
  try {
    const auth = getAuth();
    await setPersistence(auth, browserSessionPersistence);

    const { user } = await signInWithEmailAndPassword(
      auth,
      email,
      await useCryptoValue(password)
    );

    return user;
  } catch {
    console.log("Login Account >>>>> " + e);
  }
}
