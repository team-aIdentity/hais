import { UserContextProvider } from "../context/UserContext";

export default function ContextProvider(props) {
  return <UserContextProvider>{props.children}</UserContextProvider>;
}
