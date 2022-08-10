let deck = [];
let tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const smalls = document.querySelectorAll('small');
const [marcadorJugador, marcadorComputadora] = smalls;
const jugadorCartas = document.querySelector('#jugador-cartas');
const computadoraCartas = document.querySelector('#computadora-cartas');

// Esta función crea una nueva baraja
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (const tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (const tipo of tipos) {
        for (const especial of especiales) {
            deck.push(especial + tipo);
        }
    }
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

// Esta función permite tomar una carta
const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;;
}

// Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputadora += valorCarta(carta);
        marcadorComputadora.innerText = puntosComputadora;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        computadoraCartas.append(imgCarta);
        if(puntosMinimos > 21) break;
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    setTimeout(() => {
        if(puntosComputadora === puntosMinimos) {
            alert('Nadie gana');
        }
        else if( puntosMinimos > 21) {
            alert('Computadora gana');
        }
        else if(puntosComputadora > 21) {
            alert('Jugador gana');
        }
        else if((puntosComputadora > puntosMinimos) && (puntosComputadora < 21)) {
            alert('Computadora gana');
        }
    }, 10);
}

crearDeck();
// console.log(valorCarta(pedirCarta()));

// Eventos
btnPedir.addEventListener('click', function () {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    marcadorJugador.innerText = puntosJugador;
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    jugadorCartas.append(imgCarta);
    if (puntosJugador > 21) {
        alert('Perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
    else if (puntosJugador === 21) {
        alert('Ganaste wey');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }
});

btnDetener.addEventListener('click', function() {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', function () {
    for(let childs of jugadorCartas.querySelectorAll('img')) {
        childs.remove();
    }
    for(let childs of computadoraCartas.querySelectorAll('img')) {
        childs.remove();
    }
    deck = [];
    deck = crearDeck();
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    puntosJugador = 0;
    puntosComputadora = 0;
    marcadorJugador.innerText = puntosJugador;
    marcadorComputadora.innerText = puntosComputadora;
});