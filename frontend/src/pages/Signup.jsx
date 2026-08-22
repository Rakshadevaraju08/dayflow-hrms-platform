import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const user = await signup({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: "HR",
      });
      navigate(["admin", "ADMIN", "HR", "hr"].includes(user?.role) ? "/admin/dashboard" : "/dashboard");
    } catch (submitError) {
      setError(submitError?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas p-4">
      <div className="w-full max-w-[920px] grid md:grid-cols-2 bg-surface rounded-xl2 shadow-card overflow-hidden">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-7 h-7 rounded-md bg-indigo" />
            <span className="font-heading font-extrabold text-[19px] tracking-[-0.02em] text-ink">Dayflow</span>
          </div>

          <h1 className="font-heading font-bold text-[26px] tracking-[-0.01em] text-ink mb-1">Create your company</h1>
          <p className="text-slate text-sm mb-6">Set up your organization's HRMS workspace</p>

          {error && <div role="alert" className="mb-4 rounded-md2 bg-danger-wash text-danger text-sm px-4 py-2.5 border border-danger/20">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {[
              { name: "companyName", label: "Company Name", type: "text" },
              { name: "name", label: "Admin Name", type: "text" },
              { name: "email", label: "Admin Email", type: "email" },
              { name: "phone", label: "Phone", type: "tel" },
              { name: "password", label: "Password", type: "password" },
              { name: "confirmPassword", label: "Confirm Password", type: "password" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-[12.5px] font-semibold text-slate mb-1.5">{field.label}</label>
                <input type={field.type} name={field.name} value={form[field.name]} onChange={handleChange} required className="w-full h-11 px-3.5 rounded-[10px] border border-border text-sm text-ink placeholder:text-slate-soft focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo" />
              </div>
            ))}

            <button type="submit" disabled={loading} className="w-full h-11 rounded-[10px] bg-indigo hover:bg-indigo-light text-white font-semibold text-[14.5px] transition-colors disabled:opacity-60 mt-2">
              {loading ? <span className="inline-flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />Creating account...</span> : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-[13px] text-slate mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo font-semibold hover:underline">Sign In</Link>
          </p>
        </div>

        <div className="hidden md:flex flex-col justify-between bg-indigo p-10">
          <div>
            <div className="h-1 w-16 rounded-full mb-8" style={{ background: "linear-gradient(90deg, #4E7DFF 0%, #EFEBFF 50%, #F5A623 100%)" }} />
            <h2 className="font-heading font-bold text-[22px] leading-[1.35] text-white">Set up once.<br />Run every workday with it.</h2>
          </div>
          <div className="bg-white/10 rounded-card p-4 backdrop-blur-sm">
            <p className="text-white/70 text-xs">Your team's first account will have Admin/HR access.</p>
          </div>
        </div>
      </div>
    </div>
  );
}