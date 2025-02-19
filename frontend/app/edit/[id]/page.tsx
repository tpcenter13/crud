"use client";

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
    id: string;
    username: string;
    name: string;
    email: string;
}

export default function EditUser() {
    const { id } = useParams();
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<User>({
        id: '',
        username: '',
        name: '',
        email: ''
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const fetchUser = useCallback(async () => {
        try {
            const result = await axios.get(`http://localhost:8000/api/user/${id}`);
            setUser(result.data);
            setFormData(result.data);
            setLoading(false);
        } catch {
            setError("Failed to fetch user data.");
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchUser();
        }
    }, [id, fetchUser]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.put(`http://localhost:8000/api/updateuser/${id}`, formData);
            setSuccessMessage("User updated successfully!");
            setUser(response.data);
        } catch {
            setError("Failed to update user. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const closeSuccessMessage = () => {
        setSuccessMessage(null);
        router.push('/'); // Redirect to home page after successful update
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-4xl drop-shadow-lg font-semibold mb-6">Edit User</h1>
            
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {successMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow">
                        <p>{successMessage}</p>
                        <button
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={closeSuccessMessage}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {loading ? (
                <p className="text-xl">Loading...</p>
            ) : user ? (
                <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-96" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update User"}
                        </button>
                    </div>
                </form>
            ) : (
                <p className="text-xl text-red-500">User not found</p>
            )}

            <div className="mt-6">
                <Link href="/">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Back
                    </button>
                </Link>
            </div>
        </div>
    );
}
