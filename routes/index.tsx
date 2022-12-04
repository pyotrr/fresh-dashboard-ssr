import { Head } from "$fresh/runtime.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.167.0/http/cookie.ts";
import Status from "../islands/Status.tsx";
import { config } from "https://deno.land/std@0.167.0/dotenv/mod.ts";
import Start from "../islands/Start.tsx";
import Stop from "../islands/Stop.tsx";

interface HomeRouteData {
  statusEndpointUrl: string;
  startEndpointUrl: string;
  stopEndpointUrl: string;
}

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const url = new URL(req.url);

    const cookies = getCookies(req.headers);

    if (cookies.authenticated !== "true") {
      return Response.redirect(`${url.origin}/login`);
    }

    const env = await config();

    return ctx.render({
      statusEndpointUrl: env.LAMBDA_STATUS_URL ?? "",
      startEndpointUrl: env.LAMBDA_START_URL ?? "",
      stopEndpointUrl: env.LAMBDA_STOP_URL ?? "",
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
