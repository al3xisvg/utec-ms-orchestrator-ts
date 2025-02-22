import { Request, Response, Router } from 'express'

import RequirementsService from '../services/requirements'
import ProductsService from '../services/products'
import InventoriesService from '@/services/inventories'

const router = Router()

router.post(
  '/create/requirement-with-products',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { productos, ...requirement } = req.body
      const requirementDB = await RequirementsService.createSingle(requirement)
      if (!requirementDB) {
        throw new Error('No se pudo crear el requerimiento')
      }

      productos.forEach((_: any, idx: number) => {
        productos[idx].requirementId = requirementDB._id
      })
      const productsDB = await ProductsService.createMany(productos)
      if (!productsDB) {
        throw new Error('No se pudieron crear los productos')
      }

      res.json({
        success: true,
        data: { requirement: requirementDB, products: productsDB },
      })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error al crear el requerimiento', error })
    }
  }
)

router.get(
  '/list/requirements',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const requirementsDB = await RequirementsService.listAll()
      if (!requirementsDB) {
        throw new Error('No se pudo list los requerimiento')
      }

      res.json({
        success: true,
        data: { requirementsDB },
      })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error al list los requerimientos', error })
    }
  }
)

router.get(
  '/obtain/requirement-with-products/:requirementId',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { requirementId } = req.params
      const requirementDB = await RequirementsService.details(requirementId)
      if (!requirementDB) {
        throw new Error('No se pudo obtener el requerimiento')
      }

      const productsDB = await ProductsService.listByReq(requirementId)
      if (!productsDB) {
        throw new Error('No se pudieron listar los productos')
      }

      res.json({
        success: true,
        data: { requirement: requirementDB, products: productsDB },
      })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error al obtener el requerimiento', error })
    }
  }
)

router.get(
  '/match/:requirementId',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { requirementId } = req.params
      const productsDB = await ProductsService.listByReq(requirementId)
      if (!productsDB) {
        throw new Error('No se pudieron listar los productos')
      }

      const inventoriesDB = await InventoriesService.listAll()
      if (!inventoriesDB) {
        throw new Error('No se pudieron listar los inventarios')
      }

      res.json({
        success: true,
        data: { products: productsDB, inventories: inventoriesDB },
      })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error al obtener el requerimiento', error })
    }
  }
)

export default router
