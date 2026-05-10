const generateBtn = document.getElementById("generateBtn");
const qrInput = document.getElementById("qrInput");
const qrResult = document.getElementById("qrResult");
const themeToggle = document.getElementById("themeToggle");

generateBtn.addEventListener("click", async () => {

  const text = qrInput.value;

  if (!text) {
    alert("Please enter some text");
    return;
  }

  try {

    const response = await fetch("/generate", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        text
      })
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
  } else {
    themeToggle.textContent = "Dark Mode";
  }

});