import React from 'react'
import { DefaultCard, EditBtn } from '../../userDescriptionCards/defaultUI/DefaultUI'
import { IoSave, IoTrash } from 'react-icons/io5'
import { CredentialsInformation } from '../interfaces/UserEditInterface'
import { InputEditComponent } from '../inputEditComponent/InputEditComponent'

export const CredentialsEditComponent = ({credentials, editActive, handleActiveEdit, handleCredentialsEdit, cancelCredentialsEdit, editObserver, activeSureModal}: CredentialsInformation) => {
    return (
        <DefaultCard hasTitle={false} hasActionBtn={false}>
            <div className="internalHeader">
                <p className='internalTitle'>Credenciales</p>
                {
                    !editActive 
                    ? <EditBtn funct={handleActiveEdit}/> 
                    : <div className='editing-btns'>
                        <button onClick={activeSureModal}>
                            <IoSave/>
                            <p>Guardar</p>
                        </button>
                        <button onClick={cancelCredentialsEdit}>
                            <IoTrash/>
                            <p>Cancelar</p>
                        </button>
                    </div>
                }
            </div>
            <div className="internalContentSection">
                <InputEditComponent id='credentials_email' placeholder='Correo electrónico' label='Correo electrónico' value={credentials.Correo ? credentials.Correo : ''} editActive={editActive} inputType='text' name='Correo' key={'credentials_email'} onChange={handleCredentialsEdit}/>
                <InputEditComponent id='credentials_password' placeholder='Contraseña' label='Contraseña' value={credentials.Contraseña ? !editObserver ? credentials.Contraseña.slice(0, 15) : credentials.Contraseña : ''} editActive={editActive} inputType='password' name='Contraseña' key={'credentials_password'} onChange={handleCredentialsEdit}/>
            </div>
        </DefaultCard>
    )
}
