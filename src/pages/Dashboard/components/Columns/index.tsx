import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import type { registrationType } from "../RegistrationCard";

const allColumns = [
  { status: 'REVIEW', title: "Pronto para revisar" },
  { status: 'APPROVED', title: "Aprovado" },
  { status: 'REPROVED', title: "Reprovado" },
];

type Props = {
  registrations: registrationType[];
};

const Columns = ({ registrations }: Props) => {
  const filterRegistration = (status: string) =>
    registrations.filter((registration) => registration.status === status);



  return (
    <S.Container>
      {allColumns.map((column) => {
        return (
          <S.Column $status={column.status} key={column.title}>
            <>
              <S.TitleColumn $status={column.status}>
                {column.title}
              </S.TitleColumn>
              <S.ColumnContent>
                {filterRegistration(column.status).map((registration) =>
                  <RegistrationCard
                    registration={registration}
                    key={registration.id}
                  />)}
              </S.ColumnContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Columns;
