import {BrowserRouter ,Routes ,Route} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import UserDetailsPage from '../pages/UserDetailsPage';

function AppRouter({ users, setUsers, loading, error }) {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
            <HomePage
              users={users}
              setUsers={setUsers}
              loading={loading}
              error={error}
              />
            } />
            <Route path="/users/:id" element={<UserDetailsPage users={users} />} />
          </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
