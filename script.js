function $(id) {return document.getElementById(id)};
function c(id) {return document.getElementsByClassName(id)};
function t(id) {return document.getElementsByTagName(id)};

let D = x => {
  return new OmegaNum(x);
}

class Enemy {
  constructor() {
  }
}

//notation
function toFixed(num, dec = 2) {
  if (num.gte(1e6)) {
    let exponent = num.logBase(10).floor()
    let mantissa = toFixed(num.div(OmegaNum.pow(10, exponent)), dec)
    
    return mantissa + "e" + exponent
  }
  return OmegaNum.round(num.times(OmegaNum.pow(10, dec))).div(
    OmegaNum.pow(10, dec)
  ); //I totally didn't copy and paste this from shape incremental/taiko no incremental
}

var lastLoop = new Date();
var fps = 69

const enemyNameArray = ["slime", "goblin", "mini mecha-don", "wolf", "ghost", "witch", "wizard", "mecha-don [BOSS]", "poisonous slime", "snake", "hypnodon plushie", "galaxy don plushie", "time don plushie", "mini mecha-army", "mecha-katsu [BOSS]", "easy demon", "medium demon", "hard demon", "insane demon", "extreme demon", "silent demon [BOSS]", "someone", "dark someone", "hypnotic someone", "electric someone", "time someone", "evil someone", "light someone [BOSS]", "magikarp", "pikachu", "hypno", "kaa",     "raichu", "mewtwo [BOSS]", "sonic.exe", "freddy", "bendy",   "smile dog", "jeff the killer", "slenderman [BOSS]", "crong god"]
var ON = OmegaNum
var game = {
  version: 1.3,
  level: D(1),
  stats: {
    hp: D(10),
    maxhp: D(10),
    atk: D(2),
    def: D(2),
    gold: D(0),
  },
  enemy: { 
    enemyhp:     [D(5),    D(20),    D(100),           D(150), D(666),  D(444),  D(650),    D(1500),           D(800),            D(1000), D(1234),            D(1337),              D(1666),            D(100),            D(3333),              D(2000),      D(3000),        D(4000),      D(5000),        D(6666),         D(13337),              D(7777),   D(8888),        D(10000),           D(11111),           D(12345),       D(13337),       D(22222),               D(15000),   D(17500),  D(22222), D(25000), D(30000), D(100000),       D(66666),    D(77777), D(100000), D(133337),   D(222222),         D(666666),           D("1e69420")],
    enemymaxhp:  [D(5),    D(20),    D(100),           D(150), D(666),  D(444),  D(650),    D(1500),           D(800),            D(1000), D(1234),            D(1337),              D(1666),            D(100),            D(3333),              D(2000),      D(3000),        D(4000),      D(5000),        D(6666),         D(13337),              D(7777),   D(8888),        D(10000),           D(11111),           D(12345),       D(13337),       D(22222),               D(15000),   D(17500),  D(22222), D(25000), D(30000), D(100000),       D(66666),    D(77777), D(100000), D(133337),   D(222222),         D(666666),           D("1e69420")],
    enemyatk:    [D(2),    D(10),    D(15),            D(25),  D(6),    D(44),   D(69),     D(444),            D(350),            D(400),  D(444),             D(456),               D(500),             D(15),             D(666),               D(444),       D(555),         D(666),       D(777),         D(888),          D(1337),               D(1111),   D(1234),        D(1337),            D(1500),            D(1666),        D(2222),        D(3690),                D(10),      D(1337),   D(1500),  D(1750),  D(2000),  D(3333),         D(2222),     D(2500),  D(2666),   D(3000),     D(4444),           D(6666),             D("1e69420")],
    enemydef:    [D(2),    D(8),     D(20),            D(22),  D(6),    D(44),   D(70),     D(500),            D(333),            D(400),  D(500),             D(525),               D(555),             D(20),             D(690),               D(444),       D(555),         D(666),       D(777),         D(888),          D(1337),               D(1111),   D(1234),        D(1337),            D(1500),            D(1666),        D(2222),        D(3333),                D(10),      D(1000),   D(1111),  D(1234),  D(1337),  D(3000),         D(1500),     D(1690),  D(1888),   D(2000),     D(2222),           D(6666),             D("1e69420")],
    enemygold:   [D(3),    D(15),    D(50),            D(123), D(6),    D(1000), D(1500),   D(15000),          D(1234),           D(1500), D(2222),            D(3333),              D(4444),            D(50),             D(66666),             D(444),       D(666),         D(888),       D(1337),        D(2222),         D(133337),             D(2500),   D(3333),        D(3669),            D(4444),            D(5000),        D(6666),        D(222222),              D(10),      D(7777),   D(8888),  D(10000), D(12345), D(400000),       D(6666),     D(10000), D(22222),  D(33333),    D(44444),          D(666666),           D(0)],
    maxamount:   [25,      20,       10,               15,     6,       10,      11,        1,                 10,                8,       9,                  10,                   6,                  40,                1,                    20,           15,             12,           10,             7,               1,                     10,        9,              8,                  7,                  6,              6,              1,                      25,         10,        10,       10,       10,       1,               6,           6,        6,         6,           6,                 1,                   99999999],
    enemyamount: [25,      20,       10,               15,     6,       10,      11,        1,                 10,                8,       9,                  10,                   6,                  40,                1,                    20,           15,             12,           10,             7,               1,                     10,        9,              8,                  7,                  6,              6,              1,                      25,         10,        10,       10,       10,       1,               6,           6,        6,         6,           6,                 1,                   99999999],
    areas: [8, 15, 21, 28, 999],
    currentenemy: 0,
    currentarea: 0},
  xp: D(0),
  xpreq: D(12),
  xpgain: D(1),
  upgcost: D(25),
  upgcost2: D(420),
  upgcost3: D(420),
  autobought: [false, false, false],
  thuamaseeds: {
    seeds: D(0),
    unlocked: false,
    xpreq: D(1),
    energy: D(0),
    sacrificecost: D(100),
    plants: D(0),
    plantseeds: D(0)
  },
  scaredness: {
    scaredness: D(0),
    unlocked: false
  }
} 
var defaults = {
  game: { ...game },
  stats: { ...game.stats },
  enemy: { ...game.enemy },
  enemyamount: { ...game.enemy.enemyamount },
  maxamount: { ...game.enemy.maxamount },
  autobought: { ...game.autobought },
  thuamaseeds: { ...game.thuamaseeds },
  scaredness: { ...game.scaredness }
}
function getNewSave() {
game = defaults.game
game.enemy = defaults.enemy
game.stats = defaults.stats
game.enemy.enemyamount = defaults.enemyamount
game.enemy.maxamount = defaults.maxamount
game.autobought = defaults.autobought
game.thuamaseeds = defaults.thuamaseeds
game.scaredness = defaults.scaredness
location.reload(true)
}
const newstickers = [
  "Have you heard the legend of the Hypno-don plushies? They are plushies that literally hypnotize you. Be careful with them, or else bad things might ha- obey... obey... get more plushies... @_@", 
  "Welcome to the news ticker, today the news is that your mom died.", 
  "<img src='https://cdn.glitch.com/c8447321-842e-463c-8dc4-cb9a8367cc64%2Fblurpdon.png?v=1591238336718' style='width:30px;height:20px;'> blurp",
  "<img src='https://cdn.glitch.com/c8447321-842e-463c-8dc4-cb9a8367cc64%2Fblypnodon.png?v=1592421140650' style='width:30px;height:20px;'> blyp", 
  "If you think blurpdon sucks, don't play this game", 
  "The FitnessBlurp™ Pacer Test is a multistage aerobic blurp test that progressively gets more difficult as it blurps. The blurp test will begin in 30 blurps. Blurp up at the blurp. The blurping speed starts slowly, but gets faster each blurp after you hear this signal. [blurp] A single blurp should be completed each time you hear this blurp. [blyp] Remember to blurp in a straight blurp, and blurp as blurp as blurp. The second time you blyp to complete a blurp before the blurp, your blurp is blurped. The blurp will blurp on the word blurp. On your blurp, get blurpy, blurp.",
  "Hypnodon: omae wa mou shinderu Galaxy-don: NANI!?",
  "Why is there so much deep and complicated lore? well its not my fault that waidat exists -johnathantbg",
  "Fun fact: This isn't canon to any other thing, it's by itself", //just saying that cuz other people are gonna be like OOoOOoOO BLURPDON IS EVIL!!!111
  "ALRIGHT GUYS WE ARE GOING TO FIGHT A CRONG GOD AT 3AM MAKE SURE TO SUB AND LIKE BECAUSE THIS BAD BOI HAS 1E69420 HP!",
  "I'm totally the best ticker",
  "Records show the 9th Dimension is in True Infinity",
  "Type 'wipeSave()' in the console and see what it returns. You can also do 'localStorage.clear()' to get the same effect. Totally not a scam!",
  "Hypnodon plushies: Tera-hypnotizing since May 20, 2020, Omegomega-hypnotizing since May 21, 2020.",
  "There were 3 magic elements. Hypnosis, Galaxy, and Time. The blurpdon decided to try to become one with the elements. He searched and searched for any sensation of the elements, but never got luck. Until one day, he found the 3 dons of the elements. Hypno-don, Galaxy-don, and Time-don. He decided to join their team, becoming the water element. Also, he still says blurp to this day.",
  "Once upon a time, there was a castle in a village, and 2 people went to the castle. In the castle, there was a video there. In the video, there was a castle in a village, and 2 people went to the castle. In the castle, there was a video there. In the video, there was a castle in a village, and 2 people went to the castle. In the castle, there was a video there. In the video, wait hold up isn't this an infinite loop?",
  "I put all my midis in a .7z file, now I am dead",
  "God, I can't fricking stare at blypnodon for 10 seconds without smiling! -JohnathanTBG",
  "The Aarexese Aarexeseness in the Aarexese ticker of Aarex is an Aarexese ticker that was made with Aarex sauce",
  "can i be on the news -Yahtzee Master",
  "",
  "I'm so tired...zzz... I just fell asleep in the middle of coding BI didn't I...zzz...",
  "Look into my eyes... @w@ go to sleep... let us plushies kill you...",
  "Once upon a time, there was a guy named johnathan the bigtime gamer. He sucked at taiko when he first played it, but he has fc'd 2 10 stars now.",
  "Stop playing this stupidity lol",
  "It has been told that the blypnodons are good at making you smile. They're so cute you can't (usually) stare at them for 10 seconds without smiling. This could be bad, as what if they are hypnotizing you without you knowing?",
  "I'm tired again... uh... why is there a hypnodon plush... 'Go to sleep...' wha... zzz...zzzzzzzzz...NO WAKE THE F*CK U- no, go to sleep...hehehe...NO!!!",
  "I've seen some weird things before, and that blurple drum looking guy? What even is that??",
  "ew wuantum ripoff #3 -Yahtzee Master",
  "go commit smile mkey -basically everyone in the WAID server on like may 21 2020",
  "We are introucing a new thing called Aarex Sauce! It spices up your sentences by using Aarexese! Side effects include like 10 people calling you out for speaking Aarexese.",
  "Who is this guy that keeps putting magic in my custom WAID plushies?",
  "These seeds are NOT normal.",
  "This is an example news ti- wait isn't this going in BI now?",
  "<big class='thuamacolor'>This text is green, and also big</big>",
  "This ticker has a 1/42 chance of appearing",
  "Since when did seeds have energy? :thonk:",
  "crong",
  "naywnaah -Fishydids",
  "thats a terrible joke",
  "This is a legend of a farmer... or something like that. He was going to the shop for some seeds to grow stuff, but he found seeds called 'Thuamaseeds'. He decided that was interesting, so he bought them. He ended up planting thuamaplants, then blurpdon saw those and came up to the farmer, 'Can I have those?' 'No, sorry.' F to pay respecc to blurpdon",
  "The answer to everything is the number of this ticker"
]

