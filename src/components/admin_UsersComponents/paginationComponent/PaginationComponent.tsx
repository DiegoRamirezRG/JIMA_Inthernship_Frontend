import React from 'react'
import './PaginationComponent.scss'
import { IoChevronBackOutline, IoChevronForwardOutline, IoEllipsisHorizontalSharp } from 'react-icons/io5';

interface props{
    maxIndex: number;
    currentIndex: number;
    increaseIndex: () => void;
    decreaseIndex: () => void;
    navigateIndex: (index: number) => void;
}

export const PaginationComponent = ({ maxIndex, currentIndex, increaseIndex, decreaseIndex, navigateIndex }: props) => {

    const renderPaginationButtons = () => {
        const buttons = [];
        
        if (maxIndex > 4) {
            if (currentIndex <= 2) {
                for (let i = 1; i <= 3; i++) {
                    buttons.push(
                        <div
                            className={`paginationBtn ${i === currentIndex ? 'current' : ''}`}
                            onClick={() => navigateIndex(i)}
                            key={i}
                        >
                            {i}
                        </div>
                    );
                }
                buttons.push(<div className="paginationBtn ellipsis" key="ellipsis"><IoEllipsisHorizontalSharp /></div>);
            } else if (currentIndex >= maxIndex - 2) {
                buttons.push(<div className="paginationBtn ellipsis" key="ellipsis"><IoEllipsisHorizontalSharp /></div>);
                for (let i = maxIndex - 2; i <= maxIndex; i++) {
                    buttons.push(
                        <div
                            className={`paginationBtn ${i === currentIndex ? 'current' : ''}`}
                            onClick={() => navigateIndex(i)}
                            key={i}
                        >
                            {i}
                        </div>
                    );
                }
            } else {
                buttons.push(<div className="paginationBtn ellipsis" key="ellipsis-start"><IoEllipsisHorizontalSharp /></div>);
                for (let i = currentIndex - 1; i <= currentIndex + 2; i++) {
                    buttons.push(
                        <div
                            className={`paginationBtn ${i === currentIndex ? 'current' : ''}`}
                            onClick={() => navigateIndex(i)}
                            key={i}
                        >
                            {i}
                        </div>
                    );
                }
                buttons.push(<div className="paginationBtn ellipsis" key="ellipsis-end"><IoEllipsisHorizontalSharp /></div>);
            }
        } else {
            for (let i = 1; i <= maxIndex; i++) {
                buttons.push(
                    <div
                        className={`paginationBtn ${i === currentIndex ? 'current' : ''}`}
                        onClick={() => navigateIndex(i)}
                        key={i}
                    >
                        {i}
                    </div>
                );
            }
        }
        
        return buttons;
    };

    return (
        <div className="paginationContainer">
            <div className="paginationBtn before" onClick={decreaseIndex}>
                <IoChevronBackOutline/>
            </div>
            {renderPaginationButtons()}
            <div className="paginationBtn after" onClick={increaseIndex}>
                <IoChevronForwardOutline/>
            </div>
        </div>
    )
}
