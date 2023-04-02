import Image from "next/image";
import SuccessSvg from "../../../public/success.svg";

export default function Success() {
  return <Image src={SuccessSvg} alt="Success icon" />;
}
