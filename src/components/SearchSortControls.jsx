function SearchSortControls({ searchTerm, sortBy, onSearchChange, onSortChange }) {
    return (
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
                onChange={(e) => onSearchChange(e.target.value)}
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
                onChange={(e) => onSortChange(e.target.value)}
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
    );
  }
  
  export default SearchSortControls;