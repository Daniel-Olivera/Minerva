import * as React from "react";
import { Auth } from "aws-amplify";


const authContext = React.createContext();

export function useAuth() {
  const [authed, setAuthed] = React.useState(false);
  return {
    authed,
    login() {
      return new Promise((res) => {
        setAuthed(true);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    },
  };
}



export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}


export default function AuthConsumer() {
    return React.useContext(authContext);
}
