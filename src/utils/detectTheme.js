export const detectTheme = (prompt) => {
  const text = prompt.toLowerCase();

  if (text.includes("luxury") || text.includes("gold") || text.includes("premium")) return "luxury";
  if (text.includes("ocean") || text.includes("sea") || text.includes("water") || text.includes("blue")) return "ocean";
  if (text.includes("sunset") || text.includes("twilight") || text.includes("orange")) return "sunset";
  if (text.includes("forest") || text.includes("nature") || text.includes("green") || text.includes("tree")) return "forest";
  if (text.includes("synthwave") || text.includes("vaporwave") || text.includes("80s")) return "synthwave";
  if (text.includes("monochrome") || text.includes("black and white") || text.includes("grayscale") || text.includes("sleek")) return "monochrome";
  if (text.includes("fire") || text.includes("flame") || text.includes("blaze") || text.includes("red")) return "fire";
  if (text.includes("space") || text.includes("cosmic") || text.includes("galaxy") || text.includes("star") || text.includes("purple")) return "space";

  if (
    text.includes("cyberpunk") ||
    text.includes("gaming") ||
    text.includes("neon") ||
    text.includes("hacker") ||
    text.includes("matrix") ||
    text.includes("tech")
  ) {
    if (text.includes("gaming")) return "gaming";
    if (text.includes("crypto") || text.includes("tech")) return "crypto";
    return "cyberpunk";
  }

  if (
    text.includes("flower") ||
    text.includes("wedding") ||
    text.includes("pink") ||
    text.includes("anime")
  ) {
    return "floral";
  }

  if (text.includes("retro") || text.includes("vintage")) {
    return "retro";
  }

  if (text.includes("coffee") || text.includes("cafe")) {
    return "coffee";
  }

  return "minimal";
};
