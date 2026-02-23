import { useEffect, useState } from 'react';
import './App.css'
import AppRouter from './routes/AppRouter'
import { fetchUsers } from "./api/usersApi.js";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchUsers();
        if (isMounted) setUsers(data);
      } catch (err) {
        if (isMounted) setError(err.message || "Something went wrong");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AppRouter
      users={users}
      setUsers={setUsers}
      loading={loading}
      error={error}
    />
  );
}

export default App;
