import Columns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import type { registrationType } from "~/pages/Dashboard/components/RegistrationCard";

const generateRegistration = (): registrationType => {
  return {
    id: Math.floor(Math.random() * 1000),
    employeeName: "John Doe",
    email: "john.doe@example.com",
    admissionDate: new Date().toISOString().split('T')[0],
  };
};

const DashboardPage = () => {
  return (
    <S.Container>
      <SearchBar />
      <Columns registrations={[generateRegistration()]} />
    </S.Container>
  );
};
export default DashboardPage;
