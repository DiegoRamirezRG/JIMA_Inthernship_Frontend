import React from 'react'
import './UnitRender.scss'
import { Unit } from '../../../../../../models/homeworkModels/HomeworkModels'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';
import { useHomeworkContext } from '../../../../../../contexts/homeworkContext/HomeworkContext';
import Collapsible from 'react-collapsible';
import { MdOutlineAssignment } from 'react-icons/md';
import moment from 'moment';
import { HomeworkRender } from './innerComponents/homeworkRender/HomeworkRender';

interface internalProps{
    unit: Unit;
}

export const UnitRender = ({ unit }: internalProps) => {

    const { classAsigments } = useHomeworkContext();

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
                    !(classAsigments.filter((homework) => homework.Fk_Unidad === unit.ID_Unidad).length > 0)
                    ?   <div className='no-homeworks'>
                            No has añadido ningun trabajo a esta unidad
                        </div>
                    :   <div className='homeworks_container'>
                            {
                                classAsigments
                                .filter((homework) => homework.Fk_Unidad === unit.ID_Unidad)
                                .map((homework) => (
                                    <HomeworkRender homework={homework} key={homework.ID_Actividad}/>
                                ))
                            }
                        </div>
                }
            </div>
            <Tooltip id="title-overflow-helper" />
        </div>
    )
}
