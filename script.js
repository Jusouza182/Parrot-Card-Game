let numeroCartas = 0;
let primeiraCarta = null;
let segundaCarta = null;
let jogadas = 0;

const imagensCartas = [
  "/projeto__parrots__imagens/assets/bobrossparrot.gif",
  "/projeto__parrots__imagens/assets/explodyparrot.gif",
  "/projeto__parrots__imagens/assets/fiestaparrot.gif",
  "/projeto__parrots__imagens/assets/metalparrot.gif",
  "/projeto__parrots__imagens/assets/revertitparrot.gif",
  "/projeto__parrots__imagens/assets/tripletsparrot.gif",
  "/projeto__parrots__imagens/assets/unicornparrot.gif",
];

function iniciar() {
  numeroCartas = parseInt(
    prompt(
      "Com quantas cartas você quer jogar? (Escolha um número par entre 4 e 14)"
    )
  );

  while (
    isNaN(numeroCartas) ||
    numeroCartas < 4 ||
    numeroCartas > 14 ||
    numeroCartas % 2 !== 0
  ) {
    alert("Número inválido. Por favor, insira um número par entre 4 e 14.");
    numeroCartas = parseInt(
      prompt(
        "Com quantas cartas você quer jogar? (Escolha um número par entre 4 e 14)"
      )
    );
  }

  distribuirCartas(numeroCartas);
}

function distribuirCartas(numero) {
  const container = document.querySelector(".cardContainer");
  container.innerHTML = "";

  const imagensEmbaralhadas = embaralharImagens(numero);

  for (let i = 0; i < numero; i++) {
    criarCarta(container, imagensEmbaralhadas[i]);
  }
}

function embaralharImagens(numero) {
  const imagensParaJogo = imagensCartas
    .slice(0, numero / 2)
    .flatMap((i) => [i, i]);

  for (let i = imagensParaJogo.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imagensParaJogo[i], imagensParaJogo[j]] = [
      imagensParaJogo[j],
      imagensParaJogo[i],
    ];
  }
  return imagensParaJogo;
}

function criarCarta(container, imagemSrc) {
  const carta = document.createElement("div");
  carta.className = "card closed";

  const imagemFundo = document.createElement("img");
  imagemFundo.src = "/projeto__parrots__imagens/assets/back.png";
  imagemFundo.classList.add("imagem");
  carta.appendChild(imagemFundo);

  const imagemFrente = document.createElement("img");
  imagemFrente.src = imagemSrc;
  imagemFrente.classList.add("imagemFrente", "hidden");
  carta.appendChild(imagemFrente);

  carta.addEventListener("click", function () {
    if (
      carta.classList.contains("closed") &&
      !carta.classList.contains("open")
    ) {
      virarCarta(carta);
    }
  });

  container.appendChild(carta);
}

function virarCarta(carta) {
  carta.classList.remove("closed");
  carta.classList.add("open");

  const imagemFrente = carta.querySelector(".imagemFrente");
  const imagemFundo = carta.querySelector(".imagem");

  imagemFrente.classList.remove("hidden");
  imagemFundo.classList.add("hidden");

  jogadas++;

  if (!primeiraCarta) {
    primeiraCarta = carta;
  } else {
    segundaCarta = carta;
    if ( primeiraCarta.querySelector(".imagemFrente").src === segundaCarta.querySelector(".imagemFrente").src) {
      setTimeout(() => {
        primeiraCarta.classList.add("matched");
        segundaCarta.classList.add("matched");
        primeiraCarta = null;
        segundaCarta = null;
        verificarVitoria();
      }, 500);
    } else {
      setTimeout(() => {
        virarCartaParaBaixo(primeiraCarta);
        virarCartaParaBaixo(segundaCarta);
        primeiraCarta = null;
        segundaCarta = null;
      }, 1000);
    }
  }
}

function virarCartaParaBaixo(carta) {
  carta.classList.remove("open");
  carta.classList.add("closed");

  const imagemFrente = carta.querySelector(".imagemFrente");
  const imagemFundo = carta.querySelector(".imagem");

  imagemFundo.classList.remove("hidden");
  imagemFrente.classList.add("hidden");
}

function verificarVitoria() {
  const cartas = document.querySelectorAll(".card");
  const todasCartasViradas = [...cartas].every((carta) =>
    carta.classList.contains("matched")
  );
  if (todasCartasViradas) {
    alert(`Você ganhou em ${jogadas} jogadas!`);
  }
}

iniciar();
