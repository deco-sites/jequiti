import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Icons */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={asset("/favicon-32x32.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={asset("/favicon-16x16.png")}
      />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href={asset("/favicon-32x32.png")}
      />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
      <meta name="theme-color" content="#221E1F" />
      <meta name="msapplication-TileColor" content="#221E1F" />

      {
        /*
         * Include fonts
         * tip: It's always better copy fonts to the `/static/fonts` folder than serving from another
         * domain since DNS resolution times can really affect performance.
         */
      }
      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* latin-ext */
          @font-face {
            font-family: 'Albert Sans';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(${
            asset("/fonts/i7dOIFdwYjGaAMFtZd_QA1ZVYFeQGQyUV3U.woff2")
          }) format('woff2');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }
          /* latin */
          @font-face {
            font-family: 'Albert Sans';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(${
            asset("/fonts/i7dOIFdwYjGaAMFtZd_QA1ZbYFeQGQyU.woff2")
          }) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          /* latin-ext */
          @font-face {
            font-family: 'Albert Sans';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: url(${
            asset("/fonts/i7dOIFdwYjGaAMFtZd_QA1ZVYFeQGQyUV3U.woff2")
          }) format('woff2');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }
          /* latin */
          @font-face {
            font-family: 'Albert Sans';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: url(${
            asset("/fonts/i7dOIFdwYjGaAMFtZd_QA1ZbYFeQGQyU.woff2")
          }) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          /* latin-ext */
          @font-face {
            font-family: 'Albert Sans';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url(${
            asset("/fonts/i7dOIFdwYjGaAMFtZd_QA1ZVYFeQGQyUV3U.woff2")
          }) format('woff2');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }
          /* latin */
          @font-face {
            font-family: 'Albert Sans';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url(${
            asset("/fonts/i7dOIFdwYjGaAMFtZd_QA1ZbYFeQGQyU.woff2")
          }) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }

          @font-face {
            font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
            font-family: 'Red Hat Display';
            font-style: normal;
            font-weight: 300;
            src: url('/fonts/red-hat-display-v14-latin-300.woff2') format('woff2'), /* Chrome 36+, Opera 23+, Firefox 39+ */
                 url('/fonts/red-hat-display-v14-latin-300.woff') format('woff'); /* Chrome 5+, Firefox 3.6+, IE 9+, Safari 5.1+ */
          }
          /* red-hat-display-regular - latin */
          @font-face {
            font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
            font-family: 'Red Hat Display';
            font-style: normal;
            font-weight: 400;
            src: url('/fonts/red-hat-display-v14-latin-regular.woff2') format('woff2'), /* Chrome 36+, Opera 23+, Firefox 39+ */
                 url('/fonts/red-hat-display-v14-latin-regular.woff') format('woff'); /* Chrome 5+, Firefox 3.6+, IE 9+, Safari 5.1+ */
          }
          /* red-hat-display-500 - latin */
          @font-face {
            font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
            font-family: 'Red Hat Display';
            font-style: normal;
            font-weight: 500;
            src: url('/fonts/red-hat-display-v14-latin-500.woff2') format('woff2'), /* Chrome 36+, Opera 23+, Firefox 39+ */
                 url('/fonts/red-hat-display-v14-latin-500.woff') format('woff'); /* Chrome 5+, Firefox 3.6+, IE 9+, Safari 5.1+ */
          }
          /* red-hat-display-700 - latin */
          @font-face {
            font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
            font-family: 'Red Hat Display';
            font-style: normal;
            font-weight: 700;
            src: url('/fonts/red-hat-display-v14-latin-700.woff2') format('woff2'), /* Chrome 36+, Opera 23+, Firefox 39+ */
                 url('/fonts/red-hat-display-v14-latin-700.woff') format('woff'); /* Chrome 5+, Firefox 3.6+, IE 9+, Safari 5.1+ */
          }
      `,
        }}
      />
    </Head>
  );
}

export default GlobalTags;
