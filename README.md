# Prodeóptica - Workspace Raíz

Workspace integrado para el sistema **Prodeóptica**, compuesto por:

- **Frontend:** [`frontend-prodeoptica/`](./frontend-prodeoptica) (Next.js)
- **Backend:** [`backend-prodeoptica/`](./backend-prodeoptica) (Django REST Framework)

## Estructura del Proyecto

```text
Optica/
├── .gitmodules
├── Optica.code-workspace
├── frontend-prodeoptica/       (Submódulo Git)
└── backend-prodeoptica/        (Submódulo Git)
```

## Clonación con submódulos

Para clonar este repositorio completo en otra máquina utilizando la cuenta personal de GitHub:

```bash
git clone --recurse-submodules git@github-personal:MatiasG2377/prodeoptica.git
```

Si ya se clonó sin submódulos:

```bash
git submodule update --init --recursive
```

