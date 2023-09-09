import React from 'react'
import { DefaultCard, EditBtn } from '../../userDescriptionCards/defaultUI/DefaultUI'
import { IoSave, IoTrash } from 'react-icons/io5';
import { UserInformation } from '../interfaces/UserEditInterface';
import { InputEditComponent, SelectedEditComponent } from '../inputEditComponent/InputEditComponent';
import { genderOpt } from '../../userDescriptionCards/helpers/static_objects/static_objects';

export const UserEditComponent = ({ user, user_id, editActive, handleActiveEdit, handleUserChange, cancelUserEdit, activeSureModal }: UserInformation) => {

    const dateObject = new Date(user.Fecha_De_Nacimiento!);
    const formattedDate = dateObject.toISOString().substring(0, 10);

    return (
        <DefaultCard hasTitle={false} hasActionBtn={false}>
            <div className="internalHeader">
                <p className='internalTitle'>Información</p>
                {
                    !editActive 
                    ? <EditBtn funct={handleActiveEdit}/> 
                    : <div className='editing-btns'>
                        <button onClick={activeSureModal}>
                            <IoSave/>
                            <p>Guardar</p>
                        </button>
                        <button onClick={cancelUserEdit}>
                            <IoTrash/>
                            <p>Cancelar</p>
                        </button>
                    </div>
                }
            </div>
            <div className="internalContentSection">
                <InputEditComponent id='user_name' placeholder='Nombre' value={user.Nombre ? user.Nombre : ''} label='Nombre' name='Nombre' inputType='text' editActive={editActive} onChange={handleUserChange}/>
                <InputEditComponent id='user_Lastname' placeholder='Apellido Paterno' value={user.Apellido_Paterno ? user.Apellido_Paterno : ''} label='Apellido Paterno' name='Apellido_Paterno' inputType='text' key={'user_lastname'} editActive={editActive} onChange={handleUserChange}/>
                <InputEditComponent id='user_Extraname' placeholder='Apellido Materno' value={user.Apellido_Materno ? user.Apellido_Materno : ''} label='Apellido Materno (?)' name='Apellido_Materno' inputType='text' key={'user_extraname'} editActive={editActive} onChange={handleUserChange}/>
                <InputEditComponent id='user_CURP' placeholder='CURP' value={user.CURP ? user.CURP : ''} label='CURP' name='CURP' inputType='text' key={'user_curp'} editActive={editActive} onChange={handleUserChange}/>
                <InputEditComponent id='user_Phone' placeholder='Teléfono' value={user.Numero_De_Telefono ? user.Numero_De_Telefono.toString() : ''} label='Teléfono' name='Numero_De_Telefono' inputType='text' key={'user_phone'} editActive={editActive} onChange={handleUserChange}/>
                <InputEditComponent id='user_Bday' placeholder='Fecha de Nacimiento' value={formattedDate} label='Fecha de Nacimiento' name='Fecha_De_Nacimiento' inputType='date' key={'user_bday'} editActive={editActive} onChange={handleUserChange}/>
                <InputEditComponent id='user_nationality' placeholder='Nacionalidad' value={user.Nacionalidad ? user.Nacionalidad : ''} label='Nacionalidad (?)' name='Nacionalidad' inputType='text' key={'user_nationality'} editActive={editActive} onChange={handleUserChange}/>

                <SelectedEditComponent id='user_gender' key={'user_gender'} value={user.Genero ? user.Genero : ''} editActive={editActive} opts={genderOpt} name='Genero' label='Genero' onChange={handleUserChange}/>
            </div>
        </DefaultCard>
    )
}
