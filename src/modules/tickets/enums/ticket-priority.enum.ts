export const TicketPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export type TicketPriority =
  (typeof TicketPriority)[keyof typeof TicketPriority];
