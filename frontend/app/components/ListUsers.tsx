"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const ListUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Open delete modal
  const handleOpenDeleteModal = (id: number) => {
    setDeleteUserId(id);
    setIsDeleteModalOpen(true);
  };

  // Close delete modal
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteUserId(null);
  };

  // Open success modal
  const handleOpenSuccessModal = () => {
    setIsSuccessModalOpen(true);
    setTimeout(() => {
      setIsSuccessModalOpen(false);
    }, 2000); // Auto-close after 2 seconds
  };

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (!deleteUserId) return;
    

    try {
      const response = await axios.delete(`http://localhost:8000/api/deleteuser/${deleteUserId}`);
      if (response.status === 200) {
        setUsers(users.filter(user => user.id !== deleteUserId));
        handleOpenSuccessModal(); // Show success modal
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      handleCloseDeleteModal();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="overflow-x-auto mt-5">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50 drop-shadow-lg rounded-lg text-black">
              <th className="px-6 py-2 border">#</th>
              <th className="px-6 py-2 border">Name</th>
              <th className="px-6 py-2 border">Username</th>
              <th className="px-6 py-2 border">Email</th>
              <th className="px-6 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="text-center border-t">
                <td className="px-6 py-2 border">{index + 1}</td>
                <td className="px-6 py-2 border">{user.name}</td>
                <td className="px-6 py-2 border">{user.username}</td>
                <td className="px-6 py-2 border">{user.email}</td>
                <td className="px-6 py-2 border">
                <Link href={`/read/${user.id}`} className="btn btn-success px-3 py-1 mr-3 text-white drop-shadow-lg">
  Read
</Link>




                  <Link
                    href={`/edit/${user.id}`} // Update this route based on your Next.js structure
                    className="btn btn-info bg-blue-500 px-3 py-1 mr-3 text-white drop-shadow-lg"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleOpenDeleteModal(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded btn-error drop-shadow-lg hover:bg-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">Confirm Deletion</h2>
            <p className="my-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end">
              <button
                onClick={handleCloseDeleteModal}
                className="bg-gray-500 text-white px-4 py-2 mr-3 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">Deleted Successfully</h2>
            <p className="my-4">The user has been removed from the system.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListUsers;
