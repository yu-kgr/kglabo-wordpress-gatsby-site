import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/react"
import svg from "/content/assets/logo-kglabo.svg"
import parse from "html-react-parser"

const header = css`
  width: 100%;
  background-color: #fff;
  paddig-top: 4px;
  position: relative;
  :before {
    content: "";
    width: 100%;
    position: absolute;
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

const inner = css`
  max-width: var(--maxWidth-wrapper);
  margin: 0 auto;
  padding: 0.4rem 0;
  display: flex;
  align-items: center;
  @media (max-width: 42rem) {
    flex-direction: column;
  }
`
const logo = css`
  display: block;
  width: 200px;
  :hover {
    background: -webkit-linear-gradient(
      60deg,
      #12d6df,
      #f70fff,
      #faea3d,
      #fd644f
    );
    background-size: 400%;
    mask-image: url(${svg});
    animation: bgAnime 10s infinite;
    img {
      opacity: 0;
    }
  }
`

const desc = css`
  font-size: var(--fontSize-0);
  margin-left: var(--spacing-4);
  position: relative;
  display: inline-block;
  padding: var(--spacing-2) 0;
  border: 2px solid var(--color-primary);
  border-radius: 6px;
  box-sizing: border-box;
  :hover p span {
    animation-duration: 1s;
    :after {
      content: "💨💨💨💨";
    }
  }
  :before {
    content: "";
    position: absolute;
    top: 58%;
    left: -19px;
    margin-top: -12px;
    border: 8px solid transparent;
    border-right: 14px solid #fff;
    z-index: 2;
  }
  :after {
    content: "";
    position: absolute;
    top: 65%;
    left: -23px;
    margin-top: -14px;
    border: 8px solid transparent;
    border-right: 14px solid var(--color-primary);
    z-index: 1;
  }
  p {
    width: 300px;
    overflow: hidden;
    position: relative;
    margin: 0;
    span {
      padding-left: 300px;
      margin: 0;
      display: inline-block;
      white-space: nowrap;
      animation-name: marquee;
      animation-timing-function: linear;
      animation-duration: 10s;
      animation-iteration-count: infinite;
    }
  }
  @media (max-width: 42rem) {
    margin: var(--spacing-1) auto;
    padding: var(--spacing-1) 0;
    :before {
      top: -10px;
      left: 45%;
      border: 12px solid transparent;
      border-bottom: 14px solid #fff;
    }
    :after {
      top: -12px;
      left: 45%;
      border: 12px solid transparent;
      border-bottom: 14px solid var(--color-primary);
    }
  }
`

const Header = ({ isHomePage }) => {
  const {
    wp: {
      generalSettings: { description },
    },
  } = useStaticQuery(graphql`
    query HeaderQuery {
      wp {
        generalSettings {
          description
        }
      }
    }
  `)

  return (
    <header css={header}>
      <div css={inner}>
        <Link to="/" css={logo}>
          <img src={svg} alt={`カグラボ`} />
        </Link>
        <div css={desc}>
          <p>
            <span>&lt;!--{parse(description)}--&gt; </span>
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header
