import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { Test, startInstance } from "~/start";
import { seo } from "~/utils/seo";
// @ts-expect-error css import
import appCss from "~/styles/app.css?url";

import { NotFound } from "~/components/NotFound";
import LayoutWrapper from "~/components/LayoutWrapper";

export const testServerMw = startInstance
  .createMiddleware()
  .server(({ next, context }) => {
    context.fromFetch;
    context.fromServerMw;

    return next({
      context: {
        fromIndexServerMw: true,
      },
    });
  });

export const testFnMw = startInstance
  .createMiddleware({ type: "function" })
  .middleware([testServerMw])
  .server(({ next, context }) => {
    context.fromFetch;
    context.fromServerMw;
    context.fromFnMw;
    context.fromIndexServerMw;

    return next({
      context: {
        fromIndexFnMw: true,
      },
    });
  });

export const testGetMiddleware = startInstance
  .createMiddleware()
  .server(({ next, context }) => {
    return next({
      context: {
        fromGetMiddleware: true,
      },
    });
  });

export const Route = createRootRoute({
  server: {
    middleware: [testServerMw],
    handlers: {
      GET: ({ context, next }) => {
        context.fromFetch;
        context.fromServerMw;
        context.fromIndexServerMw;
        return next({
          context: {
            fromGet: true,
          },
        });
      },
      POST: ({ context, next }) => {
        context.fromFetch;
        context.fromServerMw;
        context.fromIndexServerMw;
        return next({
          context: {
            fromPost: true,
          },
        });
      },
    },
    test: (test) => {},
  },
  beforeLoad: ({ serverContext }) => {
    serverContext?.fromFetch;
    serverContext?.fromServerMw;
    serverContext?.fromIndexServerMw;
    serverContext?.fromGet;
    return serverContext;
  },
  loader: ({ context }) => {
    context?.fromFetch;
    context?.fromServerMw;
    context?.fromIndexServerMw;
    context?.fromPost;
    return new Test("test");
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "Edu Assist AI",
        description:
          "Edu Assist AI is a platform that helps students learn and grow.",
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
          {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap",
          },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", href: "/favicon.ico" },
    ],
    scripts: [],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
