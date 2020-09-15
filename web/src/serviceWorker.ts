export function register() {
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/serviceWorker.js')
        .then(registered => {
          console.log('Service Worker installed.');
          console.log(registered.scope);
        })
        .catch(err => {
          console.log('Unable to install Service Worker...');
          console.error(err);
        });
    }
  });
}
