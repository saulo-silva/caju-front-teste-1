import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import TextField from "~/components/TextField";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";

import { useRegistrationCreate } from "~/common/hooks/react-query/registrations.ts";
import { formatCPF, validateCPF } from "~/common/utils";

import routes from "~/router/routes";

import * as S from "./styles";

const newUserSchema = z.object({
  email: z.string().email({ message: "Por favor, digite um formato de e-mail válido" }),
  employeeName: z
    .string()
    .min(1, { message: "O nome do funcionário é obrigatório" })
    .refine((name) => /^[^\d]/.test(name), {
      message: "O nome não pode começar com um número",
    })
    .refine((name) => name.includes(' '), {
      message: "O nome do funcionário deve ser completo",
    })
    .refine((name) => {
      const parts = name.split(' ');
      return parts.every(part => part.length >= 2);
    }, { message: "É necessário ter dois caracteres, entre nome e sobrenome" }),
  cpf: z.string()
    .min(11, { message: "O CPF deve ter pelo menos 11 caracteres" })
    .max(14, { message: "O CPF não pode ter mais de 14 caracteres" })
    .refine((cpf) => validateCPF(cpf), {
      message: "Por favor, digite um CPF válido",
    }),
  admissionDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Data de admissão inválida" }),
});

export type NewUserForm = z.infer<typeof newUserSchema> & {
  id?: number
  status?: 'APPROVED' | 'REVIEW' | 'REPROVED'
};

const NewUserPage = () => {
  const mutation = useRegistrationCreate();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<NewUserForm>({
    resolver: zodResolver(newUserSchema),
    mode: "onBlur"
  });

  const goToHome = () => {
    navigate(routes.dashboard);
  };

  const onSubmit = handleSubmit(data => {
      mutation.mutate(data, {
        onSuccess: () => {
          goToHome();
        },
        onError: (error) => {
          console.error('Erro ao criar usuário:', error.message);
        }
      });

  });

  return (
    <S.Container>
      <S.Form onSubmit={onSubmit}>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>

        <TextField  {...register("employeeName")} error={errors.employeeName?.message} placeholder="Nome" label="Nome" />
        <TextField  {...register("email")} error={errors.email?.message} placeholder="Email" label="Email" type="email" />
        <TextField
          {...register("cpf")}
          error={errors.cpf?.message}
          placeholder="CPF"
          label="CPF"
          maxLength={14}
          onChange={(e) => {
            const formattedValue = formatCPF(e.target.value);
            setValue('cpf', formattedValue, { shouldValidate: true });
          }}
        />
        <TextField {...register("admissionDate")} error={errors.admissionDate?.message} label="Data de admissão" type="date" />

        <Button type="submit">Cadastrar</Button>
      </S.Form>
    </S.Container>
);
};

export default NewUserPage;
