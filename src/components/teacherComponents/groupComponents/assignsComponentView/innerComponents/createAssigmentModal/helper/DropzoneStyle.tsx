import { CSSProperties } from "react";

export const baseStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#EBEDF6',
    borderStyle: 'solid',
    backgroundColor: 'white',
    color: '#9295A3',
    outline: 'none',
    transition: '0.2s all ease-in-out',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: 20,
    fontWeight: 550,
    cursor: 'pointer',
    userSelect: 'none',
};

export const focusedStyle: CSSProperties = {
    borderColor: '#2196f3'
};  

export const acceptStyle: CSSProperties = {
    borderColor: '#6941C6',
    color: '#6941C6',
};

export const rejectStyle: CSSProperties = {
    borderColor: '#ff1744'
};