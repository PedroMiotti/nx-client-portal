export type DriveFile = {
  Id: number;
  Name: string;
  MimeType?: string;
  Extension: string;
  Size?: number;
  Url: string;
  IsVisibleToClient: boolean;
  UploadedBy: number;
  FolderId?: number;
  ProjectId?: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
  User?: {
    Id: number;
    Name: string;
  };
};

export type DriveFolder = {
  Id: number;
  Name: string;
  ParentId?: number;
  ProjectId?: number;
  IsVisibleToClient: boolean;
  CreatedBy: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
  File?: DriveFile[];
  ParentFolder?: DriveFolder;
  ChildFolder?: DriveFolder[];
};
