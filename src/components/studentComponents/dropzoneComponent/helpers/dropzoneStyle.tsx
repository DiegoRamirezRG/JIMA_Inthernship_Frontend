import { CSSProperties } from "react";

export const baseDropzoneStyle: CSSProperties = {
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
    height: '100%',
};

export const dropzoneFocusedStyle: CSSProperties = {
    borderColor: '#2196f3'
};  

export const dropzoneAcceptStyle: CSSProperties = {
    borderColor: '#6941C6',
    color: '#FFFFFF',
    backgroundColor: '#6941C6'
};

export const dropzoneRejectStyle: CSSProperties = {
    borderColor: '#ff1744'
};