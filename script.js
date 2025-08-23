/* =========================
   CONFIG 
   ========================= */
const CONFIG = {
  GA_MEASUREMENT_ID: "G-SJEB57ZZVL",
  COUNT_NAMESPACE: "arif-maafin",
  COUNT_KEYS: { index: "index-views", yeay: "yeay-views", belum: "belum-views" },
  LOG_ENDPOINT: "https://script.google.com/macros/s/AKfycbyUdLo5rHW71CsiE3GWmDVPQqo7haJwRyWDStoNyWSvRT4CkpT1J59rP6rQGFKN7ATL/exec"
};

/* =========================
   BINTANG jatuh + sparkle
   ========================= */
(function makeStars(){
  const page = document.body.dataset.page || "index";
  const STAR_COUNT = (page === "index") ? 36 : 48; 
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
  const full = btn.dataset.text || "klik aku yah 💌";
  let i = 0;
  function tick(){
    btn.textContent = full.slice(0, i++);
    if(i <= full.length) setTimeout(tick, 35);
  }
  tick();
})();

/* =========================
   CountAPI View Counter
   ========================= */
function incrementCounter(key, el) {
  const url = `https://api.countapi.xyz/hit/arif-maafin/${key}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (el) el.innerText = data.value;
    })
    .catch(() => {
      if (el) el.innerText = "error";
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("views");
  if (!el) return;
  const page = document.body.dataset.page || "index";
  const key  = CONFIG.COUNT_KEYS[page] || "index-views";
  incrementCounter(key, el);
});

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

startBtn?.addEventListener("click", ()=>{
  opening?.classList.add("hidden");
  maaf?.classList.remove("hidden");
  music?.play().catch(()=>{});
});

/* =========================
   Logging ke Google Sheets
   ========================= */
function logChoice(choice, page){    
  if(!CONFIG.LOG_ENDPOINT) return;     
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
