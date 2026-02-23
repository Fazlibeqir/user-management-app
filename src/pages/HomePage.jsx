import { useEffect, useState } from "react";
import { fetchUsers } from "../api/usersApi";

function HomePage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        let isMounted = true;
        async function loadUsers() {
            try {
                setLoading(true);
                setError("");
                const data = await fetchUsers();
                if(isMounted) setUsers(data);
            } catch (err) {
                if(isMounted) setError(err.message || "Unknown error");
            } finally {
                if(isMounted) setLoading(false);
            }
        }
        loadUsers();
        return () => {
            isMounted = false;
        };
    },[]);
    return (
        <main style={{ padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
            <h1>User Managment App</h1>

            {loading && <p>Loading users...</p>}
            {error && <p style={{color: "red"}}>Error: {error}</p>}

            {!loading && !error && (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <strong>{user.name}</strong> - {user.email} - {user.phone} - {user.company?.name}
                       </li>))}
                   </ul>
            )}
        </main>
    );
}

export default HomePage;