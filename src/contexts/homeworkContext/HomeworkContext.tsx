import React, { createContext, useContext, useState } from 'react'
import { HomeWorkContextInterface, HomeWorkProvider } from '../../models/homeworkModels/HomeworkContextModels';
import { CreateRubricModal } from '../../components/teacherComponents/groupComponents/assignsComponentView/innerComponents/createRubricModal/CreateRubricModal';
import { CreateAssigment, CriteriaRubric, CriteriaRubricCreate, Rubric, Unit } from '../../models/homeworkModels/HomeworkModels';
import { showErrorTost, showSuccessToast } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { optionSelect } from '../../models/universalApiModels/UniversalApiModel';

const HomeWorkContext = createContext<HomeWorkContextInterface | undefined>(undefined);

export const HomeworkContextProvider = ({ children }: HomeWorkProvider) => {

    //Create Unit Modal
    const [createUnitModalState, setCreateUnitModalState] = useState(false);
    const handleCreateUnitModal = () => setCreateUnitModalState(!createUnitModalState);
    
    const [newTitle, setNewTitle] = useState('');
    const onTitleChange = (name: any, value: string) => {
        setNewTitle(value);
    }

    //Create Rubric Modal
    const [createRubricModal, setCreateRubricModal] = useState(false);
    const handleRubricModal = () => setCreateRubricModal(!createRubricModal);

    const [renderingCriteriaCreation, setRenderingCriteriaCreation] = useState<CriteriaRubricCreate[]>([]);
    const [tempCriteriaHelper, settempCriteriaHelper] = useState<CriteriaRubricCreate>({
        Descripcion: '',
        Nombre: '',
        Valor: ''
    });

    const handleChangeCriteria = (name: keyof CriteriaRubricCreate, value: string) => {
        if(name === 'Valor'){
            const parsedInt = parseInt(value, 10);
            if(isNaN(parsedInt)){
                showErrorTost({'position': 'top-right', text: 'El puntaje debe ser un numero'});
                settempCriteriaHelper((prevState) => ({
                    ...prevState,
                    [name]: ''
                }))
                return;
            }else if(parsedInt > 100){
                showErrorTost({'position': 'top-right', text: 'El puntaje debe ser menor al 100'});
                return;
            }else{
                if(renderingCriteriaCreation.length > 0){
                    const totalPuntaje = renderingCriteriaCreation.reduce((acc, current) => {
                        const parsedValue = parseInt(current.Valor, 10);
                        return acc + parsedValue;
                    }, 0);

                    if(totalPuntaje + parsedInt <= 100){
                        settempCriteriaHelper((prevState) => ({
                            ...prevState,
                            [name]: value
                        }))
                    }else{
                        showErrorTost({'position': 'top-right', text: `El puntaje sobrepasa el maximo, puntaje disponible ${100 - totalPuntaje}`});
                        return;
                    }
                }else{
                    settempCriteriaHelper((prevState) => ({
                        ...prevState,
                        [name]: value
                    }))
                }
            }
        }else{
            settempCriteriaHelper((prevState) => ({
                ...prevState,
                [name]: value
            }))
        }
    }

    const handleDeleteOneCriteria = (name: string, value: string) => {
        const indexToRemove = renderingCriteriaCreation.findIndex((item) => item.Nombre === name && item.Valor === value);

        if (indexToRemove !== -1) {
            const updatedItems = [...renderingCriteriaCreation];
            updatedItems.splice(indexToRemove, 1);
            setRenderingCriteriaCreation(updatedItems);
        }
    }

    const addToRubricCriteria = () => {
        const temp = [...renderingCriteriaCreation];
        temp.push(tempCriteriaHelper);
        setRenderingCriteriaCreation(temp);
        cancelCreatingCriteria();
    }

    const editOneRubricCriteria = (name: string, value: string, desc: string) => {
        const indexToRemove = renderingCriteriaCreation.findIndex((item) => item.Nombre === name && item.Valor === value);

        if (indexToRemove !== -1) {
            const updatedItems = [...renderingCriteriaCreation];
            updatedItems.splice(indexToRemove, 1);
            setRenderingCriteriaCreation(updatedItems);
        }
        settempCriteriaHelper({
            Descripcion: desc,
            Nombre: name,
            Valor: value
        })
    }

    const cancelCreatingCriteria = () => {
        settempCriteriaHelper({
            Descripcion: '',
            Nombre: '',
            Valor: ''
        })
    }

    //Send Rubric
    const [isCreatingRubricLoading, setIsCreatingRubricLoading] = useState(false);

    const sendRubric = async (person_id: string) => {
        try {
            setIsCreatingRubricLoading(true);

            const response = await serverRestApi.post<Response>('/api/homeworks/rubric/createRubric',{
                person: person_id,
                criteria: renderingCriteriaCreation
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                cancelCreatingCriteria();
                setRenderingCriteriaCreation([]);
                await getRubrics(person_id);
            }
            setIsCreatingRubricLoading(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
            setIsCreatingRubricLoading(false)
        }
    }

    //Rubrics
    const [allRubrics, setAllRubrics] = useState<Rubric[]>([]);
    const [formatedRubrics, setFormatedRubrics] = useState<optionSelect[]>([]);

    const getRubrics = async (person_id: string) => {
        try {
            const response = await serverRestApi.get<Response>(`/api/homeworks/rubric/getAllRubrics/${person_id}`, { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setAllRubrics(response.data.data);

                
                const formated = response.data.data.map((rubric : Rubric) : optionSelect => {
                    
                    const resultString = rubric.criterias.map((criteria : CriteriaRubric) => `${criteria.Nombre.slice(0, 3)}: ${criteria.Valor}`).join(', ');
                    return ({
                        label: resultString,
                        value: rubric.ID_Rubrica
                    })
                })

                setFormatedRubrics(formated);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        }
    }

    //Unidades - Modules
    const [creatingUnitLoading, setCreatingUnitLoading] = useState(false);

    const createUnitLoading = async(title: string, classID: string, rubricId?: string) => {
        try {
            setCreatingUnitLoading(true);

            const body = {
                title: title,
                classId: classID,
                ...(rubricId ? { rubric: rubricId } : {})
            }

            const response = await serverRestApi.post<Response>('/api/homeworks/unit/createUnit', {
                ...body
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                showSuccessToast({position: 'top-center', text: response.data.message});
                setCreatingUnitLoading(false);
            }

        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
            setCreatingUnitLoading(false);
        }
    }

    //Get Unidades - Modulos
    const [classUnits, setClassUnits] = useState<Unit[]>([]);
    const [classUnitsOptions, setClassUnitsOptions] = useState<optionSelect[]>([])
    const [isGettingClassUnitsLoading, setisGettingClassUnitsLoading] = useState(true);

    const getClassUnits = async (class_id: String) => {
        try {
            setisGettingClassUnitsLoading(true);

            const response = await serverRestApi.get<Response>(`/api/homeworks/unit/getClassUnits/${class_id}`, { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setClassUnits(response.data.data);

                const formatedOptions = response.data.data.map((unidad: Unit) : optionSelect=> {
                    return ({
                        label: unidad.Nombre,
                        value: unidad.ID_Unidad
                    })
                });

                setClassUnitsOptions(formatedOptions);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        }finally{
            setisGettingClassUnitsLoading(false);
        }
    }

    //Assignment
    const [assigmentCreateModal, setAssigmentCreateModal] = useState(false);

    const handleAssigamentModal = () => setAssigmentCreateModal(!assigmentCreateModal);

    //CreateAssginment
    const [createAssignment, setCreateAssignment] = useState<CreateAssigment>({
        Titulo: '',
        Descripcion: '',
        Fecha_De_Entrega: '',
        FK_Clase: '',
        FK_Rubrica: '',
        Fk_Unidad: '',
        Alumnos_Actividad: [],
        Requiere_Anexos: false,
        Acepta_Despues: false,
        Calificable: false,
    });

    const handleToggleBoolean = (name: 'Requiere_Anexos' | 'Acepta_Despues' | 'Calificable') => {
        setCreateAssignment((prev) => ({
            ...prev,
            [name]: !prev[name]
        }))
    }


    //Returning 
    const value: HomeWorkContextInterface = {
        //Create Unit Modal
        unitModalState: createUnitModalState,
        handleUnitModalState: handleCreateUnitModal,
        newTitle: newTitle,
        onChangeTitle: onTitleChange,

        //Create Rubric Modal
        rubricModalState: createRubricModal,
        handleRubricModalState: handleRubricModal,
        criteriaCreationObj: renderingCriteriaCreation,
        criteriaCreateHandler: tempCriteriaHelper,
        handleOnChangeCriteria: handleChangeCriteria,
        cancelCriteriaCreate: cancelCreatingCriteria,
        addToRubric: addToRubricCriteria,
        deleteOneCriteria: handleDeleteOneCriteria,
        editOneCriteria: editOneRubricCriteria,

        //Rubric Create
        rubricCreateLoading: isCreatingRubricLoading,
        sendRubricCreate: sendRubric,
        rubrics: allRubrics,
        formatedOptRubrics: formatedRubrics,
        getRubrics: getRubrics,

        //send createUnit
        unitCreateLoading: creatingUnitLoading,
        sendCreateUnit: createUnitLoading,
        classUnits: classUnits,
        classUnitsOpt: classUnitsOptions,
        unitsLoading: isGettingClassUnitsLoading,
        getClassUnits: getClassUnits,

        //Assignment
        assigmentCreateModal: assigmentCreateModal,
        handleAssigmentCreateModal: handleAssigamentModal,
        createAssignmentObj: createAssignment,
        handleAssignToggleBooleans: handleToggleBoolean,
    }

    return (
        <HomeWorkContext.Provider value={value}>
            { children }
        </HomeWorkContext.Provider>
    )

}

export const useHomeworkContext = (): HomeWorkContextInterface => {
    const context = useContext(HomeWorkContext);
    if(context === undefined){
        throw new Error('useHomeworkContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}

