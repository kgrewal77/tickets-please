import * as React from "react";
import Typography from "@mui/joy/Typography";
import { Card, CardContent, Stack } from "@mui/joy";
import Person from "@mui/icons-material/Person";
import BugReport from "@mui/icons-material/BugReport";
import FlashOn from "@mui/icons-material/FlashOn";
import Book from "@mui/icons-material/Book";
import EmojiEvents from "@mui/icons-material/EmojiEvents";
import Draggable from "react-draggable";
import type { FlavorEnum, TicketData } from "./index";
import { useAppDispatch } from "../../store";
import { shiftTicketUp } from "../../state";

const TicketIcon = ({ type }: { type: FlavorEnum }) => {
  switch (type) {
    case "defect":
      return <BugReport />;
    case "spike":
      return <FlashOn />;
    default:
      return <Book />;
  }
};

const displayId = (id: number, type: FlavorEnum) => {
  let prefix = "F";
  if (type === "defect") {
    prefix = "D";
  } else if (type === "spike") {
    prefix = "S";
  }
  return `${prefix}-${id.toString().padStart(3, "0")}`;
};

const cardMoveY = (movedDown: boolean) => {
  if (movedDown) {
  } else {
    useAppDispatch(shiftTicketUp);
  }
};

// rough estimate
const cardHeight = 100;

export const Ticket = ({ id, title, type, assignee, points }: TicketData) => {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <>
      <Draggable
        defaultPosition={{ x: 0, y: 0 }}
        position={{ x: 0, y: 0 }}
        onDrag={(e, { y }) => {
          if (ref && ref.current) {
            ref.current.style.zIndex = "99";
            const isCardMoved = cardHeight / 2 < Math.abs(y);
            if (isCardMoved) {
              console.log(
                "hello it moved ",
                y > 0 ? "down" : "up",
                "based on ",
                y
              );
              cardMoveY(y > 0);
            }
          }
        }}
        onStop={() => {
          if (ref && ref.current) {
            ref.current.style.zIndex = "0";
          }
        }}
        //typescript, tis a silly place
        nodeRef={ref as React.RefObject<HTMLDivElement>}
      >
        <div ref={ref}>
          <Card
            variant="solid"
            sx={(theme) => ({
              my: "1vh",
              mx: "auto",
              opacity: 1,
              borderRadius: "var(--joy-radius-md)",
              width: 300,
              boxShadow: theme.shadow.md,
              transition: "0.2s",
              "--joy-shadowRing": "inset 0 -5px 0 rgba(0 0 0 / 0.24)",
              "&:hover": {
                cursor: "grab",
                boxShadow: theme.shadow.lg,
                transform: "translateY(-3px)",
              },
              "&:active": {
                cursor: "grabbing",
                boxShadow: theme.shadow.md,
                transform: "translateY(0px)",
                "--joy-shadowRing": "0 0 #000",
              },
            })}
            color={"primary"}
          >
            <CardContent>
              <Typography component={"h3"} level={"title-lg"}>
                {title}
              </Typography>
              <Typography startDecorator={<Person />}>
                {assignee || "None"}
              </Typography>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography startDecorator={<TicketIcon type={type} />}>
                  {displayId(id, type)}
                </Typography>
                <Typography endDecorator={<EmojiEvents />}>{points}</Typography>
              </Stack>
            </CardContent>
          </Card>
        </div>
      </Draggable>
    </>
  );
};
