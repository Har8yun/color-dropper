import React, {createContext, useReducer, useCallback} from "react";
import {APP_ACTIONS, colorDropperReducer, INITIAL_STATE} from "../reducers/colorDropperReducer";
import PhotoIndexedDBInstance, {PhotoIndexedDB} from "../services/IndexedDB/PhotoIndexedDB";

type ImageContextProviderType = {
    children: React.ReactNode
}

interface IImageContext {
    selectedImage: string;
    setSelectedImage: (selectedImage: string) => void;
    isColorDropperActive: boolean,
    setIsColorDropperActive: (isColorDropperActive: boolean) => void;
    selectedColor: string,
    setSelectedColor: (selectedColor: string) => void;
    isAdvancedDropper: boolean,
    setIsAdvancedDropper:  (isAdvancedDropper: boolean) => void;
    isOffScreenDropper: boolean,
    setIsOffScreenDropper:  (isOffScreenDropper: boolean) => void;
    PhotoIndexedDBInstance: PhotoIndexedDB,
}

export const ImageContext = createContext<IImageContext>({
    selectedImage: "",
    setSelectedImage: () => {},
    isColorDropperActive: false,
    setIsColorDropperActive: () => {},
    selectedColor: "",
    setSelectedColor: () => {},
    isAdvancedDropper: false,
    setIsAdvancedDropper: () => {},
    isOffScreenDropper: false,
    setIsOffScreenDropper: () => {},
    PhotoIndexedDBInstance: {} as PhotoIndexedDB,
})

export const ImageContextProvider = ({children}: ImageContextProviderType) => {
    const [state, dispatch] = useReducer(colorDropperReducer, INITIAL_STATE);

    const setSelectedImage = useCallback((selectedImage: string) =>
            dispatch({type: APP_ACTIONS.SELECT_IMAGE, payload: {selectedImage}}),
        []);
    const setSelectedColor = useCallback((selectedColor: string) =>
            dispatch({ type: APP_ACTIONS.SELECT_COLOR, payload: { selectedColor }}),
        []);
    const setIsColorDropperActive = useCallback((isColorDropperActive: boolean) =>
            dispatch({ type: APP_ACTIONS.SET_COLOR_DROPPER, payload: { isColorDropperActive }}),
        []);
    const setIsAdvancedDropper = useCallback((isAdvancedDropper: boolean) =>
            dispatch({ type: APP_ACTIONS.SET_ADVANCED_DROPPER, payload: { isAdvancedDropper }}),
        []);

    const setIsOffScreenDropper = useCallback((isOffScreenDropper: boolean) =>
            dispatch({ type: APP_ACTIONS.SET_OFF_SCREEN_DROPPER, payload: { isOffScreenDropper }}),
        []);

    return (
        <ImageContext.Provider
            value={{
                selectedImage: state.selectedImage,
                setSelectedImage,
                selectedColor: state.selectedColor,
                setSelectedColor,
                isColorDropperActive: state.isColorDropperActive,
                setIsColorDropperActive,
                isAdvancedDropper: state.isAdvancedDropper,
                setIsAdvancedDropper,
                isOffScreenDropper: state.isOffScreenDropper,
                setIsOffScreenDropper,
                PhotoIndexedDBInstance,
            }}>
            {children}
        </ImageContext.Provider>
    );
};
