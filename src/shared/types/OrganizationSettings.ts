export type OrganizationSettings = {
  Id: number;
  Name: string;
  LogoUrl: string;
  OwnerId: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
};

export type CreateOrganizationSettingsRequest = {
  Name: string;
  LogoImage: File;
  OwnerId: number;
};

export type UpdateOrganizationSettingsRequest = {
  Name: string;
  LogoImage: File;
};
