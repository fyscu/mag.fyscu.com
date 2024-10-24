/*eslint-disable*/
self.addEventListener("install", ()=>{self.skipWaiting();});
self.addEventListener("activate", e=>{e.waitUntil(clients.claim());});
self.addEventListener("fetch", event=>{
    event.respondWith(fetch(event.request));
});