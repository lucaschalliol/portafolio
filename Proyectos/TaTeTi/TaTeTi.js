const tablero = {
    // Indica las posiciones marcadas del jugador 1.
    posicionesJugador1: [false,false,false,false,false,false,false,false,false],
    // Indica las posiciones marcadas del jugador 2.
    posicionesJugador2: [false,false,false,false,false,false,false,false,false],   
    // Id de los botones
    botonesID: ["boton-1","boton-2","boton-3","boton-4","boton-5","boton-6","boton-7","boton-8","boton-9"],
    // Turno actual, empieza en X.
    turno: 1,
    // Cantidad total de posiciones marcadas, para poder declara empate. 
    posicionesMarcadas: 0, 
    // Modo de juego: 0 = persona vs persona | 1 = persona vs bot
    modoDeJuego: 0,
}

/* Metodos */

// Este metodo simula al jugador 1.

function jugador1 (botonApretado) {
    // Actualiza las posiciones marcadas del jugador 1.
    tablero.posicionesJugador1[botonApretado - 1] = true; 
    
    // Cambia el turno a dos, para que el siguiente jugador pueda jugar.
    tablero.turno = 2;
    
    // Cambia el subtitulo de "turno de" al turno del siguiente jugador.
    document.getElementById("turno").textContent="Turno del jugador: O"; 

    // Aumenta en 1 las posiciones marcadas, para el caso de que haya empate.
    tablero.posicionesMarcadas++;

    // Se Marca en el tablero la X del usuario.
    document.getElementById(tablero.botonesID[botonApretado-1]).textContent="X";

    // Se comprueba si se gano la partida.
    if (comprobacion(tablero.posicionesJugador1)) {
        tablero.turno = 0;
        document.getElementById("ganador").textContent = "El jugador 'X' ha ganado la partida.";
        document.getElementById("reiniciar").style.visibility = "visible";
        return true;
    }
}

function jugador2 (botonApretado) {
       // Actualiza las posiciones marcadas del jugador 2
       tablero.posicionesJugador2[botonApretado - 1] = true;
    
       // Cambia el turno a dos, para que el siguiente jugador pueda jugar.
       tablero.turno = 1;
   
       // Cambia el subtitulo de "turno de" al turno del siguiente jugador
       document.getElementById("turno").textContent="Turno del jugador: X"; 

       // Aumenta en 1 las posiciones marcadas, para el caso de que haya empate.
       tablero.posicionesMarcadas++;

       // Se Marca en el tablero la X del usuario.
       document.getElementById(tablero.botonesID[botonApretado-1]).textContent="O";

       // Se comprueba si se gano la partida.
       if (comprobacion(tablero.posicionesJugador2)) {
           tablero.turno = 0;
           document.getElementById("ganador").textContent = "El jugador 'O' ha ganado la partida.";
           document.getElementById("reiniciar").style.visibility = "visible";
           return true;
       }    
}


function jugarTaTeTi (botonApretado){

	// Funcion para no sobre escribir la opcion del otro usuario.
	if (tablero.posicionesJugador1[botonApretado-1] == true || tablero.posicionesJugador2[botonApretado-1] == true) { return; }

    // Modo de juego persona vs persona

    if (tablero.modoDeJuego === 0) {
	
	    if (tablero.turno === 1) {
	        jugador1(botonApretado);
	    }
	
	    else if (tablero.turno === 2) {
	        jugador2(botonApretado);
	    }
	    
	    if (tablero.posicionesMarcadas == 9) {
	        document.getElementById("ganador").textContent = "Los jugadores empataron.";
	        document.getElementById("reiniciar").style.visibility = "visible";
	    }
    }

    // Modo de juego persona vs bot

    else if (tablero.modoDeJuego === 1) {

        // Cuando jugas con la X

        if (tablero.turno === 1) {  

        if (jugador1(botonApretado)) {
            return;
        }    

        if (tablero.posicionesMarcadas == 9) {
            document.getElementById("ganador").textContent = "Los jugadores empataron.";
            document.getElementById("reiniciar").style.visibility = "visible";
        }

        for (let i = 0; i < 30; i++) {

        var botonApretadoIA = Math.floor(Math.random() * (9 - 1 + 1) + 1);

        if (tablero.posicionesJugador1[botonApretadoIA - 1] === false && tablero.posicionesJugador2[botonApretadoIA - 1] === false) { jugador2(botonApretadoIA); break; }

        }

        }

        // Cuando juega con el O

        if (tablero.turno === 2) {  

        if (jugador2(botonApretado)) {
            return;
        }    
    
        if (tablero.posicionesMarcadas == 9) {
            document.getElementById("ganador").textContent = "Los jugadores empataron.";
            document.getElementById("reiniciar").style.visibility = "visible";
        }
    
        for (let i = 0; i < 30; i++) {
    
        var botonApretadoIA = Math.floor(Math.random() * (9 - 1 + 1) + 1);
    
        if (tablero.posicionesJugador1[botonApretadoIA - 1] === false && tablero.posicionesJugador2[botonApretadoIA - 1] === false) { jugador1(botonApretadoIA); break;}
    
        }
    
        }
	
    }

}


