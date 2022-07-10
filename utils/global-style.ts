import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    font-family: "Source Sans Pro", sans-serif;
    overflow-x: hidden;
    scroll-behavior: smooth;
    margin: 0;
    padding: 0;

  }

  p, h1, h2, h3, h4 {
    margin-bottom: 0;
  }

  button {
    cursor: pointer;
  }

  ul, li {
    list-style-type: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .wrapper {
    max-width: 1500px;
    position: relative;
  }

  .side-nav__icon {
    margin-right: 10px;
  }
`;
export { GlobalStyle };
