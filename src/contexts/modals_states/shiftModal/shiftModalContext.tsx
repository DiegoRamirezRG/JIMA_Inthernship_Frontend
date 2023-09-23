import React, { ReactNode, createContext, useState, useContext } from 'react'

interface ShiftModalContextState {
    shiftContextModalState: boolean;
    changeShiftContextModalState: () => void;
}

interface ShiftModalProvider {
    children: ReactNode;
}

const ShiftModalContext = createContext<ShiftModalContextState | undefined>( undefined);

export const ShiftModalContextProvider = ({ children }: ShiftModalProvider) => {
    const [boolean, setBoolean] = useState<boolean>(false);

    const toggleBoolean = () => {
        setBoolean(!boolean);
    };
    
    const contextValue: ShiftModalContextState = {
        shiftContextModalState: boolean,
        changeShiftContextModalState: toggleBoolean
    };

    return (
        <ShiftModalContext.Provider value={contextValue}>
            {children}
        </ShiftModalContext.Provider>
    )
}

export const useShiftModalContext = () : ShiftModalContextState => {
    const context = useContext(ShiftModalContext);
    if(context === undefined){
        throw new Error('shiftModalContext debe ser utilizado dentro de un ContextsProviders');
    }

    return context;
}