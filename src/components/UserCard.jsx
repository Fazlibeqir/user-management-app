import { Link } from "react-router-dom";

function UserCard({ user, onDelete }) {
  return (
    <div className="col-12 col-md-6">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start gap-2">
            <div className="flex-grow-1">
              <Link
                to={`/users/${user.id}`}
                className="text-decoration-none text-dark"
              >
                <h3 className="h5 card-title mb-2">{user.name}</h3>
              </Link>

              <p className="card-text mb-1">{user.email}</p>
              <p className="card-text text-muted mb-2">
                {user.company?.name || "N/A"}
              </p>

              {user.isLocal && <span className="badge text-bg-primary">Local</span>}
            </div>

            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDelete(user)}
              aria-label={`Delete ${user.name}`}
            >
              Delete
            </button>
          </div>

          <div className="mt-3">
            <Link
              to={`/users/${user.id}`}
              className="btn btn-outline-secondary btn-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;