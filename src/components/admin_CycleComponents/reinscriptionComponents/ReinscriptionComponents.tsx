import React from 'react'
import './ReinscriptionComponents.scss'
import { useCycleSchoolarContext } from '../../../contexts/initCycleSchoolar/CycleSchoolarContext'
import { ModalComponent } from '../../generalComponents/modalComponent/ModalComponent';
import { WatchListModal } from './innerComponents/watchListModal/WatchListModal';
import { useReinsInscrContext } from '../../../contexts/reins_inscrContext/ReinsInscrContext';
import { useStudentContext } from '../../../contexts/studentContext/StudentContext';
import { LastYeatStudentsObj } from '../../../models/studentModels/StudentModel';
import { WatchSubjectsModal } from './innerComponents/watchSubjectsModal/WatchSubjectsModal';
import { ReinscriptionScheduleModal } from '../../admin_Reinsc_Schedule/ReinscriptionScheduleModal';
import { useLoadReinsScheduleContext } from '../../../contexts/loadScheduleContext/loadReinsScheduleContext';

export const ReinscriptionComponents = () => {

    const { reinscription_Opts, reinscription_indexActive, reinscription_roadmap, reinscripction_nextView, reinscripction_backView, reinscripction_loadView, reinscription_screens, handleActivePage, stepActivePage } = useCycleSchoolarContext();
    const { userListModal, confirmedGroups, loadedGroups, showSubjListModal } = useReinsInscrContext();
    const { reinsScheduleMakerModal, reinscDoneHelper } = useLoadReinsScheduleContext();
    const { lastYearStudents } = useStudentContext();

    const filterData = (data: LastYeatStudentsObj[]) => {
        const carreras: Record<string, Record<string, Record<string, Record<string, {
            grado: number;
            grupo: string;
            turno: string;
            carrera: string;
            siguienteGrado: number | null;
            cantidadAlumnos: number;
            idsEstudiantes: string[];
            id_carrera: string;
            id_turno: string;
            id_grupo: string;
        }>>>> = {};

        data.forEach(item => {
            const carreraId = item.FK_Carrera;
            const turnoId = item.FK_Turno;
            const gradoId = item.FK_Grado;
            const grupoId = item.FK_Grupo;

            if (!carreras[carreraId]) {
                carreras[carreraId] = {};
            }

            if (!carreras[carreraId][turnoId]) {
                carreras[carreraId][turnoId] = {};
            }

            if (!carreras[carreraId][turnoId][gradoId]) {
                carreras[carreraId][turnoId][gradoId] = {};
            }

            if (!carreras[carreraId][turnoId][gradoId][grupoId]) {
                carreras[carreraId][turnoId][gradoId][grupoId] = {
                    grado: item.Numero,
                    grupo: item.Indicador,
                    turno: item.Turno,
                    carrera: item.Carrera,
                    siguienteGrado: null,
                    cantidadAlumnos: 0,
                    idsEstudiantes: [],
                    id_carrera: item.ID_Carrera,
                    id_turno: item.ID_Turno,
                    id_grupo: item.ID_Grupo,
                };
            }

            const siguienteGrado = item.Numero + 1;
            carreras[carreraId][turnoId][gradoId][grupoId].siguienteGrado = siguienteGrado;
            carreras[carreraId][turnoId][gradoId][grupoId].cantidadAlumnos += 1;
            carreras[carreraId][turnoId][gradoId][grupoId].idsEstudiantes.push(item.ID_Estudiante);
        });

        return carreras;
    }

    return (
        <div className='reinscriptionsStepContainer'>
            <div className="innerSteper">
                {
                    reinscription_Opts.map((item, index) => (
                        <div key={index} className={`container-rounded ${item.active ? 'active' : 'no-active'} ${item.completed ? 'completed' : 'inCompleted'}`} onClick={item.completed || item.active ? () => reinscripction_loadView(index) : () => {}}>
                            <div className="iconContainer">
                                {item.icon}
                            </div>
                            <p>{item.label}</p>
                        </div>
                    ))
                }
                <div className="connectorLine">
                    <div className="completedLine" style={{height: `calc((100% / ${reinscription_Opts.length}) * ${reinscription_roadmap + 1})`}}></div>
                </div>
            </div>
            <div className="stepperContentRender">
                <div className="innerContentSection">
                    {
                        reinscription_screens.get(reinscription_indexActive)
                    }
                </div>
                <div className="buttonsActionsSections">
                    {
                        reinscription_indexActive !== 0
                        ?   <button className='back' onClick={reinscripction_backView}>Anterior</button>
                        :   <div></div>
                    }
                    {
                        reinscription_indexActive !== reinscription_Opts.length - 1
                        ?   reinscription_indexActive == 0 && confirmedGroups.length == Object.keys(filterData(lastYearStudents)).length
                            ?   <button className='next' onClick={reinscripction_nextView}>Siguiente</button>
                            :   reinscription_indexActive == 1 && loadedGroups.length == Object.keys(filterData(lastYearStudents)).length
                                ?   <button className='next' onClick={reinscripction_nextView}>Siguiente</button>
                                :   <div></div>
                        :   reinscription_indexActive == 2 &&  reinscDoneHelper && reinscDoneHelper.length == Object.keys(filterData(lastYearStudents)).length
                            ?   <button className='next' onClick={() => handleActivePage(stepActivePage + 1)}>Siguiente</button>
                            :   <div></div>
                    }
                </div>
            </div>
            <ModalComponent modalState={userListModal} handleModalState={() => {}}>
                <WatchListModal/>
            </ModalComponent>
            <ModalComponent modalState={showSubjListModal} handleModalState={() => {}}>
                <WatchSubjectsModal/>
            </ModalComponent>
            <ModalComponent modalState={reinsScheduleMakerModal} handleModalState={() => {}} modalSize='modal-xxxl'>
                <ReinscriptionScheduleModal/>
            </ModalComponent>
        </div>
    )
}
