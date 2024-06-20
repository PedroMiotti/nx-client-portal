export type User = {
  Id: number;
  Name: string;
  Document: number;
  DocumentType: string;
  Email: string;
  IsActive?: boolean;
  ParentUserId?: number;
  Password: string;
  Phone?: number;
  UserTypeId: number;
  InvitationStatusId: number;
};
