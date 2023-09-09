import React, { useState } from 'react'
import { DefaultCard, EditBtn } from '../../userDescriptionCards/defaultUI/DefaultUI'
import { IoSave, IoTrash } from 'react-icons/io5';
import { MedicInformation } from '../interfaces/UserEditInterface';
import { InputEditComponent, SelectedEditComponent } from '../inputEditComponent/InputEditComponent';
import { blootTypes } from '../../userDescriptionCards/helpers/static_objects/static_objects';
import { AddNewOneBtn, AlergieInputs, AlergieInputsAdd, NoAlergies } from '../../userDescriptionCards/alergiesComponent/AlergiesComponent';
import { AlergiesModel } from '../../../../models/alergiesModel/AlergiesModel';
import { showErrorTost } from '../../../generalComponents/toastComponent/ToastComponent';

export const AlergiesEditComponent = ({ user, user_id, handleActiveEdit, isEditing, handleUserEdit, alergies, addNewAlergieGlobal, deleteAlergieGlobal, cancelAlergiesEdit, activeSureModal }: MedicInformation) => {

    const [showNewAlergie, setShowNewAlergie] = useState(false);
    const [newAlergieToPush, setNewAlergieToPush] = useState<AlergiesModel>({
        Nombre: '',
        Descripcion: ''
    });

    const writeAlergieHandler = (name: keyof AlergiesModel, value: string) => {
        setNewAlergieToPush((prevAlergie) => ({
            ...prevAlergie,
            [name]: value
        }));
    };

    const handleNewAlergie = () => {
        setShowNewAlergie(!showNewAlergie);
    }

    const validateAlergie = ({ Nombre, Descripcion }: AlergiesModel) => {
        return new Promise((resolve, reject) => {            
            if(Nombre!.trim().length <= 0){
                reject(new Error('El titulo no puede ser vacio'));
            }else{
                const descripction = Descripcion ? Descripcion : '';
                addNewAlergieGlobal({Nombre: Nombre, Descripcion: descripction});
                setShowNewAlergie(false);
                setNewAlergieToPush({
                    Nombre: '',
                    Descripcion: ''
                });
                resolve(true);
            }
        })
    }

    const addNewAlergie = () => {
        validateAlergie({...newAlergieToPush})
            .catch((error) => {
                showErrorTost({position: 'top-center', text: error.message});
                console.error(error);
            })
    }

    return (
        <DefaultCard hasTitle={false} hasActionBtn={false}>
            <div className="internalHeader">
                <p className='internalTitle'>Información Medica</p>
                {
                    !isEditing 
                    ? <EditBtn funct={handleActiveEdit}/> 
                    : <div className='editing-btns'>
                        <button onClick={() => {
                            setShowNewAlergie(false);
                            activeSureModal();
                        }}>
                            <IoSave/>
                            <p>Guardar</p>
                        </button>
                        <button onClick={() => {
                            setShowNewAlergie(false);
                            cancelAlergiesEdit();
                        }}>
                            <IoTrash/>
                            <p>Cancelar</p>
                        </button>
                    </div>
                }
            </div>
            <div className="internalContentSection">
                <SelectedEditComponent id='user_bloodType' label='Tipo de Sangre' name='Tipo_De_Sagre' value={user.Tipo_De_Sagre ? user.Tipo_De_Sagre: ''} editActive={isEditing} opts={blootTypes} onChange={handleUserEdit}/>
                <InputEditComponent id='user_emergency_number' label='Numero de Emergencia (?)' name='Numero_De_Emergencia' inputType='tel' placeholder='Numero de Emergencia' value={user.Numero_De_Emergencia ? user.Numero_De_Emergencia.toString() : ''} editActive={isEditing} key={'user_emergency_number'} onChange={handleUserEdit}/>
            </div>
            <div className='alergiesContainer'>
                <div className="headers">
                    <p>Alergias</p>
                </div>
                <div className="alergiesPlaceSection">
                    <AddNewOneBtn onClickFunction={handleNewAlergie} isDisabled={isEditing}/>
                    {
                        showNewAlergie ? <AlergieInputsAdd  value={{...newAlergieToPush}} onChange={writeAlergieHandler} addGlobal={addNewAlergie}/> : <></>
                    }
                    {
                        alergies != null && alergies.length > 0
                        ?   alergies.map((item, index) => (
                            <AlergieInputs key={index} des={item.Descripcion ? item.Descripcion : ''} title={item.Nombre} isDisabled={isEditing} delteAlergie={deleteAlergieGlobal}/>
                        ))
                        :   !isEditing 
                            ? <NoAlergies/> 
                            : <></>
                    }
                </div>
            </div>
        </DefaultCard>
    )
}
