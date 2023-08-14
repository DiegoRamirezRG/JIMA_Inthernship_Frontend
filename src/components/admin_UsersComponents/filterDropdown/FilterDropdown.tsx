import React, { useState } from 'react'
import Select from 'react-select';

export const FilterDropdown = () => {

    const [selectedOption, setSelectedOption] = useState<any>(null);

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    return (
        <Select
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: !state.isFocused ? '#D6D5DD' : 'transparent',
                    borderWidth: 2,
                    borderRadius: 40,
                    fontFamily: 'Quicksand',
                    fontSize: 20,
                    fontWeight: 550,
                    height: 45,
                    backgroundColor: state.isFocused ? '#EBEDF6' : 'transparent'
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
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
        />
    )
}
