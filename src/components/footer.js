import React from "react"
import { css } from "@emotion/react"

const style = css`
  width: 100%;
  background: #fff;
  position: absolute;
  bottom: 0;
  text-align: center;
  paddig-bottom: 4px;
  :before {
    content: "";
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    background: -webkit-linear-gradient(
      60deg,
      #12d6df,
      #f70fff,
      #faea3d,
      #fd644f
    );
    background-size: 400%;
    animation: bgAnime 10s infinite;
    z-index: 1;
  }
`

const Footer = () => {
  return (
    <footer css={style}>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.com">Gatsby</a>
      {` `}
      And <a href="https://wordpress.org/">WordPress</a>
    </footer>
  )
}

export default Footer
