import { Keys } from "@/config";
import crypto from "crypto";

// Encryption function
const secureKey = Keys.ENCRYPTION_STRING;
export const encryptString = (
  text: string,
  secretKey: string = secureKey
): string => {
  const cipher = crypto.createCipher("aes-256-cbc", secretKey);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

// Decryption function
export const decryptString = (
  encryptedText: string,
  secretKey: string = secureKey
): string => {
  const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher?.final("utf8");
  return decrypted;
};
