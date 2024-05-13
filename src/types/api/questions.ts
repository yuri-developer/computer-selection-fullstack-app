import { CostsFact, RefuelFact, SpeedFact, StatusFact, TypeFact } from './facts'

export interface Question {
  id: number
  content: string
  costs?: CostsFact
  status?: StatusFact
  type?: TypeFact
  speed?: SpeedFact
  refuel?: RefuelFact
}
