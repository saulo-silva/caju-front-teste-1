import { useEffect, useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { IconButton } from "~/components/Buttons/IconButton";
import Button from "~/components/Buttons";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";

import { schemaSearch } from "~/common/schemas/registration.ts";
import { formatCPF } from "~/common/utils.ts";
import { ZodIssue } from "zod";
import { useDebouncedValue } from "~/common/hooks/use-debounced-value.ts";

type Props = {
  refetch: () => void
  // eslint-disable-next-line no-unused-vars
  onSearch: (value?: string) => void
};

const getLastRecord = (arr: ZodIssue[] | null) => {
  return arr && arr.length > 0 ? arr[arr.length - 1] : null;
};

export const SearchBar = ({ refetch, onSearch }: Props) => {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState<string>('');
  const [errorCpf, setErrorCpf] = useState<string | undefined>();
  const [debouncedCpf] = useDebouncedValue(cpf, 500);

  const goToNewAdmissionPage = () => {
    navigate(routes.newUser);
  };

  useEffect(() => {
    if (debouncedCpf) {
      onSearch(debouncedCpf);
    }
  }, [debouncedCpf, onSearch]);

  return (
    <S.Container>
      <TextField
        error={errorCpf}
        placeholder="Digite um CPF válido"
        maxLength={14}
        value={cpf}
        onChange={(e) => {
          const formattedValue = formatCPF(e.target.value);
          const result = schemaSearch.shape.cpf.safeParse(formattedValue);

          setCpf(formattedValue);
          if (result.error) {
            setErrorCpf(getLastRecord(result.error.errors)?.message);
          } else {
            setErrorCpf(undefined);
          }
        }}
      />

      <S.Actions>
        <IconButton onClick={refetch} aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
