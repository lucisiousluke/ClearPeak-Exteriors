import * as React from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Photo } from "~/components/ui";
import type { BlogBodyItem, BlogImageBlock, BlogTableBlock } from "~/types";

// Tailwind Typography isn't installed, so every element is styled here.
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6 text-lg leading-relaxed text-ink-600">{children}</p>,
    h1: ({ children }) => <h2 className="mb-5 mt-12 font-display text-3xl font-bold text-ink-800">{children}</h2>,
    h2: ({ children }) => <h2 className="mb-5 mt-12 font-display text-3xl font-bold text-ink-800">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-4 mt-10 font-display text-2xl font-bold text-ink-800">{children}</h3>,
    h4: ({ children }) => <h4 className="mb-3 mt-8 font-display text-xl font-bold text-ink-800">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="mb-6 border-l-4 border-aqua pl-5 text-lg italic text-ink-600">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 list-disc space-y-3 pl-6 text-lg text-ink-600">{children}</ul>,
    number: ({ children }) => <ol className="mb-6 list-decimal space-y-3 pl-6 text-lg text-ink-600">{children}</ol>,
  },
  listItem: ({ children }) => <li className="pl-1 leading-relaxed">{children}</li>,
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink-800">{children}</strong>,
    link: ({ children, value }) => {
      const href: string = value?.href || "";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="font-semibold text-ink-800 underline decoration-aqua decoration-2 underline-offset-4 hover:text-aqua-700"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: BlogImageBlock }) => (
      <figure className="my-10 overflow-hidden rounded-3xl shadow-soft">
        <Photo src={value.url} alt={value.alt} wrapperClassName="w-full" className="h-auto w-full" />
      </figure>
    ),
    table: ({ value }: { value: BlogTableBlock }) => {
      const [header, ...rows] = value.rows;
      if (!header) return null;
      return (
        <div className="my-10 overflow-x-auto rounded-3xl border border-ink-100 shadow-soft">
          <table className="w-full min-w-[560px] border-collapse text-left text-base">
            <thead className="bg-soft">
              <tr>
                {header.map((cell, i) => (
                  <th key={i} scope="col" className="px-5 py-4 font-display font-bold text-ink-800">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r} className="border-t border-ink-100">
                  {row.map((cell, c) =>
                    c === 0 ? (
                      <th key={c} scope="row" className="px-5 py-4 align-top font-semibold text-ink-800">
                        {cell}
                      </th>
                    ) : (
                      <td key={c} className="px-5 py-4 align-top text-ink-600">
                        {cell}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
};

export const PortableTextBody: React.FC<{ value: BlogBodyItem[] }> = ({ value }) => (
  <PortableText value={value} components={components} />
);

export default PortableTextBody;