setInterval(() => {$("news").innerHTML = newstickers[Math.floor(Math.random()*newstickers.length)]}, 21337)
var i = 0
function initstats() {
    var elem = $("xpbar");
        elem.style.width = game.xp.div(game.xpreq).mul(100).toNumber() + "%";
        elem.innerHTML = "Lv" + game.level + "<br>" + toFixed(game.xp) + "/" + toFixed(game.xpreq) + "<br>(" + game.xp.div(game.xpreq).mul(100).floor().toNumber() + "%)"
    var elem2 = $("hpbar");
    var elem3 = $("progress2");
elem2.style.width = game.stats.hp.div(game.stats.maxhp).mul(100).toNumber() + "%";
        if ((game.stats.hp.div(game.stats.maxhp).mul(100).floor().toNumber() > 33)) elem2.innerHTML = toFixed(game.stats.hp) + "/" + toFixed(game.stats.maxhp) + " HP (" + toFixed(game.stats.hp.div(game.stats.maxhp).mul(100), 1) + "%)"
else elem2.innerHTML = toFixed(game.stats.hp)
if ((game.stats.hp.div(game.stats.maxhp).mul(100).floor().toNumber() > 50)) {elem2.style.backgroundColor = "#10C322"; elem2.style.color = "#BBFFBB"}
else if ((game.stats.hp.div(game.stats.maxhp).mul(100).floor().toNumber() > 25)) {elem2.style.backgroundColor = "#D6D600"; elem2.style.color = "#FFFFBB"}
else {elem2.style.backgroundColor = "#EE0000"; elem2.style.color = "#FFBBBB"}
  if (game.xp.gte(game.xpreq)) {
    game.xp = D(0);
    game.level = game.level.add(1);
    game.stats.maxhp = game.stats.maxhp.mul(1.7420).round();
    game.stats.hp = game.stats.maxhp;
    game.stats.atk = game.stats.atk.mul(1.742069).round();
    game.stats.def = game.stats.def.mul(1.666).round();
  }
      }
