import React from 'react'
import { InputEditComponent } from '../../../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent'
import { useSubjectsContext } from '../../../../../contexts/subjectContext/SubjectsContext';

export const CreateAreaCard = () => {

    const { editableArea, handleChangeEditArea } = useSubjectsContext();

    return (
        <>
            <InputEditComponent key={'area_name'} id={'area_name'} placeholder={'Nombre de Area'} value={editableArea.Nombre} label={'Nombre de Area'} name={'Nombre'} inputType={'text'} editActive={true} onChange={handleChangeEditArea}/>
            <div className="detailedInputComponent">
                <label htmlFor="career_desc">Descripcion</label>
                <textarea name="Descripcion" id="area_desc" cols={1} placeholder='Descripcion' onChange={(e) => handleChangeEditArea('Descripcion', e.target.value)} value={editableArea.Descripcion!= null ? editableArea.Descripcion : ''}></textarea>
            </div>
            <InputEditComponent key={'area_code'} id={'area_code'} placeholder={'Codigo de Area'} value={editableArea.Codigo_De_Area} label={'Codigo de Area'} name={'Codigo_De_Area'} inputType={'text'} editActive={true} onChange={handleChangeEditArea}/>
        </>
    )
}
