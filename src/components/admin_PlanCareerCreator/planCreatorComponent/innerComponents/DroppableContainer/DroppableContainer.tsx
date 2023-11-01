import React, { useEffect, useState } from 'react'
import './DroppableContainer.scss'
import { useDrop } from 'react-dnd'
import { usePlanMakerContext } from '../../../../../contexts/planMakerContext/PlanMakerContext';
import { SubjectModel } from '../../../../../models/subjectsModels/SubjectModels';
import { SubjectCard } from '../SubjectCard/SubjectCard';

interface DroppableContainerInterface{
    index: number;
}

interface internStats{
    credits: number | 'N/A';
    hours: number | 'N/A';
}

export const DroppableContainer = ({ index }: DroppableContainerInterface) => {

    const { ciclesState, handleConfirmSetupModal } = usePlanMakerContext();

    const [stats, setStats] = useState<internStats>({
        credits: 'N/A',
        hours: 'N/A'
    })

    const sumStateCicleStats = (indice: number, field: keyof SubjectModel) => {
        if(ciclesState[indice]){
            const sum = ciclesState[indice].reduce((acc, obj) => {
                return acc + Number(obj[field]);
            }, 0)
            return sum !== 0 ? sum : 'N/A';
        }else{
            return 'N/A';
        }
    }

    const [{ isOver }, drop] = useDrop({
        accept: 'SubjectContainer',
        drop: (item: SubjectModel) => {
            handleConfirmSetupModal(item, index);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    useEffect(() => {
        const newState: internStats = {
            credits: sumStateCicleStats(index, 'Creditos'),
            hours: sumStateCicleStats(index, 'Horas_De_Clase')
        }
        setStats(newState);
    }, [ciclesState[index]]);
    

    return (
        <div className='DroppableContainer'>
            <div className="innerDropHeader">
                <h4>Semestre no. {index + 1}</h4>
                <div className="innerRow">
                    <p>Creditos: <b>{stats.credits}</b></p>
                    <p>Horas: <b>{stats.hours}</b></p>
                </div>
            </div>
            <div className={`droppablePlace ${isOver ? 'over' : 'no-over'}`} ref={drop}>
                {
                    ciclesState[index]
                    ?   ciclesState[index].length > 0
                        ?   <>
                                {
                                    ciclesState[index].map((item, index) => (
                                        <SubjectCard key={index} subject={item}/>
                                    ))
                                }
                            </>
                        :   <></>
                    :   <></>
                }
            </div>
        </div>
    )
}
