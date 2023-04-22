import "./App.css";
import NevigationBar from "./components/Navbar/NevigationBar";
import Views from "./views";
import { ToastContainer } from "react-toastify";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAuthorization } from "./services/auth.service";
import ConfirmationModal from "./components/ConfirmationModal";

export const AuthContext = createContext()
export const AdminPermContext = createContext()

function App() {
    const location = useLocation();
    const [isLoggin, setisLoggin] = useState(true);
    const [isAdmin, setisAdmin] = useState(true)
    const [showNavbar, setshowNavbar] = useState(true);

    useEffect(() => {
        getAuthorization()
            .then((response) => {
                setisLoggin(response.data.result)
                setisAdmin(response.data.is_admin)
            })
            .catch((err) => { });
    }, []);

    return (
        <div>
            <AuthContext.Provider value={[isLoggin, setisLoggin]}>
                <AdminPermContext.Provider value={[isAdmin, setisAdmin]}>
                    <NevigationBar
                        isShow={showNavbar}
                        isLoggin={isLoggin}
                        setisLoggin={setisLoggin}
                    />
                    <ConfirmationModal />
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
                </AdminPermContext.Provider>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
