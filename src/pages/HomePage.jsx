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

  // Modal state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [deleteTargetUser, setDeleteTargetUser] = useState(null);

  useEffect(() => {
    if (users.length === 0 && !loading && !error) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length, loading, error]);

  const isEditing = editingUserId !== null;

  function openAddModal() {
    setEditingUserId(null);
    setFormValues(INITIAL_FORM_VALUES);
    setFormErrors({});
    setIsFormModalOpen(true);
  }

  function closeFormModal() {
    setIsFormModalOpen(false);
    setFormErrors({});
    setEditingUserId(null);
    setFormValues(INITIAL_FORM_VALUES);
  }

  function openDeleteModal(user) {
    setDeleteTargetUser(user);
  }

  function closeDeleteModal() {
    setDeleteTargetUser(null);
  }

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

    if (!values.name.trim()) errors.name = "Name is required";

    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email.trim())) {
      errors.email = "Enter a valid email address";
    }

    return errors;
  }

  function handleSubmitUser(e) {
    e.preventDefault();

    const errors = validateForm(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    if (isEditing) {
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

      closeFormModal();
      return;
    }

    dispatch(
      addUser({
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
      })
    );

    closeFormModal();
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
    setIsFormModalOpen(true);
  }

  function confirmDeleteUser() {
    if (!deleteTargetUser) return;

    dispatch(deleteUser(deleteTargetUser.id));

    if (String(editingUserId) === String(deleteTargetUser.id)) {
      closeFormModal();
    }

    closeDeleteModal();
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
    <>
      <main className="container py-4">
        <div className="mx-auto" style={{ maxWidth: "980px" }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
            <h1 className="mb-0 fw-bold">User Management App</h1>
            <button type="button" className="btn btn-primary" onClick={openAddModal}>
              + Add User
            </button>
          </div>

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
                  onDelete={openDeleteModal}
                  onEdit={handleEditUser}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Form Modal */}
      {isFormModalOpen && (
        <>
          <div
            className="modal d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={closeFormModal}
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title fs-5">
                    {isEditing ? "Edit User (Local update)" : "Add New User (Local only)"}
                  </h2>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={closeFormModal}
                  />
                </div>

                <div className="modal-body">
                  <UserForm
                    formValues={formValues}
                    formErrors={formErrors}
                    onInputChange={handleInputChange}
                    onSubmit={handleSubmitUser}
                    submitLabel={isEditing ? "Update User" : "Add User"}
                    isEditing={isEditing}
                    onCancelEdit={closeFormModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTargetUser && (
        <>
          <div
            className="modal d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={closeDeleteModal}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title fs-5">Confirm Delete</h2>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={closeDeleteModal}
                  />
                </div>

                <div className="modal-body">
                  <p className="mb-0">
                    Are you sure you want to delete{" "}
                    <strong>{deleteTargetUser.name}</strong>?
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={closeDeleteModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={confirmDeleteUser}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;