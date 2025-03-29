import Sheet from "@mui/joy/Sheet";
import { useState } from "react";
import { useSelector } from "react-redux";

import { selectTickets } from "../../state";
import { Ticket, TicketData } from "./index";

export const TicketLane = () => {
  const tickets = useSelector(selectTickets);
  const [couldSwapAt, setCouldSwapAt] = useState(-1);

  const generateOnCouldSwap = (index: number) => (offset: number) => {
    // did swap
    let position = -1;
    if (offset === 0) {
      position = -1;
    }
    // moving down
    else if (offset > 0) {
      position = Math.min(tickets.length, index + offset);
      // moving up
    } else {
      position = Math.max(0, index + offset);
    }

    if (couldSwapAt !== position) {
      setCouldSwapAt(position);
    }
  };
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
      {tickets.length > 0 &&
        tickets.map((item: TicketData, index: number) => (
          <Ticket
            {...item}
            key={index}
            couldSwap={index === couldSwapAt}
            onCouldSwap={generateOnCouldSwap(index)}
          />
        ))}
    </Sheet>
  );
};
