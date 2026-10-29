
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  Download,
  Loader2,
  Target,
  Award,
  MessageSquare,
  Zap,
  Globe,
  Scale,
  FileText,
  CheckCircle,
} from "lucide-react";
import { downloadMarketInsights } from "../Utils/downloadPdf";

const strategies = [
  {
    title: "The Anchor Technique",
    desc: "The first number mentioned sets the 'anchor.' Always provide a range where your desired salary is the floor.",
    icon: <Target size={24} color="#e11d48" />,
    bgColor: "#fff1f2",
  },
  {
    title: "Value-Based Framing",
    desc: "Frame your request as an investment using your MERN stack expertise.",
    icon: <Award size={24} color="#2563eb" />,
    bgColor: "#eff6ff",
  },
  {
    title: "The Tactical Pause",
    desc: "Pause after an offer to create pressure and reveal flexibility.",
    icon: <MessageSquare size={24} color="#059669" />,
    bgColor: "#ecfdf5",
  },
  {
    title: "Benefit Substitution",
    desc: "Negotiate perks if salary is fixed.",
    icon: <Zap size={24} color="#d97706" />,
    bgColor: "#fffbeb",
  },
  {
    title: "Global Benchmarking",
    desc: "Use international cost-of-living data to justify your rate, especially for remote roles with firms based in the US, UK, or EU.",
    icon: <Globe size={24} color="#7c3aed" />, // Hex for Violet-600
    bgColor: "#f5f3ff"
  },
  {
    title: "The Exactness Premium",
    desc: "Requests for precise numbers (e.g., ₹14,85,000) are perceived as more data-driven and less negotiable than rounded numbers.",
    icon: <Scale size={24} color="#db2777" />, // Hex for Pink-600
    bgColor: "#fdf2f8"
  },
  {
    title: "Exploding Offers",
    desc: "Avoid 'exploding offers' that expire in 24 hours. Request 72 hours to review the total rewards package professionally.",
    icon: <FileText size={24} color="#475569" />, // Hex for Slate-600
    bgColor: "#f8fafc"
  },
  {
    title: "The Sign-on Lever",
    desc: "A one-time sign-on bonus is easier for HR to approve than a base salary increase because it doesn't affect recurring budgets.",
    icon: <CheckCircle size={24} color="#0891b2" />, // Hex for Cyan-600
    bgColor: "#ecfeff"
  }
];

const NegotiationArt = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    // 🔥 IMPORTANT: TEMPORARILY HIDE SVG ICONS
    const icons = document.querySelectorAll("#negotiation-report svg");
    icons.forEach((el) => (el.style.display = "none"));

    await downloadMarketInsights(
      "negotiation-report",
      "JiViKa-Negotiation-Guide.pdf"
    );

    // 🔥 RESTORE ICONS AFTER PDF
    icons.forEach((el) => (el.style.display = "block"));

    setIsDownloading(false);
  };

  return (
    <div className="mt-[-20px] p-10">
      {/* PDF WRAPPER */}
      <div
        id="negotiation-report"
        style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "20px",
          border: "1px solid #e2e8f0",
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: "30px", borderBottom: "1px solid #eee", paddingBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ background: "#0f172a", padding: "10px", borderRadius: "8px" }}>
              <ShieldCheck size={20} color="#fff" />
            </div>
            <span style={{ fontSize: "12px", fontWeight: "bold", color: "#2563eb" }}>
              JiViKa Executive Strategy
            </span>
          </div>

          <h2 style={{ fontSize: "28px", fontWeight: "bold", marginTop: "10px" }}>
            The Art of Negotiation
          </h2>

          <p style={{ color: "#64748b" }}>
            Professional tactics for International Tech Standards.
          </p>
        </div>

        {/* STRATEGIES */}
        <div style={{ display: "grid", gap: "25px" }}>
          {strategies.map((item, index) => (
            <div key={index} style={{ display: "flex", gap: "15px" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  background: item.bgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </div>

              <div>
                <h4 style={{ fontWeight: "bold" , padding : "10px"}}>{item.title}</h4>
                <p style={{ fontSize: "16px", color: "#555" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            background: "#f8fafc",
            borderRadius: "10px",
          }}
        >
          <p style={{ fontSize: "14px" }}>
            <strong style={{ color: "#2563eb" }}>MARKET PULSE:</strong>{" "}
            Data-driven candidates achieve 20% higher salary success.
          </p>
        </div>
      </div>

      {/* BUTTON */}
      <div className="mt-10 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleDownload}
          disabled={isDownloading}
          style={{
            background: "#0f172a",
            color: "#fff",
            padding: "15px 25px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isDownloading ? "Generating PDF..." : "Download Strategy Guide"}
        </motion.button>
      </div>
    </div>
  );
};

export default NegotiationArt;