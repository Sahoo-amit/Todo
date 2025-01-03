import { createContext, useContext, useState } from "react";

export const TokenContext = createContext();

export const TokenProvider =({children})=>{
    const [token, setToken] = useState(localStorage.getItem('token'))
    const storeToken =(token)=>{
        setToken(token)
        localStorage.setItem('token', token)
    }
    const removeToken =()=>{
        setToken('')
        localStorage.removeItem('token')
    }
    const isLogout = !token

    return (
        <TokenContext.Provider value={{token, storeToken, removeToken, isLogout}}>
            {children}
        </TokenContext.Provider>
    )
}

export const useTokenContext =()=>{
    return useContext(TokenContext)
}