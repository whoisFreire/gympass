import { SearchGymsUseCase } from '../search-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsUseCase() {
  const repository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(repository)
  return useCase
}
