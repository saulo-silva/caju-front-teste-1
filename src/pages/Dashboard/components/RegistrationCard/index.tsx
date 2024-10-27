import { useModal } from "@ebay/nice-modal-react";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import { useRegistrationDelete, useRegistrationUpdateStatus } from "@/common/hooks/react-query/registrations";

import ConfirmationModal from "@/components/ConfirmationModal";
import Button from "@/components/Buttons";

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
  modal.show({ status }).then((result) => {
    if (result) {
      mutation.mutate({ id, status });
    }
  });
};

  if (status === "REVIEW") {
    return (
      <>
        <Button onClick={() => updateStatus("APPROVED")} $variant="primary" aria-label="Aprovar">Aprovar</Button>
        <Button onClick={() => updateStatus("REPROVED")} $variant="secondary" aria-label="Reprovar">Reprovar</Button>
      </>
    );
  }

  if (status === "REPROVED" || status === "APPROVED") {
    return <Button onClick={() => updateStatus("REVIEW")} $variant="primary" aria-label="Revisar novamente">Revisar novamente</Button>;
  }

  return null;
};

const RegistrationCard = ({ registration }: Props) => {
  const { id, employeeName, email, admissionDate, status } = registration;
  const mutation = useRegistrationDelete();
  const modal = useModal(ConfirmationModal);

  const handleDelete = () => {
    modal.show({ status: "DELETE" }).then((result) => {
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
        <Button onClick={handleDelete} $variant="tertiary" className="trash" aria-label="Remover">
          <HiOutlineTrash />
        </Button>
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
