import React from 'react'
import { DefaultCard, EditBtn } from '../../../userDescriptionCards/defaultUI/DefaultUI'
import { IoSave, IoTrash } from 'react-icons/io5'
import { StudentRol } from '../../interfaces/UserEditInterface';
import { InputEditComponent } from '../../inputEditComponent/InputEditComponent';
import { EnrollStudentComponent } from '../../enrollStudentComponent/EnrollStudentComponent';
import { useEnrollStudent } from '../../../../../hooks/admin_user/useEnrollStudent';

export const StudentTypeEditor = ({ RolData, handleActiveEdit, isEditing, editObserver, handleRolEdit, user, user_id, handleModalState }: StudentRol) => {

    return (
        <DefaultCard hasActionBtn={false} hasTitle={false}>
            <div className="internalHeader">
                <p className='internalTitle'>Estudiante</p>
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
                <InputEditComponent id='student_matricula' label='Matricula' name='Matricula' inputType='text' placeholder='Matricula' value={RolData.Matricula ? !editObserver ? RolData.Matricula.slice(0, 30) : RolData.Matricula : ''} editActive={isEditing} key={'estudent_matricula'} onChange={handleRolEdit}/>
                <InputEditComponent id='student_URL' label='URL (?)' name='URL' inputType='text' placeholder='URL' value={RolData.URL ? RolData.URL : ''} editActive={isEditing} key={'student_url'} onChange={handleRolEdit}/>
            </div>
            <div style={{marginTop: 20}}>
                <EnrollStudentComponent user_id={user_id} user={user} RolData={RolData} handleModalState={handleModalState}/>
            </div>
        </DefaultCard>
    )
}
