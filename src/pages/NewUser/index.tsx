import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import TextField from "@/components/TextField";
import Button from "@/components/Buttons";
import { IconButton } from "@/components/Buttons/IconButton";

import { type Registration, schema } from "@/common/schemas/registration";
import { useRegistrationCreate } from "@/common/hooks/react-query/registrations";
import { formatCPF } from "@/common/utils";

import routes from "@/router/routes";

import * as S from "./styles";
import {toast} from "sonner";

const NewUserPage = () => {
  const mutation = useRegistrationCreate();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Registration>({
    resolver: zodResolver(schema)
  });

  const goToHome = () => {
    navigate(routes.dashboard);
  };

  const onSubmit = handleSubmit(data => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success('Registro criado com sucesso!');
        goToHome();
      },
      onError: () => {
        toast.error('Erro ao criar registro!');
      }
    });
  });

  return (
    <S.Container>
      <S.Form onSubmit={onSubmit} data-testid="new-user-form">
        <IconButton onClick={() => goToHome()} aria-label="back" data-testid="back-button">
          <HiOutlineArrowLeft size={24} />
        </IconButton>

        <TextField
          {...register("employeeName")}
          error={errors.employeeName?.message}
          placeholder="Nome"
          label="Nome"
          data-testid="employee-name-input"
        />
        <TextField
          {...register("email")}
          error={errors.email?.message}
          placeholder="Email"
          label="Email"
          type="email"
          data-testid="email-input"
        />
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
          data-testid="cpf-input"
        />
        <TextField
          {...register("admissionDate")}
          error={errors.admissionDate?.message}
          label="Data de admissão"
          type="date"
          data-testid="admission-date-input"
        />

        <Button type="submit" data-testid="submit-button">Cadastrar</Button>
      </S.Form>
    </S.Container>
  );
};

export default NewUserPage;
