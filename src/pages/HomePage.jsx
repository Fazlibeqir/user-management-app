import { useState, useMemo} from "react";
import { Link } from "react-router-dom";

function HomePage({users, loading, error}) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = useMemo(()=>{
        const query = searchTerm.trim().toLowerCase();
        if (!query) return users;
        return users.filter(user => {
            const nameMatch = user.name?.toLowerCase() || "";
            const emailMatch = user.email?.toLowerCase() || "";
            return nameMatch.includes(query) || emailMatch.includes(query);
        });
    }, [users, searchTerm]);
    return (
        <main style={{ padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
            <h1>User Managment App</h1>

            <div style={{ margin: "1rem 0"}}>
                <label htmlFor="search" style={{ display: "block", marginBottom: "0.4rem"}}>
                    Search by name or email:
                </label>
                <input
                    id="search"
                    type="text"
                    placeholder="Type to search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: "100%",
                        maxWidth: "420px",
                        padding: "0.6rem 0.75rem",
                        border: "1px solid #ccc",
                        borderRadius: "8px"
                        }}
                />
            </div>

            {loading && <p>Loading users...</p>}
            {error && <p style={{color: "red"}}>Error: {error}</p>}

            {loading && !error && filteredUsers.length === 0 && (
                <p>No users match your search</p>
            )}

            {!loading && !error &&  filteredUsers.length > 0 && (
                <div style={{ display: "grid", gap: "0.75rem"}} >
                    {filteredUsers.map((user) => (
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