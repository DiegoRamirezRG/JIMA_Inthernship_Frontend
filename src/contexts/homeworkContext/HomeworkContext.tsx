import React, { createContext, useContext, useState } from 'react'
import { HomeWorkContextInterface, HomeWorkProvider } from '../../models/homeworkModels/HomeworkContextModels';
import { CreateRubricModal } from '../../components/teacherComponents/groupComponents/assignsComponentView/innerComponents/createRubricModal/CreateRubricModal';
import { AssigmentObject, AssigmentStudentTurnInfo, CreateAssigment, CriteriaRubric, CriteriaRubricCreate, Rubric, Unit } from '../../models/homeworkModels/HomeworkModels';
import { showErrorTost, showSuccessToast } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { optionSelect } from '../../models/universalApiModels/UniversalApiModel';
import { dataURLtoBlob, dataURLtoFile, fileToDataURL } from '../../hooks/admin_user/helpers/dataToBlob';
import { darken } from 'polished';

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
    const [createdRubricTempHelper, setCreatedRubricTempHelper] = useState<string>('');

    const sendRubric = async (person_id: string) => {
        try {
            setIsCreatingRubricLoading(true);

            const response = await serverRestApi.post<Response>('/api/homeworks/rubric/createRubric',{
                person: person_id,
                criteria: renderingCriteriaCreation
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                setCreatedRubricTempHelper(response.data.data);
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
    const [needDate, setNeedDate] = useState(false);

    const handleNeedDate = (newDate: boolean) => {
        if(!newDate){
            setCreateAssignment((prev) => ({
                ...prev,
                'Fecha_De_Entrega': '',
                'Acepta_Despues': false
            }))
        }
        setNeedDate(newDate)
    };

    //CreateAssginment

    const defaultAssigment: CreateAssigment = {
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
    }

    const [createAssignment, setCreateAssignment] = useState<CreateAssigment>(defaultAssigment);
    const [assigmentFiles, setAssigmentFiles] = useState<File[]>([]);

    const handleToggleBoolean = (name: 'Requiere_Anexos' | 'Acepta_Despues' | 'Calificable') => {
        setCreateAssignment((prev) => ({
            ...prev,
            [name]: !prev[name]
        }))

        if(name == 'Calificable' && createAssignment.Calificable){
            setCreateAssignment((prev) => ({
                ...prev,
                'FK_Rubrica': ''
            }))
        }else if(name == 'Requiere_Anexos' && createAssignment.Requiere_Anexos){
            setCreateAssignment((prev) => ({
                ...prev,
                'Fecha_De_Entrega': '',
                'Acepta_Despues': false
            }));
            setNeedDate(false);
        }
    }

    const handleOtherAttrEdit = (name: keyof CreateAssigment, value: any) => {
        setCreateAssignment((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const uploadFiles = (archivos: File[]) => {
        setAssigmentFiles(archivos);
    }

    const deleteAllAnexs = () => {
        setAssigmentFiles([]);
    }

    const cancelCreatinOfHomework = () => {
        setCreateAssignment(defaultAssigment);
    }

    const deleteOneFile = (fileName: string) => {
        const nuevosItems = assigmentFiles.filter((item) => item.name !== fileName);
        setAssigmentFiles(nuevosItems);
    }

    const addStudentsToAssign = (student_id: string) => {
        setCreateAssignment((prev)  => ({
            ...prev,
            Alumnos_Actividad: [...prev.Alumnos_Actividad, student_id]
        }))
    }

    const removeStudentFromAssign = (student_id: string) => {
        setCreateAssignment((prev)  => ({
            ...prev,
            Alumnos_Actividad: prev.Alumnos_Actividad.filter((id) => id !== student_id)
        }))
    }

    const resetStudentsFromAssign = () => {
        setCreateAssignment((prev)  => ({
            ...prev,
            Alumnos_Actividad: []
        }))
    }

    const setThePickedRubric = (rubric: string) => {
        setCreateAssignment((prev) => ({
            ...prev,
            'FK_Rubrica' : rubric
        }))
    }

    //Send create work
    const [sendCreationWorkLoading, setSendCreationWorkLoading] = useState(false);

    const sendCreateAssignment = async (class_id: string) => {
        try {
            setSendCreationWorkLoading(true);
            
            const response = await serverRestApi.post<Response>('/api/homeworks/work/createWork', {
                assignData: { ...createAssignment, FK_Clase: class_id }
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                
                console.log(response.data.data);
                console.log(assigmentFiles.length);

                if(assigmentFiles.length > 0){
                    console.log('Entre aqui')
                    const formData = new FormData();

                    for (const file of assigmentFiles) {
                        const dataURL = await fileToDataURL(file);
                        const newFile = dataURLtoFile(dataURL, file.name);
                        formData.append('files', newFile);
                    }

                    await serverRestApi.post<Response>(`/api/homeworks/work/uploadFile/${response.data.data}`, formData , {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    })

                    showSuccessToast({position: 'top-center', text: response.data.message});
                }
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        } finally {
            deleteAllAnexs();
            cancelCreatinOfHomework();
            getClassHomeWorks(class_id);
            handleAssigamentModal();
            setSendCreationWorkLoading(false);
        }
    }

    //Rubric For Homework
    const [pickARubricModal, setPickARubricModal] = useState(false);
    const [createOrPick, setcreateOrPick] = useState(false);
    const [selectedRubric, setSelectedRubric] = useState<string>('');

    const handleCreateOrPickSlide = (from: 'pick' | 'create') => {
        if(from == 'pick'){
            cancelSelectRubric();
            setcreateOrPick(true);
        }else{
            cancelCreatingCriteria();
            setRenderingCriteriaCreation([]);
            setcreateOrPick(false);
        }
    }

    const handlePickRubricModal = (newValue: boolean) => setPickARubricModal(newValue);
    const handleSelectRubric = (rubricId: string) => setSelectedRubric(rubricId);
    const cancelSelectRubric = () => setSelectedRubric('');

    //Get homeworks
    const [classHomeworks, setClassHomeworks] = useState<AssigmentObject[]>([]);

    const getClassHomeWorks = async(class_id: string) => {
        try {
            const response = await serverRestApi.get<Response>(`/api/homeworks/work/getAllWorks/${class_id}`, { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setClassHomeworks(response.data.data);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        }
    }

    //Handle Student Homwework
    const [studentAttachFiles, setStudentAttachFiles] = useState<File[]>([]);
    const [attachFileModal, setAttachFileModal] = useState(false);
    
    const [studentWorkStatus, setstudentWorkStatus] = useState<AssigmentStudentTurnInfo | boolean>(false);
    const [studentWotkStatusLoader, setstudentWotkStatusLoader] = useState(true);

    const handleAttachFileModal = () => setAttachFileModal(!attachFileModal);

    const uploadAttachedFiles = (archivos: File[]) => {
        if(studentAttachFiles.length > 0){
            setStudentAttachFiles((prev) => prev.concat(archivos));
        }else{
            setStudentAttachFiles(archivos);
        }
        setAttachFileModal(false);
    }

    const deleteAttachedFiles = (filename: string) => {
        const updatedFiles = studentAttachFiles.filter(file => file.name !== filename);
        setStudentAttachFiles(updatedFiles);
    }

    const deleteAllAttachments = () => setStudentAttachFiles([]);
    
    const getStudentWorkStatus = async (assign_id: string, person_id: string) => {
        try {
            const response = await serverRestApi.get<Response>(`/api/homeworks/work/workStatus/${assign_id}/${person_id}`,{ headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setstudentWorkStatus(response.data.data);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        }finally{
            setstudentWotkStatusLoader(false);
        }
    }

    //const send turn in

    const [isSendingWorkLoading, setIsSendingWorkLoading] = useState(false);

    const turnInStudentWork = async (person_id: string, assign_id: string) => {
        try {
            
            const fileNames : string[] = studentAttachFiles.map((file) => file.name);

            const response = await serverRestApi.post<Response>('/api/homeworks/work/turn_in' , {
                FK_Actividad: assign_id,
                ID_Persona: person_id,
                Archivos: fileNames,
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                if(studentAttachFiles.length > 0){

                    const formData = new FormData();

                    for (const file of studentAttachFiles) {
                        const dataURL = await fileToDataURL(file);
                        const newFile = dataURLtoFile(dataURL, file.name);
                        formData.append('files', newFile);
                    }

                    const fileRes = await serverRestApi.post<Response>(`/api/homeworks/work/turn_in/uploadFiles/${assign_id}/${person_id}`, formData, { headers: { Authorization: localStorage.getItem('token') } });

                    if(fileRes.data.success){
                        showSuccessToast({position: 'top-center', text: response.data.message});
                    }
                }
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        }finally{
            setIsSendingWorkLoading(false);
        }
    }

    //Handle Student All Grades

    const [studentGradesByClass, setStudentGradesByClass] = useState<AssigmentStudentTurnInfo[]>([]);
    const [getAllClassGradesLoadind, setgetAllClassGradesLoadind] = useState(true);

    const getStudentClassGrades = async (class_id: string, person_id: string) => {
        try {
            const response = await serverRestApi.get<Response>(`/api/homeworks/work/getStudentWork/${class_id}/${person_id}`, { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setStudentGradesByClass(response.data.data);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        }finally{
            setgetAllClassGradesLoadind(false);
        }
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
        selectedRubric: createdRubricTempHelper,

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
        handleAssignChange: handleOtherAttrEdit,
        loadAssigmentFiles: uploadFiles,
        assigmentFiles: assigmentFiles,
        deleteAssigmentFiles: deleteAllAnexs,
        cancelTheAssigmentCreation: cancelCreatinOfHomework,
        deleteFileByName: deleteOneFile,
        addStudentsToAssign: addStudentsToAssign,
        removeStudentsFromAssign: removeStudentFromAssign,
        resetStuedntAssign: resetStudentsFromAssign,
        needDate: needDate,
        handleNeedDate: handleNeedDate,
        sendCreateAssign: sendCreateAssignment,
        sendCreateAssignLoading: sendCreationWorkLoading,
        setRubricFK: setThePickedRubric,

        //Rubric For Homework
        pickRubricModal: pickARubricModal,
        handlePickRubricModal: handlePickRubricModal,
        createOrPickSlide: createOrPick,
        handleCreateOrPickSlide: handleCreateOrPickSlide,
        pickedRubric: selectedRubric,
        pickRubric: handleSelectRubric,
        cancelPickingRubric: cancelSelectRubric,

        //Get Assigments
        classAsigments: classHomeworks,
        getAssigmentsByClass: getClassHomeWorks,

        //Handle Student Homwework
        studentAttachedFiles: studentAttachFiles,
        attachStudentFiles: uploadAttachedFiles,
        deleteStudentAttachedFiles: deleteAttachedFiles,
        dropZoneAttachModal: attachFileModal,
        handleDropzoneAttachModal: handleAttachFileModal,
        deleteAllAtachemnts: deleteAllAttachments,
        homeworkStudntStatus: studentWorkStatus,
        homeworkStudntStatusLoader: studentWotkStatusLoader,
        gethomeworkStudntStauts: getStudentWorkStatus,
        
        //Turn In Assigment
        isTurnInLoading: isSendingWorkLoading,
        turnInAssign: turnInStudentWork,

        //Get All Class Grades
        turnInObjs: studentGradesByClass,
        turnInObjsLoading: getAllClassGradesLoadind,
        getTurnInObjs: getStudentClassGrades,
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

