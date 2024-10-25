import { ButtonSmall } from "~/components/Buttons";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import * as S from "./styles";

export type registrationType = {
  id: number
  employeeName: string
  email: string
  admissionDate: string
  status: 'APPROVED' | 'REVIEW' | 'REPROVED'
}

type Props = {
  registration: registrationType
};

const ActionButtons = ({ status }: { status: 'APPROVED' | 'REVIEW' | 'REPROVED' }) => {
  if (status === 'REVIEW') {
    return (
      <>
        <ButtonSmall $bgcolor="rgb(155, 229, 155)" aria-label="Aprovar">Aprovar</ButtonSmall>
        <ButtonSmall $bgcolor="rgb(255, 145, 154)" aria-label="Reprovar">Reprovar</ButtonSmall>
      </>
    );
  }

  if (status === 'REPROVED' || status === 'APPROVED') {
    return <ButtonSmall $bgcolor="#ff8858" aria-label="Revisar novamente">Revisar novamente</ButtonSmall>;
  }

  return null;
};

const RegistrationCard = ({ registration }: Props) => {
  const { employeeName, email, admissionDate, status } = registration

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        <ActionButtons status={status} />
        <ButtonSmall className="trash" $bgcolor="transparent" aria-label="Remover">
          <HiOutlineTrash />
        </ButtonSmall>

      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
