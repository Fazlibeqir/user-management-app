import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
                <div style={{ display: "grid", gap: "0.75rem"}} >
                    {users.map((user) => (
                        <Link 
                            key={user.id} 
                            to={`/users/${user.id}`} 
                            style={{ 
                                padding: "0.75rem", 
                                border: "1px solid #ddd", 
                                borderRadius: "8px", 
                                textDecoration: "none", 
                                color: "inherit" }}>
                            <div><strong>{user.name}</strong></div>
                            <div>{user.email}</div>
                            <div>{user.company?.name}</div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}

export default HomePage;