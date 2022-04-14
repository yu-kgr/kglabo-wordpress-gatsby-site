import React from "react"
import Header from "./header"
import Footer from "./footer"

const Layout = ({ isHomePage, children }) => {
  return (
    <div className="global-wrapper">
      <Header />
      <main className="main-wrapper" data-is-root-path={isHomePage}>
        {children}
      </main>
      {/*
        // TODO: Naviを追加する
        // - サイト内検索 {@see: https://diff001a.netlify.app/gatsby-site-search/}
        // - Profile
        // - 人気記事
        // - カテゴリ
        // - タグ
        // - 広告
        // -
      */}
      <Footer />
    </div>
  )
}

export default Layout
