import "./ToolWrapper.css";
import {Paper} from "@mui/material";
import {ReactNode} from "react";

const ToolWrapper = ({children}: { children: ReactNode }) => {
    return (
        <Paper elevation={2} className="tool-wrapper">
            {children}
        </Paper>
    );
};

export default ToolWrapper;
