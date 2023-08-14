import React from 'react'
import './FilterButton.scss'
import { typeFilter } from '../../../models/usersModels/UserModel';

interface props{
    text: string;
    isActive: boolean;
    onClickFunc: (event: React.MouseEvent<HTMLDivElement>) => void;
    idBtn: typeFilter;
}

export const FilterButton = ({text, isActive, onClickFunc, idBtn}: props) => {
    return (
        <div className={`filterButton ${isActive ? 'active' : ''}`} onClick={onClickFunc} id={idBtn}>
            {text}
        </div>
    )
}
