import {useContext, useEffect, useState} from "react";
import {ImageContext} from "../../../context/ImageContextProvider";

export const useUploadedImages = () => {
    const [uploadedImages, setUploadedImages] = useState([] as File[])
    const { PhotoIndexedDBInstance} = useContext(ImageContext);

    useEffect(() => {
        PhotoIndexedDBInstance.getAllPhotos()
            .then((res: File[]) => {
                setUploadedImages(res);
            })
    }, [PhotoIndexedDBInstance]);

    return {
        uploadedImages
    }
}