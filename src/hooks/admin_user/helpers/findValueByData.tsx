import { optionSelect } from "../../../models/universalApiModels/UniversalApiModel";

export const findValueByLabel = (arr: optionSelect[], targetLabel: string) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].label === targetLabel) {
            return arr[i].value;
        }
    }
    return null;
}

export const findLabelByValue = (arr: optionSelect[], targetValue: string) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].value === targetValue) {
            return arr[i].label;
        }
    }
    return null;
}