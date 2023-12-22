import React, { useState } from 'react'
import './AlergiesComponent.scss'
import { IoAdd, IoBan, IoSaveOutline, IoTrashOutline } from 'react-icons/io5'
import { AlergiesModel, AlergiesModelCreate } from '../../../../models/alergiesModel/AlergiesModel';
import { showErrorTost } from '../../../generalComponents/toastComponent/ToastComponent';

interface props{
    alergies: AlergiesModel[] | null;
    handleAlergies: (alergie: AlergiesModelCreate) => void;
    deleteAlergie: (searchedTitle: string) => void;
    showSable?: boolean;
}

interface alergie{
    title?: string;
    des?: string;
    itsAnew?: boolean;
    delteAlergie?: (searchedTitle: keyof AlergiesModelCreate) => void;
    isDisabled? : boolean;
}

interface alergiesOnChange {
    value: AlergiesModel;
    onChange: (name: keyof AlergiesModel, value: string) => void;
    addGlobal: () => void;
}

export interface addNewOneBTN {
    onClickFunction: () => void;
    isDisabled?: boolean;
}

export const AddNewOneBtn = ({ onClickFunction, isDisabled }: addNewOneBTN) => {
    return (
        <div className={`addNewContainer${isDisabled ? ' clickeable' : ' disabled-div'}`} onClick={onClickFunction} >
            <IoAdd/>
            <p>Añadir alergia</p>
        </div>
    );
}

export const NoAlergies = () => {
    return (
        <div className="noAlergiesContainer">
            <IoBan/>
            <p>No alergias</p>
        </div>
    )
}

export const AlergieInputs = ({ des, title, itsAnew, delteAlergie, isDisabled }: alergie) => {
    return (
        <div className="alergie">
            <div className="header">
                <input type="text" placeholder='Nombre' name='Nombre' value={title!= '' && title!= null ? title : ''} disabled={isDisabled ? false : true}/>
                {
                    isDisabled && isDisabled
                    ? <button id={title} onClick={(e) => delteAlergie!(e.currentTarget.id as keyof AlergiesModelCreate)}>
                        <IoTrashOutline/>
                    </button>
                    : <></>
                }
            </div>
            <textarea name="Descripcion" cols={1} rows={2} placeholder='Descripcion' value={des!= '' && des!= null ? des : ''} disabled={isDisabled ? false : true}></textarea>
        </div>
    )
}

export const AlergieInputsAdd = ({ value, onChange, addGlobal }: alergiesOnChange) => {
    return (
        <div className="alergie">
            <div className="header">
                <input type="text" placeholder='Nombre' name='Nombre' value={value.Nombre} onChange={(e) => onChange(e.target.name as keyof AlergiesModel, e.target.value)}/>
                <button onClick={addGlobal}>
                    <IoSaveOutline/>
                </button>
            </div>
            <textarea name="Descripcion" cols={1} rows={2} placeholder='Descripcion' value={value.Descripcion ? value.Descripcion : ''} onChange={(e) => onChange(e.target.name as keyof AlergiesModel, e.target.value)}></textarea>
        </div>
    )
}

export const AlergiesComponent = ({ alergies, handleAlergies, deleteAlergie, showSable }: props) => {

    const [showNewAlergie, setShowNewAlergie] = useState( showSable != null && showSable != undefined ? showSable : true );

    const [newAlergieToPush, setNewAlergieToPush] = useState<AlergiesModel>({
        Nombre: '',
        Descripcion: ''
    });

    const validateAlergie = ({ Nombre, Descripcion }: AlergiesModel) => {
        return new Promise((resolve, reject) => {            
            if(Nombre!.trim().length <= 0){
                reject(new Error('El titulo no puede ser vacio'));
            }else{
                const descripction = Descripcion ? Descripcion : '';
                handleAlergies({Nombre: Nombre, Descripcion: descripction});
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
                console.error(error);
            })
    }

    const writeAlergieHandler = (name: keyof AlergiesModel, value: string) => {
        setNewAlergieToPush((prevAlergie) => ({
            ...prevAlergie,
            [name]: value
        }));
    };
    

    const delteAlergie = (name: string) => {
        deleteAlergie(name);
    }

    const handleNewAlergie = () => {
        setShowNewAlergie(!showNewAlergie);
    }

    return (
        <div className='alergiesContainer'>
            <div className="headers">
                <p>Alergias</p>
            </div>
            <div className="alergiesPlaceSection">
                <AddNewOneBtn onClickFunction={handleNewAlergie} isDisabled={true}/>
                {
                    showNewAlergie ? <AlergieInputsAdd  value={{...newAlergieToPush}} onChange={writeAlergieHandler} addGlobal={addNewAlergie}/> : <></>
                }
                {
                    alergies != null && alergies?.length > 0
                    ? alergies.map((item, index) => (
                        <AlergieInputs key={index} des={item.Descripcion ? item.Descripcion : ''} title={item.Nombre} delteAlergie={delteAlergie}/>
                    ))
                    : <></>
                }
            </div>
        </div>
    )
}
