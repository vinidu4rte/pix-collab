import { extendTheme } from "@chakra-ui/react";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export const customizedTheme = extendTheme({
  colors: {
    brand: {
      primary: "#03D69D",
      secondary: "#133A6F",
      terciary: "#F8BD05",
      quaternary: "#F5F5F5",
      black: "#252525",
      white: "#FFFFFF",
    },
  },
  fonts: {
    heading: nunito.style.fontFamily,
    body: nunito.style.fontFamily,
  },
});
