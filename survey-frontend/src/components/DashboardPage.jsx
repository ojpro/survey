export default function DashboardPage({title, buttons = '', children}) {
  return (
    <>
      <header>
        <div
          className="flex flex-row flex-wrap justify-between items-center mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
          <div>
            {buttons}
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 container">
        {children}
      </div>
    </>
  );
}
