import { BoardStatus } from "./BoardSettings";
import { Client } from "./Client";
import { User } from "./User";

export type CreateProjectRequest = {
  Name: string;
  Description?: string;
  CategoryId: number;
  Tag?: string;
  StartAt: string;
  EndAt?: string;
  LeaderId?: number;
  ClientId: number;
};

export type UpdateProjectRequest = Partial<CreateProjectRequest>;

export type Project = {
  Id: number;
  Name: string;
  Description: string;
  CategoryId: number;
  Tag: string;
  StartAt: string;
  EndAt?: string;
  LeaderId?: number;
  ClientId: number;
  StatusId: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
  CreatedBy: User;
  UpdatedBy?: User;
  DeletedBy?: User;
  ProjectLeader: User;
  Members: User[];
  UserProject: UserProject[];
  ProjectCategory: ProjectCategory;
  Client: Client;
  Phase: Phase[];
};

export type UserProject = {
  Id: number;
  UserId: number;
  IsFavorite: boolean;
  ProjectId: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
  User?: User;
};

export type ProjectCategory = {
  Id: number;
  Description: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
};

/**
 * Kanban
 */
export type CreatePhaseRequest = Omit<
  Phase,
  "Id" | "Color" | "CreatedAt" | "UpdatedAt"
>;
export type Phase = {
  Id: number;
  Title: string;
  Description?: string;
  DescriptionHtml?: string;
  IsActive: boolean;
  ColorId: number;
  ProjectId: number;
  StartAt?: string | null;
  EndAt?: string | null;
  ConcludedAt?: string;
  Color: PhaseColor;
  Task?: Task[];
  User?: { Id: number; Name: string };
  CreatedAt: string;
  UpdatedAt: string;
};

export type PhaseColor = {
  Id: number;
  Description: string;
  Color: string;
  BackgroundColor: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
};

export type CreateTaskRequest = {
  Name: string;
  Description?: string;
  DescriptionHtml?: string;
  EstimatedTime?: number;
  PhaseId?: number | null;
  ProjectId: number;
  StatusId?: number;
  AssignTo?: number;
  StartAt?: string;
  EndAt?: string;
};

export type Task = {
  Id: number;
  Name: string;
  Description?: string;
  DescriptionHtml?: string;
  EstimatedTime?: number;
  PhaseId?: number | null;
  ProjectId: number;
  StatusId: number;
  AssignTo?: number;
  CreatedBy: number;
  StartAt?: string;
  EndAt?: string;
  IsOnBoard?: boolean;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
  TaskAssignee?: User;
  TaskCreator?: User;
  BoardStatus: BoardStatus;
  Phase?: Phase;
};
