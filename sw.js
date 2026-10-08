/* =========================================================
   ENGLISH FAMILY
   SERVICE WORKER
   PWA / CACHE / OFFLINE
   ========================================================= */


/* =========================================================
   1. CONFIGURAÇÃO
   ========================================================= */

const CACHE_NAME =
  "english-family-v1.0.0";


const APP_SHELL = [

  "./",

  "./index.html",

  "./style.css",

  "./app.js",

  "./manifest.json",

  "./icon.svg"

];


/* =========================================================
   2. INSTALAÇÃO
   ========================================================= */

self.addEventListener(
  "install",
  function(event) {

    event.waitUntil(

      caches
        .open(
          CACHE_NAME
        )
        .then(
          function(cache) {

            return cache.addAll(
              APP_SHELL
            );

          }
        )

    );

    /*
      Faz o novo Service Worker
      assumir o controle imediatamente.
    */

    self.skipWaiting();

  }
);


/* =========================================================
   3. ATIVAÇÃO
   ========================================================= */

self.addEventListener(
  "activate",
  function(event) {

    event.waitUntil(

      caches
        .keys()
        .then(
          function(cacheNames) {

            return Promise.all(

              cacheNames
                .filter(
                  function(cacheName) {

                    return (
                      cacheName !==
                      CACHE_NAME
                    );

                  }
                )
                .map(
                  function(cacheName) {

                    return caches.delete(
                      cacheName
                    );

                  }
                )

            );

          }
        )

    );


    /*
      Assume o controle das páginas
      abertas imediatamente.
    */

    self.clients.claim();

  }
);


/* =========================================================
   4. REQUISIÇÕES
   ========================================================= */

self.addEventListener(
  "fetch",
  function(event) {

    /*
      Trabalhamos apenas com GET.
    */

    if (
      event.request.method !==
      "GET"
    ) {

      return;

    }


    /*
      Não interceptar esquemas
      que não sejam HTTP/HTTPS.
    */

    const requestURL =
      new URL(
        event.request.url
      );


    if (
      requestURL.protocol !==
        "http:" &&
      requestURL.protocol !==
        "https:"
    ) {

      return;

    }


    event.respondWith(

      caches
        .match(
          event.request
        )
        .then(
          function(cachedResponse) {

            /*
              CACHE FIRST

              Se o arquivo já estiver
              armazenado localmente,
              utiliza o cache.
            */

            if (
              cachedResponse
            ) {

              return cachedResponse;

            }


            /*
              Caso não esteja no cache,
              busca na rede.
            */

            return fetch(
              event.request
            )
              .then(
                function(networkResponse) {

                  /*
                    Só armazenamos respostas
                    válidas.
                  */

                  if (
                    networkResponse &&
                    networkResponse.status ===
                      200 &&
                    networkResponse.type !==
                      "opaque"
                  ) {

                    const responseClone =
                      networkResponse.clone();


                    caches
                      .open(
                        CACHE_NAME
                      )
                      .then(
                        function(cache) {

                          cache.put(
                            event.request,
                            responseClone
                          );

                        }
                      );

                  }


                  return networkResponse;

                }
              );

          }
        )

        .catch(
          function() {

            /*
              OFFLINE FALLBACK

              Se a página solicitada não
              puder ser carregada e o usuário
              estiver offline, abrimos o
              index.html.
            */

            return caches.match(
              "./index.html"
            );

          }
        )

    );

  }
);


/* =========================================================
   5. MENSAGENS
   ========================================================= */

self.addEventListener(
  "message",
  function(event) {

    if (
      event.data &&
      event.data.type ===
        "SKIP_WAITING"
    ) {

      self.skipWaiting();

    }

  }
);


/* =========================================================
   6. FIM
   ========================================================= */
