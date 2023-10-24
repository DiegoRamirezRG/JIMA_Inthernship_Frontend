import React from 'react'
import './FiltersCardComponent.scss'
import { useSubjectsContext } from '../../../../../contexts/subjectContext/SubjectsContext';
import { IoClose } from 'react-icons/io5';

export const FiltersCardComponent = () => {

    const { areasData } = useSubjectsContext();

    return (
        <div className='filterList'>
        <div className="innerFilterList-container">
            <div className="buttonContainerClean">
                <button className='cleanFilters'>
                    <IoClose/>
                    Limpiar Filtros
                </button>
            </div>
            <div className="scrollableFiltersChecks">
                <div className='check-filter' key={'active'}>
                    <label>
                        <input
                            type="checkbox"
                            checked={false}
                            onChange={() => {}}
                        />
                        <p>Activos</p>
                    </label>
                </div>
                <div className='check-filter' key={'inActive'}>
                    <label>
                        <input
                            type="checkbox"
                            checked={false}
                            onChange={() => {}}
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
                                    checked={false}
                                    onChange={() => {}}
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
