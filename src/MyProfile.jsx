

import React, { useState, useEffect, useRef } from "react";
import { 
  Mail, Phone, MapPin, Briefcase, CheckCircle, 
  X, CheckCircle2, Save, FileText 
} from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AppliedJobTable from "./AppliedJobTable";
import { setUser } from "./Redux/userSlice"; // Ensure this path is correct
import useGetAppliedJobs from "./Hooks/useGetAppliedJobs";
import { loadSavedProfile, saveProfile, loadResume, saveResume, removeResume } from "./Utils/profileStorage";

const MyProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);
  const userRef = useRef(user);
  userRef.current = user;
  useGetAppliedJobs({ enabled: !user?.demo });

  // UI States
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [pendingResume, setPendingResume] = useState(null);
  const [removeSavedResume, setRemoveSavedResume] = useState(false);
  const [resumePreviewUrl, setResumePreviewUrl] = useState("");
  const [resumeUnavailable, setResumeUnavailable] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Form Data State
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "", 
    file: null
  });

  // Restore this student's saved profile and resume from this browser.
  useEffect(() => {
    const activeUser = userRef.current;
    if (!activeUser) return;
    let cancelled = false;
    const restoreProfile = async () => {
      let savedProfile = null;
      try {
        savedProfile = loadSavedProfile(activeUser);
      } catch (error) {
        toast.error(error.message);
      }
      const profileUser = savedProfile ? {
        ...activeUser,
        ...savedProfile,
        profile: { ...activeUser.profile, ...savedProfile.profile },
      } : activeUser;
      if (savedProfile) dispatch(setUser(profileUser));
      setFormData({
        fullname: profileUser.fullname || "",
        email: profileUser.email || "",
        phoneNumber: profileUser.phoneNumber || "",
        bio: profileUser.profile?.bio || "",
        skills: profileUser.profile?.skills?.join(", ") || "",
        file: null,
      });
      setResumeName(profileUser.profile?.resumeOriginalName || "");
      setResumeLoading(Boolean(profileUser.profile?.resumeOriginalName && !profileUser.profile?.resume));
      try {
        const savedResume = await loadResume(activeUser);
        if (cancelled) return;
        setResumeLoading(false);
        if (savedResume instanceof Blob) {
          setResumePreviewUrl(URL.createObjectURL(savedResume));
          setResumeName(profileUser.profile?.resumeOriginalName || savedResume.name || "Resume.pdf");
          setResumeUnavailable(false);
        } else if (profileUser.profile?.resumeOriginalName) {
          setResumeUnavailable(true);
        }
      } catch {
        if (!cancelled) {
          setResumeLoading(false);
          if (profileUser.profile?.resumeOriginalName) setResumeUnavailable(true);
        }
      }
    };
    restoreProfile();
    return () => { cancelled = true; };
  }, [user?._id, dispatch]);

  useEffect(() => () => {
    if (resumePreviewUrl) URL.revokeObjectURL(resumePreviewUrl);
  }, [resumePreviewUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.type !== "application/pdf" || !file.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Please choose a PDF file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume must be 5 MB or smaller.");
      return;
    }
    if (await file.slice(0, 5).text() !== "%PDF-") {
      toast.error("This file does not appear to be a valid PDF.");
      return;
    }
    setPendingResume(file);
    setSelectedFileName(file.name);
    setResumeName(file.name);
    setRemoveSavedResume(false);
    setResumeUnavailable(false);
    setResumePreviewUrl(URL.createObjectURL(file));
  };

  const cancelEditing = () => {
    const saved = (() => { try { return loadSavedProfile(user); } catch { return null; } })();
    const restoredUser = saved ? { ...user, ...saved, profile: { ...user?.profile, ...saved.profile } } : user;
    setFormData({
      fullname: restoredUser?.fullname || "",
      email: restoredUser?.email || "",
      phoneNumber: restoredUser?.phoneNumber || "",
      bio: restoredUser?.profile?.bio || "",
      skills: restoredUser?.profile?.skills?.join(", ") || "",
      file: null,
    });
    setPendingResume(null);
    setSelectedFileName("");
    setRemoveSavedResume(false);
    setResumeName(restoredUser?.profile?.resumeOriginalName || "");
    setResumeUnavailable(false);
    loadResume(user).then((savedResume) => {
      if (savedResume instanceof Blob) setResumePreviewUrl(URL.createObjectURL(savedResume));
      else setResumePreviewUrl("");
    }).catch(() => setResumePreviewUrl(""));
    setIsEditing(false);
  };

  const handleRemoveResume = () => {
    setPendingResume(null);
    setSelectedFileName("");
    setResumeName("");
    setResumeUnavailable(false);
    setRemoveSavedResume(true);
    setResumePreviewUrl("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const fullname = formData.fullname.trim();
    const email = formData.email.trim();
    const phoneNumber = formData.phoneNumber.trim();
    if (!fullname || !email || !phoneNumber) {
      toast.error("Name, email, and phone are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email address.");
      return;
    }
    if (!/^\+?[\d\s().-]{7,20}$/.test(phoneNumber) || phoneNumber.replace(/\D/g, "").length < 7 || phoneNumber.replace(/\D/g, "").length > 15) {
      toast.error("Enter a valid phone number with 7 to 15 digits.");
      return;
    }
    setLoading(true);
    const previousProfile = (() => { try { return loadSavedProfile(user); } catch { return null; } })();
    const updatedUser = {
      ...user,
      fullname,
      email,
      phoneNumber,
      profile: {
        ...user?.profile,
        bio: formData.bio.trim(),
        skills: formData.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
        resumeOriginalName: removeSavedResume ? "" : pendingResume?.name || resumeName || user?.profile?.resumeOriginalName || "",
        // This marker keeps legacy API links from being treated as a local file URL.
        resume: removeSavedResume || pendingResume ? "" : user?.profile?.resume || "",
      },
    };
    try {
      saveProfile(user, updatedUser);
      try {
        if (pendingResume) await saveResume(user, pendingResume);
        else if (removeSavedResume) await removeResume(user);
      } catch (storageError) {
        if (previousProfile) saveProfile(user, previousProfile);
        else localStorage.removeItem(`jivika-student-profile:${encodeURIComponent(user?._id || user?.id || user?.email?.trim().toLowerCase())}`);
        throw storageError;
      }
      dispatch(setUser(updatedUser));
      setPendingResume(null);
      setSelectedFileName("");
      setRemoveSavedResume(false);
      setResumeUnavailable(false);
      setIsEditing(false);
      toast.success("Profile changes saved on this device.");
    } catch (error) {
      toast.error(error?.name === "QuotaExceededError" ? "Browser storage is full. Remove files or free browser storage and try again." : error?.message || "Could not save your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const hasResume = Boolean(resumeName || user?.profile?.resumeOriginalName || user?.profile?.resume);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <form onSubmit={submitHandler}>
        {/* Header Section */}
        <div className="bg-[#387780] pt-24 pb-32 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
            
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-xl">
              <img 
                src={user?.profile?.profilePhoto || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullname}`} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name and Role */}
            <div className="text-center md:text-left text-white flex-1">
              {isEditing ? (
                <input 
                  className="bg-white/20 border border-white/30 text-2xl font-bold rounded-lg px-3 py-1 outline-none w-full md:w-auto"
                  name="fullname"
                  required
                  maxLength={100}
                  value={formData.fullname}
                  onChange={handleInputChange}
                />
              ) : (
                <h1 className="text-4xl font-bold flex items-center justify-center md:justify-start gap-3">
                  {user?.fullname} <CheckCircle size={24} className="text-blue-300" />
                </h1>
              )}
              <p className="text-xl opacity-90 mt-1 uppercase tracking-wide text-sm font-semibold">
                {user?.role === 'recruiter' ? 'Recruiter' : 'Job Seeker'}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm opacity-80">
                <span className="flex items-center gap-1"><MapPin size={16} />{user.location}</span>
                <span className="flex items-center gap-1"><Briefcase size={16} /> {user?.profile?.experience || 0} Years Exp</span>
              </div>
            </div>

            {/* Edit/Save Buttons */}
            <div className="flex flex-col gap-3">
              {isEditing ? (
                <div className="flex gap-2">
                  <button type="submit" disabled={loading} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all">
                    {loading ? "Saving..." : <><Save size={18}/> Save Changes</>}
                  </button>
                  <button type="button" onClick={cancelEditing} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl font-bold transition-all">
                    <X size={18}/> Cancel
                  </button>
                </div>
              ) : (
                <button type="button" onClick={() => setIsEditing(true)} className="bg-[#ff9933] hover:bg-[#e68a00] text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all">
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-6 -mt-16 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left: Contacts & Skills */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="text-[#387780]" size={18} />
                    {isEditing ? (
                      <input type="email" required className="border rounded px-2 py-1 text-sm w-full" name="email" value={formData.email} onChange={handleInputChange} />
                    ) : <span className="text-sm">{user?.email}</span>}
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="text-[#387780]" size={18} />
                    {isEditing ? (
                      <input type="tel" required maxLength={20} className="border rounded px-2 py-1 text-sm w-full" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                    ) : <span className="text-sm">{user?.phoneNumber}</span>}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {isEditing ? (
                    <input 
                      className="border rounded px-3 py-2 text-sm w-full outline-[#387780]" 
                      placeholder="React, Node, CSS..."
                      name="skills" 
                      value={formData.skills} 
                      onChange={handleInputChange} 
                    />
                  ) : (
                    user?.profile?.skills?.length > 0 ? (
                      user?.profile?.skills?.map((skill, index) => (
                        <span key={index} className="bg-[#eef6f7] text-[#387780] px-3 py-1 rounded-full text-xs font-bold border border-[#387780]/10">
                          {skill}
                        </span>
                      ))
                    ) : <span className="text-gray-400 text-xs italic">No skills added</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Bio & Resume */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Bio</h3>
                {isEditing ? (
                  <textarea 
                    className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:border-[#387780]" 
                    rows="4" 
                    name="bio"
                    value={formData.bio} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed">{user?.profile?.bio || user?.bio ||"No bio added yet."}</p>
                )}
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="text-xl font-bold text-gray-800">Professional Resume</h3>
                <div className={`p-8 rounded-3xl border-2 border-dashed transition-all ${selectedFileName ? "border-green-400 bg-green-50/50" : "border-[#387780]/20 bg-[#387780]/5"}`}>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center md:gap-5 gap-1">
                      <FileText size={32} className="text-[#387780]" />
                      <div>
                        <h4 className="font-bold md:text-[15px] text-[13px]  text-slate-800 truncate max-w-[200px]">
                          {selectedFileName || resumeName || user?.profile?.resumeOriginalName || "Not Uploaded"}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">PDF format preferred</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        id="resumeInput" 
                        accept="application/pdf" 
                        onChange={handleFileChange} 
                        className="hidden" 
                        aria-label="Choose PDF resume"
                      />
                      {hasResume && !removeSavedResume && (resumePreviewUrl || user?.profile?.resume) && (
                        <a href={resumePreviewUrl || user?.profile?.resume} target="_blank" rel="noopener noreferrer" className="bg-white text-slate-600 font-bold md:p-2 p-1 py-2 md:px-6 px-2 rounded-xl md:text-[15px] text-[13px] border hover:bg-gray-50 transition-all">View / Preview</a>
                      )}
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()} 
                        className="bg-slate-800 text-white font-bold py-2 px-6 rounded-xl text-sm hover:bg-slate-900 transition-all"
                      >
                        {hasResume && !removeSavedResume ? "Replace" : "Upload"}
                      </button>
                      {isEditing && hasResume && !removeSavedResume && (
                        <button type="button" onClick={handleRemoveResume} className="bg-white text-red-600 font-bold py-2 px-4 rounded-xl text-sm border border-red-100 hover:bg-red-50 transition-all">Remove</button>
                      )}
                    </div>
                  </div>
                  {selectedFileName && (
                    <p className="mt-3 text-green-600 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 size={14}/> {selectedFileName} selected. Click "Save Changes" to update.
                    </p>
                  )}
                  {resumeLoading && !selectedFileName && !removeSavedResume && (
                    <p className="mt-3 text-slate-500 text-xs font-semibold">Loading saved resume from this browser…</p>
                  )}
                  {resumeUnavailable && !selectedFileName && !removeSavedResume && (
                    <p className="mt-3 text-amber-700 text-xs font-semibold">Resume file is not available in this browser. Select it again to restore its preview.</p>
                  )}
                  {isEditing && removeSavedResume && (
                    <p className="mt-3 text-amber-700 text-xs font-semibold">Resume will be removed when you save changes.</p>
                  )}
                </div>
              </div>

              {/* Applied Jobs Table */}
              
            </div>
          </div>
        </div>
      </form>
      <AppliedJobTable />
      <Footer />
    </div>
  );
}

export default MyProfile;
