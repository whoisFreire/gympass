import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeCheckInUseCase() {
  const checkInrepository = new PrismaCheckInsRepository()
  const gymRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInrepository, gymRepository)
  return useCase
}
