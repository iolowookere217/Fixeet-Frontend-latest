import { extendTheme, theme } from "@chakra-ui/react";

const colors = Object.freeze({
  bg: {
    main: "#3C1263",
    secondary: "#643B8A",
    light: "#FAF9FC",
    pink: "#FF4F6D",
    lemon: "#147F0A",
    green: "#186312",
    ash: "#8A8A8A",
    amber: "#D97706",
    "gray-blue": "#54536E",
    "dark-ash": "#CCCCCC",
    "dark-green": "#2C3D2A",
    "light-ash": "#EBE9ED",
    "light-green": "#DCFFF5",
    "light-yellow": "#FFEAD8",
    "light-purple": "#8C62D514",
  },
  brand: {
    main: "#00BE7A",
    secondary: "#C9C9C9",
    tertiary: "#989898",
  },
  typography: {
    white: "#FFFFFF",
    dark: "#111827",
    ash: "#C9C9C9",
    gray: "#989898",
    light: "#F4F4F4",
    neutral: "#D4D4D4",
    label: "#262626",
    yellow: "#FD7E14",
    green: "#198754",
  },
  shadow: {
    main: "0px 4px 20px 0px rgba(0, 0, 0, 0.25)",
  },
});

const breakpoints = Object.freeze({
  ...theme.breakpoints,
  xs: "320px",
  sm: "480px",
  md: "768px",
  lg: "1024px",
  xl: "1200px",
  "2xl": "1440px",
});

const styles = Object.freeze({
  global: {
    html: {
      scrollBehavior: "smooth",
    },
    body: {
      color: colors.typography.dark,
      backgroundColor: "#FAF9FC",
      width: "100%",
      height: "100%",
    },
    "*, *::before, *::after": {
      margin: "0",
      padding: "0",
      boxSizing: "border-box",
    },
  },
});

const customTheme = extendTheme({
  colors,
  breakpoints,
  styles,
});

export default customTheme;
