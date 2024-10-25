import axiosInstance from '~/common/instanceAxios.ts'
import { Registration, RegistrationSearch } from "~/common/schemas/registration";


export const Registrations = {
  async create(payload: Registration) {
    return await axiosInstance.post('/registrations', payload)
  },
  async search(params?: RegistrationSearch) {
    return await axiosInstance.get('/registrations', {
      params
    })
  },
  async delete(id: number) {
    return await axiosInstance.delete(`/registrations/${id}`)
  },
  async updateStatus(id: number, status: 'APPROVED' | 'REVIEW' | 'REPROVED') {
    return await axiosInstance.put(`/registrations/${id}/status`, { status })
  }
}
