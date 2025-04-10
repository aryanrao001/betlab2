    import React, { createContext, useState } from 'react';

    export const AllContext = createContext();

    const AllContextProvider = ({ children }) => {
    const Base_url = import.meta.env.VITE_BASE_URL;  // Make sure it's prefixed with VITE_ for Vite
    
    const [matchdata, setMatchData] = useState();
    const [user, setUser] = useState("Rajat Yadav")


    const value = { user , Base_url ,matchdata,setMatchData };

    return (
        <AllContext.Provider value={value}>
        {children}
        </AllContext.Provider>
    );
    };

    export default AllContextProvider;
