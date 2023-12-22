import { ReactNode } from "react";
import { PaymentModel, createPaymentModel, standByPayments } from "./PaymentModels";
import { optionSelect } from "../universalApiModels/UniversalApiModel";

export interface PaymentContextModel {
    //Get All Payments
    allPayments: PaymentModel[];
    allPaymentsOpt: optionSelect[];
    getAllPayments: () => Promise<void>;

    //Create Basic Payments
    createBasicPayments: () => Promise<void>;
    isCreatingPaymentsLoading: boolean;

    //Edit a Payment
    editModalState: boolean;
    workingPayment: PaymentModel | null;
    handleEditModal: (payment_id?: PaymentModel) => void;
    handleChangePayment: (name: keyof PaymentModel, value: any) => void;
    updateLoader: boolean;
    sendUpdate: () => Promise<void>;

    //Create a Payment
    createPaymentObj: createPaymentModel;
    createModalState: boolean;
    handleCreateModalState: () => void;
    handleCreateObj: (name: keyof createPaymentModel, value: any) => void;
    sendCreate: () => Promise<void>;
    createLoading: boolean;

    //Handle assign manually a payment
    assingPaymentModal: boolean;
    handleAssignPaymentModal: () => void;
    sendCreateCharge: (person_id: string, payment_id: string) => Promise<void>;

    //Handle Payments
    handlePaymentsModal: boolean;
    changeHandlePaymentsModal: () => void;

    //Get Stand By Payments
    standByPaymentsObj: standByPayments[];
    getStandByPayments: () => Promise<void>;

    //Mark a payment as payed
    sendMarkAsPayed: (person_payed_id: string) => Promise<void>;

    //Delete a Payment Charge
    deletePayment: (person_payed_id: string) => Promise<void>;
}

export interface PaymentProviderModel{
    children: ReactNode;
}
