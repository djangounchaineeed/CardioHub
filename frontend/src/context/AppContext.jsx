import { createContext } from "react";


export const AppContext = createContext();

const AppContextProvider = (props) => {
    return (
        <AppContext.Provider>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
