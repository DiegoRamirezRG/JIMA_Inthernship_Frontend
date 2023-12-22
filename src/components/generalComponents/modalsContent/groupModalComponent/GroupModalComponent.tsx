import React, { useEffect } from 'react'
import './GroupModalComponent.scss'
import { useGroupCreateModalContext } from '../../../../contexts/modals_states/groupModal/groupModal';
import { LoadingComponent } from '../../loadingComponent/LoadingComponent';
import { IoClose } from 'react-icons/io5';
import { useSchoolInfo } from '../../../../hooks/school_information/useSchoolInfo';
import { Group } from '../../../../models/schoolInfoModels/schoolInfoModels';
import { InputEditComponent } from '../../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent';
import { GroupCardComponent } from './groupCardComponent/GroupCardComponent';

export const GroupModalComponent = () => {

    const { changeGroupModalState } = useGroupCreateModalContext();

    const { getInitialData, griupsState, createOrEditGroup, isGettingInitDataLoading, handleGroupEditing, handleCancelGroupEditing, isGroupEditing, handleLoadGroupToEdit, generalLoader, sendCreateGroupe, sendGroupUpdate } = useSchoolInfo();

    useEffect(() => {
        const awaitFunc = async () => {
            await getInitialData();
        }
        awaitFunc();
    }, [])

    return (
        <>
            {
                isGettingInitDataLoading
                ?   <LoadingComponent/>
                :   <div className='modal-content'>
                        <div className="modal-header">
                            <h5>Administracion de Grupos</h5>
                            <button className='modal-btn-close' onClick={changeGroupModalState}>
                                <IoClose/>
                            </button>
                        </div>
                        <div className="divider"></div>
                        <div className="modal-body">
                            <div className="groupModalComponent">
                                <div className="inputSection">
                                    <div className="inputContainer">
                                        <InputEditComponent editActive={true} id='group_indicator' inputType='text' label='Grupo' name='Indicador' placeholder='Grupo' value={createOrEditGroup.Indicador != null  ? createOrEditGroup.Indicador : ''} key={'group_indicator'} onChange={handleGroupEditing}/>
                                    </div>
                                    <div className="butnSection">
                                        <button onClick={isGroupEditing ? sendGroupUpdate : sendCreateGroupe}>{isGroupEditing ? 'Actualizar' : 'Crear'}</button>
                                        <button onClick={handleCancelGroupEditing}>Cancelar</button>
                                    </div>
                                </div>
                                <div className="gridSection">
                                    {
                                        generalLoader
                                        ?   <LoadingComponent/>
                                        :   griupsState?.map((group: Group) => (
                                                <GroupCardComponent group={group} isEditing={isGroupEditing} loadGroup={handleLoadGroupToEdit} key={group.ID_Grupo}/>
                                            ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="modal-footer">
                            <button onClick={changeGroupModalState}>Cerrar</button>
                        </div>
                    </div>
            }
        </>
    )
}
