/* ==========================================
   CONFIGURACIÓN DEL JUEGO
========================================== */


/*
    AQUÍ PUEDES CAMBIAR LAS PREGUNTAS.

    respuesta: número de la respuesta correcta.

    Ejemplo:
    0 = primera respuesta
    1 = segunda respuesta
    2 = tercera respuesta
    3 = cuarta respuesta
*/


const preguntas = [

    {
        icono: "📅",

        pregunta:
            "¿Qué día salimos por primera vez?",

        respuestas: [

            "8 de abril",

            "11 de abril",

            "15 de abril",

            "19 de abril"

        ],

        correcta: 1,

        correcto:
            "❤️ ¡Sí! Ese día siempre tendrá un lugar especial.",

        incorrecto:
            "🥺 No pasa nada... pero deberías recordar ese día."

    },


    {
        icono: "❤️",

        pregunta:
            "¿Qué fecha es especial para nosotros?",

        respuestas: [

            "11 de abril",

            "14 de febrero",

            "19 de abril",

            "25 de diciembre"

        ],

        correcta: 2,

        correcto:
            "💕 Exactamente. El día que comenzó oficialmente lo nuestro.",

        incorrecto:
            "👀 Pista: es después del 11 de abril..."

    },


    {
        icono: "🎵",

        pregunta:
            "¿Qué cantante sé que te gusta?",

        respuestas: [

            "Taylor Swift",

            "Lana del Rey",

            "Ariana Grande",

            "Billie Eilish"

        ],

        correcta: 1,

        correcto:
            "🎧 Lana del Rey. Esa sí me la sé.",

        incorrecto:
            "😂 Nooo... piensa en tu música favorita."

    },


    {
        icono: "🌷",

        pregunta:
            "¿Qué flor te gusta?",

        respuestas: [

            "Rosas",

            "Girasoles",

            "Tulipanes",

            "Orquídeas"

        ],

        correcta: 2,

        correcto:
            "🌷 ¡Tulipanes! Por eso están por toda esta página.",

        incorrecto:
            "🌷 Pista: hay una flor que aparece muchísimo aquí..."

    },


    {
        icono: "🦝",

        pregunta:
            "¿Cuál de estos animales te gusta especialmente?",

        respuestas: [

            "Panda",

            "Gato",

            "Tlacuache",

            "Pingüino"

        ],

        correcta: 2,

        correcto:
            "🦝 JAJAJA sabía que esta la ibas a acertar.",

        incorrecto:
            "😂 ¿Cómo pudiste olvidar al tlacuache?"

    },


    {
        icono: "📸",

        pregunta:
            "¿Qué recuerdo es el comienzo de esta historia?",

        respuestas: [

            "Nuestra primera conversación",

            "Nuestra primera salida",

            "Una foto",

            "Un mensaje"

        ],

        correcta: 1,

        correcto:
            "🌷 Exacto. Nuestra primera salida, aquel 11 de abril.",

        incorrecto:
            "❤️ Piensa en la fecha que aparece al principio..."

    },


    {
        icono: "👀",

        pregunta:
            "¿Qué parte de ti me encanta muchísimo?",

        respuestas: [

            "Tu sonrisa",

            "Tu cabello",

            "Tus ojos",

            "Todo de ti"

        ],

        correcta: 2,

        correcto:
            "👀 Sí... tus ojos tienen algo especial.",

        incorrecto:
            "🥺 Bueno... técnicamente también me gusta todo de ti."

    }

];


/* ==========================================
   VARIABLES
========================================== */

let preguntaActual = 0;

let puntuacion = 0;

let respondida = false;


/* ==========================================
   ELEMENTOS
========================================== */

const inicio =
    document.getElementById("inicio");

const juego =
    document.getElementById("juego");

const resultado =
    document.getElementById("resultado");

const sorpresa =
    document.getElementById("sorpresa");

const empezar =
    document.getElementById("empezar");

const sorpresaBtn =
    document.getElementById("sorpresaBtn");

const pregunta =
    document.getElementById("pregunta");

const respuestas =
    document.getElementById("respuestas");

const mensajeRespuesta =
    document.getElementById("mensajeRespuesta");

const puntuacionElemento =
    document.getElementById("puntuacion");

const numeroPregunta =
    document.getElementById("numeroPregunta");

const numeroCapitulo =
    document.getElementById("numeroCapitulo");

const barraProgreso =
    document.getElementById("barraProgreso");

const iconoPregunta =
    document.getElementById("iconoPregunta");

const musica =
    document.getElementById("musica");


/* ==========================================
   INICIAR
========================================== */

empezar.addEventListener("click", () => {

    inicio.classList.add("oculto");

    juego.classList.remove("oculto");

    /*
        La música se intenta iniciar después
        del toque del usuario.

        Esto funciona mejor en navegadores
        móviles que intentar reproducirla
        automáticamente al cargar.
    */

    musica.play().catch(() => {

        console.log(
            "El navegador requiere iniciar la música manualmente."
        );

    });


    crearParticulas();

    cargarPregunta();

});


/* ==========================================
   CARGAR PREGUNTA
========================================== */

