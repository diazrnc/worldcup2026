import { useState, useEffect, useCallback } from "react";

// ── DATA ────────────────────────────────────────────────────────────────────
const GROUPS = {
  A: ["Mexico","South Africa","South Korea","Czech Republic"],
  B: ["Canada","Bosnia-Herzegovina","Qatar","Switzerland"],
  C: ["Brazil","Morroco","Haiti","Scotland"],
  D: ["United States","Paraguay","Australia","Turkey"],
  E: ["Germany","Curaçao","Ivory Coast","Ecuador"],
  F: ["Neatherland","Japan","Swiden","Tunisia"],
  G: ["Bwlgium","Egypt","Iran","New Zealand"],
  H: ["Spain","Cape Verde","Daudi Arabia","Uruguay"],
  I: ["France","Senegal","Iraq","Norway"],
  J: ["Argentina","Algeria","Austria","Jordan"],
  K: ["Portugal","DR Congo","Uzbekistan","Colombia"],
  L: ["England","Croatia","Ghana","Panama"],
};

// Actual 2026 groups with match schedules
const REAL_GROUPS = {

  A: { name:"A", teams:[
      {f:"🇲🇽",n:"Mexico"},{f:"🇿🇦",n:"South Africa"},{f:"🇰🇷",n:"South Korea"},{f:"🇨🇿",n:"Czechia"}],
    matches:[
      {date:"Jun 11 | 15:00",teams:"Mexico vs South Africa",city:"Mexico City 🇲🇽"},
      {date:"Jun 11 | 22:00",teams:"South Korea vs Czechia",city:"Guadalajara 🇲🇽"},
      {date:"Jun 18 | 12:00",teams:"Czechia vs South Africa",city:"Atlanta 🇺🇸"},
      {date:"Jun 18 | 21:00",teams:"Mexico vs South Korea",city:"Guadalajara 🇲🇽"},
      {date:"Jun 24 | 21:00",teams:"Mexico vs Czechia",city:"Mexico City 🇲🇽"},
      {date:"Jun 24 | 21:00",teams:"South Africa vs South Korea",city:"Monterrey 🇲🇽"},
    ]},

  B: { name:"B", teams:[
      {f:"🇨🇦",n:"Canada"},{f:"🇧🇦",n:"Bosnia and Herzegovina"},{f:"🇶🇦",n:"Qatar"},{f:"🇨🇭",n:"Switzerland"}],
    matches:[
      {date:"Jun 12 | 15:00",teams:"Canada vs Bosnia and Herzegovina",city:"Toronto 🇨🇦"},
      {date:"Jun 13 | 15:00",teams:"Qatar vs Switzerland",city:"San Francisco 🇺🇸"},
      {date:"Jun 18 | 18:00",teams:"Canada vs Qatar",city:"Vancouver 🇨🇦"},
      {date:"Jun 18 | 15:00",teams:"Switzerland vs Bosnia and Herzegovina",city:"Los Angeles 🇺🇸"},
      {date:"Jun 24 | 15:00",teams:"Canada vs Switzerland",city:"Vancouver 🇨🇦"},
      {date:"Jun 24 | 15:00",teams:"Bosnia and Herzegovina vs Qatar",city:"Seattle 🇺🇸"},
    ]},

  C: { name:"C", teams:[
      {f:"🇧🇷",n:"Brazil"},{f:"🇲🇦",n:"Morocco"},{f:"🇭🇹",n:"Haiti"},{f:"🏴",n:"Scotland"}],
    matches:[
      {date:"Jun 13 | 18:00",teams:"Brazil vs Morocco",city:"New York/NJ 🇺🇸"},
      {date:"Jun 13 | 21:00",teams:"Haiti vs Scotland",city:"Boston 🇺🇸"},
      {date:"Jun 19 | 18:00",teams:"Scotland vs Morocco",city:"Boston 🇺🇸"},
      {date:"Jun 19 | 21:00",teams:"Brazil vs Haiti",city:"Philadelphia 🇺🇸"},
      {date:"Jun 24 | 18:00",teams:"Scotland vs Brazil",city:"Miami 🇺🇸"},
      {date:"Jun 24 | 18:00",teams:"Morocco vs Haiti",city:"Atlanta 🇺🇸"},
    ]},

  D: { name:"D", teams:[
      {f:"🇺🇸",n:"USA"},{f:"🇵🇾",n:"Paraguay"},{f:"🇦🇺",n:"Australia"},{f:"🇹🇷",n:"Turkey"}],
    matches:[
      {date:"Jun 12 | 21:00",teams:"USA vs Paraguay",city:"Los Angeles 🇺🇸"},
      {date:"Jun 14 | 00:00",teams:"Australia vs Turkey",city:"Vancouver 🇨🇦"},
      {date:"Jun 19 | 15:00",teams:"USA vs Australia",city:"Seattle 🇺🇸"},
      {date:"Jun 20 | 00:00",teams:"Turkey vs Paraguay",city:"San Francisco 🇺🇸"},
      {date:"Jun 25 | 22:00",teams:"Turkey vs USA",city:"Los Angeles 🇺🇸"},
      {date:"Jun 25 | 22:00",teams:"Paraguay vs Australia",city:"San Francisco 🇺🇸"},
    ]},

  E: { name:"E", teams:[
      {f:"🇩🇪",n:"Germany"},{f:"🇨🇼",n:"Curaçao"},{f:"🇨🇮",n:"Ivory Coast"},{f:"🇪🇨",n:"Ecuador"}],
    matches:[
      {date:"Jun 14 | 13:00",teams:"Germany vs Curaçao",city:"Houston 🇺🇸"},
      {date:"Jun 14 | 19:00",teams:"Ivory Coast vs Ecuador",city:"Philadelphia 🇺🇸"},
      {date:"Jun 20 | 16:00",teams:"Germany vs Ivory Coast",city:"Toronto 🇨🇦"},
      {date:"Jun 20 | 22:00",teams:"Ecuador vs Curaçao",city:"Kansas City 🇺🇸"},
      {date:"Jun 25 | 16:00",teams:"Curaçao vs Ivory Coast",city:"Philadelphia 🇺🇸"},
      {date:"Jun 25 | 16:00",teams:"Ecuador vs Germany",city:"New York/NJ 🇺🇸"},
    ]},

  F: { name:"F", teams:[
      {f:"🇳🇱",n:"Netherlands"},{f:"🇯🇵",n:"Japan"},{f:"🇸🇪",n:"Sweden"},{f:"🇹🇳",n:"Tunisia"}],
    matches:[
      {date:"Jun 14 | 16:00",teams:"Netherlands vs Japan",city:"Dallas 🇺🇸"},
      {date:"Jun 14 | 22:00",teams:"Sweden vs Tunisia",city:"Monterrey 🇲🇽"},
      {date:"Jun 20 | 13:00",teams:"Netherlands vs Sweden",city:"Houston 🇺🇸"},
      {date:"Jun 21 | 00:00",teams:"Tunisia vs Japan",city:"Monterrey 🇲🇽"},
      {date:"Jun 25 | 19:00",teams:"Japan vs Sweden",city:"Dallas 🇺🇸"},
      {date:"Jun 25 | 19:00",teams:"Tunisia vs Netherlands",city:"Kansas City 🇺🇸"},
    ]},

  G: { name:"G", teams:[
      {f:"🇧🇪",n:"Belgium"},{f:"🇪🇬",n:"Egypt"},{f:"🇮🇷",n:"Iran"},{f:"🇳🇿",n:"New Zealand"}],
    matches:[
      {date:"Jun 15 | 15:00",teams:"Belgium vs Egypt",city:"Seattle 🇺🇸"},
      {date:"Jun 15 | 21:00",teams:"Iran vs New Zealand",city:"Los Angeles 🇺🇸"},
      {date:"Jun 21 | 15:00",teams:"Belgium vs Iran",city:"Los Angeles 🇺🇸"},
      {date:"Jun 21 | 21:00",teams:"New Zealand vs Egypt",city:"Vancouver 🇨🇦"},
      {date:"Jun 26 | 23:00",teams:"Egypt vs Iran",city:"Seattle 🇺🇸"},
      {date:"Jun 26 | 23:00",teams:"New Zealand vs Belgium",city:"Vancouver 🇨🇦"},
    ]},

  H: { name:"H", teams:[
      {f:"🇪🇸",n:"Spain"},{f:"🇨🇻",n:"Cape Verde"},{f:"🇸🇦",n:"Saudi Arabia"},{f:"🇺🇾",n:"Uruguay"}],
    matches:[
      {date:"Jun 15 | 12:00",teams:"Spain vs Cape Verde",city:"Atlanta 🇺🇸"},
      {date:"Jun 15 | 18:00",teams:"Saudi Arabia vs Uruguay",city:"Miami 🇺🇸"},
      {date:"Jun 21 | 12:00",teams:"Spain vs Saudi Arabia",city:"Atlanta 🇺🇸"},
      {date:"Jun 21 | 15:00",teams:"Uruguay vs Cape Verde",city:"Miami 🇺🇸"},
      {date:"Jun 26 | 20:00",teams:"Cape Verde vs Saudi Arabia",city:"Houston 🇺🇸"},
      {date:"Jun 26 | 20:00",teams:"Uruguay vs Spain",city:"Guadalajara 🇲🇽"},
    ]},

  I: { name:"I", teams:[
      {f:"🇫🇷",n:"France"},{f:"🇸🇳",n:"Senegal"},{f:"🇮🇶",n:"Iraq"},{f:"🇳🇴",n:"Norway"}],
    matches:[
      {date:"Jun 16 | 15:00",teams:"France vs Senegal",city:"New York/NJ 🇺🇸"},
      {date:"Jun 16 | 18:00",teams:"Iraq vs Norway",city:"Boston 🇺🇸"},
      {date:"Jun 22 | 17:00",teams:"France vs Iraq",city:"Philadelphia 🇺🇸"},
      {date:"Jun 22 | 20:00",teams:"Norway vs Senegal",city:"New York/NJ 🇺🇸"},
      {date:"Jun 26 | 15:00",teams:"Norway vs France",city:"Boston 🇺🇸"},
      {date:"Jun 26 | 15:00",teams:"Senegal vs Iraq",city:"Toronto 🇨🇦"},
    ]},

  J: { name:"J", teams:[
      {f:"🇦🇷",n:"Argentina"},{f:"🇩🇿",n:"Algeria"},{f:"🇦🇹",n:"Austria"},{f:"🇯🇴",n:"Jordan"}],
    matches:[
      {date:"Jun 16 | 21:00",teams:"Argentina vs Algeria",city:"Kansas City 🇺🇸"},
      {date:"Jun 17 | 00:00",teams:"Austria vs Jordan",city:"San Francisco 🇺🇸"},
      {date:"Jun 22 | 13:00",teams:"Argentina vs Austria",city:"Dallas 🇺🇸"},
      {date:"Jun 22 | 23:00",teams:"Jordan vs Algeria",city:"San Francisco 🇺🇸"},
      {date:"Jun 27 | 22:00",teams:"Algeria vs Austria",city:"Kansas City 🇺🇸"},
      {date:"Jun 27 | 22:00",teams:"Jordan vs Argentina",city:"Dallas 🇺🇸"},
    ]},

  K: { name:"K", teams:[
      {f:"🇵🇹",n:"Portugal"},{f:"🇨🇩",n:"DR Congo"},{f:"🇺🇿",n:"Uzbekistan"},{f:"🇨🇴",n:"Colombia"}],
    matches:[
      {date:"Jun 17 | 13:00",teams:"Portugal vs DR Congo",city:"Houston 🇺🇸"},
      {date:"Jun 17 | 22:00",teams:"Uzbekistan vs Colombia",city:"Mexico City 🇲🇽"},
      {date:"Jun 23 | 13:00",teams:"Portugal vs Uzbekistan",city:"Houston 🇺🇸"},
      {date:"Jun 23 | 22:00",teams:"Colombia vs DR Congo",city:"Guadalajara 🇲🇽"},
      {date:"Jun 27 | 19:30",teams:"Colombia vs Portugal",city:"Miami 🇺🇸"},
      {date:"Jun 27 | 19:30",teams:"DR Congo vs Uzbekistan",city:"Atlanta 🇺🇸"},
    ]},

  L: { name:"L", teams:[
      {f:"🏴",n:"England"},{f:"🇭🇷",n:"Croatia"},{f:"🇬🇭",n:"Ghana"},{f:"🇵🇦",n:"Panama"}],
    matches:[
      {date:"Jun 17 | 16:00",teams:"England vs Croatia",city:"Dallas 🇺🇸"},
      {date:"Jun 17 | 19:00",teams:"Ghana vs Panama",city:"Toronto 🇨🇦"},
      {date:"Jun 23 | 16:00",teams:"England vs Ghana",city:"Boston 🇺🇸"},
      {date:"Jun 23 | 19:00",teams:"Panama vs Croatia",city:"Toronto 🇨🇦"},
      {date:"Jun 27 | 17:00",teams:"Panama vs England",city:"New York/NJ 🇺🇸"},
      {date:"Jun 27 | 17:00",teams:"Croatia vs Ghana",city:"Philadelphia 🇺🇸"},
    ]},
};


