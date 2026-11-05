# Feature Specification: Optimización Integral UI/UX, Ergonomía de Procesos y Facilidad de Uso

**Feature Branch**: `001-ui-ux-optimization`

**Created**: 2026-11-04

**Status**: Draft

**Input**: User description: "actualices tood lo de spec, pendientes, vamos a hacer pura mejora UI/UX optimización de procesos, facilidad de uso, etc."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Punto de Venta y Carrito Ágil (Priority: P1)

Como personal de atención o ventas en la óptica, quiero buscar productos al instante, añadirlos al carrito con un solo clic, ajustar cantidades y descuentos en tiempo real, y finalizar la venta sin recargar la página ni perder datos, para reducir el tiempo de espera del cliente en el mostrador.

**Why this priority**: Es el flujo central de ingresos del negocio. Cualquier fricción, demora o recarga lenta en la venta impacta directamente la satisfacción del cliente y la eficiencia del vendedor.

**Independent Test**: Puede probarse de forma independiente navegando al Dashboard, buscando un producto por nombre/código, agregando 2 unidades, aplicando un descuento válido, seleccionando método de pago y confirmando la venta; debe actualizar inventario y emitir confirmación en menos de 3 segundos.

**Acceptance Scenarios**:

1. **Given** el usuario en la pantalla de catálogo/ventas, **When** escribe parte del nombre de un armazón ("Ray-Ban") o filtra por la categoría "Gafas de Sol", **Then** la grilla se actualiza en menos de 300ms sin parpadeos ni recarga de página.
2. **Given** un producto con stock menor o igual al mínimo, **When** se visualiza en la grilla, **Then** muestra una insignia visual clara de "Stock Bajo" y alerta si se intenta vender más unidades de las disponibles.
3. **Given** un producto agregado al carrito, **When** el vendedor incrementa o disminuye la cantidad con los botones `+` / `-`, **Then** los subtotales, descuentos individuales e importe total se recalculan de forma reactiva e instantánea.
4. **Given** un descuento ingresado que supera el subtotal del ítem, **When** el usuario intenta finalizar, **Then** el sistema bloquea la acción con un mensaje comprensible en pantalla indicando el error sin perder el contenido del carrito.

---

### User Story 2 - Consulta Rápida y Registro Asistido de Pacientes y Fichas Médicas (Priority: P1)

Como optometrista u operador, quiero consultar el historial clínico de un paciente ingresando su cédula o apellido, visualizar sus recetas previas y registrar una nueva ficha con campos asistidos de refracción (esfera, cilindro, eje, adición, DNP), para optimizar el tiempo de consulta y evitar errores de prescripción.

**Why this priority**: La ficha médica es el corazón clínico de la óptica. Los optometristas necesitan rellenar datos ópticos de forma ergonómica sin desplazamientos engorrosos ni formularios confusos.

**Independent Test**: Puede probarse buscando a un paciente existente ("1720345678"); la interfaz debe cargar automáticamente sus datos personales y su historial de prescripciones anteriores en tarjetas colapsables. Al ingresar una nueva graduación y guardar, debe persistir y quedar accesible de inmediato.

**Acceptance Scenarios**:

1. **Given** el formulario de consulta clínica, **When** se digitan los 10 dígitos de la cédula del paciente, **Then** el sistema busca automáticamente y rellena nombre, contacto y antecedentes si ya existe.
2. **Given** un paciente no registrado, **When** no se encuentran coincidencias de cédula, **Then** la interfaz habilita la creación fluida del paciente en la misma vista sin interrumpir el flujo.
3. **Given** la tabla de prescripción refractiva (Ojo Derecho / Ojo Izquierdo), **When** el optometrista introduce valores estándar de esfera, cilindro y eje, **Then** los campos cuentan con formato numérico guiado con rangos ópticos coherentes y tabulación rápida entre campos.
4. **Given** una receta guardada, **When** el paciente requiere lunas graduadas, **Then** existe una acción rápida para transferir las especificaciones ópticas a la orden de trabajo de laboratorio de la venta.

