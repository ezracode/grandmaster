## Introducción

Debido a que hay muchas personas que quieren aprender a jugar ajedrez o mejorar
en sus tácticas o estrategia se me ocurrio hacer un tablero que permita cargar
un juego y ejecutar jugada tras jugada (como si fuera un debug paso a paso de un
programa).

A continuación un extracto de las primeras cinco jugadas de la partida número uno
de 1996 entre Gary Kasparov y Deep Blue.

1. e4 e5

| &#9820; | &#9822; | &#9821; | &#9819; | &#9818; | &#9821; | &#9822; | &#9820; |
|-|-|-|-|-|-|-|-|
| &#9823; | &#9823; | &#9823; | &#9823; | &#9823; | &#9823; | &#9823; | &#9823; |
| &#8193; | &#8193; | &#8193; | &#8193; | &#8193; | &#8193; | &#8193; | &#8193; |
| &#8193; | &#8193; | &#8193; | &#8193; | &#8193; | &#8193; | &#8193; | &#8193; |
| &#8193; | &#8193; | &#8193; | &#8193; | &#8193; | &#8193; | &#8193; | &#8193; |
| &#8193; | &#8193; | &#8193; | &#8193; | &#8193; | &#8193; | &#8193; | &#8193; |
| &#9817; | &#9817; | &#9817; | &#9817; | &#9817; | &#9817; | &#9817; | &#9817; |
| &#9814; | &#9816; | &#9815; | &#9813; | &#9812; | &#9815; | &#9816; | &#9814; |

<style >
    .white 
    {
        background-color: white;
    }

    .black
    {
        background-color: black;
    }
</style>

<div>
    <div name = "Fila8">
        <div class = "white" name = "a8" >
            <p>&#9820;</p>
        </div>
        <div class = "black" name = "b8">
            <p>&#9822;</p>
        </div>
        <div name = "c8" style="background-color:white;">
            <p>&#9821;</p>
        </div>
        <div name = "d8" style="background-color:black;">
            <p>&#9819;</p>
        </div>
        <div name = "e8" style="background-color:white;">
            <p>&#9818;</p>
        </div>
        <div name = "f8" style="background-color:black;">
            <p>&#9821;</p>
        </div>
        <div name = "g8" style="background-color:white;">
            <p>&#9822;</p>
        </div>
        <div name = "h8" style="background-color:black;">
            <p>&#9820;</p>
        </div>
    </div>
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