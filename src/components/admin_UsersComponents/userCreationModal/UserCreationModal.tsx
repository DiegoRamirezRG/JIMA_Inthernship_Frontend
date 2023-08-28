import React, { ChangeEvent, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import './UserCreationModal.scss';
import { InputComp } from '../userDescriptionCards/inputComponents/InputComponents';
import { showErrorTost, showSuccessToast } from '../../generalComponents/toastComponent/ToastComponent';
import { Response } from '../../../models/responsesModels/responseModel';
import { useNavigate } from 'react-router-dom';

interface props{
    closeModal: () => void;
    register: (confirmPassword: string) => Promise<any>;
}

export const UserCreationModal = ({ closeModal, register }: props) => {

    const navigate = useNavigate();

    const [validatePassword, setValidatePassword] = useState<string>();

    const handlePassword  = ( e: EventTarget & HTMLInputElement ) => {
        const { value } = e;
        setValidatePassword(value);
    }
    
    const handleRegister = async () => {
        await register(validatePassword!)
            .then((result: Response) => {
                if(result.success){
                    showSuccessToast({text: result.message, position: 'top-center'});
                    navigate(`/admin_users/edit/${result.data}`);
                }
            })
            .catch((error) => {
                showErrorTost({text: error.message, position: 'top-right'});
            })
    }

    return (
        <div className='modal-content'>
            <div className="modal-header">
                <h5>Finaliza el registro</h5>
                <button className='modal-btn-close' onClick={closeModal}>
                    <IoClose/>
                </button>
            </div>
            <div className="divider"></div>
            <div className="modal-body">
                <p className='advice-text'>Para completar el proceso de registro, se requerirá que reintroduzcas la contraseña asignada. Esto asegurará la precisión y seguridad de tu información.</p>
                <div className="inputDetailed">
                    <label htmlFor='validatePassword'>Valida la contraseña</label>
                    <input id='validatePassword' type='password' placeholder='Contraseña' onChange={(e) => handlePassword(e.target)} value={validatePassword}/>
                </div>
                <div className="finishBtn">
                    <button onClick={handleRegister}>Registrar</button>
                </div>
            </div>
        </div>
    )
}
