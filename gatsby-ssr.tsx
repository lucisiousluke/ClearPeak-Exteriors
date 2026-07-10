import * as React from "react";
import type { GatsbySSR } from "gatsby";
import { brandColors } from "~/data/brandColors";

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: "en" });
  setHeadComponents([
    <link key="preconnect-google" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link key="preconnect-gstatic" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
    <link
      key="font-stylesheet"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
    />,
    <style
      key="brand-colors"
      // Injected inline (rather than a plain imported .css file) because Netlify's
      // persistent Gatsby/webpack build cache doesn't reliably pick up changes to
      // CSS reached via @import — see fetch-sanity-content.mjs's fetchBrandColors.
      dangerouslySetInnerHTML={{
        __html: `:root{--color-aqua:${brandColors.primary};--color-pink:${brandColors.secondary};--color-coral:${brandColors.accent};--color-ink:${brandColors.ink};}`,
      }}
    />,
  ]);
};
