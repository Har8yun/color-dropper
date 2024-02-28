interface AppState {
    selectedImage: string;
    selectedColor: string;
    isColorDropperActive: boolean;
    isAdvancedDropper: boolean;
}

export const INITIAL_STATE: AppState = {
    selectedImage: "",
    selectedColor: "#fefefe",
    isColorDropperActive: false,
    isAdvancedDropper: true,
};

export enum APP_ACTIONS {
    "SELECT_IMAGE" = "SELECT_IMAGE",
    "SELECT_COLOR" = "SELECT_COLOR",
    "SET_COLOR_DROPPER" = "SET_COLOR_DROPPER",
    "SET_ADVANCED_DROPPER" = "SET_ADVANCED_DROPPER",
}


type AppAction = {
    type: APP_ACTIONS;
    [payload: string]: any;
}

export const colorDropperReducer = (state: AppState, { type, payload }: AppAction) => {
    switch (type) {
        case APP_ACTIONS.SELECT_IMAGE:
            return {...state, selectedImage: payload.selectedImage}
        case APP_ACTIONS.SELECT_COLOR:
            return {...state, selectedColor: payload.selectedColor}
        case APP_ACTIONS.SET_COLOR_DROPPER:
            const isAdvancedDropper = payload.isColorDropperActive ? false : state.isAdvancedDropper;
            return {...state, isColorDropperActive: payload.isColorDropperActive, isAdvancedDropper}
        case APP_ACTIONS.SET_ADVANCED_DROPPER:
            const isColorDropperActive = payload.isAdvancedDropper ? false : state.isColorDropperActive;
            return {...state, isAdvancedDropper: payload.isAdvancedDropper, isColorDropperActive}
        default:
            throw Error(`Unknown action: ${type}`);
    }
}
