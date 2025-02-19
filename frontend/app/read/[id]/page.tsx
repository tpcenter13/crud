"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface User {
    id: string;
    username: string;
    name: string;
    email: string;
}

export default function ViewUser() {
    const { id } = useParams();

    console.log("User ID:", id);

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (id) {
            fetchUser();
        }
    }, [id]);

    const fetchUser = async () => {
        try {
            const result = await axios.get(`http://localhost:8000/api/user/${id}`);
            console.log("API response:", result.data);
            setUser(result.data);
            setLoading(false);
        } catch (err) {
            console.log("Something went wrong:", err);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-4xl drop-shadow-lg font-semibold mb-6">User Details</h1>
            {loading ? (
                <p className="text-xl">Loading...</p>
            ) : user ? (
                <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-96">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                        <p className="border rounded w-full py-2 px-3 bg-gray-100">{user.name}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                        <p className="border rounded w-full py-2 px-3 bg-gray-100">{user.username}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <p className="border rounded w-full py-2 px-3 bg-gray-100">{user.email}</p>
                    </div>
                </div>
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
