import { Levels } from "./level.js";

let myGrid = document.getElementById("grid");
let nextLvl = 1;
let lvl = Levels[nextLvl];
let tab = JSON.parse(JSON.stringify(lvl));
const keys = {
  left: "ArrowLeft",
  right: "ArrowRight",
  up: "ArrowUp",
  down: "ArrowDown",
  z: "z",
  q: "q",
  s: "s",
  d: "d",
};


let personnage = "./assets/klee.gif";

const ganyuButton = document.getElementById("ganyu");
const hutaoButton = document.getElementById("hutao");
const kfcButton = document.getElementById("kfc");
const kleeButton = document.getElementById("klee");
const tartaButton = document.getElementById("tarta");
const yelanButton = document.getElementById("yelan");
const xianglingButton = document.getElementById("xiangling");

const kukiButton = document.getElementById("kuki");
const nahidaButton = document.getElementById("nahida");

ganyuButton.addEventListener("click", () => {
  resetSound = new Audio("./sound/genshin-teleport.mp3");
  sucessSound = new Audio("./sound/ganyu-ult.mp3");
  personnage = "assets/ganyu.gif";
});
hutaoButton.addEventListener("click", () => {
  resetSound = new Audio("./sound/oi-paimon.mp3");
  sucessSound = new Audio("./sound/hu_tao-yahoo.mp3");
  personnage = "assets/hutao.gif";
});
kfcButton.addEventListener("click", () => {
  resetSound = new Audio("./sound/genshin-teleport.mp3");
  sucessSound = new Audio("./sound/paimon-laughter.mp3");
  personnage = "assets/kfc.gif";
});
kleeButton.addEventListener("click", () => {
  resetSound = new Audio("./sound/klee-unnyah.mp3");
  sucessSound = new Audio("./sound/klee-bomb-bomb-bakudan.mp3");
  personnage = "assets/klee.gif";
});
tartaButton.addEventListener("click", () => {
  sucessSound = new Audio("./sound/paimon-laughter.mp3");
  resetSound = new Audio("./sound/oi-paimon.mp3");
  personnage = "assets/tarta.gif";
});
yelanButton.addEventListener("click", () => {
  sucessSound = new Audio("./sound/paimon-laughter.mp3");
  resetSound = new Audio("./sound/genshin-teleport.mp3");
  personnage = "assets/yelan.gif";
});
xianglingButton.addEventListener("click", () => {
  sucessSound = new Audio("./sound/paimon-laughter.mp3");
  resetSound = new Audio("./sound/oi-paimon.mp3");
  personnage = "assets/xiangling.gif";
});
kukiButton.addEventListener("click", () => {
  sucessSound = new Audio("./sound/oi-paimon.mp3");
  resetSound = new Audio("./sound/oi-paimon.mp3");
  personnage = "assets/kuki.gif";
});
nahidaButton.addEventListener("click", () => {
  sucessSound = new Audio("./sound/paimon-laughter.mp3");
  resetSound = new Audio("./sound/genshin-teleport.mp3");
  personnage = "assets/nahida.gif";
});

// SOUND
let sucessSound = new Audio("./sound/klee-bomb-bomb-bakudan.mp3");
let resetSound = new Audio("./sound/klee-unnyah.mp3");
// let groundSound = new Audio("./sound/ground-sound.mp3");
let pewExplosionSound = new Audio("./sound/pew-explosion.mp3");

// const audio = document.getElementsById("audio");
// audio.volume = 0.2;
// sounds[audio].volume=.5

// Dessine la grille
function draw() {
  myGrid.innerHTML = ""; // Vide le contenu de la grille avant de dessiner
  for (let i of tab) {
    for (let j of i) {
      let img = document.createElement("img");

      if (j == 0) {
        // Case vide
      } else if (j == 1) {
        // Mur
        img.src = "./assets/buisson.png";
        img.classList.add("bush");
      } else if (j == 2) {
        // Boîte
        img.src = "./assets/blob1.gif";
        img.classList.add("blob");
      } else if (j == 3) {
        // Joueur
        img.src = personnage;
        img.classList.add("klee");
      } else if (j == 4) {
        // Emplacement pour la boîte
        img.src = "./assets/eau.png";
        img.classList.add("eau");
      } else if (j == 5) {
        // Boite sur emplacement
        img.src = "./assets/blob2.gif";
        img.classList.add("blob");
      }
      myGrid.appendChild(img);
    }
  }
}

