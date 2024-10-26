import { useState } from "react";

import { useRegistrationSearch } from "@/common/hooks/react-query/registrations";

import Columns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";

import * as S from "./styles";

const DashboardPage = () => {
  const [cpf, setCpf] = useState<string | undefined>("");
  const { data: registrations = [], refetch } = useRegistrationSearch({
    cpf: cpf,
  });

  const handleSearch = (search?: string) => {
    setCpf(search);
  };

  return (
    <S.Container>
      <SearchBar refetch={refetch} onSearch={handleSearch} />
      <Columns registrations={registrations} />
    </S.Container>
  );
};

export default DashboardPage;
