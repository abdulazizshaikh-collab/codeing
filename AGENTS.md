# Working notes for this repository

Static site — plain HTML/CSS/JS, no build step, no backend, no database.

## Layout

- `index.html` — home page with the lesson list.
- `lessons/*.html` — one file per lesson (HTML, CSS, JavaScript).
- `assets/style.css`, `assets/app.js` — shared styles and the only script (mobile nav +
  quiz feedback).
- Lesson pages link assets with root-absolute paths (`/assets/style.css`), so open the
  site through the dev server at `/`, not as `file://`.

## Running it

`docker-compose.base44.yml` runs Node 22 with `vite`:

- The repo is bind-mounted at `/app`; `node_modules` is a named volume so the checkout
  stays clean. Dependencies install on container start (`npm install`) before
  `npm run dev`, so a `package.json` change only needs a `docker compose restart web`.
- Vite listens on `0.0.0.0:3000` with `--strictPort`; host port 3000 is the preview entry.
- The preview hostname reaches Vite through the `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`
  pass-through. Without it Vite answers "Blocked request" for the preview host. Never
  hardcode a preview host in a file — the sandbox host changes between environments.
- There is no framework config file on purpose; the bind mount shares the sandbox
  filesystem, so Vite's watcher sees edits without polling.

## Verifying a change

```sh
docker compose -f docker-compose.base44.yml ps          # web should be healthy
curl -s localhost:3000/ | head -20                      # real HTML, not a stub
docker compose -f docker-compose.base44.yml logs -f web # Vite compile output
```

Health check uses `node -e` + `fetch` (no curl dependency in the image).

## Gotchas

- `npm install` writes `package-lock.json` into the bind mount — commit it, it is the
  real lockfile.
- Editing CSS or HTML hot-reloads in place; no restart or rebuild is needed.
