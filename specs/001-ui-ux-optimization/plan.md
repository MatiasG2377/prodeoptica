# Implementation Plan: Optimización Integral UI/UX, Ergonomía de Procesos y Facilidad de Uso

**Branch**: `001-ui-ux-optimization` | **Date**: 2026-11-04 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-ui-ux-optimization/spec.md`

## Summary

Implementar un conjunto integral de mejoras de ergonomía y experiencia de usuario en todo el sistema Prodeóptica:
1. **Punto de Venta:** Búsqueda reactiva con debounce de 300ms, control visual de stock con badges cromáticos, cálculo de subtotales reactivo en carrito y validación estricta de topes de descuento.
2. **Ficha Médica:** Búsqueda automática de pacientes al completar 10 dígitos de cédula, campos asistidos de refracción óptica e historial clínico en tarjetas colapsables.
3. **Abonos y Cobranzas:** Barra de progreso porcentual del saldo cubierto, cálculo interactivo en vivo del nuevo saldo en el modal de abono y límite de seguridad para evitar sobrepagos.
4. **Cierre de Caja:** Filtros temporales de un clic ("Hoy", "Este Mes", "Este Año"), discriminación matemática entre caja física y balance general, y categorización asistida de egresos.
5. **Consistencia Visual:** Header unificado con indicador de sucursal y rol, loaders tipo skeleton en tablas y tarjetas, y feedback visual no invasivo.

## Technical Context

**Language/Version**: JavaScript / React 18 / Next.js 14+ (App Router) y Python 3.11+ / Django 5.1
**Primary Dependencies**: Next.js, Tailwind CSS, Lucide React, SweetAlert2, Date-fns, Chart.js, Django REST Framework, SimpleJWT
**Storage**: PostgreSQL (`inventario` db)
**Testing**: Django Test Suite (`python manage.py test`) y ESLint (`npm run lint`)
**Target Platform**: Navegadores modernos de escritorio y tablets en mostradores de sucursales
**Project Type**: Web Application (Frontend Next.js + Backend Django REST Framework)
**Performance Goals**: Búsqueda reactiva en <300ms, carga inicial de tablas con skeletons en <400ms, recálculo reactivo de carrito y saldos en <16ms (60 FPS)
**Constraints**: Sesión con SimpleJWT, paleta obligatoria `#712b39`, validaciones de cédula ecuatoriana sin recargar página
**Scale/Scope**: 6 módulos principales (Dashboard, Ventas, Fichas Médicas, Abonos/Caja, Inventario/Kardex, Layout Header)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Human-Centered & Intuitive UI/UX:** Cumple. Diseñado para eliminar fricción, utilizar la paleta `#712b39` y evitar parpadeos con skeletons.
- [x] **II. Process Optimization & Operative Ergonomics:** Cumple. Agiliza checkout, autocompleta clientes/pacientes por cédula y ofrece cierres de caja en 1 clic.
- [x] **III. Spec-as-Source & Traceability:** Cumple. Especificado formalmente en `spec.md`, `research.md`, `data-model.md`, `contracts/` y `tasks.md`.
- [x] **IV. Financial & Inventory Atomicity:** Cumple. Cierre de caja matemáticamente exacto; inventario y abonos actualizados atómicamente.
- [x] **V. Test-First & Automated Verification:** Cumple. Todos los endpoints cuentan con contratos JSON y pruebas de backend validadas con HTTP 200.

## Project Structure

### Documentation (this feature)

```text
specs/001-ui-ux-optimization/
├── spec.md              # Requisitos y criterios de aceptación funcionales (BDD/EARS)
├── plan.md              # Este plan de implementación técnica y arquitectura
├── research.md          # Investigación de decisiones técnicas y ergonomía de UI
├── data-model.md        # Esquemas de datos, entidades y relaciones
├── quickstart.md        # Escenarios de prueba y validación rápida
├── contracts/           # Contratos JSON Schema de los endpoints
│   ├── pos-sales.json
│   ├── medical-records.json
│   └── cash-register.json
└── tasks.md             # Tareas ordenadas y dependencias de implementación
```

### Source Code Layout

```text
backend-prodeoptica/
└── REST_API_OPTICA/
    ├── inventario/
    │   ├── API/
    │   │   ├── serializers/   # Serializadores DRF normalizados
    │   │   ├── views/         # ViewSets y endpoints de negocio
    │   │   └── urls.py        # Enrutador REST API
    │   ├── models/            # Modelos de datos en PostgreSQL
    │   ├── admin.py           # Configuración de Django Administration
    │   └── management/commands/seed.py # Seeders de datos

frontend-prodeoptica/
└── app/
    ├── components/
    │   ├── common/Header.jsx  # Header unificado y persistente
    │   ├── common/Skeleton.jsx # Placeholders de carga no invasivos
    │   ├── dashboard/         # Catálogo y carrito de ventas
    │   ├── ficha-medica/      # Refracción asistida e historial
    │   ├── abonos/            # Gestión de cuentas y modal de abono
    │   └── caja/              # Cierre de caja y métricas
    ├── hooks/                 # Lógica reactiva desacoplada
    └── services/              # Clientes de API REST
```

**Structure Decision**: Arquitectura desacoplada en dos aplicaciones (Frontend Next.js y Backend Django), comunicadas por endpoints REST y tokens SimpleJWT.

## Complexity Tracking

No violations to the constitution. The solution reuses existing libraries and models without introducing unnecessary abstractions.