function findPlayerCoords() {
  const PLAYER = 3;
  let y = tab.findIndex((row) => row.includes(PLAYER));
  let x = tab[y].indexOf(PLAYER);

  return { x: x, y: y };
}

function deplacejoueur(dx, dy, eau) {
  let { x, y } = findPlayerCoords(); // recupere les coordonnés du joueur
  let newx = x + dx; //position x initial + 1 ou -1
  let newy = y + dy; //position x initial + 1 ou -1

  if (tab[newy][newx] === 0) {
    //si se deplace vers le vide
    tab[newy][newx] = 3; //joueur prends place du vide
    tab[y][x] = 0; //vide prends place ancienne position joueur
  } else if (tab[newy][newx] === 2 && tab[newy + dy][newx + dx] === 0) {
    tab[newy + dy][newx + dx] = 2; //vide derrière box devient une box
    tab[newy][newx] = 3; //joueur prends place du vide
    tab[y][x] = 0; //vide prends place ancienne position joueur
  } else if (tab[newy][newx] === 2 && tab[newy + dy][newx + dx] === 4) {
    sucessSound.play();
    tab[newy + dy][newx + dx] = 5;
    tab[newy][newx] = 3;
    tab[y][x] = 0;
  } else if (tab[newy][newx] === 4) {
    tab[newy][newx] = 3;
    tab[y][x] = 0;
  } else if (tab[newy][newx] === 5 && tab[newy + dy][newx + dx] === 4) {
    sucessSound.play();
    tab[newy + dy][newx + dx] = 5;
    tab[newy][newx] = 3;
    tab[y][x] = 0;
  } else if (tab[newy][newx] === 5 && tab[newy + dy][newx + dx] === 0) {
    tab[newy + dy][newx + dx] = 2;
    tab[newy][newx] = 3;
    tab[y][x] = 0;
  }
  draw();
}

function positionStockage(data) {
  let sucess = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] === 4) {
        sucess.push([i, j]);
      }
    }
  }
  return sucess;
}

let eau = positionStockage(lvl);

document.addEventListener("keydown", (event) => {
  let e = event.key;
  // groundSound.play();

  if (e == keys.left || e == keys.q) {
    deplacejoueur(-1, 0, eau); // x-1
  } else if (e == keys.right || e == keys.d) {
    deplacejoueur(1, 0, eau); // x+1
  } else if (e == keys.down || e == keys.s) {
    deplacejoueur(0, 1, eau); // y+1
  } else if (e == keys.up || e == keys.z) {
    deplacejoueur(0, -1, eau); // y-1
  }

  //Compte le nombre de box sur les emplacements
  let compteur = 0;
  for (let i = 0; i < eau.length; i++) {
    if (tab[eau[i][0]][eau[i][1]] === 0) {
      tab[eau[i][0]][eau[i][1]] = 4;
    } else if (tab[eau[i][0]][eau[i][1]] === 5) {
      compteur += 1;
    }
  }
  //compare le nombre de box et le nombre d'emplacement
  if (compteur == eau.length) {
    nextLvl++;
    tab = JSON.parse(JSON.stringify(Levels[nextLvl]));
    eau = positionStockage(tab);
    pewExplosionSound.play();
  }

  // reset le level
  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", () => {
    resetSound.play();
    tab = JSON.parse(JSON.stringify(Levels[nextLvl]));
    console.log(nextLvl);
    draw();
  });
});

let currentLevel = document.getElementById("current-level");
currentLevel.textContent = `Niveau actuel : ${nextLvl}`;
//GAME LOOP
window.requestAnimationFrame(gameLoop);
function gameLoop() {
  draw();
  window.requestAnimationFrame(gameLoop);
}
