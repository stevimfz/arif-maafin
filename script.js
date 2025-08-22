// script.js

// Hit counter (pakai localStorage → cuma keliatan di HP/Laptop masing-masing)
let visits = localStorage.getItem('visitCount') || 0;
visits++;
localStorage.setItem('visitCount', visits);
document.getElementById("visitCount").textContent = visits;

// Aksi tombol
document.getElementById("yesBtn").onclick = function() {
  window.location.href = "yes.html"; // bikin file yes.html
};

document.getElementById("noBtn").onclick = function() {
  window.location.href = "no.html"; // bikin file no.html
};

