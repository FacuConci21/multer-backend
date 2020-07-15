# multer-backend
<h5>Backend de practica con multer y transacciones</h5>

<p>Proyecto de backend realizado con la iniciativa de crear un backend capaz de almacenar archivos y procesar transacciones.</p>
<p>Bueno, unicamente tiene una sola transaccion.</p>
<p>Es una API REST, que simula un comercio electronico, por ello las collecciones utilizadas son 3:</p>
-clientes (clients).
-productos (products).
-vendedores (sellers).

<p>Y su unica transaccion simula la compra de un producto por parte del cliente.</p>
En el dominio del problema planteado (o mas bien, la idea principal que tuve al hacer este proyecto) los vendedores se encargan de publicar
productos que estaran disponibles a los clientes, de los cuales los clientes tendran visible el nombre, una descripcion sobre el producto y el precio.

Por detras el vendedor debera especificar la cantidad disponible de dicho poducto.

La cantidad es un valor entero positivo que debe ser actualizado cuando un cliente compra X cantidad de unidades. De mas esta decir que si la cantidad
solicitada es mayor a la disponible, no se puede realizar la operacion de compra.

Cada producto conoce al vendedor que lo publicó.

Ambos, vendedor y cliente tienen un nombre completo con nombre y apellido, dni y una fecha de nacimiento. La fecha puede estar vacia, el resto son
datos obligatorios.

Los clientes poseen un atributo carrito que no es mas que una lista de las compras que han realizado, donde se conocen (de cada una):
nombre del producto que compro, la cantidad que solicito y el precio unitario con el que lo compro en ese momento, ya que el precio cambia con el tiempo.

La idea para el futuro, o de hecho puede programarlo el que quiera en cualquier momento, es que todas las colecciones tengan un atributo "imgPath" que sea
la url de una imagen que represente, la foto de perfil de un vendedor/cliente y la foto de muestra de un producto.

<h6>PD:</h6>

Hay que iniciar un proyecto con:
```sh
$ npm init
```
despues instalar las dependencias (todas menos nodemon):
```sh
$ npm install --save all-dependencies
```

Para saber que dependencias hay que instalar, podes abrir el package.txt que tiene las dependencias listadas.
por ultimo, para instalar nodemon:
```sh
$ npm install --save nodemon -D
```
agregas la opcion "-D" para que sea una dependencia de desarrollo y se guarde en la seccion "devDependencies" del package.json

Y todo esto culpa de que aun no se como se coloca el archivo gitignore, perdon jaja.
