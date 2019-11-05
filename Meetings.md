# Detalle de Entregas por Fecha

    En esta sección se llevará el control de lo trabajado por semana.

## 18/01/2019

    Propuesta inicial de la plataforma de ayuda para mejorar el juego de ajedrez.

## 22/01/2019

    Pantalla de tablero de ajedrez hecho en HTML5 y JavaScript client side sin servidor.
    Estudio de los archivos PGN para observar la estructura de los archivos

## 01/02/2019

    Lectura de archivos PGN para crear dataset de juegos, hecho en R.
    Lectura de cada juego para crear nuevo dataset de cada jugada.  Se trabajó movimiento y captura sencilla de peon, hecho en R.
    Simulacion sencilla de las primeras cinco turnos de la partida numero uno entre Deep Blue y Garry Kasparovj, hecho con HTML5 y JavaScript.
    Recopilacion de archivos PGN de varias jugadores.

## 08/02/2019

    Lectura de cada juego para crear nuevo dataset de cada jugada.
    Se trabajó movimiento de Torre, Alfil, Caballo, Reina, Rey, Enroque Corto y Enroque Largo, hecho en R.

## 15/02/2019

    Creacion de tablero de ajedrez con arrastre de piezas, sin validaciones.
    Hecho en Angular 7 usando el Drag and Drop de Angular Material.
    Se publicó en Firebase:  https://grandmaster-d288a.firebaseapp.com/.

## 22/02/2019

    No hubo reunión por semana de examenes en la universidad.
    Se investiga y hacen pruebas sobre uso de mas eventos al momento de hacer drag and drop en angular material.
    Segun Angular no es correcto acceder al DOM, por lo que se investiga sobre como modificar los valores de las casillas para cambiarles el color.
    Se utiliza binding para cambiar valores de las clases.

## 01/03/2019

    Se volvio a crear el tablero por problemas con las animaciones y con la estructua del HTML.
    Se instala Shiny Server sobre Ubuntu 18.10
    Se trabaja sobre la opcion de marcar las celdas a donde puede la pieza mover
    La ruta para el nuevo proyecto es: https://chess-ec7ad.firebaseapp.com/  

## 08/03/2019

    Se trabajó sobre la manipulacion de eventos del drag and drop.  La configuracion debe de tener las palabras clave al principio.

## 17/03/2019

    Se marcan las celdas donde pueden mover los peones y los caballos.  Hay un problema con la captura al paso del peon.
    La ruta para el demo es: https://chess-ec7ad.firebaseapp.com/

    He investigado sobre las variantes del ajedrez y hay algunas cosas curiosas.

    1. El ajadrez de Capa Blanca
    2. El Shatranj
    3. El ajedrez Omega
    4. El ajedrez grotesco
    5. El ajedrez de Fischer o ajedrez 960

    De los primeros tres puedo extraer seis piezas que no existen en el ajedrez actual:

    Alfereza (Shatranj), que se mueve en solo en diagonal un solo paso
    Alfere (Shatranj), que se mueve dos posicioes en diagonal, pero salta sobre las otras pieas, como en las damas, que saltan una pieza.
    Canciller (Capa Blanca), que se mueve como torre o caballo.
    Arzobispo (Capa Blanca), que se mueve como alfil o caballo.
    Campeon (Omega), que salta dos piezas en cualquier direccion o se desliza una ortogonalmente.
    Hechicero, que salta (1,3) o (3,1) o se desliza uno diagonalmente, al saltar asi esta en las casillas de su mismo color, como el alfil. (No me gustan los nombres de las piezas del ajedrez omega, podiramos cambiarlos)

    En el ajedrez Omega los peones se mueven 1, 2 o 3 casillas en su primer movimiento.

    Y como mi aporte al juego, voy a agregar una pieza mas
    El primer ministro (Esdras), que se mueve como torre, alfil o caballo.

    En el caso del ajedrez grotesco, se ponen caso extremos como un rey y un peon contra las 16 piezas del ajedrez, ganando el rey y el peon.

    En el caso del ajedrez 960, las piezas mayores se colocan de forma aleatoria en el tablero.

    Me gustaria hacer una modalidad, en donde pueda colocar las siete piezas, las dos del Shatranj, las dos de Capa Blanca, las dos del Omega y la mia, y para completar tendria una reina mas, siendo que serian 24 piezas mayores, mas 24 peones. y el tablero seria de 24 por 8, me gustaria ver un tablero de 24 por 24 y con dos filas de peones.  Bueno son solo ideas.