function init() {
  var regame=game;
load();
Object.assign(regame,game);
game = regame;
  setInterval(initstats, 50);
  setInterval(updateThings, 50);
  setInterval(save, 1000) //save() is in saving.js
  setInterval(fpstext, 1000)
  if (game.autobought[0] == true) {setInterval(gainxp, 20)
  $("auto").innerHTML = "Automatically gain XP 50 times /sec. [Bought!]"}
  if (game.autobought[1] == true) {setInterval(attack, 20)
$("auto2").innerHTML = "Automatically attack 50 times /sec. [Bought!]"}
  if (game.autobought[2] == true) {setInterval(heal, 50)
$("auto3").innerHTML = "Automatically heal 1% of your max HP /sec. [Bought!]"}
  
  // resets enemies if version clashes
  if (defaults.game.version != game.version) game.enemy = {...defaults.enemy}; game.autobought = [false, false, false]; game.upgcost = D(25); game.upgcost2 = D(420); game.upgcost3 = D(420); game.thuamaseeds = {...defaults.thuamaseeds};
}
function updateEnemyText() {
  game.enemy.enemies.forEach(e => {e.updateEnemyText()})
}

init();

function gainxp() {
  game.xp = game.xp.add(game.xpgain)
}

function updateThings() {
  $("stats").innerHTML = "ATK: " + toFixed(game.stats.atk) + "<br>DEF: " + toFixed(game.stats.def) + "<br>GOLD: " + toFixed(game.stats.gold)
  $("xpbutton").innerHTML = "Gain " + toFixed(game.xpgain) + " XP"
  $("enemytext").innerHTML = "(Area " + (game.enemy.currentarea + 1) + ") You are fighting a(n) " + enemyNameArray[game.enemy.currentenemy] + " with " + toFixed(game.enemy.enemyhp[game.enemy.currentenemy]) + " HP, " + toFixed(game.enemy.enemyatk[game.enemy.currentenemy]) + " ATK, and " + toFixed(game.enemy.enemydef[game.enemy.currentenemy]) + " DEF." + " (" + game.enemy.enemyamount[game.enemy.currentenemy] + " left.)"
  $("upgradexp").innerHTML = "Upgrade XP gain by x4 for " + toFixed(game.upgcost) + " gold."
  $("upgradeatk").innerHTML = "Upgrade ATK by x2 for " + toFixed(game.upgcost2) + " gold."
  $("upgradedef").innerHTML = "Upgrade DEF by x1.5 for " + toFixed(game.upgcost3) + " gold."
  $("thuamaseedtext").innerHTML = "<big>You have <big class='thuamacolor'>" + toFixed(game.thuamaseeds.seeds) + "</big>+<big class='thuamacolor'>" + toFixed(game.thuamaseeds.plantseeds) + "</big> thuamaseeds, dividing XP requirement by <big class='thuamacolor'>" + toFixed(game.thuamaseeds.seeds.plus(game.thuamaseeds.plantseeds).plus(2).logBase(2), 3) + "</big> and producing <big class='thuamacolor'>" + toFixed(game.thuamaseeds.seeds.plus(game.thuamaseeds.plantseeds).div(5)) + "</big> thuamaseed energy per second.</big>"
  $("thuamaseedbutton").innerHTML = "Gain a thuamaseed for " + toFixed(game.thuamaseeds.xpreq) + " XP."
  $("thuamaseedenergytext").innerHTML = "You have <big class='thuamacolor'>" + toFixed(game.thuamaseeds.energy) + "</big> thuamaseed energy, dividing XP needed for thuamaseeds by <big class='thuamacolor'>" + toFixed(game.thuamaseeds.energy.plus(5).logBase(5), 3) + "</big>."
  $("sacrificeseedbutton").innerHTML = "Sacrifice a seed and " + toFixed(game.thuamaseeds.sacrificecost) + " energy but divide the XP upgrade cost by 2"
  $("thuamaplanttext").innerHTML = "<big>You have <big class='thuamacolor'>" + toFixed(game.thuamaseeds.plants) + "</big> thuamaplants, gaining <big class='thuamacolor'>" + toFixed(game.thuamaseeds.plants.mul(3)) + "</big> thuamaseeds per minute.</big>"
  if (game.enemy.currentenemy >= 15) game.thuamaseeds.unlocked = true
  if (game.thuamaseeds.unlocked == true) $("thuamaseedsbutton").style.display = "inline"
  else $("thuamaseedsbutton").style.display = "none"
  if (game.enemy.currentarea >= 5) game.scaredness.unlocked = true
  if (game.scaredness.unlocked == true) $("scarednessbutton").style.display = "inline"
  else $("scarednessbutton").style.display = "none"
    
  if (game.enemy.enemyhp[game.enemy.currentenemy].gt(game.enemy.enemymaxhp[game.enemy.currentenemy])) {
    game.enemy.enemyhp[game.enemy.currentenemy] = game.enemy.enemymaxhp[game.enemy.currentenemy]
  } 
  if (game.enemy.enemyamount[game.enemy.currentenemy] > (game.enemy.maxamount[game.enemy.currentenemy])) {
    game.enemy.enemyamount[game.enemy.currentenemy] = game.enemy.maxamount[game.enemy.currentenemy]
  }
  game.xpreq = (ON.pow(6, game.level).mul(2)).div(game.thuamaseeds.seeds.plus(game.thuamaseeds.plantseeds).plus(2).logBase(2)).round()
  if (game.enemy.currentenemy >= game.enemy.areas[game.enemy.currentarea]) {
    game.enemy.currentarea += 1
  }
  
  game.thuamaseeds.energy = game.thuamaseeds.energy.add(game.thuamaseeds.seeds.plus(game.thuamaseeds.plantseeds).div(250))
  game.thuamaseeds.xpreq = ON.pow(2, game.thuamaseeds.seeds.minus(1).add(game.thuamaseeds.plants.mul(7))).div(game.thuamaseeds.energy.plus(11).logBase(11)).ceil()
  game.thuamaseeds.plantseeds = game.thuamaseeds.plantseeds.plus(game.thuamaseeds.plants.mul(3).div(3000))
  
    var thisLoop = new Date();
fps = 1000 / (thisLoop - lastLoop);
  lastLoop = thisLoop
}

