# codeing
i like to learn codeing :D

A small static site with three beginner lessons: HTML, CSS and JavaScript.

## Run it

```sh
docker compose -f docker-compose.base44.yml up
```

Then open <http://localhost:3000>.

The site is plain HTML, CSS and JavaScript: pages live in `lessons/`, shared styles and
scripts in `assets/`. Vite only serves those files and reloads the page when one changes —
there is no build step and no backend, so a text editor is all the setup you need.

If you have Node installed locally you can skip Docker entirely:

```sh
npm install
npm run dev
```

## Sandbox notes

`docker-compose.base44.yml` passes two variables through to the dev server so the hosted
preview can reach it: `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` (lets Vite accept the
preview hostname) and `BASE44_PREVIEW_MODE` (set to `1` by the platform). Both are
pass-throughs with no baked-in values; when they are unset the site behaves exactly as it
does locally.
