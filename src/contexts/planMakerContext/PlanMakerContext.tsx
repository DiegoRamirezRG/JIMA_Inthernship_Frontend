import React, { createContext, useContext, useState } from 'react'
import { MakingPlanSubject, PlanMakerContextInterface, PlanMakerContextProviderInterface, SubjectsPerCicleInterface } from '../../models/careerPlansModels/PlanMakerContextModels';
import { SubjectModel } from '../../models/subjectsModels/SubjectModels';

const PlanMakerContext = createContext<PlanMakerContextInterface | undefined>(undefined);

export const PlanMakerContextProvider = ({ children} : PlanMakerContextProviderInterface) => {

    //Subjects per cicle
    const [subjectsPerCicle, setSubjectsPerCicle] = useState<SubjectsPerCicleInterface>({
    });
    const [prevUpdates, setPrevUpdates] = useState<MakingPlanSubject[]>([]);
    const [filterReTRigger, setFilterReTRigger] = useState(false);

    const prepareCiclesIntoArray = (cicles: number) => {
        setSubjectsPerCicle((prevState) => {
            const helperIndexing = Array.from({length: cicles}, (_, index) => []);
            return {...prevState, ...helperIndexing};
        })
    }

    const addOneSubject = async (subject: SubjectModel, cicle: number, prev: boolean, fk_prev?: string) => {
        setSubjectsPerCicle((prevState) => {
            return {
                ...prevState,
                [cicle] : [ ...(prevState[cicle] || []), subject],
            }
        });

        if(prev){
            const newRequirement: MakingPlanSubject = { prevSubject: fk_prev!, subject: subject.ID_Materia };
            setPrevUpdates((prevState) => [...prevState, newRequirement]);
        }
    }

    const deleteOneSubject = async (id_subject: string) => {
        for (const key in subjectsPerCicle) {
            if (subjectsPerCicle.hasOwnProperty(key)) {
                const updatedArray = subjectsPerCicle[key].filter(item => item.ID_Materia !== id_subject);
                setSubjectsPerCicle((prevState) => ({
                    ...prevState,
                    [key]: updatedArray
                }))
            }
        }

        const itemExists = prevUpdates.some(
            item => item.subject === id_subject || item.prevSubject === id_subject
        );

        if(itemExists){
            const updatedArray = prevUpdates.filter(
                item => item.subject !== id_subject && item.prevSubject !== id_subject
            );
            setPrevUpdates(updatedArray);
        }
        setFilterReTRigger(!filterReTRigger);
    }

    //Confirm and Setting modal
    const [confirmSetupModal, setConfirmSetupModal] = useState<boolean>(false);
    const [selectedSubject, setSelectedSubject] = useState<SubjectModel | null>(null);
    const [selectedCycle, setSelectedCycle] = useState<number | null>(null);

    const handleConfirmSetupModal = (subject?: SubjectModel, cicle?: number) => {
        if(subject != null && cicle != null){
            setSelectedSubject(subject);
            setSelectedCycle(cicle);
            setConfirmSetupModal(true);
        }else{
            setSelectedSubject(null);
            setSelectedCycle(null);
            setConfirmSetupModal(false);
        }
    }

    //Delete from plan modal and funcs
    const [deleteModel, setDeleteModel] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeletingLoading, setIsDeletingLoading] = useState(false);

    const handleDeleteModalState = (subject_id?: string) => {
        if(subject_id){
            setDeleteModel(true);
            setDeleteId(subject_id);
        }else{
            setDeleteModel(false);
            setDeleteId(null);
        }
    }

    const handleDeleteConfirm = async (): Promise<void> => {
        setIsDeletingLoading(true);
        return new Promise(async (resolve) => {
            await deleteOneSubject(deleteId!);
            handleDeleteModalState();
            setIsDeletingLoading(false);
            resolve();
        })
    }

    //Retunr Values
    const contextValues: PlanMakerContextInterface = {
        //Subjects per cicle
        prepareCiclesState: prepareCiclesIntoArray,
        ciclesState: subjectsPerCicle,
        addNewSubject: addOneSubject,
        deleteSubject: deleteOneSubject,
        confirmModalDelete: handleDeleteConfirm,
        triggerFilterHelper: filterReTRigger,
        deleteSubjectFromPlanLoading: isDeletingLoading,
        prevSubjects: prevUpdates,

        //Confirm and Setting modal
        confirmSetupModalState: confirmSetupModal,
        handleConfirmSetupModal: handleConfirmSetupModal,

        //Selected Subject
        selectedSubject: selectedSubject,
        numberOfCycle: selectedCycle,

        //Delete from plan modal and funcs
        deleteModalState: deleteModel,
        handleDeleteModalState: handleDeleteModalState,
        deletedId: deleteId
    }

    return (
        <PlanMakerContext.Provider value={contextValues}>
            { children }
        </PlanMakerContext.Provider>
    )
}


export const usePlanMakerContext = (): PlanMakerContextInterface => {
    const context = useContext(PlanMakerContext);
    if(context === undefined){
        throw new Error('useSubjectsContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}