const ROUNDS = ["Round of 32","Round of 16","Quarter-Finals","Semi-Finals","Final"];

// Knockout round schedules: date + city for each slot
const KNOCKOUT_SCHEDULE = {

  r32: [
    {date:"Jun 28", city:"Los Angeles 🇺🇸"},

    {date:"Jun 29", city:"Boston 🇺🇸"},
    {date:"Jun 29", city:"Monterrey 🇲🇽"},
    {date:"Jun 29", city:"Houston 🇺🇸"},

    {date:"Jun 30", city:"New York/NJ 🇺🇸"},
    {date:"Jun 30", city:"Dallas 🇺🇸"},
    {date:"Jun 30", city:"Mexico City 🇲🇽"},

    {date:"Jul 1", city:"Atlanta 🇺🇸"},
    {date:"Jul 1", city:"San Francisco 🇺🇸"},
    {date:"Jul 1", city:"Seattle 🇺🇸"},

    {date:"Jul 2", city:"Toronto 🇨🇦"},
    {date:"Jul 2", city:"Los Angeles 🇺🇸"},
    {date:"Jul 2", city:"Vancouver 🇨🇦"},

    {date:"Jul 3", city:"Miami 🇺🇸"},
    {date:"Jul 3", city:"Kansas City 🇺🇸"},
    {date:"Jul 3", city:"Dallas 🇺🇸"},
  ],

  r16: [
    {date:"Jul 4", city:"Philadelphia 🇺🇸"},
    {date:"Jul 4", city:"Houston 🇺🇸"},

    {date:"Jul 5", city:"New York/NJ 🇺🇸"},
    {date:"Jul 5", city:"Mexico City 🇲🇽"},

    {date:"Jul 6", city:"Dallas 🇺🇸"},
    {date:"Jul 6", city:"Seattle 🇺🇸"},

    {date:"Jul 7", city:"Atlanta 🇺🇸"},
    {date:"Jul 7", city:"Vancouver 🇨🇦"},
  ],

  qf: [
    {date:"Jul 9", city:"Boston 🇺🇸"},
    {date:"Jul 10", city:"Los Angeles 🇺🇸"},
    {date:"Jul 11", city:"Miami 🇺🇸"},
    {date:"Jul 11", city:"Kansas City 🇺🇸"},
  ],

  sf: [
    {date:"Jul 14", city:"Dallas 🇺🇸"},
    {date:"Jul 15", city:"Atlanta 🇺🇸"},
  ],

  final: {date:"Jul 19", city:"New York/NJ 🇺🇸 🏆"},
};


