import React from 'react'
import { dynamicInput, dynamicSelect } from '../interfaces/DynamicInputInterface'
import Select from 'react-select'

export const InputEditComponent = ({ id, placeholder, value, label, inputType, name, editActive }: dynamicInput) => {
    return (
        <div className="detailedInputComponent">
            <label htmlFor={id}>{label}</label>
            <input type={inputType} placeholder={placeholder} id={id} value={value} name={name} disabled={!editActive}/>    
        </div>
    )
}

export const SelectedEditComponent = ({ opts, editActive, id, name, label, value }: dynamicSelect) => {

    return (
        <div className="detailedInputComponent">
            <label htmlFor={id}>{label}</label>
            <Select
                value={opts!.find(opts => opts.value === value)}
                isDisabled={!editActive}
                name={name} 
                options={opts}
                onChange={() => {}}
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
