import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "../components/UserForm.jsx";
import SearchSortControls from "../components/SearchSortControls.jsx";
import UserCard from "../components/UserCard.jsx";
import {
    addUser,
    deleteUser,
    fetchUsers,
    updateUser,
  } from "../store/usersSlice.js";

const INITIAL_FORM_VALUES = {
  name: "",
  email: "",
  company: "",
  phone: "",
  website: "",
  street: "",
  suite: "",
  city: "",
  zipcode: "",
};

function HomePage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.items);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);


  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [formErrors, setFormErrors] = useState({});
  const [editingUserId, setEditingUserId] = useState(null);


  useEffect(() => {
    if (users.length === 0 && !loading && !error) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length, loading, error]);


  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));

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
    } else if (!emailRegex.test(values.email.trim())) {
      errors.email = "Enter a valid email address";
    }

    return errors;
  }

  function resetForm() {
    setFormValues(INITIAL_FORM_VALUES);
    setFormErrors({});
    setEditingUserId(null);
  }

  function handleSubmitUser(e) {
    e.preventDefault();

    const errors = validateForm(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    if (editingUserId) {
        dispatch(
          updateUser({
            id: editingUserId,
            updates: {
              name: formValues.name.trim(),
              email: formValues.email.trim(),
              phone: formValues.phone.trim(),
              website: formValues.website.trim(),
              company: {
                name: formValues.company.trim() || "Local Company",
              },
              address: {
                street: formValues.street.trim(),
                suite: formValues.suite.trim(),
                city: formValues.city.trim(),
                zipcode: formValues.zipcode.trim(),
              },
            },
          })
        );
  
        resetForm();
        return;
      }

    const newUser = {
      id: `local-${Date.now()}`,
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      phone: formValues.phone.trim(),
      website: formValues.website.trim(),
      company: {
        name: formValues.company.trim() || "Local Company",
      },
      address: {
        street: formValues.street.trim(),
        suite: formValues.suite.trim(),
        city: formValues.city.trim(),
        zipcode: formValues.zipcode.trim(),
      },
      isLocal: true,
    };

    dispatch(addUser(newUser));
    resetForm();
  }

  function handleDeleteUser(user) {
    const confirmed = window.confirm(`Delete user "${user.name}"?`);
    if (!confirmed) return;

    dispatch(deleteUser(user.id));

    if (String(editingUserId) === String(user.id)) {
      resetForm();
    }
  }

  function handleEditUser(user) {
    setEditingUserId(user.id);

    setFormValues({
      name: user.name || "",
      email: user.email || "",
      company: user.company?.name || "",
      phone: user.phone || "",
      website: user.website || "",
      street: user.address?.street || "",
      suite: user.address?.suite || "",
      city: user.address?.city || "",
      zipcode: user.address?.zipcode || "",
    });

    setFormErrors({});

    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const isEditing = editingUserId !== null;

  return (
    <main className="container py-4">
      <div className="mx-auto" style={{ maxWidth: "980px" }}>
        <h1 className="mb-4 fw-bold">User Management App</h1>

        <UserForm
          formValues={formValues}
          formErrors={formErrors}
          onInputChange={handleInputChange}
          onSubmit={handleSubmitUser}
          submitLabel={isEditing ? "Update User" : "Add User"}
          title={isEditing ? "Edit User (Local update)" : "Add New User (Local only)"}
          isEditing={isEditing}
          onCancelEdit={resetForm}
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
              <UserCard
                key={user.id}
                user={user}
                onDelete={handleDeleteUser}
                onEdit={handleEditUser}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default HomePage;