/**
 * Ortho Alpha · Link na Bio
 * Publicar este Worker apenas nas rotas:
 *   www.orthoalpha.com.br/bio*
 *   orthoalpha.com.br/bio*
 * Não configurar a rota em todo o domínio.
 * O restante do site não é alterado.
 */
const UPSTREAM = "https://lizveigab.github.io/ortho-alpha-site/bio/";

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    if (incoming.pathname === "/bio") {
      return Response.redirect(new URL("/bio/", incoming.origin), 308);
    }
    if (!incoming.pathname.startsWith("/bio/")) {
      return fetch(request);
    }

    const suffix = incoming.pathname.slice("/bio/".length);
    const target = new URL(UPSTREAM);
    target.pathname += suffix;
    target.search = incoming.search;

    const upstream = await fetch(target, {
      headers: {
        "Accept": request.headers.get("Accept") || "text/html, */*",
      },
      redirect: "follow",
    });

    // Keep upstream errors visible for diagnosis rather than serving a fake success.
    const response = new Response(upstream.body, upstream);
    response.headers.set("Cache-Control", "public, max-age=120");
    response.headers.set("X-Ortho-Alpha-Page", "bio-github-proxy");
    return response;
  },
};
