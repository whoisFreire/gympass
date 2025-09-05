import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)

    await checkInsRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-0',
    })
  })

  it('should be able to get check-ins count from metrics', async () => {
    const { checkInsCount } = await sut.execute({ userId: 'user-1' })
    expect(checkInsCount).toEqual(1)
  })
})
