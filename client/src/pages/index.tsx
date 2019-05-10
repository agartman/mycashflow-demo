import * as React from 'react'
import * as styles from './Index.module.scss'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        name: string
        tagline: string
      }
    }
    allProducts: {
      nodes: {
        name: string
        id: string
      }
    }
  }
}

export const indexPageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        name
        tagline
      }
    }
    allProducts {
      nodes {
        name
        id
      }
    }
  }
`

export default class IndexPage extends React.Component<IndexPageProps, {}> {
  public render() {
    const { name, tagline } = this.props.data.site.siteMetadata

    return (
      <Layout>
        <div className={styles.Container}>
          <h1>{name}</h1>
          <p>{tagline}</p>
        </div>
      </Layout>
    )
  }
}
