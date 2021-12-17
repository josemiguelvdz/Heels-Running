![heelstitulo](https://user-images.githubusercontent.com/75903737/146580307-4192043c-4c97-4492-90a3-6ae39f453353.png)
<hr>

## Redes

<table>
  <tr>
   <td valign="top"><a href='https://www.pivotaltracker.com/projects/2532298'><img src="./assets/images/pivotal.png" width="100" height="100"></a></td>
   <td valign="top"> <a href='https://twitter.com/Hitch_Corp'><img src="./assets/images/twitter.png" width="100" height="100"></a></td>
  </tr>
 <tr>
   <td valign="top"><p align="center">Pivotal</p></td>
  <td valign="top"><p align="center">Twitter</p></td>
 </tr>
</table>

<br>
UML: https://app.creately.com/diagram/p9mz5a7aeDl/view

### GDD:

- Nombre del juego: Heels Running
- Documento de diseño de videojuego
- HitchCorp
- Rodrigo Cabello Hernández, Daniel Ruiz Figueroa, Diego Rol Sánchez, José Miguel Villacañas Díaz-Hellín

Capturas del Juego:

![image](https://user-images.githubusercontent.com/82502179/146576896-2796abf0-4ccf-4610-9fcf-52e42e3cc708.png)

![image](https://user-images.githubusercontent.com/82502179/146577058-05c34078-c316-45b2-9882-288b82047b45.png)

<hr>

![descripcion](https://user-images.githubusercontent.com/75903737/146586402-f5b4f467-2ea0-4bef-8855-fb962372a13b.png)
#### Descripción y resumen

- Géneros: Side Scroller/Scroll Lateral, Plataformas en 2D, Acción.
- Público objetivo: Todos los públicos.
- Plataformas de juego: Web.

- Heels Running se trata de un runner con scroll lateral en cuál nuestro personaje se mueve automáticamente hacia la derecha y cuyo objetivo principal es huir de nuestros perseguidores hasta lograr escapar, para ello tendremos que esquivar obstáculos, tratando tanto de no morir cuando nos disparen los mafiosos, como de que no nos arreste la policía. 

A lo largo de la run nos encontraremos con distintos objetos que nos ayudarán durante la huida (powerUps), aunque también nos encontraremos con otros objetos que nos retrasarán (debuffs). Nuestro protagonista será capaz de romper algunos obstáculos frágiles, los cuales podrían contener poweUps.

Logotipo y portada del juego: ---

 #### Versiones del documento

- 0.1 Mecánicas e Historia. (20/09/2021)
- 0.2 Estética, dinámica, y ajustes en las mecánicas. (24/09/2021)
- 0.3 Controles básicos, power Ups, debuffs. (29/09/2021)
- 0.4 Ajuste completo del GDD, dejando claros todos los aspectos del mismo. (5/10/2021)
- 0.5 Ajuste completo del GDD, para actualizarlo según el progreso actual del juego. (25/11/2021)

<hr>

![contenido](https://user-images.githubusercontent.com/75903737/146586722-b9868873-ed96-4a07-9103-c7fd6749d055.png)

#### 1. Aspectos generales

*Aqui ponemos una captura del nivel y explicamos lo que estaría pasando en ese momento*

#### 1.1. Relato breve y parcial de una partida típica

El juego transcurre en una ciudad, donde somos perseguidos por la policía y atacados por la mafia, nosotros tendremos que tratar de esquivar los obstáculos saltando o dándoles una patada. Para acabar la partida y lograr ganar tendremos que llegar a la estación del tren.
<hr>

#### 2. Jugabilidad

![mecanicas](https://user-images.githubusercontent.com/75903737/146586859-a638aa0e-8df7-48c8-9690-af0831868b22.png)

#### 2.1.1. Mecánicas del personaje

- Movimiento horizontal: El personaje se mueve a una velocidad constante. Además, habrá power ups y debuffs que puedan afectar a este parámetro (de manera positiva o negativa).

- Saltar: Movimiento que consiste en un impulso vertical. Solo podemos volver a saltar cuando volvamos a tocar el suelo u otra plataforma en la que podamos caminar, es decir, no se puede saltar en el aire. Durante el salto será posible pegar una patada para destruir objetos.

- Sistema de Vida: El jugador dispondrá de tres puntos de vida representados en la interfaz del juego.

- Recibir daño: Recibiremos daño, cuando no seamos capaces de esquivar los disparos de los mafiosos los cuales no quitarán un punto de vida o los objetos que caigan desde las ventanas en el escenario de la ciudad que nos quitarán otro punto de vida. Cuando nos quedemos sin puntos de vida, moriremos y perderemos la partida.

- Dar una patada:  El jugador podrá dar una patada de manera que sea capaz de destruir los objetos cayentes y las cajas. Podrá realizar una patada tanto en el aire como en el suelo. Si destruye una caja, existe una posibilidad de que suelte un power up. Tendrá un cooldown para no abusar de ella. 

- Coger PowerUps/Debuffs: Al cogerlos, se activará automáticamente durante un periodo de tiempo. Si el power up/debuff tiene una duración, se verá representada en la interfaz mientras el efecto este activo. Nunca habrá un punto de la partida donde hayan dos power ups/debuff muy juntos (para prevenir solapamiento de power ups/debuff)

#### 2.1.2. Mecánicas de escenario

- Cajas: Son obstáculos que encontramos en el escenario de la ciudad, estos nos molestarán en el camino, dificultando nuestra huida, sin embargo, se podrán destruir de dos maneras:
     -Chocandonos: No habrá probabilidades de obtener un poweUp.
     -Patada: tendrán cierta probabilidad de dejar caer un Power Up.
     
- Objetos estáticos: En este apartado encontraremos todos aquellos objetos que sean estáticos y cuya única funcionalidad sea interrumpir el paso del jugador, dificultando así la huida. Estos objetos son : Basura, Vallas, Carteles de tiendas, Bocas de riego de la calle, Coches, Farolas.

- Objetos cayentes: Objetos que caerán desde arriba y nos harán daño. Estos objetos son macetas o materiales de construcción. El jugador podrá pasar de largo o destruirlos con
la patada.
<br>

![dinamica](https://user-images.githubusercontent.com/75903737/146586940-4135cc20-c775-4f43-9ad4-bec8f023ed09.png)


- Para ganar tendremos que conseguir huir de la policía con éxito, llegando hasta la zona del tren donde conseguiremos escapar. Si nos matan los disparos de los mafiosos o somos arrestados por la policía, habremos perdido y se dará la opción al jugador de volver al menú principal o de volver a jugar. Si ganamos, nos pondrá el tiempo que hemos tardado
en completar la run.

- La estrategia que esperamos que desarrolle el jugador es que vaya  esquivando obstáculos y disparos haciendo uso de la patada cuando sea necesaria, asi como cogiendo los Power Ups, evitando los Debuffs, de manera que intente supera su recórd de tiempo partida a partida.
<br>

![estetica](https://user-images.githubusercontent.com/75903737/146586989-e60ff14d-b873-4b34-8543-c88620430288.png)

- Queremos transmitir sensaciones como el agobio, al ser constantemente perseguidos por la policía y disparados por la mafia, y el frenetismo al no poder parar en ningún momento de la partida. Además también queremos transmitir la autosuperación, haciendo que los jugadores se sientan atraídos por el juego por el simple hecho de querer supersarse a si mismos.
- Heels Running se ambienta en una ciudad de los años sesenta, con una paleta de colores apagados, para transmitir al jugador la sensación de que se encuentra en la época correcta.
- La idea del juego está desarrollada gracias a una gran película de Alfred Hitchcock, llamada North by Northwest, cuya historia queda reflejada con algunos ajustes en nuestro juego, de manera que este acabe siendo lo más divertido posible.
- El escenario será visible hasta donde veamos en nuestra cámara, y solo tendremos que preocuparnos por nuestro entorno inmediato, es decir, de no morir y no ser arrestados.

<div align="center">
  <img src="https://user-images.githubusercontent.com/75903737/135530540-ad4418be-77c9-469d-9018-b463fac664ea.jpg">
</div>

<hr>

## Menús

- Menu de incio: menú con un fondo en movimiento, botón para jugar, si se pulsa comienza la experiencia de juego. Otro botón para la configuración del juego, si lo pulsas abres una ventana para configurar los diferentes aspectos del videojuego (volumen y ver los controles), botón en una esquina con el logo de nuestra empresa, si lo pulsas, despliega una ventana con los nombres de los creadores del juego.

*Falta imágen del menú principal de juego*

- Menú de pausa: dentro del juego tendremos otro menú de pausa donde podremos reaunudar el juego, salir al menú principal, o ir al menú de configuraciones donde podremos cambiar el volumen y ver los controles.

<div align="center">
  <img src="https://user-images.githubusercontent.com/82502179/143425102-ace70e46-6f85-433f-aa6c-db0293047e3f.png">
</div>

![image](https://user-images.githubusercontent.com/82502179/146576664-2f2e19f5-d7f4-410f-bdd4-8480c68aa589.png)
 

- Menú de Game Over: aparece cuando perdemos y en él podremos volver a jugar o salir al menú de inicio

![image](https://user-images.githubusercontent.com/82502179/146575662-ee4a398a-91b1-4c66-9179-35c82cb6fb23.png)

<hr>

### 3.1. Configuración
- Configuración de volumen: Podremos cambiar tanto la música como el sonido de nuestro videojuego.

### 3.2. Interfaz

Mostraremos la barra de vida que tiene el jugador, así como el tiempo que ha transcurrido en la partida.
También mostraremos el Power Up o Debuff activo en ese momento (si es que lo hay)

![image](https://user-images.githubusercontent.com/82502179/146577293-698d22e0-53a5-43b9-ab6f-594a53beb9c7.png)


### 3.3. Controles

- Movimiento : W - Saltar /  D - Dar Patada
- Configuracion : Escape - Menu Pausa / Todo con el ratón

![image](https://user-images.githubusercontent.com/82502179/146577193-94a00855-acbf-4312-8bed-a6e1c4f931ac.png)

<hr>

### 4. Contenido
- Todos los sprites de los objetos, cajas, muros, etc, así como los sprites del jugador, de la policía y de los mafiosos.
- Tendremos sonidos para los disparos, para el salto del jugador, para el choque de los objetos cayentes al suelo, para la destrucción de cajas, para los powerups, cuando el jugador reciba daño...
- También tendremos sonidos para el entorno del juego, como pitidos de coche.

### 4.1 Nivel

#### Ciudad

Nivel ambientado en una ciudad, con calles y edificios, personas... Seremos perseguidos por la policía ,y a su vez tendremos que esquivar a la mafia a lo largo de la partida.
Tenemos dos zonas destacables:
 - Suelo: El jugador intentará escapar por el suelo, donde aparecerán la mayoría de objetos estáticos y objetos cayentes. Llegados a cierto punto, el jugador deberá empezar a saltar sobre las azoteas de los edificios, donde comenzará la segunda zona.
 - Azotea de los edificos: En esta zona habrá menos objetos estáticos pero contará con la aparición de los mafiosos que dispararán al jugador. Además, el policía que perseguía al jugador ahora es un helicóptero de policía (pero tendrá las mismas funciones que el policía).

Tras atravesar la ciudad, llegaremos a una estación del tren para escapar.

### 4.2 Personajes y enemigos

#### PROTAGONISTA:
- Nuestro protagonista es Roger, un publicista al cuál la mafia esta tratando de matar por ser confundido con un agente del F.B.I y el cual será perseguido por la policía tras un juicio.

#### POLICIA:
- La policía es el enemigo que nos perseguirá. Siempre estará detrás del jugador siguiéndole el rastro. Si el jugador está a una altura diferente a la policia (jugador por encima de edificios), entonces pasará a ser perseguido por un helicóptero por el aire. Por último, si entra en contacto con el jugador, éste será arrestado y perderá la partida.

##### MAFIA:
- Se trata de enemigos estáticos cuya función es matar al jugador disparándole. Aparecerán de vez en cuando en ventanas. Se avisará al jugador mostrando el icono de un mafioso en el límite de la pantalla derecha, indicándole que cuando llegue aparecerá un mafioso en esa posición.

### 4.3. Objetos

#### Power Ups

-Café: Este PowerUp hace referencia a algo que consume mucho el protagonista de nuestro videojuego en la película de Alfred, por lo que nos incrementará la velocidad para poder escapar más facilmente de la policía y evitar ser arrestados.

-Smoking: Este smoking también hace referencia a como iba vestido nuestro protagonista, por lo que este Power Up nos ofrecerá un escudo de modo que no obtengamos ningún tipo de daño o penalización mientras su efecto esté activo.

-Reloj Verde: Dado que nuestro juego se trata de completar el nivel en el menor tiempo posible, este Power Up nos restará tiempo a la run (15s), lo que nos ayudará a concluir nuestras partidas con un tiempo mejor.

-Salmon: En referencia a uno de los alimentos de la película, cuando el jugador obtenga este objeto , recuperara vida (un punto) , facilitándole su supervivencia de los mafiosos y de los objetos arrojados por la ventana. 

### Debuffs

-Alcohol: Dado que en la película los mafiosos nos obligan a beber alcohol, hemos utilizado este debuff de manera que si lo consumimos adquiriremos una disminución de velocidad por un cierto periodo de tiempo, lo que facilitará el arresto a la policía.

-Reloj Rojo: Al contrario que el reloj verde explicado con anterioridad, este debuff nos sumará tiempo adicional (30s) al tiempo de la partida, lo que hará que concluyamos la partida con un mayor tiempo.

<hr>

### Música
- El juego contará con una melodia de fondo, además de efectos de sonido por todas las acciones significantes del juego, ya sea saltar, recibir daño, coger un power up...
<hr>

![arquitectura](https://user-images.githubusercontent.com/75903737/146587438-a1014135-4286-48f9-9d83-d9f353146827.png)

##### ARQUITECTURA DEL JUEGO
- Diagrama de Clases: https://app.creately.com/diagram/p9mz5a7aeDl/view

##### SISTEMA DE GESTIÓN 
- Pivotal: https://www.pivotaltracker.com/n/projects/2532298

##### SISTEMA DE COMUNICACIÓN

- Los miembros del equipo de desarrollo nos comunicaremos mediante nuestro propio servidor de Discord, donde tenemos distintos canales para comunicarnos e intercambiar información útil.
<hr>

![referencias](https://user-images.githubusercontent.com/75903737/146587513-ddf6149e-85a6-40e1-a94b-a1db4bc61499.png)

- North by Northwest, _Alfred Hitchcock._ 
- JetPack Joyride
- Extreme Pamplona
- Subway Surfer
- Dan the Man
