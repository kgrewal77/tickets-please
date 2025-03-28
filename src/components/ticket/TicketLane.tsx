import Sheet from "@mui/joy/Sheet";
import { Ticket } from "./index";
import React from "react";
import { selectTickets } from "../../state";
import { useSelector } from "react-redux";

export const TicketLane = () => {
  const tickets = useSelector(selectTickets);
  return (
    <Sheet
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        alignContent: "flex-start",
        justifyContent: "space-evenly",
        mx: "auto",
        my: "auto",
        borderRadius: "var(--joy-radius-md)",
        width: 350,
      })}
    >
      {tickets.length > 0 && tickets.map((item: any) => <Ticket {...item} />)}
    </Sheet>
  );
};