function emptyBracket() {
  const groups = {};
  Object.keys(REAL_GROUPS).forEach(k => { groups[k] = [null, null]; });
  return {
    name: "",
    champion: null,
    groups,
    thirdPicks: [], // 8 best 3rd-place teams chosen by user
    knockout: {
      r32: Array(16).fill(null),
      r16: Array(8).fill(null),
      qf: Array(4).fill(null),
      sf: Array(2).fill(null),
      final: null,
    }
  };
}

function calcScore(bracket, results) {
  // results has same shape as bracket
  if (!results) return 0;
  let score = 0;
  // group picks: 2pt per correct 1st/2nd
  Object.keys(bracket.groups).forEach(g => {
    [0,1].forEach(i => {
      if (bracket.groups[g][i] && results.groups[g][i] &&
          bracket.groups[g][i] === results.groups[g][i]) score += 2;
    });
  });
  // 3rd place picks: 1pt each correct
  if (bracket.thirdPicks && results.thirdPicks) {
    bracket.thirdPicks.forEach(t => {
      if (results.thirdPicks.includes(t)) score += 1;
    });
  }
  // knockout: 2/4/6/8/12 pts
  const pts = { r32:2, r16:4, qf:6, sf:8, final:12 };
  Object.keys(pts).forEach(round => {
    const arr = Array.isArray(bracket.knockout[round])
      ? bracket.knockout[round]
      : [bracket.knockout[round]];
    const rarr = Array.isArray(results.knockout[round])
      ? results.knockout[round]
      : [results.knockout[round]];
    arr.forEach((t, i) => {
      if (t && rarr[i] && t === rarr[i]) score += pts[round];
    });
  });
  return score;
}

// ── STORAGE HELPERS (room-scoped) ────────────────────────────────────────────
function roomKey(code) { return `wc2026_room_${code.toUpperCase()}`; }
function saveRoom(code, data) {
  try { localStorage.setItem(roomKey(code), JSON.stringify(data)); } catch(e){}
}
function loadRoom(code) {
  try {
    const s = localStorage.getItem(roomKey(code));
    if (s) return JSON.parse(s);
  } catch(e){}
  return null;
}
function emptyRoom(code) {
  return { code: code.toUpperCase(), brackets: [], adminCode: Math.random().toString(36).slice(2,8).toUpperCase(), results: null };
}

// ── COMPONENTS ───────────────────────────────────────────────────────────────

function TeamBtn({ team, selected, onClick, size="md" }) {
  const sz = size === "sm" ? "text-xs px-2 py-1" : "text-sm px-3 py-2";
  return (
    <button
      onClick={onClick}
      className={`rounded-xl font-bold border-2 transition-all duration-200 flex items-center gap-1 ${sz}
        ${selected
          ? "border-yellow-400 bg-yellow-400 text-gray-900 shadow-lg scale-105"
          : "border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-white/40"
        }`}
    >
      <span>{team.f}</span>
      <span className="hidden sm:inline">{team.n}</span>
      <span className="sm:hidden">{team.n.slice(0,3)}</span>
    </button>
  );
}

