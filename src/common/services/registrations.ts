import axiosInstance from '~/common/instanceAxios.ts'
import { Registration, RegistrationSearch } from "~/common/schemas/registration";


export const Registrations = {
  async create(payload: Registration) {
    return await axiosInstance.post('/registrations', { ...payload, cpf: payload.cpf.replace(/\D/g, ''), status: 'REVIEW' })
  },
  async search(params?: RegistrationSearch) {
    return await axiosInstance.get('/registrations', {
      params
    })
  }
}
