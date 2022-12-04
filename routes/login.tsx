import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import {
  getCookies,
  setCookie,
} from "https://deno.land/std@0.167.0/http/cookie.ts";
import { Head } from "$fresh/runtime.ts";

enum LoginErrors {
  WRONG_PASSWORD = "WRONG_PASSWORD",
}

interface LoginRouteData {
  error?: LoginErrors;
}

export const handler: Handlers = {
  GET(req: Request, ctx: HandlerContext) {
    const url = new URL(req.url);

    const cookies = getCookies(req.headers);
    if (cookies.authenticated === "true") {
      return Response.redirect(`${url.origin}/`, 303);
    }
    return ctx.render();
  },
  async POST(_req: Request, _ctx: HandlerContext) {
    const url = new URL(_req.url);

    const res = await _req.formData();
    const password = res.get("password");

    if (password === Deno.env.get("PASSWORD")) {
      const headers = new Headers();
      setCookie(headers, {
        name: "authenticated",
        value: "true",
        httpOnly: true,
        sameSite: "Lax",
        path: "/",
        domain: url.hostname,
      });
      headers.set("location", "/");
      return new Response(null, {
        status: 303,
        headers,
      });
    }

    const resp = await _ctx.render({ error: LoginErrors.WRONG_PASSWORD });
    return new Response(resp.body, {
      status: 400,
    });
  },
};

export default function Login({ data }: PageProps<LoginRouteData>) {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <form method="POST">
        <input name="password" type="password" />
        <input type="submit" />
        {data?.error === LoginErrors.WRONG_PASSWORD
          ? <pre style={{ color: "red" }}>Wrong password</pre>
          : null}
      </form>
    </>
  );
}
