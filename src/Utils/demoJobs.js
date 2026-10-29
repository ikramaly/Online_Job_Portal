export const DEMO_JOBS_KEY = "jivika-demo-recruiter-jobs";

export const starterDemoJobs = [
  {
    id: "demo-job-1",
    _id: "demo-job-1",
    title: "Frontend Developer",
    company: { _id: "jivika-demo", name: "JiViKa Demo", logo: "" },
    location: "Remote",
    jobType: "Full-time",
    salary: 8,
    experienceLevel: "1-3 years",
    position: 2,
    description: "Build responsive experiences with React and modern web tools.",
    requirements: "React, JavaScript, HTML, and CSS",
    createdAt: "2026-10-29T00:00:00.000Z",
    applicants: 12,
  },
  {
    id: "demo-job-2",
    _id: "demo-job-2",
    title: "UI/UX Designer",
    company: { _id: "jivika-demo", name: "Wipro", logo: "" },
    location: "Bengaluru",
    jobType: "Full-time",
    salary: 7,
    experienceLevel: "1-3 years",
    position: 1,
    description: "Shape clear and accessible product experiences with a collaborative team.",
    requirements: "Figma, prototyping, and interaction design",
    createdAt: "2026-10-29T00:00:00.000Z",
    applicants: 8,
  },
];

const validText = (value) => typeof value === "string" && value.trim().length > 0;

export const readDemoJobs = () => {
  try {
    const raw = localStorage.getItem(DEMO_JOBS_KEY);
    if (!raw) return starterDemoJobs;
    const storedJobs = JSON.parse(raw);
    if (!Array.isArray(storedJobs)) {
      console.warn("[JiviKa demo jobs] Stored job data is not a list; keeping it unchanged and showing starter jobs.");
      return starterDemoJobs;
    }
    const invalidIndexes = [];
    const jobs = storedJobs.flatMap((job, index) => {
      if (!job || typeof job !== "object" || Array.isArray(job) || !validText(job.title)) {
        invalidIndexes.push(index);
        return [];
      }
      const id = job.id || job._id || `migrated-demo-job-${index}`;
      const salary = job.salary === undefined || job.salary === null || job.salary === "" ? 8 : Number(job.salary);
      const position = Number(job.position);
      const applicants = Number(job.applicants);
      if (!validText(id) || !Number.isFinite(salary) || salary < 0 || (job.position !== undefined && (!Number.isFinite(position) || position < 1))) {
        invalidIndexes.push(index);
        return [];
      }
      return [{
        ...job,
        id,
        _id: id,
        company: typeof job.company === "string"
          ? { _id: "demo-company", name: job.company, logo: "" }
          : { _id: "demo-company", name: job.company?.name || "JiViKa Demo", logo: job.company?.logo || "" },
        jobType: job.jobType || job.type || "Full-time",
        salary,
        experienceLevel: job.experienceLevel || job.experience || "Not specified",
        position: Number.isFinite(position) && position >= 1 ? position : 1,
        description: job.description || "Join the team and contribute to meaningful product work. This is a sample listing for the local demo.",
        requirements: job.requirements || "Relevant experience, clear communication, and a willingness to learn.",
        applicants: Number.isFinite(applicants) && applicants >= 0 ? applicants : 0,
        createdAt: job.createdAt || new Date().toISOString(),
      }];
    });
    if (invalidIndexes.length) {
      console.warn(`[JiviKa demo jobs] Kept ${jobs.length} valid job record(s); skipped ${invalidIndexes.length} malformed record(s) at index(es): ${invalidIndexes.join(", ")}. Stored data was left unchanged.`);
    }
    return jobs;
  } catch {
    console.warn("[JiviKa demo jobs] Could not parse stored job data; keeping it unchanged and showing starter jobs.");
    return starterDemoJobs;
  }
};

export const saveDemoJobs = (jobs) => localStorage.setItem(DEMO_JOBS_KEY, JSON.stringify(jobs));