function fpstext() {
  $("fpstext").innerHTML = Math.floor(fps) + " FPS"
}

function attack() {
  game.enemy.enemyhp[game.enemy.currentenemy] = game.enemy.enemyhp[game.enemy.currentenemy].sub(game.stats.atk.div(game.enemy.enemydef[game.enemy.currentenemy]).ceil())
  game.stats.hp = game.stats.hp.sub(game.enemy.enemyatk[game.enemy.currentenemy].div(game.stats.def).round())
  if (game.enemy.enemyhp[game.enemy.currentenemy].lte(0)) {
    game.enemy.enemyamount[game.enemy.currentenemy] -= 1
    game.stats.gold = game.stats.gold.add(game.enemy.enemygold[game.enemy.currentenemy])
    game.enemy.enemyhp[game.enemy.currentenemy] = game.enemy.enemymaxhp[game.enemy.currentenemy]
    if (game.enemy.enemyamount[game.enemy.currentenemy] <= 0) {
      game.enemy.currentenemy += 1
      game.enemy.enemyhp[game.enemy.currentenemy] = game.enemy.enemymaxhp[game.enemy.currentenemy]
    }
  }
  if (game.stats.hp.lte(0)) {
    game.stats.hp = game.stats.maxhp
    game.stats.gold = game.stats.gold.div(2).floor()
    if (game.enemy.currentenemy >= 1) {
      game.enemy.currentenemy -= 1
      game.enemy.enemyamount[game.enemy.currentenemy] = game.enemy.maxamount[game.enemy.currentenemy]
    } 
  }
}

