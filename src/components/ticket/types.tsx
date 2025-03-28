export type FlavorEnum = "defect" | "story" | "spike";

export type TicketData = {
  title: string;
  id: number;
  type: FlavorEnum;
  assignee: string | null;
  points: number;
};
