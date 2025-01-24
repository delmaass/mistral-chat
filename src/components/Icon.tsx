import Image from "next/image";

type Props = {
  size?: number;
};

export default function Icon({ size = 128 }: Props) {
  return (
    <Image
      src="/images/icon.png"
      alt="Mistral AI's Icon"
      width={size}
      height={size}
    />
  );
}
