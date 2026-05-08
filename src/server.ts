import express from "express";
import path from "path";
import * as QRCode from "qrcode";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allows Express to read JSON data
app.use(express.json());

// Makes the public folder available in browser
app.use(express.static(path.join(__dirname, "../public")));

app.post("/generate", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "Text is required"
      });
    }

    // Generate QR code as Data URL
    const qrCode = await QRCode.toDataURL(text);

    res.json({
      qrCode
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate QR code"
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
