import axios, { AxiosInstance } from 'axios'

import config from '../config/app'

interface IInventory {
  producto: string
  sku: string
  marca: string
  stock: number
  precio: number
}

interface IInventoryDB {
  _id: string
  producto: string
  sku: string
  marca: string
  stock: number
  precio: number
  createdAt: string
  udpatedAt: string
  __v: number
}

class InventoriesService {
  private service: AxiosInstance

  constructor() {
    this.service = axios.create({
      baseURL: config.ms.inventories,
      timeout: 5000,
    })
  }

  createMany = async (inventories: IInventory[]): Promise<void> => {
    try {
      const response = await this.service.post('/inventories/create-many', {
        inventories,
      })
      console.log('--response--')
      console.log(response.data)
    } catch (error) {
      console.error('ServicioInventories - createMany', error)
    }
  }

  listAll = async (): Promise<IInventoryDB[] | null> => {
    try {
      const response = await this.service.get(`/inventories/list`)
      const res: IInventoryDB[] = response.data?.inventories
      return res
    } catch (error) {
      console.error('ServicioInvnetories - listAll', error)
      return null
    }
  }
}

export default new InventoriesService()
