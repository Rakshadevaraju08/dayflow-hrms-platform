export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-gray-600">View and edit your personal details.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
          <h2 className="text-xl font-semibold mb-2">Attendance</h2>
          <p className="text-gray-600">Check in/out and view attendance logs.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
          <h2 className="text-xl font-semibold mb-2">Leave</h2>
          <p className="text-gray-600">Apply for leaves and check status.</p>
        </div>
      </div>
    </div>
  );
}
