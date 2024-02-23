import {Route, Routes} from "react-router-dom";
import AppPagesWrapper from "../components/AppPagesWrapper/AppPagesWrapper";
import ImagesTank from "../components/ImagesTank/ImagesTank";
import ColorPicker from "../components/ColorPicker/ColorPicker";
import {APP_ROUTER} from "../context/constants";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={APP_ROUTER.HOME} element={<AppPagesWrapper/>}>
                <Route path={APP_ROUTER.IMAGES_TANK} element={<ImagesTank/>}/>
                <Route path={APP_ROUTER.COLOR_PICKER} element={<ColorPicker/>}/>

                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;
