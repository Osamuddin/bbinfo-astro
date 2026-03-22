const CACHE_VERSION = 'bbinfo-v1';

const STATIC_CACHE = `${CACHE_VERSION}-static`;
const HTML_CACHE   = `${CACHE_VERSION}-html`;

// キャッシュファースト（ハッシュ付きファイル名 → 永続）
const CACHE_FIRST_PATTERNS = [
  /\/_astro\//,
  /\/images\//,
  /\/fonts\//,
  /\/favicon/,
];

// ネットワークファースト（HTML → デプロイ反映のため）
const NETWORK_FIRST_PATTERNS = [
  /\/$/,
  /\/trial\//,
  /\/contact\//,
  /\/privacypolicy\//,
  /\/TermsofService\//,
];

// インストール時に主要ページを事前キャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(HTML_CACHE).then((cache) =>
      cache.addAll(['/', '/trial/', '/contact/'])
    ).then(() => self.skipWaiting())
  );
});

// 古いキャッシュを削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('bbinfo-') && !key.startsWith(CACHE_VERSION))
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 同一オリジンのみ対象（GAS API や Google Fonts は対象外）
  if (url.origin !== self.location.origin) return;

  // GET のみ
  if (request.method !== 'GET') return;

  const isCacheFirst = CACHE_FIRST_PATTERNS.some((p) => p.test(url.pathname));
  const isNetworkFirst = NETWORK_FIRST_PATTERNS.some((p) => p.test(url.pathname));

  if (isCacheFirst) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (isNetworkFirst) {
    event.respondWith(networkFirst(request, HTML_CACHE));
  }
});

// キャッシュファースト：キャッシュになければネットワーク取得してキャッシュ
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
  }
  return response;
}

// ネットワークファースト：失敗時はキャッシュにフォールバック
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}
