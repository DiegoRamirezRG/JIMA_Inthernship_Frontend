import { AddressModelCreate } from "../../../../models/addressModels/AddressModel";
import { UserModelPersonCreate } from "../../../../models/authModels/UserModel";
import { inputProps } from "../helpers/interfaces/userDescriptionInterface";
import { optionSelect } from "../../../../models/universalApiModels/UniversalApiModel";
import Select, { SingleValue } from 'react-select'
import { administrativeCrate, parentCreate, studentCreate, teacherCreate } from "../../../../models/userTypesModels/UserTypesModel";

export const InputComp = ({ label, name, placeholder, onChange, type, id, value, onChangeAddress, handleRolInfo}: inputProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(name as keyof UserModelPersonCreate, event.target.value);
        }
        if(onChangeAddress){
            onChangeAddress(name as keyof AddressModelCreate, event.target.value);
        }

        if(handleRolInfo){
            handleRolInfo(name as keyof administrativeCrate | keyof teacherCreate | keyof studentCreate | keyof parentCreate, event.target.value);
        }
    };

    return (
        <div className="detailedInputComponent">
            <label htmlFor={id}>{label}</label>
            <input type={type} name={name} placeholder={placeholder} id={id} value={value} onChange={(e) => handleChange(e)}/>
        </div>
    )
}

export const SelectComp = ({ label, name, onChange, id, opts, onChangeAddress}: inputProps) => {

    const handleChange = (event: SingleValue<optionSelect>) => {
        if(onChange){
            onChange(name as keyof UserModelPersonCreate, event?.value);
        }

        if(onChangeAddress){
            onChangeAddress(name as keyof AddressModelCreate, event?.value);
        }
    };

    return (
        <div className="detailedInputComponent">
            <label htmlFor={id}>{label}</label>
            <Select 
                options={opts}
                onChange={(e) => handleChange(e)}
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