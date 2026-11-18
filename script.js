const musicButton = document.getElementById("musicToggle");
let audioContext = null, musicTimer = null, noteIndex = 0;
const melody = [261.63,329.63,392.00,329.63,293.66,349.23,440.00,349.23,261.63,329.63,392.00,523.25,440.00,392.00,329.63,293.66];
function playNote(freq, duration=1.1){
  if(!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const now = audioContext.currentTime;
  const osc = audioContext.createOscillator(), gain = audioContext.createGain();
  osc.type = "sine"; osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.075, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(gain); gain.connect(audioContext.destination);
  osc.start(now); osc.stop(now + duration + .05);
}
function stopMusic(){
  if(musicTimer) clearInterval(musicTimer);
  musicTimer = null; musicButton.setAttribute("aria-pressed","false");
  musicButton.innerHTML = '♫ <span>Play piano</span>';
}
musicButton.addEventListener("click", async () => {
  if(musicTimer){ stopMusic(); return; }
  if(!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  await audioContext.resume();
  musicButton.setAttribute("aria-pressed","true");
  musicButton.innerHTML = '♫ <span>Pause piano</span>';
  playNote(melody[noteIndex++ % melody.length], 1.25);
  musicTimer = setInterval(() => playNote(melody[noteIndex++ % melody.length], 1.25), 650);
});

const candles = document.getElementById("candles");
for(let i=0;i<28;i++){
  const candle=document.createElement("span");
  candle.className="candle";
  candle.innerHTML='<i class="flame"></i>';
  candles.appendChild(candle);
}
document.getElementById("blowCandles").addEventListener("click",()=>{
  document.querySelectorAll(".candle").forEach((c,i)=>setTimeout(()=>c.classList.add("out"),i*35));
  document.getElementById("cakeHint").textContent="May every beautiful wish find its way to you. Ameen. ♥";
});
document.getElementById("openLetter").addEventListener("click",()=>{
  const letter=document.getElementById("letterContent");
  letter.hidden=!letter.hidden;
  document.getElementById("openLetter").textContent=letter.hidden?"OPEN YOUR LETTER ✉":"CLOSE YOUR LETTER";
});
document.querySelectorAll("video").forEach(video=>{
  video.addEventListener("error",()=>{ video.closest(".video-frame").classList.add("video-missing"); });
});
