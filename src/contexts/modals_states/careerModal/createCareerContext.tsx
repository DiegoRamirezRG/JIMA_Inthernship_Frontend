import React, { ReactNode, createContext, useContext, useState } from 'react'

interface StateContextType {
    createCareerModalState: boolean;
    changeCareerModalState: () => void;
}

interface StateProviderProps {
    children: ReactNode;
}

const CreateCareerModalContext = createContext<StateContextType | undefined>(undefined);

export const CreateCareerContextProvider = ({ children }: StateProviderProps) => {

    const [boolean, setBoolean] = useState<boolean>(false);

    const toggleBoolean = () => {
        setBoolean(!boolean);
    };

    const contextValue: StateContextType = {
        createCareerModalState: boolean,
        changeCareerModalState: toggleBoolean
    };

    return (
        <CreateCareerModalContext.Provider value={contextValue}>
            {children}
        </CreateCareerModalContext.Provider>
    );
}

export const useCreateCareerModalContext = (): StateContextType => {
    const context = useContext(CreateCareerModalContext);
    if (context === undefined) {
        throw new Error('useStateContext debe ser utilizado dentro de un StateProvider');
    }
    return context;
};
