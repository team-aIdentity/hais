import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../components/firebase/firebase";
import useCryptoValue from "./useCryptoValue";
import { doc, setDoc } from "firebase/firestore";

export default async function useCreateAccount(email, password) {
  try {
    const encryptPW = await useCryptoValue(password);
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      encryptPW
    );
    await setDoc(doc(db, "user-auth", user.uid), {
      uid: user.uid,
      email: email,
    });
    return user;
  } catch (e) {
    console.log("createAccount >>>>> " + e);
  }
}
