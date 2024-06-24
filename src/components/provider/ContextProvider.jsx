import { AdminContextProvider } from "./AdminContextProvider";
import { UserContextProvider } from "./UserContextProvider";

export default function ContextProvider(props) {
  return (
    <AdminContextProvider>
      <UserContextProvider>{props.children}</UserContextProvider>
    </AdminContextProvider>
  );
}
