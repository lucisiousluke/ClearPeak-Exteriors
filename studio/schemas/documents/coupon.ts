export default {
  name: "coupon",
  title: "Coupon",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "code", title: "Promo Code", type: "string" },
    { name: "discount", title: "Discount", type: "string", description: "e.g. $50 off or 15% off" },
    { name: "description", title: "Description", type: "text", rows: 3 },
    { name: "applicableServices", title: "Applicable Services", type: "array", of: [{ type: "reference", to: [{ type: "service" }] }] },
    { name: "startDate", title: "Start Date", type: "date" },
    { name: "expiryDate", title: "Expiry Date", type: "date" },
    { name: "active", title: "Active", type: "boolean", initialValue: true },
  ],
};
