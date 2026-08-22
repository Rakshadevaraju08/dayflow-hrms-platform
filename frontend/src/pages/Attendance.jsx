export default function Attendance() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Attendance Tracker</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Today's Status</h2>
          <div className="space-x-4">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Check In</button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Check Out</button>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-700 mb-4">Recent Logs</h3>
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-08-21</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">09:00 AM</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">05:00 PM</td>
              <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">Present</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
