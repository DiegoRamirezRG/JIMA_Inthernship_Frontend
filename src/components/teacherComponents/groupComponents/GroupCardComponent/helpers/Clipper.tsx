import React from 'react'
import './Clipper.scss'

interface svgClipped {
    src: string;
}

export const Clipper = ({ src } : svgClipped) => {
    return (
        <div className="svgDivContainer">
            <svg viewBox="0 0 412 182">
                <defs>
                    <clipPath id="clip_card">
                        <path d="M263,122.06A15.06,15.06,0,0,1,278.06,107H398a15,15,0,0,0,15-15V15.06A15.06,15.06,0,0,0,397.94,0H15.06A15.06,15.06,0,0,0,0,15.06V166.94A15.06,15.06,0,0,0,15.06,182H248a15,15,0,0,0,15-15Z" />
                    </clipPath>
                </defs>
                <image xlinkHref={src} clipPath="url(#clip_card)" className='srcedImg' />
            </svg>
        </div>
    )
}
