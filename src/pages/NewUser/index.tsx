import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

import TextField from "~/components/TextField";
import Button from "~/components/Buttons";

import { IconButton } from "~/components/Buttons/IconButton";

import routes from "~/router/routes";

import * as S from "./styles";

const NewUserPage = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate(routes.dashboard);
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField placeholder="Nome" label="Nome" />
        <TextField placeholder="Email" label="Email" type="email" />
        <TextField placeholder="CPF" label="CPF" />
        <TextField label="Data de admissão" type="date" />
        <Button onClick={() => {}}>Cadastrar</Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
