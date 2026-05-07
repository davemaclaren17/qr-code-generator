import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allows Express to read JSON data
app.use(express.json());

// Makes the public folder available in browser
app.use(express.static(path.join(__dirname, "../public")));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
