import React from 'react'
import './InputEditComponent.scss'
import { dynamicInput, dynamicSelect, dynamicSelectWithBtn } from '../interfaces/DynamicInputInterface'
import Select from 'react-select'
import { IoMdAddCircleOutline } from 'react-icons/io'

export const InputEditComponent = ({ id, placeholder, value, label, inputType, name, editActive, onChange }: dynamicInput) => {
    return (
        <div className="detailedInputComponent">
            <label htmlFor={id}>{label}</label>
            <input type={inputType} placeholder={placeholder} id={id} value={value} name={name} disabled={!editActive} onChange={ onChange ? (e) => onChange(e.target.name, e.target.value) : () => {} }/>    
        </div>
    )
}

export const SelectedEditComponent = ({ opts, editActive, id, name, label, value, onChange }: dynamicSelect) => {

    return (
        <div className="detailedInputComponent">
            <label htmlFor={id}>{label}</label>
            <Select
                value={opts!.find(opts => opts.value === value)}
                isDisabled={!editActive}
                name={name} 
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
