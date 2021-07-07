const SessionsFilters = (): JSX.Element => (
  <section>
    <div className="max-w-screen-2xl my-0 mx-auto box-border overflow-hidden">
      <h1 className="text-center uppercase text-blue py-10 text-3xl font-bold">
        Set your schedule
      </h1>

      <div className="px-10 flex flex-wrap overflow-hidden">
        <div className="w-full overflow-hidden sm:w-full md:w-1/2">
          <input
            className="w-full md:w-3/5 rounded p-2 border border-white-dark text-sm font-medium"
            type="text"
            placeholder="Search sessions..."
          />
        </div>
        <div className="w-full overflow-hidden sm:w-full md:w-1/2 flex justify-start md:justify-end">
          <button
            type="button"
            className="hidden md:inline-flex justify-center w-40 border border-white-dark shadow-sm px-4 py-2 bg-white-light text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            Results
            <svg
              className="-mr-1 ml-2 h-5 w-5"
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

      <div className="px-10 flex flex-wrap overflow-hidden pt-5">
        <div className="w-full overflow-hidden sm:w-full md:w-1/2 flex justify-between md:justify-start">
          <div className="pr-5 py-1 text-sm hidden md:block">
            <p>214 sessions</p>
          </div>
          <button
            type="button"
            className="inline-flex justify-center w-30 border border-white-dark shadow-sm px-4 py-1 bg-white-light text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            Chronological
            <svg
              className="-mr-1 ml-2 h-5 w-5"
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
          <label className="inline-flex items-center pl-5">
            <input type="checkbox" className="form-checkbox" defaultChecked />
            <span className="ml-2 text-sm">Space available</span>
          </label>
        </div>
        <div className="w-full overflow-hidden sm:w-full md:w-1/2 flex pt-4 md:pt-0 justify-start md:justify-end">
          <div className="flex items-center justify-between">
            <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md -space-x-px"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 bg-indigo-50 text-indigo-600 relative inline-flex items-center px-4 py-2 text-sm font-medium"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="bg-white-light text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="bg-white-light text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 text-sm font-medium"
                  >
                    3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 bg-white-light text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <a
                    href="#"
                    className="bg-white-light text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 text-sm font-medium"
                  >
                    8
                  </a>
                  <a
                    href="#"
                    className="bg-white-light text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium"
                  >
                    9
                  </a>
                  <a
                    href="#"
                    className="bg-white-light text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium"
                  >
                    10
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md bg-white-light text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
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
        </div>
      </div>
    </div>
  </section>
);

export default SessionsFilters;
