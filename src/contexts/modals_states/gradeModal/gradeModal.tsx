import React, { ReactNode, createContext, useState, useContext } from "react";

interface GradeStateInterface {
    createGradeModalState: boolean;
    changeGradeModalState: () => void;
}


interface ProviderProps {
    children: ReactNode;
}

const CreateGradeModalContext = createContext<GradeStateInterface | undefined>(undefined);

export const CreateGradeProvider = ({ children }: ProviderProps) => {

    const [boolean, setBoolean] = useState<boolean>(false);

    const toggleBoolean = () => {
        setBoolean(!boolean);
    };

    const contextValue : GradeStateInterface = {
        changeGradeModalState: toggleBoolean,
        createGradeModalState: boolean
    };

    return (
        <CreateGradeModalContext.Provider value={contextValue}>
            {children}
        </CreateGradeModalContext.Provider>
    )
}

export const useCreateGradeModal = (): GradeStateInterface => {

    const context = useContext(CreateGradeModalContext);
    if(context === undefined){
        throw new Error('useCreateGradeModal debe ser utilizado dentro de un StateProvider')
    }
    return context;
}


