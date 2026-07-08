export default {
  name: "statItem",
  title: "Stat",
  type: "object",
  fields: [
    { name: "value", title: "Value (number)", type: "number", validation: (Rule: any) => Rule.required() },
    { name: "suffix", title: "Suffix", type: "string", description: "e.g. +, ★, yrs" },
    { name: "label", title: "Label", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "decimal", title: "Show as static decimal (skip count-up animation)", type: "boolean", initialValue: false },
  ],
  preview: {
    select: { title: "label", value: "value", suffix: "suffix" },
    prepare({ title, value, suffix }: { title?: string; value?: number; suffix?: string }) {
      return { title: title || "Stat", subtitle: `${value ?? ""}${suffix ?? ""}` };
    },
  },
};
