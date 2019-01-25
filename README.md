## Introducción

Debido a que hay muchas personas que quieren aprender a jugar ajedrez o mejorar
en sus tácticas o estrategia se me ocurrio hacer un tablero que permita cargar
un juego y ejecutar jugada tras jugada (como si fuera un debug paso a paso de un
programa).

A continuación un extracto de las primeras cinco jugadas de la partida número uno
de 1996 entre Gary Kasparov y Deep Blue.

1. e4 e5

(setq markdown-xhtml-header-content
<style type="text/css">
    .chessboard {
        width: 640px;
        height: 640px;
        margin: 20px;
        border: 25px solid #333;
    }
    .black {
        float: left;
        width: 80px;
        height: 80px;
        background-color: #999;
        font-size:50px;
        text-align:center;
        display: table-cell;
        vertical-align:middle;
    }
    .white {
        float: left;
        width: 80px;
        height: 80px;
        background-color: #fff;
        font-size:50px;
        text-align:center;
        display: table-cell;
        vertical-align:middle;
    }
</style>)

<div class="chessboard">
    <!-- 1st -->
    <div class="white">&#9820;</div>
    <div class="black">&#9822;</div>
    <div class="white">&#9821;</div>
    <div class="black">&#9819;</div>
    <div class="white">&#9818;</div>
    <div class="black">&#9821;</div>
    <div class="white">&#9822;</div>
    <div class="black">&#9820;</div>
    <!-- 2nd -->
    <div class="black">&#9821;</div>
    <div class="white">&#9821;</div>
    <div class="black">&#9821;</div>
    <div class="white">&#9821;</div>
    <div class="black">&#9821;</div>
    <div class="white">&#9821;</div>
    <div class="black">&#9821;</div>
    <div class="white">&#9821;</div>
    <!-- 3th -->
    <div class="white"></div>
    <div class="black"></div>
    <div class="white"></div>
    <div class="black"></div>
    <div class="white"></div>
    <div class="black"></div>
    <div class="white"></div>
    <div class="black"></div>
    <!-- 4st -->
    <div class="black"></div>
    <div class="white"></div>
    <div class="black"></div>
    <div class="white"></div>
    <div class="black"></div>
    <div class="white"></div>
    <div class="black"></div>
    <div class="white"></div>
    <!-- 5th -->
    <div class="white"></div>
    <div class="black"></div>
    <div class="white"></div>
    <div class="black"></div>
    <div class="white"></div>
    <div class="black"></div>
    <div class="white"></div>
    <div class="black"></div>
    <!-- 6th -->
    <div class="black"></div>
    <div class="white"></div>
    <div class="black"></div>
    <div class="white"></div>
    <div class="black"></div>
    <div class="white"></div>
    <div class="black"></div>
    <div class="white"></div>
    <!-- 7th -->
    <div class="white">&#9817;</div>
    <div class="black">&#9817;</div>
    <div class="white">&#9817;</div>
    <div class="black">&#9817;</div>
    <div class="white">&#9817;</div>
    <div class="black">&#9817;</div>
    <div class="white">&#9817;</div>
    <div class="black">&#9817;</div>
    <!-- 8th -->
    <div class="black">&#9814;</div>
    <div class="white">&#9816;</div>
    <div class="black">&#9815;</div>
    <div class="white">&#9813;</div>
    <div class="black">&#9812;</div>
    <div class="white">&#9815;</div>
    <div class="black">&#9816;</div>
    <div class="white">&#9814;</div>
</div>

2. c3 d5
3. exd5 &#9819;xd5
4. d4 &#9822;f6
5. &#9816;f3 &#9821;g4

Si cargamos varios juegos en una base de datos podriamos buscar la posición
actual del tablero y ver como jugaron otros jugadores y se podria ir viendo lo que
ocurre en el juego.

Si el jugador tiene varios juegos podriamos analizarlos para determinar:

    - cuales son sus jugadas mas comunes
    - sus jugadas malas
    - sus jugadas buenas

La propuesta para la aplicación es usar para el tablero:

    - Angular
    - PWA
    - Firebase
    - Material Design

para el analisis de juegos usando datasets en JSON

    - R
    - Python

para la simulacion entrenando un modelo

    - Tensor Flow

repositorio publico

    - Github

Base de datos

    - Firebase Real Time Database

para el analisis de cada jugada

    - expresiones regulares o parseo manual

para la documentación

    - Markdown