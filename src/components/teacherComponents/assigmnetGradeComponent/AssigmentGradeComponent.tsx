import React, { useEffect, useState } from 'react'
import './AssigmentGradeComponent.scss'
import { IoClose, IoPeople } from 'react-icons/io5'
import { StudentCheckRender } from './innerComponents/studentCheckRender/StudentCheckRender'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { InputEditComponent } from '../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent'
import { useParams } from 'react-router-dom'
import { useGradeContext } from '../../../contexts/gradeContext/GradeContext'
import { LoadingComponent } from '../../generalComponents/loadingComponent/LoadingComponent'
import { API_ADDR, APT_PORT } from '../../../utils/env/config'
import defaultProf from '../../../assets/img/default.jpg'
import startGrade from '../../../assets/svg/start_grade.svg'
import noDataRelax from '../../../assets/svg/relax_no_data.svg'
import { fileExt, getFileIcon } from '../../../utils/iconFilesMap/IconFilesMap'
import { Tooltip } from 'react-tooltip'
import { serverRestApi } from '../../../utils/apiConfig/apiServerConfig'
import { showErrorTost } from '../../generalComponents/toastComponent/ToastComponent'

export const AssigmentGradeComponent = () => {

    const [isGettingDataLoading, setIsGettingDataLoading] = useState(true);
    const { getStudentTurnToGrade, studentTurnToGrade, turnedDetail, gradingObj, showTurnedDetail, idsToSend, updateAllGrade, quickGraderSave, gradeUpdateLoader, sendGradesUpdate } = useGradeContext();
    const { assignId } = useParams();
    const [triggerGetTurnedInsFlag, settriggerGetTurnedInsFlag] = useState(false)
    
    const [setAllGrade, setSetAllGrade] = useState('');
    const [studentSearched, setStudentSearched] = useState('');

    const searchStudent = (name: any, value: string) => {
        setStudentSearched(value);
    }

    const handleAllGrade = (newGrade: string) => {
        if(newGrade != ''){
            const numberValue = parseInt(newGrade, 10);

            if(isNaN(numberValue)){
                showErrorTost({position: 'top-center', text: 'La calificacion necesita ser un numero'})
                return;
            }

            setSetAllGrade(newGrade);
            updateAllGrade(numberValue);
        }else{
            setSetAllGrade('');
            updateAllGrade(0);
        }
    }

    const downloadFile = async (filename: string, person_id: string) => {
        const response = await serverRestApi.get(`/api/files/download/homework/${assignId}/${person_id}/${filename}`, { headers: { Authorization: localStorage.getItem('token') }, responseType: 'blob' });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const sendGradesUpdateFunc = () => {
        if(assignId){
            const awaitF = async() => {
                await sendGradesUpdate(assignId);
            }

            setSetAllGrade('');
            setIsGettingDataLoading(true);

            awaitF().then(() => {
                settriggerGetTurnedInsFlag(!triggerGetTurnedInsFlag)
            })
        }else if(quickGraderSave != ''){
            const awaitF = async() => {
                await sendGradesUpdate(quickGraderSave);
            }

            setSetAllGrade('');
            setIsGettingDataLoading(true);
            
            awaitF().then(() => {
                settriggerGetTurnedInsFlag(!triggerGetTurnedInsFlag)
            })
        }
    }

    useEffect(() => {
        if(assignId){
            const awaitF = async() => {
                await getStudentTurnToGrade(assignId);
            }

            awaitF().then(() => setIsGettingDataLoading(false));
        }else if(quickGraderSave != ''){
            const awaitF = async() => {
                await getStudentTurnToGrade(quickGraderSave);
            }

            awaitF().then(() => setIsGettingDataLoading(false));
        }
    }, [quickGraderSave, triggerGetTurnedInsFlag])
    

    return (
        <div className='maxAssigmnetGradeContainer'>
            {
                isGettingDataLoading || gradeUpdateLoader
                ?   <LoadingComponent/>
                :   studentTurnToGrade.length > 0
                    ?   <>
                            <div className="headerGrader">
                                <button className='warning-btn' disabled={idsToSend.length == 0} onClick={ sendGradesUpdateFunc }>
                                    Calificar Seleccionados
                                </button>

                                <div className="gradeEveryoneSame"
                                    data-tooltip-id="filesTooltip"
                                    data-tooltip-content='Calificar a todos con: '
                                    data-tooltip-place="top"
                                >
                                    <input type="text" placeholder='0' disabled={idsToSend.length == 0} onChange={(e) => handleAllGrade(e.target.value)} value={setAllGrade}/>
                                    <div className="floatingHelperGrade">
                                        <p>/100</p>
                                    </div>
                                </div>
                            </div>
                            <div className="graderBodySection">
                                <div className="studentsToGrade">
                                    <StudentCheckRender title={'Todos los estudiantes'} icon={ <IoPeople/> } isAll={true}/>

                                    <div className="seacherContainer">
                                        <InputEditComponent id={'student_searcher'} placeholder={'Buscar alumno'} value={studentSearched} label={''} name={'Nombre'} inputType={'text'} editActive={true} onChange={searchStudent}/>
                                    </div>

                                    <div className="studentRenderingContainer">
                                        {
                                            studentTurnToGrade
                                            .filter((turnedIn) => {
                                                if(studentSearched === ''){
                                                    return true
                                                }else{
                                                    return turnedIn.Nombre_Completo.toLowerCase().includes(studentSearched.toLowerCase())
                                                }
                                            })
                                            .map((turnedIn, indx) => (
                                                <StudentCheckRender key={turnedIn.ID_Entregas} title={turnedIn.Nombre_Completo} img={turnedIn.Imagen != null ? `http://${API_ADDR}:${APT_PORT}/images/user_profiles/${turnedIn.ID_Persona}/${turnedIn.Imagen}` : defaultProf} isAll={false} graded={turnedIn} renderIndex={indx}/>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="gradeRenderDynamic">
                                    {
                                        turnedDetail
                                        ?   <div className='showingDetailedTurnedIn'>
                                                <div className="headerTurnedDetail">
                                                    <div className="innerCol">
                                                        <p>{ turnedDetail.Nombre_Completo }</p>
                                                        <p>{ turnedDetail.Calificacion ? 'Entregado' : 'Asignado' }</p>
                                                    </div>
                                                    {
                                                        turnedDetail.Calificacion
                                                        ?   <div className="innerCol grade">
                                                            {/* //TODO: Aqui poner la calificacion sobre calificacion*/}
                                                                <p>{ turnedDetail.Nombre_Completo }</p>
                                                                <p>{ turnedDetail.Calificacion ? 'Entregado' : 'Asignado' }</p>
                                                            </div>
                                                        :   <p className='newGrade'>{ gradingObj.find((obj) => obj.ID_Entrega = turnedDetail.ID_Entregas)?.Calificacion ? gradingObj.find((obj) => obj.ID_Entrega = turnedDetail.ID_Entregas)?.Calificacion + '/100' : 'Sin Calificacion' }</p>
                                                    }
                                                </div>
                                                <div className="attachedFiles">
                                                    {
                                                        turnedDetail.Anexos && turnedDetail.Anexos.length > 0 
                                                        && turnedDetail.Anexos.map((anex, index) => (
                                                            <div className='fileAttachedContainer'
                                                            data-tooltip-id="filesTooltip"
                                                            data-tooltip-content={anex}
                                                            data-tooltip-place="top"
                                                            onClick={() => downloadFile(anex, turnedDetail.ID_Persona)}
                                                            >
                                                                <div className="renderingPreview">
                                                                    {
                                                                        getFileIcon( fileExt(anex)! )
                                                                    }
                                                                </div>
                                                                <div className="fileInformationAside">
                                                                    <p className='file_name_attached'>{ anex.split('.')[0] }</p>
                                                                    <p>{ fileExt(anex)!.toUpperCase() }</p>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div className="optionFooter">
                                                    <button className='cancel-btn' onClick={() => showTurnedDetail(null)}>Cerrar</button>
                                                </div>
                                            </div>
                                        :   <div className='clickToShowAttachements'>
                                                <img src={ startGrade } />
                                                <p>Haz click sobre el nombre de alguno de los estudiantes para ver los archivos adjuntos que añadio</p>
                                            </div>
                                    }
                                </div>
                            </div>
                            <Tooltip id="filesTooltip" />
                    </>
                :   <div className='no_turnedIn'>
                        <p>No hay entregas que calificar</p>
                        <img src={noDataRelax} />
                    </div>
            }
        </div>
    )
}
