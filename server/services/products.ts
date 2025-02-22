import axios, { AxiosInstance } from 'axios'

import config from '../config/app'

interface IProduct {
  nombre: string
  unidad: string
  cantidad: number
  marca: string

  requirementId: string
}

interface IProductDB {
  _id: string
  nombre: string
  unidad: string
  cantidad: number
  marca: string
  requirementId: string
  inventoryId?: string | undefined
  __v: number
}

class ProductsService {
  private service: AxiosInstance

  constructor() {
    this.service = axios.create({
      baseURL: config.ms.products,
      timeout: 5000,
    })
  }

  createMany = async (products: IProduct[]): Promise<IProductDB[] | null> => {
    try {
      console.log('--product--s')
      console.log(products)
      const response = await this.service.post('/products/create-many', {
        products,
      })
      const res: IProductDB[] = response.data?.products ?? []
      return res
    } catch (error: any) {
      console.error('ServicioProductos - createMany', error)
      return null
    }
  }

  listByReq = async (requirementId: string): Promise<IProductDB[] | null> => {
    try {
      const response = await this.service.get(
        `/products/list-by-req/${requirementId}`
      )
      const res: IProductDB[] = response.data?.products
      return res
    } catch (error) {
      console.error('ServicioProductos - listByReq', error)
      return null
    }
  }
}

export default new ProductsService()
