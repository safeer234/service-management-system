import React, { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://service-management-system-hj06.onrender.com/api/admin/users",
        { withCredentials: true }
      );

      setUsers(res.data.data);
    } catch (err) {
      console.log("User fetch error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(
        `https://service-management-system-hj06.onrender.com/api/admin/users/${id}`,
        { withCredentials: true }
      );

      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-4 sm:p-6 w-full">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">
        All Users
      </h2>

      {loading && <p className="text-sm">Loading...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-200 w-full text-sm sm:text-base">
          <thead className="bg-[#ea580c] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Created</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-3 px-4 whitespace-nowrap">
                  {user.username}
                </td>

                <td className="py-3 px-4 whitespace-nowrap">
                  {user.email}
                </td>

                <td className="py-3 px-4 whitespace-nowrap">
                  {user.phone}
                </td>

                <td className="py-3 px-4 capitalize">
                  <span
                    className={`px-2 py-1 rounded text-xs sm:text-sm ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="py-3 px-4 whitespace-nowrap">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && !loading && (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;