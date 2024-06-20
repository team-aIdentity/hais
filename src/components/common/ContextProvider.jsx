import { UserContextProvider } from "./UserContextProvider";

export default function ContextProvider(props) {
  return <UserContextProvider>{props.children}</UserContextProvider>;
}
