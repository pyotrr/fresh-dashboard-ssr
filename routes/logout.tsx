import { Handlers } from "$fresh/server.ts";
import {
  deleteCookie,
  getCookies,
} from "https://deno.land/std@0.167.0/http/cookie.ts";

export const handler: Handlers = {
  GET(req: Request) {
    const url = new URL(req.url);

    const cookies = getCookies(req.headers);

    if (cookies.authenticated !== "true") {
      return Response.redirect(`${url.origin}/login`, 303);
    }

    const headers = new Headers(req.headers);
    deleteCookie(headers, "authenticated", { path: "/", domain: url.hostname });
    headers.set("location", "/login");

    return new Response(null, { headers, status: 302 });
  },
};
