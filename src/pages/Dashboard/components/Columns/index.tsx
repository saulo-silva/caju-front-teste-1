import * as S from "./styles";
import React, { useState } from "react";
import RegistrationCard from "../RegistrationCard";
import type { registrationType } from "../RegistrationCard";
import { useRegistrationUpdateStatus } from "~/common/hooks/react-query/registrations.ts";

const allColumns = [
  { status: 'REVIEW', title: "Pronto para revisar" },
  { status: 'APPROVED', title: "Aprovado" },
  { status: 'REPROVED', title: "Reprovado" },
];

type Props = {
  registrations: registrationType[];
};

const Columns = ({ registrations }: Props) => {
  const [draggedItem, setDraggedItem] = useState<registrationType | null>(null);
  const mutation = useRegistrationUpdateStatus();

  const updateStatus = (id: number, status: 'APPROVED' | 'REVIEW' | 'REPROVED') => {
    mutation.mutate({ id, status });
  }

  const filterRegistration = (status: string) =>
    registrations.filter((registration) => registration.status === status);

  const handleDragStart = (_: React.DragEvent, registration: registrationType) => {
    setDraggedItem(registration);
  };

  const handleDrop = (event: React.DragEvent, status: 'REVIEW' | 'APPROVED' | 'REPROVED') => {
    event.preventDefault();
    if (draggedItem) {
      draggedItem.status = status;
      updateStatus(draggedItem.id, status);
      setDraggedItem(null);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <S.Container>
      {allColumns.map((column) => {
        return (
          <S.Column
            $status={column.status}
            key={column.status}
            onDrop={(event) => handleDrop(event, column.status as 'REVIEW' | 'APPROVED' | 'REPROVED')}
            onDragOver={handleDragOver}
          >
            <>
              <S.TitleColumn $status={column.status}>
                {column.title}
              </S.TitleColumn>
              <S.ColumnContent>
                {filterRegistration(column.status).map((registration) =>
                  <div
                    key={registration.id}
                    draggable
                    onDragStart={(event) => handleDragStart(event, registration)}
                  >
                    <RegistrationCard registration={registration} />
                  </div>
                )}
              </S.ColumnContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};

export default Columns;
