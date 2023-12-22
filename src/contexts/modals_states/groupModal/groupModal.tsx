import React, { ReactNode, createContext, useState, useContext } from 'react'

interface GroupStateInterface {
    createGroupModalState: boolean;
    changeGroupModalState: () => void;
}


interface ProviderProps {
    children: ReactNode;
}

const CreateGroupsModalContext = createContext<GroupStateInterface | undefined>( undefined);

export const CreateGroupModalProvider = ({ children }: ProviderProps) => {
    const [boolean, setBoolean] = useState<boolean>(false);

    const toggleBoolean = () => {
        setBoolean(!boolean);
    };

    const contextValue : GroupStateInterface = {
        changeGroupModalState: toggleBoolean,
        createGroupModalState: boolean
    };

    return (
        <CreateGroupsModalContext.Provider value={contextValue}>
            {children}
        </CreateGroupsModalContext.Provider>
    )
}

export const useGroupCreateModalContext = (): GroupStateInterface => {
    const context = useContext(CreateGroupsModalContext);
    if(context === undefined){
        throw new Error('useGroupCreateModalContext debe ser utilizado dentro de un StateProvider')
    }
    return context;
}
