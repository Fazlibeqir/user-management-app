import {BrowserRouter as  Routes, Route, BrowserRouter} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import UserDetailsPage from '../pages/UserDetailsPage';

function AppRouter() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users/:id" element={<UserDetailsPage />} />
          </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
