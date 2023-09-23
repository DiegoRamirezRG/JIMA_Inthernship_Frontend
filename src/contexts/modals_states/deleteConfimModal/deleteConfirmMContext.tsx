import React, { ReactNode, createContext, useState, useContext } from 'react'

interface ConfirmModalContextState {
    deleteConfirmModalState: boolean;
    changeDeleteConfirmModalState: () => void;
}

interface ConfirmModalProvider {
    children: ReactNode;
}

const DeleteConfirmModalContext = createContext<ConfirmModalContextState | undefined>( undefined );

export const DeleteConfirmContextProvider = ({ children }: ConfirmModalProvider) => {

    const [boolean, setBoolean] = useState<boolean>(false);

    const toggleBoolean = () => {
        setBoolean(!boolean);
    };

    const contextValue: ConfirmModalContextState = {
        deleteConfirmModalState: boolean,
        changeDeleteConfirmModalState: toggleBoolean
    };

    return (
        <DeleteConfirmModalContext.Provider value={contextValue}>
            {children}
        </DeleteConfirmModalContext.Provider>
    );
}

export const useDeleteConfirmModalContext = () : ConfirmModalContextState => {
    const context = useContext(DeleteConfirmModalContext);
    if(context === undefined){
        throw new Error('useDeleteConfirmContext debe ser utilizado dentro de un ContextsProviders');
    }
    return context;
}
