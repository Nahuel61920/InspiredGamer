import { createContext } from "react";

const AuthContext = createContext({
    auth: {} as any,
    login: (userData: any) => { },
    logout: () => null,
    setReloadUser: (reload: boolean) => null,
});

export default AuthContext;