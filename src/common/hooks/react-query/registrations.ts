import { useMutation } from "@tanstack/react-query";

import { NewUserForm } from "~/pages/NewUser";
import { Registrations } from "~/common/services/registrations.ts";

export const useRegistrationCreate = () => {
  return useMutation({
    mutationFn: (payload: NewUserForm) => {
      return Registrations.create(payload)
    },
  });
}
