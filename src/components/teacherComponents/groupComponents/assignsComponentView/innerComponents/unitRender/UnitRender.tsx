import React from 'react'
import './UnitRender.scss'
import { Unit } from '../../../../../../models/homeworkModels/HomeworkModels'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';

interface internalProps{
    unit: Unit;
}

export const UnitRender = ({ unit }: internalProps) => {
    return (
        <div className='UnitContainer'>
            <div className="unitHeader">
                <h3>
                    <a
                        data-tooltip-id="title-overflow-helper"
                        data-tooltip-content={`${unit.Nombre}`}
                        data-tooltip-place="top-start"
                        data-tooltip-delay-show={500}
                    >
                        {unit.Nombre}
                    </a>
                </h3>
                <div className="optionage">
                    <BsThreeDotsVertical />
                </div>
            </div>
            <div className="headerDivider"></div>
            <div className="homeWorksContainer">
                {
                    true
                    ?   <div className='no-homeworks'>
                            No has añadido ningun trabajo a esta unidad
                        </div>
                    :   <>Si hay</>
                }
            </div>
            <Tooltip id="title-overflow-helper" />
        </div>
    )
}
