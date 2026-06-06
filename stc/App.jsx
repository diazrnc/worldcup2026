import { useState, useEffect, useCallback } from "react";

// --- DATA ---
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
  A: { name:"A", teams:[{f:"🇲🇽",n:"Mexico"},{f:"🇿🇦",n:"South Africa"},{f:"🇰🇷",n:"South Korea"},{f:"🇨🇿",n:"Czechia"}],
    matches:[
      {date:"Jun 11",teams:"Mexico vs South Africa",city:"Mexico City 🇲🇽"},
      {date:"Jun 11",teams:"South Korea vs Czechia",city:"Guadalajara 🇲🇽"},
      {date:"Jun 15",teams:"Mexico vs South Korea",city:"Dallas 🇺🇸"},
      {date:"Jun 15",teams:"South Africa vs Czechia",city:"Atlanta 🇺🇸"},
      {date:"Jun 19",teams:"Mexico vs Czechia",city:"Houston 🇺🇸"},
      {date:"Jun 19",teams:"South Africa vs South Korea",city:"Kansas City 🇺🇸"},
    ]},
  B: { name:"B", teams:[{f:"🇨🇦",n:"Canada"},{f:"🇧🇦",n:"Bosnia-Herzegovina"},{f:"🇶🇦",n:"Qatar"},{f:"🇨🇭",n:"Switzerland"}],
    matches:[
      {date:"Jun 12",teams:"Canada vs Bosnia-Herzegovina",city:"Toronto 🇨🇦"},
      {date:"Jun 13",teams:"Qatar vs Switzerland",city:"Dallas 🇺🇸"},
      {date:"Jun 16",teams:"Canada vs Qatar",city:"Vancouver 🇨🇦"},
      {date:"Jun 17",teams:"Switzerland vs Bosnia-Herzegovina",city:"Seattle 🇺🇸"},
      {date:"Jun 21",teams:"Canada vs Switzerland",city:"Vancouver 🇨🇦"},
      {date:"Jun 21",teams:"Bosnia-Herzegovina vs Qatar",city:"Philadelphia 🇺🇸"},
    ]},
  C: { name:"C", teams:[{f:"🇧🇷",n:"Brazil"},{f:"🇲🇦",n:"Morocco"},{f:"🇭🇹",n:"Haiti"},{f:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",n:"Scotland"}],
    matches:[
      {date:"Jun 13",teams:"Brazil vs Morocco",city:"New York/NJ 🇺🇸"},
      {date:"Jun 13",teams:"Haiti vs Scotland",city:"Boston 🇺🇸"},
      {date:"Jun 17",teams:"Brazil vs Haiti",city:"San Francisco 🇺🇸"},
      {date:"Jun 17",teams:"Morocco vs Scotland",city:"Miami 🇺🇸"},
      {date:"Jun 21",teams:"Brazil vs Scotland",city:"Atlanta 🇺🇸"},
      {date:"Jun 21",teams:"Morocco vs Haiti",city:"Los Angeles 🇺🇸"},
    ]},
  D: { name:"D", teams:[{f:"🇺🇸",n:"USA"},{f:"🇵🇾",n:"Paraguay"},{f:"🇦🇺",n:"Australia"},{f:"🇹🇷",n:"Turkey"}],
    matches:[
      {date:"Jun 12",teams:"USA vs Paraguay",city:"Los Angeles 🇺🇸"},
      {date:"Jun 13",teams:"Australia vs Turkey",city:"Vancouver 🇨🇦"},
      {date:"Jun 17",teams:"USA vs Australia",city:"New York/NJ 🇺🇸"},
      {date:"Jun 17",teams:"Turkey vs Paraguay",city:"Houston 🇺🇸"},
      {date:"Jun 21",teams:"USA vs Turkey",city:"Seattle 🇺🇸"},
      {date:"Jun 21",teams:"Australia vs Paraguay",city:"Kansas City 🇺🇸"},
    ]},
  E: { name:"E", teams:[{f:"🇩🇪",n:"Germany"},{f:"🇨🇼",n:"Curaçao"},{f:"🇨🇮",n:"Ivory Coast"},{f:"🇪🇨",n:"Ecuador"}],
    matches:[
      {date:"Jun 14",teams:"Germany vs Curaçao",city:"Philadelphia 🇺🇸"},
      {date:"Jun 14",teams:"Ivory Coast vs Ecuador",city:"Boston 🇺🇸"},
      {date:"Jun 18",teams:"Germany vs Ivory Coast",city:"Dallas 🇺🇸"},
      {date:"Jun 18",teams:"Ecuador vs Curaçao",city:"Miami 🇺🇸"},
      {date:"Jun 22",teams:"Germany vs Ecuador",city:"Los Angeles 🇺🇸"},
      {date:"Jun 22",teams:"Ivory Coast vs Curaçao",city:"Atlanta 🇺🇸"},
    ]},
  F: { name:"F", teams:[{f:"🇳🇱",n:"Netherlands"},{f:"🇯🇵",n:"Japan"},{f:"🇸🇪",n:"Sweden"},{f:"🇹🇳",n:"Tunisia"}],
    matches:[
      {date:"Jun 14",teams:"Netherlands vs Tunisia",city:"Kansas City 🇺🇸"},
      {date:"Jun 14",teams:"Japan vs Sweden",city:"Houston 🇺🇸"},
      {date:"Jun 18",teams:"Netherlands vs Japan",city:"San Francisco 🇺🇸"},
      {date:"Jun 19",teams:"Sweden vs Tunisia",city:"Seattle 🇺🇸"},
      {date:"Jun 22",teams:"Netherlands vs Sweden",city:"Miami 🇺🇸"},
      {date:"Jun 22",teams:"Japan vs Tunisia",city:"New York/NJ 🇺🇸"},
    ]},
  G: { name:"G", teams:[{f:"🇧🇪",n:"Belgium"},{f:"🇪🇬",n:"Egypt"},{f:"🇮🇷",n:"Iran"},{f:"🇳🇿",n:"New Zealand"}],
    matches:[
      {date:"Jun 15",teams:"Belgium vs Egypt",city:"Monterrey 🇲🇽"},
      {date:"Jun 15",teams:"Iran vs New Zealand",city:"Guadalajara 🇲🇽"},
      {date:"Jun 19",teams:"Belgium vs Iran",city:"Boston 🇺🇸"},
      {date:"Jun 19",teams:"Egypt vs New Zealand",city:"Philadelphia 🇺🇸"},
      {date:"Jun 23",teams:"Belgium vs New Zealand",city:"Seattle 🇺🇸"},
      {date:"Jun 23",teams:"Egypt vs Iran",city:"Dallas 🇺🇸"},
    ]},
  H: { name:"H", teams:[{f:"🇪🇸",n:"Spain"},{f:"🇨🇻",n:"Cape Verde"},{f:"🇸🇦",n:"Saudi Arabia"},{f:"🇺🇾",n:"Uruguay"}],
    matches:[
      {date:"Jun 15",teams:"Spain vs Uruguay",city:"Kansas City 🇺🇸"},
      {date:"Jun 15",teams:"Cape Verde vs Saudi Arabia",city:"Atlanta 🇺🇸"},
      {date:"Jun 19",teams:"Spain vs Cape Verde",city:"Houston 🇺🇸"},
      {date:"Jun 20",teams:"Uruguay vs Saudi Arabia",city:"Los Angeles 🇺🇸"},
      {date:"Jun 23",teams:"Spain vs Saudi Arabia",city:"Miami 🇺🇸"},
      {date:"Jun 23",teams:"Cape Verde vs Uruguay",city:"San Francisco 🇺🇸"},
    ]},
  I: { name:"I", teams:[{f:"🇫🇷",n:"France"},{f:"🇸🇳",n:"Senegal"},{f:"🇮🇶",n:"Iraq"},{f:"🇳🇴",n:"Norway"}],
    matches:[
      {date:"Jun 16",teams:"France vs Senegal",city:"New York/NJ 🇺🇸"},
      {date:"Jun 16",teams:"Iraq vs Norway",city:"Los Angeles 🇺🇸"},
      {date:"Jun 20",teams:"France vs Iraq",city:"Atlanta 🇺🇸"},
      {date:"Jun 20",teams:"Norway vs Senegal",city:"Kansas City 🇺🇸"},
      {date:"Jun 24",teams:"France vs Norway",city:"Dallas 🇺🇸"},
      {date:"Jun 24",teams:"Senegal vs Iraq",city:"Houston 🇺🇸"},
    ]},
  J: { name:"J", teams:[{f:"🇦🇷",n:"Argentina"},{f:"🇩🇿",n:"Algeria"},{f:"🇦🇹",n:"Austria"},{f:"🇯🇴",n:"Jordan"}],
    matches:[
      {date:"Jun 16",teams:"Argentina vs Algeria",city:"Miami 🇺🇸"},
      {date:"Jun 17",teams:"Austria vs Jordan",city:"Boston 🇺🇸"},
      {date:"Jun 20",teams:"Argentina vs Austria",city:"San Francisco 🇺🇸"},
      {date:"Jun 21",teams:"Algeria vs Jordan",city:"Seattle 🇺🇸"},
      {date:"Jun 24",teams:"Argentina vs Jordan",city:"Philadelphia 🇺🇸"},
      {date:"Jun 24",teams:"Algeria vs Austria",city:"New York/NJ 🇺🇸"},
    ]},
  K: { name:"K", teams:[{f:"🇵🇹",n:"Portugal"},{f:"🇨🇩",n:"DR Congo"},{f:"🇺🇿",n:"Uzbekistan"},{f:"🇨🇴",n:"Colombia"}],
    matches:[
      {date:"Jun 17",teams:"Portugal vs Uzbekistan",city:"Monterrey 🇲🇽"},
      {date:"Jun 17",teams:"DR Congo vs Colombia",city:"Mexico City 🇲🇽"},
      {date:"Jun 21",teams:"Portugal vs DR Congo",city:"Los Angeles 🇺🇸"},
      {date:"Jun 22",teams:"Colombia vs Uzbekistan",city:"Boston 🇺🇸"},
      {date:"Jun 25",teams:"Portugal vs Colombia",city:"San Francisco 🇺🇸"},
      {date:"Jun 25",teams:"DR Congo vs Uzbekistan",city:"Philadelphia 🇺🇸"},
    ]},
  L: { name:"L", teams:[{f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",n:"England"},{f:"🇭🇷",n:"Croatia"},{f:"🇬🇭",n:"Ghana"},{f:"🇵🇦",n:"Panama"}],
    matches:[
      {date:"Jun 18",teams:"England vs Panama",city:"Guadalajara 🇲🇽"},
      {date:"Jun 18",teams:"Croatia vs Ghana",city:"Monterrey 🇲🇽"},
      {date:"Jun 22",teams:"England vs Croatia",city:"Dallas 🇺🇸"},
      {date:"Jun 22",teams:"Ghana vs Panama",city:"Atlanta 🇺🇸"},
      {date:"Jun 26",teams:"England vs Ghana",city:"Houston 🇺🇸"},
      {date:"Jun 26",teams:"Croatia vs Panama",city:"Kansas City 🇺🇸"},
    ]},
};

const ROUNDS = ["Round of 32","Round of 16","Quarter-Finals","Semi-Finals","Final"];

// Knockout round schedules: date + city for each slot
const KNOCKOUT_SCHEDULE = {
  r32: [
    {date:"Jun 28", city:"Los Angeles 🇺🇸"},
    {date:"Jun 28", city:"Mexico City 🇲🇽"},
    {date:"Jun 29", city:"Atlanta 🇺🇸"},
    {date:"Jun 29", city:"Toronto 🇨🇦"},
    {date:"Jun 30", city:"Miami 🇺🇸"},
    {date:"Jun 30", city:"Houston 🇺🇸"},
    {date:"Jul 1",  city:"San Francisco 🇺🇸"},
    {date:"Jul 1",  city:"Seattle 🇺🇸"},
    {date:"Jul 1",  city:"New York/NJ 🇺🇸"},
    {date:"Jul 2",  city:"Los Angeles 🇺🇸"},
    {date:"Jul 2",  city:"Toronto 🇨🇦"},
    {date:"Jul 2",  city:"Vancouver 🇨🇦"},
    {date:"Jul 3",  city:"Dallas 🇺🇸"},
    {date:"Jul 3",  city:"Miami 🇺🇸"},
    {date:"Jul 3",  city:"Atlanta 🇺🇸"},
    {date:"Jul 3",  city:"Kansas City 🇺🇸"},
  ],
  r16: [
    {date:"Jul 4",  city:"Houston 🇺🇸"},
    {date:"Jul 4",  city:"Philadelphia 🇺🇸"},
    {date:"Jul 5",  city:"New York/NJ 🇺🇸"},
    {date:"Jul 5",  city:"Mexico City 🇲🇽"},
    {date:"Jul 6",  city:"Dallas 🇺🇸"},
    {date:"Jul 6",  city:"Seattle 🇺🇸"},
    {date:"Jul 7",  city:"Atlanta 🇺🇸"},
    {date:"Jul 7",  city:"Vancouver 🇨🇦"},
  ],
  qf: [
    {date:"Jul 9",  city:"Boston 🇺🇸"},
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
  // groups: {A: [1st,2nd], B:[1st,2nd], ...}
  // knockout: rounds array
  const groups = {};
  Object.keys(REAL_GROUPS).forEach(k => { groups[k] = [null, null]; });
  return {
    name: "",
    champion: null,
    groups,
    knockout: {
      r32: Array(16).fill(null),   // 16 matches
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
  // group picks: 1pt per correct 1st/2nd
  Object.keys(bracket.groups).forEach(g => {
    [0,1].forEach(i => {
      if (bracket.groups[g][i] && results.groups[g][i] &&
          bracket.groups[g][i] === results.groups[g][i]) score += 2;
    });
  });
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
    const pairs = [];
    for (let i = 0; i < 8; i++) {
      pairs.push([winners[i*2] || null, runners[i*2+1] || null]);
      pairs.push([winners[i*2+1] || null, runners[i*2] || null]);
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
      if (round === "qf")  { ko.sf = Array(2).fill(null); ko.final = null; }
      if (round === "sf")  { ko.final = null; }
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
            <div className="flex items-center gap-2">
              {["name","groups","knockout","done"].map((s,i) => (
                <div key={s} className={`flex-1 h-2 rounded-full transition-all
                  ${["name","groups","knockout","done"].indexOf(step) >= i ? "bg-yellow-400" : "bg-white/20"}`}/>
              ))}
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
                <button disabled={!allGroupsFilled} onClick={() => setStep("knockout")}
                  className="w-full bg-yellow-400 disabled:bg-white/20 disabled:text-white/30 text-gray-900 font-black text-xl rounded-2xl py-4 transition-all active:scale-95 sticky bottom-4">
                  {allGroupsFilled ? "Next: Knockout Rounds →" : `Fill all 12 groups first (${Object.keys(REAL_GROUPS).filter(k=>currentBracket.groups[k][0]&&currentBracket.groups[k][1]).length}/12)`}
                </button>
              </div>
            )}

            {step === "knockout" && (
              <div className="space-y-5">
                <h2 className="text-white text-xl font-black">🔥 Knockout Rounds</h2>

                <div>
                  <h3 className="text-yellow-400 font-bold mb-3">Round of 32 · Jun 28 – Jul 3</h3>
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
                </div>

                {currentBracket.knockout.r32.filter(Boolean).length >= 8 && (
                  <div>
                    <h3 className="text-blue-300 font-bold mb-3">Round of 16 · Jul 4 – 7</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {Array.from({length:8},(_,i) => (
                        <KnockoutPick key={i} label={`R16 Match ${i+1}`}
                          teamA={currentBracket.knockout.r32[i*2]||null}
                          teamB={currentBracket.knockout.r32[i*2+1]||null}
                          winner={currentBracket.knockout.r16[i]}
                          onPick={t => pickKnockout("r16", i, t)}
                          date={KNOCKOUT_SCHEDULE.r16[i].date}
                          city={KNOCKOUT_SCHEDULE.r16[i].city}/>
                      ))}
                    </div>
                  </div>
                )}

                {currentBracket.knockout.r16.filter(Boolean).length >= 4 && (
                  <div>
                    <h3 className="text-green-300 font-bold mb-3">⚡ Quarter-Finals · Jul 9 – 11</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {Array.from({length:4},(_,i) => (
                        <KnockoutPick key={i} label={`QF ${i+1}`}
                          teamA={currentBracket.knockout.r16[i*2]||null}
                          teamB={currentBracket.knockout.r16[i*2+1]||null}
                          winner={currentBracket.knockout.qf[i]}
                          onPick={t => pickKnockout("qf", i, t)}
                          date={KNOCKOUT_SCHEDULE.qf[i].date}
                          city={KNOCKOUT_SCHEDULE.qf[i].city}/>
                      ))}
                    </div>
                  </div>
                )}

                {currentBracket.knockout.qf.filter(Boolean).length >= 2 && (
                  <div>
                    <h3 className="text-orange-300 font-bold mb-3">🌟 Semi-Finals · Jul 14 – 15</h3>
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
                  </div>
                )}

                {currentBracket.knockout.sf.filter(Boolean).length === 2 && (
                  <div>
                    <h3 className="text-yellow-400 font-black text-xl mb-3">🏆 THE FINAL · Jul 19</h3>
                    <KnockoutPick label="World Cup Final"
                      teamA={currentBracket.knockout.sf[0]}
                      teamB={currentBracket.knockout.sf[1]}
                      winner={currentBracket.champion}
                      onPick={t => { pickKnockout("final", 0, t); setCurrentBracket(b=>({...b,champion:t})); }}
                      date={KNOCKOUT_SCHEDULE.final.date}
                      city={KNOCKOUT_SCHEDULE.final.city}/>
                  </div>
                )}

                {currentBracket.champion && (
                  <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-2xl p-4 text-center">
                    <div className="text-4xl mb-2">🏆</div>
                    <div className="text-yellow-400 font-black text-xl">{currentBracket.name}'s Champion</div>
                    <div className="text-white font-black text-2xl mt-1">
                      {Object.values(REAL_GROUPS).flatMap(g=>g.teams).find(t=>t.n===currentBracket.champion)?.f} {currentBracket.champion}
                    </div>
                  </div>
                )}

                <button onClick={saveCurrentBracket}
                  className="w-full bg-green-500 hover:bg-green-400 text-white font-black text-xl rounded-2xl py-4 transition-all active:scale-95">
                  💾 Save My Bracket!
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