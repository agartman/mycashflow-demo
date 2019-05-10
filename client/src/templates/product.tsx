import * as React from 'react'
import Layout from '../components/layout'

export default class ProductPage extends React.Component<any, any> {
  public render() {
    console.log(this.props)
    const { name } = this.props.pathContext

    return (
      <Layout>
        <h1>{name}</h1>
      </Layout>
    )
  }
}
