import React from "react";
import { 
  Target, 
  Eye, 
  Users, 
  Globe, 
  Award, 
  ShieldCheck, 
  Heart, 
  Zap 
} from "lucide-react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";

const About = () => {
  const navigate = useNavigate();
  const stats = [
    { label: "Active Users", value: "25+", icon: <Users className="w-6 h-6" /> },
    { label: "Countries", value: "1", icon: <Globe className="w-6 h-6" /> },
    { label: "Partner Companies", value: "0", icon: <ShieldCheck className="w-6 h-6" /> },
    { label: "Successful Hires", value: "20+", icon: <Award className="w-6 h-6" /> },
  ];

  const values = [
    { 
      title: "Transparency", 
      desc: "We believe in honest communication between recruiters and candidates.",
      icon: <Eye className="text-blue-500" />
    },
    { 
      title: "Innovation", 
      desc: "Using AI to match the right talent with the right opportunity.",
      icon: <Zap className="text-yellow-500" />
    },
    { 
      title: "Empathy", 
      desc: "We understand that every job search is a personal journey.",
      icon: <Heart className="text-red-500" />
    },
    { 
      title: "Global Reach", 
      desc: "Breaking borders to connect talent with global innovators.",
      icon: <Globe className="text-green-500" />
    },
  ];

  return (
    <div>
        <Navbar />
    <div className="bg-white min-h-screen">
      {/* --- 1. HERO HEADER --- */}
      <div className="relative bg-[#387780] py-24 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              We’re Redefining the <span className="text-[#ff9933]">Future of Work.</span>
            </h1>
            <p className="text-xl opacity-90 leading-relaxed mb-8">
              JiViKa is more than a job portal. We are a global ecosystem dedicated to 
              empowering professionals and helping companies build world-class teams.
            </p>
          </div>
        </div>
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </div>

      {/* --- 2. IMPACT STATS --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center transform hover:-translate-y-2 transition duration-300">
              <div className="flex justify-center mb-4 text-[#ff9933]">{stat.icon}</div>
              <div className="text-3xl font-black text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-400 font-medium uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* --- 3. MISSION & VISION --- */}
      <div className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-[#eef6f7] rounded-2xl flex items-center justify-center text-[#387780]">
                <Target size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To democratize the hiring process by providing every individual, 
                  regardless of their location, access to the best career opportunities 
                  through technology and transparency.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-[#fff7ef] rounded-2xl flex items-center justify-center text-[#ff9933]">
                <Eye size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To become the world’s most human-centric job platform, where 
                  talent meets purpose and companies grow through meaningful connections.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
                {/* Placeholder for an Image */}
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400 text-sm italic p-1 text-center">
                   <img className="h-full w-full object-fit" src="https://media.licdn.com/dms/image/v2/C4E12AQFkZCG8_IHc-g/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1653366200095?e=2147483647&v=beta&t=mpZ2fXB1hHBIJVWxz_HHZnS66EPtjMMAT51ili7kzZc" />

                </div>
            </div>
            {/* Design Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#ff9933] rounded-3xl -z-10"></div>
          </div>
        </div>
      </div>

      {/* --- 4. CORE VALUES GRID --- */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">The Values We Live By</h2>
          <p className="text-gray-500 mb-16 max-w-2xl mx-auto">
            Our culture is built on a foundation of trust, speed, and a relentless 
            focus on the user experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-[#387780]/30 transition shadow-sm">
                <div className="mb-6 p-3 bg-gray-50 rounded-xl inline-block">
                  {val.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">{val.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 5. JOIN US CTA --- */}
      <div className="py-24 text-center px-6">
        <div className="max-w-4xl mx-auto bg-[#387780] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
            <h2 className="text-4xl font-bold mb-6">Want to be part of the journey?</h2>
            <p className="text-lg opacity-80 mb-10">We’re always looking for passionate people to join our global team.</p>
            <button  onClick={()=>navigate("/part-of-journey")}
             className="bg-[#ff9933] text-white font-bold py-4 px-10 rounded-full hover:scale-105 transition shadow-xl">
              View Open Positions
            </button>
            {/* Background pattern */}
            <div className="absolute left-0 bottom-0 w-full h-1 bg-[#ff9933]"></div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default About;