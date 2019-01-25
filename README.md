## Introducción

Debido a que hay muchas personas que quieren aprender a jugar ajedrez o mejorar
en sus tácticas o estrategia se me ocurrio hacer un tablero que permita cargar
un juego y ejecutar jugada tras jugada (como si fuera un debug paso a paso de un
programa).

A continuación un extracto de las primeras cinco jugadas de la partida número uno
de 1996 entre Gary Kasparov y Deep Blue.

1. e4 e5
2. c3 d5
3. exd5 &BLACK CHESS QUEEN;xd5
4. d4 &BLACK CHESS KNIGHT;f6
5. &WHITE CHESS KNIGHT;f3 &BLACK CHESS BISHOP;g4

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