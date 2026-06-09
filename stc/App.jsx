import { useState, useEffect, useCallback } from "react";

// ── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  en: {
    appTitle: "Family Bracket",
    appSubtitle: "FIFA World Cup 2026",
    langBtn: "🇪🇸 Español",
    // Room screen
    enterRoomCode: "Enter Your Room Code",
    roomHint: "Each group has its own private room. Create one or join an existing one.",
    roomPlaceholder: "e.g. FAMILY2026",
    joinRoom: "🚪 Join Room",
    createRoom: "✨ Create Room",
    tip1: "💡 Share the same code with your group",
    tip2: "🔒 Different code = different private pool",
    tip3Family: "👨‍👩‍👧‍👦 Family uses",
    tip3Friends: "👯 Friends use",
    // Nav
    home: "Home", leaderboard: "Leaderboard", admin: "Admin", switchRoom: "Switch room",
    // Home
    room: "Room",
    fillBracket: "Fill My Bracket",
    bracketsInRoom: "Brackets in this room",
    inviteTitle: "📱 Invite to this room",
    inviteDesc: "Share the link + your room code with your group.",
    inviteNote: "Only people with this code can see this leaderboard.",
    copyBtn: "📋 Copy",
    copiedMsg: "📋 Copied link + code!",
    scoringTitle: "🎯 Scoring",
    scoringGroup: "Group picks:",
    scoring3rd: "3rd place pick:",
    scoringR32: "Round of 32:",
    scoringR16: "Round of 16:",
    scoringQF: "Quarter-final:",
    scoringSF: "Semi-final:",
    scoringChamp: "Champion:",
    // Fill steps
    stepName: "What's your name?",
    stepNameSub: "So everyone knows whose bracket this is!",
    stepNamePlaceholder: "e.g. Dad, Emma, Uncle Carlos…",
    nextGroups: "Next: Pick Groups →",
    stepGroups: "⚽ Group Stage",
    stepGroupsSub: "Pick 1st and 2nd place in each group",
    groupsDone: "done",
    fillGroupsFirst: "Fill all 12 groups first",
    nextThirds: "Next: Pick Best 3rd Place Teams →",
    pick1st: "Pick 1st", pick2nd: "Pick 2nd",
    hideMatches: "Hide", showMatches: "📅 Matches",
    // Thirds step
    stepThirds: "3rd Place Teams",
    stepThirdsSub: "Pick which team finishes 3rd in each group (from the 2 remaining teams).",
    stepThirdsRank: "Rank the 3rd Place Teams",
    stepThirdsRankSub: "Drag or tap ▲▼ to rank all 12 from best to worst. The top 8 advance to the Round of 32.",
    selected: "Selected",
    advances: "✓ Advances",
    groupsDoneThirds: "done",
    nextRank: "Next: Rank Them →",
    nextR32: "Next: Round of 32 →",
    pickMore: "Pick more teams",
    rankLabel: "Rank",
    advancesTop8: "Advances (Top 8)",
    eliminated: "Eliminated",
    tapToPickThird: "Tap to pick 3rd place",
    // Knockout rounds
    pickWinner: "Pick the winner of each match",
    roundOf32: "Round of 32",
    r32Dates: "Jun 28 – Jul 3",
    nextR16: "Next: Round of 16 →",
    pickAll16: "Pick all 16 winners",
    roundOf16: "Round of 16",
    r16Dates: "Jul 4 – 7",
    nextQF: "Next: Quarter-Finals →",
    pickAll8: "Pick all 8 winners",
    quarterFinals: "Quarter-Finals",
    qfDates: "Jul 9 – 11",
    nextSF: "Next: Semi-Finals →",
    pickAll4: "Pick all 4 winners",
    semiFinals: "Semi-Finals",
    sfDates: "Jul 14 – 15",
    nextFinal: "Next: The Final →",
    pickBoth: "Pick both finalists",
    theFinal: "The Final",
    finalDate: "Jul 19 · MetLife Stadium, New York/NJ",
    worldFinal: "World Cup Final",
    worldChampion: "'s World Champion",
    saveBracket: "💾 Save My Bracket!",
    pickChampFirst: "Pick the Champion first",
    // Progress bar back btn
    back: "← Back",
    // Leaderboard
    leaderboardTitle: "🏆 Leaderboard",
    noBrackets: "No brackets yet! Be the first to fill one.",
    fillFirst: "Fill My Bracket",
    picked: "Picked:",
    pts: "pts",
    edit: "Edit",
    addBracket: "✏️ Add Another Bracket",
    // Admin
    adminTitle: "Admin",
    adminEnter: "Enter the admin code for room",
    adminPlaceholder: "Admin code…",
    unlock: "Unlock",
    wrongCode: "Wrong code!",
    adminCodeLabel: "Admin code for this room:",
    adminSave: "Save this — it's only shown here.",
    adminUnlocked: "✅ Admin unlocked",
    manageBrackets: "🗑️ Manage Brackets",
    noBracketsYet: "No brackets yet.",
    remove: "Remove",
    bracketRemoved: "Bracket removed",
    resetRoom: "🔄 Reset Room",
    resetDesc: "Deletes ALL brackets in",
    resetBtn: "🗑️ Reset All Brackets",
    resetConfirm: "Delete all brackets in room",
    roomReset: "Room reset!",
    bracketSaved: "🎉 Bracket saved!",
    match: "Match",
    waitingPicks: "Waiting for group picks…",
    sfMatch: "Semi-Final",
    qfMatch: "QF Match",
  },
  es: {
    appTitle: "Bracket Familiar",
    appSubtitle: "Copa Mundial FIFA 2026",
    langBtn: "🇺🇸 English",
    // Room screen
    enterRoomCode: "Ingresa tu Código de Sala",
    roomHint: "Cada grupo tiene su sala privada. ¡Crea una o únete a una existente!",
    roomPlaceholder: "ej. FAMILIA2026",
    joinRoom: "🚪 Entrar a la Sala",
    createRoom: "✨ Crear Sala",
    tip1: "💡 Comparte el mismo código con tu grupo",
    tip2: "🔒 Código diferente = grupo privado diferente",
    tip3Family: "👨‍👩‍👧‍👦 Familia usa",
    tip3Friends: "👯 Amigos usan",
    // Nav
    home: "Inicio", leaderboard: "Tabla", admin: "Admin", switchRoom: "Cambiar sala",
    // Home
    room: "Sala",
    fillBracket: "Llenar mi Bracket",
    bracketsInRoom: "Brackets en esta sala",
    inviteTitle: "📱 Invitar a esta sala",
    inviteDesc: "Comparte el enlace + el código con tu grupo.",
    inviteNote: "Solo quienes tengan el código verán esta tabla.",
    copyBtn: "📋 Copiar",
    copiedMsg: "📋 ¡Enlace y código copiados!",
    scoringTitle: "🎯 Puntuación",
    scoringGroup: "Picks de grupos:",
    scoring3rd: "Pick 3er lugar:",
    scoringR32: "Ronda de 32:",
    scoringR16: "Ronda de 16:",
    scoringQF: "Cuartos de final:",
    scoringSF: "Semifinal:",
    scoringChamp: "Campeón:",
    // Fill steps
    stepName: "¿Cuál es tu nombre?",
    stepNameSub: "¡Para que todos sepan de quién es el bracket!",
    stepNamePlaceholder: "ej. Papá, Emma, Tío Carlos…",
    nextGroups: "Siguiente: Elegir Grupos →",
    stepGroups: "⚽ Fase de Grupos",
    stepGroupsSub: "Elige el 1.° y 2.° lugar en cada grupo",
    groupsDone: "listos",
    fillGroupsFirst: "Completa los 12 grupos primero",
    nextThirds: "Siguiente: Mejores 3ros Lugares →",
    pick1st: "Elige 1.°", pick2nd: "Elige 2.°",
    hideMatches: "Ocultar", showMatches: "📅 Partidos",
    // Thirds step
    stepThirds: "Equipos en 3er Lugar",
    stepThirdsSub: "Elige qué equipo queda en 3er lugar en cada grupo (entre los 2 equipos restantes).",
    stepThirdsRank: "Clasifica los 3ros Lugares",
    stepThirdsRankSub: "Arrastra o usa ▲▼ para ordenar los 12 de mejor a peor. Los 8 mejores avanzan a la Ronda de 32.",
    selected: "Seleccionados",
    advances: "✓ Avanza",
    groupsDoneThirds: "listos",
    nextRank: "Siguiente: Clasificarlos →",
    nextR32: "Siguiente: Ronda de 32 →",
    pickMore: "Elige más equipos",
    rankLabel: "Pos.",
    advancesTop8: "Avanza (Top 8)",
    eliminated: "Eliminado",
    tapToPickThird: "Toca para elegir 3er lugar",
    // Knockout rounds
    pickWinner: "Elige al ganador de cada partido",
    roundOf32: "Ronda de 32",
    r32Dates: "28 Jun – 3 Jul",
    nextR16: "Siguiente: Ronda de 16 →",
    pickAll16: "Elige los 16 ganadores",
    roundOf16: "Ronda de 16",
    r16Dates: "4 – 7 Jul",
    nextQF: "Siguiente: Cuartos de Final →",
    pickAll8: "Elige los 8 ganadores",
    quarterFinals: "Cuartos de Final",
    qfDates: "9 – 11 Jul",
    nextSF: "Siguiente: Semifinales →",
    pickAll4: "Elige los 4 ganadores",
    semiFinals: "Semifinales",
    sfDates: "14 – 15 Jul",
    nextFinal: "Siguiente: La Final →",
    pickBoth: "Elige a los 2 finalistas",
    theFinal: "La Final",
    finalDate: "19 Jul · Estadio MetLife, Nueva York/NJ",
    worldFinal: "Final del Mundial",
    worldChampion: " es el Campeón del Mundo",
    saveBracket: "💾 ¡Guardar mi Bracket!",
    pickChampFirst: "Primero elige al campeón",
    // Progress bar back btn
    back: "← Atrás",
    // Leaderboard
    leaderboardTitle: "🏆 Tabla de Posiciones",
    noBrackets: "¡Aún no hay brackets! Sé el primero en llenar uno.",
    fillFirst: "Llenar mi Bracket",
    picked: "Eligió:",
    pts: "pts",
    edit: "Editar",
    addBracket: "✏️ Agregar otro Bracket",
    // Admin
    adminTitle: "Admin",
    adminEnter: "Ingresa el código admin para la sala",
    adminPlaceholder: "Código admin…",
    unlock: "Desbloquear",
    wrongCode: "¡Código incorrecto!",
    adminCodeLabel: "Código admin de esta sala:",
    adminSave: "Guárdalo — solo se muestra aquí.",
    adminUnlocked: "✅ Admin desbloqueado",
    manageBrackets: "🗑️ Administrar Brackets",
    noBracketsYet: "Aún no hay brackets.",
    remove: "Eliminar",
    bracketRemoved: "Bracket eliminado",
    resetRoom: "🔄 Reiniciar Sala",
    resetDesc: "¡Elimina TODOS los brackets en",
    resetBtn: "🗑️ Reiniciar todos los Brackets",
    resetConfirm: "¿Eliminar todos los brackets en la sala",
    roomReset: "¡Sala reiniciada!",
    bracketSaved: "🎉 ¡Bracket guardado!",
    match: "Partido",
    waitingPicks: "Esperando picks de grupos…",
    sfMatch: "Semifinal",
    qfMatch: "Cuartos",
  },
};


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
      {f:"🇧🇷",n:"Brazil"},{f:"🇲🇦",n:"Morocco"},{f:"🇭🇹",n:"Haiti"},{f:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",n:"Scotland"}],
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
      {f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",n:"England"},{f:"🇭🇷",n:"Croatia"},{f:"🇬🇭",n:"Ghana"},{f:"🇵🇦",n:"Panama"}],
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
  const thirdGroupPicks = {};
  Object.keys(REAL_GROUPS).forEach(k => { thirdGroupPicks[k] = null; });
  return {
    name: "",
    champion: null,
    groups,
    thirdGroupPicks, // which team finishes 3rd in each group (user picks from 2 remaining)
    thirdPicks: [], // ranked list top 8 advance to R32 (ordered best to worst)
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

function GroupCard({ groupKey, group, picks, onChange, t }) {
  const [showSchedule, setShowSchedule] = useState(false);
  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="bg-yellow-400 text-gray-900 font-black text-lg w-8 h-8 rounded-full flex items-center justify-center">
            {groupKey}
          </span>
          <span className="text-white/60 text-sm">{t.stepGroupsSub.slice(0,20)}</span>
        </div>
        <button onClick={() => setShowSchedule(s => !s)}
          className="text-xs text-blue-300 border border-blue-400/30 rounded-lg px-2 py-1 hover:bg-blue-400/10 transition-all">
          {showSchedule ? (t ? t.hideMatches : "Hide") : (t ? t.showMatches : "📅 Matches")}
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
            {picks&&picks[0]===t.n && <span className="ml-auto text-xs font-black">{t ? "1°" : "1st"}</span>}
            {picks&&picks[1]===t.n && <span className="ml-auto text-xs font-black text-green-300">{t ? "2°" : "2nd"}</span>}
          </button>
        ))}
      </div>
      <div className="flex gap-2 text-xs">
        <div className="flex items-center gap-1 text-yellow-400"><span>🥇</span>{picks&&picks[0]||(t?t.pick1st:"Pick 1st")}</div>
        <div className="flex items-center gap-1 text-green-400 ml-4"><span>🥈</span>{picks&&picks[1]||(t?t.pick2nd:"Pick 2nd")}</div>
      </div>
    </div>
  );
}

