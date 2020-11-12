function objectToDecimal(object) {
    for (let i in object) {
        if (typeof(object[i]) == "string" && new OmegaNum(object[i]) instanceof OmegaNum && !(new OmegaNum(object[i]).sign == 0 && object[i] != "0")) {
          object[i] = new OmegaNum(object[i]);
        }
        if (typeof(object[i]) == "object") {
            objectToDecimal(object[i]);
        }
    }
}

function merge(base, source) {
    for (let i in base) {
        if (source[i] != undefined) {
            if (typeof(base[i]) == "object" && typeof(source[i]) == "object" && !isDecimal(base[i]) && !isDecimal(source[i])) {
                merge(base[i], source[i]);
            } else {
                if (isDecimal(base[i]) && !isDecimal(source[i])) {
                    base[i] = new OmegaNum(source[i]);
                } else if (!isDecimal(base[i]) && isDecimal(source[i])) {
                    base[i] = source[i].toNumber();
                } else {
                    base[i] = source[i];
                }
            }
        }
    }
}


function isDecimal(x) {
    if (x instanceof OmegaNum) {
        return true;
    } else {
        return false;
    }
}


var savegame;

function save() {
  localStorage.setItem("bis", JSON.stringify(game));
}

function load() {
  if (localStorage.getItem("bis")) {
    savegame = JSON.parse(localStorage.getItem("bis"));
    objectToDecimal(savegame);
    merge(game, savegame);
  }
}

function wipeSave() {
  getNewSave();
  save();
  load();
}

function exportSave() {
  return btoa(JSON.stringify(game));
}

function importSave(text) {
  savegame = JSON.parse(atob(text));
  objectToDecimal(savegame);
  merge(game, savegame);
  
  save();
  if (game.autobought[0] == true) {setInterval(gainxp, 20)
  $("auto").innerHTML = "Automatically gain XP 50 times /sec. [Bought!]"}
  if (game.autobought[1] == true) {setInterval(attack, 20)
$("auto2").innerHTML = "Automatically attack 50 times /sec. [Bought!]"}
  if (game.autobought[2] == true) {setInterval(heal, 50)
$("auto3").innerHTML = "Automatically heal 1% of your max HP /sec. [Bought!]"}
}