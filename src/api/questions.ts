import { api } from './api'

export default class QuestionsService {
  static getAll = () => {
    return api.get('/api/questions')
  }

  static add = (content: string) => {
    return api.post('/api/questions', content)
  }

  static deleteById = (id: number) => {
    return api.delete(`/api/questions/${id}`)
  }
}
