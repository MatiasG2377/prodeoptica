# Despliegue gratuito — Prodeoptica

Stack: Next.js (frontend) + Django/DRF (backend) + Postgres.

- **Frontend** → Vercel
- **Backend** → Render (free web service)
- **DB** → Neon (Postgres free, sin expiración)

Cada submódulo (`frontend-prodeoptica`, `backend-prodeoptica`) es su propio repo de GitHub — Render y Vercel se conectan directo a cada uno, no al repo raíz.

## 1. Base de datos — Neon

1. Crear cuenta en https://neon.tech, nuevo proyecto.
2. Copiar del connection string los valores: host, database, user, password, port (5432).

## 2. Backend — Render

1. https://render.com → New → Blueprint → conectar repo `backend-prodeoptica`.
2. Render detecta `render.yaml` (rootDir `REST_API_OPTICA`, build + migrate + gunicorn ya configurados).
3. Completar las env vars marcadas `sync: false` en el dashboard:
   - `ALLOWED_HOSTS` → `prodeoptica-backend.onrender.com` (el dominio que Render asigna)
   - `CORS_ALLOWED_ORIGINS` → `https://<tu-proyecto>.vercel.app` (dominio de Vercel, sin slash final)
   - `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST` → valores de Neon
4. Deploy. Verificar logs: migración corre sola en el build.
5. Crear superusuario (una vez, vía Shell de Render): `python manage.py createsuperuser`.

Nota: el free tier de Render duerme tras ~15 min sin tráfico — el primer request después tarda ~30-50s en despertar.

## 3. Frontend — Vercel

1. https://vercel.com → New Project → conectar repo `frontend-prodeoptica`.
2. Framework se autodetecta (Next.js). No requiere config extra.
3. Agregar env var en el dashboard (Settings → Environment Variables):
   - `NEXT_PUBLIC_API_URL` → `https://prodeoptica-backend.onrender.com` (sin slash final, sin `/api`)
4. Deploy.

## 4. Verificación

1. Abrir el front en Vercel, probar login (`/login/` contra el backend).
2. Si falla por CORS: revisar que `CORS_ALLOWED_ORIGINS` en Render tenga el dominio exacto de Vercel (incluye `https://`).
3. Si falla por DB SSL: `prod.py` ya fuerza `sslmode=require` (Neon lo exige).

## Cambios hechos al código para esto

- `backend-prodeoptica/REST_API_OPTICA/requirements.txt`: + `gunicorn`, `whitenoise`
- `backend-prodeoptica/REST_API_OPTICA/REST_API_OPTICA/settings/base.py`: WhiteNoise middleware + `STATIC_ROOT` + `STORAGES` (sirve estáticos sin servicio aparte)
- `backend-prodeoptica/REST_API_OPTICA/REST_API_OPTICA/settings/prod.py`: `sslmode=require` para Neon
- `backend-prodeoptica/render.yaml`: blueprint de Render (build, migrate, start)
