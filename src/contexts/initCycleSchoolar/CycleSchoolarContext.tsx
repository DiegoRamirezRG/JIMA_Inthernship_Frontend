import React, { createContext, useContext, useState } from 'react'
import { CycleCalendarContext, initProviderProps } from '../../models/cycleModels/ContextCycleModel';
import { showErrorTost } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { CycleStatus, innerStepper } from '../../models/cycleModels/CycleModels';
import { StepDTO } from 'react-form-stepper/dist/components/Step/StepTypes';
import { ValidateComponents } from '../../components/admin_CycleComponents/validateComponents/ValidateComponents';
import { inscriptionsOptions, options } from '../../components/admin_CycleComponents/validateComponents/helpers/renderingOpts';
import { ValdidateCareerComponent } from '../../components/admin_CycleComponents/validateComponents/validateCareersComponent/ValdidateCareerComponent';
import { ValidatePlansComponent } from '../../components/admin_CycleComponents/validateComponents/validatePlansComponent/ValidatePlansComponent';
import { ValidateStudentComponent } from '../../components/admin_CycleComponents/validateComponents/validateStudentsComponent/ValidateStudentComponent';
import { CareerModel, CareerModelCreate } from '../../models/careersModels/CareersModel';
import { InscripcionComponent } from '../../components/admin_CycleComponents/incripcionComponents/InscripcionComponent';
import { MakeGroupsWithAsp } from '../../components/admin_CycleComponents/incripcionComponents/innerComponents/makeGroupsWithAsp/MakeGroupsWithAsp';
import { PlanPicker } from '../../components/admin_CycleComponents/incripcionComponents/innerComponents/planPicker/PlanPicker';
import { LoadSubjects } from '../../components/admin_CycleComponents/incripcionComponents/innerComponents/LoadSubjects/LoadSubjects';
import { MakeSchedule } from '../../components/admin_CycleComponents/incripcionComponents/innerComponents/makeSchedule/MakeSchedule';
import { ConfirmationComponents } from '../../components/admin_CycleComponents/confirmationComponents/ConfirmationComponents';

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
        [2, <InscripcionComponent/>],
        [3, <ConfirmationComponents/>],
    ])

    const stepsHelper: StepDTO[] = [
        {label: 'Validaciones'},
        {label: 'Reinscripciones'},
        {label: 'Inscripciones'},
        {label: 'Confirmacion'}
    ]

    const [stepperScreen, setStepperScreen] = useState<number>(0);

    const handlerStepperRenderByNumber = (index: number) => {
        setStepperScreen(index);
    }

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

    //Stepper of Resincripciton
    const [inscriptRenderOpts, setInscriptRenderOpts] = useState<innerStepper[]>(inscriptionsOptions);
    const [activeInscComp, setActiveInscComp] = useState(0);
    const [inscriptRoadMap, setInscriptRoadMap] = useState(0);

    const inscriptViewsComponents = new Map<number, JSX.Element>([
        [0, <MakeGroupsWithAsp/>],
        [1, <PlanPicker/>],
        [2, <LoadSubjects/>],
        [3, <MakeSchedule/>],
    ]);

    const handleNextInscripView = () => {
        setInscriptRenderOpts((prevOpt) => {
            const nuevasOpts = [...prevOpt];
            nuevasOpts[activeInscComp] = { ...nuevasOpts[activeInscComp], active: false, completed: true };
            nuevasOpts[activeInscComp + 1] = { ...nuevasOpts[activeInscComp + 1], active: true};
            return nuevasOpts;
        })
        activeInscComp == inscriptRoadMap
        ?   setInscriptRoadMap(activeInscComp + 1)
        :   () => {}
        setActiveInscComp(activeInscComp + 1);
    }

    const handleBackInscripView = () => {
        setInscriptRenderOpts((prevOpt) => {
            const nuevasOpts = [...prevOpt];
            nuevasOpts[activeInscComp] = { ...nuevasOpts[activeInscComp], active: false };
            nuevasOpts[activeInscComp - 1] = { ...nuevasOpts[activeInscComp - 1], active: true};
            return nuevasOpts;
        });
        setActiveInscComp(activeInscComp - 1);
    }

    const handleInscripLoadingView = (index: number) => {
        setInscriptRenderOpts((prevOpt) => {
            const nuevasOpts = [...prevOpt];
            nuevasOpts[activeInscComp] = { ...nuevasOpts[activeInscComp], active: false };
            nuevasOpts[index] = { ...nuevasOpts[index], active: true};
            return nuevasOpts;
        });
        setActiveInscComp(index);
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
        handleActivePage: handlerStepperRenderByNumber,
        stepsHelper: stepsHelper,

        //Validator Stepper
        validator_Opts: renderingOptions,
        validator_indexActive: activeComponent,
        validator_Screens: screenViews,
        validator_nextView: handleNextValidatorView,
        validator_backView: handleBackValidatorView,
        validator_loadView: handleLoadingView,
        roadmap_count: roadMapCompleted,

        //Stteper Inscripcionts
        inscription_Opts: inscriptRenderOpts,
        inscription_indexActive: activeInscComp,
        inscription_screens: inscriptViewsComponents,
        inscription_roadmap: inscriptRoadMap,
        inscripction_nextView: handleNextInscripView,
        inscripction_backView: handleBackInscripView,
        inscripction_loadView: handleInscripLoadingView,
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

