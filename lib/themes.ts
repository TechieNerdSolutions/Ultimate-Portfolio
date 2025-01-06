export type Theme = {
  name: string
  colors: {
    background: string
    foreground: string
    primary: string
    secondary: string
    accent: string
    muted: string
  }
}

export const lightTheme: Theme = {
  name: "light",
  colors: {
    background: "#FFFFFF",
    foreground: "#0A192F",
    primary: "#1C87C9",
    secondary: "#40A9E6",
    accent: "#64FFDA",
    muted: "#8892B0"
  }
}

export const darkTheme: Theme = {
  name: "dark",
  colors: {
    background: "#0A192F",
    foreground: "#E6F1FF",
    primary: "#64FFDA",
    secondary: "#1C87C9",
    accent: "#BD34FE",
    muted: "#8892B0"
  }
}

