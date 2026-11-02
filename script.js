const narudzbine = [
  { broj: "ZT-101", stomatolog: "dr Petrović",  rad: "krunica", status: "gotovo",    datum: "2026-10-20" },
  { broj: "ZT-102", stomatolog: "dr Petrović",  rad: "most",    status: "u izradi",  datum: "2026-10-22" },
  { broj: "ZT-103", stomatolog: "dr Ilić",      rad: "proteza", status: "primljeno", datum: "2026-10-23" },
  { broj: "ZT-104", stomatolog: "dr Ilić",      rad: "krunica", status: "poslato",   datum: "2026-10-18" },
  { broj: "ZT-105", stomatolog: "dr Stanković", rad: "inlej",   status: "u izradi",  datum: "2026-10-21" },
  { broj: "ZT-106", stomatolog: "dr Stanković", rad: "most",    status: "gotovo",    datum: "2026-10-19" },
  { broj: "ZT-107", stomatolog: "dr Jovanović", rad: "proteza", status: "u izradi",  datum: "2026-10-22" },
  { broj: "ZT-108", stomatolog: "dr Jovanović", rad: "krunica", status: "primljeno", datum: "2026-10-24" }
];
const faze = ["primljeno", "u izradi", "gotovo", "poslato"];
const traka = document.getElementById("traka");

function prikaziTraku(status) {
  traka.innerHTML = "";
  const trenutna = faze.indexOf(status);

  faze.forEach(function (faza, i) {
    const korak = document.createElement("div");
    korak.textContent = faza;
    korak.classList.add("korak");
   if (i <= trenutna) {
  korak.classList.add("aktivna");
  korak.classList.add(faze[trenutna].replace(" ", "-"));
}
    if (i === trenutna) {
  korak.classList.add("trenutna");
}
    traka.appendChild(korak);
  });
}

function nadjiNarudzbinu(uneto) {
  const ociscen = uneto.trim().toUpperCase();
  return narudzbine.find(function (n) {
    return n.broj === ociscen;
  });
}

const polje = document.getElementById("brojNarudzbine");
const dugme = document.getElementById("dugmeTrazi");
const rezultat = document.getElementById("rezultat");

function pretrazi() {
  if (polje.value.trim() === "") {
    rezultat.textContent = "Unesi broj narudžbine.";
    traka.innerHTML = "";
    return;
  }

  const n = nadjiNarudzbinu(polje.value);

  if (n === undefined) {
    rezultat.textContent = "Narudžbina sa tim brojem ne postoji.";
    traka.innerHTML = "";
  } else {
    rezultat.textContent = n.rad + " · " + n.status + " · " + formatirajDatum(n.datum);
    prikaziTraku(n.status);
  }
}

dugme.addEventListener("click", pretrazi);

polje.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    pretrazi();
  }
});

function formatirajDatum(datum) {
  const delovi = datum.split("-");   // ["2026", "10", "20"]
  return delovi[2] + ". " + delovi[1] + ".";
}

function narudzbineStomatologa(ime) {
  return narudzbine
    .filter(function (n) {
      return n.stomatolog === ime;
    })
    .sort(function (a, b) {
      return a.datum.localeCompare(b.datum);
    });
}


const izbor = document.getElementById("izborStomatologa");
const lista = document.getElementById("listaNarudzbina");

const stomatolozi = [...new Set(narudzbine.map(function (n) {
  return n.stomatolog;
}))];

const prva = document.createElement("option");
prva.value = "";
prva.textContent = "Izaberi stomatologa...";
izbor.appendChild(prva);

stomatolozi.forEach(function (ime) {
  const opcija = document.createElement("option");
  opcija.value = ime;
  opcija.textContent = ime;
  izbor.appendChild(opcija);
});

izbor.addEventListener("change", function () {
  lista.innerHTML = "";
  if (izbor.value === "") return;

  narudzbineStomatologa(izbor.value).forEach(function (n) {
    const red = document.createElement("p");
    red.innerHTML = n.broj + " · " + n.rad + " · <span class=\"znacka " + n.status.replace(" ", "-") + "\">" + n.status + "</span> · <span class=\"datum\">" + formatirajDatum(n.datum) + "</span>";
    lista.appendChild(red);
  });
});