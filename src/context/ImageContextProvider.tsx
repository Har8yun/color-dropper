import React, { createContext, SetStateAction, useState, Dispatch } from 'react';

type ImageContextProviderType = {
    children: React.ReactNode
}

interface IImageContext {
    selectedImage: string;
    setSelectedImage: Dispatch<SetStateAction<string>>;
}

export const ImageContext = createContext<IImageContext>({
    selectedImage: "",
    setSelectedImage: () => {},
})

export const ImageContextProvider = ({children}: ImageContextProviderType) => {
    const [selectedImage, setSelectedImage] = useState("");
    return (
        <ImageContext.Provider value={{selectedImage, setSelectedImage}}>
            {children}
        </ImageContext.Provider>
    );
};
