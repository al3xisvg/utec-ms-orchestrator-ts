import axios, { AxiosInstance } from 'axios'

import config from '@/config/app'

interface IInventory {
  producto: string
  sku: string
  marca: string
  stock: number
  precio: number
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
}

export default new InventoriesService()
