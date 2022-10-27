import "./App.css";
import NevigationBar from "./components/NevigationBar";
import Views from "./views";
import { ToastContainer } from "react-toastify";
function App() {
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
                {/* Same as */}
                <ToastContainer />
            </div>
        </div>
    );
}

export default App;
