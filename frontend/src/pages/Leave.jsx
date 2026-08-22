export default function Leave() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Leave Management</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Apply for Leave</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Leave Type</label>
            <select className="mt-1 block h-11 w-full rounded-[10px] border border-gray-300 bg-white px-3.5 text-sm text-gray-900 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200">
              <option>Paid</option>
              <option>Sick</option>
              <option>Unpaid</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input type="date" className="mt-1 block h-11 w-full rounded-[10px] border border-gray-300 bg-white px-3.5 text-sm text-gray-900 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input type="date" className="mt-1 block h-11 w-full rounded-[10px] border border-gray-300 bg-white px-3.5 text-sm text-gray-900 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Remarks</label>
            <textarea className="mt-1 block w-full rounded-[10px] border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200" rows="3"></textarea>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit Request</button>
        </form>
      </div>
      
      <div className="max-w-2xl rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Recent Requests</h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-3 flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900">Sick Leave</p>
              <p className="text-sm text-gray-500">2026-08-10 to 2026-08-11</p>
            </div>
            <span className="px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded-full">Pending</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