---

### User Story 3 - Gestión Visual de Abonos, Saldos y Cuentas por Cobrar (Priority: P2)

Como encargado de cobranzas o administrador, quiero ver de un vistazo qué ventas tienen saldo pendiente, cuánto se ha cubierto y cuánto falta por cobrar mediante barras de progreso y colores contextuales, registrando abonos con cálculo automático del saldo restante en tiempo real.

**Why this priority**: Una gran parte de las ventas ópticas se realizan con anticipo/abono y entrega posterior contra saldo. Un control visual claro reduce la cartera vencida y evita cobros erróneos.

**Independent Test**: Puede probarse accediendo a la pestaña de Abonos, seleccionando una venta con saldo pendiente, ingresando un monto de abono; el sistema debe reflejar el nuevo saldo restante, actualizar el estado a "Completado" si llega a cero, y registrar la fecha y método de pago en el historial de la venta.

**Acceptance Scenarios**:

1. **Given** el listado de abonos, **When** una venta tiene saldo por pagar, **Then** la fila muestra el Total de Venta, Monto Abonado en verde, Saldo Restante en rojo y una barra de progreso visual del porcentaje pagado.
2. **Given** el modal para registrar un nuevo abono, **When** el usuario escribe el monto a pagar, **Then** el formulario calcula y previsualiza en vivo el nuevo saldo restante antes de presionar guardar.
3. **Given** que el monto ingresado supera el saldo pendiente, **When** el usuario intenta guardar, **Then** el sistema restringe el monto al tope del saldo y notifica con un aviso preventivo no intrusivo.
4. **Given** un clic sobre el número de venta o el historial, **When** se abre el modal de detalle, **Then** muestra la cronología de todos los abonos previos con fecha, hora, monto y cajero responsable.

---

### User Story 4 - Arqueo y Cierre de Caja en Vivo con Egresos Racionales (Priority: P2)

Como administrador o cajero de sucursal, quiero consultar el balance del día en tiempo real desglosado por métodos de pago (Efectivo en caja física, Transferencias bancarias, Tarjetas de débito/crédito) y registrar egresos operativos menores clasificados, para realizar el cierre de caja diario sin descuadres ni cálculos manuales.

**Why this priority**: El cuadre de caja es crítico al final de cada turno. Eliminar hojas de cálculo o cálculos a mano ahorra entre 20 y 40 minutos diarios y erradica pérdidas financieras.

**Independent Test**: Puede probarse filtrando el Cierre de Caja con periodo "Hoy", registrando un egreso de efectivo (ej. $15 por útiles de limpieza); el sistema debe recalcular al instante el total de caja física y el balance neto consolidado en los indicadores y gráficos de la pantalla.

**Acceptance Scenarios**:

1. **Given** la pantalla de Cierre de Caja, **When** se alternan los filtros de periodo ("Hoy", "Este Mes", "Este Año", "Histórico"), **Then** las métricas y el gráfico de dona por método de pago se actualizan instantáneamente sin recarga de pantalla.
2. **Given** ventas y abonos del día, **When** se consulta el balance, **Then** el sistema presenta dos métricas diferenciadas: **Total Caja Física** (Efectivo ventas + Efectivo abonos - Efectivo egresos) y **Balance General** (Total consolidado de todos los medios de pago).
3. **Given** la necesidad de asentar un gasto de caja chica, **When** se abre el formulario de Nuevo Egreso, **Then** se selecciona de una lista predefinida (Arriendo, Servicios básicos, Suministros, Mantenimiento, Otros) y se registra el comprobante en la tabla auditable.

---

### User Story 5 - Inventario Inteligente con Alertas de Stock y Visualización de Kardex (Priority: P3)

Como encargado de inventario, quiero visualizar el catálogo con semáforos de stock (Disponible, Agotado, Bajo Stock), registrar ingresos de mercadería con lotes y consultar la trazabilidad histórica completa de entradas/salidas de cada producto en un Kardex limpio y comprensible.

