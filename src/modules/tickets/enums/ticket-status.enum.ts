export const TicketStatus = {
  NEW: 'new',
  IN_PROGRESS: 'in_progress',
  CLOSED: 'closed',
} as const;

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];
