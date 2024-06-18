import { FirebaseContextProvider } from "../context/FirebaseContext";
import { UserContextProvider } from "../context/UserContext";

export default function ContextProvider(props) {
  return (
    <FirebaseContextProvider>
      <UserContextProvider>{props.children}</UserContextProvider>
    </FirebaseContextProvider>
  );
}
