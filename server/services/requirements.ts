import axios, { AxiosInstance } from 'axios'

import config from '../config/app'

interface IRequirement {
  nombre: string
  codigo: string
}

interface IRequirementDB {
  _id: string
  nombre: string
  codigo: string
  createdAt: string
  updatedAt: string
  __v: number
}

class RequirementsService {
  private service: AxiosInstance

  constructor() {
    this.service = axios.create({
      baseURL: config.ms.requirements,
      timeout: 5000,
    })
  }

  createSingle = async (
    requirement: IRequirement
  ): Promise<IRequirementDB | null> => {
    try {
      const response = await this.service.post(
        '/requirements/create-single',
        requirement
      )
      const res: IRequirementDB = response.data
      return res
    } catch (error) {
      console.error('ServicioRequirements - createSingle', error)
      return null
    }
  }

  listAll = async (): Promise<IRequirementDB[] | null> => {
    try {
      const response = await this.service.get('/requirements/list')
      const res: IRequirementDB[] = response.data?.requirements
      return res
    } catch (error) {
      console.error('ServicioRequirements - listAll', error)
      return null
    }
  }

  details = async (requirementId: string): Promise<IRequirementDB | null> => {
    try {
      const response = await this.service.get(
        `/requirements/obtain/${requirementId}`
      )
      const res: IRequirementDB = response.data?.requirements
      return res
    } catch (error) {
      console.error('ServicioRequirements - details', error)
      return null
    }
  }
}

export default new RequirementsService()
