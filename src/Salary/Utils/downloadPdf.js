
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadMarketInsights = async (
  elementId,
  fileName = "JiViKa-Negotiation-Strategy.pdf"
) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    // ✅ STEP 1: Clone element (VERY IMPORTANT)
    const clone = element.cloneNode(true);

    // ✅ STEP 2: REMOVE SVG (BIGGEST ERROR SOURCE)
    clone.querySelectorAll("svg").forEach((el) => el.remove());

    // ✅ STEP 3: REMOVE ALL CLASSES (kills Tailwind completely)
    clone.querySelectorAll("*").forEach((el) => {
      el.className = ""; // 🔥 removes Tailwind → no oklch
    });

    // ✅ STEP 4: APPLY SAFE STYLES ONLY
    clone.querySelectorAll("*").forEach((el) => {
      el.style.color = "#000";
      el.style.backgroundColor = "#fff";
      el.style.border = "1px solid #ccc";
      el.style.boxShadow = "none";
    });

    // ✅ STEP 5: Create hidden container
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-10000px";
    container.style.left = "-10000px";
    container.style.background = "#fff";

    container.appendChild(clone);
    document.body.appendChild(container);

    // ✅ STEP 6: Generate canvas ONLY from clean DOM
    const canvas = await html2canvas(clone, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    // ✅ STEP 7: Cleanup
    document.body.removeChild(container);

    // ✅ STEP 8: Convert to PDF
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save(fileName);
  } catch (error) {
    console.error("PDF Generation Error:", error);
  }
};