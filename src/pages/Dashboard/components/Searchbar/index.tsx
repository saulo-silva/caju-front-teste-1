import { HiRefresh } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { IconButton } from "~/components/Buttons/IconButton";
import Button from "~/components/Buttons";
import TextField from "~/components/TextField";

import routes from "~/router/routes";

import * as S from "./styles";
import { useForm } from "react-hook-form";
import { RegistrationSearch, schemaSearch } from "~/common/schemas/registration.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatCPF } from "~/common/utils.ts";

type Props = {
  refetch: () => void
}

export const SearchBar = ({ refetch }: Props) => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<RegistrationSearch>({
    resolver: zodResolver(schemaSearch)
  });

  const goToNewAdmissionPage = () => {
    navigate(routes.newUser);
  };

  const onSubmit = handleSubmit(data => {
    console.log(data)
  });

  return (
    <S.Container>
      <S.Form onSubmit={onSubmit}>
        <TextField
          {...register("cpf")}
          error={errors.cpf?.message}
          placeholder="Digite um CPF válido"
          maxLength={14}
          onChange={(e) => {
            const formattedValue = formatCPF(e.target.value);

            setValue('cpf', formattedValue, { shouldValidate: true });
          }}
        />
      </S.Form>
      <S.Actions>
        <IconButton onClick={refetch} aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
