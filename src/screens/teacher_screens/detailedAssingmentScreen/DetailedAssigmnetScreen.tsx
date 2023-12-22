import React, { useState } from 'react'
import './DetailedAssigmnetScreen.scss'
import { NavigationComponent } from '../../../components/generalComponents/navigationComponent/NavigationComponent'
import { HomeworkHeader } from '../../../components/teacherComponents/detailedHomeworkComponents/homeworkHeader/HomeworkHeader'
import { useParams } from 'react-router-dom'
import { GradeHomeWorks } from '../../../components/teacherComponents/detailedHomeworkComponents/gradeHomeWorks/GradeHomeWorks'

export const DetailedAssigmnetScreen = () => {

    const { assignId } = useParams();
    const [pickerChange, setPickerChange] = useState(false);

    return (
        <NavigationComponent>
            <div className="maxDetailedComponent">
                <div className="selectorContainer">
                    <button className={pickerChange ? '' : 'selected'} onClick={() => setPickerChange(false)}>Informacion</button>
                    <button className={pickerChange ? 'selected' : ''} onClick={() => setPickerChange(true)}>Calificar</button>
                </div>
                {
                    pickerChange
                    ?   <GradeHomeWorks homeworkId={assignId!}/>
                    :   <HomeworkHeader homeworkId={assignId!}/>
                }
            </div>
        </NavigationComponent>
    )
}
