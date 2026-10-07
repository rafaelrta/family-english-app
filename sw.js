const CACHE_NAME = "family-english-v3";

const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg"
];


/* =====================================================
   INSTALAÇÃO
===================================================== */

self.addEventListener("install", function(event){

  event.waitUntil(

    caches
      .open(CACHE_NAME)
      .then(function(cache){

        return cache.addAll(
          FILES
        );

      })

  );

  self.skipWaiting();

});


/* =====================================================
   ATIVAÇÃO
===================================================== */

self.addEventListener(
  "activate",
  function(event){

    event.waitUntil(

      caches
        .keys()
        .then(function(keys){

          return Promise.all(

            keys
              .filter(function(key){

                return key !==
                  CACHE_NAME;

              })

              .map(function(key){

                return caches.delete(
                  key
                );

              })

          );

        })

    );

    self.clients.claim();

  }
);


/* =====================================================
   REQUISIÇÕES
===================================================== */

self.addEventListener(
  "fetch",
  function(event){

    /*
      Não interferir em requisições
      que não sejam GET.
    */

    if(
      event.request.method !== "GET"
    ){

      return;

    }


    event.respondWith(

      caches
        .match(event.request)
        .then(function(response){

          /*
            Se estiver no cache,
            usa o arquivo armazenado.
          */

          if(response){

            return response;

          }


          /*
            Caso contrário,
            busca na internet.
          */

          return fetch(
            event.request
          );

        })

        .catch(function(){

          /*
            Se estiver offline,
            tenta abrir o aplicativo.
          */

          return caches.match(
            "./index.html"
          );

        })

    );

  }
);
