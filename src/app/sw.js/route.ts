export async function GET() {
  // Gracefully tell any old service worker registered on localhost to unregister
  const content = `
    self.addEventListener('install', () => self.skipWaiting());
    self.addEventListener('activate', (e) => {
      self.registration.unregister();
    });
  `;
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

