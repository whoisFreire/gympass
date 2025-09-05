import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRespository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRespository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRespository)

    await gymsRespository.create({
      title: 'Near gym',
      description: null,
      latitude: -22.3473871,
      longitude: -46.95137,
      phone: null,
    })
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRespository.create({
      title: 'Far gym',
      description: null,
      latitude: -22.7410573,
      longitude: -46.8988767,
      phone: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.3473871,
      userLongitude: -46.95137,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })])
  })
})