**Why this priority**: Evita quiebres de stock en monturas populares y controla la caducidad en soluciones oftálmicas y lentes de contacto.

**Independent Test**: Puede probarse seleccionando un producto en Kardex; debe mostrarse la lista ordenada cronológicamente de todas las entradas por proveedor y salidas por venta, con saldos acumulados de existencias.

**Acceptance Scenarios**:

1. **Given** la tabla de inventario, **When** el stock de un producto cae por debajo de su umbral mínimo, **Then** la fila se destaca con una etiqueta amarilla/ámbar de advertencia.
2. **Given** la pantalla de Kardex, **When** se busca un producto, **Then** se despliegan sus movimientos clasificados con badges de color (Verde = Entrada, Rojo = Salida), fecha exacta, motivo y cantidad.
3. **Given** el formulario de nuevo producto o edición, **When** se carga una fotografía del armazón, **Then** se genera una vista previa inmediata optimizada antes de guardar.

---

### User Story 6 - Navegación Unificada, Estados de Carga (Skeletons) y Feedback No Intrusivo (Priority: P3)

Como cualquier usuario del sistema, quiero navegar fluidamente entre módulos mediante una barra superior homogénea con mi sucursal y rol visibles, experimentar pantallas que no parpadean en blanco al cargar gracias a esqueletos visuales (skeletons), y recibir retroalimentación clara sin ventanas emergentes redundantes.

**Why this priority**: Unifica la estética y experiencia de usuario a lo largo de toda la plataforma, cumpliendo con el principio innegociable de UI/UX de la constitución de Prodeóptica.

**Acceptance Scenarios**:

1. **Given** cualquier página del sistema, **When** se navega desde el menú superior, **Then** la barra de navegación es idéntica en estilo, color y accesibilidad, indicando la sucursal activa y el usuario autenticado.
2. **Given** una petición de red en curso, **When** los datos están cargando, **Then** se muestran componentes esqueleto (skeletons) que replican la estructura de las tablas o tarjetas en vez de una pantalla en blanco.
3. **Given** una acción completada con éxito (guardar producto, registrar abono, actualizar ficha), **When** finaliza la operación, **Then** se emite una notificación visual temporal elegante y clara.

---

### Edge Cases

- **Pérdida de conectividad / Sesión expirada:** Si el token JWT expira durante la edición de una ficha médica o venta, el sistema debe alertar al usuario y permitir reconectar sin borrar el contenido digitado en el formulario.
- **Concurrencia de stock:** Si dos vendedores intentan vender la última unidad de un armazón simultáneamente, el sistema debe confirmar al primero y avisar inmediatamente al segundo que el producto se agotó.
- **Valores nulos en recetas ópticas:** Las fichas médicas deben admitir prescripciones monoculares (un solo ojo afectado) sin obligar a llenar ceros artificiales en el ojo sano.
- **Descuentos agresivos:** El sistema no debe permitir bajo ninguna circunstancia que el descuento total de un producto o venta supere su valor nominal (evitando subtotales negativos).

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema DEBE proveer búsqueda reactiva (debounce de 300ms) por nombre, código y marca en el catálogo de productos y ventas.
- **FR-002**: El carrito de ventas DEBE validar que las cantidades no excedan las existencias físicas registradas en la sucursal.
- **FR-003**: El sistema DEBE validar el formato de cédula de identidad ecuatoriana (10 dígitos numéricos) y formato de correo electrónico en clientes y pacientes.
- **FR-004**: La interfaz de Ficha Médica DEBE permitir registrar parámetros ópticos completos (esfera, cilindro, eje, adición, agudeza visual, DNP) para ambos ojos y asociar diagnósticos.
- **FR-005**: El sistema DEBE enlazar automáticamente al paciente con el cliente pagador en una venta si ambos comparten cédula o parentesco.
- **FR-006**: La tabla de Abonos DEBE calcular y desplegar dinámicamente el valor restante de cada venta pendiente (`total_venta - monto_abonado`).
- **FR-007**: El sistema DEBE registrar cada pago de abono de manera atómica, actualizando el estado de la venta a 'F' (Finalizada) cuando el saldo llegue a cero.
- **FR-008**: El Cierre de Caja DEBE totalizar y desglosar ventas, abonos y egresos por método de pago: Efectivo, Transferencia y Tarjeta.
- **FR-009**: El sistema DEBE computar el **Total de Caja Física** exclusivamente a partir de las transacciones efectuadas en efectivo.
- **FR-010**: El inventario DEBE marcar automáticamente los productos en estados "Disponible", "Bajo Stock" o "Agotado" según los límites mínimo y máximo configurados.
- **FR-011**: Cada movimiento de inventario (venta, ajuste, reposición) DEBE generar un registro inmutable en el Kardex con timestamp, cantidad y motivo.
- **FR-012**: Las pantallas DEBE implementar placeholders de esqueleto (skeleton loaders) durante la carga asíncrona de datos para evitar saltos de diseño (CLS).
- **FR-013**: Toda alerta de error DEBE explicar la causa en lenguaje humano comprensible y sugerir una acción correctiva en lugar de emitir códigos o trazas de excepción.
- **FR-014**: La barra de navegación superior DEBE mostrar consistentemente el nombre de la sucursal activa, el usuario logueado y su rol institucional.
- **FR-015**: El sistema DEBE soportar órdenes de trabajo vinculadas a laboratorios ópticos con número de guía/orden para rastreo de lunas talladas.

