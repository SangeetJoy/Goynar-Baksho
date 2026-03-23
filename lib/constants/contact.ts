// ─────────────────────────────────────────────────────────────────────────────
// CONTACT PAGE CONSTANTS
// Update the values below to reflect the actual shop details.
// ─────────────────────────────────────────────────────────────────────────────

export const SHOP_CONTACT = {
  phone: "+91 90737 87993",
  whatsappNumber: "919073787993", // country code + number, no spaces or symbols
  email: "subhramajumder@goynarbaksho.com",
  address:
    "Swamiji More, Nazrul Sarani, Ward 39, East Vivekanando pally, siliguri — 734006, West Bengal",
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2373.5799459733125!2d88.4352262791475!3d26.718523682907232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4410b59e2692f%3A0xc35a835ef67f4b1e!2sSwamiji%20More%2C%20Ward%2038%2C%20East%20Vivekananda%20Pally%2C%20Rabindra%20Sarani%2C%20Siliguri%2C%20West%20Bengal%20734006!5e0!3m2!1sen!2sin!4v1774260817535!5m2!1sen!2sin",
} as const;

export const BUSINESS_HOURS = [
  { day: "Monday – Friday", time: "10:00 AM – 8:00 PM" },
  { day: "Saturday", time: "10:00 AM – 9:00 PM" },
  { day: "Sunday", time: "11:00 AM – 6:00 PM" },
] as const;
