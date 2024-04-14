export const bufferToBase64 = (buffer: ArrayBuffer) => {
  const array = new Uint8Array(buffer);
  const binaryString = Array.from(array)
    .map((char) => String.fromCharCode(char))
    .join("");
  return window.btoa(binaryString);
};

export const spkiToPEM = (keyData: ArrayBuffer) => {
  const base64 = bufferToBase64(keyData);
  return `-----BEGIN PUBLIC KEY-----\n${base64}\n-----END PUBLIC KEY-----\n`;
};

export const pkcs8ToPEM = (keyData: ArrayBuffer) => {
  const base64 = bufferToBase64(keyData);
  return `-----BEGIN PRIVATE KEY-----\n${base64}\n-----END PRIVATE KEY-----\n`;
};
