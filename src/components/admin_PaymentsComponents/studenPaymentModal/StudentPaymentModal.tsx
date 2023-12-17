import React, { useEffect, useState } from 'react'
import './StudentPaymentModal.scss'
import { IoClose, IoReceiptSharp, IoSearch, IoTrash, IoTrashOutline } from 'react-icons/io5'
import { usePaymentContext } from '../../../contexts/paymentsContext/PaymentContext'
import waiting from '../../../assets/svg/looking_for_payment.svg';
import { LoadingComponent } from '../../generalComponents/loadingComponent/LoadingComponent';
import { API_ADDR, APT_PORT } from '../../../utils/env/config';
import defaultImg from '../../../assets/img/default.jpg'
import moment from 'moment';
import { standByPayments } from '../../../models/paymentModels/PaymentModels';
import { HiBadgeCheck } from 'react-icons/hi';

export const StudentPaymentModal = () => {

    const { changeHandlePaymentsModal, standByPaymentsObj, getStandByPayments, sendMarkAsPayed, deletePayment } = usePaymentContext();
    const [getDataLoading, setGetDataLoading] = useState(true);

    const [selectedPayment, setselectedPayment] = useState<standByPayments | null>(null);
    const [searched, setSearched] = useState<string>('');
    const [helperLoading, setHelperLoading] = useState(false);

    const showPDF = (person_id: string, payment_id: string) => {
        const pdfUrl = `http://${API_ADDR}:${APT_PORT}/api/payments/generatePayment/${person_id}/${payment_id}`;
        window.open(pdfUrl, '_blank');
    }

    const handlePayed = async (id: string) => {
        setHelperLoading(true);
        await sendMarkAsPayed(id)
        .finally(() => {
            setselectedPayment(null);
            setHelperLoading(false);
        })
    }

    const handleDeletePayment = async (id: string) => {
        setHelperLoading(true);
        await deletePayment(id)
        .finally(() => {
            setselectedPayment(null);
            setHelperLoading(false);
        })
    }

    useEffect(() => {
        const awaitF = async () => {
            await getStandByPayments();
        }

        awaitF().then(() => setGetDataLoading(false));
    }, [])
    

    return (
        <div className='studentPaymentsAdminContainer'>
            {
                getDataLoading
                ?   <LoadingComponent/>
                :   <>
                        <div className="studentPaymentsHeader">
                            <h3>Gestion de pagos de servicios</h3>
                            <button className='cancel-btn' onClick={changeHandlePaymentsModal}>
                                <IoClose/>
                            </button>
                        </div>
                        <div className="studentPaymentContent">
                            <div className="paymentsAside">
                                <div className="searcherPayment">
                                    <div className="searcherInput">
                                        <IoSearch className='icon_s'/>
                                        <input type="text" placeholder='Buscar Estudiante' value={searched} onChange={(e) => setSearched(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="renderPayments">
                                    {
                                        standByPaymentsObj
                                        .filter((student) => student.Estudiante_Nombre.toLowerCase().includes(searched.toLowerCase()))
                                        .map((student) => (
                                            <div className='studentStandPayment' onClick={() => setselectedPayment(student)}>
                                                <div className="imgContainer">
                                                    <img src={student.Imagen != null ? `http://${API_ADDR}:${APT_PORT}/images/user_profiles/${student.ID_Persona}/${student.Imagen}` : defaultImg} alt="" />
                                                </div>
                                                <div className="studentInfo">
                                                    <p className='student_name'>{student.Estudiante_Nombre}</p>
                                                    <div className="innerRow">
                                                        <p>{ student.Concepto } - { student.Coste }</p>
                                                        <p className={`${moment(student.Creado_En).add(student.Vigencia).isAfter(moment()) ? 'danger' : 'safe'}`}>{ moment(student.Creado_En).add(student.Vigencia).isAfter(moment()) ? 'Vencido' : 'Vigente' }</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="managePaymentAside">
                                {
                                    selectedPayment
                                    ?   helperLoading
                                        ?   <div className='loaderContainer'>
                                                <LoadingComponent/>
                                                <p className='loaderBanner'>Cargando por favor espera</p>
                                            </div>
                                        :   <div className='manageThePayment'>
                                                <div className="userMaxInfo">
                                                    <div className="userImgContainer">
                                                        <img src={selectedPayment.Imagen != null ? `http://${API_ADDR}:${APT_PORT}/images/user_profiles/${selectedPayment.ID_Persona}/${selectedPayment.Imagen}` : defaultImg} alt="" />
                                                    </div>
                                                    <p className='studentName'>{selectedPayment.Estudiante_Nombre}</p>
                                                </div>
                                                <div className="actions">
                                                    <div className="dinamycHeightContainer">
                                                        <button className='done' onClick={() => handlePayed(selectedPayment.ID_Persona_Coste)}>
                                                            <HiBadgeCheck className='icon-opt-payment'/>
                                                            <p>Marcar pagado</p>
                                                        </button>
                                                        <button className='delete' onClick={() => handleDeletePayment(selectedPayment.ID_Persona_Coste)}>
                                                            <IoTrash className='icon-opt-payment'/>
                                                            <p>Cancelar cobro</p>
                                                        </button>
                                                        <button className='makePdf' onClick={() => showPDF(selectedPayment.ID_Persona, selectedPayment.ID_Persona_Coste)}>
                                                            <IoReceiptSharp className='icon-opt-payment'/>
                                                            <p>Ver archivo generado</p>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="options">
                                                    <button className='cancel-btn' onClick={() => setselectedPayment(null)}>Cancelar</button>
                                                </div>
                                            </div>
                                    :   <div className="waitingContainer">
                                            <img src={waiting} />
                                            <p>Selecciona un pago</p>
                                        </div>
                                }
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}
