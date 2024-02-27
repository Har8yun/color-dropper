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
}

export const ImageContext = createContext<IImageContext>({
    selectedImage: "",
    setSelectedImage: () => {},
    isColorDropperActive: false,
    setIsColorDropperActive: () => {},
    selectedColor: "",
    setSelectedColor: () => {},

})

export const ImageContextProvider = ({children}: ImageContextProviderType) => {
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedColor, setSelectedColor] = useState("#fefefe");
    const [isColorDropperActive, setIsColorDropperActive] = useState(false);

    return (
        <ImageContext.Provider
            value={{
                selectedImage,
                setSelectedImage,
                selectedColor,
                setSelectedColor,
                isColorDropperActive,
                setIsColorDropperActive,
            }}>
            {children}
        </ImageContext.Provider>
    );
};
