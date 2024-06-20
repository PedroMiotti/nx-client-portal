import { Client } from "./Client";

export type Project = {
  Id: number;
  Name: string;
  Description: string;
  CategoryId: number;
  Tag: string;
  StartAt: string;
  EndAt?: string;
  LeaderId: number;
  ClientId: number;
  StatusId: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
  Status: Status;
  Client: Client;
  Phase: Phase[];
};

export type Status = {
  Id: number;
  Description: string;
};

export type Phase = {
  Id: number;
  IsActive: boolean;
  Description: string;
  ColorId?: number;
  ProjectId: number;
  StartDate: string;
  EndDate?: string;
  Color: PhaseColor;
};

export type PhaseColor = {
  Id: number;
  Description: string;
  Color: string;
};
