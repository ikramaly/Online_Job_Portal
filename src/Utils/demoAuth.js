const ACCOUNTS_KEY = "jivika-demo-accounts";
const SESSION_KEY = "jivika-demo-session";

const readJson = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
};

const hashPassword = async (password, salt) => {
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
};

export const registerDemoAccount = async ({ fullname, email, phoneNumber, password, role, profilePhoto }) => {
  const storedAccounts = readJson(ACCOUNTS_KEY, []);
  const accounts = Array.isArray(storedAccounts) ? storedAccounts : [];
  const normalizedEmail = email.trim().toLowerCase();

  if (!fullname.trim() || !normalizedEmail || !phoneNumber.trim() || password.length < 6 || !["student", "recruiter"].includes(role)) {
    throw new Error("Please complete all fields and choose a valid account type.");
  }

  if (accounts.some((account) => account.email === normalizedEmail)) {
    throw new Error("An account with this email already exists in this browser.");
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltValue = Array.from(salt, (byte) => byte.toString(16).padStart(2, "0")).join("");
  const passwordHash = await hashPassword(password, saltValue);
  const account = {
    id: crypto.randomUUID(),
    fullname: fullname.trim(),
    email: normalizedEmail,
    phoneNumber: phoneNumber.trim(),
    role,
    profilePhoto,
    passwordHash,
    salt: saltValue,
  };

  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
  return account;
};

export const loginDemoAccount = async ({ email, password, role }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const storedAccounts = readJson(ACCOUNTS_KEY, []);
  const accounts = Array.isArray(storedAccounts) ? storedAccounts : [];
  const account = accounts.find((item) => item.email === normalizedEmail && item.role === role);

  if (!account || await hashPassword(password, account.salt) !== account.passwordHash) {
    throw new Error("Email, password, or account type doesn't match.");
  }

  const sessionUser = {
    _id: account.id,
    fullname: account.fullname,
    email: account.email,
    phoneNumber: account.phoneNumber,
    role: account.role,
    profile: { profilePhoto: account.profilePhoto || "" },
    demo: true,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
  return sessionUser;
};

export const logoutDemoAccount = () => localStorage.removeItem(SESSION_KEY);

export const getDemoSession = () => readJson(SESSION_KEY, null);
