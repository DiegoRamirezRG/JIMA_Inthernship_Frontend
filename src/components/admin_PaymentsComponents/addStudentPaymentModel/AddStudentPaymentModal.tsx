import React, { useEffect, useState } from 'react'
import './AddStudentPaymentModal.scss'
import { IoClose, IoSearch } from 'react-icons/io5'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import waiting from '../../../assets/svg/waiting_for_choose.svg';
import defaultImg from '../../../assets/img/default.jpg';
import { useStudentContext } from '../../../contexts/studentContext/StudentContext';
import { API_ADDR, APT_PORT } from '../../../utils/env/config';
import { RouterProvider } from 'react-router-dom';
import { usePaymentContext } from '../../../contexts/paymentsContext/PaymentContext';
import { StudentObj } from '../../../models/studentModels/StudentModel';
import { SelectedEditComponent, SelectedEditComponentWithIDS } from '../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent';
import { LoadingComponent } from '../../generalComponents/loadingComponent/LoadingComponent';

export const AddStudentPaymentModal = () => {

    const [searched, setsearched] = useState('')
    const [isDataLoading, setisDataLoading] = useState(true);
    const { allStudents, getAllStudents } = useStudentContext();
    const { handleAssignPaymentModal, allPaymentsOpt, sendCreateCharge } = usePaymentContext();

    const [studentSelected, setStudentSelected] = useState<StudentObj | null>(null);
    const [selectedOption, setselectedOption] = useState<string>('');
    const [createChargeLoad, setCreateChargeLoad] = useState(false);

    const handleSelectedOpt = (name: any, value: any) => {
        setselectedOption(value);
    }

    const sendCreateChargeFunc = async () => {
        setCreateChargeLoad(true);
        await sendCreateCharge(studentSelected!.ID_Persona, selectedOption)
            .then(() => {
                setStudentSelected(null);
                setselectedOption('');
                setCreateChargeLoad(false);
            })
    }

    useEffect(() => {
        const awaitF = async () => {
            await getAllStudents();
        }

        awaitF().then(() => {
            setisDataLoading(false);
        })
    }, [])
    

    return (
        <div className='addStudentPaymentContainer'>
            {
                isDataLoading
                ?   <></>
                :   <>
                        <div className="addStudentPaymentHeader">
                            <h3>Agregar un pago a un estudiante</h3>
                            <button className='cancel-btn' onClick={handleAssignPaymentModal}>
                                <IoClose/>
                            </button>
                        </div>
                        <div className="addStudentPaymentBody">
                            <div className="studentAside">
                                <div className="studentFilterContainer">
                                    <div className="searcherInput">
                                        <IoSearch className='icon_s'/>
                                        <input type="text" placeholder='Buscar Estudiante' value={searched} onChange={(e) => setsearched(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="studentRenderContainer">
                                    {
                                        allStudents
                                        .filter((student) => student.Nombre_Estudiante.toLowerCase().includes(searched.toLowerCase()))
                                        .map((student) => (
                                            <div className='studentRender' onClick={() => setStudentSelected(student)} key={student.ID_Estudiante}>
                                                <div className="imgContainer">
                                                    <img src={student.Imagen != null ? `http://${API_ADDR}:${APT_PORT}/images/user_profiles/${student.ID_Persona}/${student.Imagen}` : defaultImg} alt="" />
                                                </div>
                                                <div className="studentInfo">
                                                    <p>{student.Nombre_Estudiante}</p>
                                                    <p>Estudiante {student.Active ? 'Activo' : 'Inactivo'}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="studentsToPaymentAside">
                                {
                                    studentSelected
                                    ?   <div className='selectedUserRender'>
                                            {
                                                createChargeLoad
                                                ?   <div className='loaderContainer'>
                                                        <LoadingComponent/>
                                                        <p className='loaderBanner'>Creando el cargo, por favor espera</p>
                                                    </div>
                                                :   <>
                                                        <div className="userMaxInfo">
                                                            <div className="userImgContainer">
                                                                <img src={studentSelected.Imagen != null ? `http://${API_ADDR}:${APT_PORT}/images/user_profiles/${studentSelected.ID_Persona}/${studentSelected.Imagen}` : defaultImg} alt="" />
                                                            </div>
                                                            <p className='studentName'>{studentSelected.Nombre_Estudiante}</p>
                                                            <p className='studentType'>Estudiante {studentSelected.Active ? 'Activo' : 'Inactivo'}</p>
                                                        </div>
                                                        <div className="selectorOfService">
                                                            <SelectedEditComponentWithIDS id={''} name={''} editActive={true} label={'Selecciona el cargo a realizar'} value={selectedOption} opts={allPaymentsOpt} isClearable={true} onChange={handleSelectedOpt}/>
                                                        </div>
                                                        <div className="disclaimer">
                                                            <p>Por favor asegurese que este sea el usuario correcto y que el servicio sea el correcto.</p>
                                                        </div>
                                                        <div className="actionage">
                                                            <button className='cancel-btn' onClick={() => { setStudentSelected(null); handleSelectedOpt(null, null)}}>Cancelar</button>
                                                            <button className='save-btn' disabled={!(selectedOption)} onClick={ sendCreateChargeFunc }>Realizar cargo</button>
                                                        </div>
                                                    </>
                                            }
                                        </div>
                                    :   <div className='no_student_selected'>
                                            <img src={waiting}/>
                                            <p>Selecciona un estudiante</p>
                                        </div>
                                }
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}