### Key Entities

- **Venta**: Transacción comercial en mostrador; agrupa cliente, sucursal, artículos, totales, método de pago, orden de laboratorio y estado ('P' Pendiente, 'F' Finalizada, 'C' Cancelada).
- **ArticuloVenta**: Ítem específico dentro de una venta con producto, cantidad, precio de venta al público y descuento aplicado.
- **Abono**: Pago parcial amortizable a una venta con saldo; registra fecha, monto, método de pago y estado de cancelación.
- **Cliente**: Persona natural o jurídica registrada para facturación y cobro.
- **Paciente**: Sujeto de atención clínica optométrica; almacena historial, antecedentes oculares y relación con sus fichas médicas.
- **FichaMedica**: Evaluación optométrica con mediciones refractivas cuantitativas (esfera, cilindro, eje, adición, DNP) y cualitativas (diagnóstico, tipo de lente, material).
- **Egreso**: Gasto operativo menor de caja chica; tipificado con categoría y método de pago para conciliación de caja.
- **MovimientoInventario (Kardex)**: Registro de auditoría de flujo de mercadería clasificado como Entrada o Salida.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El tiempo promedio para completar una venta desde la búsqueda del producto hasta la confirmación se reduce a menos de 45 segundos.
- **SC-002**: La búsqueda de pacientes y precarga de antecedentes en Ficha Médica se completa en menos de 500ms tras ingresar la cédula.
- **SC-003**: Cero incidencias de descuadres en el Cierre de Caja diario atribuibles a cálculos erróneos entre efectivo físico y transferencias.
- **SC-004**: El 100% de las tablas y vistas del sistema despliegan estados de carga asistidos (skeletons) y estados vacíos amigables cuando no existen registros.
- **SC-005**: 100% de consistencia visual en la paleta institucional (`#712b39`), tipografía y diseño responsive en resoluciones de escritorio y tablets de mostrador.

---

## Assumptions

- Los usuarios operativos disponen de conexión de red local o internet estable para interactuar con la API REST de Django.
- Los clientes finales utilizan como identificación principal la cédula de ciudadanía ecuatoriana de 10 dígitos o RUC de 13 dígitos.
- El arqueo de caja se realiza al término de cada jornada laboral por sucursal física.
- Las imágenes de productos se almacenan y sirven a través del backend o URLs relativas estándar de medios.

