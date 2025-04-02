import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { TicketData } from "../components/ticket";

interface BoardState {
  tickets: TicketData[];
  couldSwap: {
    from: number;
    to: number;
  };
}

type MoveAction = {
  id: number;
  offset: number;
};

type SwapAction = {
  from: number;
  to: number;
};

const initialItems: TicketData[] = [
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
  { title: "Fix Styling", id: 4, type: "defect", assignee: "Sarah", points: 2 },
  { title: "Fix Styling", id: 5, type: "defect", assignee: "Sarah", points: 2 },
  { title: "Fix Styling", id: 6, type: "defect", assignee: "Sarah", points: 2 },
];

const initialSwap = {
  from: -1,
  to: -1,
};

const initialState: BoardState = {
  tickets: initialItems,
  couldSwap: initialSwap,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    shiftTicketUp(state, action: PayloadAction<MoveAction>) {
      const id = action.payload.id;
      const offset = action.payload.offset;
      const ticketIndex = state.tickets.findIndex((ticket) => ticket.id === id);
      if (ticketIndex > 0) {
        const ticket = state.tickets[ticketIndex];
        state.tickets.splice(ticketIndex, 1);
        const start = Math.max(ticketIndex - offset, 0);
        state.tickets.splice(start, 0, ticket);
      }
    },
    shiftTicketDown(state, action: PayloadAction<MoveAction>) {
      const id = action.payload.id;
      const offset = action.payload.offset;
      const ticketIndex = state.tickets.findIndex((ticket) => ticket.id === id);
      if (ticketIndex < state.tickets.length - 1) {
        const ticket = state.tickets[ticketIndex];
        const start = Math.min(ticketIndex + offset, state.tickets.length - 1);
        state.tickets.splice(ticketIndex, 1);
        state.tickets.splice(start, 0, ticket);
      }
    },
    updateSwap(state, action: PayloadAction<SwapAction>) {
      state.couldSwap = action.payload;
    },
    didSwap(state) {
      state.couldSwap = initialSwap;
    },
  },
  selectors: {
    selectTickets: (state) => state.tickets,
    selectCouldSwap: (state) => state.couldSwap,
  },
});
export const boardReducer = boardSlice.reducer;
export const { shiftTicketUp, shiftTicketDown, updateSwap, didSwap } =
  boardSlice.actions;
export const { selectTickets, selectCouldSwap } = boardSlice.selectors;
