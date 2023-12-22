import React, { useEffect, useState } from 'react'
import './PaymentsScreen.scss'
import { NavigationComponent } from '../../../components/generalComponents/navigationComponent/NavigationComponent'
import { IoAdd, IoBagAdd, IoReceiptSharp, IoSearch } from 'react-icons/io5'
import { usePaymentContext } from '../../../contexts/paymentsContext/PaymentContext'
import { LoadingComponent } from '../../../components/generalComponents/loadingComponent/LoadingComponent'
import { ModalComponent } from '../../../components/generalComponents/modalComponent/ModalComponent'
import { BiSolidEditAlt } from 'react-icons/bi'
import { EditPaymentModal } from '../../../components/admin_PaymentsComponents/editPaymentModal/EditPaymentModal'
import { CreatePaymentModal } from '../../../components/admin_PaymentsComponents/createPaymentModal/CreatePaymentModal'
import { DarkColorsForWhite } from '../../../utils/colorRandom/ColorArrayRandom'
import { HiTicket } from 'react-icons/hi2'
import { StudentPaymentModal } from '../../../components/admin_PaymentsComponents/studenPaymentModal/StudentPaymentModal'
import { AddStudentPaymentModal } from '../../../components/admin_PaymentsComponents/addStudentPaymentModel/AddStudentPaymentModal'

export const PaymentsScreen = () => {

    const [isGettingDataLoading, setisGettingDataLoading] = useState(true);
    const [showActive, setShowActive] = useState(true);
    const { allPayments, getAllPayments, createBasicPayments, isCreatingPaymentsLoading, editModalState, handleEditModal, handleCreateModalState, createModalState, assingPaymentModal, handleAssignPaymentModal, handlePaymentsModal, changeHandlePaymentsModal } = usePaymentContext();
    const [searchedPayment, setSearchedPayment] = useState('');

    useEffect(() => {
        const awaitF = async () => {
            await getAllPayments();
        }

        awaitF().then(() => {
            setisGettingDataLoading(false);
        })
    }, [])

    return (
        <NavigationComponent>
            {
                isGettingDataLoading
                ?   <LoadingComponent/>
                :   <div className="paymentsMaxContainer">
                        <div className="paymentHeader">
                            <h2>Administrar cobros</h2>
                            {
                                allPayments.length > 0 ?
                                <button onClick={handleCreateModalState}>
                                    <IoAdd/>
                                    Añadir cobro
                                </button>
                                :   <></>
                            }
                            
                        </div>
                        <div className="paymentsContentSection">
                            {
                                allPayments.length > 0
                                ?   <>
                                        <div className="paymentConentHeader">
                                            <div className="searcherSection">
                                                <IoSearch className='icon'/>
                                                <input type="text" placeholder='Buscar un servicio' value={searchedPayment} onChange={(e) => setSearchedPayment(e.target.value)}/>
                                            </div>
                                            <div className="activeSection">
                                                <button className={`${showActive ? 'active' : 'no-active'}`} onClick={() => setShowActive(true)}>Activo</button>
                                                <button className={`${showActive ? 'no-active' : 'active'}`} onClick={() => setShowActive(false)}>Inactivo</button>
                                            </div>
                                        </div>
                                        <div className="paymentContentBody">
                                            <div className="dinamicHeight">
                                                {
                                                    allPayments
                                                    .filter((payment) => showActive ? payment.Active == true : payment.Active == false)
                                                    .filter((payment) => payment.Descripcion.toLowerCase().includes(searchedPayment.toLowerCase()) || payment.Concepto.toLowerCase().includes(searchedPayment.toLowerCase()))
                                                    .map((payment) => (
                                                        <div className='paymentCard' key={payment.ID_Costo}>
                                                            <div className="iconAside">
                                                                <div className="icon">
                                                                    <IoReceiptSharp />
                                                                </div>
                                                                <div className="icon" onClick={() => handleEditModal(payment)}>
                                                                    <BiSolidEditAlt />
                                                                </div>
                                                            </div>
                                                            <div className="conentAside">
                                                                <p className='title'>Concepto: {payment.Concepto}</p>
                                                                <p className='subtitle'>Descripcion: {payment.Descripcion}</p>
                                                                <p className='price'>Precio: ${payment.Coste}</p>
                                                                {
                                                                    payment.Vigencia != null ? <p className='limit'>Vigencia: {payment.Vigencia} dias</p> : <p>Sin vigencia</p>
                                                                }
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <div className="sideBarOpts">
                                                <div className="optGridDynamic">
                                                    <button onClick={ changeHandlePaymentsModal }>
                                                        <HiTicket className='iconly'/>
                                                        Pagos / Estudiante
                                                    </button>
                                                    <button onClick={ handleAssignPaymentModal }>
                                                        <IoBagAdd className='iconly'/>
                                                        Añadir Pago / Estudiante
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                :   <div className='no_payments_container'>
                                        <p className='no_payment_banner'>No existen ningun tipo de cobro de ningun servicio, para comenzar crearemos los siguientes dos pagos costos basicos, despues podreas crear mas o modificar estos mismos, los servicios son:</p>
                                        <ol>
                                            <li>Inscripcion - Coste $2,500.00 - Vigencia 3 dias</li>
                                            <li>Reinscripcion - Coste $2,500.00 - Vigencia 3 dias</li>
                                        </ol>
                                        <p className='advice'>Podras editarlos despues.</p>
                                        <button onClick={ createBasicPayments }>Crear Automaticamente</button>
                                    </div>
                            }
                        </div>
                    </div>
            }
            <ModalComponent handleModalState={() => {}} modalState={isCreatingPaymentsLoading}>
                <div className="loadingCreatingPayment">
                    <LoadingComponent/>
                    <p className='banner'>Creando los servicios</p>
                </div>
            </ModalComponent>
            <ModalComponent handleModalState={() => {}}  modalState={editModalState}>
                <EditPaymentModal/>
            </ModalComponent>
            <ModalComponent handleModalState={() => {}} modalState={createModalState}>
                <CreatePaymentModal/>
            </ModalComponent>
            <ModalComponent handleModalState={() => {}} modalState={handlePaymentsModal} modalSize='modal-lg'>
                <StudentPaymentModal/>
            </ModalComponent>
            <ModalComponent handleModalState={() => {}} modalState={assingPaymentModal} modalSize='modal-lg'>
                <AddStudentPaymentModal/>
            </ModalComponent>
        </NavigationComponent>
    )
}
