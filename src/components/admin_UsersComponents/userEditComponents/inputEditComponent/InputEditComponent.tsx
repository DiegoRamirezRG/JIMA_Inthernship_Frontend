import React, { ChangeEvent, useEffect, useState } from 'react'
import './InputEditComponent.scss'
import { Value, dateTimePickerInterface, dynamicInput, dynamicSelect, dynamicSelectWithBtn, hourInput, timerPickerInterface } from '../interfaces/DynamicInputInterface'
import Select from 'react-select'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { LoadingComponent } from '../../../generalComponents/loadingComponent/LoadingComponent'
import { Shift } from '../../../../models/schoolInfoModels/schoolInfoModels';
import TimePicker from 'react-time-picker'
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker'
import 'react-time-picker/dist/TimePicker.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-clock/dist/Clock.css';
import 'react-calendar/dist/Calendar.css';

export const InputEditComponent = ({ id, placeholder, value, label, inputType, name, editActive, onChange }: dynamicInput) => {
    return (
        <div className="detailedInputComponent">
            <label htmlFor={id}>{label}</label>
            <input type={inputType} placeholder={placeholder} id={id} value={value} name={name} disabled={!editActive} onChange={ onChange ? (e) => onChange(e.target.name, e.target.value) : () => {} }/>    
        </div>
    )
}

export const TimeEditComponent = ({ id, label, time, onChange, name, format }: timerPickerInterface) => {
    const isValidDate = moment(time, 'HH:mm', true).isValid();

    const handleTimeSet = (value: any) => {
        onChange(name, value);
    }
    return (
        <div className="detailedInputComponent">
            <label htmlFor={id}>{label}</label>
            <TimePicker value={isValidDate ? time: '12:00'} onChange={handleTimeSet} name={name} hourPlaceholder='00' minutePlaceholder='00' clockIcon={false} format={format} disableClock={true} clearIcon={false}/>
        </div>
    )
}

export const DateTimeComponent = ({ id, date, label, name, onChange }: dateTimePickerInterface) => {
    const dateHelper = moment(date).format('YYYY-MM-DD HH:mm:ss');
    const isValid = moment(dateHelper, 'YYYY-MM-DD HH:mm:ss', true).isValid();

    const handleSetDateTime = (value: any) => {
        onChange(name, moment(value).format('YYYY-MM-DD HH:mm:ss'));
    }
    
    return(
        <div className="detailedInputComponent">
            <label htmlFor={id}>{label}</label>
            <DateTimePicker onChange={handleSetDateTime} value={isValid ? dateHelper : ''} disableClock={true} calendarIcon={false} format='y-MM-dd h:m a' name={name}/>
        </div>
    )
}

export const SelectedEditComponent = ({ opts, editActive, id, name, label, value, onChange }: dynamicSelect) => {

    return (
        <div className="detailedInputComponent">
            <label htmlFor={id}>{label}</label>
            <Select
                value={opts ? opts!.find(opt => opt.value === value) : [{value: 'none', label: 'No tienes opciones'}]}
                isDisabled={!editActive}
                name={name} 
                maxMenuHeight={250}
                options={opts}
                onChange={onChange ? (e) => onChange(name, e?.label) : () => {}}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? '#EBEDF6' : 'transparent',
                        borderWidth: 1,
                        borderRadius: 40,
                        fontFamily: 'Quicksand',
                        fontSize: 20,
                        fontWeight: 600,
                        height: 30,
                        backgroundColor: 'white',
                        paddingLeft: 10
                    }),
                    dropdownIndicator: base => ({
                        ...base,
                        borderBottom: 'none',
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? '#6941C6' : state.isFocused ? '#E2E8F0' : 'white',
                        color: state.isSelected ? 'white' : 'black',
                        fontSize: 15,
                        fontFamily: 'Quicksand',
                    }),
                }}
            />
        </div>
    )
}

export const SelectedEditComponentWithIDS = ({ opts, editActive, id, name, label, value, onChange, isClearable }: dynamicSelect) => {

    return (
        <div className="detailedInputComponent">
            <label htmlFor={id}>{label}</label>
            <Select
                value={opts!.find(opts => opts.value === value)}
                isDisabled={!editActive}
                name={name} 
                options={opts}
                maxMenuHeight={200}
                isClearable={isClearable}
                onChange={onChange ? (e) => onChange(name, e?.value) : () => {}}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? '#EBEDF6' : 'transparent',
                        borderWidth: 1,
                        borderRadius: 40,
                        fontFamily: 'Quicksand',
                        fontSize: 20,
                        fontWeight: 600,
                        height: 30,
                        backgroundColor: 'white',
                        paddingLeft: 10
                    }),
                    dropdownIndicator: base => ({
                        ...base,
                        borderBottom: 'none',
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? '#6941C6' : state.isFocused ? '#E2E8F0' : 'white',
                        color: state.isSelected ? 'white' : 'black',
                        fontSize: 15,
                        fontFamily: 'Quicksand',
                    }),
                }}
            />
        </div>
    )
}