function upgradexp() {
  if (game.stats.gold.gte(game.upgcost)) {
    game.stats.gold = game.stats.gold.minus(game.upgcost)
    game.upgcost = game.upgcost.mul(2.5).round()
    game.xpgain = game.xpgain.mul(4)
  }
}

function upgradeatk() {
  if (game.stats.gold.gte(game.upgcost2)) {
    game.stats.gold = game.stats.gold.minus(game.upgcost2)
    game.upgcost2 = game.upgcost2.mul(5).round()
    game.stats.atk = game.stats.atk.mul(2)
  }
}
function upgradedef() {
  if (game.stats.gold.gte(game.upgcost3)) {
    game.stats.gold = game.stats.gold.minus(game.upgcost3)
    game.upgcost3 = game.upgcost3.mul(6.9420).round()
    game.stats.def = game.stats.def.mul(1.5)
  }
}

function switchTab(tab) {
  Array.from(c("tabs")).forEach(e => {e.style.display = "none"}); // i'm the code condenser
  $(tab).style.display = "block";
}

function switchSubtab(tab) {
  let subtabs = ["areaSubtab", "shopSubtab", "thuamaseedsSubtab", "thuamaplantsSubtab", "thuamaseedsInfoSubtab"];

  for (let i = 0; i < subtabs.length; i++) {
    $(subtabs[i]).style.display = "none";
  }

  $(tab).style.display = "block";
}

