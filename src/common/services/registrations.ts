import axiosInstance from "@/common/instanceAxios";
import { Registration, RegistrationSearch } from "@/common/schemas/registration";
import { formatDate } from "@/common/utils";

export const Registrations = {
  async create(payload: Registration) {
    return await axiosInstance.post("/registrations", { ...payload, admissionDate: formatDate(payload.admissionDate), status: "REVIEW", cpf: payload.cpf.replace(/\D/g, "") });
  },
  async search(params?: RegistrationSearch) {
    return await axiosInstance.get("/registrations", {
      params: {
        cpf_like: `^${params?.cpf?.replace(/\D/g, "")}`,
      }
    });
  },
  async delete(id: number) {
    return await axiosInstance.delete(`/registrations/${id}`);
  },
  async updateStatus(id: number, status: "APPROVED" | "REVIEW" | "REPROVED") {
    return await axiosInstance.patch(`/registrations/${id}`, { status });
  }
};
