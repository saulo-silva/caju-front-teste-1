import { useMutation, useQuery } from "@tanstack/react-query";

import { Registration, RegistrationSearch } from "~/common/schemas/registration";
import { Registrations } from "~/common/services/registrations";

export const useRegistrationCreate = () => {
  return useMutation({
    mutationFn: (payload: Registration) => {
      return Registrations.create(payload)
    },
  });
}

export const useRegistrationSearch = (params?: RegistrationSearch) => {
  return useQuery({
    queryKey: ['registration-search', params],
    queryFn: async () => {
      const data = await Registrations.search(params);

      return data.data;
    },
  })
}
