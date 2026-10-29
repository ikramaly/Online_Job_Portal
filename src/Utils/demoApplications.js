export const DEMO_APPLICATIONS_KEY = "jivika-demo-applications";
export const DEMO_APPLICATIONS_CHANGED = "jivika-demo-applications-changed";

const validId = (value) => typeof value === "string" && value.trim().length > 0;
const normalizeStatus = (value) => {
  const status = String(value || "Pending").toLowerCase();
  if (status === "accepted") return "Accepted";
  if (status === "rejected") return "Rejected";
  return "Pending";
};

const makeId = () => globalThis.crypto?.randomUUID?.() || `application-${Date.now()}-${Math.random().toString(36).slice(2)}`;

const normalizeRecord = (record) => {
  if (!record || typeof record !== "object" || Array.isArray(record)) return null;
  const jobId = record.jobId;
  const studentId = record.studentId || record.userId;
  if (!validId(jobId) || !validId(studentId)) return null;

  const normalized = {
    ...record,
    applicationId: validId(record.applicationId) ? record.applicationId : makeId(),
    jobId,
    studentId,
    appliedAt: validId(record.appliedAt) ? record.appliedAt : new Date().toISOString(),
    status: normalizeStatus(record.status),
  };
  delete normalized.userId;
  if (!validId(normalized.recruiterId)) delete normalized.recruiterId;
  if (!validId(normalized.companyId)) delete normalized.companyId;
  return normalized;
};

const notifyChanged = () => {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(DEMO_APPLICATIONS_CHANGED));
};

export const readDemoApplications = () => {
  let raw;
  try {
    raw = localStorage.getItem(DEMO_APPLICATIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const unique = new Map();
    let invalidCount = 0;
    parsed.forEach((record) => {
      const normalized = normalizeRecord(record);
      if (!normalized) {
        invalidCount += 1;
        return;
      }
      const pair = `${normalized.jobId}\u0000${normalized.studentId}`;
      const existing = unique.get(pair);
      if (!existing) unique.set(pair, normalized);
      else {
        const existingTime = Date.parse(existing.updatedAt || existing.appliedAt) || 0;
        const nextTime = Date.parse(normalized.updatedAt || normalized.appliedAt) || 0;
        const status = existing.status === "Pending" ? normalized.status
          : normalized.status === "Pending" ? existing.status
            : nextTime > existingTime ? normalized.status : existing.status;
        const appliedAt = (Date.parse(normalized.appliedAt) || Infinity) < (Date.parse(existing.appliedAt) || Infinity)
          ? normalized.appliedAt : existing.appliedAt;
        unique.set(pair, {
          ...existing,
          ...normalized,
          applicationId: existing.applicationId,
          appliedAt,
          status,
        });
      }
    });
    const records = [...unique.values()];
    const serialized = JSON.stringify(records);
    if (invalidCount) {
      console.warn(`[JiviKa demo applications] Kept ${records.length} valid record(s), including deduplicated job/student pairs; found ${invalidCount} malformed record(s). Stored data was left unchanged.`);
    } else if (serialized !== raw) {
      try {
        localStorage.setItem(DEMO_APPLICATIONS_KEY, serialized);
        notifyChanged();
      } catch {
        // Return every valid record even if the browser refuses the migration write.
      }
    }
    return records;
  } catch {
    // Leave unreadable storage untouched; a later write must not silently erase it.
    console.warn("[JiviKa demo applications] Could not parse stored application data; keeping it unchanged.");
    return [];
  }
};

const writeDemoApplications = (applications) => {
  localStorage.setItem(DEMO_APPLICATIONS_KEY, JSON.stringify(applications));
  notifyChanged();
};

export const createDemoApplication = (job, student) => {
  const jobId = job?.id || job?._id;
  const studentId = student?._id || student?.id;
  if (!validId(jobId) || !validId(studentId)) throw new Error("A valid job and signed-in student are required.");

  const applications = readDemoApplications();
  const existing = applications.find((item) => item.jobId === jobId && item.studentId === studentId);
  if (existing) return { application: existing, created: false };

  const application = {
    applicationId: makeId(),
    jobId,
    studentId,
    appliedAt: new Date().toISOString(),
    status: "Pending",
  };
  const recruiterId = job.recruiterId || job.ownerId;
  const companyId = job.company?._id;
  if (validId(recruiterId)) application.recruiterId = recruiterId;
  if (validId(companyId)) application.companyId = companyId;
  writeDemoApplications([...applications, application]);
  return { application, created: true };
};

export const updateDemoApplicationStatus = (applicationId, status) => {
  if (!["Pending", "Accepted", "Rejected"].includes(status)) throw new Error("Choose a valid application status.");
  const applications = readDemoApplications();
  let updated = null;
  const next = applications.map((application) => {
    if (application.applicationId !== applicationId) return application;
    updated = { ...application, status };
    return updated;
  });
  if (!updated) throw new Error("This application could not be found. Refresh and try again.");
  writeDemoApplications(next);
  return updated;
};
