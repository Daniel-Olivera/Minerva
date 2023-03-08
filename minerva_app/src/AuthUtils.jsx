import  React, {useState} from "react";
import { Auth } from "aws-amplify";
import {CognitoUser} from 'amazon-cognito-identity-js'

const authContext = React.createContext();
export function useAuth() {
  const [currUser, setUser] = useState();
  return {
    currUser,
    login(u) {
      setUser(u)
    },
    logout() {
        setUser(null);
    }
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function AuthConsumer() {
    return React.useContext(authContext);
}
