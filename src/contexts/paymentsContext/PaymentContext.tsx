import React, { createContext, useContext, useState } from 'react'
import { PaymentContextModel, PaymentProviderModel } from '../../models/paymentModels/PaymentContextModels';
import { showErrorTost, showSuccessToast } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { PaymentModel, createPaymentModel, standByPayments } from '../../models/paymentModels/PaymentModels';
import { optionSelect } from '../../models/universalApiModels/UniversalApiModel';

const PaymentContext = createContext<PaymentContextModel | undefined>(undefined);

export const PaymentContextProvider = ({ children }: PaymentProviderModel) => {


    //Get All Payments
    const [allPayments, setallPayments] = useState<PaymentModel[]>([]);
    const [allPaymentsOption, setallPaymentsOption] = useState<optionSelect[]>([]);

    const getAllPayments = async () => {
        try {
            const response = await serverRestApi.get<Response>('/api/payments/getAllPayments', { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setallPayments(response.data.data);
                const formated = response.data.data.map((payment: PaymentModel): optionSelect => ({
                    label: `${payment.Concepto} - ${payment.Coste}`,
                    value: payment.ID_Costo
                }));

                setallPaymentsOption(formated);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        }
    }

    //Create Basic Payments
    const [loadingCreatingPayments, setLoadingCreatingPayments] = useState(false);

    const createAutoPayments = async () => {
        try {
            setLoadingCreatingPayments(true);

            const response = await serverRestApi.post<Response>('/api/payments/createBasicPayments', { }, { headers: { Authorization: localStorage.getItem('token')} });

            if(response.data.success){
                showSuccessToast({position: 'top-center', text: response.data.message});
                getAllPayments();
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        } finally {
            setLoadingCreatingPayments(false);
        }
    }

    //Edit a Payment
    const [editModalState, setEditModalState] = useState<boolean>(false);
    const [workingPayment, setWorkingPayment] = useState<PaymentModel | null>(null);
    const [updatingLoader, setupdatingLoader] = useState(false);

    const handleEditModal = (payment_id?: PaymentModel) =>  {
        if(payment_id){
            setWorkingPayment(payment_id);
            setEditModalState(true);
        }else{
            setWorkingPayment(null);
            setEditModalState(false);
        }
    }

    const handlePaymentEdit = (name: keyof PaymentModel, value: any) => {
        setWorkingPayment((prev) => ({
            ...prev!,
            [name]: value
        }));
    }

    const sendPaymentUpdate = async () => {
        try {
            setupdatingLoader(true);

            const response = await serverRestApi.put<Response>('/api/payments/updatePayment', {
                ...workingPayment
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                await getAllPayments();
                handleEditModal();
                showSuccessToast({position: 'top-right', text: response.data.message});
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        } finally {
            setupdatingLoader(false);
        }
    }

    //Create a Payment

    const defaultPaymentObj: createPaymentModel = {
        Concepto: '',
        Descripcion: '',
        Coste: '',
        Vigencia: '',
        Refenrencia_Bancaria: '',
        Active: true
    }

    const [createPaymentObj, setCreatePaymentObj] = useState<createPaymentModel>(defaultPaymentObj)
    const [createModalPayment, setCreateModalPayment] = useState(false);
    const [creationLoader, setCreationLoader] = useState(false);

    const handleCreateModalPayment = () => {
        if(createModalPayment){
            setCreatePaymentObj(defaultPaymentObj);
            setCreateModalPayment(false);
        }else{
            setCreateModalPayment(true);
        }
    }

    const handleChangeNewPayment = (name: keyof createPaymentModel, value: any) => {
        setCreatePaymentObj((prev) => ({
            ...prev,
            [name] : value
        }))
    }

    const sendCreatePayment = async () => {
        try {
            setCreationLoader(true);

            const response = await serverRestApi.post<Response>('/api/payments/createPayment', {
                ...createPaymentObj
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                await getAllPayments();
                handleCreateModalPayment();
                showSuccessToast({position: 'top-right', text: response.data.message});
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        } finally {
            setCreationLoader(false);
        }
    }

    //Handle assign manually a payment
    const [assignPaymentModal, setAssignPaymentModal] = useState(false);
    const handleAssigPaymentModal = () => setAssignPaymentModal(!assignPaymentModal);

    //Handle Send Charge
    const sendCharge = async (person_id: string, payment_id: string) => {
        try {
            const response = await serverRestApi.post<Response>('/api/payment/chargePayment', {
                person_id,
                payment_id
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                await getAllStandByPayments();
                showSuccessToast({position: 'top-center', text: response.data.message});
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        }
    }

    //Handle Payments
    const [handlePaymentsModal, setHandlePaymentsModal] = useState(false);
    const changeHandlePaymentModal = () => setHandlePaymentsModal(!handlePaymentsModal);

    //Get Stand By Payments
    const [standByPaymentsObj, setStandByPaymentsObj] = useState<standByPayments[]>([])

    const getAllStandByPayments = async () => {
        try {
            const response = await serverRestApi.get<Response>('/api/payments/standByPayments', { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setStandByPaymentsObj(response.data.data);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        }
    }

    //Mark a payment as payed
    const markAsPayed = async (person_payed_id: string) => {
        try {
            const response = await serverRestApi.put<Response>('/api/payments/markAsPayed', {
                ID_Persona_Coste: person_payed_id
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                await getAllStandByPayments();
                showSuccessToast({position: 'top-center', text: response.data.message});
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        }
    }

    //Delete a Payment Charge
    const deletePayment = async(person_payment_id: string) => {
        try {
            const response = await serverRestApi.delete<Response>(`/api/payment/deletePayment/${person_payment_id}`, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                await getAllStandByPayments();
                showSuccessToast({position: 'top-center', text: response.data.message});
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        }
    }

    //Returning Values
    const value: PaymentContextModel = {
        //Get All Payments
        allPayments: allPayments,
        allPaymentsOpt: allPaymentsOption,
        getAllPayments: getAllPayments,

        //Create Basic Payments
        createBasicPayments: createAutoPayments,
        isCreatingPaymentsLoading: loadingCreatingPayments,

        //Edit a Payment
        editModalState: editModalState,
        workingPayment: workingPayment,
        handleEditModal: handleEditModal,
        handleChangePayment: handlePaymentEdit,
        updateLoader: updatingLoader,
        sendUpdate: sendPaymentUpdate,

        //Create a Payment
        createPaymentObj: createPaymentObj,
        createModalState: createModalPayment,
        handleCreateModalState: handleCreateModalPayment,
        handleCreateObj: handleChangeNewPayment,
        sendCreate: sendCreatePayment,
        createLoading: creationLoader,

        //Handle assign manually a payment
        assingPaymentModal: assignPaymentModal,
        handleAssignPaymentModal: handleAssigPaymentModal,
        sendCreateCharge: sendCharge,

        //Handle Payments
        handlePaymentsModal: handlePaymentsModal,
        changeHandlePaymentsModal: changeHandlePaymentModal,

        //Get Stand By Payments
        standByPaymentsObj: standByPaymentsObj,
        getStandByPayments: getAllStandByPayments,

        //Mark a payment as payed
        sendMarkAsPayed: markAsPayed,

        //Delete a Payment Charge
        deletePayment: deletePayment,
    }

    return (
        <PaymentContext.Provider value={value}>
            { children }
        </PaymentContext.Provider>
    )

}

export const usePaymentContext = (): PaymentContextModel => {
    const context = useContext(PaymentContext);
    if(context === undefined){
        throw new Error('usePaymentContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}
