import { Head } from "$fresh/runtime.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.167.0/http/cookie.ts";
import Status from "../islands/Status.tsx";
import Start from "../islands/Start.tsx";
import Stop from "../islands/Stop.tsx";

interface HomeRouteData {
  statusEndpointUrl: string;
  startEndpointUrl: string;
  stopEndpointUrl: string;
}

export const handler: Handlers = {
  GET(req: Request, ctx: HandlerContext) {
    const url = new URL(req.url);

    const cookies = getCookies(req.headers);

    if (cookies.authenticated !== "true") {
      return Response.redirect(`${url.origin}/login`);
    }

    const statusEndpointUrl = Deno.env.get("LAMBDA_STATUS_URL") ?? "";
    const startEndpointUrl = Deno.env.get("LAMBDA_START_URL") ?? "";
    const stopEndpointUrl = Deno.env.get("LAMBDA_STOP_URL") ?? "";

    return ctx.render({
      statusEndpointUrl,
      startEndpointUrl,
      stopEndpointUrl,
    });
  },
};

export default function Home({ data }: PageProps<HomeRouteData>) {
  return (
    <>
      <Head>
        <title>Server dashboard</title>
      </Head>
      <div>
        <Status endpointUrl={data.statusEndpointUrl} />
        <Start endpointUrl={data.startEndpointUrl} />
        <Stop endpointUrl={data.stopEndpointUrl} />
        <a href="/logout">logout</a>
      </div>
    </>
  );
}
