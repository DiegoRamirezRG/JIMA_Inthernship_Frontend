import React, { useState } from 'react'
import './AlergiesComponent.scss'
import { IoAdd, IoSaveOutline, IoTrashOutline } from 'react-icons/io5'
import { AlergiesModel, AlergiesModelCreate } from '../../../../models/alergiesModel/AlergiesModel';
import { showErrorTost } from '../../../generalComponents/toastComponent/ToastComponent';

interface props{
    alergies: AlergiesModel[] | null;
    handleAlergies: (alergie: AlergiesModelCreate) => void;
    deleteAlergie: (searchedTitle: string) => void;
}

interface alergie{
    title?: string;
    des?: string;
    itsAnew?: boolean;
    delteAlergie?: (searchedTitle: keyof AlergiesModelCreate) => void;
}

interface alergiesOnChange {
    value: AlergiesModel;
    onChange: (name: keyof AlergiesModel, value: string) => void;
    addGlobal: () => void;
}

const AddNewOneBtn = ({ onClickFunction }: { onClickFunction: () => void }) => {
    return (
        <div className="addNewContainer" onClick={onClickFunction}>
            <IoAdd/>
            <p>Añadir alergia</p>
        </div>
    );
}

const AlergieInputs = ({ des, title, itsAnew, delteAlergie }: alergie) => {
    return (
        <div className="alergie">
            <div className="header">
                <input type="text" placeholder='Nombre' name='Nombre' value={title!= '' && title!= null ? title : ''}/>
                <button id={title} onClick={(e) => delteAlergie!(e.currentTarget.id as keyof AlergiesModelCreate)}>
                    <IoTrashOutline/>
                </button>
            </div>
            <textarea name="Descripcion" cols={1} rows={2} placeholder='Descripcion' value={des!= '' && des!= null ? des : ''}></textarea>
        </div>
    )
}

const AlergieInputsAdd = ({ value, onChange, addGlobal }: alergiesOnChange) => {
    return (
        <div className="alergie">
            <div className="header">
                <input type="text" placeholder='Nombre' name='Nombre' value={value.Nombre} onChange={(e) => onChange(e.target.name as keyof AlergiesModel, e.target.value)}/>
                <button onClick={addGlobal}>
                    <IoSaveOutline/>
                </button>
            </div>
            <textarea name="Descripcion" cols={1} rows={2} placeholder='Descripcion' value={value.Descripcion} onChange={(e) => onChange(e.target.name as keyof AlergiesModel, e.target.value)}></textarea>
        </div>
    )
}

export const AlergiesComponent = ({ alergies, handleAlergies, deleteAlergie }: props) => {

    const [showNewAlergie, setShowNewAlergie] = useState(false);

    const [newAlergieToPush, setNewAlergieToPush] = useState<AlergiesModel>({
        Nombre: '',
        Descripcion: ''
    });

    const validateAlergie = ({ Nombre, Descripcion }: AlergiesModel) => {
        return new Promise((resolve, reject) => {
            console.log(Nombre!.trim().length <= 0);
            
            if(Nombre!.trim().length <= 0){
                reject(new Error('El titulo no puede ser vacio'));
            }else{
                handleAlergies({Nombre, Descripcion});
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
                <AddNewOneBtn onClickFunction={handleNewAlergie}/>
                {
                    showNewAlergie ? <AlergieInputsAdd  value={{...newAlergieToPush}} onChange={writeAlergieHandler} addGlobal={addNewAlergie}/> : <></>
                }
                {
                    alergies != null && alergies?.length > 0
                    ? alergies.map((item, index) => (
                        <AlergieInputs key={index} des={item.Descripcion} title={item.Nombre} delteAlergie={delteAlergie}/>
                    ))
                    : <></>
                }
            </div>
        </div>
    )
}
