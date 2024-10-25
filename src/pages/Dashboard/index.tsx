import Columns from "./components/Columns";

import { SearchBar } from "./components/Searchbar";
import { useRegistrationSearch } from "~/common/hooks/react-query/registrations.ts";

import * as S from "./styles";

const DashboardPage = () => {
  const { data: registrations = [], refetch } = useRegistrationSearch();

  return (
    <S.Container>
      <SearchBar refetch={refetch} />
      <Columns registrations={registrations} />
    </S.Container>
  );
};
export default DashboardPage;
