import React from "react"
import { css } from '@emotion/react'
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import parse from "html-react-parser"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/header"

const getKeyword = () => {
  const results = ['廃課金者', '運営', '天才', 'デザイナー']
  const randomNum = Math.floor(Math.random() * 4)
  return results[randomNum]
}

const images = css`
  margin-bottom: var(--spacing-4);
`;

const transparent = css`
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: relative;
  margin-bottom: var(--spacing-4);
  @media (max-width: 42rem) {
    min-height: 250px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: 0px 0px, 14px 14px;
    background-size: 28px 28px;
    background-repeat: repeat;
    background-image: linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff 100%),
    linear-gradient(45deg, #fff 25%, #e3e3e3 25%, #e3e3e3 75%, #fff 75%, #fff 100%);
  }
  p {
    width: 70%;
    padding: var(--spacing-2);
    text-align: center;
    font-size: var(--fontSize-5);
    font-weight: var(--fontWeight-black);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media (max-width: 42rem) {
      font-size: var(--fontSize-3);
    }
    &::after {
      width: 100%;
      height: 200px;
      content: '';
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 2px solid black;
      z-index: -1;
    }
  }
`;

const linkStyle = css`
  &:hover {
    .post-list-category {
      background: -webkit-linear-gradient( 60deg,#12d6df, #f70fff,#faea3d, #fd644f);
      background-size:400%;
      animation: bgAnime .2s infinite, unyonunyon 1s infinite;

      @keyframes unyonunyon {
        0%, 100%{transform:translate(0, 0%)}
        50%{transform:translate(0, 100%)}
      }
    }
  }
`;

const categoryLabel = css`
  position: absolute;
  left: -10px;
  top: 20px;
  z-index: 10;
  padding: 6px 15px;
  font-size: var(--fontSize-2);
  color: #fff;
  min-width: 80px;
  text-align: center;
  background: var(--color-primary);
  font-weight: 600;
  &:before {
    position: absolute;
    content: '';
    top: 100%;
    left: 0;
    border: none;
    border-bottom: solid 10px transparent;
    border-right: solid 10px var(--color-primary);
  }
`;

const BlogIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes

  if (!posts.length) {
    return (
      <Layout isHomePage>
        <Header />
        <Seo title="All posts" />
        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </Layout>
    )
  }

  return (
    <Layout isHomePage>
      <Seo title="All Posts" />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.title
          const featuredImage = {
            fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
            alt: post.featuredImage?.node?.alt || ``,
          }
          const category = {
            name: post.categories?.nodes[0].name
          }

          return (
            <li key={post.uri}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <Link to={post.uri} itemProp="url" css={linkStyle}>
                  <div className="post-list-category" css={categoryLabel}>{category.name}</div>
                  {!featuredImage?.fluid && (
                    <div css={transparent}>
                      <p>
                        {getKeyword()}のみ見える<br/>
                        "{parse(title.substr( 0, 5 ))}..."の<br/>
                        サムネイル画像です
                      </p>
                    </div>
                  )}
                  {featuredImage?.fluid && (
                    <Image
                      fluid={featuredImage.fluid}
                      alt={featuredImage.alt}
                      css={images}
                    />
                  )}
                  <h2><span itemProp="headline">{parse(title)}</span>

                  </h2>
                  <section itemProp="description">{parse(post.excerpt)}</section>
                  <small>{post.date}</small>
                </Link>
              </article>
            </li>
          )
        })}
      </ol>

      {previousPagePath && (
        <>
          <Link to={previousPagePath}>Previous page</Link>
          <br />
        </>
      )}
      {nextPagePath && <Link to={nextPagePath}>Next page</Link>}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allWpPost(
      sort: { fields: [date], order: DESC }
      limit: $postsPerPage
      skip: $offset
    ) {
      nodes {
        excerpt
        uri
        date(formatString: "YYYY/MM/DD")
        title
        categories {
            nodes {
                name
            }
        }
          
        featuredImage {
          node {
            altText
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000, quality: 100) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
