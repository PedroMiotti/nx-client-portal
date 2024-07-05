export type BoardStatus = {
  Id: number;
  Description: string;
  ProjectId: number;
  BoardColumnId: number;
  BoardStatusTypeId: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
  BoardColumn?: BoardColumn;
};

export type CreateBoardStatusRequest = {
  Description: string;
  ProjectId: number;
  BoardStatusTypeId: number;
};

export type UpdateBoardStatusRequest = Omit<
  Partial<CreateBoardStatusRequest>,
  "ProjectId"
>;

export type BoardColumn = {
  Id: number;
  Description: string;
  ProjectId: number;
  Position: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
  BoardStatus: BoardStatus[];
};

export type CreateBoardColumnRequest = {
  Description: string;
  ProjectId: number;
  Position: number;
};

export type UpdateBoardColumnRequest = Omit<
  Partial<CreateBoardColumnRequest>,
  "ProjectId"
>;

export type BoardStatusType = {
  Id: number;
  Description: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
};
