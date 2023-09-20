import React from 'react'
import { DefaultCard, EditBtn } from '../../../userDescriptionCards/defaultUI/DefaultUI'
import { TeacherRol } from '../../interfaces/UserEditInterface'
import { IoSave, IoTrash } from 'react-icons/io5'
import { InputEditComponent } from '../../inputEditComponent/InputEditComponent'

export const TeacherTypeEditor = ({ RolData, editObserver, handleActiveEdit, handleRolEdit, isEditing, user, user_id }: TeacherRol) => {

    const dateObject = new Date(RolData.Fecha_De_Contratacion);
    const formattedDate = dateObject.toISOString().substring(0, 10);

    return (
        <DefaultCard hasActionBtn={false} hasTitle={false}>
            <div className="internalHeader">
                <p className='internalTitle'>Profesor</p>
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
                <InputEditComponent id='teacher_code' label='Código de Profesor' name='Codigo_De_Profesor' inputType='text' placeholder='Código de Profesor' value={RolData.Codigo_De_Profesor ? !editObserver ? RolData.Codigo_De_Profesor.slice(0, 30) : RolData.Codigo_De_Profesor : ''} editActive={isEditing} key={'teacher_code'} onChange={handleRolEdit}/>
                <InputEditComponent id='teacher_nss' label='NSS' name='NSS' inputType='text' placeholder='NSS' value={RolData.NSS ? RolData.NSS : ''} editActive={isEditing} key={'teacher_nss'} onChange={handleRolEdit}/>
                <InputEditComponent id='teacher_contract_date' label='Fecha de contratación' name='Fecha_De_Contratacion' inputType='date' placeholder='00/00/00' value={RolData.Fecha_De_Contratacion ? formattedDate : ''} editActive={isEditing} key={'teacher_contract_date'} onChange={handleRolEdit}/>
                <InputEditComponent id='teacher_url' label='URL' name='URL' inputType='text' placeholder='URL' value={RolData.URL != null && RolData.URL != 'null' && RolData.URL != '' ? RolData.URL as string : ''} editActive={isEditing} key={'teacher_URL'} onChange={handleRolEdit}/>
            </div>
        </DefaultCard>
    )
}
