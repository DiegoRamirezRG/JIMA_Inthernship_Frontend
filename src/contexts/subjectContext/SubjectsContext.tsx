import React, { createContext, useContext, useState } from 'react'
import { SubjectProviderProps, SubjectContextInterface } from '../../models/subjectsModels/SubjectContextModels';
import { showErrorTost, showSuccessToast } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { AreaModel, AreaModelCreate, SubjectModel, SubjectModelCreate, SubjectsFilters } from '../../models/subjectsModels/SubjectModels';
import { optionSelect } from '../../models/universalApiModels/UniversalApiModel';

const SubjectsContext = createContext<SubjectContextInterface | undefined>(undefined);

export const SubjectsContextProvider = ({ children }: SubjectProviderProps) => {

    //Get Subjects Data
    const [subjects, setSubjects] = useState<SubjectModel[]>([]);
    const [isGettingSubjectsLoading, setIsGettingSubjectsLoading] = useState(true);

    const getSubjects = async() => {
        try {
            const response = await serverRestApi.get<Response>('/api/subjects/getAllSubjects', { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                setSubjects(response.data.data);
                setFilteredSubjects(response.data.data);
                setIsGettingSubjectsLoading(false);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setIsGettingSubjectsLoading(false);
        }
    }

    //Create Subject
    const defaultSubject: SubjectModelCreate = {
        Nombre: '',
        Descripcion: null,
        Codigo_De_Materia: '',
        Creditos: 0,
        Horas_De_Clase: 0,
        FK_Area: '',
    }

    const [createSubject, setCreateSubject] = useState<SubjectModelCreate>(defaultSubject);
    const [creatingSubjectLoading, setCreatingSubjectLoading] = useState(false);

    const cancelSubjectCreate = () => {
        setCreateSubject(defaultSubject);
    }

    const handleSubjectCreateChange = (name: keyof SubjectModelCreate, value: any) => {
        setCreateSubject((prevState) => ({
            ...prevState,
            [name] : value
        }))
    }

    const handleCreateSubject = async () => {
        try {
            setCreatingSubjectLoading(true)

            if(createSubject.Nombre === '' || createSubject.Codigo_De_Materia === '' || createSubject.Creditos <= 0 || createSubject.Horas_De_Clase <= 0 || createSubject.FK_Area === ''){
                throw new Error('No se puede crear una materia con campos vacios');
            }

            const response = await serverRestApi.post<Response>('/api/subjects/createSubject', {
                ...createSubject
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                showSuccessToast({position: 'top-center', text: response.data.message});
                cancelSubjectCreate();
                setIsGettingSubjectsLoading(true);
                await getSubjects();
            }

            setCreatingSubjectLoading(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setCreatingSubjectLoading(false);
        }
    }

    //Filters Subjects
    const [filteredSubjects, setFilteredSubjects] = useState<SubjectModel[]>([]);
    const [filters, setFilters] = useState<SubjectsFilters>({
        state: 'all',
        areas: 'all'
    });

    const cancelFiltering = () => {
        setFilteredSubjects(subjects);
        cleanTheFilters();
    }

    const cleanTheFilters = () => {
        setFilters(() => ({
            state: 'all',
            areas: 'all'
        }))
    }

    const filterByAlreadyAdded = (exclude: string[]) => {
        const helperRemover = subjects.filter((element) => !exclude.includes(element.ID_Materia));
        setFilteredSubjects(helperRemover);
    }

    const handleFiltersState = (newState: boolean | "all") => {
        setFilters((prevState) => ({
            ...prevState,
            state: newState
        }))
    }

    const handleeFiltersAreas = (area: string | "all") => {
        if(area === "all"){
            setFilters((prevState) => ({
                ...prevState,
                areas: 'all'
            }));
        }else{
            if(filters.areas === 'all'){
                setFilters((prevState) => ({
                    ...prevState,
                    areas: [area]
                }));
            }else{
                if(!filters.areas.includes(area)){
                    setFilters((prevState) => ({
                        ...prevState,
                        areas: [...prevState.areas, area]
                    }))
                }else{
                    setFilters((prevState) => ({
                        ...prevState,
                        areas: prevState.areas !==  'all' ? prevState.areas.filter((oldArea) => oldArea !== area).length > 0 ? prevState.areas.filter((oldArea) => oldArea !== area): 'all' : [...prevState.areas],
                    }))
                }
            }
        }
    }

    //Get Areas Data
    const [areasData, setAreasData] = useState<AreaModel[] | null>(null);
    const [areasDataOptions, setAreasDataOptions] = useState<optionSelect[] | null>(null);
    const [isGettinAreasLoading, setIsGettinAreasLoading] = useState(true);

    const getAreas = async () => {
        try {
            const response = await serverRestApi.get<Response>('/api/subjects/areas/getAllAreas', { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                setAreasData(response.data.data);
                
                const formatedData = response.data.data.map(({ID_Area, Nombre}: AreaModel) => ({
                    value: ID_Area,
                    label: Nombre
                }));  
                
                setAreasDataOptions(formatedData);
                setIsGettinAreasLoading(false);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setIsGettinAreasLoading(false);
        }
    }

    //Create Area
    const staticAreaCreate: AreaModelCreate ={
        Nombre: '',
        Descripcion: '',
        Codigo_De_Area: ''
    }

    const [editAreaCreate, setEditAreaCreate] = useState(staticAreaCreate);
    const [createAreaLoading, setcreateAreaLoading] = useState(false);

    const handleAreaCreateChange = (name: keyof AreaModelCreate, value: any) => {
        setEditAreaCreate((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const cancelAreaEditing = () => {
        setEditAreaCreate(staticAreaCreate);
    }

    const handleCreateArea = async () => {
        try {
            setcreateAreaLoading(true);

            if(editAreaCreate.Nombre === '' || editAreaCreate.Codigo_De_Area === ''){
                showErrorTost({position: 'top-center', text: 'No se puede crear el area, campos vacios'})
                return;
            }

            const response = await serverRestApi.post<Response>('/api/subjects/areas/createArea', {
                Nombre: editAreaCreate.Nombre,
                Descripcion: editAreaCreate.Descripcion != '' ? editAreaCreate.Descripcion : null,
                Codigo_De_Area: editAreaCreate.Codigo_De_Area
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                showSuccessToast({position: 'top-center', text: response.data.message});
                setIsGettinAreasLoading(true);
                await getAreas();
                setEditAreaCreate(staticAreaCreate);
            }
            setcreateAreaLoading(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setcreateAreaLoading(false);
        }
    }


    //Returnings
    const contextValue: SubjectContextInterface = {
        //Get Subjects Data
        isSubjectsLoading: isGettingSubjectsLoading,
        subjectsData: subjects,
        getSubjectsData: getSubjects,

        //Filter Subjects
        filteredSubjects: filteredSubjects,
        filters: filters,
        excludeAdded: filterByAlreadyAdded,
        changeActiveFilter: handleFiltersState,
        changeAreasFilter: handleeFiltersAreas,
        cleanFilters: cleanTheFilters,
        cancelFiltering: cancelFiltering,

        //Get Areas Data
        isAreasLoading: isGettinAreasLoading,
        areasData: areasData,
        areaOpts: areasDataOptions,
        getAreasData: getAreas,

        //Create Area
        editableArea: editAreaCreate,
        cancelEditArea: cancelAreaEditing,
        handleChangeEditArea: handleAreaCreateChange,
        createAreaLoading: createAreaLoading,
        createAreaFunc: handleCreateArea,

        //Create Subject
        editableSubject: createSubject,
        cancelEditSubject: cancelSubjectCreate,
        handleChangeEditSubject: handleSubjectCreateChange,
        createSubjectFunc: handleCreateSubject,
        createSubjectLoading: creatingSubjectLoading,
    }

    return (
        <SubjectsContext.Provider value={contextValue}>
            { children }
        </SubjectsContext.Provider>
    )

}


export const useSubjectsContext = (): SubjectContextInterface => {
    const context = useContext(SubjectsContext);
    if(context === undefined){
        throw new Error('useSubjectsContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}

