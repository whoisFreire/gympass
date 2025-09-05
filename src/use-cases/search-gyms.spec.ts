import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let gymsRespository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRespository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRespository)

    await gymsRespository.create({
      title: 'test-0 gym',
      description: null,
      latitude: -22.3473871,
      longitude: -46.95137,
      phone: null,
    })
  })

  it('should be able to search for gyms', async () => {
    await gymsRespository.create({
      title: 'test-1 gym',
      description: null,
      latitude: -22.3473871,
      longitude: -46.95137,
      phone: null,
    })
    const { gyms } = await sut.execute({ query: 'test', page: 1 })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'test-0 gym' }),
      expect.objectContaining({ title: 'test-1 gym' }),
    ])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 21; i++) {
      await gymsRespository.create({
        title: `test-${i} gym`,
        description: null,
        latitude: -22.3473871,
        longitude: -46.95137,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({ query: 'test', page: 2 })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'test-20 gym' }),
      expect.objectContaining({ title: 'test-21 gym' }),
    ])
  })
})
