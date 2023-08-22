import { AiOutlineEdit } from "react-icons/ai"
import { defaultProps } from "../helpers/interfaces/userDescriptionInterface"

export const EditBtn = () => {
    return (
        <button className='editBtn'>
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
                        ? <EditBtn/>
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
