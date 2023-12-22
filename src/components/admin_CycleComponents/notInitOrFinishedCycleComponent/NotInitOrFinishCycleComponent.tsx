import React from 'react'
import './NotInitOrFinishCycleComponent.scss';
import { useNavigate } from 'react-router-dom';

interface NotInitProps{
    type: showsable;
}

type showsable = 'not-init' | 'not-finished';

export const NotInitOrFinishCycleComponent = ({ type }: NotInitProps) => {

    const navigate = useNavigate();

    return (
        <div className='notInishedOrFinishedContainer'>
            <div className="createNewCalendarAdvisor">
                {
                    type == 'not-init'
                    ?   <>
                            <p>No se ha iniciado el Ciclo</p>
                            <p>El ciclo escolar acorde al calendario activo, no ha sido iniciado, por lo cual es necesario inicializarlo para comenzar, en el podras manejar alumnos, aspirantes, carreras, clases y mas.</p>
                            <p>En caso de haber un ciclo activo y te aparezca este mensaje, por favor contacta a soporte para solicitar mas informacion.</p>
                        </>
                    :   <>
                            <p>No se ha terminado de configurar el Ciclo</p>
                            <p>Bien hecho.... el ciclo escolar se esta configurando, pero no han terminado, por favor continua configurando el ciclo escolar.</p>
                            <p>En caso de haber terminado de configurar el ciclo y aun veas este mensaje, por favor contacta a soporte para solicitar mas informacion.</p>
                        </>
                }
            </div>
            <button onClick={() => navigate('/admin_cycle/init')} >{type == 'not-init' ? 'Iniciar Ciclo Escolar' : 'Continuar configurando'}</button>
        </div>
    )
}
