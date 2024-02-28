import React, {createContext, SetStateAction, useState, Dispatch} from "react";

type ImageContextProviderType = {
    children: React.ReactNode
}

interface IImageContext {
    selectedImage: string;
    setSelectedImage: Dispatch<SetStateAction<string>>;
    isColorDropperActive: boolean,
    setIsColorDropperActive: Dispatch<SetStateAction<boolean>>;
    selectedColor: string,
    setSelectedColor: Dispatch<SetStateAction<string>>;
    isAdvancedDropper: boolean,
    setIsAdvancedDropper: Dispatch<SetStateAction<boolean>>;
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
})

export const ImageContextProvider = ({children}: ImageContextProviderType) => {
    // TODO - make reducer
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedColor, setSelectedColor] = useState("#fefefe");
    const [isColorDropperActive, setIsColorDropperActive] = useState(false);
    const [isAdvancedDropper, setIsAdvancedDropper] = useState(true);

    return (
        <ImageContext.Provider
            value={{
                selectedImage,
                setSelectedImage,
                selectedColor,
                setSelectedColor,
                isColorDropperActive,
                setIsColorDropperActive,
                isAdvancedDropper,
                setIsAdvancedDropper,
            }}>
            {children}
        </ImageContext.Provider>
    );
};
