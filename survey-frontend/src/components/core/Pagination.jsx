import {Link} from "react-router-dom";

export default function Pagination({meta, onLinkClick}) {

  const onclick = (event, link) => {
    event.preventDefault()
    if (!link.url) return;

    onLinkClick(link)
  }

  return (
    <>
      <div
        className="flex items-center justify-between shadow rounded-md border border-gray-100 bg-white px-4 py-3 sm:px-6 py-5 mt-6">
        {meta.links && (
          <div className="flex flex-1 justify-between sm:hidden">
            <Link
              to={meta.links[0].url}
              onClick={(event) => onclick(event, meta.links[0])}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </Link>
            <Link
              to={meta.links[meta.links.length - 1].url}
              onClick={(event) => onclick(event, meta.links[meta.links.length - 1])}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </Link>
          </div>
        )}
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{meta.from}</span> to <span
              className="font-medium">{meta.to}</span> of&nbsp;
              <span className="font-medium">{meta.total}</span> results
            </p>
          </div>
          <div>
            {meta.total > meta.per_page && (
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">

                {meta.links && meta.links.map((link, index) => (
                  // TODO styled disabled links and fix current page border issue
                  <Link
                    to={link.url}
                    key={index}
                    onClick={(event) => onclick(event, link)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${link.active ? 'ring-blue-400 text-blue-800 bg-blue-100 hover:bg-blue-200' : 'ring-gray-300 text-gray-900 hover:bg-gray-100'} ring-inset ring-1 focus:z-20 focus:outline-offset-0
                  ${index === 0 ? 'rounded-l-md' : ''} ${index === meta.links.length - 1 ? 'rounded-r-md' : ''}`}

                    dangerouslySetInnerHTML={{__html: link.label}}
                  >
                  </Link>
                ))}

              </nav>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
