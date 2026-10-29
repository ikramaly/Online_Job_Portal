const PROFILE_STORAGE_PREFIX = "jivika-student-profile:";
const RESUME_DB_NAME = "jivika-student-profile-files";
const RESUME_STORE_NAME = "resumes";

const getProfileKey = (user) => {
  const userId = user?._id || user?.id || user?.email?.trim().toLowerCase();
  if (!userId) throw new Error("Sign in to save your profile.");
  return `${PROFILE_STORAGE_PREFIX}${encodeURIComponent(userId)}`;
};

export const loadSavedProfile = (user) => {
  try {
    const saved = localStorage.getItem(getProfileKey(user));
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    if (error instanceof SyntaxError) return null;
    throw new Error("Could not read your saved profile from this browser.");
  }
};

export const saveProfile = (user, profile) => {
  localStorage.setItem(getProfileKey(user), JSON.stringify(profile));
};

const openResumeDatabase = () => new Promise((resolve, reject) => {
  if (!window.indexedDB) {
    reject(new Error("This browser does not support local resume storage."));
    return;
  }
  const request = window.indexedDB.open(RESUME_DB_NAME, 1);
  request.onupgradeneeded = () => {
    if (!request.result.objectStoreNames.contains(RESUME_STORE_NAME)) {
      request.result.createObjectStore(RESUME_STORE_NAME);
    }
  };
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error || new Error("Could not open local resume storage."));
});

const withResumeStore = async (user, mode, action) => {
  const database = await openResumeDatabase();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(RESUME_STORE_NAME, mode);
      const request = action(transaction.objectStore(RESUME_STORE_NAME), getProfileKey(user));
      let result;
      request.onsuccess = () => { result = request.result; };
      request.onerror = () => reject(request.error || new Error("Could not access the saved resume."));
      transaction.oncomplete = () => resolve(result);
      transaction.onerror = () => reject(transaction.error || new Error("Could not save the resume."));
      transaction.onabort = () => reject(transaction.error || new Error("Resume storage was interrupted."));
    });
  } finally {
    database.close();
  }
};

export const saveResume = (user, file) => withResumeStore(user, "readwrite", (store, key) => store.put(file, key));
export const loadResume = (user) => withResumeStore(user, "readonly", (store, key) => store.get(key));
export const removeResume = (user) => withResumeStore(user, "readwrite", (store, key) => store.delete(key));
