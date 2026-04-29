export const PHONE_PRIMARY = "0525045500";
export const PHONE_SECONDARY = "0533856416";

export const formatPhone = (p: string) => {
  // 0525045500 -> 052-504-5500
  if (p.length === 10) return `${p.slice(0,3)}-${p.slice(3,6)}-${p.slice(6)}`;
  return p;
};

export const telHref = (p: string) => `tel:${p}`;
export const waHref = (p: string, msg = "היי לילך, ראיתי את האתר ואשמח לפרטים") => {
  // wa.me requires international format without +. Israel: 972 + drop leading 0
  const intl = p.startsWith("0") ? `972${p.slice(1)}` : p;
  return `https://wa.me/${intl}?text=${encodeURIComponent(msg)}`;
};
