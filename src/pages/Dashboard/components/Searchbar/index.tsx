import { HiRefresh } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { IconButton } from "~/components/Buttons/IconButton";
import Button from "~/components/Buttons";
import TextField from "~/components/TextField";
import SelectField from "~/components/Select";

import routes from "~/router/routes";

import * as S from "./styles";

const options = [
  { value: "APPROVED", label: "Aprovado" },
  { value: "REVIEW", label: "Reprovado" },
  { value: "REPROVED", label: "Pronto para revisar" },
];

export const SearchBar = () => {
  const navigate = useNavigate();

  const goToNewAdmissionPage = () => {
    navigate(routes.newUser);
  };

  return (
    <S.Container>
      <TextField placeholder="Digite um CPF válido" />
      <SelectField options={options} />
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
