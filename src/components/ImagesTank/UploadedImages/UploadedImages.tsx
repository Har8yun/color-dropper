import {useUploadedImages} from "./useUploadedImages";

const UploadedImages = () => {
    const { uploadedImages } = useUploadedImages();

    return (
        <div>
            Todo - Uploaded images
        </div>
    );
};

export default UploadedImages;
