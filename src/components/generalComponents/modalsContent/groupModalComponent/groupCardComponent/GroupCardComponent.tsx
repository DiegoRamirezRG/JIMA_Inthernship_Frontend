import React from 'react'
import './GroupCardComponent.scss'
import { Group } from '../../../../../models/schoolInfoModels/schoolInfoModels'
import { IoSettingsSharp } from 'react-icons/io5';

interface CardComponentInterface{
    group: Group;
    isEditing: boolean;
    loadGroup: (group: Group) => void;
}

export const GroupCardComponent = ({ group, isEditing, loadGroup }: CardComponentInterface) => {
    return (
        <div className='group_card'>
            <p>{group.Indicador}</p>
            <div className={`edit ${isEditing ? 'disable' : ''}`} onClick={() => loadGroup(group)}>
                <IoSettingsSharp/>
            </div>
        </div>
    )
}
