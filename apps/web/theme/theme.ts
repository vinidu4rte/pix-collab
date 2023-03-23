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
    defaultBrandTheme: {
      100: "#03D69D",
      200: "#03D69D",
      300: "#03D69D",
      400: "#03D69D",
      500: "#03D69D",
      600: "#03D69D",
      700: "#03D69D",
      800: "#03D69D",
      900: "#03D69D",
    },
  },
  fonts: {
    heading: nunito.style.fontFamily,
    body: nunito.style.fontFamily,
  },
});
