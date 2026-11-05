# Quickstart: Validación de Escenarios de UI/UX y Procesos

Este documento describe los escenarios clave para verificar manualmente o mediante pruebas automatizadas las mejoras de proceso y experiencia de usuario.

---

## Escenario 1: Flujo Rápido de Venta en Mostrador

1. **Acceso:** Iniciar sesión con `admin` / `admin` y abrir `/dashboard`.
2. **Catálogo reactivo:** Digitar "Ray" en la barra de búsqueda. Comprobar que en menos de 300ms se filtran las monturas Ray-Ban sin recarga de página.
3. **Control de carrito:**
   - Hacer clic en "Agregar al Carrito".
   - Incrementar a 2 unidades con el botón `+`.
   - Modificar el campo de descuento a `$5.00`.
   - Verificar que el subtotal y total se actualizan inmediatamente.
4. **Finalización:** Hacer clic en "Finalizar Venta". Verificar que el carrito persiste en `/venta` y que los datos del cliente se autocompletan al ingresar la cédula.

---

## Escenario 2: Refracción Óptica y Consulta de Historial

1. **Acceso:** Abrir el módulo `/ficha-medica`.
2. **Búsqueda automática:** Ingresar la cédula `1720345678`.
3. **Verificación:** Comprobar que se cargan automáticamente los nombres de Carlos Mendoza y sus antecedentes.
4. **Historial clínico:** Expandir el acordeón de fichas previas y verificar las mediciones refractivas históricas.
5. **Guardar nueva refracción:** Introducir una nueva graduación y presionar "Guardar Ficha". Verificar confirmación visual y adición inmediata al historial visible.

---

## Escenario 3: Cobro de Abono con Cálculo en Vivo

1. **Acceso:** Abrir `/abonos`.
2. **Inspección visual:** Localizar una venta con saldo pendiente en rojo y verificar la barra de porcentaje abonado.
3. **Abono asistido:**
   - Hacer clic en el botón de abonar.
   - En el modal, escribir un importe parcial.
   - Constatar que el texto "Nuevo saldo restante" se calcula en tiempo real.
   - Guardar el abono y verificar que la tabla se actualiza.

---

## Escenario 4: Cuadre de Caja Diario y Registro de Egreso

1. **Acceso:** En `/abonos`, cambiar a la pestaña "Cierre de Caja".
2. **Filtro rápido:** Seleccionar el botón "Hoy".
3. **Comprobación:** Revisar el gráfico de distribución de pagos y verificar que el valor de "Total Caja Física" refleja con exactitud el dinero en efectivo.
4. **Egreso:** Cambiar a la pestaña "Egresos", crear un egreso de prueba ($10.00 en efectivo para cafetería), regresar a "Cierre de Caja" y corroborar que el efectivo en caja física se redujo en $10.00 exactos.

