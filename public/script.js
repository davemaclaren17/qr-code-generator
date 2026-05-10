const generateBtn = document.getElementById("generateBtn");
const qrInput = document.getElementById("qrInput");
const qrSize = document.getElementById("qrSize");
const qrResult = document.getElementById("qrResult");
const themeToggle = document.getElementById("themeToggle");

// Load saved theme preference on page load
const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "Light Mode";
}

generateBtn.addEventListener("click", async () => {
  const text = qrInput.value;
  const size = parseInt(qrSize.value, 10) || 300;

  if (!text) {
    alert("Please enter some text");
    return;
  }

  try {
    const response = await fetch("/generate", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        text,
        size,
      }),
    });

    const data = await response.json();

    qrResult.innerHTML = `
  <img src="${data.qrCode}" alt="QR Code" />

  <br><br>

  <a
    href="${data.qrCode}"
    download="qr-code.png"
  >
    <button>
      Download QR Code
    </button>
  </a>
`;
  } catch (error) {
    console.error(error);
    alert("Failed to generate QR code");
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "Dark Mode";
    localStorage.setItem("theme", "light");
  }
});
