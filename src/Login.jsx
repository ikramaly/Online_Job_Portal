import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Lock, Mail, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "./Redux/userSlice";
import { loginDemoAccount } from "./Utils/demoAuth";
import { resetTransientAccountState } from "./Redux/store";

const Login = ({ isOpen = true, onClose, onSwitchToSignup }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({ email: "", password: "", role: "" });
  const changeEventHandler = (event) => setInput((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!input.role) {
      toast.error("Select Student or Recruiter to sign in.");
      return;
    }
    setLoading(true);
    try {
      const sessionUser = await loginDemoAccount(input);
      dispatch(resetTransientAccountState());
      dispatch(setUser(sessionUser));
      toast.success(`Welcome, ${sessionUser.fullname}!`);
      navigate(sessionUser.role === "recruiter" ? "/recruiter-dashboard" : "/");
    } catch (error) {
      toast.error(error.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  const close = onClose || (() => navigate("/"));
  const inputClass = "w-full rounded-xl border border-gray-200 py-4 pl-12 pr-4 outline-none transition-all focus:border-[#387780]";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-md" onClick={close} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in duration-300">
        <button type="button" onClick={close} className="absolute right-5 top-5 z-10 rounded-full p-2 text-gray-400 hover:bg-gray-100"><X size={20} /></button>
        <div className="p-6 md:p-10">
          <div className="mb-8 text-center"><h2 className="text-2xl font-black text-[#387780] md:text-3xl">Welcome Back</h2><p className="mt-2 text-sm text-gray-500">Sign in to your JiViKa demo account</p></div>
          <form className="space-y-4" onSubmit={submitHandler}>
            <div className="relative"><Mail className="absolute left-4 top-4 text-gray-400" size={18} /><input className={inputClass} name="email" value={input.email} onChange={changeEventHandler} type="email" placeholder="Email Address" required /></div>
            <div className="relative"><Lock className="absolute left-4 top-4 text-gray-400" size={18} /><input className={inputClass} name="password" value={input.password} onChange={changeEventHandler} type="password" placeholder="Enter Password" required /></div>
            <fieldset className="py-2"><legend className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Sign in as</legend><div className="flex gap-6">{["student", "recruiter"].map((role) => <label key={role} className="flex cursor-pointer items-center gap-2"><input type="radio" name="role" value={role} checked={input.role === role} onChange={changeEventHandler} className="accent-[#387780]" required /><span className="text-sm font-medium capitalize">{role}</span></label>)}</div></fieldset>
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff9933] py-4 font-bold text-white transition hover:bg-[#e68a00] disabled:cursor-wait disabled:bg-gray-400">{loading ? "Signing in..." : <>Sign In <ArrowRight size={18} /></>}</button>
          </form>
          <p className="mt-4 text-center text-xs text-slate-500">Demo mode only. Accounts are stored in this browser; no Gmail sign-in is used.</p>
          <p className="mt-8 text-center text-sm text-gray-500">New to JiViKa? <button type="button" onClick={onSwitchToSignup || (() => navigate("/register"))} className="font-black text-[#ff9933] hover:underline">Create Account</button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
