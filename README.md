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

#### Resumen

Géneros: Side Scroller/Scroll Lateral, Plataformas en 2D, Acción

Modos: Un Jugador

Público objetivo: Todos los públicos.
Plataformas: Web


#### Descripción
- Heels Running es un juego de scroll lateral, donde nos encarnamos en la piel de un publicista que está siendo perseguido por la policía. Tendremos que huir lo más rápido que podamos para poder lograr escapar, aprovechando los distintos objetos/power-ups que nos proporciona el nivel.

- El juego comenzará con una cinématica que te explicará la historia de por qué estás ahí, te confunden con un agente secreto y la mafia te persigue. Después de esta cinemática, empezará el juego con scroll lateral.

- Al llegar al final del recorrido y después de huir por la ciudad de la mafia, llegamos a un tren (que será nuestra vía de escape), donde aparecerá una cinemática y acabará el juego.

Logotipo y portada del juego:

### Obstáculos
REFERENCIAS JET PACK
- Poner avisos de un proyectil que venga de la derecha (fuera de cámara) y que posteriormente salga hacia nosotros
- Poner personas por la calle que pueda atravesar el personaje, para dar ambientación
REFERENCIAS EXTREME PAMPLONA:
-Cajas como obstaculos , al pegarles una patada puedes obtener un power up

#### Niveles
- Nivel único, donde el jugador escapará usando los edificios, escaleras y la distribución el nivel. Al final de dicho nivel se encuentra el tren de escape.

### Diseño de niveles

- Parte 1: Ciudad
- Parte 2: Azotea de edificios
- Parte 3: Tren


#### MECÁNICAS Y CONTROLES BASE
- El jugador se puede mover hacia la izquierda y la derecha, además de saltar y agacharse para esquivar los distintos obstaculos

POWER UPS:
- Correr más rápido. (Café)
- Escudo para protegerte de un golpe y no tener penalización. (Traje elegante)
- Restar segundos al contador de tiempo para mejorar las marcas. (Reloj verde)

DEBUFFS:
- Afectar al movimiento del personaje.(Botella de Alcohol)
- Sumar segundos al contador de tiempo. (Reloj rojo)

#### MECÁNICAS DE ESCENARIO
- Cajas, que al romperse cuando el jugador le pega una patada, pueden contener en su interior un Power Up.
- Vallas, muros, carteles (o equivalentes), que el jugador debe esquivar. En el caso de que el jugador no logre esquivarlas a tiempo, chocará contra ellas perdiendo velocidad.

##### JUGADOR
- Movimiento: A - Izquierda | D - Derecha | S - Agacharse | Space - Saltar.
- Power-ups: J - Usar Power Up.

![tecladitoo](https://user-images.githubusercontent.com/75903737/135531121-8187e0db-e0e2-465c-bf9a-3b6b939efafc.png)


##### SISTEMA DE VIDA 
- En este juego no tenemos un sistema de vida como tal; Cuando somos golpeados por un obstáculo perdemos velocidad y puntuación como penalización.
En cambio, si nos toca el policía perderemos y se reiniciará el nivel.


#### DINÁMICAS
- El objetivo de este juego es escapar de la policía. Nos estará esperando un tren al final del mapa que será nuestra vía de escape.
- Si durante la persecución nos pilla la policía, habremos perdido y se reiniciará el nivel.
- Habrá obstáculos que nos dificultarán la persecución, pero también habrá power-ups para ayudarnos.
- Ganaremos cuando lleguemos al final del nivel, donde nos esperará un tren para escapar.


#### ESTÉTICA
 - Se ambienta en una ciudad de los '60, con una paleta de colores en blanco y negro.
 - Además, la persecución ocurre en una ciudad.

![pixel-art-paisaje-urbano-town-street-8-bit-paisaje-ciudad-juego-arcade-urbano-nocturno-diurno_102902](https://user-images.githubusercontent.com/75903737/135530540-ad4418be-77c9-469d-9018-b463fac664ea.jpg)


 - El juego está ambientado en la película North by Northwest, de esta manera queremos reflejar en el juego el agobio y el frenetismo que siente el protagonista al ser
   perseguido tanto por la policia como por una mafia.

![tumblr_oeas2thUAX1soktugo1_1280](https://user-images.githubusercontent.com/75903737/135530663-ab12e85d-13d7-4fef-9c3f-eba14aa7c239.png)


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
