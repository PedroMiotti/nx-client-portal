import { UserType } from "../enum/User";

export const mapUserType = (type: UserType) => {
  const map: { [key: number]: string } = {
    1: "Administrador",
    2: "Administrador",
    3: "Membro",
    4: "Cliente",
  };

  return map[type] || " ";
};

export const mapInvitationStatus = (id: number) => {
  const map: { [key: number]: string } = {
    1: "Pendente convite",
    2: "Convite enviado",
    3: "Convite aceito",
    4: "Convite revogado",
  };

  return map[id] || " ";
};
