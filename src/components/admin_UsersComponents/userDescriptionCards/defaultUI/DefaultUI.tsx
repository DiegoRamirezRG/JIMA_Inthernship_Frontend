import { AiOutlineEdit } from "react-icons/ai"
import { defaultProps } from "../helpers/interfaces/userDescriptionInterface"

interface btnProps{
    funct?: () => any;
}

export const EditBtn = ({ funct }:btnProps) => {
    return (
        <button className='editBtn' onClick={funct}>
            <p>Editar</p>
            <AiOutlineEdit/>
        </button>
    )
}

export const DefaultCard = ({children, hasTitle, hasActionBtn, btnFunc, btnText, titleText}: defaultProps) => {
    return(
        <>
            {
                hasTitle || hasActionBtn
                ? <div className="extHeaderContainer">
                    {
                        hasTitle
                        ? <p>{titleText}</p>
                        : <></>
                    }
                    {
                        hasActionBtn 
                        ? <EditBtn funct={btnFunc ? btnFunc : () => {}}/>
                        : <></>
                    }
                </div>
                : <></>
            }
            <div className='userCardDetailedContainer'>
                {children}
            </div>
        </>
    )
}
