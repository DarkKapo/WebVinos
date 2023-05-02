--Eliminar Base de Datos para evitar errores
DROP DATABASE tiendaVinos;

--Crear Base de Datos
CREATE DATABASE tiendaVinos;

--Conectarse a la Base de Datos
\c tiendavinos;

-- --Crear tabla que almacena los productos
CREATE TABLE administrador(administrador_id SERIAL PRIMARY KEY, email VARCHAR(40), password VARCHAR(12));
CREATE TABLE registro_compras(registro_id SERIAL, email VARCHAR(40) NOT NULL, telefono VARCHAR(12) NOT NULL, region VARCHAR(50) NOT NULL, comuna VARCHAR(25) NOT NULL, direccion VARCHAR(50) NOT NULL);
CREATE TABLE productos(producto_id SERIAL PRIMARY KEY, nombre VARCHAR(20) NOT NULL, imagen VARCHAR(100) NOT NULL, precio INT CHECK (precio >= 0.00), stock INT CHECK (stock > 0.00), descripcion VARCHAR(200), oferta BOOLEAN);
CREATE TABLE pedidos(pedido_id SERIAL PRIMARY KEY, codigo_pedido VARCHAR(12) NOT NULL, email_pedido VARCHAR(40) NOT NULL, producto_id INT, nombre VARCHAR(20), cantidad INT, completado BOOLEAN, fecha DATE DEFAULT CURRENT_DATE);

-- --Agregando datos de prueba
-- --cliente
INSERT INTO administrador(email, password) VALUES ('admin@root.cl', '123');
-- INSERT INTO usuarios(correo, password) VALUES ('user@root.cl', '123');
-- INSERT INTO usuarios(correo, password) VALUES ('user1@root.cl', '123');
-- INSERT INTO usuarios(correo, password) VALUES ('user2@root.cl', '123');
-- --productos
-- INSERT INTO productos(nombre, imagen, precio, stock, descripcion) VALUES ('Vino1', 'images.com/1', 8000, 5, 'Origen de Talca');
-- INSERT INTO productos(nombre, imagen, precio, stock, descripcion) VALUES ('Vino2', 'images.com/2', 12000, 7, 'Origen de Francia');
-- INSERT INTO productos(nombre, imagen, precio, stock, descripcion) VALUES ('Vino3', 'images.com/3', 3000, 20, 'Origen de Arica');
-- INSERT INTO productos(nombre, imagen, precio, stock, descripcion) VALUES ('Vino4', 'images.com/4', 20000, 4, 'Origen de Santiago');
-- INSERT INTO productos(nombre, imagen, precio, stock, descripcion) VALUES ('Vino5', 'images.com/5', 25000, 15, 'Origen de Argentina');
--SELECT * FROM productos;
--compra, detalle y actualización del stock
-- BEGIN TRANSACTION;
--     INSERT INTO compras(cliente_id, fecha) VALUES (1, current_date);
--     INSERT INTO detalle_compras(compra_id, producto_id, cantidad) VALUES (1, 2, 2);
--     UPDATE productos SET stock = stock - 2 WHERE producto_id = 2;
-- COMMIT;
-- BEGIN TRANSACTION;
--     INSERT INTO compras(cliente_id, fecha) VALUES (3, current_date);
--     INSERT INTO detalle_compras(compra_id, producto_id, cantidad) VALUES (2, 4, 1);
--     UPDATE productos SET stock = stock - 1 WHERE producto_id = 4;
-- COMMIT;
-- BEGIN TRANSACTION;
--     INSERT INTO compras(cliente_id, fecha) VALUES (3, current_date);
--     INSERT INTO detalle_compras(compra_id, producto_id, cantidad) VALUES (3, 5, 4);
--     UPDATE productos SET stock = stock - 4 WHERE producto_id = 5;
-- COMMIT;

--Mostrar tablas
SELECT * FROM administrador;
SELECT * FROM registro_compras;
SELECT * FROM productos;
SELECT * FROM pedidos;
-- SELECT * FROM compras;
-- SELECT * FROM detalle_compras;

\c rodrigo