export const SelectedEditComponentWithAddBtn = ({ opts, editActive, id, name, label, value, onChange, addBtnAction }: dynamicSelectWithBtn) => {

    return (
        <div className="customSelectedInput">
            <label htmlFor={id}>{label}</label>
            <div className="innerContainer">
                <Select
                        value={value ? opts!.find(opts => opts.value === value) : {label: 'Selecciona una opcion', value: ''}}
                        isDisabled={!editActive}
                        name={name} 
                        options={opts}
                        onChange={onChange ? (e) => onChange(name, e?.value) : () => {}}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused ? '#EBEDF6' : 'transparent',
                                borderWidth: 1,
                                borderTopLeftRadius: 40,
                                borderBottomLeftRadius: 40,
                                fontFamily: 'Quicksand',
                                fontSize: 20,
                                fontWeight: 600,
                                height: 30,
                                backgroundColor: 'white',
                                paddingLeft: 10,
                                width: '100%',
                            }),
                            dropdownIndicator: base => ({
                                ...base,
                                borderBottom: 'none',
                            }),
                            option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isSelected ? '#6941C6' : state.isFocused ? '#E2E8F0' : 'white',
                                color: state.isSelected ? 'white' : 'black',
                                fontSize: 15,
                                fontFamily: 'Quicksand',
                            }),
                        }}
                    />
                    <button onClick={addBtnAction}><IoMdAddCircleOutline/></button>
            </div>
        </div>
    )
}

export const SelectedEditComponentWithAddBtnCustomRender = ({ opts, editActive, id, name, label, value, onChange, addBtnAction }: dynamicSelectWithBtn) => {

    return (
        <div className="customSelectedInput">
            <label htmlFor={id}>{label}</label>
            <div className="innerContainer">
                <Select
                        value={value ? opts!.find(opts => opts.value === value) : {label: 'Selecciona una opcion', value: ''}}
                        isDisabled={!editActive}
                        name={name} 
                        options={opts}
                        onChange={onChange ? (e) => onChange(name, e?.value) : () => {}}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused ? '#EBEDF6' : 'transparent',
                                borderWidth: 1,
                                borderTopLeftRadius: 40,
                                borderBottomLeftRadius: 40,
                                fontFamily: 'Quicksand',
                                fontSize: 20,
                                fontWeight: 600,
                                height: 30,
                                backgroundColor: 'white',
                                paddingLeft: 10,
                                width: '100%',
                            }),
                            dropdownIndicator: base => ({
                                ...base,
                                borderBottom: 'none',
                            }),
                            option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isSelected ? '#6941C6' : state.isFocused ? '#E2E8F0' : 'white',
                                color: state.isSelected ? 'white' : 'black',
                                fontSize: 15,
                                fontFamily: 'Quicksand',
                            }),
                        }}
                    />
                    <button onClick={addBtnAction}><IoMdAddCircleOutline/></button>
            </div>
        </div>
    )
}

export const HourPickerComponent = ({ value, label, name, onChange, hora, minuto, setHora, setMinuto, isAm, setIsAm } : hourInput) => {

    const [isLoading, setIsLoading] = useState(true);

    const handleHourChange = (value: string) => {
        const inputNumber = parseInt(value, 10);
        if(!isNaN(inputNumber) && inputNumber >= 1 && inputNumber <= 12){
            setHora(inputNumber.toString());
        }else if (value === ''){
            setHora('');
        }else if(value === '0'){
            setHora('0');
        }else if(value === '00'){
            setHora('12');
        }
    }

    const handleMinuteChange = (value: string) => {        
        const inputNumber = parseInt(value, 10);
        if(!isNaN(inputNumber) && inputNumber >= 1 && inputNumber <= 59){
            setMinuto(inputNumber.toString());
        }else if(value === '0'){
            setMinuto('0');
        }else if(value === '00' || value === '60'){
            setMinuto('00');
        }else if(value === ''){
            setMinuto('');
        }
    }

    useEffect(() => {
        if(value){
            const dbHour = value.split(':');
            const numberHour = parseInt(dbHour[0]);
            if(numberHour > 12){
                setIsAm(false);
                setHora((numberHour - 12).toString());
                setMinuto(dbHour[1]);
            }else{
                setHora(dbHour[0]);
                setMinuto(dbHour[1]);
            }
        }
        setIsLoading(false);
    }, [])

    return (
        <>
            {
                isLoading
                ?   <LoadingComponent/>
                :   <div className='detailedInputComponent'>
                        <p className='customLabel'>{label}</p>
                        <div className="hourComponentContainer">
                            <div className="hourSelecter">
                                <input type='text' placeholder='00' value={hora} onChange={(e) => handleHourChange(e.target.value)}/>
                            </div>
                            <div className="spliter">:</div>
                            <div className="hourSelecter">
                                <input type='text' placeholder='00' value={minuto} onChange={(e) => handleMinuteChange(e.target.value)}/>
                            </div>
                            <div className="handlerMedirian">
                                <button className={`${isAm ? 'Active' : ''} `} onClick={isAm ? () => {} : () => setIsAm(true)}>am</button>
                                <button className={`${isAm ? '' : 'Active'} `} onClick={!isAm ? () => {} : () => setIsAm(false)}>pm</button>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}