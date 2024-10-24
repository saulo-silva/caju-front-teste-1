import axiosInstance from '~/common/instanceAxios.ts'
import { NewUserForm } from "~/pages/NewUser";


export const Registrations = {
  async create(payload: NewUserForm) {
    return await axiosInstance.post('/registrations', { ...payload, cpf: payload.cpf.replace(/\D/g, ''), status: 'REVIEW' })
  }
}
