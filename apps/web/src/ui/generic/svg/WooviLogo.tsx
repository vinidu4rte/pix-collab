import Image from "next/image";
import WooviLogoSvg from "../../../public/woovi-logo.svg";

export default function WooviLogo() {
  return <Image src={WooviLogoSvg} alt="Woovi Logo" />;
}
