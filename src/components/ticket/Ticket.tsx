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
import { useSelector } from "react-redux";

import {
  didSwap,
  selectCouldSwap,
  shiftTicketDown,
  shiftTicketUp,
  updateSwap,
} from "../../state";
import { useAppDispatch } from "../../store";
import type { FlavorEnum, TicketData } from "./index";

type TicketProps = TicketData & {
  position: number;
  length: number;
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
  position,
  length,
}: TicketProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { from, to } = useSelector(selectCouldSwap);
  const couldSwap = from >= 0 && to >= 0;
  const isSwappingDown = from < to;
  const isSwapping =
    couldSwap && isSwappingDown
      ? position > from && position <= to
      : position >= to && position < from;
  const cardHeight = 130;

  return (
    <>
      <Draggable
        position={{ x: 0, y: 0 }}
        axis="y"
        bounds="parent"
        onDrag={(e, { y }) => {
          if (ref && ref.current) {
            ref.current.style.zIndex = "99";
            const offset = Math.round(Math.abs(y) / cardHeight);
            if (offset > 0) {
              let toIndex = -1;
              if (y > 0) {
                toIndex = Math.min(length, position + offset);
              } else {
                toIndex = Math.max(0, position - offset);
              }
              if (to !== toIndex) {
                dispatch(updateSwap({ from: position, to: toIndex }));
              }
            } else {
              if (from !== -1 && to !== -1) {
                dispatch(didSwap());
              }
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
                if (from !== -1 && to !== -1) {
                  dispatch(didSwap());
                }
              } else {
                dispatch(shiftTicketUp({ id, offset }));
                if (from !== -1 && to !== -1) {
                  dispatch(didSwap());
                }
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
              transition: couldSwap ? "300ms" : "0",
              ...(isSwapping
                ? {
                    transform: `translateY(${
                      isSwappingDown ? "-" : ""
                    }${cardHeight}px)`,
                  }
                : { transform: `translateY(0px)` }),
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
