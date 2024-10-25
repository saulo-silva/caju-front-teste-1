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
