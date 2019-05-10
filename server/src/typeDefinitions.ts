import { gql } from 'apollo-server'

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
export const typeDefs = gql`
  # The "Query" type is the root of all GraphQL queries.
  type Product {
    id: Int,
    createdAt: String,
    updatedAt: String,
    productCode: String,
    supplierCode: String,
    name: String,
    description: String,
    information: String,
    keywords: String,
    price: Float,
    purchasePrice: Float,
    vatRate: Int,
    weight: Float,
    warranty: Int,
    brandId: Int,
    supplierId: Int,
    availableFrom: String,
    availableTo: String,
    featured: Boolean,
    visibleFrom: String,
    purchasableFrom: String,
    orderLimit: Int,
    seoTitle: String,
    seoPageTitle: String,
    seoMetaDescription: String,
    barcode: String 
  }

  type Query {
    products: [Product]
  }
`
