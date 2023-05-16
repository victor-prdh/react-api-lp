import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Page/Home/Home';
import LoginPage from './Page/Login/LoginPage';
import ChampPage from './Page/Champ/Champ';



function App() {
    //Navigation dans requireAuth
    return (
        //TODO ROUTER
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="champion/:id" element={<ChampPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
