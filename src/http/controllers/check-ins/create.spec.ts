import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUse } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUse(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'test gym',
        description: 'test',
        phone: '11999999999',
        latitude: -22.3473871,
        longitude: -46.95137,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -22.3473871,
        longitude: -46.95137,
      })

    expect(response.statusCode).toEqual(201)
  })
})
