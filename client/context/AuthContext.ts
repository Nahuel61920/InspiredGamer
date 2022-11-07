import { createContext } from "react";

const AuthContext = createContext({
    auth: undefined,
    login: (userData: any) => {},
    logout: () => null,
    setReloadUser: (reload: boolean) => null,
});

export default AuthContext;