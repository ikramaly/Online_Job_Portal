import { createElement, useEffect, useMemo, useState } from "react";
import { BriefcaseBusiness, Building2, MapPin, Pencil, Plus, Trash2, Users, X } from "lucide-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { readDemoJobs, saveDemoJobs } from "./Utils/demoJobs";
import { DEMO_APPLICATIONS_CHANGED, readDemoApplications, updateDemoApplicationStatus } from "./Utils/demoApplications";
import { loadResume, loadSavedProfile } from "./Utils/profileStorage";

const emptyJob = {
  title: "",
  companyName: "",
  location: "",
  jobType: "Full-time",
  salary: "",
  experienceLevel: "",
  position: "1",
  description: "",
  requirements: "",
};

const RecruiterDemo = () => {
  const { user } = useSelector((store) => store.user);
  const [jobs, setJobs] = useState(readDemoJobs);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyJob);
  const [applications, setApplications] = useState(readDemoApplications);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [busyApplicationId, setBusyApplicationId] = useState(null);
  const [loadingResumeId, setLoadingResumeId] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);

  useEffect(() => {
    const refresh = () => {
      setApplications(readDemoApplications());
      setJobs(readDemoJobs());
    };
    window.addEventListener(DEMO_APPLICATIONS_CHANGED, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(DEMO_APPLICATIONS_CHANGED, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  useEffect(() => () => {
    if (resumePreview?.url) URL.revokeObjectURL(resumePreview.url);
  }, [resumePreview]);

  const visibleJobs = useMemo(() => jobs.filter((job) => !job.recruiterId || job.recruiterId === user?._id), [jobs, user?._id]);
  const selectedJob = visibleJobs.find((job) => (job.id || job._id) === selectedJobId);
  const selectedApplications = selectedJob ? applications
    .filter((application) => application.jobId === (selectedJob.id || selectedJob._id))
    .filter((application) => !selectedJob.recruiterId || application.recruiterId === selectedJob.recruiterId) : [];

  useEffect(() => {
    try {
      saveDemoJobs(jobs);
    } catch {
      toast.error("Browser storage is full. Remove a large profile image or clear unused demo data.");
    }
  }, [jobs]);

  const changeHandler = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const openNewJobForm = () => {
    setEditingId(null);
    setForm(emptyJob);
    setShowForm(true);
  };

  const openEditForm = (job) => {
    setEditingId(job.id || job._id);
    setForm({
      title: job.title || "",
      companyName: job.company?.name || "",
      location: job.location || "",
      jobType: job.jobType || "Full-time",
      salary: String(job.salary ?? ""),
      experienceLevel: job.experienceLevel || "",
      position: String(job.position || 1),
      description: job.description || "",
      requirements: job.requirements || "",
    });
    setShowForm(true);
  };

  const submitJob = (event) => {
    event.preventDefault();
    const cleaned = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]));
    const jobId = editingId || crypto.randomUUID();
    const previousJob = editingId ? jobs.find((item) => (item.id || item._id) === editingId) : null;
    const job = {
      id: jobId,
      _id: jobId,
      title: cleaned.title,
      company: { _id: previousJob?.company?._id || "demo-company", name: cleaned.companyName, logo: previousJob?.company?.logo || "" },
      ...(previousJob?.recruiterId || (!editingId && user?._id) ? { recruiterId: previousJob?.recruiterId || user._id } : {}),
      location: cleaned.location,
      jobType: cleaned.jobType,
      salary: Number(cleaned.salary),
      experienceLevel: cleaned.experienceLevel || "Not specified",
      position: Number(cleaned.position),
      description: cleaned.description,
      requirements: cleaned.requirements,
      applicants: previousJob?.applicants || 0,
      createdAt: new Date().toISOString(),
      ...(previousJob?.archivedAt ? { archivedAt: previousJob.archivedAt } : {}),
    };

    setJobs((current) => editingId
      ? current.map((item) => (item.id || item._id) === editingId ? job : item)
      : [job, ...current]);
    setShowForm(false);
    setEditingId(null);
    setForm(emptyJob);
    toast.success(editingId ? "Job listing updated." : "Job posted to your demo listings.");
  };

  const archiveJob = (id) => {
    setJobs((current) => current.map((job) => (job.id || job._id) === id ? { ...job, archivedAt: new Date().toISOString() } : job));
    if (selectedJobId === id) setSelectedJobId(null);
    toast.success("Job archived. Application history has been kept.");
  };

  const restoreJob = (id) => {
    setJobs((current) => current.map((job) => {
      if ((job.id || job._id) !== id) return job;
      return Object.fromEntries(Object.entries(job).filter(([key]) => key !== "archivedAt"));
    }));
    toast.success("Job restored to the student listings.");
  };

  const sampleApplicantCount = visibleJobs.reduce((sum, job) => sum + (Number(job.applicants) || 0), 0);
  const actualApplicantCount = visibleJobs.reduce((sum, job) => sum + applications.filter((application) => application.jobId === (job.id || job._id) && (!job.recruiterId || application.recruiterId === job.recruiterId)).length, 0);

  const applicantDetails = (studentId) => {
    try {
      const accounts = JSON.parse(localStorage.getItem("jivika-demo-accounts") || "[]");
      const account = Array.isArray(accounts) ? accounts.find((item) => item.id === studentId && item.role === "student") : null;
      const sessionShape = account ? { _id: studentId, id: studentId, fullname: account.fullname, email: account.email, phoneNumber: account.phoneNumber, role: account.role, profile: { profilePhoto: account.profilePhoto || "" } } : { _id: studentId };
      const profile = loadSavedProfile(sessionShape);
      return { ...sessionShape, ...profile, profile: { ...sessionShape.profile, ...profile?.profile } };
    } catch {
      return { _id: studentId, fullname: "Student profile unavailable", profile: {} };
    }
  };

  const changeApplicationStatus = (application, status) => {
    if (busyApplicationId) return;
    if (application.status === status) return;
    if (status === "Rejected" && !window.confirm("Reject this application? The student will see the updated status.")) return;
    setBusyApplicationId(application.applicationId);
    try {
      updateDemoApplicationStatus(application.applicationId, status);
      setApplications(readDemoApplications());
      toast.success(`Application marked ${status.toLowerCase()}.`);
    } catch (error) {
      toast.error(error.message || "Could not update this application.");
    } finally {
      setBusyApplicationId(null);
    }
  };

  const previewResume = async (studentId) => {
    setLoadingResumeId(studentId);
    try {
      const blob = await loadResume({ _id: studentId });
      if (!(blob instanceof Blob)) {
        toast.error("This student has not saved a resume in this browser.");
        return;
      }
      setResumePreview({ url: URL.createObjectURL(blob), filename: applicantDetails(studentId).profile?.resumeOriginalName || blob.name || "Resume.pdf" });
    } catch (error) {
      toast.error(error.message || "Could not open the saved resume.");
    } finally {
      setLoadingResumeId(null);
    }
  };
  const fieldClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#387780] focus:bg-white";
  const labelClass = "mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500";

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#387780]">Recruiter workspace · Demo</p><h1 className="text-3xl font-black text-slate-900 md:text-4xl">Recruiter Dashboard</h1><p className="mt-2 text-slate-600">Create and manage job listings for your demo company.</p></div>
          <button onClick={openNewJobForm} className="flex items-center justify-center gap-2 rounded-xl bg-[#ff9933] px-5 py-3 font-bold text-white shadow hover:bg-[#e68a00]"><Plus size={18} /> Post a job</button>
        </div>

        {showForm && <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex items-center justify-between"><div><h2 className="text-xl font-bold text-slate-900">{editingId ? "Edit job listing" : "Create a job listing"}</h2><p className="mt-1 text-sm text-slate-500">Required details will be saved to this browser.</p></div><button type="button" aria-label="Close job form" onClick={() => setShowForm(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={20} /></button></div>
          <form onSubmit={submitJob} className="grid gap-4 md:grid-cols-2">
            <label><span className={labelClass}>Job title *</span><input name="title" value={form.title} onChange={changeHandler} className={fieldClass} placeholder="e.g. Frontend Developer" required maxLength={100} /></label>
            <label><span className={labelClass}>Company name *</span><span className="relative block"><Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input name="companyName" value={form.companyName} onChange={changeHandler} className={`${fieldClass} pl-10`} placeholder="Your company" required maxLength={100} /></span></label>
            <label><span className={labelClass}>Location *</span><span className="relative block"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input name="location" value={form.location} onChange={changeHandler} className={`${fieldClass} pl-10`} placeholder="Remote, Delhi, etc." required maxLength={100} /></span></label>
            <label><span className={labelClass}>Job type *</span><select name="jobType" value={form.jobType} onChange={changeHandler} className={fieldClass} required><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option><option>Remote</option></select></label>
            <label><span className={labelClass}>Salary (LPA) *</span><input name="salary" type="number" min="0" step="0.1" value={form.salary} onChange={changeHandler} className={fieldClass} placeholder="e.g. 8" required /></label>
            <label><span className={labelClass}>Experience</span><input name="experienceLevel" value={form.experienceLevel} onChange={changeHandler} className={fieldClass} placeholder="e.g. 2+ years" maxLength={60} /></label>
            <label><span className={labelClass}>Open positions *</span><input name="position" type="number" min="1" step="1" value={form.position} onChange={changeHandler} className={fieldClass} required /></label>
            <label className="md:col-span-2"><span className={labelClass}>Role description *</span><textarea name="description" value={form.description} onChange={changeHandler} className={fieldClass} rows="4" placeholder="Describe the role and responsibilities" required maxLength={3000} /></label>
            <label className="md:col-span-2"><span className={labelClass}>Requirements *</span><textarea name="requirements" value={form.requirements} onChange={changeHandler} className={fieldClass} rows="3" placeholder="Skills and qualifications" required maxLength={2000} /></label>
            <div className="flex flex-wrap gap-3 md:col-span-2"><button className="rounded-xl bg-[#387780] px-6 py-3 font-bold text-white hover:bg-[#2f666d]">{editingId ? "Save changes" : "Publish job"}</button><button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-600 hover:bg-slate-50">Cancel</button></div>
          </form>
        </section>}

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          {[
            { label: "Active job listings", value: visibleJobs.filter((job) => !job.archivedAt).length, icon: BriefcaseBusiness },
            { label: "Real applications", value: actualApplicantCount, icon: Users },
            { label: "Sample applicants", value: sampleApplicantCount, icon: Users },
            { label: "Demo workspace", value: "JiViKa", icon: Building2 },
          ].map(({ label, value, icon: Icon }) => <div key={label} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><span className="rounded-xl bg-[#387780]/10 p-3 text-[#387780]">{createElement(Icon, { size: 22 })}</span><div><p className="text-sm text-slate-500">{label}</p><p className="text-xl font-bold text-slate-900">{value}</p></div></div>)}
        </section>

        {selectedJob && <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="text-lg font-bold text-slate-900">Applicants · {selectedJob.title}</h2><p className="text-sm text-slate-500">{selectedApplications.length} real application{selectedApplications.length === 1 ? "" : "s"} · Legacy jobs without an owner are visible in this demo workspace.</p><p className="mt-1 text-xs text-slate-500">Accepted means shortlisted for the role; it does not mean the student was hired.</p></div>
            <button type="button" onClick={() => setSelectedJobId(null)} className="self-start rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close applicant list"><X size={18} /></button>
          </div>
          {selectedApplications.length === 0 ? <p className="p-8 text-center text-slate-500">No students have applied to this job yet.</p> : <div className="divide-y divide-slate-100">
            {selectedApplications.map((application) => {
              const student = applicantDetails(application.studentId);
              const status = application.status || "Pending";
              return <article key={application.applicationId} className="flex flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0"><h3 className="font-bold text-slate-900">{student.fullname || "Student"}</h3><p className="text-sm text-slate-600">{student.email || "Email unavailable"} · {student.phoneNumber || "Phone unavailable"}</p><p className="mt-1 text-xs text-slate-500">Applied {new Date(application.appliedAt).toLocaleString()} · Status: <span className="font-bold">{status}</span></p><p className="mt-1 text-sm text-slate-600">{student.profile?.bio || "No bio added."}</p>{student.profile?.skills?.length > 0 && <p className="mt-1 text-xs text-slate-500">Skills: {student.profile.skills.join(", ")}</p>}</div>
                <div className="flex flex-wrap items-center gap-2">
                  {student.profile?.resumeOriginalName && <button type="button" disabled={Boolean(loadingResumeId)} onClick={() => previewResume(application.studentId)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">{loadingResumeId === application.studentId ? "Opening..." : "View Resume"}</button>}
                  <button type="button" disabled={Boolean(busyApplicationId) || status === "Accepted"} onClick={() => changeApplicationStatus(application, "Accepted")} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50">Accept</button>
                  <button type="button" disabled={Boolean(busyApplicationId) || status === "Rejected"} onClick={() => changeApplicationStatus(application, "Rejected")} className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-bold text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50">Reject</button>
                </div>
              </article>;
            })}
          </div>}
        </section>}

        {resumePreview && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4" role="dialog" aria-modal="true" aria-label="Resume preview">
          <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"><div className="flex items-center justify-between border-b px-4 py-3"><p className="truncate font-bold text-slate-800">{resumePreview.filename}</p><button type="button" onClick={() => setResumePreview(null)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100" aria-label="Close resume preview"><X size={20} /></button></div><iframe title="Student resume PDF preview" src={resumePreview.url} className="min-h-0 flex-1" /></div>
        </div>}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4"><h2 className="text-lg font-bold text-slate-900">Your job listings</h2><p className="text-sm text-slate-500">New jobs appear on the student home page in this browser.</p></div>
          <div className="divide-y divide-slate-100">{visibleJobs.map((job) => {
            const jobId = job.id || job._id;
            const realCount = applications.filter((application) => application.jobId === jobId && (!job.recruiterId || application.recruiterId === job.recruiterId)).length;
            return <article key={jobId} className={`flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between ${job.archivedAt ? "bg-slate-50 opacity-80" : ""}`}><div className="flex items-start gap-3"><span className="mt-1 rounded-xl border border-slate-100 bg-white p-2 text-[#387780]"><Building2 size={22} /></span><div><h3 className="font-bold text-slate-900">{job.title} {job.archivedAt && <span className="ml-2 rounded-full bg-slate-200 px-2 py-1 text-xs text-slate-600">Archived</span>}</h3><p className="mt-1 text-sm text-slate-500">{job.company?.name || "JiViKa Demo"} · {job.location} · {job.jobType}</p><p className="mt-1 text-xs text-slate-500">₹{job.salary} LPA · {job.position} opening(s) · {job.experienceLevel || "Experience not specified"}{!job.recruiterId && <span> · Legacy job (no owner)</span>}</p></div></div><div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              <button type="button" onClick={() => setSelectedJobId(jobId)} className="flex items-center gap-1 rounded-full bg-[#387780]/10 px-3 py-1.5 text-sm font-semibold text-[#387780] hover:bg-[#387780]/20"><Users size={16} /> {realCount} actual applicants</button>
              <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700">{Number(job.applicants) || 0} sample</span>
              {!job.archivedAt && <button type="button" aria-label={`Edit ${job.title}`} onClick={() => openEditForm(job)} className="rounded-lg p-2 text-[#387780] hover:bg-[#387780]/10"><Pencil size={18} /></button>}
              {job.archivedAt ? <button type="button" onClick={() => restoreJob(jobId)} className="rounded-lg px-3 py-2 text-sm font-semibold text-[#387780] hover:bg-[#387780]/10">Restore</button> : <button type="button" aria-label={`Archive ${job.title}`} onClick={() => archiveJob(jobId)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={18} /></button>}
            </div></article>;
          })}</div>
          {visibleJobs.length === 0 && <p className="p-8 text-center text-slate-500">No jobs yet. Post your first listing.</p>}
        </section>
        <p className="mt-5 text-center text-xs text-slate-500">Demo interface only. Jobs are stored locally and are not published to a real job board.</p>
      </main>
      <Footer />
    </div>
  );
};

export default RecruiterDemo;
