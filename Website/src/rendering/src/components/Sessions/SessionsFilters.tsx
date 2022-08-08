const SessionsFilters = (): JSX.Element => (
  <section className="section pb-4 pt-12">
    <div className="section-content form item-grid sessions-filters container">
      <h2 className="section-content-title">Explore sessions</h2>
      <div className="filters-row">
        <div className="filters-col">
          <input type="text" placeholder="Search sessions..." />
        </div>
        <div className="filters-col sort-by-col">
          <button
            type="button"
            className="dropdown-filter sort-by-dropdown"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            aria-label="Chronological"
          >
            Chronological
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="filters-row">
        <div className="filters-col sessions-count-col">
          <div className="sessions-count">214 sessions</div>
          <label className="checkbox-label space-available-checkbox">
            <input type="checkbox" defaultChecked />
            <span className="label-text">Space available</span>
          </label>
        </div>
        <div className="filters-col pager-col">
          <nav className="pager" aria-label="Pagination">
            <span aria-current="page" className="pager-item active">
              1
            </span>
            <a href="#" className="pager-item">
              2
            </a>
            <a href="#" className="pager-item hiddeable">
              3
            </a>
            <span className="pager-item ellipsis-item">...</span>
            <a href="#" className="pager-item hiddeable">
              8
            </a>
            <a href="#" className="pager-item">
              9
            </a>
            <a href="#" className="pager-item">
              10
            </a>
            <a href="#" className="pager-item next-page">
              <span>Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </section>
);

export default SessionsFilters;
