import TopBar from "../TopBar/TopBar";
import {Outlet} from "react-router-dom";
import WhiteBoard from "../WhiteBoard/WhiteBoard";
import ToolBar from "../ToolBar/ToolBar";
import Box from "@mui/material/Box";

import "./AppPagesWrapper.css";

const AppPagesWrapper = () => {
    return (
        <Box>
            <TopBar />
            <Box className="pages-wrapper">
                <ToolBar />
                <Outlet />
                <WhiteBoard />
            </Box>
        </Box>
    );
};

export default AppPagesWrapper;