"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export default function ViewUser() {
  const params = useParams();
  const userId = params?.id ? Number(params.id) : null; // Ensure userId is a valid number

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || isNaN(userId)) return; // Prevent API call if userId is invalid

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // Make sure to use userId, not id

  return (
    <div className="max-w-2xl mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">View User</h1>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : user ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="border px-4 py-2">S No.</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.username}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div className="text-center py-4">No user found.</div>
      )}
    </div>
  );
}
