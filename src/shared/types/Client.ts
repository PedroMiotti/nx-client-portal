export type Client = {
  Id: number;
  Name: string;
  Email: string;
  Phone: string;
  UserId: number;
  OwnerId: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
  LastSession: string | null;
  Project?: { id: number; name: string }[];
};
