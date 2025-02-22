import dotenv from 'dotenv'

dotenv.config()

const config = {
  port: process.env.PORT || 3000,
  ms: {
    requirements: process.env.MS_REQUIREMENTS || '',
    inventories: process.env.MS_INVENTORIES || '',
    products: process.env.MS_PRODUCTS || '',
  },
}

export default config
