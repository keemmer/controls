"use client";
import CardUser from "@/components/user/CardUser";
import { User } from "@/model/user";
import { userStore } from "@/store/user";

function UserManagementPage() {
  const users: User[] = userStore((state) => state.users);
  const toggleStatus = userStore((state) => state.toggleStatus);

  return (
    <>
      <div className="min-h-screen bg-[#F8FAFF] p-6 lg:p-10 font-sans text-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition">
            Add User
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
          {users.map((user, index) => (
            <CardUser
              key={user.id}
              no={index + 1}
              username={user.username}
              email={user.email}
              role={user.role}
              status={user.status}
              onToggle={() => toggleStatus(user.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default UserManagementPage;
