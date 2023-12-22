import React from 'react'
import { AdminRol } from '../../interfaces/UserEditInterface'
import { DefaultCard, EditBtn } from '../../../userDescriptionCards/defaultUI/DefaultUI';
import { InputEditComponent } from '../../inputEditComponent/InputEditComponent';
import { IoSave, IoTrash } from 'react-icons/io5';

export const AdminTypeEditor = ({ RolData, editObserver, handleActiveEdit, handleRolEdit, isEditing, user, user_id }: AdminRol) => {

    const dateObject = new Date(RolData.Fecha_De_Contratacion);
    const formattedDate = dateObject.toISOString().substring(0, 10);

    return (
        <DefaultCard hasActionBtn={false} hasTitle={false}>
            <div className="internalHeader">
                <p className='internalTitle'>Administrador</p>
                {
                    !isEditing 
                    ? <EditBtn funct={handleActiveEdit}/> 
                    : <div className='editing-btns'>
                        <button onClick={() => {}}>
                            <IoSave/>
                            <p>Guardar</p>
                        </button>
                        <button onClick={() => {}}>
                            <IoTrash/>
                            <p>Cancelar</p>
                        </button>
                    </div>
                }
            </div>
            <div className="internalContentSection">
                <InputEditComponent id='admin_code' label='Código de Profesor' name='Codigo_De_Profesor' inputType='text' placeholder='Código de Profesor' value={RolData.Codigo_De_Administrativo ? !editObserver ? RolData.Codigo_De_Administrativo.slice(0, 30) : RolData.Codigo_De_Administrativo : ''} editActive={isEditing} key={'teacher_code'} onChange={handleRolEdit}/>
                <InputEditComponent id='admin_nss' label='NSS' name='NSS' inputType='text' placeholder='NSS' value={RolData.NSS ? RolData.NSS : ''} editActive={isEditing} key={'teacher_nss'} onChange={handleRolEdit}/>
                <InputEditComponent id='admin_contract_date' label='Fecha de contratación' name='Fecha_De_Contratacion' inputType='date' placeholder='00/00/00' value={RolData.Fecha_De_Contratacion ? formattedDate : ''} editActive={isEditing} key={'teacher_contract_date'} onChange={handleRolEdit}/>
                <InputEditComponent id='admin_url' label='URL' name='URL' inputType='text' placeholder='URL' value={RolData.URL != null && RolData.URL != 'null' && RolData.URL != '' ? RolData.URL as string : ''} editActive={isEditing} key={'teacher_URL'} onChange={handleRolEdit}/>
            </div>
        </DefaultCard>
    )
}
