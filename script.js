const $=id=>document.getElementById(id);
$("startBtn").addEventListener("click",()=>$("celebrate").scrollIntoView({behavior:"smooth"}));
$("hugBtn").addEventListener("click",()=>$("hug").classList.toggle("hidden"));
$("letterBtn").addEventListener("click",()=>$("letter").classList.toggle("hidden"));
$("blowBtn").addEventListener("click",()=>{$("candles").textContent="✨  ✨  ✨";$("candleMsg").textContent="Wish made! May Allah make this year beautiful for you. Ameen. 🤍";});
document.querySelectorAll(".activities button").forEach(btn=>btn.addEventListener("click",()=>{$("activityMsg").textContent=btn.dataset.msg;}));