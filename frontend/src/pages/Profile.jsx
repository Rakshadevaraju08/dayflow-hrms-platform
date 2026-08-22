export default function Profile() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Employee Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <p className="font-medium text-lg">John Doe</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="font-medium text-lg">john.doe@example.com</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Role</label>
            <p className="font-medium text-lg">Employee</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Department</label>
            <p className="font-medium text-lg">Engineering</p>
          </div>
        </div>
        <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
