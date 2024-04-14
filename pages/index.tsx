import { useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { generateRSAKeys } from "@/lib/crypto";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/select-menu";
import { Button } from "@/components/button";
import DotPattern from "@/components/dot-pattern";

const RSAKeyGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [keyLength, setKeyLength] = useState(1024);
  const [keys, setKeys] = useState({ publicKey: "", privateKey: "" });

  const handleKeyGeneration = async () => {
    if (keyLength >= 2048) setLoading(true);

    const newKeys = await generateRSAKeys(keyLength);
    setKeys(newKeys);

    if (keyLength >= 2048) setLoading(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start space-y-5 px-3 pb-4 pt-8 md:mx-auto md:w-3/4 md:items-start md:px-0 md:pb-0">
      <DotPattern className="z-[-1] opacity-10" />
      <h1 className="text-center text-5xl font-bold md:text-6xl">
        RSA Key Generator
      </h1>
      <div className="h-px w-full bg-gray-200" />
      <p>
        This free and open-source tool allows you to quickly create an RSA key
        pair (public and private key) of a specified length. The generated keys
        can be used for encryption, decryption, and digital signatures. We
        recommend using a key length of 2048 bits or higher for secure
        communication. You can view the source code{" "}
        <Link
          href="https://github.com/aleemrehmtulla/rsa-generator"
          className="text-blue-500 hover:underline"
        >
          here
        </Link>
        .
      </p>

      <div className="flex w-full flex-col items-center justify-start space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex w-full flex-col space-y-2 md:w-auto">
          <Select
            value={keyLength.toString()}
            onValueChange={(value) => setKeyLength(parseInt(value, 10))}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="512">512</SelectItem>
              <SelectItem value="1024">1024</SelectItem>
              <SelectItem value="2048">2048</SelectItem>
              <SelectItem value="4096">4096</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleKeyGeneration}
          disabled={loading}
          className="w-full md:w-auto"
        >
          Generate Key Pair
        </Button>
      </div>

      <div className="flex w-full flex-col items-center justify-center space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <textarea
          className="min-h-[525px] w-full rounded-md border border-gray-200 bg-white p-3 focus:outline-none"
          placeholder="Your private key will appear here..."
          value={keys.privateKey || ""}
          style={{ resize: "none" }}
          readOnly
        />
        <textarea
          className="min-h-[525px] w-full rounded-md border border-gray-200 bg-white p-3 focus:outline-none"
          placeholder="Your public key will appear here..."
          value={keys.publicKey || ""}
          style={{ resize: "none" }}
          readOnly
        />
      </div>

      <Link
        href="https://github.com/aleemrehmtulla/rsa-generator"
        className="flex w-3/4 items-center justify-center space-x-2 rounded-full bg-black p-2 px-4 text-white hover:bg-gray-900 md:absolute md:bottom-4 md:right-4 md:w-auto"
      >
        <FaGithub className="h-5 w-5" />
        <p>View Source</p>
      </Link>
    </div>
  );
};

export default RSAKeyGenerator;
