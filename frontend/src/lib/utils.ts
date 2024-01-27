import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function isValidJSON(jsonString: string) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}

export function buildUrl(urlOrIp: string, forBrowser: boolean) {
  const ip = z.string().ip({ version: 'v4' });

  let url = urlOrIp;
  if (ip.safeParse(urlOrIp).success) {
      url = `http://${urlOrIp}${forBrowser?"":":8000"}`;
  }
  return url;
}

export function normalizeImageData(base64: string) {
  const prefix = 'data:image/jpeg;base64,'
  return base64.startsWith(prefix) ? base64 : prefix+base64
}
