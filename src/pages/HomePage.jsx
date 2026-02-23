import { useState, useMemo } from "react";
import UserForm from "../components/UserForm";
import SearchSortControls from "../components/SearchSortControls";
import UserCard from "../components/UserCard";

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

        if (formErrors[name]) {
            setFormErrors((prev) => ({ ...prev, [name]: "" }));
          }
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
    function resetForm() {
        setFormValues({
          name: "",
          email: "",
          company: "",
          phone: "",
          website: "",
          street: "",
          suite: "",
          city: "",
          zipcode: "",
        });
        setFormErrors({});
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
        resetForm();
    }

    function handleDeleteUser(user) {
        const confirmed = window.confirm(`Delete user "${user.name}"?`);
        if (!confirmed) return;
    
        setUsers((prev) => prev.filter((u) => String(u.id) !== String(user.id)));
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


    return (
    <main className="container py-4">
      <div className="mx-auto" style={{ maxWidth: "980px" }}>
        <h1 className="mb-4 fw-bold">User Management App</h1>

        <UserForm
          formValues={formValues}
          formErrors={formErrors}
          onInputChange={handleInputChange}
          onSubmit={handleAddUser}
          submitLabel="Add User"
        />

        <SearchSortControls
          searchTerm={searchTerm}
          sortBy={sortBy}
          onSearchChange={setSearchTerm}
          onSortChange={setSortBy}
        />

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
              <UserCard key={user.id} user={user} onDelete={handleDeleteUser} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default HomePage;