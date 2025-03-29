import Book from "@mui/icons-material/Book";
import BugReport from "@mui/icons-material/BugReport";
import EmojiEvents from "@mui/icons-material/EmojiEvents";
import FlashOn from "@mui/icons-material/FlashOn";
import Person from "@mui/icons-material/Person";
import { Card, CardContent, Stack } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import type { RefObject } from "react";
import { useRef } from "react";
import Draggable from "react-draggable";

import { shiftTicketDown, shiftTicketUp } from "../../state";
import { useAppDispatch } from "../../store";
import type { FlavorEnum, TicketData } from "./index";

type TicketProps = TicketData & {
  couldSwap: boolean;
  onCouldSwap: (offset: number) => void;
};

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

export const Ticket = ({
  id,
  title,
  type,
  assignee,
  points,
  couldSwap,
  onCouldSwap,
}: TicketProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const cardHeight = 130;

  return (
    <>
      <Draggable
        defaultPosition={{ x: 0, y: 0 }}
        position={{ x: 0, y: 0 }}
        axis="y"
        bounds="parent"
        onDrag={(e, { y }) => {
          if (ref && ref.current) {
            ref.current.style.zIndex = "99";
            const offset = Math.round(Math.abs(y) / cardHeight);
            if (offset > 0) {
              if (y > 0) {
                onCouldSwap(offset);
              } else {
                onCouldSwap(-offset);
              }
            } else {
              onCouldSwap(0);
            }
          }
        }}
        onStop={(e, { y }) => {
          if (ref && ref.current) {
            ref.current.style.zIndex = "0";
            const offset = Math.round(Math.abs(y) / cardHeight);
            if (offset > 0) {
              if (y > 0) {
                dispatch(shiftTicketDown({ id, offset }));
                onCouldSwap(0);
              } else {
                dispatch(shiftTicketUp({ id, offset }));
                onCouldSwap(0);
              }
            }
          }
        }}
        //typescript, tis a silly place
        nodeRef={ref as RefObject<HTMLDivElement>}
      >
        <div ref={ref}>
          <Card
            variant="solid"
            sx={(theme) => ({
              my: 1,
              mx: "auto",
              borderRadius: "var(--joy-radius-md)",
              width: 300,
              height: cardHeight - 52,
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
            color={couldSwap ? "neutral" : "primary"}
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