function GroupCard({ groupKey, group, picks, onChange }) {
  const [showSchedule, setShowSchedule] = useState(false);
  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="bg-yellow-400 text-gray-900 font-black text-lg w-8 h-8 rounded-full flex items-center justify-center">
            {groupKey}
          </span>
          <span className="text-white/60 text-sm">Pick 1st & 2nd place</span>
        </div>
        <button onClick={() => setShowSchedule(s => !s)}
          className="text-xs text-blue-300 border border-blue-400/30 rounded-lg px-2 py-1 hover:bg-blue-400/10 transition-all">
          {showSchedule ? "Hide" : "📅 Matches"}
        </button>
      </div>

      {showSchedule && group.matches && (
        <div className="mb-3 space-y-1 bg-black/20 rounded-xl p-3">
          {group.matches.map((m, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className="text-yellow-400 font-bold w-12 shrink-0">{m.date}</span>
              <span className="text-white flex-1">{m.teams}</span>
              <span className="text-white/40 shrink-0">{m.city}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 mb-3">
        {group.teams.map(t => (
          <button
            key={t.n}
            onClick={() => {
              let [p1, p2] = [...(picks||[null,null])];
              if (p1 === t.n) { onChange([null, p2]); }
              else if (p2 === t.n) { onChange([p1, null]); }
              else if (!p1) { onChange([t.n, p2]); }
              else if (!p2) { onChange([p1, t.n]); }
              else { onChange([t.n, p2]); }
            }}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 border-2 transition-all font-semibold text-sm
              ${picks&&picks[0]===t.n ? "border-yellow-400 bg-yellow-400 text-gray-900" :
                picks&&picks[1]===t.n ? "border-green-400 bg-green-400/20 text-green-200 border-opacity-80" :
                "border-white/20 bg-white/5 text-white hover:bg-white/15"}`}
          >
            <span className="text-xl">{t.f}</span>
            <span className="truncate">{t.n}</span>
            {picks&&picks[0]===t.n && <span className="ml-auto text-xs font-black">1st</span>}
            {picks&&picks[1]===t.n && <span className="ml-auto text-xs font-black text-green-300">2nd</span>}
          </button>
        ))}
      </div>
      <div className="flex gap-2 text-xs">
        <div className="flex items-center gap-1 text-yellow-400"><span>🥇</span>{picks&&picks[0]||"Pick 1st"}</div>
        <div className="flex items-center gap-1 text-green-400 ml-4"><span>🥈</span>{picks&&picks[1]||"Pick 2nd"}</div>
      </div>
    </div>
  );
}

function KnockoutPick({ label, teamA, teamB, winner, onPick, date, city }) {
  if (!teamA && !teamB) return (
    <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-white/30 text-xs text-center">
      {label}<br/>Waiting for group picks…
    </div>
  );
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-3 border border-white/20">
      <div className="flex items-center justify-between mb-2">
        <div className="text-white/50 text-xs font-semibold uppercase tracking-wider">{label}</div>
        {date && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-yellow-400 font-bold">📅 {date}</span>
            <span className="text-white/40">{city}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {[teamA, teamB].map((t, i) => t ? (
          <button key={i} onClick={() => onPick(t)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 border-2 transition-all text-sm font-bold
              ${winner===t
                ? "border-yellow-400 bg-yellow-400 text-gray-900 shadow-md"
                : "border-white/20 bg-white/5 text-white hover:bg-white/20"}`}>
            <span className="text-lg">{REAL_GROUPS && Object.values(REAL_GROUPS).flatMap(g=>g.teams).find(x=>x.n===t)?.f || "🏳️"}</span>
            {t}
            {winner===t && <span className="ml-auto">✓</span>}
          </button>
        ) : <div key={i} className="rounded-lg px-3 py-2 border border-white/10 text-white/30 text-sm">TBD</div>)}
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  // Room state
  const [roomCode, setRoomCode] = useState("");
  const [roomInput, setRoomInput] = useState("");
  const [room, setRoom] = useState(null); // null = not joined yet

  // In-room state
  const [view, setView] = useState("home");
  const [currentBracket, setCurrentBracket] = useState(emptyBracket);
  const [editingIdx, setEditingIdx] = useState(null);
  const [step, setStep] = useState("name");
  const [toast, setToast] = useState(null);
  const [adminInput, setAdminInput] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);

  // Persist room whenever it changes
  useEffect(() => {
    if (room && roomCode) saveRoom(roomCode, room);
  }, [room, roomCode]);

  const showToast = (msg, color="green") => {
    setToast({msg, color});
    setTimeout(() => setToast(null), 3000);
  };

  function joinRoom(code) {
    const key = code.trim().toUpperCase();
    if (!key) return;
    const existing = loadRoom(key);
    if (existing) {
      setRoom(existing);
    } else {
      const fresh = emptyRoom(key);
      saveRoom(key, fresh);
      setRoom(fresh);
    }
    setRoomCode(key);
    setView("home");
    setAdminUnlocked(false);
  }

  function leaveRoom() {
    setRoom(null);
    setRoomCode("");
    setRoomInput("");
    setView("home");
    setAdminUnlocked(false);
  }

  // ── ROOM JOIN SCREEN ──
  if (!room) {
    return (
      <div style={{
        minHeight:"100vh",
        background:"linear-gradient(135deg, #0a1628 0%, #1a3a5c 40%, #0d2137 100%)",
        fontFamily:"'Fredoka One', 'Nunito', sans-serif",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>
        {toast && (
          <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl font-bold text-white shadow-2xl
            ${toast.color==="green"?"bg-green-500":"bg-red-500"}`}>
            {toast.msg}
          </div>
        )}
        <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center gap-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🌍⚽🏆</div>
            <h1 style={{fontFamily:"'Fredoka One',sans-serif"}} className="text-4xl text-white font-black mb-2">
              Family Bracket
            </h1>
            <p className="text-yellow-400 font-bold">FIFA World Cup 2026</p>
          </div>

          <div className="w-full bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 space-y-5">
            <div className="text-center">
              <div className="text-3xl mb-2">🔑</div>
              <h2 className="text-white text-xl font-black">Enter Your Room Code</h2>
              <p className="text-white/50 text-sm mt-1">Each group has its own private room. Create one or join an existing one.</p>
            </div>

            <input
              type="text"
              placeholder="e.g. FAMILY2026"
              value={roomInput}
              onChange={e => setRoomInput(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,""))}
              onKeyDown={e => e.key==="Enter" && roomInput.trim() && joinRoom(roomInput)}
              className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-5 py-4 text-white text-xl font-black uppercase tracking-widest placeholder-white/30 focus:outline-none focus:border-yellow-400 transition-all text-center"
              maxLength={16}
            />

            <button
              disabled={!roomInput.trim()}
              onClick={() => joinRoom(roomInput)}
              className="w-full bg-yellow-400 disabled:bg-white/20 disabled:text-white/30 text-gray-900 font-black text-xl rounded-2xl py-4 transition-all active:scale-95">
              {roomInput && loadRoom(roomInput.toUpperCase()) ? "🚪 Join Room" : "✨ Create Room"}
            </button>

            <div className="border-t border-white/10 pt-4 space-y-2 text-sm text-white/40 text-center">
              <p>💡 Share the same code with your group</p>
              <p>🔒 Different code = different private pool</p>
              <p>👨‍👩‍👧‍👦 Family uses <span className="text-white/60 font-bold">FAMILY2026</span></p>
              <p>👯 Friends use <span className="text-white/60 font-bold">FRIENDS2026</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── HELPERS (inside room) ──
  const showRoom = room;

  function saveCurrentBracket() {
    const b = { ...currentBracket };
    const updated = [...room.brackets];
    if (editingIdx !== null) { updated[editingIdx] = b; }
    else { updated.push(b); }
    setRoom(r => ({ ...r, brackets: updated }));
    showToast("🎉 Bracket saved!");
    setView("leaderboard");
  }

  function startNewBracket() {
    setCurrentBracket(emptyBracket());
    setEditingIdx(null);
    setStep("name");
    setView("fill");
  }

  function editBracket(idx) {
    setCurrentBracket({ ...room.brackets[idx] });
    setEditingIdx(idx);
    setStep("groups");
    setView("fill");
  }

  const allGroupsFilled = Object.keys(REAL_GROUPS).every(k =>
    currentBracket.groups[k][0] && currentBracket.groups[k][1]
  );

  const r32Teams = (() => {
    const g = Object.keys(REAL_GROUPS);
    const winners = g.map(k => currentBracket.groups[k][0]);
    const runners = g.map(k => currentBracket.groups[k][1]);
    const thirds = currentBracket.thirdPicks || [];
    // Build 24-team pool: 12 winners + 12 runners-up + 8 chosen 3rd-place teams
    // Pair: winners vs runners from adjacent groups for slots 0-7 (8 matches)
    // winners vs 3rd-place picks for slots 8-15 (8 matches)
    const pairs = [];
    for (let i = 0; i < 8; i++) {
      pairs.push([winners[i*2] || null, runners[i*2+1] || null]);
    }
    for (let i = 0; i < 8; i++) {
      pairs.push([runners[i] || null, thirds[i] || null]);
    }
    return pairs.slice(0,16);
  })();

  function pickKnockout(round, idx, team) {
    setCurrentBracket(b => {
      const ko = { ...b.knockout };
      if (round === "final") { ko.final = team; return { ...b, knockout: ko, champion: team }; }
      const arr = [...ko[round]]; arr[idx] = team; ko[round] = arr;
      if (round === "r32") { ko.r16 = Array(8).fill(null); ko.qf = Array(4).fill(null); ko.sf = Array(2).fill(null); ko.final = null; }
      if (round === "r16") { ko.qf = Array(4).fill(null); ko.sf = Array(2).fill(null); ko.final = null; }
      if (round === "qf") { ko.sf = Array(2).fill(null); ko.final = null; }
      if (round === "sf") { ko.final = null; }
      return { ...b, knockout: ko };
    });
  }

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(135deg, #0a1628 0%, #1a3a5c 40%, #0d2137 100%)",
      fontFamily:"'Fredoka One', 'Nunito', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>

      {toast && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl font-bold text-white shadow-2xl
          ${toast.color==="green"?"bg-green-500":"bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => setView("home")} className="flex items-center gap-2">
            <span className="text-2xl">⚽</span>
            <div>
              <span style={{fontFamily:"'Fredoka One',sans-serif"}} className="text-white text-lg font-black">WC 2026</span>
              <span className="ml-2 bg-yellow-400/20 border border-yellow-400/40 text-yellow-400 text-xs font-black px-2 py-0.5 rounded-lg">
                🔑 {roomCode}
              </span>
            </div>
          </button>
          <div className="flex gap-1 items-center">
            {["home","leaderboard","admin"].map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`px-2 py-1.5 rounded-xl text-sm font-bold transition-all
                  ${view===v ? "bg-yellow-400 text-gray-900" : "text-white/60 hover:text-white"}`}>
                {v==="home"?"🏠":v==="leaderboard"?"🏆":"⚙️"}
              </button>
            ))}
            <button onClick={leaveRoom}
              className="ml-1 px-2 py-1.5 rounded-xl text-sm font-bold text-white/40 hover:text-white hover:bg-white/10 transition-all"
              title="Switch room">
              🚪
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* ── HOME ── */}
        {view === "home" && (
          <div className="space-y-6">
            <div className="text-center py-4">
              <div className="text-5xl mb-3">🌍⚽🏆</div>
              <h1 style={{fontFamily:"'Fredoka One',sans-serif"}} className="text-4xl text-white font-black mb-1">
                Family Bracket
              </h1>
              <p className="text-yellow-400 font-bold">FIFA World Cup 2026</p>
              <div className="mt-2 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2">
                <span className="text-white/50 text-sm">Room:</span>
                <span className="text-yellow-400 font-black tracking-widest">{roomCode}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={startNewBracket}
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg rounded-2xl p-5 transition-all active:scale-95 shadow-lg flex flex-col items-center gap-2">
                <span className="text-3xl">✏️</span>
                Fill My Bracket
              </button>
              <button onClick={() => setView("leaderboard")}
                className="bg-white/10 hover:bg-white/20 text-white font-black text-lg rounded-2xl p-5 transition-all border-2 border-white/20 flex flex-col items-center gap-2">
                <span className="text-3xl">🏆</span>
                Leaderboard
              </button>
            </div>

            {room.brackets.length > 0 && (
              <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                <h3 className="text-white font-black mb-3">👨‍👩‍👧‍👦 Brackets in this room</h3>
                <div className="space-y-2">
                  {room.brackets.map((b, i) => (
                    <button key={i} onClick={() => editBracket(i)}
                      className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-xl px-4 py-3 border border-white/10 transition-all">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{["🦁","🦊","🐯","🦋","🐸","🦄","🐺","🦅"][i%8]}</span>
                        <span className="text-white font-bold">{b.name || "Unnamed"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {b.champion && <span className="text-yellow-400 font-bold text-sm">{b.champion} 🏆</span>}
                        <span className="text-white/40 text-xs">Edit →</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-blue-500/20 border border-blue-400/30 rounded-2xl p-4">
              <h3 className="text-blue-300 font-black mb-2">📱 Invite to this room</h3>
              <p className="text-white/60 text-sm mb-1">Share the link + your room code with your group.</p>
              <p className="text-white/40 text-xs mb-3">Only people with this code can see this leaderboard.</p>
              <div className="flex gap-2">
                <div className="flex-1 bg-black/30 rounded-xl px-4 py-3 text-yellow-400 font-black tracking-widest text-center text-lg border border-yellow-400/30">
                  {roomCode}
                </div>
                <button onClick={() => {
                    navigator.clipboard.writeText(`${window.location.href.split("?")[0]} — Room code: ${roomCode}`);
                    showToast("📋 Copied link + code!");
                  }}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-black rounded-xl px-4 transition-all">
                  📋 Copy
                </button>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="font-bold text-white mb-2">🎯 Scoring</div>
              <div className="grid grid-cols-2 gap-1 text-sm text-white/60">
                <div>✅ Group picks: <span className="text-yellow-400 font-bold">2 pts</span></div>
                <div>✅ 3rd place pick: <span className="text-yellow-400 font-bold">1 pt</span></div>
                <div>✅ Round of 32: <span className="text-yellow-400 font-bold">2 pts</span></div>
                <div>✅ Round of 16: <span className="text-yellow-400 font-bold">4 pts</span></div>
                <div>✅ Quarter-final: <span className="text-yellow-400 font-bold">6 pts</span></div>
                <div>✅ Semi-final: <span className="text-yellow-400 font-bold">8 pts</span></div>
                <div>✅ Champion: <span className="text-yellow-400 font-bold">12 pts</span></div>
              </div>
            </div>
          </div>
        )}

        {/* ── FILL BRACKET ── */}
        {view === "fill" && (
          <div className="space-y-5">
            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                {["name","groups","thirds","r32","r16","qf","sf","final"].map((s,i) => (
                  <div key={s} className={`flex-1 h-2 rounded-full transition-all cursor-pointer
                    ${["name","groups","thirds","r32","r16","qf","sf","final"].indexOf(step) >= i ? "bg-yellow-400" : "bg-white/20"}`}
                    onClick={() => {
                      const order = ["name","groups","thirds","r32","r16","qf","sf","final"];
                      const curr = order.indexOf(step);
                      if (i < curr) setStep(s);
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <button onClick={() => {
                  const order = ["name","groups","thirds","r32","r16","qf","sf","final"];
                  const curr = order.indexOf(step);
                  if (curr > 0) setStep(order[curr - 1]);
                }}
                  className={`flex items-center gap-1 text-sm font-bold transition-all
                    ${["name"].includes(step) ? "text-white/20 cursor-not-allowed" : "text-white/60 hover:text-white"}`}
                  disabled={step === "name"}>
                  ← Back
                </button>
                <span className="text-white/40 text-xs capitalize">
                  {step === "r32" ? "Round of 32" : step === "r16" ? "Round of 16" : step === "qf" ? "Quarter-Finals" : step === "sf" ? "Semi-Finals" : step === "final" ? "The Final" : step}
                </span>
                <div className="w-12"/>
              </div>
            </div>

            {step === "name" && (
              <div className="space-y-5">
                <div className="text-center">
                  <div className="text-5xl mb-3">👤</div>
                  <h2 className="text-white text-2xl font-black">What's your name?</h2>
                  <p className="text-white/50 text-sm mt-1">So everyone knows whose bracket this is!</p>
                </div>
                <input type="text" placeholder="e.g. Dad, Emma, Uncle Carlos…"
                  value={currentBracket.name}
                  onChange={e => setCurrentBracket(b => ({...b, name:e.target.value}))}
                  className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-5 py-4 text-white text-xl font-bold placeholder-white/30 focus:outline-none focus:border-yellow-400 transition-all"
                  maxLength={20}/>
                <button disabled={!currentBracket.name.trim()} onClick={() => setStep("groups")}
                  className="w-full bg-yellow-400 disabled:bg-white/20 disabled:text-white/30 text-gray-900 font-black text-xl rounded-2xl py-4 transition-all active:scale-95">
                  Next: Pick Groups →
                </button>
              </div>
            )}

            {step === "groups" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-white text-xl font-black">⚽ Group Stage</h2>
                  <span className="text-white/50 text-sm">
                    {Object.keys(REAL_GROUPS).filter(k=>currentBracket.groups[k][0]&&currentBracket.groups[k][1]).length}/12 done
                  </span>
                </div>
                <p className="text-white/60 text-sm">Pick 1st and 2nd place in each group</p>
                {Object.keys(REAL_GROUPS).map(k => (
                  <GroupCard key={k} groupKey={k} group={REAL_GROUPS[k]}
                    picks={currentBracket.groups[k]}
                    onChange={picks => setCurrentBracket(b => ({...b, groups:{...b.groups,[k]:picks}}))}/>
                ))}
                <button disabled={!allGroupsFilled} onClick={() => setStep("thirds")}
                  className="w-full bg-yellow-400 disabled:bg-white/20 disabled:text-white/30 text-gray-900 font-black text-xl rounded-2xl py-4 transition-all active:scale-95 sticky bottom-4">
                  {allGroupsFilled ? "Next: Pick Best 3rd Place Teams →" : `Fill all 12 groups first (${Object.keys(REAL_GROUPS).filter(k=>currentBracket.groups[k][0]&&currentBracket.groups[k][1]).length}/12)`}
                </button>
              </div>
            )}

            {step === "thirds" && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">🥉</div>
                  <h2 className="text-white text-xl font-black">Best 3rd Place Teams</h2>
                  <p className="text-white/60 text-sm mt-1">
                    In the 2026 World Cup, 8 of the 12 group 3rd-place teams also advance to the Round of 32.
                    Pick which 8 you think will make it!
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center justify-between">
                  <span className="text-white/60 text-sm">Selected</span>
                  <span className={`font-black text-lg ${currentBracket.thirdPicks.length === 8 ? "text-green-400" : "text-yellow-400"}`}>
                    {currentBracket.thirdPicks.length} / 8
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {Object.keys(REAL_GROUPS).map(k => {
                    const thirdTeam = REAL_GROUPS[k].teams.find(t =>
                      t.n !== currentBracket.groups[k][0] && t.n !== currentBracket.groups[k][1]
                    ) || REAL_GROUPS[k].teams[2];
                    // Actually show all teams NOT picked as 1st or 2nd
                    const thirds = REAL_GROUPS[k].teams.filter(t =>
                      t.n !== currentBracket.groups[k][0] && t.n !== currentBracket.groups[k][1]
                    );
                    return thirds.map(t => {
                      const picked = currentBracket.thirdPicks.includes(t.n);
                      const full = currentBracket.thirdPicks.length >= 8 && !picked;
                      return (
                        <button key={t.n}
                          disabled={full}
                          onClick={() => {
                            setCurrentBracket(b => {
                              const prev = b.thirdPicks;
                              const next = prev.includes(t.n)
                                ? prev.filter(x => x !== t.n)
                                : prev.length < 8 ? [...prev, t.n] : prev;
                              return { ...b, thirdPicks: next };
                            });
                          }}
                          className={`flex items-center gap-3 rounded-xl px-4 py-3 border-2 transition-all font-bold text-sm
                            ${picked
                              ? "border-green-400 bg-green-400/20 text-green-200"
                              : full
                              ? "border-white/10 bg-white/5 text-white/30 cursor-not-allowed"
                              : "border-white/20 bg-white/5 text-white hover:bg-white/15"}`}>
                          <span className="bg-yellow-400/20 text-yellow-400 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
                            {k}
                          </span>
                          <span className="text-xl">{t.f}</span>
                          <span className="flex-1 text-left">{t.n}</span>
                          {picked && <span className="text-green-400 font-black">✓ Advances</span>}
                        </button>
                      );
                    });
                  })}
                </div>
                <button
                  disabled={currentBracket.thirdPicks.length !== 8}
                  onClick={() => setStep("r32")}
                  className="w-full bg-yellow-400 disabled:bg-white/20 disabled:text-white/30 text-gray-900 font-black text-xl rounded-2xl py-4 transition-all active:scale-95 sticky bottom-4">
                  {currentBracket.thirdPicks.length === 8 ? "Next: Round of 32 →" : `Pick ${8 - currentBracket.thirdPicks.length} more teams`}
                </button>
              </div>
            )}

            {/* ── ROUND OF 32 ── */}
            {step === "r32" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-white text-xl font-black">Round of 32</h2>
                  <span className="text-white/40 text-xs">Jun 28 – Jul 3</span>
                </div>
                <p className="text-white/50 text-sm">Pick the winner of each match</p>
                <div className="grid grid-cols-1 gap-2">
                  {r32Teams.map(([a,b], i) => (
                    <KnockoutPick key={i} label={`Match ${i+1}`}
                      teamA={a} teamB={b}
                      winner={currentBracket.knockout.r32[i]}
                      onPick={t => pickKnockout("r32", i, t)}
                      date={KNOCKOUT_SCHEDULE.r32[i].date}
                      city={KNOCKOUT_SCHEDULE.r32[i].city}/>
                  ))}
                </div>
                <button
                  disabled={currentBracket.knockout.r32.filter(Boolean).length < 16}
                  onClick={() => setStep("r16")}
                  className="w-full bg-yellow-400 disabled:bg-white/20 disabled:text-white/30 text-gray-900 font-black text-xl rounded-2xl py-4 transition-all active:scale-95 sticky bottom-4">
                  {currentBracket.knockout.r32.filter(Boolean).length < 16
                    ? `Pick all 16 winners (${currentBracket.knockout.r32.filter(Boolean).length}/16)`
                    : "Next: Round of 16 →"}
                </button>
              </div>
            )}

            {/* ── ROUND OF 16 ── */}
            {step === "r16" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-white text-xl font-black">Round of 16</h2>
                  <span className="text-white/40 text-xs">Jul 4 – 7</span>
                </div>
                <p className="text-white/50 text-sm">Pick the winner of each match</p>
                <div className="grid grid-cols-1 gap-2">
                  {Array.from({length:8},(_,i) => (
                    <KnockoutPick key={i} label={`Match ${i+1}`}
                      teamA={currentBracket.knockout.r32[i*2]||null}
                      teamB={currentBracket.knockout.r32[i*2+1]||null}
                      winner={currentBracket.knockout.r16[i]}
                      onPick={t => pickKnockout("r16", i, t)}
                      date={KNOCKOUT_SCHEDULE.r16[i].date}
                      city={KNOCKOUT_SCHEDULE.r16[i].city}/>
                  ))}
                </div>
                <button
                  disabled={currentBracket.knockout.r16.filter(Boolean).length < 8}
                  onClick={() => setStep("qf")}
                  className="w-full bg-yellow-400 disabled:bg-white/20 disabled:text-white/30 text-gray-900 font-black text-xl rounded-2xl py-4 transition-all active:scale-95 sticky bottom-4">
                  {currentBracket.knockout.r16.filter(Boolean).length < 8
                    ? `Pick all 8 winners (${currentBracket.knockout.r16.filter(Boolean).length}/8)`
                    : "Next: Quarter-Finals →"}
                </button>
              </div>
            )}

            {/* ── QUARTER-FINALS ── */}
            {step === "qf" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-white text-xl font-black">Quarter-Finals</h2>
                  <span className="text-white/40 text-xs">Jul 9 – 11</span>
                </div>
                <p className="text-white/50 text-sm">Pick the winner of each match</p>
                <div className="grid grid-cols-1 gap-2">
                  {Array.from({length:4},(_,i) => (
                    <KnockoutPick key={i} label={`QF Match ${i+1}`}
                      teamA={currentBracket.knockout.r16[i*2]||null}
                      teamB={currentBracket.knockout.r16[i*2+1]||null}
                      winner={currentBracket.knockout.qf[i]}
                      onPick={t => pickKnockout("qf", i, t)}
                      date={KNOCKOUT_SCHEDULE.qf[i].date}
                      city={KNOCKOUT_SCHEDULE.qf[i].city}/>
                  ))}
                </div>
                <button
                  disabled={currentBracket.knockout.qf.filter(Boolean).length < 4}
                  onClick={() => setStep("sf")}
                  className="w-full bg-yellow-400 disabled:bg-white/20 disabled:text-white/30 text-gray-900 font-black text-xl rounded-2xl py-4 transition-all active:scale-95 sticky bottom-4">
                  {currentBracket.knockout.qf.filter(Boolean).length < 4
                    ? `Pick all 4 winners (${currentBracket.knockout.qf.filter(Boolean).length}/4)`
                    : "Next: Semi-Finals →"}
                </button>
              </div>
            )}

            {/* ── SEMI-FINALS ── */}
            {step === "sf" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-white text-xl font-black">Semi-Finals</h2>
                  <span className="text-white/40 text-xs">Jul 14 – 15</span>
                </div>
                <p className="text-white/50 text-sm">Pick the 2 finalists</p>
                <div className="grid grid-cols-1 gap-2">
                  {Array.from({length:2},(_,i) => (
                    <KnockoutPick key={i} label={`Semi-Final ${i+1}`}
                      teamA={currentBracket.knockout.qf[i*2]||null}
                      teamB={currentBracket.knockout.qf[i*2+1]||null}
                      winner={currentBracket.knockout.sf[i]}
                      onPick={t => pickKnockout("sf", i, t)}
                      date={KNOCKOUT_SCHEDULE.sf[i].date}
                      city={KNOCKOUT_SCHEDULE.sf[i].city}/>
                  ))}
                </div>
                <button
                  disabled={currentBracket.knockout.sf.filter(Boolean).length < 2}
                  onClick={() => setStep("final")}
                  className="w-full bg-yellow-400 disabled:bg-white/20 disabled:text-white/30 text-gray-900 font-black text-xl rounded-2xl py-4 transition-all active:scale-95 sticky bottom-4">
                  {currentBracket.knockout.sf.filter(Boolean).length < 2
                    ? `Pick both finalists (${currentBracket.knockout.sf.filter(Boolean).length}/2)`
                    : "Next: The Final →"}
                </button>
              </div>
            )}

            {/* ── THE FINAL ── */}
            {step === "final" && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl mb-2">🏆</div>
                  <h2 className="text-white text-2xl font-black">The Final</h2>
                  <p className="text-white/50 text-sm">Jul 19 · MetLife Stadium, New York/NJ</p>
                </div>
                <KnockoutPick label="World Cup Final"
                  teamA={currentBracket.knockout.sf[0]||null}
                  teamB={currentBracket.knockout.sf[1]||null}
                  winner={currentBracket.champion}
                  onPick={t => { pickKnockout("final", 0, t); setCurrentBracket(b=>({...b,champion:t})); }}
                  date={KNOCKOUT_SCHEDULE.final.date}
                  city={KNOCKOUT_SCHEDULE.final.city}/>

                {currentBracket.champion && (
                  <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-2xl p-5 text-center space-y-2">
                    <div className="text-4xl">🏆</div>
                    <div className="text-yellow-400 font-black text-lg">{currentBracket.name}'s World Champion</div>
                    <div className="text-white font-black text-3xl">
                      {Object.values(REAL_GROUPS).flatMap(g=>g.teams).find(t=>t.n===currentBracket.champion)?.f} {currentBracket.champion}
                    </div>
                  </div>
                )}

                <button
                  disabled={!currentBracket.champion}
                  onClick={saveCurrentBracket}
                  className="w-full bg-green-500 disabled:bg-white/20 disabled:text-white/30 hover:bg-green-400 text-white font-black text-xl rounded-2xl py-4 transition-all active:scale-95">
                  {currentBracket.champion ? "💾 Save My Bracket!" : "Pick the Champion first"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── LEADERBOARD ── */}
        {view === "leaderboard" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-2xl font-black">🏆 Leaderboard</h2>
              <span className="bg-white/10 border border-white/20 text-white/60 text-xs font-bold px-3 py-1 rounded-xl">
                🔑 {roomCode}
              </span>
            </div>

            {room.brackets.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">📭</div>
                <div className="text-white/60">No brackets yet! Be the first to fill one.</div>
                <button onClick={startNewBracket} className="mt-4 bg-yellow-400 text-gray-900 font-black px-6 py-3 rounded-2xl">
                  Fill My Bracket
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {[...room.brackets]
                  .map((b, i) => ({ ...b, idx: i, score: calcScore(b, room.results) }))
                  .sort((a, b) => b.score - a.score)
                  .map((b, rank) => (
                    <div key={b.idx}
                      className={`flex items-center gap-4 rounded-2xl px-4 py-4 border-2 transition-all
                        ${rank===0?"border-yellow-400 bg-yellow-400/10":
                          rank===1?"border-gray-300/40 bg-white/5":
                          rank===2?"border-amber-700/40 bg-white/5":"border-white/10 bg-white/5"}`}>
                      <div className={`text-2xl font-black w-8 text-center
                        ${rank===0?"text-yellow-400":rank===1?"text-gray-300":rank===2?"text-amber-600":"text-white/40"}`}>
                        {rank===0?"🥇":rank===1?"🥈":rank===2?"🥉":`${rank+1}`}
                      </div>
                      <div className="text-2xl">{["🦁","🦊","🐯","🦋","🐸","🦄","🐺","🦅"][b.idx%8]}</div>
                      <div className="flex-1">
                        <div className="text-white font-black text-lg">{b.name||"Unnamed"}</div>
                        {b.champion && (
                          <div className="text-white/50 text-sm">
                            Picked: {Object.values(REAL_GROUPS).flatMap(g=>g.teams).find(t=>t.n===b.champion)?.f} {b.champion}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-yellow-400 font-black text-2xl">{b.score}</div>
                        <div className="text-white/40 text-xs">pts</div>
                      </div>
                      <button onClick={() => editBracket(b.idx)}
                        className="bg-white/10 hover:bg-white/20 text-white rounded-xl px-3 py-2 text-sm font-bold">
                        Edit
                      </button>
                    </div>
                  ))}
              </div>
            )}
            <button onClick={startNewBracket}
              className="w-full bg-yellow-400 text-gray-900 font-black rounded-2xl py-4 text-lg">
              ✏️ Add Another Bracket
            </button>
          </div>
        )}

        {/* ── ADMIN ── */}
        {view === "admin" && (
          <div className="space-y-5">
            <h2 className="text-white text-2xl font-black">⚙️ Admin · {roomCode}</h2>
            {!adminUnlocked ? (
              <div className="space-y-4">
                <p className="text-white/60">Enter the admin code for room <span className="text-yellow-400 font-bold">{roomCode}</span>.</p>
                <input value={adminInput} onChange={e=>setAdminInput(e.target.value.toUpperCase())}
                  placeholder="Admin code…" maxLength={8}
                  className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-5 py-4 text-white text-xl font-bold uppercase tracking-widest placeholder-white/30 focus:outline-none focus:border-yellow-400 transition-all text-center"/>
                <button onClick={() => {
                    if (adminInput === room.adminCode) { setAdminUnlocked(true); }
                    else showToast("Wrong code!", "red");
                  }}
                  className="w-full bg-yellow-400 text-gray-900 font-black rounded-2xl py-4 text-lg">
                  Unlock
                </button>
                <div className="bg-white/5 rounded-2xl p-4 text-white/40 text-sm text-center">
                  Admin code for this room:<br/>
                  <span className="text-yellow-400 font-bold text-lg tracking-widest">{room.adminCode}</span><br/>
                  <span className="text-white/30 text-xs">Save this — it's only shown here.</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-500/20 border border-green-400/40 rounded-2xl p-4 text-green-300 font-bold">✅ Admin unlocked</div>
                <div className="bg-white/10 rounded-2xl p-4 border border-white/20 space-y-3">
                  <h3 className="text-white font-black">🗑️ Manage Brackets</h3>
                  {room.brackets.length === 0 && <p className="text-white/40 text-sm">No brackets yet.</p>}
                  {room.brackets.map((b, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                      <span className="text-white font-bold">{b.name||"Unnamed"}</span>
                      <button onClick={() => {
                          const updated = room.brackets.filter((_,j)=>j!==i);
                          setRoom(r=>({...r,brackets:updated}));
                          showToast("Bracket removed");
                        }}
                        className="bg-red-500/30 hover:bg-red-500/50 text-red-300 rounded-lg px-3 py-1 text-sm font-bold">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="bg-white/10 rounded-2xl p-4 border border-white/20 space-y-3">
                  <h3 className="text-white font-black">🔄 Reset Room</h3>
                  <p className="text-white/50 text-sm">Deletes ALL brackets in <span className="text-yellow-400">{roomCode}</span>. Cannot be undone!</p>
                  <button onClick={() => {
                      if (window.confirm(`Delete all brackets in room ${roomCode}?`)) {
                        setRoom(r=>({...r,brackets:[]}));
                        showToast("Room reset!");
                      }
                    }}
                    className="w-full bg-red-500/30 hover:bg-red-500/50 text-red-300 font-black rounded-xl py-3">
                    🗑️ Reset All Brackets
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