function cargarPregunta() {

    respondida = false;

    const datos =
        preguntas[preguntaActual];


    /* TEXTO */

    pregunta.textContent =
        datos.pregunta;


    /* ICONO */

    iconoPregunta.textContent =
        datos.icono;


    /* NÚMERO */

    numeroPregunta.textContent =
        preguntaActual + 1;


    numeroCapitulo.textContent =
        String(
            preguntaActual + 1
        ).padStart(2, "0");


    /* PROGRESO */

    const progreso =
        (
            preguntaActual /
            preguntas.length
        ) * 100;

    barraProgreso.style.width =
        progreso + "%";


    /* LIMPIAR */

    respuestas.innerHTML = "";

    mensajeRespuesta.textContent = "";

    mensajeRespuesta.className =
        "mensaje-respuesta";


    /* CREAR RESPUESTAS */

    datos.respuestas.forEach(
        (texto, indice) => {

            const boton =
                document.createElement("button");


            boton.className =
                "respuesta";


            boton.textContent =
                texto;


            boton.addEventListener(
                "click",
                () => seleccionarRespuesta(
                    indice,
                    boton
                )
            );


            respuestas.appendChild(
                boton
            );

        }
    );

}


/* ==========================================
   RESPONDER
========================================== */

function seleccionarRespuesta(
    indice,
    botonSeleccionado
) {

    if (respondida) {
        return;
    }

    respondida = true;


    const datos =
        preguntas[preguntaActual];


    const botones =
        document.querySelectorAll(
            ".respuesta"
        );


    botones.forEach(
        boton => {
            boton.disabled = true;
        }
    );


    if (indice === datos.correcta) {

        /* CORRECTO */

        puntuacion++;

        puntuacionElemento.textContent =
            puntuacion;


        botonSeleccionado.classList.add(
            "correcta"
        );


        mensajeRespuesta.textContent =
            datos.correcto;


        mensajeRespuesta.classList.add(
            "correcto"
        );


        crearCorazones();


    } else {

        /* INCORRECTO */

        botonSeleccionado.classList.add(
            "incorrecta"
        );


        botones[
            datos.correcta
        ].classList.add(
            "correcta"
        );


        mensajeRespuesta.textContent =
            datos.incorrecto;


        mensajeRespuesta.classList.add(
            "error"
        );

    }


    /*
        Esperamos un poco para que pueda
        ver si acertó antes de pasar.
    */

    setTimeout(() => {

        siguientePregunta();

    }, 1600);

}


/* ==========================================
   SIGUIENTE
========================================== */

function siguientePregunta() {

    preguntaActual++;


    if (
        preguntaActual >=
        preguntas.length
    ) {

        mostrarResultado();

        return;

    }


    cargarPregunta();

}


/* ==========================================
   RESULTADO
========================================== */

function mostrarResultado() {

    juego.classList.add(
        "oculto"
    );

    resultado.classList.remove(
        "oculto"
    );


    document.getElementById(
        "puntosFinal"
    ).textContent =
        puntuacion;


    const titulo =
        document.getElementById(
            "tituloResultado"
        );

    const mensaje =
        document.getElementById(
            "mensajeFinal"
        );

    const emoji =
        document.getElementById(
            "emojiResultado"
        );


    /* RESULTADOS */

    if (puntuacion === 7) {

        titulo.textContent =
            "¡Perfecto! ❤️";

        emoji.textContent =
            "🥹";

        mensaje.textContent =
            "7 de 7. Definitivamente sabes muchísimo de nuestra historia. Pero hay algo que quiero darte por haber llegado hasta aquí...";

    }

    else if (puntuacion >= 5) {

        titulo.textContent =
            "¡Muy bien! 🌷";

        emoji.textContent =
            "🥰";

        mensaje.textContent =
            "Conoces muy bien nuestra historia. Y creo que te ganaste una pequeña sorpresa.";

    }

    else if (puntuacion >= 3) {

        titulo.textContent =
            "Nada mal ❤️";

        emoji.textContent =
            "☺️";

        mensaje.textContent =
            "Algunas se te escaparon, pero todavía tienes una oportunidad de descubrir algo especial.";

    }

    else {

        titulo.textContent =
            "Tenemos que hablar 😂";

        emoji.textContent =
            "😭";

        mensaje.textContent =
            "Creo que necesitamos una sesión intensiva para recordar nuestra historia... pero igual tienes una sorpresa.";

    }

}


/* ==========================================
   ABRIR SORPRESA
========================================== */

sorpresaBtn.addEventListener(
    "click",
    () => {

        resultado.classList.add(
            "oculto"
        );

        sorpresa.classList.remove(
            "oculto"
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        crearCorazones();

    }
);


/* ==========================================
   PARTÍCULAS
========================================== */

function crearParticulas() {

    const contenedor =
        document.getElementById(
            "particulas"
        );


    for (
        let i = 0;
        i < 60;
        i++
    ) {

        const particula =
            document.createElement(
                "div"
            );


        particula.className =
            "particula";


        particula.style.left =
            Math.random() *
            100 +
            "vw";


        particula.style.top =
            Math.random() *
            100 +
            "vh";


        particula.style.animationDelay =
            Math.random() *
            3 +
            "s";


        contenedor.appendChild(
            particula
        );

    }

}


/* ==========================================
   CORAZONES
========================================== */

function crearCorazones() {

    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const corazon =
            document.createElement(
                "div"
            );


        corazon.textContent =
            "❤️";


        corazon.style.position =
            "fixed";


        corazon.style.left =
            Math.random() *
            100 +
            "vw";


        corazon.style.bottom =
            "-30px";


        corazon.style.fontSize =
            Math.random() *
            20 +
            15 +
            "px";


        corazon.style.zIndex =
            "100";


        corazon.style.pointerEvents =
            "none";


        corazon.style.transition =
            "transform 3s ease, opacity 3s ease";


        document.body.appendChild(
            corazon
        );


        setTimeout(() => {

            corazon.style.transform =
                `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;

            corazon.style.opacity =
                "0";

        }, 50);


        setTimeout(() => {

            corazon.remove();

        }, 3200);

    }

}