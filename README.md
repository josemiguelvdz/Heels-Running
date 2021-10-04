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

- Al llegar al final del recorrido y después de huir por la ciudad de la mafia y la policía, llegamos a un tren (que será nuestra vía de escape), donde aparecerá una cinemática y acabará el juego.

Logotipo y portada del juego:

### Obstáculos--
- Un proyectil que se avisará en la pantalla, que después de unos segundos, aparecerá y pasará por la pantalla de derecha a izquierda o viceversa.
- Cajas, que, dependiendo si les damos una patada, tendrán un efecto u otro. Si atravesamos las cajas sin dar una patada, romperemos la caja (que no soltará nada) y además nos veremos perjudicados perdiendo velocidad. En cambio, si rompemos la caja de una patada, la caja soltará un Power Up y nuestra velocidad no se verá reducida.
- Vallas, carteles y muros que, al contrario que las cajas, no se pueden romper y deberán ser esquivados. Si chocamos contra ellos, perderemos velocidad.
- Materiales de construcción que caerán desde arriba. Para que el jugador pueda esquivarlos deberá deslizarse en el momento justo.

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


#### MECÁNICAS Y CONTROLES BASE--
- El jugador tendrá la capacidad de saltar y deslizarse en lo que a movimiento se refiere, ya que se moverá automáticamente hacia la derecha. Por otro lado, puede dar patadas a las cajas para romperlas y obtener Power Ups.

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
- Saltar y deslizarse.
- Disparar
- Arrestar al jugador

MAFIA:
-Disparar
-Saltar
-Deslizarse

##### JUGADOR
- Movimiento : S - Agacharse / D - Dar Patadas / SpaceBar - Saltar / Enter - Pasar Diálogo 
- Configuracion : Escape  - Ajustes / Mouse - Volumen , Reiniciar , Renaudar y Ver Controles
- Power-ups: J - Usar Power Up.

![image](https://user-images.githubusercontent.com/82502179/135830717-360b3800-75ba-42a7-be32-1cde833899e1.png)


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
