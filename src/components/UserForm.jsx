import { useMemo } from "react";

function UserForm({
  formValues,
  formErrors,
  onInputChange,
  onSubmit,
  submitLabel = "Add User",
  title = "Add New User (Local only)",
  isEditing = false,
  onCancelEdit,
}) {
  const isSubmitDisabled = useMemo(() => {
    return !formValues.name.trim() || !formValues.email.trim();
  }, [formValues.name, formValues.email]);

  return (
    <section className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="h4 card-title mb-0">{title}</h2>
          {isEditing && <span className="badge text-bg-warning">Editing</span>}
        </div>

        <form onSubmit={onSubmit} noValidate>
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
                onChange={onInputChange}
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
                onChange={onInputChange}
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
                onChange={onInputChange}
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
                onChange={onInputChange}
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
                onChange={onInputChange}
                className="form-control"
                placeholder="example.com"
              />
            </div>
          </div>

          <div className="d-flex gap-2 mt-3">
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`btn ${isEditing ? "btn-success" : "btn-primary"}`}
            >
              {submitLabel}
            </button>

            {isEditing && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onCancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default UserForm;