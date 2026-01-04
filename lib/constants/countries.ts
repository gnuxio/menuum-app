export const COUNTRIES = [
  { name: "México", code: "mx" },
  { name: "Estados Unidos", code: "us" },
  { name: "Canadá", code: "ca" },
  { name: "España", code: "es" },
  { name: "Colombia", code: "co" },
] as const;

export type Country = (typeof COUNTRIES)[number];