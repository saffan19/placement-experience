import React,{useState} from 'react';

export const GlobalContext = React.createContext();

const Store = ({children}) =>{
    const [userId,setUserId] = useState(null);
    return (<GlobalContext.Provider value={[userId,setUserId]}>{children}</GlobalContext.Provider>
        )
}

export default Store;