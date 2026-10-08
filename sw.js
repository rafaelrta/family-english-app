/* =========================================================
   ENGLISH FAMILY
   SW.JS
   Service Worker — PWA
   ========================================================= */


/* =========================================================
   1. CONFIGURAÇÃO
   ========================================================= */

const CACHE_NAME = "english-family-v1.4.0";


const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./course-data.js",
  "./app.js",
  "./manifest.json",
  "./icon.svg"
];


/* =========================================================
   2. INSTALAÇÃO
   ========================================================= */

self.addEventListener(
  "install",
  event => {

    console.log(
      "[English Family] Service Worker: instalação."
    );


    event.waitUntil(

      caches.open(
        CACHE_NAME
      )
      .then(
        cache => {

          return cache.addAll(
            APP_SHELL
          );

        }
      )
      .then(
        () => {

          return self.skipWaiting();

        }
      )

    );

  }
);


/* =========================================================
   3. ATIVAÇÃO
   ========================================================= */

self.addEventListener(
  "activate",
  event => {

    console.log(
      "[English Family] Service Worker: ativação."
    );


    event.waitUntil(

      caches.keys()
        .then(
          cacheNames => {

            return Promise.all(

              cacheNames
                .filter(
                  cacheName =>
                    cacheName !==
                    CACHE_NAME
                )
                .map(
                  cacheName =>
                    caches.delete(
                      cacheName
                    )
                )

            );

          }
        )
        .then(
          () => {

            return self.clients.claim();

          }
        )

    );

  }
);


/* =========================================================
   4. INTERCEPTAÇÃO DE REQUISIÇÕES
   ========================================================= */

self.addEventListener(
  "fetch",
  event => {

    const request =
      event.request;


    /*
      Trabalhamos apenas com requisições GET.
    */

    if (
      request.method !==
      "GET"
    ) {

      return;

    }


    /*
      Ignora esquemas que não sejam HTTP/HTTPS.
    */

    if (
      !request.url.startsWith(
        "http"
      )
    ) {

      return;

    }


    event.respondWith(

      caches.match(
        request
      )
      .then(
        cachedResponse => {

          /*
            Se já estiver no cache,
            usamos imediatamente.
          */

          if (
            cachedResponse
          ) {

            return cachedResponse;

          }


          /*
            Caso não esteja no cache,
            busca na internet.
          */

          return fetch(
            request
          )
          .then(
            networkResponse => {

              /*
                Só armazenamos respostas
                válidas.
              */

              if (
                !networkResponse ||
                networkResponse.status !== 200 ||
                networkResponse.type ===
                  "opaque"
              ) {

                return networkResponse;

              }


              const responseClone =
                networkResponse.clone();


              caches.open(
                CACHE_NAME
              )
              .then(
                cache => {

                  cache.put(
                    request,
                    responseClone
                  );

                }
              );


              return networkResponse;

            }
          )
          .catch(
            () => {

              /*
                Se estiver offline e não houver
                conteúdo em cache, tenta retornar
                a página principal.
              */

              if (
                request.mode ===
                "navigate"
              ) {

                return caches.match(
                  "./index.html"
                );

              }


              return new Response(
                "",
                {
                  status: 503,
                  statusText:
                    "Offline"
                }
              );

            }
          );

        }
      )

    );

  }
);


/* =========================================================
   5. MENSAGENS DO APLICATIVO
   ========================================================= */

self.addEventListener(
  "message",
  event => {

    if (
      !event.data
    ) {

      return;

    }


    /*
      Permite que o aplicativo solicite
      a ativação imediata de uma nova versão.
    */

    if (
      event.data.type ===
      "SKIP_WAITING"
    ) {

      self.skipWaiting();

    }


    /*
      Permite limpar o cache manualmente
      quando necessário.
    */

    if (
      event.data.type ===
      "CLEAR_CACHE"
    ) {

      event.waitUntil(

        caches.keys()
          .then(
            cacheNames => {

              return Promise.all(

                cacheNames.map(
                  cacheName =>
                    caches.delete(
                      cacheName
                    )
                )

              );

            }
          )

      );

    }

  }
);


/* =========================================================
   6. FIM DO SERVICE WORKER
   ========================================================= */
