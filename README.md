# Heels Running
Boceto del juego:

![49_sin_titulo_20210929211726](https://user-images.githubusercontent.com/75903737/135341234-18b81a0c-78b1-4804-a54c-226416f95339.png)

![50_sin_titulo_20210930095648](https://user-images.githubusercontent.com/75903737/135530685-4473cfb8-8ab0-4678-be5d-2e054892399b.png)

## Redes

Disponible en: https://github.com/josemiguelvdz/PVLI

Twitter: https://twitter.com/Hitch_Corp

Pivotal:

### GDD:

- Nombre del juego: Heels Running
- Documento de diseño de videojuego
- HitchCorp
- Rodrigo Cabello Hernández, Daniel Ruiz Figueroa, Diego Rol Sánchez, José Miguel Villacañas Díaz-Hellín
- https://github.com/josemiguelvdz/PVLI


![unknown](https://user-images.githubusercontent.com/75903737/135341022-3484ffb8-e9ce-4f82-8740-6db7b09cdaf4.png)


#### Descripción y Resumen

- Géneros: Side Scroller/Scroll Lateral, Plataformas en 2D, Acción.
- Público objetivo: Todos los públicos.
- Plataformas de juego: Web.

- Heels Running se trata de un runner con scroll lateral en cuál nuestro personaje se mueve automáticamente hacia la derecha y cuyo objetivo principal es huir de nuestros perseguidores hasta lograr escapar, para ello tendremos que esquivar obstáculos, tratando tanto de no morir cuando nos disparen los mafiosos, como de que no nos arreste la policía. 

A lo largo de la run se encontrará con distintos objetos que nos ayudarán durante la huida (powerUps) , aunque también se encontrará con otros objetos que nos retrasarán (debuffs). Nuestro protagonista será capaz de romper algunos obstáculos frágiles, los cuales podrían contener poweUps.

Logotipo y portada del juego: ---

 #### Versiones del documento

- 0.1 Mecánicas e Historia. (20/09/2021)
- 0.2 Estética, dinámica, y ajustes en las mecánicas. (24/09/2021)
- 0.3 Controles básicos, power Ups, debuffs. (29/09/2021)
- 0.4 Ajuste completo del GDD, dejando claros todos los aspectos del mismo. (5/10/2021)
- ----------------------------------------------------------------------------------------------------------------------

#### Tabla de contenidos

#### 1. Aspectos generales

*Aqui ponemos una captura del nivel y explicamos lo que estaría pasando en ese momento*

#### 1.1. Relato breve y parcial de una partida típica

El juego transcurre en una ciudad, donde somos perseguidos por la policía y atacados por la mafia, nosotros tendremos que tratar de esquivar los obstáculos saltando o deslizandonos, o incluso destruyendolos si fuera posible (cajas). De esta manera para acabar la partidad tendremos que llegar a la estación del tren.

#### 2. Jugabilidad

#### 2.1. Mecánicas

#### 2.1.1. Mecánicas del personaje

- Movimiento horizontal: El personaje se mueve a una velocidad constante la cuál puede verse afectada al chocar con obstáculos.

- Saltar: Movimiento que consiste en un impulso vertical, además, podremos controlar la trayectoria en el aire. Cuanto más se mantenga el botón de salto más alto se llegará, hasta un máximo de altura. Solo podemos volver a saltar cuando volvamos a tocar el suelo u otra plataforma en la que podamos caminar, es decir, no se puede saltar en el aire.

- Sistema de Vida: El jugador dispondrá de 3 corazones de vida.

- Recibir daño: Recibiremos daño, cuando no seamos capaces de esquivar los disparos de los mafiosos los cuales no quitarán 1 corazón o los objetos que caigan desde las ventanas en el escenario de la ciudad que nos quitarán medio corazón, cuando nos quedemos sin corazones, moriremos.

- Deslizar:  El jugador podrá deslizarse de manera que sea capaz de atravesar obstáculos que no puden saltarse o para tratar de esquivar los objetos que caen de las ventanas.
Dado que deslizarse va a ser como un pequeño dash, este tendrá un cooldown para no abusar de él. 

- Destruir obstáculos: De la mecánica anterior deriva la mecánica de destruir objetos, ya que deslizandonos contra un objetos podremos destruirlo si este es ‘’destruible’’, siendo posible que este nos dropeé un Power Up.

- Coger PowerUps/Debuffs: Al cogerlos, se activará automáticamente durante un periodo de tiempo.

#### 2.1.2. Mecánicas de escenario

- Cajas: Son obstáculos que encontramos en el escenario de la ciudad, estos nos molestarán en el camino, dificultando nuestra huida, sin embargo, seremos capaces de destruirlas de tres maneras:
     -Atravesandolas/Deslizandonos: No habrá probabilidades de obtener un poweUp.
     -Patada: tendrán cierta probabilidad de dejar caer tanto un Power Up.
     
- Objetos estáticos: En este apartado encontraremos todos aquellos objetos que sean estáticos y cuya única funcionalidad sea interrumpir el paso del jugador, dificultando así la huida y haciendo que el jugador pierda velocidad al chocar con ellos. Estos objetos son : Muros, Vallas, Carteles de tiendas, Bocas de riego de la calle, Coches, Bicicletas, (aquí tenemos que poner todos los que se nos ocurran para que haya variedad, ya que sería solo un sprite estático y si hay pocos objetos se hace muy repetitivo).

- Objetos cayentes: Objetos que caerán desde arriba y nos harán daño. Estos objetos son macetas o materiales de construcción. Para que el jugador pueda esquivarlos deberá deslizarse en el momento justo.
#### 2.2. Dinámica

- Para ganar tendremos que conseguir huir de la policía con éxito, llegando hasta la zona del tren donde conseguiremos escapar. Si nos matan los disparos de los mafiosos o somos arrestados por la policía, habremos perdido y se dará la opción al jugador de reiniciar el nivel.

- La estrategia que esperamos que desarrolle el jugador es que vaya  esquivando obstáculos y disparos utilizando las distintas mecánicas que posee, asi como cogiendo los Power Ups, evitando los Debuffs, de manera que intente supera su recórd de tiempo partida a partida.

#### 2.3.Estética

- Queremos transmitir sensaciones como el agobio, al ser constantemente perseguidos por la policía y disparados por la mafia, y el frenetismo al no poder parar en ningún momento de la partida. Además también queremos transmitir la autosuperación, haciendo que los jugadores se sientan atraídos por el juego por el simple hecho de querer supersarse a si mismos.
- Heels Running se ambienta en una ciudad de los años sesenta, con una paleta de colores en blanco y negro, para transmitir al jugador la sensación de que se encuentra en la época correcta.
- La idea del juego está desarrollada gracias a una gran película de Alfred Hitchcock, llamada North by Northwest, cuya historia queda reflejada con algunos ajustes en nuestro juego, de manera que este acabe siendo lo más divertido posible.
- El escenario será visible hasta donde veamos en nuestra cámara, y solo tendremos que preocuparnos por nuestro entorno inmediato, es decir, de no morir y no ser arrestados.

![pixel-art-paisaje-urbano-town-street-8-bit-paisaje-ciudad-juego-arcade-urbano-nocturno-diurno_102902](https://user-images.githubusercontent.com/75903737/135530540-ad4418be-77c9-469d-9018-b463fac664ea.jpg)

#### Menús

Menú con el logo del juego, botón para jugar , si se pulsa comienza la experiencia de juego. Otro botón para la configuración del juego, si lo pulsas abres una ventana para configurar los diferentes aspectos del videojuego (volumen, ver los controles o poner la pantalla completa), botón para cerrar el juego, botón en una esquina con el logo de nuestra empresa, si lo pulsas, despliega una ventana con los nombres de los creadores del juego.

*Falta imágen del menú principal de juego*

Luego dentro del juego tendremos otro menú de pausa donde podremos reaunudar el juego o ir al menú de configuraciones, donde podremos cambiar el volumen, ver los controles o reiniciar partida.

![image](https://user-images.githubusercontent.com/82502179/135832810-a93768e0-9c32-49c0-971a-081ed674a36b.png)

 ![image](https://user-images.githubusercontent.com/82502179/135833132-6b0f2b2b-30ce-466b-b3be-7978900435a3.png)
 
![image](https://user-images.githubusercontent.com/82502179/135832931-d133a8f5-a120-492b-882c-e4a947dabc56.png)
 

#### 3.1. Configuración
- Configuración de volumen: Podremos cambiar tanto la música como el sonido de nuestro videojuego.
- Configuración de video: Podremos poner el juego en pantalla completa o quitarlo de pantalla completa.

#### 3.2. Interfaz

Mostraremos la barra de vida que tiene el jugador, así como el tiempo que ha transcurrido en la partida.
También mostraremos el Power Up o Debuff que hayamos cogido (en caso de cogerlo) y el tiempo restante que le queda a su efecto.

![image](https://user-images.githubusercontent.com/82502179/135832649-0e07c1ab-b084-479b-bb13-7e8df9a95743.png)

#### 3.3. Controles

- Movimiento : S - Deslizarse / D - Dar Patadas / SpaceBar - Saltar
- Configuracion : Escape  - Ajustes / Mouse - Volumen , Reiniciar , Renaudar y Ver Controles
![Controles](https://user-images.githubusercontent.com/82502179/136591999-e16dc5bb-e5f0-48f6-8ce7-6f1b51889c09.png)

#### 4. Contenido
- Todos los sprites de los objetos, cajas, muros, etc, así como los sprites del jugador, de la policía y de los mafiosos.
- Tendremos sonidos para los disparos, para el salto del jugador, para el choque de los objetos cayentes al suelo, para la destrucción de cajas, etc.
- También tendremos sonidos para el entorno.

#### 4.1 Nivel

#### Ciudad

Nivel ambientado en una ciudad, con calles y edificios, personas... Seremos perseguidos por la policía ,y a su vez tendremos que esquivar a la mafia a lo largo de la partida. Tras atravesar la ciudad, llegaremos a una estación del tren para escapar.

#### 4.2 Personajes y enemigos

PROTAGONISTA:
- Nuestro protagonista es Roger, un publicista al cuál la mafia esta tratando de matar por ser confundido con un agente del F.B.I y el cual será perseguido por la policía tras un juicio.

POLICIA:
- La policía es el enemigo que nos perseguirá. Siempre estará detrás del jugador siguiéndole el rastro. Si el jugador está a una altura diferente a la policia, entonces se motrará detrás de este un icono de un helicóptero que simulará que nos pasan a perseguir por el aire. Por último, si entra en contacto con el jugador, éste perderá la partida.

MAFIA:
- Se trata de enemigos estáticos cuya función es matar al jugador. Aparecerán de vez en cuando en ventanas. Se avisará al jugador mostrando el icono de un mafioso en el límite de la pantalla derecha, indicándole que cuando llegue aparece un mafioso.

#### 4.3. Objetos

#### Power Ups

-Café: Este PowerUp hace referencia a algo que consume mucho el protagonista de nuestro videojuego en la película de Alfred, por lo que nos incrementará la velocidad para poder escapar más facilmente de la policía y evitar ser arrestados.

-Smoking: Este smoking también hace referencia a como iba vestido nuestro protagonista, por lo que este Power Up nos ofrecerá un escudo de modo que no obtengamos ningún tipo de daño o penalización.

-Reloj Verde: Dado que nuestro juego se trata de completar el nivel en el menor tiempo posible, este Power Up nos restará tiempo a la run, lo que nos ayudará a concluir nuestras partidas con un tiempo mejor.

-Salmon: En referencia a uno de los alimentos de la película, cuando el jugador obtenga este objeto , recuperara vida , facilitándole su supervivencia de los mafiosos y de los objetos arrojados por la ventana.

#### Debuffs

-Alcohol: Dado que en la película los mafiosos nos obligan a beber alcohol, hemos utilizado este debuff de manera que si lo consumimos adquiriremos una disminución de velocidad por un cierto periodo de tiempo, lo que facilitará el arresto a la policía.

-Reloj Rojo: Al contrario que el reloj verde explicado con anterioridad, este debuff nos sumará tiempo adicionql al tiempo de la partida, lo que hará que concluyamos la partida con un mayor tiempo.


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

