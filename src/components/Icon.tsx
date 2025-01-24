import Image from "next/image";

export default function Icon() {
  return (
    <Image
      src="/images/icon.png"
      alt="Mistral AI's Icon"
      width={128}
      height={128}
    />
  );
}
