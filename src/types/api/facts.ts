export interface Fact {
  id: number
  content: string
  points: number
  costs?: CostsFact
  status?: StatusFact
  type?: TypeFact
  speed?: SpeedFact
  refuel?: RefuelFact
}

export type CostsFact = 'expensive' | 'medium' | 'cheap'
export type StatusFact = 'family' | 'sport' | 'compact' | 'premium' | 'off-road'
export type TypeFact = 'sedan' | 'jeep' | 'crossover'
export type SpeedFact = 'fast' | 'medium' | 'slow'
export type RefuelFact = 'fuel' | 'electrical energy'