switchTab('blurpDon')
switchSubtab('areaSubtab')

function buyauto(n, cost) {
  if (game.stats.gold.gte(cost) && game.autobought[n] == false) {
    if (n == 0) $("auto").innerHTML = "Automatically gain XP 50 times /sec. [Bought!]"
    else if (n == 1) $("auto2").innerHTML = "Automatically attack 50 times /sec. [Bought!]"
	else $("auto3").innerHTML = "Automatically heal 1% of your max HP /sec. [Bought!]"
    game.autobought[n] = true
    if(n == 0) setInterval(gainxp, 20)
    else if (n == 1) setInterval(attack, 20)
    else setInterval(heal, 50)
  }
}

function exportthing() {
  $("save").innerHTML = exportSave()
}

function importthing() {
  var save = prompt("Import your save here")
  importSave(save)
}

function gainseed() {
  if (game.xp.gte(game.thuamaseeds.xpreq)) {
    game.thuamaseeds.seeds = game.thuamaseeds.seeds.add(1)
    game.xp = game.xp.minus(game.thuamaseeds.xpreq)
  }
}

function sacrificeseed() {
  if (game.thuamaseeds.seeds.gte(1) && game.thuamaseeds.energy.gte(game.thuamaseeds.sacrificecost)) {
    game.thuamaseeds.seeds = game.thuamaseeds.seeds.sub(1)
    game.thuamaseeds.energy = game.thuamaseeds.energy.sub(game.thuamaseeds.sacrificecost)
    game.thuamaseeds.sacrificecost = game.thuamaseeds.sacrificecost.mul(2.5).ceiling()
    game.upgcost = game.upgcost.div(2).ceiling()
  }
}

function gainplant() {
  if (game.thuamaseeds.seeds.gte(42)) {
   game.thuamaseeds.seeds = game.thuamaseeds.seeds.sub(42)
   game.thuamaseeds.plants = game.thuamaseeds.plants.add(1)
  }
}

function heal() {
	if (game.stats.hp.lt(game.stats.maxhp)) game.stats.hp = game.stats.hp.add(game.stats.maxhp.div(2000)).floor()
	else game.stats.hp = game.stats.maxhp
}





