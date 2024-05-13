import { CostsFact, Fact, RefuelFact, SpeedFact, StatusFact, TypeFact } from '@/types/api/facts'
import { api } from './api'

export type AddRequest = {
  content: string
  costs?: CostsFact
  status?: StatusFact
  type?: TypeFact
  speed?: SpeedFact
  refuel?: RefuelFact
}

export default class FactService {
  static getAll = () => {
    return api.get<Fact[]>('/api/facts')
  }

  static add = (addFact: AddRequest) => {
    return api.post('/api/facts', { ...addFact })
  }

  static deleteById = (id: number) => {
    return api.delete(`/api/facts/${id}`)
  }
}
