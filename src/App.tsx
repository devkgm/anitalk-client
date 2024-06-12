import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Board from './pages/Board/Board';
import Login from './pages/Login/Login';
import { useRecoilState } from 'recoil';
import MyPage from './pages/MyPage/MyPage';
import { useEffect } from 'react';
import { isLoggedInState, userState } from './recoil/auth';
import SignUp from './pages/SignUp/SignUp';

function App() {
    const [user, setUser] = useRecoilState(userState);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
            setIsLoggedIn(true);
        }
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/board" element={<Board />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/mypage" element={<MyPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
