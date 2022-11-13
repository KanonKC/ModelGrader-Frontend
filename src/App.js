import "./App.css";
import NevigationBar from "./components/NevigationBar";
import Views from "./views";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
    const location = useLocation()
    useEffect(() => {
        if(location.pathname == '/'){
            const wallpeper = require('./imgs/Polygon-Wallpaper.png')
            document.body.style.backgroundImage = `url(${wallpeper})`;
        }
    }, [location]);
    return (
        <div>
            <NevigationBar />
            <div className="App pt-20">
                <Views />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </div>
    );
}

export default App;
