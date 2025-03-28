import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TicketData } from "../components/ticket";

interface BoardState {
  tickets: TicketData[];
}

const sampleItems: TicketData[] = [
  {
    title: "Research Dependencies",
    id: 1,
    type: "spike",
    assignee: "Myron",
    points: 2,
  },
  {
    title: "Implement Functionality",
    id: 2,
    type: "story",
    assignee: null,
    points: 3,
  },
  { title: "Fix Styling", id: 3, type: "defect", assignee: "Sarah", points: 2 },
];

const initialState = {
  tickets: sampleItems,
} satisfies BoardState;

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    shiftTicketUp(state, action: PayloadAction<number>) {
      const id = action.payload;
      const ticketIndex = state.tickets.findIndex((ticket) => ticket.id === id);
      if (ticketIndex > 0) {
        const ticket = state.tickets[ticketIndex];
        state.tickets.splice(ticketIndex, 1);
        state.tickets.splice(ticketIndex - 1, 0, ticket);
      }
    },
    shiftTicketDown(state, action: PayloadAction<number>) {
      const id = action.payload;
      const ticketIndex = state.tickets.findIndex((ticket) => ticket.id === id);
      if (ticketIndex < state.tickets.length - 1) {
        const ticket = state.tickets[ticketIndex];
        state.tickets.splice(ticketIndex, 1);
        state.tickets.splice(ticketIndex + 1, 0, ticket);
      }
    },
  },
  selectors: {
    selectTickets: (state) => state.tickets,
  },
});
export const boardReducer = boardSlice.reducer;
export const { shiftTicketUp, shiftTicketDown } = boardSlice.actions;
export const { selectTickets } = boardSlice.selectors;
