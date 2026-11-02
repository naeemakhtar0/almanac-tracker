// 1) Ask the browser to NEVER auto-delete this app's data
(async function () {
  try {
    if (navigator.storage && navigator.storage.persist) {
      const already = await navigator.storage.persisted();
      if (!already) await navigator.storage.persist();
    }
  } catch (e) { console.warn("persist failed", e); }
})();

// 2) Register service worker (needed for install + offline)
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((e) => console.warn("SW failed", e));
  });
}
