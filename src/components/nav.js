import React from "react"
import { css } from '@emotion/react'

const style = css`
  color: blue;
`

const Navi = ({ isHomePage }) => {
  return (
    <nav css={style}>

      // TODO: カテゴリのナビを作る

      {isHomePage ? (
        ` aaa`
      ) : (
        ` bbb`
      )}

    </nav>
  )
}

export default Navi