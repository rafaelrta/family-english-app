
/* =========================================================
   ENGLISH FAMILY
   SERVICE WORKER
   Cache e suporte offline
   ========================================================= */

const CACHE_NAME = "english-family-v1.5.0";

const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icon.svg"
];

/* =========================================================
   1. INSTALAÇÃO
   ========================================================= */

self.addEventListener("install", event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      /*
       * Um arquivo indisponível não deve impedir
       * o cache dos demais recursos.
       */
      await Promise.allSettled(
        APP_SHELL.map(path => cache.add(path))
      );

      await self.skipWaiting();
    })()
  );
});

/* =========================================================
   2. ATIVAÇÃO E LIMPEZA DE CACHES ANTIGOS
   ========================================================= */

self.addEventListener("activate", event => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames
          .filter(name =>
            name.startsWith("english-family-") &&
            name !== CACHE_NAME
          )
          .map(name => caches.delete(name))
      );

      await self.clients.claim();
    })()
  );
});

/* =========================================================
   3. REQUISIÇÕES
   ========================================================= */

self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  /*
   * Não interceptar serviços externos, APIs ou outros sites.
   */
  if (url.origin !== self.location.origin) {
    return;
  }

  /*
   * Para navegação: tenta a rede primeiro e utiliza
   * o index em cache se estiver offline.
   */
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);

          if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put("./index.html", response.clone());
          }

          return response;
        } catch (error) {
          const cachedPage = await caches.match(request);

          if (cachedPage) {
            return cachedPage;
          }

          const cachedIndex = await caches.match("./index.html");

          if (cachedIndex) {
            return cachedIndex;
          }

          return new Response(
            "Você está offline. Conecte-se à internet para carregar o aplicativo pela primeira vez.",
            {
              status: 503,
              headers: {
                "Content-Type": "text/plain; charset=utf-8"
              }
            }
          );
        }
      })()
    );

    return;
  }

  /*
   * Para arquivos locais: cache primeiro; se não existir,
   * busca na rede e guarda uma cópia válida.
   */
  event.respondWith(
    (async () => {
      const cached = await caches.match(request);

      if (cached) {
        return cached;
      }

      try {
        const response = await fetch(request);

        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        }

        return response;
      } catch (error) {
        return new Response(
          "Este recurso não está disponível offline.",
          {
            status: 503,
            headers: {
              "Content-Type": "text/plain; charset=utf-8"
            }
          }
        );
      }
    })()
  );
});
