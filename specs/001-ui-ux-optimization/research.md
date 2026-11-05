# Technical Research: Optimizaciones UI/UX y Ergonomía de Procesos - Prodeóptica

## 1. Ergonomía en Punto de Venta (POS) y Carrito

### Problema actual
- El vendedor experimenta latencia perceptiva si cada búsqueda de producto dispara peticiones directas sin debounce o si la grilla parpadea en blanco al recargar.
- En la finalización de la venta, la navegación entre la pantalla de catálogo y la confirmación debe ser inmediata, sin pérdidas de datos si el usuario regresa atrás a revisar un armazón.

### Decisión de diseño
- **Debounce de 300ms:** Implementado mediante `useMemo` o temporizador con limpieza de `AbortController` para cancelar búsquedas obsoletas.
- **Micro-estados reactivos:** Manejo local en memoria (`useCart`) sincronizado con `localStorage` para persistencia en caso de recarga involuntaria del navegador.
- **Inspección proactiva de stock:** Cada tarjeta de producto despliega un indicador visual (`Badge`) con código de color:
  - Verde (`Disponible` con stock > mínimo)
  - Ámbar (`Stock Crítico` cuando stock <= mínimo)
  - Rojo / Deshabilitado (`Agotado` cuando stock = 0).
- **Control de teclado:** Atajo numérico rápido en el carrito (`+` para aumentar, `-` para reducir, `Delete` para remover).

---

## 2. Refracción Clínica y Consulta de Pacientes

### Problema actual
- La captura de graduaciones optométricas (esfera, cilindro, eje, adición) en interfaces web suele ser frustrante si los inputs son de texto libre sin validación de formato numérico de óptica (pasos de 0.25 dioptrías, rangos de esfera -20.00 a +20.00, cilindros negativos, ejes 0° a 180°).
- La búsqueda de pacientes por cédula a menudo requería hacer clic en botones separados de búsqueda.

### Decisión de diseño
- **Búsqueda automática por cédula ecuatoriana (10 dígitos):** Al alcanzar el décimo dígito válido, se dispara la consulta en segundo plano sin necesidad de presionar un botón de "Buscar".
- **Tarjetas colapsables de historial:** Las prescripciones anteriores se presentan ordenadas cronológicamente con la última consulta expandida y las anteriores en acordeones colapsables para evitar desplazamiento vertical excesivo.
- **Campos numéricos asistidos:** Selectores/steppers con incrementos de `0.25` para esferas y cilindros, y `1°` para ejes, permitiendo tanto digitación directa como ajuste rápido con flechas del teclado.

---

## 3. Visualización y Flujo de Abonos

### Problema actual
- En listas tradicionales de cobranzas solo se muestran números en texto plano. El usuario debe calcular mentalmente el porcentaje cubierto o cuánto resta pagar.
- Riesgo de ingresar abonos superiores a la deuda existente.

### Decisión de diseño
- **Indicador de barra de progreso bicromática:** Verde para lo abonado, gris para el total, con el porcentaje textual visible (`60% pagado`).
- **Cálculo en vivo en el modal de pago:** Al digitar el monto en el modal de abono, el saldo resultante se recalcula inmediatamente en pantalla con tipografía destacada antes de guardar.
- **Validación de tope:** Si el monto ingresado excede el saldo restante, el campo se autolimita y muestra un aviso visual preventivo en color ámbar.

---

## 4. Arqueo y Cierre de Caja en Vivo

### Problema actual
- Mezclar el efectivo físico con pagos electrónicos (transferencias bancarias o cobros con tarjeta) produce descuadres en el cajón de dinero al final del día.

### Decisión de diseño
- **Doble indicador financiero:**
  1. **Caja Física:** `(Ventas en Efectivo + Abonos en Efectivo) - Egresos en Efectivo`. Corresponde al dinero real en billetes y monedas que debe estar en el cajón.
  2. **Balance General:** Total consolidado de todos los métodos de pago.
- **Filtros temporales con preset de 1 clic:** "Hoy", "Este Mes", "Este Año", "Histórico", sin requerir que el usuario seleccione manualmente fechas en calendarios para las consultas habituales.
- **Categorización obligatoria de egresos:** Menú desplegable asistido (Arriendo, Servicios básicos, Suministros, Mantenimiento, Otros) para clasificar gastos operativos menores.

---

## 5. Arquitectura de Navegación y Skeletons

### Problema actual
- Las páginas mostraban spinners genéricos o pantallas en blanco ("blinks") mientras cargaban los datos desde el backend, dando una sensación de lentitud o inestabilidad.
- Existían diferencias entre los componentes `Header` y `Header2`.

### Decisión de diseño
- **Skeletons modulares:** Componentes tipo esqueleto con animación `animate-pulse` que imitan la forma de las tablas y tarjetas mientras `loading === true`.
- **Header unificado:** Un único componente `Header` que despliega el logo, la sucursal activa, el nombre del usuario logueado con badge de rol, menú desplegable con accesos a todos los módulos y botón de cierre de sesión seguro.
- **Toasts no intrusivos:** Notificaciones de confirmación rápidas (auto-dismiss en 2.5s) para acciones frecuentes, reservando modales tipo SweetAlert2 únicamente para confirmaciones destructivas (eliminar producto, anular venta).

