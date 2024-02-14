import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props){
    const [userToken, serUserToken] = useState(null);
    return <UserContext.Provider value={{userToken, serUserToken}}>
        {props.children}
    </UserContext.Provider>
}