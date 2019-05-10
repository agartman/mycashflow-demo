import * as React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
export default (props: any) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            name
          }
        }
      }
    `
  )
  return (
    <div>
      <Link to={`/`}>
        <h3>{data.site.siteMetadata.name}</h3>
      </Link>
      {props.children}
      <Link to={`/about/`}>About</Link>
    </div>
  )
}
