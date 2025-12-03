import React, { useState, useContext } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState(null);
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (form.name.length < 2) return "Name required";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Valid email required";
    if (form.password.length < 6) return "Password min 6 chars";
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return setErr(v);
    setErr(null);
    try {
      const { data } = await api.post("/users/register", form); 
      const loginRes = await api.post("/users/login", { email: form.email, password: form.password });
      login(loginRes.data);
      nav("/dashboard");
    } catch (e) {
      setErr(e.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Sign up</h2>
      {err && <div className="mb-3 text-red-600">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input name="name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Full name" />
        <input name="email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Email" />
        <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Password (min 6)" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Create account</button>
      </form>
    </div>
  );
}
