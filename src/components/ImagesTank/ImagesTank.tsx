import ToolWrapper from "../ToolWrapper/ToolWrapper";
import SearchBar from "./SearchBar/SearchBar";
import ImageTiles from "./ImageTiles/ImageTiles";
import {useImagesTank} from "./useImagesTank";
import UploadImage from "./UploadImage/UploadImage";

const ImagesTank = () => {
    const {isLoading, images, changeHandler} = useImagesTank();

    return (
        <ToolWrapper>
            <UploadImage/>
            <SearchBar changeHandler={changeHandler}/>
            <ImageTiles isLoading={isLoading} images={images}/>
        </ToolWrapper>
    );
};

export default ImagesTank;