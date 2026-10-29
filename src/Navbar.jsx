// import React, { useState } from "react";
// import { LogIn, User, ChevronRight, Menu,LogOut, Settings, UserCircle, X } from "lucide-react";
// import { Link, useLocation, NavLink, useNavigate } from "react-router";
// import Register from "./Register";
// import Login from "./Login";
// import { ChevronDown, FileText } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { USER_API_END_POINT } from "./Utils/Constant";
// import { setUser } from "./Redux/userSlice";
// // 1. This is your "Data API" from Project.jsx
// const LANGUAGES = [
//   { code: "en", name: "English", country: "United States", flag: "🇺🇸" },
//   { code: "hi", name: "Hindi", country: "India", flag: "🇮🇳" },
//   { code: "es", name: "Spanish", country: "Spain", flag: "🇪🇸" },
//   { code: "fr", name: "French", country: "France", flag: "🇫🇷" },
// ];

// const Navbar = () => {

//   const [activeTab, setActiveTab] = useState("Home");
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();
//   const [isServiceOpen, setIsServiceOpen] = useState(false);
//   const [currentLang, setCurrentLang] = useState("en");
//   const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
//   const currentCountry =
//     LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

//   const navItems = [
//     { name: "HomePage", path: "/" },
//     { name: "Job Seekers", path: "/job-seekers" },
//     { name: "Employers", path: "/employers" },
//     // { name: "Companies", path: "/companies" },
//     { name: "About Us", path: "/about-us" },
//   ];
//   const SERVICES = [
//     {
//       id: "resume",
//       name: "Resume Analytics",
//       desc: "AI-driven resume scoring",
//       link: "/services/resume-builder",
//       icon: "📊",
//     },
//     {
//       id: "skill",
//       name: "Skill Assessment",
//       desc: "Technical coding challenges",
//       icon: "💻",
//       link: "/services/skills"
//     },
//     {
//       id: "guidence",
//       name: "Career Coaching",
//       desc: "Expert guidance for students",
//       icon: "🎓",
//       link: "/services/guidence"
//     },
//     {
//       id: "notes",
//       link: "https://docs.google.com/spreadsheets/d/1FPcQ32gvV_SfCmG6jNxEfXq2kphhhvV65yEXWQ1_-6k/edit?usp=sharing",
//       name: "Notes",
//       desc: "DSA questions mostly asked in MNC companies",
//       icon: <FileText />,
//     },
//   ];

//   const {user} = useSelector(store =>store.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const logoutHandler = async () =>{
 
//     try{
//       const res = await axios.get(`${USER_API_END_POINT}/logout`,{
//         withCredentials:true
//       });

//       if(res.data.success){
//         dispatch(setUser(null));
//         navigate("/");
//         toast(res.data.message);
//       }

//     }catch(error){
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   }
//   return (
//     <>
//       <nav className="bg-[#387780] shadow-lg sticky top-0 z-50 w-full">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <div className="text-white text-2xl lg:text-3xl font-extrabold tracking-wider cursor-pointer">
//                 <span className="text-[#ff9933] text-4xl lg:text-5xl">J</span>
//                 iViKa
//               </div>
//             </div>

//             <div className="flex mt-5 md:mt-0">
//     <div className="flex items-center md:space-x-4 space-x-2">
//       {!user ? (
//         <div className="flex items-center md:space-x-3 space-x-2">
//           {/* SignIn Button */}
//           <Link to="/login">
//             <button className="flex items-center gap-2 bg-white text-[#387780] text-[11px] md:text-[15px] font-bold py-1.5 md:py-2 px-3 md:px-5 rounded-full border border-slate-200 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
//               <LogIn size={18} />
//               <span>SignIn</span>
//             </button>
//           </Link>

//           {/* SignUp Button */}
//           <Link to="/register">
//             <button className="flex items-center gap-2 bg-[#ff9933] text-white text-[11px] md:text-[15px] font-bold py-1.5 md:py-2 px-3 md:px-5 rounded-full hover:bg-[#e68a00] transition-all shadow-md shadow-orange-100 active:scale-95">
//               <User size={18} />
//               <span>SignUp</span>
//             </button>
//           </Link>
//         </div>
//       ) : (
//         /* AFTER LOGIN - Profile Avatar with Enhanced Dropdown */
//         <div className="relative group">
//           {/* Avatar Trigger */}
//           <div className="flex bg-amber-500 items-center gap-3 md:gap-2 p-1 pr-4 md:pr-10 rounded-full hover:bg-slate-100 cursor-pointer transition-all border border-transparent hover:border-slate-200">
//             <img
//               src={
//                 user?.profilePhoto ||
//                 `https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullname}`
//               }
//               alt="profile"
//               className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-white shadow-sm"
//             />
//             <span className="block text-sm font-semibold text-slate-700">
//               {user?.fullname?.split(' ')[0]}
//             </span>
//           </div>

//           {/* Dropdown Menu */}
//           <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-50 overflow-hidden">
            
