import React, { createContext, useContext, useState } from 'react'
import { endCycleSchoolarContext, endCycleSchoolarProvider } from '../../models/endCycleSchoolarModels/endCycleSchoolarContextModels';

const EndCycleSchoolarContext = createContext<endCycleSchoolarContext | undefined>(undefined);

export const EndCycleSchoolarContextProvider = ({ children } : endCycleSchoolarProvider) => {

    //End Cycle Modal
    const [endCycleModal, setEndCycleModal] = useState(false);
    const handleEndCycle = () => setEndCycleModal(!endCycleModal);

    //Completely Sure Modal
    const [completlySure, setCompletlySure] = useState(false);
    const handleComplentlySure = () => {
        if(endCycleModal){
            setEndCycleModal(false);
            setCompletlySure(true);
        }else{
            setEndCycleModal(true);
            setCompletlySure(false);
        }
    }

    //Returning
    const contextVal: endCycleSchoolarContext = {
        //End Cycle Modal
        endCycleModal: endCycleModal,
        handleEndCycleModal: handleEndCycle,

        //Completely Sure Modal
        completelySureModal: completlySure,
        handleCompletelySureModal: handleComplentlySure,
    }

    return (
        <EndCycleSchoolarContext.Provider value={ contextVal }>
            { children }
        </EndCycleSchoolarContext.Provider>
    )
}

export const useEndCycleSchoolarContext = (): endCycleSchoolarContext => {
    const context = useContext(EndCycleSchoolarContext);
    if(context === undefined){
        throw new Error('useEndCycleSchoolarContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}

