import React, { useState } from 'react'
import './FiltersCardComponent.scss'
import { useSubjectsContext } from '../../../../../contexts/subjectContext/SubjectsContext';
import { IoClose } from 'react-icons/io5';

export const FiltersCardComponent = () => {

    const { areasData, filters, changeActiveFilter, changeAreasFilter, cleanFilters } = useSubjectsContext();
    
    const handleActivationFilter = (activation: boolean) => {
        if(filters.state === activation){
            changeActiveFilter('all')
        }else{
            changeActiveFilter(activation);
        }
    }

    return (
        <div className='filterList'>
        <div className="innerFilterList-container">
            <div className="buttonContainerClean">
                <button className='cleanFilters' onClick={cleanFilters}>
                    <IoClose/>
                    Limpiar Filtros
                </button>
            </div>
            <div className="scrollableFiltersChecks">
                <div className='check-filter' key={'active'}>
                    <label>
                        <input
                            type="checkbox"
                            name='active_check'
                            checked={filters.state === true}
                            onChange={() => handleActivationFilter(true)}
                        />
                        <p>Activos</p>
                    </label>
                </div>
                <div className='check-filter' key={'inActive'}>
                    <label>
                        <input
                            type="checkbox"
                            name='inactive_check'
                            checked={filters.state === false}
                            onChange={() => handleActivationFilter(false)}
                        />
                        <p>Inactivos</p>
                    </label>
                </div>
                {
                    areasData!.map((area, index) => (
                        <div className='check-filter' key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={filters.areas.includes(area.ID_Area)}
                                    onChange={() => changeAreasFilter(area.ID_Area)}
                                />
                                <p>{area.Nombre}</p>
                            </label>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
    )
}
