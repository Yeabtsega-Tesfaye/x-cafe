export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 pb-4">
      <div>
        <h1 className="text-3xl font-bold">Kitchen Dashboard</h1>
        <p className="text-gray-500">
          Manage today`s orders efficiently.
        </p>
      </div>
    </header>
  );
}