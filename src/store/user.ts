import { create } from 'zustand';
import { User } from '@/model/user';

interface UserState {
  users: User[];
  toggleStatus: (id: string) => void;
  deleteUser: (id: string) => void;
}

export const userStore = create<UserState>((set) => ({
  users: [
    { id: "1", username: "John Doe", email: "john@example.com", role: "admin", status: true },
    { id: "2", username: "Jane Smith", email: "jane@example.com", role: "user", status: false },
  ],
  toggleStatus: (id) => set((state) => ({
    users: state.users.map(u => u.id === id ? { ...u, status: !u.status } : u)
  })),
  deleteUser: (id) => set((state) => ({
    users: state.users.filter(u => u.id !== id)
  })),
}));