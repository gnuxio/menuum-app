export const COUNTRIES = [
  { name: "México", code: "MX" },
  { name: "Estados Unidos", code: "US" },
  { name: "Canadá", code: "CA" },
  { name: "España", code: "ES" },
  { name: "Colombia", code: "CO" },
] as const;

export type Country = (typeof COUNTRIES)[number];