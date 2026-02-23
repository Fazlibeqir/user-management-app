import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

function HomePage({ users, loading, error, setUsers }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        website: "",
        street: "",
        suite: "",
        city: "",
        zipcode: ""
    });
    const [formErrors, setFormErrors] = useState({});
    
    const filteredUsers = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) return users;
        return users.filter(user => {
            const nameMatch = user.name?.toLowerCase() || "";
            const emailMatch = user.email?.toLowerCase() || "";
            return nameMatch.includes(query) || emailMatch.includes(query);
        });
    }, [users, searchTerm]);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    }
    function validateForm(values) {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!values.name.trim()) {
            errors.name = "Name is required";
        }
        if (!values.email.trim()) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(values.email)) {
            errors.email = "Enter a valid email address";
        }
        return errors;
    }

    function handleAddUser(e) {
        e.preventDefault();
        const errors = validateForm(formValues);

        if (Object.keys(errors).length > 0) {
            return;
        }
        // Simulate adding user to server by generating a new ID
    }

    return (
        <main style={{ padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
            <h1>User Managment App</h1>

            {/* Add User Form */}
            <section
                style={{
                    margin: "1rem 0 1.5rem",
                    padding: "1rem",
                    border: "1px solid #ddd",
                    borderRadius: "10px"
                }}>
                <h2 style={{ marginTop: "0" }}>Add New User(Local only)</h2>
                <form onSubmit={handleAddUser} noValidate>
                    <div style={{ display: "grid", gap: "0.75rem", maxWidth: "700px" }}>
                        <label htmlFor="name" style={{ display: "block", marginBottom: "0.25rem" }}>
                            Name* 
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formValues.name}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "0.6rem",
                                border: "1px solid #ccc",
                                borderRadius: "8px"
                            }}
                        />
                        {formErrors.name && (
                            <p style={{ color: "red", margin: "0.25rem 0 0" }}>{formErrors.name}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email" style={{ display: "block", marginBottom: "0.25rem" }}>
                            Email* 
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "0.6rem",
                                border: "1px solid #ccc",
                                borderRadius: "8px"
                            }}
                        />
                        {formErrors.email && (
                            <p style={{ color: "red", margin: "0.25rem 0 0" }}>{formErrors.email}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="company" style={{ display: "block", marginBottom: "0.25rem" }}>
                            Company 
                        </label>
                        <input
                            id="company"
                            name="company"
                            type="text"
                            value={formValues.company}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "0.6rem",
                                border: "1px solid #ccc",
                                borderRadius: "8px"
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" style={{ display: "block", marginBottom: "0.25rem" }}>
                            Phone
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            value={formValues.phone}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "0.6rem",
                                border: "1px solid #ccc",
                                borderRadius: "8px"
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="website" style={{ display: "block", marginBottom: "0.25rem" }}>
                            Website
                        </label>
                        <input
                            id="website"
                            name="website"
                            type="text"
                            value={formValues.website}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "0.6rem",
                                border: "1px solid #ccc",
                                borderRadius: "8px"
                            }}
                        />
                    </div>
                    <button 
                        type="submit" 
                        style={{ 
                            marginTop: "1rem", 
                            padding: "0.65rem 1rem", 
                            border: "1px solid #222", 
                            borderRadius: "8px", 
                            background: "#222", 
                            color: "#fff", 
                            cursor: "pointer" }}>
                        Add User
                    </button>
                </form>
            </section>

            {/* Search Input */}
            <div style={{ margin: "1rem 0" }}>
                <label htmlFor="search" style={{ display: "block", marginBottom: "0.4rem" }}>
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

            {/* Users List */}
            {loading && <p>Loading users...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            {loading && !error && filteredUsers.length === 0 && (
                <p>No users match your search</p>
            )}

            {!loading && !error && filteredUsers.length > 0 && (
                <div style={{ display: "grid", gap: "0.75rem" }} >
                    {filteredUsers.map((user) => (
                        <Link
                            key={user.id}
                            to={`/users/${user.id}`}
                            style={{
                                padding: "0.75rem",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                textDecoration: "none",
                                color: "inherit"
                            }}>
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