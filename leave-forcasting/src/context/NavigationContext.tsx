import { createContext, useContext } from "react";
import { ContextProvider } from "types/ContextProvider";
import { useToggle } from "usehooks-ts";

type NavigationProviderProps = ContextProvider;

type NavigationContextProps = {
    isNavDrawerOpened: boolean,
    toggleNavDrawerOpened: () => void,
    setNavDrawerOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const NavigationContext = createContext<NavigationContextProps>({} as NavigationContextProps);

const NavigationProvider = ({ children }: NavigationProviderProps) => {
    const [isNavDrawerOpened, toggleNavDrawerOpened, setNavDrawerOpened] = useToggle(false);

    const value = {
        isNavDrawerOpened,
        toggleNavDrawerOpened,
        setNavDrawerOpened
    };

    return (
        <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
    );
}

const useNavigationContext = () => useContext(NavigationContext);

export { useNavigationContext, NavigationProvider };