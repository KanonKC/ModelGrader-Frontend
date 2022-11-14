import "./App.css";
import NevigationBar from "./components/NevigationBar";
import Views from "./views";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAuthorization } from "./services/auth.service";
import ConfirmationModal from "./components/ConfirmationModal";

function App() {
    const location = useLocation();
    const [isLoggin, setisLoggin] = useState(true);
    const [showNavbar, setshowNavbar] = useState(true);

    useEffect(() => {
        getAuthorization()
            .then((response) => {
                setisLoggin(response.data.result);
            })
            .catch((err) => {});
    }, []);

    // useEffect(() => {
    //     if (location.pathname == "/") {
    //         const wallpeper = require("./imgs/Polygon-Wallpaper.png");
    //         document.body.style.backgroundImage = `url(${wallpeper})`;
    //     }
    // }, [location]);

    return (
        <div>
            <NevigationBar
                isShow={showNavbar}
                isLoggin={isLoggin}
                setisLoggin={setisLoggin}
            />
            <ConfirmationModal/>
            <div className="App">
                <Views setshowNavbar={setshowNavbar} isLoggin={isLoggin} />
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
