import {Link, useParams} from "react-router-dom";

function UserDetailsPage() {
    const { id } = useParams();

    return (
        <main style={{ padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
            <h1>User Details</h1>
            <p>User ID: {id}</p>
            <Link to="/">Back to users</Link>
        </main>
    );
}

export default UserDetailsPage;
    