//             {/* Header: User Info */}
//             <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
//               <p className="text-sm font-bold text-slate-900 truncate">{user?.fullname}</p>
//               <p className="text-xs text-slate-500 truncate">{user?.email}</p>
//             </div>

//             {/* Menu Links */}
//             <div className="p-2">
//               <Link to="/my-profile" className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors">
//                 {/* <UserCircle size={18} /> */}
//                 <img
//               src={
//                 user?.profilePhoto ||
//                 `https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullname}`
//               }
//               alt="profile"
//               className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-white shadow-sm"
//             />
//                 Profile Details
//               </Link>
              
//               <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors">
//                 <Settings size={18} />
//                 Account Settings
//               </Link>

//               <hr className="my-2 border-slate-100" />

//               <button
//                 onClick={logoutHandler}
//                 className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
//               >
//                 <LogOut size={18} />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
             
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="lg:hidden text-white p-2"
//               >
//                 {isMenuOpen ? (
//                   <X className="lg:w-9 lg:h-9 w-6 h-6" />
//                 ) : (
//                   <Menu className="lg:w-9 lg:h-9 h-6 w-6" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Collapsible Orange Menu */}
//         <div
//           className={`${isMenuOpen ? "block" : "hidden"} lg:block bg-[#ff9933] shadow-inner`}
//         >
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex flex-col lg:flex-row lg:space-x-8 py-4 lg:py-0 lg:h-12">
//               {navItems.map((item) => (

//                 <NavLink
//                   key={item.name}
//                   to={item.path}
//                   onClick={() => setIsMenuOpen(false)}
//                   className={({ isActive }) =>
//                     `text-white text-sm font-medium transition py-3 lg:py-0 
//                    border-l-4 lg:border-l-0 lg:border-b-2 flex items-center ${
//                   isActive
//                   ? " border-0 p-2 shadow-cyan-300 bg-[#e68a00] lg:bg-[#387780]"
//                  : "border-transparent"
//                    }`
//                   }
//                 >
//                   <span className="ml-4 hover:underline lg:ml-0 flex items-center">
//                     {item.name}
//                   </span>
//                 </NavLink>
//               ))}

//               <div>
//                 <div className="relative group">
//                   <button
//                     onMouseEnter={() => setIsServiceOpen(true)}
//                     className="text-white flex items-center mt-[10px] gap-1 font-medium hover:text-[#ff9933] transition"
//                   >
//                     Services{" "}
//                     <ChevronDown
//                       size={16}
//                       className={isServiceOpen ? "rotate-180" : ""}
//                     />
//                   </button>

//                   {isServiceOpen && (
//                     <div
//                       onMouseLeave={() => setIsServiceOpen(false)}
//                       className="absolute left-0 mt-2 w-64 bg-[#ff9933] rounded-2xl shadow-2xl py-4 border border-gray-100 z-[80] animate-in fade-in slide-in-from-top-2"
//                     >
//                       {SERVICES.map((service) => (
//                         <div
//                           key={service.name}
//                           className="px-4 py-3 hover:bg-[#eef6f7] cursor-pointer group transition"
//                         >
//                           <div className="flex items-center gap-3">
//                             <span className="text-xl">{service.icon}</span>

//                             <div>
//                               <Link to={service.link}>
//                                 <p className="text-sm font-bold text-gray-200 group-hover:text-[#387780]">
//                                   {service.name}
//                                 </p>
//                               </Link>
//                               <NavLink to={"/services/" + service.id}
//                                 className={({ isActive }) =>
//                                      isActive
//                                      ? "text-white bg-[#e68a00] lg:bg-[#387780]  rounded"
//                                     : "text-black"
//   }
//                               >
//                                 <p className="text-[10px] text-gray-800">
//                                   {service.desc}
//                                 </p>
//                               </NavLink>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {location.pathname === "/register" && <Register isOpen={true} />}

