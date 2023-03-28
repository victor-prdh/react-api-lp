import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Page/Home/Home';
import LoginPage from './Page/Login/LoginPage';


export function RequireAuth({ children }) {
    // Used to ensure the refreshToken is called once at a time
    const user = null; // TODO Get user from local storage

    if (user === null) {
        //TODO Navigate to login
    } else {
        return children;
    }
}

function App() {

    //Navigation dans requireAuth
    return (
        //TODO ROUTER
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
