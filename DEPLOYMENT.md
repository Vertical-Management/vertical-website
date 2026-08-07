# Deploy — Vertical Management (Vercel + Resend)

Guía corta para producción en **Vercel** con formulario real vía **Resend**.

---

## 1. Requisitos

- Cuenta [Vercel](https://vercel.com)
- Repo en GitHub (recomendado) **o** deploy por CLI
- (Opcional pero recomendado) cuenta [Resend](https://resend.com) para emails del form

---

## 2. Deploy con GitHub (recomendado)

### A. Sube el código

```bash
git add .
git commit -m "Vertical high-craft redesign — production ready"
git push origin main
```

### B. Importa en Vercel

1. [vercel.com/new](https://vercel.com/new)
2. **Import** el repositorio
3. Framework: **Next.js** (auto)
4. Root: `.` (este proyecto)
5. **Deploy**

### C. Variables de entorno (Vercel → Project → Settings → Environment Variables)

| Name | Value | Environments |
|------|--------|--------------|
| `NEXT_PUBLIC_SITE_URL` | `https://somvertical.ad` (o la URL `.vercel.app` temporal) | Production, Preview |
| `RESEND_API_KEY` | `re_xxxxxxxx` | Production (y Preview si quieres) |
| `CONTACT_TO_EMAIL` | `hola@somvertical.ad` | Production |
| `CONTACT_FROM_EMAIL` | `Vertical <hola@somvertical.ad>` | Production |

Luego **Redeploy** (Deployments → ⋮ → Redeploy).

### D. Dominio custom (`somvertical.ad`)

1. Vercel → Project → **Settings → Domains** → add `somvertical.ad` (+ `www` si aplica)
2. En tu DNS (registrar):

| Type | Name | Value |
|------|------|--------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

(Vercel muestra los records exactos al añadir el dominio.)

3. Actualiza `NEXT_PUBLIC_SITE_URL=https://somvertical.ad` y redeploy.

---

## 3. Deploy por CLI (esta máquina)

```bash
# Login (abre el navegador)
npx vercel login

# Preview
npx vercel

# Production
npx vercel --prod
```

Añade envs:

```bash
npx vercel env add RESEND_API_KEY
npx vercel env add CONTACT_TO_EMAIL
npx vercel env add CONTACT_FROM_EMAIL
npx vercel env add NEXT_PUBLIC_SITE_URL
npx vercel --prod
```

O usa el dashboard de Vercel (más cómodo).

---

## 4. Resend (emails del formulario)

1. [resend.com/api-keys](https://resend.com/api-keys) → Create API Key  
2. [resend.com/domains](https://resend.com/domains) → Add `somvertical.ad`  
3. Añade los DNS que indique Resend (SPF/DKIM)  
4. Cuando el dominio esté **Verified**:

```env
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=hola@somvertical.ad
CONTACT_FROM_EMAIL=Vertical <hola@somvertical.ad>
```

### Prueba sin dominio verificado

Puedes usar el sender de onboarding de Resend (solo para tests, con límites):

```env
CONTACT_FROM_EMAIL=Vertical <onboarding@resend.dev>
```

Sin `RESEND_API_KEY`, el form **sigue funcionando**: la API loguea el mensaje en los logs de Vercel (Functions → `/api/contact`).

---

## 5. Checklist post-deploy

- [ ] Home carga en la URL de producción  
- [ ] `/servicios`, `/proyectos`, `/contacto` OK  
- [ ] `/sitemap.xml` y `/robots.txt` accesibles  
- [ ] Formulario de contacto → 200 y mail (o log)  
- [ ] OG: compartir un link y ver `/og.svg`  
- [ ] Dominio custom + HTTPS  
- [ ] `NEXT_PUBLIC_SITE_URL` = dominio final  

### Probar form en prod

```bash
curl -X POST https://TU-DOMINIO/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test\",\"email\":\"tu@email.com\",\"message\":\"Hola desde deploy checklist — coin insert.\"}"
```

---

## 6. Scripts locales

```bash
npm run build        # build producción
npm run start        # servir .next
npx vercel           # preview
npx vercel --prod    # production
```

---

## Notas

- Región por defecto en `vercel.json`: **cdg1** (París) — cercana a Andorra/ES.  
- El workflow antiguo de GitHub Pages (Astro) no aplica a este stack Next.js; usa Vercel.  
- Nunca commitees `.env.local` (ya está en `.gitignore`).
