import { createContext } from "react";

export type TAuthContext = {
    token: string | null;
    setToken: Function;
}

const AuthContext = createContext<TAuthContext>(null!);
export default AuthContext;

