// ---------------- Language & Translations ----------------
let lang = "en";
const translations = {
  en: {
    title: "KrishiHub",
    loginTitle: "Login",
    loginBtn: "Login",
    regLink: "New user? Register",
    registerTitle: "Register",
    registerBtn: "Register",
    logoutBtn: "Logout",
    features: [
      {name:"Crop Recommendation",img:"https://cdn-icons-png.flaticon.com/512/2910/2910760.png"},
      {name:"Crop Calendar",img:"https://img.icons8.com/color/96/calendar.png"},
      {name:"Pesticide Suggestions",img:"https://cdn-icons-png.flaticon.com/512/2942/2942089.png"},
      {name:"Government Schemes",img:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"},
      {name:"Marketing",img:"https://img.icons8.com/color/96/shop.png"},
      {name:"Community",img:"https://img.icons8.com/color/96/group.png"},
      {name:"Weather Updates",img:"https://cdn-icons-png.flaticon.com/512/1116/1116453.png"},
      {name:"Voice Assistant",img:"https://img.icons8.com/color/96/microphone.png"},
      {name:"SMS Notifications",img:"https://img.icons8.com/color/96/sms.png"}
    ]
  },
  hi: {
    title: "कृषि हब",
    loginTitle: "लॉगिन",
    loginBtn: "लॉगिन",
    regLink: "नया उपयोगकर्ता? रजिस्टर करें",
    registerTitle: "रजिस्टर",
    registerBtn: "रजिस्टर",
    logoutBtn: "साइन आउट",
    features: [
      {name:"फसल सिफारिश",img:"https://cdn-icons-png.flaticon.com/512/2910/2910760.png"},
      {name:"फसल कैलेंडर",img:"https://img.icons8.com/color/96/calendar.png"},
      {name:"कीटनाशक सुझाव",img:"https://cdn-icons-png.flaticon.com/512/2942/2942089.png"},
      {name:"सरकारी योजनाएं",img:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"},
      {name:"मार्केटिंग",img:"https://img.icons8.com/color/96/shop.png"},
      {name:"समुदाय",img:"https://img.icons8.com/color/96/group.png"},
      {name:"मौसम अपडेट",img:"https://cdn-icons-png.flaticon.com/512/1116/1116453.png"},
      {name:"वॉइस असिस्टेंट",img:"https://img.icons8.com/color/96/microphone.png"},
      {name:"एसएमएस नोटिफिकेशन",img:"https://img.icons8.com/color/96/sms.png"}
    ]
  }
};

// ---------------- Language Toggle ----------------
function toggleLang() {
  lang = lang === "en" ? "hi" : "en";
  document.querySelector(".lang-switch").innerText = lang === "en" ? "हिंदी" : "English";
  document.getElementById("title").innerText = translations[lang].title;
  document.getElementById("loginTitle").innerText = translations[lang].loginTitle;
  document.getElementById("loginBtn").innerText = translations[lang].loginBtn;
  document.getElementById("regLink").innerText = translations[lang].regLink;
  document.getElementById("registerTitle").innerText = translations[lang].registerTitle;
  document.getElementById("registerBtn").innerText = translations[lang].registerBtn;
  document.getElementById("logoutBtn").innerText = translations[lang].logoutBtn;
  buildDashboard();
}

// ---------------- Login/Register ----------------
function showRegister() {
  document.getElementById("loginPage").classList.remove("active");
  document.getElementById("registerPage").classList.add("active");
}
function showLogin() {
  document.getElementById("registerPage").classList.remove("active");
  document.getElementById("loginPage").classList.add("active");
}
function register() {
  const user = document.getElementById("regUser").value.trim();
  const pass = document.getElementById("regPass").value.trim();
  const mobile = document.getElementById("regMobile").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  if (!/^\d{10}$/.test(mobile)) { alert(lang==="en"?"Mobile must be 10 digits":"मोबाइल नंबर 10 अंक का होना चाहिए"); return; }
  if (!/^\S+@\S+\.\S+$/.test(email)) { alert(lang==="en"?"Invalid email":"ईमेल गलत है"); return; }
  localStorage.setItem("user", user);
  localStorage.setItem("pass", pass);
  alert(lang==="en"?"Registered!":"रजिस्टर हो गया!");
  showLogin();
}
function login() {
  const u = document.getElementById("loginUser").value;
  const p = document.getElementById("loginPass").value;
  if (u === localStorage.getItem("user") && p === localStorage.getItem("pass")) {
    document.getElementById("loginPage").classList.remove("active");
    document.getElementById("dashboard").classList.add("active");
    buildDashboard();
  } else alert(lang==="en"?"Invalid credentials":"गलत विवरण");
}
function logout() {
  document.getElementById("dashboard").classList.remove("active");
  document.getElementById("loginPage").classList.add("active");
}

// ---------------- Dashboard ----------------
function buildDashboard() {
  const grid = document.getElementById("featureGrid");
  grid.innerHTML = "";
  translations[lang].features.forEach((f,i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<img src="${f.img}" alt="${f.name}"><p>${f.name}</p>`;
    div.onclick = () => loadFeature(i);
    grid.appendChild(div);
  });
  document.getElementById("featureContent").innerHTML = "";
}

// ---------------- Feature Loader ----------------
function loadFeature(i) {
  switch(i) {
    case 0: loadCropRecommendation(); break;
    case 1: loadCropCalendar(); break;
    case 2: loadPesticide(); break;
    case 3: loadSchemes(); break;
    case 4: loadMarketing(); break;
    case 5: loadCommunity(); break;
    case 6: loadWeather(); break;
    case 7: loadVoice(); break;
    case 8: loadSMS(); break;
  }
}

// ---------------- Feature 1: Crop Recommendation ----------------
function loadCropRecommendation() {
  const fc = document.getElementById("featureContent");
  const t = translations[lang].features[0].name;
  fc.innerHTML = `
    <div class="card-content">
      <h3>${t}</h3>
      <select id="soilType">
        <option value="">${lang==="en"?"Select Soil":"मृदा चुनें"}</option>
        <option>Loamy</option>
        <option>Sandy</option>
        <option>Clay</option>
      </select>
      <input id="villageName" placeholder="${lang==="en"?"Enter Village":"गांव दर्ज करें"}">
      <select id="season">
        <option value="">${lang==="en"?"Select Season":"मौसम चुनें"}</option>
        <option>Winter</option>
        <option>Summer</option>
        <option>Rainy</option>
      </select>
      <button onclick="recommendCrop()">${lang==="en"?"Recommend":"सिफारिश करें"}</button>
      <p id="cropResult"></p>
    </div>
  `;
}
function recommendCrop() {
  const soil = document.getElementById("soilType").value;
  const village = document.getElementById("villageName").value;
  const season = document.getElementById("season").value;
  const rec = {"Loamy":"Wheat, Rice","Sandy":"Groundnut, Watermelon","Clay":"Paddy, Sugarcane"};
  document.getElementById("cropResult").innerText =
    (soil && village && season) ? 
    (lang==="en"?`In ${village}, ${season}: ${rec[soil]||"No data"}`:`${village} में ${season} में: ${rec[soil]||"कोई डेटा नहीं"}`) 
    : (lang==="en"?"Fill all fields":"सभी फ़ील्ड भरें");
}

// ---------------- Feature 2: Crop Calendar ----------------
function loadCropCalendar() {
  const fc = document.getElementById("featureContent");
  fc.innerHTML = `
    <div class="card-content">
      <h3>${translations[lang].features[1].name}</h3>
      <input type="date" id="calendarDate">
      <input type="text" id="calendarNote" placeholder="${lang==="en"?"Enter note":"नोट दर्ज करें"}">
      <button onclick="addReminder()">${lang==="en"?"Add Reminder":"रिमाइंडर जोड़ें"}</button>
      <div id="calendarList"></div>
    </div>
  `;
  displayReminders();
}
function addReminder() {
  const date = document.getElementById("calendarDate").value;
  const note = document.getElementById("calendarNote").value.trim();
  if(!date || !note) { alert(lang==="en"?"Select date & note":"तिथि और नोट चुनें"); return; }
  let reminders = JSON.parse(localStorage.getItem("reminders") || "[]");
  reminders.push({date,note});
  localStorage.setItem("reminders", JSON.stringify(reminders));
  displayReminders();
  document.getElementById("calendarDate").value="";
  document.getElementById("calendarNote").value="";
}
function displayReminders() {
  const list = document.getElementById("calendarList");
  list.innerHTML = "";
  const reminders = JSON.parse(localStorage.getItem("reminders")||"[]");
  reminders.forEach(r => {
    const div = document.createElement("div");
    div.className = "reminder-item";
    div.innerHTML = `<span>📅 ${r.date} - ${r.note}</span> <button onclick="removeReminder('${r.date}','${r.note}')">❌</button>`;
    list.appendChild(div);
  });
}
function removeReminder(date,note) {
  let reminders = JSON.parse(localStorage.getItem("reminders")||"[]");
  reminders = reminders.filter(r => !(r.date===date && r.note===note));
  localStorage.setItem("reminders", JSON.stringify(reminders));
  displayReminders();
}

// ---------------- Feature 3: Pesticide Suggestions ----------------
function loadPesticide(){
  const fc=document.getElementById("featureContent");
  fc.innerHTML=`<div class="card-content">
    <h3>${translations[lang].features[2].name}</h3>
    <select id="cropType"><option value="">${lang==="en"?"Select Crop":"फसल चुनें"}</option><option>Wheat</option><option>Rice</option><option>Groundnut</option></select>
    <select id="disease"><option value="">${lang==="en"?"Select Disease":"रोग चुनें"}</option><option>Rust</option><option>Blight</option><option>Pest Attack</option></select>
    <button onclick="getPesticide()">${lang==="en"?"Get Suggestions":"सुझाव प्राप्त करें"}</button>
    <p id="pesticideResult"></p>
  </div>`;
}
function getPesticide(){
  const crop=document.getElementById("cropType").value;
  const disease=document.getElementById("disease").value;
  let suggestions={"Wheat":{"Rust":"Fungicide A","Blight":"Fungicide B"},"Rice":{"Blight":"Fungicide C"},"Groundnut":{"Pest Attack":"Pesticide X"}};
  const res=(suggestions[crop] && suggestions[crop][disease])?suggestions[crop][disease]:(lang==="en"?"No suggestion":"कोई सुझाव नहीं");
  document.getElementById("pesticideResult").innerText=res;
}

// ---------------- Feature 4: Government Schemes ----------------
function loadSchemes(){
  const fc=document.getElementById("featureContent");
  let schemes=[
    {name: lang==="en"?"PM-Kisan":"पीएम-किसान",desc: lang==="en"?"Income support for farmers":"किसानों के लिए आय सहायता",link:"https://pmkisan.gov.in"},
    {name: lang==="en"?"Soil Health Card":"मृदा स्वास्थ्य कार्ड",desc: lang==="en"?"Soil testing & recommendations":"मृदा परीक्षण और सिफारिशें",link:"https://soilhealth.dac.gov.in"}
  ];
  let html="<ul>";
  schemes.forEach(s=> html+=`<li><b>${s.name}</b>: ${s.desc} - <a href="${s.link}" target="_blank">Link</a></li>`);
  html+="</ul>";
  fc.innerHTML=`<div class="card-content"><h3>${translations[lang].features[3].name}</h3>${html}</div>`;
}

// ---------------- Feature 5: Marketing ----------------
function loadMarketing(){
  const fc=document.getElementById("featureContent");
  fc.innerHTML=`<div class="card-content">
    <h3>${translations[lang].features[4].name}</h3>
    <select id="marketType"><option value="">${lang==="en"?"Buy/Sell":"खरीद/बेच"}</option><option>Buy</option><option>Sell</option></select>
    <input id="marketCrop" placeholder="${lang==="en"?"Crop Name":"फसल का नाम"}">
    <input id="marketQty" placeholder="${lang==="en"?"Quantity":"मात्रा"}">
    <button onclick="addMarket()">${lang==="en"?"Submit":"जमा करें"}</button>
    <div id="marketList"></div>
  </div>`;
  displayMarket();
}
function addMarket(){
  const type=document.getElementById("marketType").value;
  const crop=document.getElementById("marketCrop").value;
  const qty=document.getElementById("marketQty").value;
  if(type && crop && qty){
    let list=JSON.parse(localStorage.getItem("market")||"[]");
    list.push({type,crop,qty});
    localStorage.setItem("market", JSON.stringify(list));
    displayMarket();
    document.getElementById("marketType").value="";
    document.getElementById("marketCrop").value="";
    document.getElementById("marketQty").value="";
  }
}
function displayMarket(){
  const listDiv=document.getElementById("marketList");
  listDiv.innerHTML="";
  const list=JSON.parse(localStorage.getItem("market")||"[]");
  list.forEach(m=>{
    const div=document.createElement("div");
    div.innerText=`${m.type}: ${m.crop} - ${m.qty}`;
    listDiv.appendChild(div);
  });
}

// ---------------- Feature 6: Community Chat ----------------
function loadCommunity(){
  const fc=document.getElementById("featureContent");
  fc.innerHTML=`<div class="card-content">
    <h3>${translations[lang].features[5].name}</h3>
    <div id="chatBox" style="border:1px solid #ccc; height:200px; overflow-y:auto; padding:5px; margin-bottom:10px;"></div>
    <input id="chatInput" placeholder="${lang==="en"?"Type message":"संदेश लिखें"}" style="width:80%; display:inline-block;">
    <button onclick="sendChat()">${lang==="en"?"Send":"भेजें"}</button>
  </div>`;
}
function sendChat(){
  const input=document.getElementById("chatInput");
  if(!input.value.trim()) return;
  const chatBox=document.getElementById("chatBox");
  let p=document.createElement("p"); p.innerHTML=`<b>You:</b> ${input.value}`; chatBox.appendChild(p);
  chatBox.scrollTop=chatBox.scrollHeight;
  setTimeout(()=>{
    let bp=document.createElement("p"); bp.innerHTML=`<b>Bot:</b> ${lang==="en"?"Thanks for your message!":"आपके संदेश के लिए धन्यवाद!"}`;
    chatBox.appendChild(bp); chatBox.scrollTop=chatBox.scrollHeight;
  },500);
  input.value="";
}

// ---------------- Feature 7: Weather Updates ----------------
function loadWeather(){
  const fc=document.getElementById("featureContent");
  fc.innerHTML=`<div class="card-content">
    <h3>${translations[lang].features[6].name}</h3>
    <input id="cityName" placeholder="${lang==="en"?"Enter City":"शहर दर्ज करें"}">
    <button onclick="getWeather()">${lang==="en"?"Get Weather":"मौसम प्राप्त करें"}</button>
    <p id="weather"></p>
  </div>`;
}
async function getWeather(){
  const city=document.getElementById("cityName").value.trim();
  if(!city){ alert(lang==="en"?"Enter city":"शहर दर्ज करें"); return; }
  const apiKey="d50c4eebb320b0546da85db12ef3d091";
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${lang}`;
  try{
    const proxy=`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const res=await fetch(proxy);
    const data=JSON.parse(JSON.parse(await res.text()).contents);
    if(data.cod===200){
      const icon=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("weather").innerHTML=`<img src="${icon}" style="width:50px;height:50px;"> ${data.name}: ${data.weather[0].description}, ${data.main.temp}°C, Humidity: ${data.main.humidity}%`;
    } else document.getElementById("weather").innerText=lang==="en"?"City not found":"शहर नहीं मिला";
  } catch(err){ console.log(err); document.getElementById("weather").innerText=lang==="en"?"Error fetching weather":"मौसम लाने में त्रुटि"; }
}

// ---------------- Feature 8: Voice Assistant ----------------
function loadVoice(){
  const fc=document.getElementById("featureContent");
  fc.innerHTML=`<div class="card-content">
    <h3>${translations[lang].features[7].name}</h3>
    <input id="voiceMsg" placeholder="${lang==="en"?"Enter message":"संदेश लिखें"}">
    <button onclick="speakVoice()">${lang==="en"?"Speak":"बोलें"}</button>
  </div>`;
}
function speakVoice(){
  const msg=document.getElementById("voiceMsg").value;
  if(!msg) return;
  const utter=new SpeechSynthesisUtterance(msg);
  speechSynthesis.speak(utter);
}

// ---------------- Feature 9: SMS Notifications ----------------
function loadSMS(){
  const fc=document.getElementById("featureContent");
  fc.innerHTML=`<div class="card-content">
    <h3>${translations[lang].features[8].name}</h3>
    <p>${lang==="en"?"Your reminders:":"आपके रिमाइंडर:"}</p>
    <ul id="smsList" style="list-style:none;padding-left:0;"></ul>
  </div>`;
  displaySMSReminders();
}
function displaySMSReminders(){
  const smsList=document.getElementById("smsList");
  smsList.innerHTML="";
  const reminders=JSON.parse(localStorage.getItem("reminders")||"[]");
  reminders.forEach((r,i)=>{
    const li=document.createElement("li");
    li.style.background="#e0f7fa"; li.style.padding="8px 12px"; li.style.borderRadius="8px"; li.style.marginBottom="6px";
    li.innerText = lang==="en"?`📅 ${r.date} - ${r.note}`:`📅 ${r.date} - ${r.note}`;
    smsList.appendChild(li);
  });
}

// ---------------- Init ----------------
document.addEventListener("DOMContentLoaded",()=>{ buildDashboard(); });
