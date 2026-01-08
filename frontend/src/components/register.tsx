"use client";

import { useState } from "react";

export default function Register(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        dob: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");

        const payload = {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            dob: formData.dob,
            password: formData.password,
        }; 

        if (!payload.name || !payload.email || !payload.dob || !payload.password) {
            setMessage("All fields are required");
            return; 
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok){
                setMessage(data.detail || "Registration failed.");
            } else{
                setMessage("Account created successfully!");
            }

        } catch {
            setMessage("Something went wrong, try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
    <main>
      <h1>Create an Account</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account…" : "Sign Up"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </main>
)
}

