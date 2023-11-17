import React, { useEffect, useState } from 'react'
import './ConfirmationComponents.scss'
import { ModalComponent } from '../../generalComponents/modalComponent/ModalComponent'
import { LoadingComponent } from '../../generalComponents/loadingComponent/LoadingComponent';
import { useLoadScheduleContext } from '../../../contexts/loadScheduleContext/LoadScheduleContext';
import { useCycleSchoolarContext } from '../../../contexts/initCycleSchoolar/CycleSchoolarContext';
import { useNavigate } from 'react-router-dom';

export const ConfirmationComponents = () => {

    const { sendScheduleLoader, sendSchedule } = useLoadScheduleContext();
    const { handleActivePage, stepActivePage, getCycleStatusFunc } = useCycleSchoolarContext();
    const [sureModal, setSureModal] = useState(false);
    const navigate = useNavigate();

    const handleSendUpdate = async () => {
        await sendSchedule()
            .then(async () => {
                await getCycleStatusFunc()
                    .then(() => {
                        navigate('/admin_cycle');
                    })
            })
    }

    const texts = [
        'Escondiendo secretos en la base de datos',
        'Haciendo magia con ceros y unos',
        'Convenciendo a las máquinas de que la escuela es genial',
        'Enseñando a los números a bailar salsa',
        'Dando un toque de genialidad al sistema'
    ]

    const [part, setPart] = useState<string>('');
    const [i, setI] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [forwards, setForwards] = useState<boolean>(true);
    const [skipCount, setSkipCount] = useState<number>(0);
    const skipDelay = 70;
    const speed = 30;

    useEffect(() => {
        if(sendScheduleLoader){
            const wordFlick = setInterval(() => {
                if (forwards) {
                    if (offset >= texts[i].length) {
                        setSkipCount((prevCount) => prevCount + 1);
                        if (skipCount === skipDelay) {
                            setForwards(false);
                            setSkipCount(0);
                        }
                    }
                } else {
                    if (offset === 0) {
                        setForwards(true);
                        setI((prevI) => (prevI + 1 >= texts.length ? 0 : prevI + 1));
                        setOffset(0);
                    }
                }
            
                const newPart = texts[i].substr(0, offset);
                setPart(newPart);
            
                if (skipCount === 0) {
                    setOffset((prevOffset) => (forwards ? prevOffset + 1 : prevOffset - 1));
                }
            }, speed);
        
            return () => clearInterval(wordFlick);
        }
    }, [forwards, i, offset, skipCount, speed, texts, sendScheduleLoader]);

    return (
        <>
            <div className='confrimMaxContainer'>
                <div className='AllSuited'>
                    <p>Todo esta listo para comenzar</p>
                    <p>Las reinscripciones han sido un exito y estan cargadas en la base de datos.</p>
                    <p>Las inscripciones han sido actualizadas en al base de datos.</p>
                    <p>Los horarios estan por cargarce al confirmar.</p>
                    <p>
                        Al dar confirmar, se cargaran los horarios de los grupos de inscripcion... ademas se iniciara como tal el ciclo el escolar en la base de datos.
                    </p>
                </div>
                <div className="confirmBtns">
                    <button className='cancel-btn' onClick={() => handleActivePage(stepActivePage - 1)}>Regresar</button>
                    <button className='save-btn' onClick={() => setSureModal(true)}>Confirmar</button>
                </div>
            </div>
            <ModalComponent modalState={sureModal} handleModalState={() => {}}>
                {
                    sendScheduleLoader
                    ?   <div className='loadingPlanMakerContainer'>
                            <div className="loadingBanner">
                                <LoadingComponent/>
                            </div>
                            <div className="loadingMessages">
                                <p className="loading-text">{part}</p>
                            </div>
                        </div>
                    :   <div className='confirmModal'>
                            <p>¿Estas completamente seguro?</p>
                            <div className="innerRow">
                                <button className='cancel-btn' onClick={() => setSureModal(false)}>No</button>
                                <button className='save-btn' onClick={ async () => await handleSendUpdate()}>Si, comenzar ciclo</button>
                            </div>
                        </div>
                }
            </ModalComponent>
        </>
    )
}
