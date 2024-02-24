import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppRouter from "./router/AppRouter";
import {BrowserRouter} from 'react-router-dom';
import {ImageContextProvider} from "./context/ImageContextProvider";

function App() {
    return (
        <BrowserRouter>
            <ImageContextProvider>
                <AppRouter/>
            </ImageContextProvider>
        </BrowserRouter>
    );
}

export default App;
