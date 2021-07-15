import { useState, createContext } from 'react'

export const LoggedContext = createContext()

export const LoggedProvider = ({ children }) => {
    const [logged, setLogged] = useState(localStorage.getItem('WALLET_ADDRESS') !== null)

    return (
        <LoggedContext.Provider value={{ logged, setLogged }}>
            {children}
        </LoggedContext.Provider>
    )
}