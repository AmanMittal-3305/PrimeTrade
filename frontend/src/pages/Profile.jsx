import React, { useContext, useState } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, login, logout } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [msg, setMsg] = useState(null);

  const update = async () => {
    try {
      const { data } = await api.put("/users/profile", { name });
      
      login({ token: localStorage.getItem("token"), user: data });
      setMsg("Saved");
    } catch (err) {
      setMsg("Failed");
    }
    setTimeout(() => setMsg(null), 2000);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Profile</h2>
      <div className="mb-3"><strong>Email:</strong> {user?.email}</div>
      <label className="block mb-2">Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded mb-3" />
      <div className="flex gap-2">
        <button onClick={update} className="bg-green-600 text-white px-4 py-1 rounded">Save</button>
        <button onClick={() => { logout(); }} className="px-4 bg-red-500 text-white py-1 border rounded">Logout</button>
      </div>
      {msg && <div className="mt-3 text-sm">{msg}</div>}
    </div>
  );
}
