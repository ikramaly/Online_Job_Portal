

import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

// 🔥 Important: set worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const parsePdf = async (file) => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = async function () {
      try {
        const typedArray = new Uint8Array(this.result);

        const pdf = await pdfjsLib.getDocument({
          data: typedArray,
        }).promise;

        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();

          const strings = content.items.map(item => item.str);
          text += strings.join(" ");
        }

        resolve(text.toLowerCase());
      } catch (err) {
        console.error("PDF Parse Error:", err);
        reject(err);
      }
    };

    fileReader.readAsArrayBuffer(file);
  });
};