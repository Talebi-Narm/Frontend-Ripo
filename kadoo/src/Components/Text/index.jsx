import { React } from "react";

import Theme from "../../Theme/ThemeGenerator";

import "./style.scss";

function Text({ text, underline, link, fontSize }) {
  return (
    <a
      style={{
        fontFamily: `${Theme.typography.fontFamily}`,
        fontSize: `${fontSize}px`,
      }}
      className={`text_main ${
        underline ? "text_underline_true" : "text_underline_false"
      }`}
      href={`/${link}`}
    >
      {text}
    </a>
  );
}
export default Text;
