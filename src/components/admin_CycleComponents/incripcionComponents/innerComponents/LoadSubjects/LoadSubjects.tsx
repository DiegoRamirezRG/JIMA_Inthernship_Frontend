import { useEffect } from 'react';
import { useLoadScheduleContext } from '../../../../../contexts/loadScheduleContext/LoadScheduleContext'
import './LoadSubjects.scss'
import { LoadingComponent } from '../../../../generalComponents/loadingComponent/LoadingComponent';

export const LoadSubjects = () => {

    const { groups, groupsLoading, getGroupsFunc, getAndSetSubjects, subjectsPerGroup, subjectsLoader } = useLoadScheduleContext();

    useEffect(() => {
        const awaitFunc = async () => {
            await getGroupsFunc();
        }
        awaitFunc();
    }, [])
    
    const handleLoadALL = async () => {
        const tempHelp = groups?.filter((item) => {
            if(subjectsPerGroup.length == 0){
                return true;
            }else{
                return !subjectsPerGroup.some(subject => subject.id_Career === item.ID_Carrera);
            }
        });

        tempHelp!.length > 0
        ?   await getAndSetSubjects(tempHelp!, 0)
        :   () => {}
    }

    return (
        <div className='maxLoadSubjectContainer'>
            {
                groupsLoading
                ?   <LoadingComponent/>
                :   groups && groups.length === subjectsPerGroup.length
                    ?   <div className='AllSubjectsSuited'>
                            <p>Los materias han sido cargadas</p>
                            <p>Las materias han sido cargadas en la memoria temporal del sistema, en caso de que quieras cancelar los datos no se veran afectados y podras volver a empezar.</p>
                            <p>Por favor continua con la seleccion de profesores y horarios.</p>
                        </div>
                    :   <div className="loadSubjectsContainer">
                            <div className="makeGroupInnerHeader">
                                <h2>Tienes que cargar las materias para los siguientes grupos</h2>
                            </div>
                            {
                                subjectsLoader
                                ?   <LoadingComponent/>
                                :   <div className="gridSectionContainer">
                                        <div className="dynamicHeighContainer">
                                            {
                                                subjectsPerGroup.length > (groups!.length / 2)
                                                ?   <></>
                                                :   <div className='container-group all'>
                                                        <button onClick={handleLoadALL}>Cargar Todas Materias</button>
                                                    </div>
                                            }
                                            {
                                                groups && 
                                                groups?.filter((item) => {
                                                    if(subjectsPerGroup.length == 0){
                                                        return true;
                                                    }else{
                                                        return !subjectsPerGroup.some(subject => subject.id_Career === item.ID_Carrera);
                                                    }
                                                })
                                                .map((group, index) => (
                                                    <div className='container-group'>
                                                        <p>{group.Carrera}</p>
                                                        <button onClick={async () => await getAndSetSubjects([group], 0)}>Cargar Materias</button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                            }
                        </div>
            }
        </div>
    )
}
