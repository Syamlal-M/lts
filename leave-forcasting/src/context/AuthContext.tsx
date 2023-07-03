import msalInstance from "lib/ms-sso";
import { createContext, useContext } from "react";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { ContextProvider } from "types/ContextProvider";
import { setToken, resetToken } from "utils/CookieUtils";

type AuthProviderProps = ContextProvider & { type?: "popup" | "redirect" };

type AuthContextProps = {
  onLogin: () => any;
  onLogout: () => any;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children, type = "popup" }: AuthProviderProps) => {
  const Content = ({ children }: any) => {
    const { instance } = useMsal();

    const handleLoginPopup = () => {
      return instance
        .loginPopup({
          scopes: ["api://ad3d6578-abae-4bc7-8ba3-3ad971f2571d/Testing"],
          redirectUri: "/redirect"
        })
        .then((response: any) => {
          const { accessToken, tokenType } = response;
          setToken({ accessToken: `${tokenType} ${accessToken}` });
        })
        .catch((error) => console.log(error));
    };

    const handleLogoutPopup = () => {
      return instance
        .logoutPopup({
          mainWindowRedirectUri: "/", // redirects the top level app after logout
          account: instance.getActiveAccount()
        })
        .then(() => {
          resetToken();
        })
        .catch((error) => console.log(error));
    };

    const handleLoginRedirect = () => {
      return instance
        .loginRedirect()
        .then((response: any) => {
          const { accessToken, tokenType } = response;
          setToken({ accessToken: `${tokenType} ${accessToken}` });
        })
        .catch((error) => console.log(error));
    };

    const handleLogoutRedirect = () => {
      return instance
        .logoutRedirect({
          account: instance.getActiveAccount()
        })
        .then(() => {
          resetToken();
        })
        .catch((error) => console.log(error));
    };

    const value = {
      onLogin: type === "popup" ? handleLoginPopup : handleLoginRedirect,
      onLogout: type === "popup" ? handleLogoutPopup : handleLogoutRedirect
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };

  return (
    <MsalProvider instance={msalInstance}>
      <Content>{children}</Content>
    </MsalProvider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthProvider };
