/* Women's Period PWA: solo almacena el documento público; nunca las API ni los datos privados. */
const CACHE='wp-shell-v14';
const SHELL=['/','/favicon/app-icon.svg','/favicon/android-chrome-192x192.png','/favicon/android-chrome-512x512.png','/favicon/apple-touch-icon.png','/manifest.webmanifest'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(async cache=>{await Promise.allSettled(SHELL.map(url=>cache.add(url)));await self.skipWaiting()}))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('wp-shell-')&&k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 if(req.mode==='navigate'){
   event.respondWith(fetch(req).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('/',copy))}return response}).catch(()=>caches.match('/')));
 }
});

/* Al pulsar un recordatorio, volver a la aplicación abierta o recuperarla. */
self.addEventListener('notificationclick',event=>{
 event.notification.close();
 event.waitUntil((async()=>{
  const url=new URL('/',self.location.origin).href;
  const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  const existing=windows.find(client=>new URL(client.url).origin===self.location.origin);
  if(existing){await existing.focus();return}
  if(self.clients.openWindow)await self.clients.openWindow(url);
 })());
});
