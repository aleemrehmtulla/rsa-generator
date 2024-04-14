import { spkiToPEM, pkcs8ToPEM } from "./string";

export const generateRSAKeys = async (keyLength: number) => {
  const config = {
    name: "RSA-OAEP",
    modulusLength: keyLength,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256",
  };

  const keyPair = await window.crypto.subtle.generateKey(config, true, [
    "encrypt",
    "decrypt",
  ]);
  const publicKey = await window.crypto.subtle.exportKey(
    "spki",
    keyPair.publicKey,
  );
  const privateKey = await window.crypto.subtle.exportKey(
    "pkcs8",
    keyPair.privateKey,
  );

  return {
    publicKey: spkiToPEM(publicKey),
    privateKey: pkcs8ToPEM(privateKey),
  };
};