## 28/03/2019

    La pieza que quiero agregar tiene nombre, se llama Amazona, y se mueve como caballo, torre y alfil.  

    Existe un concepto de piezas mágicas, que son piezas que tienen movimientos diferentes a las piezas tradicionales, seria interesante crear un tablero con todas las piezas magicas, solo para probar.

    Los cinco mejores motores de análisis de juegos según el blog hezugzwangblog.com:

    1. Stockfish 3388 puntos de ELO
    2. Andscacs 3211 puntos de ELO
    3. Fire 3209 puntos de ELO
    4. Gull 3196 puntos de ELO
    5. Fizbo 3190 puntos de ELO

    Los mejores canales para aprender ajedrez:
    1. hezugzwangblog.com
    2. chess.com
    3. youtube canal partidasinmortales

    Temas de ajedrez
    Deep Blue
    AlphaZero
    Stockfish
    ELMO

    Con respecto al marco teórico.  Creo que los temas pueden ser los siguientes.

    1. Historia del Ajedrez
    2. Reglas del Ajedrez
    3. Notación algebraica del Ajedrez
    4. Piezas del Ajedrez y sus movimientos
    5. Variantes del ajedrez y piezas mágicas.
    6. Grandes Campeones de Ajedrez
        Emanuel Lasker
        Jose Raul Capablanca
        Mijail Botvinik
        Tigran Petrosian
        Boris Spassky
        Bobby Fischer
        Anatoli Karpo
        Garri Kaspárov
        Vladimir Kramnik
        Viswanathan Anand
        Magnus Carlsen
    7. Maquinas jugando ajedrez:  Deep Blue
    8. Software jugando ajedrez:  Stockfish
    9. Inteligencia Artificial ajedrez:  Lc0, AlphaZero
    10. Bases de Datos de Finales
    11. Software para mejorar en ajedrez:  GrandMaster
    12. Herramientas y librerias de desarrollo
    13. Evolucion del proyecto

## 06/04/2019

    En esta semana se completó lo siguiente:
    1. Bloqueo de piezas cuando el otro oponente esta jugando
    2. Se muestra en color amarillo cual es la ultima jugada
    3. Enroques largo y corto
    4. Se corrigio el problema de la captura al paso
    5. Se empezó la anotación del juego

    Queria comprar algunos titulos de ajedrez, vi un tiutlo que se llamaba Bobby Fischer Move by Move, y encontre que hay toda una serie de libros dedicados a los grandes jugadores.  La editorial se llama EveryMan Chess, es una empresa dedicada a la publicación de libros de ajedrez, desde los años 1940.

    Encontre un problema cuando el peon mueve dos posicion la primera vez, puede regresar a una casilla anterior.  Lo voy a revisar.

    Para la siguiente semana quiero completar lo siguiente

    1. Issue cuando el peon mueve dos casilla y luego regresa una
    2. Promocion del peon
    3. Jaque
    4. Jaque Mate
    5. Pinned de las piezas
    6. Notación algebraica
    7. Notación para los casos de dos o mas piezas en una misma fila o columnas

## 26/04/2019

    En el trancurso de estas ultimas tres semanas se completó lo siguiente:
    1. Se completó la forma basica de la notación algebraica
    2. La captura al paso
    3. Notacion algebraica de la captura la paso
    4. Issue cuando el peon mueve dos casilla y luego regresa una
    5. Issue cuando se hacian los enroques porque las torres no se actualizaban correctamente
    6. Promocion del peon
    7. Notacion algebraica de la promocion del peon
    8. Activación de la pieza promovida para que funcione correctamente
    9. Lintern de los archivos TS

    Para la siguiente semana quiero avanzar en lo siguiente

    1. Notación para los casos de dos o mas piezas en una misma fila o columnas
    2. Jaque
    3. Jaque Mate
    4. Pinned de las piezas
    5. Notación algebraica de Jaque y Jaque Mate
    6. Rey ahogado
    7. Boton de retroceso del log del juego
    8. Boton de avance del log del juego

    Revisar la pagina de wikipedia Lc0, Lc0 gano el campeonato de ajedrez
    TCEC

    https://en.wikipedia.org/wiki/Leela_Chess_Zero
    https://en.wikipedia.org/wiki/Top_Chess_Engine_Championship

    Se han completado 16 semanas de trabajo

