import { Link, useParams } from "react-router-dom";

function UserDetailsPage({ users }) {
    const { id } = useParams();
    const user = users.find(user => String(user.id) === String(id));

    if (!user) {
        return (
          <main className="container py-4">
            <div className="mx-auto" style={{ maxWidth: "900px" }}>
              <Link to="/" className="btn btn-outline-secondary btn-sm mb-3">
                Back to users
              </Link>
              <h1 className="h3 mb-3">User Details</h1>
              <div className="alert alert-warning mb-0">
                User not found. If you opened this page directly before the list loaded,
                go back and try again.
              </div>
            </div>
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
            <main className="container py-4">
              <div className="mx-auto" style={{ maxWidth: "900px" }}>
                <Link to="/" className="btn btn-outline-secondary btn-sm mb-3">
                  ← Back to users
                </Link>
        
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                      <h1 className="h3 mb-0">{user.name}</h1>
                      {user.isLocal && <span className="badge text-bg-primary">Local User</span>}
                    </div>
        
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <strong>Email:</strong>
                        <div>{user.email || "N/A"}</div>
                      </div>
        
                      <div className="col-12 col-md-6">
                        <strong>Phone:</strong>
                        <div>{user.phone || "N/A"}</div>
                      </div>
        
                      <div className="col-12 col-md-6">
                        <strong>Website:</strong>
                        <div>
                          {normalizedWebsite ? (
                            <a href={normalizedWebsite} target="_blank" rel="noreferrer">
                              {user.website}
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </div>
                      </div>
        
                      <div className="col-12 col-md-6">
                        <strong>Company:</strong>
                        <div>{user.company?.name || "N/A"}</div>
                      </div>
        
                      <div className="col-12">
                        <strong>Address:</strong>
                        <div>{addressParts.length ? addressParts.join(", ") : "N/A"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          );
        }
        
        export default UserDetailsPage;
