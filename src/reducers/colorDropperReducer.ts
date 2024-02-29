interface AppState {
    selectedImage: string;
    selectedColor: string;
    isColorDropperActive: boolean;
    isAdvancedDropper: boolean;
    isOffScreenDropper: boolean;
}

export const INITIAL_STATE: AppState = {
    selectedImage: "",
    selectedColor: "#fefefe",
    isColorDropperActive: false,
    isAdvancedDropper: false,
    isOffScreenDropper: true,
};

export enum APP_ACTIONS {
    "SELECT_IMAGE" = "SELECT_IMAGE",
    "SELECT_COLOR" = "SELECT_COLOR",
    "SET_COLOR_DROPPER" = "SET_COLOR_DROPPER",
    "SET_ADVANCED_DROPPER" = "SET_ADVANCED_DROPPER",
    "SET_OFF_SCREEN_DROPPER" = "SET_OFF_SCREEN_DROPPER",
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
            return {...state, isColorDropperActive: payload.isColorDropperActive, isAdvancedDropper: false, isOffScreenDropper: false};
        case APP_ACTIONS.SET_ADVANCED_DROPPER:
            return {...state, isAdvancedDropper: payload.isAdvancedDropper, isColorDropperActive: false, isOffScreenDropper: false};
        case APP_ACTIONS.SET_OFF_SCREEN_DROPPER:
            return {...state, isOffScreenDropper: payload.isOffScreenDropper, isAdvancedDropper: false, isColorDropperActive: false}
        default:
            throw Error(`Unknown action: ${type}`);
    }
}
