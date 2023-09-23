import React from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

interface props {
    text: string;
    position: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
}

export const showErrorTost = ({text, position}: props) => {
    toast.error(text, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}

export const showSuccessToast = ({ text, position }: props) => {
    toast.success(text, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}

export const showWarningToast = ({ text, position }: props) => {
    toast.warning(text, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}