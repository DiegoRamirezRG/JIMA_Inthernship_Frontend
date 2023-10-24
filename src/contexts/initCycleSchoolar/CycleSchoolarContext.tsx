import React, { createContext, useContext, useState } from 'react'
import { CycleCalendarContext, initProviderProps } from '../../models/cycleModels/ContextCycleModel';
import { showErrorTost } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { CycleStatus, innerStepper } from '../../models/cycleModels/CycleModels';
import { StepDTO } from 'react-form-stepper/dist/components/Step/StepTypes';
import { ValidateComponents } from '../../components/admin_CycleComponents/validateComponents/ValidateComponents';
import { options } from '../../components/admin_CycleComponents/validateComponents/helpers/renderingOpts';
import { ValdidateCareerComponent } from '../../components/admin_CycleComponents/validateComponents/validateCareersComponent/ValdidateCareerComponent';
import { ValidatePlansComponent } from '../../components/admin_CycleComponents/validateComponents/validatePlansComponent/ValidatePlansComponent';
import { ValidateStudentComponent } from '../../components/admin_CycleComponents/validateComponents/validateStudentsComponent/ValidateStudentComponent';
import { CareerModel, CareerModelCreate } from '../../models/careersModels/CareersModel';

const CycleSchoolarContext = createContext<CycleCalendarContext |undefined>(undefined);

export const CycleSchoolarContextProvider = ({ children }: initProviderProps) => {

    //Master Loading ---- Loadings
    const [isMasterLoading, setIsMasterLoading] = useState(true);
    //-----
    const [getCycleState, setGetCycleState] = useState(true);

    //Data Status
    const [cycleStatus, setCycleStatus] = useState<CycleStatus | null>(null);


    //Get Cycle Status
    const getCycleStatus = async () => {
        try {
            const response = await serverRestApi.get<Response>('/api/cycle/getCycleStatus', { headers: { Authorization: localStorage.getItem('token') } })

            if(response.data.success){
                setCycleStatus(response.data.data);
                setGetCycleState(false);
            }
        } catch (error: any) {
            console.log(error);

            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
            setGetCycleState(false);
        }
    }

    //Stepper and Render
    const steppersWrappersComponents = new Map<number, JSX.Element>([
        [0, <ValidateComponents/>],
        [1, <>Reinscripciones</>],
        [2, <>Inscripciones</>],
        [3, <>Confirmacion</>],
    ])

    const stepsHelper: StepDTO[] = [
        {label: 'Validaciones'},
        {label: 'Reinscripciones'},
        {label: 'Inscripciones'},
        {label: 'Confirmacion'}
    ]

    const [stepperScreen, setStepperScreen] = useState(0);

    //Validate Stepper and Render
    const [renderingOptions, setRenderingOptions] = useState<innerStepper[]>(options);
    const [activeComponent, setActiveComponent] = useState(0);
    const [roadMapCompleted, setroadMapCompleted] = useState<number>(0);

    const screenViews = new Map<number, JSX.Element>([
        [0, <ValdidateCareerComponent/>],
        [1, <ValidatePlansComponent/>],
        [2, <ValidateStudentComponent/>],
    ]);

    const handleNextValidatorView = () => {
        setRenderingOptions((prevOpt) => {
            const nuevasOpts = [...prevOpt];
            nuevasOpts[activeComponent] = { ...nuevasOpts[activeComponent], active: false, completed: true };
            nuevasOpts[activeComponent + 1] = { ...nuevasOpts[activeComponent + 1], active: true};
            return nuevasOpts;
        })
        activeComponent == roadMapCompleted
        ?   setroadMapCompleted(activeComponent + 1)
        :   () => {}
        setActiveComponent(activeComponent + 1);
    }

    const handleBackValidatorView = () => {
        setRenderingOptions((prevOpt) => {
            const nuevasOpts = [...prevOpt];
            nuevasOpts[activeComponent] = { ...nuevasOpts[activeComponent], active: false };
            nuevasOpts[activeComponent - 1] = { ...nuevasOpts[activeComponent - 1], active: true};
            return nuevasOpts;
        });
        setActiveComponent(activeComponent - 1);
    }

    const handleLoadingView = (index: number) => {
        setRenderingOptions((prevOpt) => {
            const nuevasOpts = [...prevOpt];
            nuevasOpts[activeComponent] = { ...nuevasOpts[activeComponent], active: false };
            nuevasOpts[index] = { ...nuevasOpts[index], active: true};
            return nuevasOpts;
        });
        setActiveComponent(index);
    }


    //Export Context
    const contextValue: CycleCalendarContext = {
        //Master Loading
        masterLoading: isMasterLoading,

        //Loaders
        getCycleStatusLoader: getCycleState,

        //Cycle Status
        cycleStatusState: cycleStatus,
        getCycleStatusFunc: getCycleStatus,

        //Stteper Handler
        stepConfig: steppersWrappersComponents,
        stepActivePage: stepperScreen,
        stepsHelper: stepsHelper,

        //Validator Stepper
        validator_Opts: renderingOptions,
        validator_indexActive: activeComponent,
        validator_Screens: screenViews,
        validator_nextView: handleNextValidatorView,
        validator_backView: handleBackValidatorView,
        validator_loadView: handleLoadingView,
        roadmap_count: roadMapCompleted,
    }

    return (
        <CycleSchoolarContext.Provider value={contextValue}>
            {children}
        </CycleSchoolarContext.Provider>
    )


}

export const useCycleSchoolarContext = () => {
    const context = useContext(CycleSchoolarContext);
    if(context === undefined){
        throw new Error('useCycleSchoolarContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}

