/**
 * WARNING: DO NOT USE ANY TWIND FUNCTIONS in here otherwise the
 * vscode-twind-intellisense plugin may stop working. To overcome
 * this issue, use animations and keyframes intead of twind's animation
 * function.
 */
import type { Options } from "$fresh/plugins/twind.ts";
import { css } from "https://esm.sh/v96/twind@0.16.17/css";

const gridCols = ([arg]: string[]) => {
  const template = Number.isInteger(Number(arg))
    ? `repeat(${arg}, minmax(0, 1fr))`
    : arg
    ? arg.replace(/(^\[)|(\])$/g, "").replace(/_/g, " ")
    : arg;

  return {
    "grid-template-columns": template,
  };
};

const gridRows = ([arg]: string[]) => {
  const template = Number.isInteger(Number(arg))
    ? `repeat(${arg}, minmax(0, 1fr))`
    : arg
    ? arg.replace(/(^\[)|(\])$/g, "").replace(/_/g, " ")
    : arg;

  return {
    "grid-template-rows": template,
  };
};

const scrollSnap = ([arg]: string[]) => {
  return {
    "scroll-snap-align": arg,
  };
};

const options: Omit<Options, "selfURL"> = {
  theme: {
    extend: {
      colors: {
        "default": "#FFFFFF",
        "header": "#FFFFFF",
        "badge": "#8C3D3D", // shopping cart tem isso tambem
        "footer": "#fdf1f4",
        "interactive": "#7a206c",
        "interactive-inverse": "#FFFFFF",
        "hover": "rgba(0, 0, 0, 0.04)",
        "hover-inverse": "rgba(255, 255, 255, 0.4)",
        "1-900": "#290B24",
        "1-700": "#521548",
        "1-500": "#7a206c",
        "1-300": "#942889",
        "1-50": "#CA36B3",
        "2-900": "#003134",
        "2-700": "#007E86",
        "2-500": "#00AEB9",
        "2-300": "#00D4E2",
        "2-50": "#20F2FF",
      },
      textColor: {
        "default": "#212121",
        "default-gray": "#636363",
        "default-inverse": "#FFFFFF",
        "subdued": "#66736C",
        "subdued-inverse": "#C6C6C6",
        "price": "#7a206c",
        "section-title": "#161616",
        "positive": "#1A7346",
        "critical": "#B44125",
        "1-500": "#212121",
        "2-500": "#575756",
        "brand-primary": "#7a206c",
      },
      borderColor: {
        "default": "#EEEEEE",
        "default-inverse": "#FFFFFF",
        "interactive": "#7a206c",
        "focus": "#3379EF",
        "positive": "#1A7346",
        "critical": "#B44125",
      },
      outline: {
        interactive: ["2px solid #3379EF", "2px"],
      },
      fontSize: {
        "heading-1": ["42px", "67.2px"],
        "heading-2": ["37px", "28.8px"],
        "heading-3": ["20px", "24px"],
        "heading-4": ["26px", "28px"],
        "menu": ["16px", "20px"],
        "button": ["14px", "18px"],
        "body": ["16px", "20px"],
        "caption": ["13px", "16px"],
        "list-price": ["10px", "20px"],
      },
      fontWeight: {
        "heading-1": "700",
        "heading-2": "700",
        "heading-3": "500",
        "heading-4": "700",
        "menu": "400",
        "button": "700",
        "body": "400",
        "caption": "400",
        "list-price": "400",
      },
      animation: {
        "slide-left": "slide-left-frame 0.4s ease normal",
        "slide-right": "slide-right-frame 0.4s ease normal",
        "slide-bottom": "slide-bottom-frame 0.4s ease normal",
      },
      keyframes: {
        "slide-left-frame": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-right-frame": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-bottom-frame": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
      },
      boxShadow: {
        sm: "0px 1px 3px 0px #00000014",
        default: "0px 1px 4px 0px #0000001F",
        md: "0px 1px 5px 0px #00000024",
        lg: "0px 4px 10px 0px #0000001F",
      },
    },
    fontFamily: {
      sans: ["Red Hat Display", "sans-serif"],
      serif: ["inherit", "serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  preflight: (preflight) => ({
    ...preflight,

    // Stick footer to the bottom of the page
    body: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    'section[data-manifest-key="./sections/Footer.tsx"]': {
      marginTop: "auto",
    },

    // Prevent scroll when modal is open
    "body[no-scroll]": {
      overflow: "hidden",
      height: "100vh",
    },
  }),
  plugins: {
    backdrop: {
      "&::backdrop": {
        background: "rgba(0, 0, 0, 0.5)",
      },
    },
    "scroll-snap-center": scrollSnap(["center"]),
    "scroll-snap-start": scrollSnap(["start"]),
    "scroll-x-mandatory": {
      "scroll-snap-type": "x mandatory",
    },
    "snap-x": {
      "scroll-snap-type": "x var(--tw-scroll-snap-strictness)",
    },
    "snap-mandatory": {
      "--tw-scroll-snap-strictness": "mandatory",
    },
    "fill": (parts) => ({ "fill": parts.join("-") }),
    "max-h-min": {
      "max-height": "min-content",
    },
    "snap": ([mod]) => ({ "scroll-snap-align": mod }),
    "grid-cols": gridCols,
    "grid-rows": gridRows,
    "scroll-smooth": {
      "scroll-behavior": "smooth",
      "-webkit-overflow-scrolling": "touch",
    },
    "scrollbar-none": {
      "scrollbar-width": "none",
      "-ms-overflow-style": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    "nth-child": ([pos, style]) =>
      css`& > *:nth-child(${pos}) {${
        style.replace(/\[/, "").replace(/\]/, "").replaceAll("_", " ")
      } }`,
    "tab-radio-content": ([pos, style]) =>
      css`& [type="radio"]:nth-of-type(${pos}):checked ~  .tab-content:nth-of-type(${pos}) {${
        style.replace(/\[/, "").replace(/\]/, "").replaceAll("_", " ")
      } }`,
    "tab-radio-button": ([pos, style]) =>
      css`& [type="radio"]:nth-of-type(${pos}):checked ~ .tabs .tab:nth-of-type(${pos}) {${
        style.replace(/\[/, "").replace(/\]/, "").replaceAll("_", " ")
      } }`,
    "no-marker": {
      "&::-webkit-details-marker": {
        "content": "none",
      },
      "&::marker": {
        "content": "none",
      },
    },
    "detail-chevron": {
      ".opened-chevron": {
        "display": "none",
      },
      "&[open] .closed-chevron": {
        "display": "none",
      },
      "&[open] .opened-chevron": {
        "display": "block",
      },
    },
  },
};

export default options;
