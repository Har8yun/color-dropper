import React, {useEffect, useState} from "react";
import {getPhotos, searchPhotos} from "../../services/api/photo/photoService";

export const useImagesTank = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getPhotos()
            .then(res => {
                setImages(res.photos);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])

    const debouncedChangeHandler = function (func: Function, delay = 400) {
        let timerId: NodeJS.Timeout;
        return function (ev: React.ChangeEvent<HTMLInputElement>) {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                func(ev);
            }, delay)
        }
    }

    const changeHandler = debouncedChangeHandler((ev: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = ev.target;

        const requestFn = value ? searchPhotos(value) : getPhotos();

        requestFn
            .then((res) => {
                setImages(res.photos)
            })
            .finally(() => {
                setIsLoading(false);
            })
    });


    return {
        changeHandler,
        isLoading,
        images,
    }
}