// Comprueba si un jugador gano la partida. 

function comprobacion (arr) {

    /*  
    Igual a: 
    O | O | O
    |   |
    |   | 
    */ 
    
    if (arr[0] == true && arr[1] == true && arr[2] == true) {
    return true;
    }
    
    /*  
    Igual a: 
    |   |
    O | O | O
    |   |
    */ 
    
    if (arr[3] == true && arr[4] == true && arr[5] == true) {
    return true;
    }
    
    /*  
    Igual a: 
    |   |
    |   |
    O | O | O
    */ 
    
    if (arr[6] == true && arr[7] == true && arr[8] == true) {
    return true;
    }
    
    /*  
    Igual a: 
    O |   |
    O |   |
    O |   | 
    */ 
    
    if (arr[0] == true && arr[3] == true && arr[6] == true) {
    return true;
    }
    
    /*  
    Igual a: 
    | O  |
    | O  |
    | O  | 
    */ 
    
    if (arr[1] == true && arr[4] == true && arr[7] == true) {
    return true;
    }
    
    /*  
    Igual a: 
    |   | O
    |   | O
    |   | O
    */ 
    
    if (arr[2] == true && arr[5] == true && arr[8] == true) {
    return true;
    }
    
    /*  
    Igual a: 
    O |   | 
    | O | 
    |   | O
    */ 
    
    if (arr[0] == true && arr[4] == true && arr[8] == true) {
    return true;
    }
    
    /*  
    Igual a: 
    |   | O
    | O | 
    O |   | 
    */ 
    
    if (arr[2] == true && arr[4] == true && arr[6] == true) {
    return true;
    }
    
    return false;
    }
    
// Reinicia la partida con los valores default del objeto tablero.

function reiniciar() {
        
        document.getElementById("reiniciar").style.visibility = "hidden";
    
        document.getElementById("ganador").textContent = "";
        
        // Re establece las posiciones ya marcadas de los jugadores a falso, limpia el tablero y 
        for (let i = 0; i < 9; i++) {
            tablero.posicionesJugador1[i] = false;
            tablero.posicionesJugador2[i] = false;
            document.getElementById(tablero.botonesID[i]).textContent = "";
        }
    
        tablero.posicionesMarcadas=0;
    
        // Re establece el turno
        let turnoAleatorio = (Math.floor(Math.random() * (2 - 1 + 1) + 1));
    
        if (turnoAleatorio === 1) {
            tablero.turno=1;
            document.getElementById("turno").textContent="Turno del jugador: X";
        }
    
        if (turnoAleatorio === 2) {
            tablero.turno=2;
            document.getElementById("turno").textContent="Turno del jugador: O";
        }
}
    
// Cambia el modo de juego.

function cambiarModo() {

    if (tablero.modoDeJuego === 0) {
        reiniciar();
        tablero.modoDeJuego = 1;
        document.getElementById("cambiarModo").textContent = "Cambiar a modo de juego VS persona";
    }

    else if (tablero.modoDeJuego === 1) {
        reiniciar();
        tablero.modoDeJuego = 0;
        document.getElementById("cambiarModo").textContent = "Cambiar a modo de juego VS IA";
    }
}


