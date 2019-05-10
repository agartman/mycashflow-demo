const axios = require('axios')
const camelcaseKeys = require('camelcase-keys')
const camelcase = require('camelcase')
const chalk = require('chalk')
const defaultEndPoints = [
  `products`,
  `brands`,
  `payment-methods`,
  `categories`,
  `banner-groups`,
  `customer-groups`,
  `customers`,
  `email-subscribers`,
  `stock`,
  `stock-changes`,
  `suppliers`,
  `versions`,
]

const logServerError = err => {
  console.error(err)
}

const getListFromEndPoint = async (baseURL, password, username, endpoint) => {
  return axios(`/${endpoint}`, {
    timeout: 2000,
    baseURL,
    auth: {
      username,
      password,
    },
  })
    .then(response => {
      console.log(
        chalk.green(`Pulled data from My cashflow source /${endpoint}`),
      )
      return camelcaseKeys(response.data.data)
    })
    .catch(logServerError)
}

const transformToGatsbyNode = (
  endPointItem,
  createNodeId,
  endpoint,
  createContentDigest,
) => {
  const type = camelcase(endpoint)
  const nodeContent = JSON.stringify(endPointItem)
  const nodeMeta = {
    id: createNodeId(`mycashflow-${type}-${endPointItem.id}`),
    parent: null,
    children: [],
    internal: {
      type,
      content: nodeContent,
      contentDigest: createContentDigest(endPointItem),
    },
  }

  const node = Object.assign({}, endPointItem, nodeMeta)
  return node
}

const getGatsbyNodesFromEndPoints = async (
  createNodeId,
  createContentDigest,
  { baseURL, password, username, endpoints },
) => {
  let nodes = []
  const configuredEndPoints = endpoints ? endpoints : defaultEndPoints
  for (let index = 0; index < configuredEndPoints.length; index++) {
    const apiEndpoint = configuredEndPoints[index]
    const endPointItems = await getListFromEndPoint(
      baseURL,
      password,
      username,
      apiEndpoint,
    )
    const gatsbyNodes = endPointItems.map(endPointItem =>
      transformToGatsbyNode(
        endPointItem,
        createNodeId,
        apiEndpoint,
        createContentDigest,
      ),
    )
    nodes.push(...gatsbyNodes)
  }
  return nodes
}

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions,
) => {
  const gatsbyNodes = await getGatsbyNodesFromEndPoints(
    createNodeId,
    createContentDigest,
    configOptions,
  )
  gatsbyNodes.forEach(gatsbyNode => {
    actions.createNode(gatsbyNode)
  })
}
