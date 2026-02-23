import { Link, useParams } from "react-router-dom";

function UserDetailsPage({ users }) {
    const { id } = useParams();
    const user = users.find(user => String(user.id) === String(id));

    if (!user) {
        return (
            <main style={{ padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
                <Link to="/" style={{ display: "inline-block", marginBottom: "1rem" }}>
                    Back to users
                </Link>
                <h1>User Details</h1>
                <p>
                    User not found. If you opened this page directly before the list loaded,
                    go back and try again.
                </p>

            </main>
        );
    }
    const addressParts = [
        user.address?.street,
        user.address?.suite,
        user.address?.city,
        user.address?.zipcode
    ].filter(Boolean);

    const normalizedWebsite = user.website
        ? user.website.startsWith("http")
            ? user.website
            : `https://${user.website}`
        : null;

    return (
        <main style={{ padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
            <Link to="/" style={{ display: "inline-block", marginBottom: "1rem" }}>
                Back to users
            </Link>
            <h1>{user.name}</h1>
            <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
                <p><strong>Email:</strong> {user.email || "N/A"}</p>
                <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
                <p>
                    <strong>Website:</strong>{" "}
                    {normalizedWebsite ? (
                        <a
                            href={normalizedWebsite}
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
                <p><strong>Address:</strong> {addressParts.length ? addressParts.join(", ") : "N/A"}</p>
            </div>
        </main>
    );
}

export default UserDetailsPage;
