import {Route, Routes} from "react-router-dom";
import AppPagesWrapper from "../components/AppPagesWrapper/AppPagesWrapper";
import ImagesTank from "../components/ImagesTank/ImagesTank";
import ColorPicker from "../components/ColorPicker/ColorPicker";
import {APP_ROUTER} from "../context/constants";
import NotFound from "../pages/NotFound";
import WebglWrapper from "../Webgl/WebglWrapper";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={APP_ROUTER.HOME} element={<AppPagesWrapper/>}>
                <Route path={APP_ROUTER.IMAGES_TANK} element={<ImagesTank/>}/>
                <Route path={APP_ROUTER.COLOR_PICKER} element={<ColorPicker/>}/>

                <Route path="*" element={<NotFound/>}/>
            </Route>
            <Route path={APP_ROUTER.WEBGL} element={<WebglWrapper />} />
        </Routes>
    );
};

export default AppRouter;