//       {location.pathname === "/login" && <Login isOpen={true} />}
//     </>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { LogIn, User, Menu, LogOut, Settings, X, FileText, ChevronDown } from "lucide-react";
import { Link, useLocation, NavLink, useNavigate } from "react-router";
import Register from "./Register";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "./Redux/userSlice";
import { useEffect } from "react";
import { logoutDemoAccount } from "./Utils/demoAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const location = useLocation();
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // This effect runs every time the user state or current path changes
useEffect(() => {
  if (user) {
    // Check if the user is a recruiter and is currently on the landing page or login page
    if (user.role === "recruiter" && (location.pathname === "/" || location.pathname === "/login")) {
      navigate("/recruiter-dashboard");
    }
  }
}, [user, navigate, location.pathname]);

  // 1. Define all possible items
  const allNavItems = [
    { name: "HomePage", path: "/", roles: ["student"] },
    { name: "Job Seekers", path: "/job-seekers", roles: ["student"] },
    // { name: "Employers", path: "/employers", roles: ["recruiter"] },
    { name: "About Us", path: "/about-us", roles: ["student"] },
    // Recruiter Specific Tabs
    { name: "Dashboard", path: "/recruiter-dashboard", roles: ["recruiter"] },
  ];

  // 2. Filter items based on role (default to student view if not logged in)
  const navItems = allNavItems.filter((item) => {
    if (!user) return item.roles.includes("student"); // Public view
    return item.roles.includes(user.role);
  });

  const SERVICES = [
    { id: "resume", name: "Resume Analytics", desc: "AI-driven resume scoring", link: "/services/resume-builder", icon: "📊" },
    { id: "skill", name: "Skill Assessment", desc: "Technical coding challenges", icon: "💻", link: "/services/skills" },
    { id: "guidence", name: "Career Coaching", desc: "Expert guidance for students", icon: "🎓", link: "/services/guidence" },
    {
      id: "notes",
      link: "https://docs.google.com/spreadsheets/d/1FPcQ32gvV_SfCmG6jNxEfXq2kphhhvV65yEXWQ1_-6k/edit?usp=sharing",
      name: "Notes",
      desc: "DSA questions mostly asked in MNC companies",
      icon: <FileText size={18} />,
    },
  ];

  const logoutHandler = async () => {
    logoutDemoAccount();
    dispatch(setUser(null));
    navigate("/");
    toast.success("Signed out of demo account.");
  };

  return (
    <>
      <nav className="bg-[#387780] shadow-lg sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="text-white text-2xl lg:text-3xl font-extrabold tracking-wider cursor-pointer">
                <span className="text-[#ff9933] text-4xl lg:text-5xl">J</span>iViKa
              </div>
            </div>

            <div className="flex items-center">
              {!user ? (
                <div className="flex items-center md:space-x-3 space-x-2">
                  <Link to="/login">
                    <button className="flex items-center gap-2 bg-white text-[#387780] text-[11px] md:text-[15px] font-bold py-1 md:py-2 px-. md:px-5 rounded-full border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
                      <LogIn size={18} /> <span>SignIn</span>
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="flex items-center gap-2 bg-[#ff9933] text-white text-[11px] md:text-[15px] font-bold py-1 md:py-2 px-0.5 md:px-5 rounded-full hover:bg-[#e68a00] transition-all shadow-md">
                      <User size={18} /> <span>SignUp</span>
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="relative group">
                  <div className="flex bg-amber-500 items-center gap-3 p-1 pr-4 md:pr-10 rounded-full hover:bg-slate-100 cursor-pointer transition-all">
                    <img
                      src={user?.profile?.profilePhoto || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullname}`}
                      alt="profile"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-white"
                    />
                    <span className="block text-sm font-semibold text-slate-700">{user?.fullname?.split(" ")[0]}</span>
                  </div>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                    <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900 truncate">{user?.fullname}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                    <div className="p-2">
                      {
                        user && user.role === 'student' &&(
                           <Link to="/my-profile" className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-blue-50 rounded-xl transition-colors">
                        <User size={18} /> Profile Details
                      </Link>

                        )
                      }
                     
                      <hr className="my-2 border-slate-100" />
                      <button onClick={logoutHandler} className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white p-2 ml-0 md:ml-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Orange Menu with Role Filtering */}
        <div className={`${isMenuOpen ? "block" : "hidden"} lg:block bg-[#ff9933] shadow-inner`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:space-x-8 py-4 lg:py-0 lg:h-12">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-white text-sm font-medium transition py-3 lg:py-0 border-l-4 lg:border-l-0 flex items-center ${
                      isActive ? "bg-[#e68a00] lg:bg-[#ee930b]" : "border-transparent"
                    }`
                  }
                >
                  <span className="ml-4 lg:ml-0 px-4">{item.name}</span>
                </NavLink>
              ))}

              {/* Only show Services if role is student or not logged in */}
              {(user?.role === "student" || !user) && (
                <div className="relative group">
                  <button
                    onMouseEnter={() => setIsServiceOpen(true)}
                    className="text-white flex items-center h-full px-4 gap-1 font-medium hover:text-[#387780] transition"
                  >
                    Services <ChevronDown size={16} className={isServiceOpen ? "rotate-180" : ""} />
                  </button>
                  {isServiceOpen && (
                    <div
                      onMouseLeave={() => setIsServiceOpen(false)}
                      className="absolute left-0 mt-0 w-64 bg-[#ff9933] rounded-b-2xl shadow-2xl py-4 z-[80]"
                    >
                      {SERVICES.map((service) => (
                        <Link key={service.id} to={service.link} className="block px-4 py-3 hover:bg-[#e68a00] transition">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{service.icon}</span>
                            <div>
                              <p className="text-sm font-bold text-white">{service.name}</p>
                              <p className="text-[10px] text-orange-100">{service.desc}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {location.pathname === "/register" && <Register isOpen={true} />}
      {location.pathname === "/login" && <Login isOpen={true} />}
    </>
  );
};

export default Navbar;
