/* =========================
   CONFIG — EDIT BAGIAN INI
   ========================= */
const CONFIG = {
  GA_MEASUREMENT_ID: "G-XXXXXXXXXX", // ganti dengan GA4 ID kamu (optional di sini)
  COUNT_NAMESPACE: "arif-apology-web", // 
  COUNT_KEYS: { index: "index-views", yeay: "yeay-views", belum: "belum-views" },
  LOG_ENDPOINT: "https://script.google.com/macros/s/PASTE_WEB_APP_URL/exec" // isi setelah deploy Apps Script
};

/* =========================
   BINTANG jatuh + sparkle
   ========================= */
(function makeStars(){
  const page = document.body.dataset.page || "index";
  const STAR_COUNT = (page === "index") ? 36 : 48; // closing makin banyak ✨
  for(let i=0;i<STAR_COUNT;i++){
    const s = document.createElement("div");
    s.className = "star";
    s.style.left = Math.random()*100 + "vw";
    s.style.animationDuration = (3 + Math.random()*6) + "s";
    s.style.animationDelay = (Math.random()*4) + "s";
    const size = (Math.random()*2 + 3);
    s.style.width = s.style.height = size + "px";
    document.body.appendChild(s);
  }
})();

/* =========================
   TOMBOL OPENING — TYPE EFFECT
   ========================= */
(function typeStartButton(){
  const btn = document.getElementById("startBtn");
  if(!btn) return;
  const full = btn.dataset.text || "klik aku 💌";
  let i = 0;
  function tick(){
    btn.textContent = full.slice(0, i++);
    if(i <= full.length) setTimeout(tick, 35);
  }
  tick();
})();

/* =========================
   PAGE VIEW COUNTER (CountAPI)
   ========================= */
async function updateViews(){
  const el = document.getElementById("views");
  if(!el) return;
  const page = document.body.dataset.page || "index";
  const key  = CONFIG.COUNT_KEYS[page] || "index-views";
  try{
    const url = https://api.countapi.xyz/hit/${encodeURIComponent(CONFIG.COUNT_NAMESPACE)}/${encodeURIComponent(key)};
    const res = await fetch(url);
    const data = await res.json();
    el.textContent = data?.value ?? "1";
  }catch{
    el.textContent = "1";
  }
}
updateViews();

/* =========================
   MUSIK + INTERAKSI
   ========================= */
const opening   = document.getElementById("opening");
const maaf      = document.getElementById("maaf");
const startBtn  = document.getElementById("startBtn");
const music     = document.getElementById("music");
const yesBtn    = document.getElementById("yesBtn");
const noBtn     = document.getElementById("noBtn");
const popup     = document.getElementById("popup");
const popupText = document.getElementById("popupText");

function showPopup(msg){
  if(!popup) return;
  popupText.textContent = msg;
  popup.style.display = "block";
}
function closePopup(){ if(popup) popup.style.display = "none"; }
window.closePopup = closePopup;

// Start → munculin halaman isi + play musik
startBtn?.addEventListener("click", ()=>{
  opening?.classList.add("hidden");
  maaf?.classList.remove("hidden");
  music?.play().catch(()=>{/* autoplay di iOS/Android perlu gesture — ini sudah gesture */});
});

// Logging ke Google Sheets (Apps Script)
// NB: Fire-and-forget (no-cors), cek hasil di Google Sheet kamu
function logChoice(choice, page){
  if(!CONFIG.LOG_ENDPOINT || CONFIG.LOG_ENDPOINT.includes("PASTE_WEB_APP_URL")) return; // belum di-set
  const body = new URLSearchParams({
    choice, page,
    ua: navigator.userAgent,
    ref: document.referrer || "",
    ts: new Date().toISOString()
  }).toString();
  fetch(CONFIG.LOG_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  }).catch(()=>{});
}

// Klik jawaban
yesBtn?.addEventListener("click", ()=>{
  alert("Arif memilih: iyaaa aku maafin 💗");
  showPopup("yey, makasih sayang ✨");
  logChoice("iya", "index");
  setTimeout(()=>{ window.location.href = "yeay.html"; }, 800);
});

noBtn?.addEventListener("click", ()=>{
  alert("Arif memilih: belummm 😢");
  showPopup("huhuhu yaudah deh aku nunggu sampe kamu mau maafin aku yah 🥺");
  logChoice("belum", "index");
  setTimeout(()=>{ window.location.href = "belum.html"; }, 1000);
});
