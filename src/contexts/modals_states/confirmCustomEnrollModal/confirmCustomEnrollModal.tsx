import React, { ReactNode, createContext, useContext, useState } from 'react'

interface ConfirmCustomContextState {
    confirmCustomModalState: boolean;
    changeConfirmCustomModalState: () => void;
}

interface ConfirmCustomModalProvider{
    children: ReactNode;
}

const ConfirmCustonModalContext = createContext<ConfirmCustomContextState | undefined>(undefined);

export const ConfirmCustomEnrollModalProvider = ({ children }: ConfirmCustomModalProvider) => {

    const [boolean, setBoolean] = useState<boolean>(false);

    const toggleBoolean = () => {
        setBoolean(!boolean);
    };

    const contextValue : ConfirmCustomContextState = {
        confirmCustomModalState: boolean,
        changeConfirmCustomModalState: toggleBoolean
    };

    return (
        <ConfirmCustonModalContext.Provider value={contextValue}>
            {children}
        </ConfirmCustonModalContext.Provider>
    );
}

export const useConfrimCustomModalContext = (): ConfirmCustomContextState => {
    const context = useContext(ConfirmCustonModalContext);
    if(context === undefined){
        throw new Error('useConfrimCustomModalContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}


