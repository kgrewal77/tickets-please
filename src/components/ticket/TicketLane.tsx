import Sheet from "@mui/joy/Sheet";
import { useSelector } from "react-redux";

import { selectTickets } from "../../state";
import { Ticket, TicketData } from "./index";

export const TicketLane = () => {
  const tickets = useSelector(selectTickets);
  const len = tickets.length;

  return (
    <Sheet
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "flex-start",
        justifyContent: "space-evenly",
        mx: "auto",
        my: "auto",
        borderRadius: "var(--joy-radius-md)",
        width: 350,
      }}
    >
      {len > 0 &&
        tickets.map((item: TicketData, index: number) => (
          <Ticket {...item} key={index} position={index} length={len} />
        ))}
    </Sheet>
  );
};
