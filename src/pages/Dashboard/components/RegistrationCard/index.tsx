import { useModal } from "@ebay/nice-modal-react";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import { useRegistrationDelete, useRegistrationUpdateStatus } from "@/common/hooks/react-query/registrations";

import ConfirmationModal from "@/components/ConfirmationModal";
import { ButtonSmall } from "@/components/Buttons";

import * as S from "./styles";

export type registrationType = {
  id: number
  employeeName: string
  email: string
  admissionDate: string
  status: "APPROVED" | "REVIEW" | "REPROVED"
}

type Props = {
  registration: registrationType
};

const ActionButtons = ({ id, status }: { id: number; status: "APPROVED" | "REVIEW" | "REPROVED" }) => {
  const modal = useModal(ConfirmationModal);
  const mutation = useRegistrationUpdateStatus();

const updateStatus = (status: "APPROVED" | "REVIEW" | "REPROVED") => {
  const messages = {
    "APPROVED": "Tem certeza que deseja aprovar?",
    "REPROVED": "Tem certeza que deseja reprovar?",
    "REVIEW": "Tem certeza que deseja revisar novamente?",
  };

  const message = messages[status] || "Tem certeza que deseja atualizar situação?";

  modal.show({ title: message }).then((result) => {
    if (result) {
      mutation.mutate({ id, status });
    }
  });
};

  if (status === "REVIEW") {
    return (
      <>
        <ButtonSmall onClick={() => updateStatus("APPROVED")} $bgcolor="rgb(155, 229, 155)" aria-label="Aprovar">Aprovar</ButtonSmall>
        <ButtonSmall onClick={() => updateStatus("REPROVED")} $bgcolor="rgb(255, 145, 154)" aria-label="Reprovar">Reprovar</ButtonSmall>
      </>
    );
  }

  if (status === "REPROVED" || status === "APPROVED") {
    return <ButtonSmall onClick={() => updateStatus("REVIEW")} $bgcolor="#ff8858" aria-label="Revisar novamente">Revisar novamente</ButtonSmall>;
  }

  return null;
};

const RegistrationCard = ({ registration }: Props) => {
  const { id, employeeName, email, admissionDate, status } = registration;
  const mutation = useRegistrationDelete();
  const modal = useModal(ConfirmationModal);

  const handleDelete = () => {
    modal.show({ title: "Tem certeza que deseja excluir?" }).then((result) => {
      if (result) {
        mutation.mutate({ id });
      }
    });
  };

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
        <ActionButtons id={id} status={status} />
        <ButtonSmall onClick={handleDelete} className="trash" $bgcolor="transparent" aria-label="Remover">
          <HiOutlineTrash />
        </ButtonSmall>
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
