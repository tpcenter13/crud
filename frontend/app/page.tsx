import React, { Suspense } from 'react';
import Link from 'next/link';
import ListUsers from './components/ListUsers';

const Page = () => {
  return (
    <div className="flex flex-col items-center pt-10">
      <div className="text-3xl font-semibold">CRUD</div>

      {/* Next.js Link for navigation */}
      <Link 
        href="/users/create" 
        className="bg-blue-900 px-5 rounded-lg text-white p-3 mt-5 hover:bg-slate-600"
      >
        Add New User
      </Link>

      <Suspense fallback="Loading...">
        <ListUsers />
      </Suspense>
    </div>
  );
};

export default Page;
