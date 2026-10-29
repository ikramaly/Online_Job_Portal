import { useState } from "react";
import { useNavigate } from "react-router";
import { Camera, Lock, Mail, Phone, User, X, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { registerDemoAccount } from "./Utils/demoAuth";

const Register = ({ isOpen }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [input, setInput] = useState({ fullname: "", email: "", phoneNumber: "", password: "", role: "" });
  const changeEventHandler = (event) => setInput((current) => ({ ...current, [event.target.name]: event.target.value }));

  const changeFileHandler = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Profile picture must be 2MB or smaller.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!input.role) {
      toast.error("Please choose Student or Recruiter.");
      return;
    }
    setLoading(true);
    try {
      await registerDemoAccount({ ...input, profilePhoto: imagePreview });
      toast.success("Demo account created. Sign in to continue.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Unable to create demo account.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputClass = "w-full rounded-xl border border-gray-200 py-3 md:py-4 pl-12 pr-4 outline-none transition-all focus:border-[#387780]";
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => navigate("/")} />
      <div className="relative max-h-[95vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in duration-300">
        <button type="button" onClick={() => navigate("/")} className="absolute right-5 top-5 z-10 rounded-full p-2 text-gray-400 hover:bg-gray-100"><X size={20} /></button>
        <div className="p-6 md:p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-black text-[#387780] md:text-3xl">Join JiViKa</h2>
            <p className="mt-1 text-sm text-gray-500 md:text-base">Start your journey toward a better career</p>
          </div>
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="space-y-3">
              <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input className={inputClass} name="fullname" value={input.fullname} onChange={changeEventHandler} placeholder="Full Name" required /></div>
              <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input className={inputClass} name="email" value={input.email} onChange={changeEventHandler} type="email" placeholder="Email Address" required /></div>
              <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input className={inputClass} name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} type="tel" placeholder="Phone Number" required /></div>
              <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input className={inputClass} name="password" value={input.password} onChange={changeEventHandler} type="password" placeholder="Create Password (min. 6 characters)" minLength={6} required /></div>
            </div>
            <div className="flex flex-col justify-between gap-5 py-2 sm:flex-row sm:items-center">
              <fieldset className="flex gap-4">
                <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Choose account type</legend>
                {["student", "recruiter"].map((role) => <label key={role} className="flex cursor-pointer items-center gap-2"><input type="radio" name="role" value={role} checked={input.role === role} onChange={changeEventHandler} className="accent-[#387780]" /><span className="text-sm font-medium capitalize">{role}</span></label>)}
              </fieldset>
              <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
                <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-50">{imagePreview ? <img src={imagePreview} alt="Profile preview" className="h-full w-full object-cover" /> : <Camera size={20} />}</span>
                Profile picture (optional)
                <input type="file" accept="image/*" onChange={changeFileHandler} className="sr-only" />
              </label>
            </div>
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff9933] py-4 font-bold text-white transition hover:bg-[#e68a00] disabled:cursor-wait disabled:bg-gray-400">{loading ? "Creating account..." : <>Create Account <ArrowRight size={18} /></>}</button>
          </form>
          <p className="mt-4 text-center text-xs text-slate-500">Demo mode: your account is saved in this browser only.</p>
          <p className="mt-6 text-center text-sm text-gray-500">Already have an account? <button type="button" onClick={() => navigate("/login")} className="ml-2 font-black text-[#387780] hover:underline">Login here</button></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
