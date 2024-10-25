import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Registration, RegistrationSearch } from "~/common/schemas/registration";
import { Registrations } from "~/common/services/registrations";

const queryKeys = {
  registrationSearch: 'registration-search',
}

export const useRegistrationCreate = () => {
  return useMutation({
    mutationFn: (payload: Registration) => {
      return Registrations.create(payload)
    },
  });
}

export const useRegistrationUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number, status: 'APPROVED' | 'REVIEW' | 'REPROVED' }) => {
      return Registrations.updateStatus(id, status)
    },
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: [queryKeys.registrationSearch] });
      await queryClient.refetchQueries({ queryKey: [queryKeys.registrationSearch] });
    }
  });
}

export const useRegistrationDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return Registrations.delete(id)
    },
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: [queryKeys.registrationSearch] });
      await queryClient.refetchQueries({ queryKey: [queryKeys.registrationSearch] });
    }
  });
}

export const useRegistrationSearch = (params?: RegistrationSearch) => {
  return useQuery({
    queryKey: [queryKeys.registrationSearch, params],
    queryFn: async () => {
      const data = await Registrations.search(params);

      return data.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}
