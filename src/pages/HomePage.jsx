import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

function HomePage({ users, loading, error, setUsers }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("default");
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
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }
        const newUser = {
            id: `local-${Date.now()}`,
            name: formValues.name.trim(),
            email: formValues.email.trim(),
            phone: formValues.phone.trim(),
            website: formValues.website.trim(),
            company: {
                name: formValues.company.trim() || "Local Company"
            },
            address: {
                street: formValues.street.trim(),
                suite: formValues.suite.trim(),
                city: formValues.city.trim(),
                zipcode: formValues.zipcode.trim()
            },
            isLocal: true,
        };
        setUsers(prev => [newUser, ...prev]);
        setFormValues({
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
        setFormErrors({});
    }
    const filteredAndSortedUsers = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        let result = users.filter((user) => {
            const name = user.name?.toLowerCase() || "";
            const email = user.email?.toLowerCase() || "";
            return !query || name.includes(query) || email.includes(query);
        });

        const safe = (v) => (v || "").toString().toLowerCase();

        if (sortBy === "name-asc") {
            result = [...result].sort((a, b) => safe(a.name).localeCompare(safe(b.name)));
        } else if (sortBy === "name-desc") {
            result = [...result].sort((a, b) => safe(b.name).localeCompare(safe(a.name)));
        } else if (sortBy === "email-asc") {
            result = [...result].sort((a, b) => safe(a.email).localeCompare(safe(b.email)));
        } else if (sortBy === "company-asc") {
            result = [...result].sort((a, b) =>
                safe(a.company?.name).localeCompare(safe(b.company?.name))
            );
        }

        return result;
    }, [users, searchTerm, sortBy]);

    const isAddDisabled = !formValues.name.trim() || !formValues.email.trim();

    return (
        <main className="container py-4">
            <div className="mx-auto" style={{ maxWidth: "900px"}}>
            <h1 className="mb-4 fw-bold">User Management App</h1>

            {/* Add User Form */}
        <section className="card shadow-sm mb-4">
          <div className="card-body">
            <h2 className="h4 card-title mb-3">Add New User (Local only)</h2>

            <form onSubmit={handleAddUser} noValidate>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="name" className="form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formValues.name}
                    onChange={handleInputChange}
                    className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
                    placeholder="Enter full name"
                  />
                  {formErrors.name && (
                    <div className="invalid-feedback d-block">{formErrors.name}</div>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                    placeholder="Enter email address"
                  />
                  {formErrors.email && (
                    <div className="invalid-feedback d-block">{formErrors.email}</div>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="company" className="form-label">
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formValues.company}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Company name"
                  />
                </div>

                <div className="col-12 col-md-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={formValues.phone}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Phone number"
                  />
                </div>

                <div className="col-12 col-md-3">
                  <label htmlFor="website" className="form-label">
                    Website
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    value={formValues.website}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAddDisabled}
                className="btn btn-primary mt-3"
              >
                Add User
              </button>
            </form>
          </div>
        </section>

        {/* Search + Sort */}
        <section className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-12 col-md-7">
                <label htmlFor="search" className="form-label">
                  Search by name or email
                </label>
                <input
                  id="search"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Leanne or .biz"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="col-12 col-md-5">
                <label htmlFor="sortBy" className="form-label">
                  Sort users
                </label>
                <select
                  id="sortBy"
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Default order</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="email-asc">Email (A-Z)</option>
                  <option value="company-asc">Company (A-Z)</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Users List States */}
        {loading && <p className="text-muted">Loading users...</p>}

        {error && <div className="alert alert-danger">Error: {error}</div>}

        {!loading && !error && (
          <p className="text-muted mb-3">
            Showing {filteredAndSortedUsers.length} user
            {filteredAndSortedUsers.length !== 1 ? "s" : ""}
          </p>
        )}

        {!loading && !error && filteredAndSortedUsers.length === 0 && (
          <div className="alert alert-secondary">No users match your search.</div>
        )}

        {!loading && !error && filteredAndSortedUsers.length > 0 && (
          <div className="row g-3">
            {filteredAndSortedUsers.map((user) => (
              <div key={user.id} className="col-12 col-md-6">
                <Link
                  to={`/users/${user.id}`}
                  className="card h-100 text-decoration-none text-dark shadow-sm"
                >
                  <div className="card-body">
                    <h3 className="h5 card-title mb-2">{user.name}</h3>
                    <p className="card-text mb-1">{user.email}</p>
                    <p className="card-text text-muted mb-0">
                      {user.company?.name || "N/A"}
                    </p>
                    {user.isLocal && (
                      <span className="badge text-bg-primary mt-2">Local</span>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default HomePage;