function KnockoutPick({ label, teamA, teamB, winner, onPick, date, city, t }) {
  if (!teamA && !teamB) return (
    <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-white/30 text-xs text-center">
      {label}<br/>{t ? t.waitingPicks : 'Waiting for group picks…'}
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
  // Language
  const [lang, setLang] = useState("en");
  const t = T[lang];
  const toggleLang = () => setLang(l => l === "en" ? "es" : "en");

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
              {t.appTitle}
            </h1>
            <p className="text-yellow-400 font-bold">{t.appSubtitle}</p>
          </div>

          <div className="w-full bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 space-y-5">
            <div className="flex justify-end">
              <button onClick={toggleLang}
                className="text-xs font-bold text-white/60 border border-white/20 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-all">
                {t.langBtn}
              </button>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔑</div>
              <h2 className="text-white text-xl font-black">{t.enterRoomCode}</h2>
              <p className="text-white/50 text-sm mt-1">{t.roomHint}</p>
            </div>

            <input
              type="text"
              placeholder={t.roomPlaceholder}
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
              {roomInput && loadRoom(roomInput.toUpperCase()) ? t.joinRoom : t.createRoom}
            </button>

            <div className="border-t border-white/10 pt-4 space-y-2 text-sm text-white/40 text-center">
              <p>{t.tip1}</p>
              <p>{t.tip2}</p>
              <p>{t.tip3Family} <span className="text-white/60 font-bold">FAMILY2026</span></p>
              <p>{t.tip3Friends} <span className="text-white/60 font-bold">FRIENDS2026</span></p>
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
    showToast(t.bracketSaved);
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
    /**
     * SMART R32 BRACKET GENERATOR
     * 24 teams advance: 12 Winners (W), 12 Runners-up (R), 8 best 3rds (T)
     * Rules:
     * 1. 3rd-place teams NEVER play each other
     * 2. Prefer W vs T for all 8 slots involving 3rd-place teams
     * 3. Avoid same-group rematches
     * 4. Use rank order T[0]=best, T[7]=worst
     * 5. Fill remaining slots with W vs R cross-group
     * 6. Fallback to R vs R only if no W available
     * 7. Deterministic: same input = same bracket
     */
    const gKeys = Object.keys(REAL_GROUPS);
    const W = gKeys.map(k => currentBracket.groups[k][0] || null);
    const R = gKeys.map(k => currentBracket.groups[k][1] || null);
    const T = (currentBracket.thirdPicks || []).slice(0, 8);

    // Map team name -> group index for rematch detection
    const groupOf = {};
    gKeys.forEach((k, i) => {
      if (W[i]) groupOf[W[i]] = i;
      if (R[i]) groupOf[R[i]] = i;
    });
    T.forEach(name => {
      const gi = gKeys.findIndex(k => REAL_GROUPS[k].teams.some(t => t.n === name));
      if (gi >= 0) groupOf[name] = gi;
    });

    const sameGroup = (a, b) =>
      a && b &&
      groupOf[a] !== undefined &&
      groupOf[b] !== undefined &&
      groupOf[a] === groupOf[b];

    const usedW = new Set();
    const usedR = new Set();
    const wtMatches = [];
    const wrMatches = [];
    const rrMatches = [];

    // PHASE 1: Pair each T[i] (best first) with an available winner, no same-group
    for (let ti = 0; ti < T.length; ti++) {
      const third = T[ti];
      if (!third) continue;
      let paired = false;
      // First pass: cross-group winner
      for (let wi = 0; wi < W.length; wi++) {
        if (!W[wi] || usedW.has(wi) || sameGroup(W[wi], third)) continue;
        wtMatches.push([W[wi], third]);
        usedW.add(wi);
        paired = true;
        break;
      }
      // Fallback: same-group allowed if no other option
      if (!paired) {
        for (let wi = 0; wi < W.length; wi++) {
          if (!W[wi] || usedW.has(wi)) continue;
          wtMatches.push([W[wi], third]);
          usedW.add(wi);
          break;
        }
      }
    }

    // PHASE 2: Remaining winners paired with cross-group runners-up
    const remainingWIdx = W.map((_, i) => i).filter(i => !usedW.has(i) && W[i]);
    for (const wi of remainingWIdx) {
      let paired = false;
      for (let ri = 0; ri < R.length; ri++) {
        if (!R[ri] || usedR.has(ri) || sameGroup(W[wi], R[ri])) continue;
        wrMatches.push([W[wi], R[ri]]);
        usedR.add(ri);
        paired = true;
        break;
      }
      if (!paired) {
        for (let ri = 0; ri < R.length; ri++) {
          if (!R[ri] || usedR.has(ri)) continue;
          wrMatches.push([W[wi], R[ri]]);
          usedR.add(ri);
          break;
        }
      }
    }

    // PHASE 3: Leftover runners-up vs runners-up (last resort)
    const leftoverR = R.map((_, i) => i).filter(i => !usedR.has(i) && R[i]);
    for (let i = 0; i + 1 < leftoverR.length; i += 2) {
      rrMatches.push([R[leftoverR[i]], R[leftoverR[i + 1]]]);
    }

    // W vs T first (most attractive), then W vs R, then R vs R
    const allMatches = [...wtMatches, ...wrMatches, ...rrMatches];
    while (allMatches.length < 16) allMatches.push([null, null]);
    return allMatches.slice(0, 16);
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
            <button onClick={toggleLang}
              className="px-2 py-1.5 rounded-xl text-xs font-bold text-white/50 hover:text-white hover:bg-white/10 transition-all border border-white/20">
              {lang === "en" ? "🇪🇸" : "🇺🇸"}
            </button>
            {["home","leaderboard","admin"].map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`px-2 py-1.5 rounded-xl text-sm font-bold transition-all
                  ${view===v ? "bg-yellow-400 text-gray-900" : "text-white/60 hover:text-white"}`}>
                {v==="home"?"🏠":v==="leaderboard"?"🏆":"⚙️"}
              </button>
            ))}
            <button onClick={leaveRoom}
              className="ml-1 px-2 py-1.5 rounded-xl text-sm font-bold text-white/40 hover:text-white hover:bg-white/10 transition-all"
              title={t.switchRoom}>
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
              <p className="text-yellow-400 font-bold">{t.appSubtitle}</p>
              <div className="mt-2 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2">
                <span className="text-white/50 text-sm">{t.room}:</span>
                <span className="text-yellow-400 font-black tracking-widest">{roomCode}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={startNewBracket}
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg rounded-2xl p-5 transition-all active:scale-95 shadow-lg flex flex-col items-center gap-2">
                <span className="text-3xl">✏️</span>
                {t.fillBracket}
              </button>
              <button onClick={() => setView("leaderboard")}
                className="bg-white/10 hover:bg-white/20 text-white font-black text-lg rounded-2xl p-5 transition-all border-2 border-white/20 flex flex-col items-center gap-2">
                <span className="text-3xl">🏆</span>
                {t.leaderboard}
              </button>
            </div>

            {room.brackets.length > 0 && (
              <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                <h3 className="text-white font-black mb-3">👨‍👩‍👧‍👦 {t.bracketsInRoom}</h3>
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
              <h3 className="text-blue-300 font-black mb-2">{t.inviteTitle}</h3>
              <p className="text-white/60 text-sm mb-1">{t.inviteDesc}</p>
              <p className="text-white/40 text-xs mb-3">{t.inviteNote}</p>
              <div className="flex gap-2">
                <div className="flex-1 bg-black/30 rounded-xl px-4 py-3 text-yellow-400 font-black tracking-widest text-center text-lg border border-yellow-400/30">
                  {roomCode}
                </div>
                <button onClick={() => {
                    navigator.clipboard.writeText(`${window.location.href.split("?")[0]} — Room code: ${roomCode}`);
                    showToast(t.copiedMsg);
                  }}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-black rounded-xl px-4 transition-all">
                  {t.copyBtn}
                </button>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="font-bold text-white mb-2">{t.scoringTitle}</div>
              <div className="grid grid-cols-2 gap-1 text-sm text-white/60">
                <div>✅ {t.scoringGroup} <span className="text-yellow-400 font-bold">2 pts</span></div>
                <div>✅ {t.scoring3rd} <span className="text-yellow-400 font-bold">1 pt</span></div>
                <div>✅ {t.scoringR32} <span className="text-yellow-400 font-bold">2 pts</span></div>
                <div>✅ {t.scoringR16} <span className="text-yellow-400 font-bold">4 pts</span></div>
                <div>✅ {t.scoringQF} <span className="text-yellow-400 font-bold">6 pts</span></div>
                <div>✅ {t.scoringSF} <span className="text-yellow-400 font-bold">8 pts</span></div>
                <div>✅ {t.scoringChamp} <span className="text-yellow-400 font-bold">12 pts</span></div>
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
                {["name","groups","thirds","thirdsRank","r32","r16","qf","sf","final"].map((s,i) => (
                  <div key={s} className={`flex-1 h-2 rounded-full transition-all cursor-pointer
                    ${["name","groups","thirds","thirdsRank","r32","r16","qf","sf","final"].indexOf(step) >= i ? "bg-yellow-400" : "bg-white/20"}`}
                    onClick={() => {
                      const order = ["name","groups","thirds","thirdsRank","r32","r16","qf","sf","final"];
                      const curr = order.indexOf(step);
                      if (i < curr) setStep(s);
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <button onClick={() => {
                  const order = ["name","groups","thirds","thirdsRank","r32","r16","qf","sf","final"];
                  const curr = order.indexOf(step);
                  if (curr > 0) setStep(order[curr - 1]);
                }}
                  className={`flex items-center gap-1 text-sm font-bold transition-all
                    ${["name"].includes(step) ? "text-white/20 cursor-not-allowed" : "text-white/60 hover:text-white"}`}
                  disabled={step === "name"}>
                  ← Back
                </button>
                <span className="text-white/40 text-xs capitalize">
                  {step === "r32" ? t.roundOf32 : step === "r16" ? t.roundOf16 : step === "qf" ? t.quarterFinals : step === "sf" ? t.semiFinals : step === "final" ? t.theFinal : step === "thirds" ? t.stepThirds : step === "thirdsRank" ? t.stepThirdsRank : step}
                </span>
                <div className="w-12"/>
              </div>
            </div>

            {step === "name" && (
              <div className="space-y-5">
                <div className="text-center">
                  <div className="text-5xl mb-3">👤</div>
                  <h2 className="text-white text-2xl font-black">{t.stepName}</h2>
                  <p className="text-white/50 text-sm mt-1">{t.stepNameSub}</p>
                </div>
                <input type="text" placeholder="e.g. Dad, Emma, Uncle Carlos…"
                  value={currentBracket.name}
                  onChange={e => setCurrentBracket(b => ({...b, name:e.target.value}))}
                  className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-5 py-4 text-white text-xl font-bold placeholder-white/30 focus:outline-none focus:border-yellow-400 transition-all"
                  maxLength={20}/>
                <button disabled={!currentBracket.name.trim()} onClick={() => setStep("groups")}
                  className="w-full bg-yellow-400 disabled:bg-white/20 disabled:text-white/30 text-gray-900 font-black text-xl rounded-2xl py-4 transition-all active:scale-95">
                  {t.nextGroups}
                </button>
              </div>
            )}

            {step === "groups" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-white text-xl font-black">{t.stepGroups}</h2>
                  <span className="text-white/50 text-sm">
                    {Object.keys(REAL_GROUPS).filter(k=>currentBracket.groups[k][0]&&currentBracket.groups[k][1]).length}/12 done
                  </span>
                </div>
                <p className="text-white/60 text-sm">{t.stepGroupsSub}</p>
                {Object.keys(REAL_GROUPS).map(k => (
                  <GroupCard key={k} groupKey={k} group={REAL_GROUPS[k]}
                    picks={currentBracket.groups[k]}
                    onChange={picks => setCurrentBracket(b => ({...b, groups:{...b.groups,[k]:picks}}))}
                    t={t}/>
                ))}
                <button disabled={!allGroupsFilled} onClick={() => setStep("thirds")}
                  className="w-full bg-yellow-400 disabled:bg-white/20 disabled:text-white/30 text-gray-900 font-black text-xl rounded-2xl py-4 transition-all active:scale-95 sticky bottom-4">
                  {allGroupsFilled ? "Next: Pick Best 3rd Place Teams →" : `Fill all 12 groups first (${Object.keys(REAL_GROUPS).filter(k=>currentBracket.groups[k][0]&&currentBracket.groups[k][1]).length}/12)`}
                </button>
              </div>
            )}

            {/* ── STEP: PICK 3RD PLACE TEAM PER GROUP ── */}
            {step === "thirds" && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">🥉</div>
                  <h2 className="text-white text-xl font-black">{t.stepThirds}</h2>
                  <p className="text-white/60 text-sm mt-1">{t.stepThirdsSub}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center justify-between">
                  <span className="text-white/60 text-sm">{t.selected}</span>
                  <span className={`font-black text-lg ${Object.values(currentBracket.thirdGroupPicks||{}).filter(Boolean).length === 12 ? "text-green-400" : "text-yellow-400"}`}>
                    {Object.values(currentBracket.thirdGroupPicks||{}).filter(Boolean).length} / 12
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {Object.keys(REAL_GROUPS).map(k => {
                    const remaining = REAL_GROUPS[k].teams.filter(team =>
                      team.n !== currentBracket.groups[k][0] && team.n !== currentBracket.groups[k][1]
                    );
                    const groupThirdPick = (currentBracket.thirdGroupPicks||{})[k];
                    return (
                      <div key={k} className="bg-white/10 rounded-xl p-3 border border-white/20">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-yellow-400 text-gray-900 font-black text-sm w-7 h-7 rounded-full flex items-center justify-center">{k}</span>
                          <span className="text-white/50 text-xs">{t.tapToPickThird}</span>
                          {groupThirdPick && <span className="ml-auto text-green-400 text-xs font-bold">✓</span>}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {remaining.map(team => {
                            const isPicked = groupThirdPick === team.n;
                            return (
                              <button key={team.n}
                                onClick={() => setCurrentBracket(b => ({
                                  ...b,
                                  thirdGroupPicks: {
                                    ...(b.thirdGroupPicks||{}),
                                    [k]: isPicked ? null : team.n
                                  }
                                }))}
                                className={`flex items-center gap-2 rounded-lg px-3 py-2 border-2 transition-all text-sm font-bold
                                  ${isPicked
                                    ? "border-yellow-400 bg-yellow-400 text-gray-900"
                                    : "border-white/20 bg-white/5 text-white hover:bg-white/15"}`}>
                                <span className="text-lg">{team.f}</span>
                                <span className="truncate">{team.n}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  disabled={Object.values(currentBracket.thirdGroupPicks||{}).filter(Boolean).length < 12}
                  onClick={() => {
                    // Pre-populate thirdPicks ranking from thirdGroupPicks in group order
                    const allThirds = Object.keys(REAL_GROUPS).map(k => (currentBracket.thirdGroupPicks||{})[k]).filter(Boolean);
                    setCurrentBracket(b => ({ ...b, thirdPicks: allThirds }));
                    setStep("thirdsRank");
                  }}
                  className="w-full bg-yellow-400 disabled:bg-white/20 disabled:text-white/30 text-gray-900 font-black text-xl rounded-2xl py-4 transition-all active:scale-95 sticky bottom-4">
                  {Object.values(currentBracket.thirdGroupPicks||{}).filter(Boolean).length < 12
                    ? `${t.nextRank} (${Object.values(currentBracket.thirdGroupPicks||{}).filter(Boolean).length}/12)`
                    : t.nextRank}
                </button>
              </div>
            )}

            {/* ── STEP: RANK THE 12 THIRD-PLACE TEAMS ── */}
            {step === "thirdsRank" && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <h2 className="text-white text-xl font-black">{t.stepThirdsRank}</h2>
                  <p className="text-white/60 text-sm mt-1">{t.stepThirdsRankSub}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white/50 text-xs text-center">
                  🟢 Positions 1–8 advance · 🔴 Positions 9–12 eliminated
                </div>
                <div className="space-y-2">
                  {(currentBracket.thirdPicks||[]).map((teamName, idx) => {
                    const teamObj = Object.values(REAL_GROUPS).flatMap(g => g.teams).find(x => x.n === teamName);
                    const advances = idx < 8;
                    return (
                      <div key={teamName}
                        className={`flex items-center gap-3 rounded-xl px-3 py-3 border-2 transition-all
                          ${advances ? "border-green-400/40 bg-green-400/10" : "border-red-400/30 bg-red-400/5"}`}>
                        <span className={`font-black text-lg w-8 text-center ${advances ? "text-green-400" : "text-red-400/60"}`}>
                          {idx + 1}
                        </span>
                        <span className="text-xl">{teamObj?.f}</span>
                        <span className={`flex-1 font-bold text-sm ${advances ? "text-white" : "text-white/40"}`}>{teamName}</span>
                        <span className={`text-xs font-bold ${advances ? "text-green-400" : "text-red-400/60"}`}>
                          {advances ? t.advancesTop8 : t.eliminated}
                        </span>
                        <div className="flex flex-col gap-1">
                          <button
                            disabled={idx === 0}
                            onClick={() => {
                              setCurrentBracket(b => {
                                const arr = [...b.thirdPicks];
                                [arr[idx-1], arr[idx]] = [arr[idx], arr[idx-1]];
                                return { ...b, thirdPicks: arr };
                              });
                            }}
                            className="disabled:opacity-20 bg-white/10 hover:bg-white/20 text-white rounded px-2 py-0.5 text-xs font-black transition-all">
                            ▲
                          </button>
                          <button
                            disabled={idx === (currentBracket.thirdPicks||[]).length - 1}
                            onClick={() => {
                              setCurrentBracket(b => {
                                const arr = [...b.thirdPicks];
                                [arr[idx+1], arr[idx]] = [arr[idx], arr[idx+1]];
                                return { ...b, thirdPicks: arr };
                              });
                            }}
                            className="disabled:opacity-20 bg-white/10 hover:bg-white/20 text-white rounded px-2 py-0.5 text-xs font-black transition-all">
                            ▼
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={() => setStep("r32")}
                  className="w-full bg-yellow-400 text-gray-900 font-black text-xl rounded-2xl py-4 transition-all active:scale-95 sticky bottom-4">
                  {t.nextR32}
                </button>
              </div>
            )}

            {/* ── ROUND OF 32 ── */}
            {step === "r32" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-white text-xl font-black">{t.roundOf32}</h2>
                  <span className="text-white/40 text-xs">{t.r32Dates}</span>
                </div>
                <p className="text-white/50 text-sm">{t.pickWinner}</p>
                <div className="grid grid-cols-1 gap-2">
                  {r32Teams.map(([a,b], i) => (
                    <KnockoutPick key={i} label={`${t.match} ${i+1}`}
                      teamA={a} teamB={b}
                      winner={currentBracket.knockout.r32[i]}
                      onPick={t => pickKnockout("r32", i, t)}
                      date={KNOCKOUT_SCHEDULE.r32[i].date}
                      city={KNOCKOUT_SCHEDULE.r32[i].city}
                      t={t}/>
                  ))}
                </div>
                <button
                  disabled={currentBracket.knockout.r32.filter(Boolean).length < 16}
                  onClick={() => setStep("r16")}
                  className="w-full bg-yellow-400 disabled:bg-white/20 disabled:text-white/30 text-gray-900 font-black text-xl rounded-2xl py-4 transition-all active:scale-95 sticky bottom-4">
                  {currentBracket.knockout.r32.filter(Boolean).length < 16
                    ? `${t.pickAll16} (${currentBracket.knockout.r32.filter(Boolean).length}/16)`
                    : "Next: Round of 16 →"}
                </button>
              </div>
            )}

            {/* ── ROUND OF 16 ── */}
            {step === "r16" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-white text-xl font-black">{t.roundOf16}</h2>
                  <span className="text-white/40 text-xs">{t.r16Dates}</span>
                </div>
                <p className="text-white/50 text-sm">Pick the winner of each match</p>
                <div className="grid grid-cols-1 gap-2">
                  {Array.from({length:8},(_,i) => (
                    <KnockoutPick key={i} label={`${t.match} ${i+1}`}
                      teamA={currentBracket.knockout.r32[i*2]||null}
                      teamB={currentBracket.knockout.r32[i*2+1]||null}
                      winner={currentBracket.knockout.r16[i]}
                      onPick={t => pickKnockout("r16", i, t)}
                      date={KNOCKOUT_SCHEDULE.r16[i].date}
                      city={KNOCKOUT_SCHEDULE.r16[i].city}
                      t={t}/>
                  ))}
                </div>
                <button
                  disabled={currentBracket.knockout.r16.filter(Boolean).length < 8}
                  onClick={() => setStep("qf")}
                  className="w-full bg-yellow-400 disabled:bg-white/20 disabled:text-white/30 text-gray-900 font-black text-xl rounded-2xl py-4 transition-all active:scale-95 sticky bottom-4">
                  {currentBracket.knockout.r16.filter(Boolean).length < 8
                    ? `${t.pickAll8} (${currentBracket.knockout.r16.filter(Boolean).length}/8)`
                    : "Next: Quarter-Finals →"}
                </button>
              </div>
            )}

            {/* ── QUARTER-FINALS ── */}
            {step === "qf" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-white text-xl font-black">{t.quarterFinals}</h2>
                  <span className="text-white/40 text-xs">{t.qfDates}</span>
                </div>
                <p className="text-white/50 text-sm">Pick the winner of each match</p>
                <div className="grid grid-cols-1 gap-2">
                  {Array.from({length:4},(_,i) => (
                    <KnockoutPick key={i} label={`${t.qfMatch} ${i+1}`}
                      teamA={currentBracket.knockout.r16[i*2]||null}
                      teamB={currentBracket.knockout.r16[i*2+1]||null}
                      winner={currentBracket.knockout.qf[i]}
                      onPick={t => pickKnockout("qf", i, t)}
                      date={KNOCKOUT_SCHEDULE.qf[i].date}
                      city={KNOCKOUT_SCHEDULE.qf[i].city}
                      t={t}/>
                  ))}
                </div>
                <button
                  disabled={currentBracket.knockout.qf.filter(Boolean).length < 4}
                  onClick={() => setStep("sf")}
                  className="w-full bg-yellow-400 disabled:bg-white/20 disabled:text-white/30 text-gray-900 font-black text-xl rounded-2xl py-4 transition-all active:scale-95 sticky bottom-4">
                  {currentBracket.knockout.qf.filter(Boolean).length < 4
                    ? `${t.pickAll4} (${currentBracket.knockout.qf.filter(Boolean).length}/4)`
                    : "Next: Semi-Finals →"}
                </button>
              </div>
            )}

            {/* ── SEMI-FINALS ── */}
            {step === "sf" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-white text-xl font-black">{t.semiFinals}</h2>
                  <span className="text-white/40 text-xs">{t.sfDates}</span>
                </div>
                <p className="text-white/50 text-sm">Pick the 2 finalists</p>
                <div className="grid grid-cols-1 gap-2">
                  {Array.from({length:2},(_,i) => (
                    <KnockoutPick key={i} label={`${t.sfMatch} ${i+1}`}
                      teamA={currentBracket.knockout.qf[i*2]||null}
                      teamB={currentBracket.knockout.qf[i*2+1]||null}
                      winner={currentBracket.knockout.sf[i]}
                      onPick={t => pickKnockout("sf", i, t)}
                      date={KNOCKOUT_SCHEDULE.sf[i].date}
                      city={KNOCKOUT_SCHEDULE.sf[i].city}
                      t={t}/>
                  ))}
                </div>
                <button
                  disabled={currentBracket.knockout.sf.filter(Boolean).length < 2}
                  onClick={() => setStep("final")}
                  className="w-full bg-yellow-400 disabled:bg-white/20 disabled:text-white/30 text-gray-900 font-black text-xl rounded-2xl py-4 transition-all active:scale-95 sticky bottom-4">
                  {currentBracket.knockout.sf.filter(Boolean).length < 2
                    ? `${t.pickBoth} (${currentBracket.knockout.sf.filter(Boolean).length}/2)`
                    : "Next: The Final →"}
                </button>
              </div>
            )}

            {/* ── THE FINAL ── */}
            {step === "final" && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl mb-2">🏆</div>
                  <h2 className="text-white text-2xl font-black">{t.theFinal}</h2>
                  <p className="text-white/50 text-sm">{t.finalDate}</p>
                </div>
                <KnockoutPick label="World Cup Final"
                  teamA={currentBracket.knockout.sf[0]||null}
                  teamB={currentBracket.knockout.sf[1]||null}
                  winner={currentBracket.champion}
                  onPick={t => { pickKnockout("final", 0, t); setCurrentBracket(b=>({...b,champion:t})); }}
                  date={KNOCKOUT_SCHEDULE.final.date}
                  city={KNOCKOUT_SCHEDULE.final.city}
                      t={t}/>

                {currentBracket.champion && (
                  <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-2xl p-5 text-center space-y-2">
                    <div className="text-4xl">🏆</div>
                    <div className="text-yellow-400 font-black text-lg">{currentBracket.name}{t.worldChampion}</div>
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
              <h2 className="text-white text-2xl font-black">{t.leaderboardTitle}</h2>
              <span className="bg-white/10 border border-white/20 text-white/60 text-xs font-bold px-3 py-1 rounded-xl">
                🔑 {roomCode}
              </span>
            </div>

            {room.brackets.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">📭</div>
                <div className="text-white/60">{t.noBrackets}</div>
                <button onClick={startNewBracket} className="mt-4 bg-yellow-400 text-gray-900 font-black px-6 py-3 rounded-2xl">
                  {t.fillFirst}
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
                            {t.picked} {Object.values(REAL_GROUPS).flatMap(g=>g.teams).find(x=>x.n===b.champion)?.f} {b.champion}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-yellow-400 font-black text-2xl">{b.score}</div>
                        <div className="text-white/40 text-xs">{t.pts}</div>
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
              {t.addBracket}
            </button>
          </div>
        )}

        {/* ── ADMIN ── */}
        {view === "admin" && (
          <div className="space-y-5">
            <h2 className="text-white text-2xl font-black">⚙️ {t.adminTitle} · {roomCode}</h2>
            {!adminUnlocked ? (
              <div className="space-y-4">
                <p className="text-white/60">Enter the admin code for room <span className="text-yellow-400 font-bold">{roomCode}</span>.</p>
                <input value={adminInput} onChange={e=>setAdminInput(e.target.value.toUpperCase())}
                  placeholder="Admin code…" maxLength={8}
                  className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-5 py-4 text-white text-xl font-bold uppercase tracking-widest placeholder-white/30 focus:outline-none focus:border-yellow-400 transition-all text-center"/>
                <button onClick={() => {
                    if (adminInput === room.adminCode) { setAdminUnlocked(true); }
                    else showToast(t.wrongCode, "red");
                  }}
                  className="w-full bg-yellow-400 text-gray-900 font-black rounded-2xl py-4 text-lg">
                  {t.unlock}
                </button>
                <div className="bg-white/5 rounded-2xl p-4 text-white/40 text-sm text-center">
                  {t.adminCodeLabel}<br/>
                  <span className="text-yellow-400 font-bold text-lg tracking-widest">{room.adminCode}</span><br/>
                  <span className="text-white/30 text-xs">Save this — it's only shown here.</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-500/20 border border-green-400/40 rounded-2xl p-4 text-green-300 font-bold">✅ Admin unlocked</div>
                <div className="bg-white/10 rounded-2xl p-4 border border-white/20 space-y-3">
                  <h3 className="text-white font-black">{t.manageBrackets}</h3>
                  {room.brackets.length === 0 && <p className="text-white/40 text-sm">{t.noBracketsYet}</p>}
                  {room.brackets.map((b, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                      <span className="text-white font-bold">{b.name||"Unnamed"}</span>
                      <button onClick={() => {
                          const updated = room.brackets.filter((_,j)=>j!==i);
                          setRoom(r=>({...r,brackets:updated}));
                          showToast(t.bracketRemoved);
                        }}
                        className="bg-red-500/30 hover:bg-red-500/50 text-red-300 rounded-lg px-3 py-1 text-sm font-bold">
                        {t.remove}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="bg-white/10 rounded-2xl p-4 border border-white/20 space-y-3">
                  <h3 className="text-white font-black">{t.resetRoom}</h3>
                  <p className="text-white/50 text-sm">{t.resetDesc} <span className="text-yellow-400">{roomCode}</span>.</p>
                  <button onClick={() => {
                      if (window.confirm(`${t.resetConfirm} ${roomCode}?`)) {
                        setRoom(r=>({...r,brackets:[]}));
                        showToast(t.roomReset);
                      }
                    }}
                    className="w-full bg-red-500/30 hover:bg-red-500/50 text-red-300 font-black rounded-xl py-3">
                    {t.resetBtn}
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
