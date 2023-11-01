import React, { useEffect, useState } from 'react'
import './SubjectsComponent.scss'
import { useSubjectsContext } from '../../../../../contexts/subjectContext/SubjectsContext';
import { LoadingComponent } from '../../../../generalComponents/loadingComponent/LoadingComponent';
import { InputEditComponent } from '../../../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent';
import { MdFilterAlt } from 'react-icons/md';
import { animated, useSpring } from 'react-spring';
import { FiltersCardComponent } from '../FiltersCardComponent/FiltersCardComponent';
import { CreateAreaCard } from '../CreateAreaCard/CreateAreaCard';
import { CreateSubjectCard } from '../CreateSubjectCard/CreateSubjectCard';
import { DraggableCard } from '../DraggableCard/DraggableCard';
import { IoClose } from 'react-icons/io5';

export const SubjectsComponent = () => {

    const { getSubjectsData, isSubjectsLoading, isAreasLoading, areasData, getAreasData, createAreaLoading, createAreaFunc, cancelEditArea, filteredSubjects, filters, cancelEditSubject, subjectsData } = useSubjectsContext();
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [createSubject, setCreateSubject] = useState<boolean>(false);
    const [createArea, setCreateArea] = useState<boolean>(false);
    const [searcher, setSearcher] = useState<string>('');


    const animation = useSpring({
        opacity: showFilter ? 1 : 0,
        transform: showFilter ? 'translateX(0%)' : 'translateX(-100%)',
    });

    const animation2 = useSpring({
        opacity: createSubject ? 1 : 0,
        transform: createSubject ? 'translateX(0%)' : 'translateX(-100%)',
    });

    const handleShowFilters = () => {
        setShowFilter(!showFilter);
        if(createArea){
            setCreateArea(false);
        }
    }

    const handleCreateArea = () => {
        if(createArea){
            cancelEditArea();
            setCreateArea(false);
        }else{
            setCreateArea(true);
        }
    }

    const handleCreateSubject = () => {
        if(createSubject){
            cancelEditSubject();
            setCreateSubject(false);
        }else{
            setCreateSubject(true);
        }
    }

    const handleFilterStats = (sum: boolean) : string => {
        if(sum){
            const activeAreasCount = filters.areas !== 'all' ? filters.areas.length : 0;
            const totalActiveCount = filters.state !== 'all' ? activeAreasCount + 1 : activeAreasCount;
            return totalActiveCount.toString();
        }else{
            return '0';
        }
    }

    const handleSearching = (name: any, value: any) => {
        setSearcher(value);
    }

    useEffect(() => {
        const awaitF = async () => {
            await getSubjectsData();
            await getAreasData();
        }
        awaitF();
    }, [])
    

    return (
        <div className='subjectsContainerPlace'>
            {
                isSubjectsLoading || isAreasLoading
                ?   <LoadingComponent/>
                :   createSubject
                    ?   <animated.div style={animation2} className='create-helper'>
                            <CreateSubjectCard cancel={handleCreateSubject}/>
                        </animated.div>
                    :   <div className="subjectsMainContent">
                            <div className="searcherInputSection">
                                <InputEditComponent id={'search_subj'} placeholder={'Escribe aqui...'} value={searcher} label={'Buscar Asignatura'} name={'Nombre'} inputType={'text'} editActive={!showFilter} onChange={handleSearching}/>
                                <div className="list-menu" onClick={createArea ? () => {} : () => handleShowFilters()}>
                                    <MdFilterAlt/>
                                    {
                                        filters.state !== 'all' || filters.areas !== 'all'
                                        ?  <div className="activeFiltersNumber">
                                                {
                                                    handleFilterStats(filters.state !== 'all' || filters.areas !== 'all')
                                                }
                                            </div>
                                        :   <></>

                                    }
                                </div>
                                {
                                    showFilter
                                    ?   <animated.div style={animation} className='filterMenuFloating'>
                                        <div className="filterAreaSection">
                                            {
                                                createArea
                                                ?   <div className='create-area'>
                                                        {
                                                            createAreaLoading
                                                            ?   <LoadingComponent/>
                                                            :   <CreateAreaCard/>
                                                        }
                                                    </div>
                                                :   areasData && areasData.length > 0
                                                    ?   <FiltersCardComponent/>
                                                    :   <div className='no-areas'>
                                                            <NoData singular='area'/>
                                                        </div>
                                            }
                                        </div>
                                        <div className="createArea">
                                            <button onClick={handleCreateArea} className={createArea ? 'cancel-btn' : 'save-btn'}>{createArea? 'Cancelar' : 'Crear Area'}</button>
                                            {
                                                createArea
                                                ?   <button className='save-btn' onClick={() => createAreaFunc().then(() => setCreateArea(false))}>Crear</button>
                                                :   <></>
                                            }
                                        </div>
                                        </animated.div>
                                    :   <></>
                                }
                            </div>
                            <div className="allSubjectsSection">
                                {
                                    filteredSubjects.length > 0
                                    ?   <div className='allSubjectsInnerDataContainer'>
                                            {
                                                filteredSubjects.filter(item => {
                                                    if(filters.state === 'all'){
                                                        return true;
                                                    }else{
                                                        return item.Actice == filters.state;
                                                    }
                                                }).filter(subject => {
                                                    if(filters.areas === 'all'){
                                                        return true;
                                                    }else{
                                                        return filters.areas.includes(subject.FK_Area);
                                                    }
                                                }).filter(subject => {
                                                    if(searcher === ''){
                                                        return true;
                                                    }else{
                                                        return subject.Nombre.toLowerCase().includes(searcher.toLowerCase())
                                                    }
                                                })
                                                .map((subject, index) => (
                                                    <DraggableCard subject={subject} key={index}/>
                                                ))
                                            }
                                        </div>
                                    :   subjectsData.length > 0
                                        ?   <NoMoraAvailable singular='materia' />
                                        :   <NoData singular='materia'/>
                                }
                            </div>
                            <div className="addNewSubjectBtn">
                                <button onClick={handleCreateSubject} className={'save-btn'}>Crear Materia</button>
                            </div>
                        </div>
            }
        </div>
    )
}

interface noData {
    singular: string;
}

export const NoData = ({ singular }: noData) => {
    return (
        <div className='noDataTexts'>
            <p>No existen {singular.toLowerCase()}s</p>
            <p>No tienes ningun {singular} registrada, por favor para continuar crea una {singular}</p>
            <p>Si tienes {singular}s registradas y aun veas este mensaje, por favor contacta a soporte para solicitar mas informacion.</p>
        </div>
    )
}

export const NoMoraAvailable = ({ singular }: noData) => {
    return (
        <div className='noDataTexts'>
            <p>No existen mas {singular.toLowerCase()}s</p>
            <p>Se han colocado todas las {singular}s en el plan de estudio. Si necesitas mas, crealas por favor.</p>
            <p>Si tienes {singular}s registradas y no aparecen aqui, por favor contacta a soporte para solicitar mas informacion.</p>
        </div>
    )
}