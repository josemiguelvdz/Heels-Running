# Heels Running
Boceto del juego:

![49_sin_titulo_20210929211726](https://user-images.githubusercontent.com/75903737/135341234-18b81a0c-78b1-4804-a54c-226416f95339.png)

![50_sin_titulo_20210930095648](https://user-images.githubusercontent.com/75903737/135530685-4473cfb8-8ab0-4678-be5d-2e054892399b.png)

## Redes

Disponible en: https://github.com/josemiguelvdz/PVLI

Twitter: https://twitter.com/Hitch_Corp

Pivotal:

### GDD:

Nombre del juego: Heels Running

Documento de diseño de videojuego

-  HitchCorp

![unknown](https://user-images.githubusercontent.com/75903737/135341022-3484ffb8-e9ce-4f82-8740-6db7b09cdaf4.png)


Versión 0.3 - 29/09/2021

Versión 0.2 - 24/09/2021

Versión 0.1 - 20/09/2021

#### Requisitos

MÍNIMO:
SO: Windows 7, Windows 8, Windows 10 (64-bit)
Procesador: Intel Core i3 2.00 GHz or AMD equivalent
Memoria: 1 GB de RAM
Gráficos: NVIDIA GeForce GT 240 / AMD Radeon HD 4670 / Intel HD Graphics 4000

RECOMENDADO:
SO: Windows 10 (64-bit)
Procesador: Intel Core i5 / AMD FX @ 2.4GHz
Memoria: 2 GB de RAM
Gráficos: NVIDIA GeForce GTX 470 / AMD Radeon HD 6870


#### Resumen

Géneros: Side Scroller/Scroll Lateral, Plataformas en 2D, Acción

Modos: Un Jugador

Público objetivo: Todos los públicos.
Plataformas: Web


#### Descripción
- Heels Running se trata de un runner con scroll lateral donde el personaje es un publicista, Tary Grant, al cúal persiguen por una confusión de identidad.

- El objetivo principal es huir de nuestros perseguidores hasta lograr escapar, para ello tendremos que esquivar obstáculos, tratando de no morir cuando nos disparen los mafiosos, como de que no nos arresten mientras nos persiga la policía. 

- Tary se encontrará con distintos objetos que le ayudarán durante su huida (powerUps) , aunque también se encontrará con otros objetos que nos retrasarán (debuffs).
Nuestro protagonista, no tiene mucho con lo que enfrentarse a los mafiosos o a la policía, pero sí que es capaz de romper algunos obstáculos frágiles, los cuales podrían contener objetos beneficiosos para él y asi conseguir escapar.

Logotipo y portada del juego:

#### Modos
-Modo Historia: En este modo, primero nos encontraremos con un diálogo a modo de introducción de la historia, con el objetivo de que el jugador se meta en el papel del protagonista y comprenda por qué nos están persiguiendo. Después comenzará el nivel en el que nos perseguirá la policía, a la vez que somos molestados por los mafiosos.

-Modo Un Jugador: En este modo jugaremos directamente sin tener que visualizar los diálogos, ya que al ser un juego runner en el que se espera que el jugador juegue muchas partidas tratando de mejorar su mejor marca,  sería aburrido si cada vez que quiere jugar tiene que verse el mismo diálogo.

### Obstáculos--
- Un proyectil que se avisará en la pantalla, que después de unos segundos, aparecerá y pasará por la pantalla de derecha a izquierda o viceversa. Si el jugador entra en contacto con un proyectil, perderá velocidad.
- Cajas, que, dependiendo si les damos una patada, tendrán un efecto u otro. Si atravesamos las cajas sin dar una patada, romperemos la caja (que no soltará nada) y además nos veremos perjudicados perdiendo velocidad. En cambio, si rompemos la caja de una patada, la caja soltará un Power Up y nuestra velocidad no se verá reducida.
- Objetos estáticos: En este apartado encontraremos todos aquellos objetos que sean estáticos y cuya única funcionalidad sea interrumpir el paso del jugador, dificultando así la huida y haciendo que el jugador pierda velocidad al chocar con ellos. Estos objetos son : Muros, Vallas, Carteles publicitarios, Bocas de riego de la calle, Coches, Bicicletas, (aquí tenemos que poner todos los que se nos ocurran para que haya variedad, ya que sería solo un sprite estático y si hay pocos objetos se hace muy repetitivo).
- Materiales de construcción que caerán desde arriba. Para que el jugador pueda esquivarlos deberá deslizarse en el momento justo.
- Toldos: Los toldos ayudarán al jugador a impulsarse hacia arriba ya sea para coger un Power up o alcanzar una zona más elevada.


#### Niveles--
- Tendremos dos niveles:

## Ciudad y edificios
- Nivel ambientado en una ciudad, con calles y edificios, personas... Seremos perseguidos por la policía. Después de conseguir escapar por la ciudad, llegaremos a las azoteas de los edificios. Tendremos que saltar de azotea en azotea y llegar así al final del nivel. Una vez alcanzado el final comenzará el segundo y último nivel.

## Tren
- Ocurrirá encima de un tren, tendremos que esquivar la misma dinámica de obstáculos que en la ciudad y para ganar pasaremos por un tunel deslizándonos, el cual la policía no podrá atravesar, logrando así escapar y completar el juego.

### Diseño de niveles

- Parte 1: Ciudad
- Parte 2: Azotea de edificios
- Parte 3: Tren

### Relato breve y parcial de una partida típica
- Al comienzo del juego, tras el diálogo principal (en caso de Modo Historia), aparecemos en el primer escenario, la ciudad, donde somos perseguidos por la policía, el jugador se moverá automáticamente hacia la derecha, y nosotros tendremos que tratar de esquivar los obstáculos saltando o deslizandonos, o incluso destruyendolos si fuera posible. Una vez lleguemos al tren, comenzará la huida por encima del mismo (esto no está incluido como tal en la película, pero al ser un juego runner y el protagonista escapar en un tren, hemos decidido adaptarlo para nuestro juego) donde tendremos que aguantar hasta llegar al túnel final donde la policía no será capaz de alcanzarnos y conseguiremos huir. Durante todo esto tendremos tanto el apoyo de los Power Ups como el retraso de los Debuffs.


#### MECÁNICAS Y CONTROLES BASE--
- Saltar: Movimiento que consiste en un impulso vertical, además, podremos controlar la trayectoria en el aire. Cuanto más se mantenga el botón de salto más alto se llegará, hasta un máximo de altura. Solo podemos volver a saltar cuando volvamos a tocar el suelo u otra plataforma en la que podamos caminar, es decir, no se puede saltar en el aire.
Recibir daño: Recibiremos daño, cuando no seamos capaces de esquivar los disparos de los mafiosos o los objetos que caigan desde las ventanas en el escenario de la ciudad.
- Deslizarse: El jugador podrá deslizarse de manera que sea capaz de esquivar rápidamente obstáculos como los carteles publicitarios en la zona del tren o los objetos caídos de la ciudad. 
- Destruir obstáculos: De la mecánica anterior deriva la mecánica de destruir objetos, ya que deslizandonos contra un objetos podremos destruirlo si este es ‘’destruible’’, siendo posible que este nos dropee un Power Up.
- Coger consumibles: Los consumibles, tanto Power Ups como los Debuffs, aparecerán aleatoriamente en el mapa, o al destruir ciertos objetos con una probabilidad, al cogerlos instantáneamente se nos otorgará el poder de ese consumible por un cierto periodo de tiempo.

POWER UPS:
- Incrementar la Velocidad del jugador. (Café)
- Escudo para protegerte de un golpe y no tener penalización. (Traje elegante)
- Restar segundos al contador de tiempo para mejorar las marcas. (Reloj verde)

DEBUFFS:
- Afectar al movimiento del personaje(Los controles se cambian).(Botella de Alcohol)
- Sumar segundos al contador de tiempo. (Reloj rojo)

#### MECÁNICAS DE ESCENARIO
- Cajas, que al romperse cuando el jugador le pega una patada, pueden contener en su interior un Power Up.
- Si el jugador no esquiva la caja saltando y la pasa sin darle una patada esta le ralentizara , acercándole asi a la policía y sin recibir ningun power up
- Vallas, muros, carteles (o equivalentes), que el jugador debe esquivar. En el caso de que el jugador no logre esquivarlas a tiempo, chocará contra ellas perdiendo velocidad.

### MECÁNICAS DE ENEMIGOS

POLICIA:
- La policía es el enemigo que nos perseguirá. Siempre estará detrás del jugador siguiéndole el rastro. Podrá saltar y deslizarse como el jugador para evitar los obstáculos. Además, también podrá disparar balas/proyectiles al jugador desde atrás. Las balas seguirán al jugador en el momento de ser disparadas. Si el jugador cambia de posición podrá esquivarlas.
- Por último, si entra en contacto con el jugador, éste perderá la partida.

MAFIA:
- Se trata de enemigos estáticos cuya función es molestar al jugador. Aparecerán de vez en cuando y le dispararán de la misma forma que la policía.

##### JUGADOR
- Movimiento : S - Deslizarse / D - Dar Patadas / SpaceBar - Saltar / Enter - Pasar Diálogo 
- Configuracion : Escape  - Ajustes / Mouse - Volumen , Reiniciar , Renaudar y Ver Controles

![image](https://user-images.githubusercontent.com/82502179/135831539-1940dc6a-53a3-47bf-a413-72842f9ce580.png)


##### SISTEMA DE VIDA 
- En este juego no tenemos un sistema de vida como tal; Cuando somos golpeados por un obstáculo o una bala perdemos velocidad y puntuación como penalización.
En cambio, si nos toca el policía perderemos y se reiniciará el nivel.


#### DINÁMICAS
- El objetivo de este juego es escapar de la policía. Nos estará esperando un tren al final del mapa que será nuestra vía de escape.
- Si durante la persecución nos pilla la policía, habremos perdido y se reiniciará el nivel.
- Durante la persecución aparecerán personajes de la mafia y obstáculos que pondrán las cosas difíciles, aunque también habrá power-ups para ayudarnos.
- Ganaremos cuando lleguemos al final del nivel, donde nos esperará un tren para escapar.


#### ESTÉTICA
 - Se ambienta en una ciudad de los '60, con una paleta de colores en blanco y negro.
 - Además, la persecución ocurre en una ciudad.

![pixel-art-paisaje-urbano-town-street-8-bit-paisaje-ciudad-juego-arcade-urbano-nocturno-diurno_102902](https://user-images.githubusercontent.com/75903737/135530540-ad4418be-77c9-469d-9018-b463fac664ea.jpg)


 - El juego está ambientado en la película North by Northwest, de esta manera queremos reflejar en el juego el agobio y el frenetismo que siente el protagonista al ser
   perseguido tanto por la policia como por una mafia.

![tumblr_oeas2thUAX1soktugo1_1280](https://user-images.githubusercontent.com/75903737/135530663-ab12e85d-13d7-4fef-9c3f-eba14aa7c239.png)

### INTERFAZ

IN GAME:

![image](https://user-images.githubusercontent.com/82502179/135832649-0e07c1ab-b084-479b-bb13-7e8df9a95743.png)

MENÚ PAUSA:

![image](https://user-images.githubusercontent.com/82502179/135832810-a93768e0-9c32-49c0-971a-081ed674a36b.png)

 - CONFIGURACIÓN:

 ![image](https://user-images.githubusercontent.com/82502179/135833132-6b0f2b2b-30ce-466b-b3be-7978900435a3.png)
 

![image](https://user-images.githubusercontent.com/82502179/135832931-d133a8f5-a120-492b-882c-e4a947dabc56.png)


##### MÚSICA
- 

##### ARQUITECTURA DEL JUEGO
- 

##### SISTEMA DE GESTIÓN 
- Pivotal


##### SISTEMA DE COMUNICACIÓN
Los miembros del equipo de desarrollo nos comunicaremos mediante nuestro propio servidor de Discord, donde tenemos distintos canales para comunicarnos e intercambiar información útil.

##### Referencias
- North by Northwest, _Alfred Hitchcock._ 
- JetPack Joyride
- Extreme Pamplona
- Subway Surfer
- Dan the Man

