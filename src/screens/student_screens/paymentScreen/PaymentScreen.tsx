import React, { useContext, useEffect, useState } from 'react'
import './PaymentScreen.scss'
import { NavigationComponent } from '../../../components/generalComponents/navigationComponent/NavigationComponent'
import { usePaymentContext } from '../../../contexts/paymentsContext/PaymentContext'
import { LoadingComponent } from '../../../components/generalComponents/loadingComponent/LoadingComponent'
import AuthContext from '../../../contexts/authContext/AuthContext'
import { IoReceiptSharp } from 'react-icons/io5'
import moment from 'moment'
import { PiFilePdfFill } from 'react-icons/pi'
import { showErrorTost } from '../../../components/generalComponents/toastComponent/ToastComponent'
import { API_ADDR, APT_PORT } from '../../../utils/env/config'
import debt from '../../../assets/svg/no_debt.svg'

export const PaymentScreen = () => {

    const { getStandByPayments,  standByPaymentsObj } = usePaymentContext();
    const { state } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    const handleCreatePaymentReport = async (payment_id: string) => {
        try {
            const pdfUrl = `http://${API_ADDR}:${APT_PORT}/api/payments/generatePayment/${state.loggedUser?.ID_Persona}/${payment_id}`;
            window.open(pdfUrl, '_blank');
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }
    }

    useEffect(() => {
        const awaitFunc = async () => {
            await getStandByPayments()
        }

        awaitFunc().then(() => setIsLoading(false));
    }, []);
    

    return (
        <NavigationComponent>
            {
                isLoading
                ?   <LoadingComponent/>
                :   <div className="maxStudentPaymentsContainer">
                        <div className="studentPaymentHeader">
                            <h2>Pagos pendientes</h2>
                        </div>
                        <div className="standByPaymentsRendering">
                            {
                                standByPaymentsObj
                                .filter((student) => student.ID_Persona == state.loggedUser?.ID_Persona).length > 0
                                ?   <div className="dinamicGridHeight">
                                        {
                                            standByPaymentsObj
                                            .filter((student) => student.ID_Persona == state.loggedUser?.ID_Persona)
                                            .map((student) => (
                                                <div className='standByPaymentContainer'>
                                                    <div className="iconContainer">
                                                        <IoReceiptSharp />
                                                    </div>
                                                    <div className="paymentInfoContainer">
                                                        <div className="innerRow">
                                                            <p className='concept'>{student.Concepto}</p>
                                                            <div className="innerCol">
                                                                <p className='valid_p'>VALIDO HASTA</p>
                                                                <p className='date_p'>{ moment(student.Creado_En).add(student.Vigencia, 'days').format('DD/MM/YYYY') }</p>
                                                            </div>
                                                        </div>
                                                        <button className='pdfMaker' onClick={() => handleCreatePaymentReport(student.ID_Persona_Coste)}>
                                                            <PiFilePdfFill />
                                                            Descargar archivo
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                :   <div className='nodebt'>
                                        <p>Excelente, no tienes pagos pendientes</p>
                                        <img src={debt} />
                                    </div>
                            }
                        </div>
                    </div>
            }
        </NavigationComponent>
    )
}
