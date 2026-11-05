# Prodeóptica Constitution

## Core Principles

### I. Human-Centered & Intuitive UI/UX (NON-NEGOTIABLE)
Cada pantalla y flujo del sistema óptico debe diseñarse para minimizar la carga cognitiva del usuario operativo (optometrista, cajero, administrador).
- **Paleta y consistencia:** Uso riguroso de la identidad visual de Prodeóptica (color primario `#712b39` burdeos institucional, neutros limpios, contrastes WCAG AA).
- **Feedback inmediato y comprensible:** Notificaciones visuales claras (SweetAlert2/toasts), microinteracciones, estados de carga (skeletons/spinners) y estados vacíos informativos con llamadas a la acción.
- **Prevención de errores:** Validaciones visuales antes de someter formularios (cédulas ecuatorianas, emails, montos, descuentos que no superen el total, existencias en stock).

### II. Process Optimization & Operative Ergonomics
El software debe acelerar los procesos diarios de la óptica en vez de burocratizarlos.
- **Punto de Venta ágil:** Búsqueda rápida de productos por código/nombre, agregado instantáneo al carrito y selección de cliente en un solo paso.
- **Flujos integrados:** Conexión directa entre Ficha Médica Optométrica, Receta de Lunas, Órdenes de Laboratorio y Carrito de Ventas.
- **Cierre de Caja sin fricción:** Arqueo diario automatizado que concilia ventas, abonos y egresos desglosados por método de pago (Efectivo, Transferencia, Tarjeta).

### III. Spec-as-Source & Living Contracts (SDD)
La especificación es la única fuente de verdad viva del repositorio:
- El flujo obligatorio de desarrollo es `spec.md` (requisitos y criterios BDD) → `plan.md` (diseño técnico y contratos) → `tasks.md` (lista ejecutable) → Código.
- No se implementa código nuevo sin un contrato explícito de aceptación.
- La convergencia (`/speckit.converge`) es el árbitro final de completitud.

### IV. Financial & Inventory Atomicity
Toda mutación de dinero o existencias físicas debe ser auditable y matemáticamente consistente:
- **Kardex sincronizado:** Cada venta o salida descuenta stock y registra lote/motivo; cada recepción de proveedor alimenta el historial de entradas.
- **Abonos y Cuentas por Cobrar:** Los saldos pendientes de ventas a crédito se recalculan en tiempo real tras cada pago parcial.
- **Egresos controlados:** Todo retiro de caja menor debe tipificarse con categoría y método de pago para el balance de caja general.

### V. Test-First & Automated Verification
- Ningún endpoint o componente crítico se da por terminado sin pruebas verificadas:
  - Pruebas automatizadas en Django REST Framework para endpoints CRUD y acciones personalizadas.
  - Verificación de consistencia de contratos JSON entre frontend y backend.
  - Cero errores en linter (`npm run lint` y verificaciones de esquema).

## Technical & Architecture Constraints

- **Frontend:** Next.js 14+ (App Router), React 18, Tailwind CSS, Lucide React, SweetAlert2.
- **Backend:** Django 5+, Django REST Framework, PostgreSQL, SimpleJWT para autenticación con tokens portadores.
- **Seguridad y Roles:** Control de acceso basado en roles (`Administrador`, `Gerente`, `Usuario`) con segregación por sucursales.
- **Contratos de API:** Respuestas normalizadas en formato JSON, paginación consistente y manejo robusto de errores HTTP (400, 401, 403, 404, 500).

## Development Workflow & Quality Gates

1. **Definición:** Creación de especificación funcional con criterios Given-When-Then y escenarios de borde.
2. **Revisión y Clarificación:** Validación de requisitos mediante checklist de calidad.
3. **Planificación:** Arquitectura técnica, diagramas de flujo y definición de endpoints antes de codificar.
4. **Ejecución guiada por tareas:** Implementación paso a paso respetando dependencias.
5. **Verificación y Convergencia:** Verificación contra aceptación y suite de pruebas antes de entrega.

## Governance

- La presente constitución prevalece sobre cualquier decisión improvisada de desarrollo.
- Cualquier modificación a los principios fundamentales requiere actualización documentada y revisión de impacto en artefactos existentes.
- Todo Pull Request y entregable debe alinearse explícitamente con los principios de UI/UX, integridad y calidad aquí ratificados.

**Version**: 1.0.0 | **Ratified**: 2026-11-04 | **Last Amended**: 2026-11-04
