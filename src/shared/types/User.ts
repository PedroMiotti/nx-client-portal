export type User = {
  Id: number;
  Name: string;
  Document: number;
  DocumentType: string;
  Email: string;
  IsActive?: boolean;
  ParentId?: number;
  Password: string;
  Phone?: number;
  UserTypeId: number;
  InvitationStatusId: number;
};
