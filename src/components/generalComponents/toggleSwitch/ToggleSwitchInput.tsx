import React from 'react'
import './ToggleSwitchInput.scss'
import { ToggleInputInterface } from '../../../models/toggleInputModel/ToggleInputModel'

export const ToggleSwitchInput = ({ active, changeActive, disable } : ToggleInputInterface) => {
    return (
        <label className="toggle-switch">
            <input
                type="checkbox"
                checked={active}
                onChange={changeActive}
                disabled={disable}
            />
            <span className="slider"></span>
        </label>
    )
}
