import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase/firebase";

export default async function useCreateAccount(email, password) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (e) {
    console.log("createAccount >>>>> " + e);
  }
}