## 21/05/2019

    Se completaron 19 semanas de trabajo.

    Se completó la notación para los casos de dos o mas piezas en una misma fila o columnas.

    Queda pendiente los siguientes temas:

    1. Pinned de las piezas cuando defienden al rey
    2. Jaque
    3. Jaque Mate
    4. Notación algebraica de Jaque y Jaque Mate
    5. Rey ahogado
    6. Evitar el enroque si las casillas donde pasa el rey estan amenazadas.
    7. Evitar el enroque si al hacer el movimiento el rey queda en jaque.
    8. Empate por material insuficiente
    9. Boton de retroceso del log del juego
    10. Boton de avance del log del juego

## 24/05/2019

    Se completaron 20 semanas de trabajo

## 27/06/2019

    Despues de cuatro semanas de descanso por muchas razones se retomo el desarrollo del tablero.

    Se debe de crear una funcion que determine las casillas prohibidas para cada rey, tanto de piezas blancas como de piezas negras.  Con eso ya se puede calcular lo siguiente:

    * Jaque
    * Jaque Mate
    * Rey Ahogado
    * Evitar el enroque

## 10/07/2019

    Se completaron 27 semanas de trabajo

## 18/07/2019

    Se creó la funcion para obtener las celdas prohibidas para cada rey
    Se completaron 28 semanas de trabajo

## 06/08/2019

    Se completaron 31 semanas de trabajo
    Se mejoró la funcion para obtener las celdas prohibidas para cada rey
    Se completó que no pueda hacer el enroque de los reyes si las posiciones estan amenazadas
    El rey no se puede mover si todas las casillas a su alrededor estan amenazadas

    0. Marcar las celdas a las que se puede mover una pieza tambien dando clic
    1. Pinned de las piezas cuando defienden al rey
    2. No permitirle al rey que capture una pieza enemiga si está esta siendo protegida por otras piezas.
    3. Jaque Mate
    4. Defensa de Jaque Mate, obligar a todas las piezas posibles a defender al rey
    5. Notación algebraica de Jaque Mate
    6. Empate por Rey ahogado
    7. Empate por material insuficiente
    8. Boton de retroceso del log del juego
    9. Boton de avance del log del juego
    10. Codificación de tablero para enviarlo a algoritmos de mejores jugadas
    11. Empate por triple repetición de posicion
    12. Empate por regla de los cincuenta movimientos

    En la parte del backend no olvidar que estamos usando R para codificar los tableros
    Revisar que falta como pendiente en el backend

## 09/09/2019

    Se completaron 36 semanas de trabajo
    Se completaron los incisos 0, 1 y 2

    Pendiente

    3. Jaque Mate
    4. Defensa de Jaque Mate, obligar a todas las piezas posibles a defender al rey
    5. Notación algebraica de Jaque Mate
    6. Empate por Rey ahogado
    7. Empate por material insuficiente
    8. Boton de retroceso del log del juego
    9. Boton de avance del log del juego
    10. Codificación de tablero para enviarlo a algoritmos de mejores jugadas
    11. Empate por triple repetición de posicion
    12. Empate por regla de los cincuenta movimientos

    Bug del inciso 0
    Si la pieza a la que se da clic es la misma solo desmarcar las celdas marcadas

## 10/09/2019

    Bug del inciso 0 corregido
    Se agrega item 13.
    13. Si un elemento que acaba de ser movido puede ser capturado por una pieza enemiga, tambien debe de marcarse.

## 28/10/2019

    Se retoma el proyecto despues de 7 semanas de descanso
    Se hara un sprint de 8 semanas para completar el tablero

## 01/11/2019

    Se resuelve el item numero 13.

## 04/11/2019

    Bug encontrado al hacer enroques, se ha resuelto correctamente
