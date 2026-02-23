import { Link, useParams } from "react-router-dom";

function UserDetailsPage({ users }) {
    const { id } = useParams();
    const user = users.find(user => user.id === Number(id));

    if (!user) {
        return (
            <main style={{ padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
                <h1>User Details</h1>
                <p>User not found.</p>
                <Link to="/">Back to users</Link>
            </main>
        );
    }
    const address = user.address
        ? `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`
        : "No address available";

    return (
        <main style={{ padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
            <Link to="/" style={{ display: "inline-block", marginBottom: "1rem" }}>
                Back to users
            </Link>
            <h1>{user.name}</h1>
            <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
                <p>
                    <strong>Website:</strong>{" "}
                    {user.website ? (
                        <a
                            href={`https://${user.website}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {user.website}
                        </a>
                    ) : (
                        "N/A"
                    )}
                </p>
                <p><strong>Company:</strong> {user.company?.name || "N/A"}</p>
                <p><strong>Address:</strong> {address}</p>
            </div>
        </main>
    );
}

export default UserDetailsPage;
