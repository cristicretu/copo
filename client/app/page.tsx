"use client";

import { Key, useEffect, useState } from "react";
import { socket } from "@/socket";
import randomName from "@scaleway/random-name";
import { MessageObject, Mode } from "@/utils/types";
import Link from "next/link";
import { getRandomLink } from "@/utils/constants";

export default function Home() {
  return <CenterMain />;
}

function CenterMain() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#161616] text-white">
      <div className="w-3/5">
        <div className="flex flex-col mb-6">
          <span className="font-semibold text-lg">copo.</span>
          <span className="opacity-50 text-sm">Find flow</span>
        </div>
        <PomodoroMain />
        <div className="w-2/4 text-sm my-4">
          <span className="opacity-50">About</span>
          <p className="mb-6 mt-4 opacity-50">
            copo is a simple, yet unique pomodoro timer: it&apos;s shared across
            the world. this means that everyone will have breaks at the same
            time and will follow a set (25 + 5) schedule.
          </p>
          <span className="flex">
            <p className="opacity-50">Designed with care by</p>
            <Link
              href={`https://x.com/@cristicrtu`}
              className="opacity-50 hover:opacity-100 px-1"
            >
              @cristicrtu
            </Link>
          </span>
          <span className="flex">
            <p className="opacity-50">Built by</p>
            <Link
              href={`https://x.com/_skyash`}
              className="opacity-50 hover:opacity-100 px-1"
            >
              @_skyash
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

const randomLink = getRandomLink();
function PomodoroMain() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [mode, setMode] = useState<Mode>(Mode.work); // 'work' or 'break'

  useEffect(() => {
    // Listen for timer updates from the server
    socket.on("timer-update", (timer) => {
      setMinutes(timer.minutes);
      setSeconds(timer.seconds);

      if (timer.minutes === 0 && timer.seconds === 0) {
        if (mode === Mode.work) {
          setMode(Mode.break);
        } else {
          setMode(Mode.work);
        }
      }
    });

    return () => {
      socket.off("timer-update");
    };
  }, []);

  // When displaying the time
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return (
    <>
      <div className="text-sm">
        <b className="opacity-100 mx-2">{`${formattedMinutes}:${formattedSeconds}`}</b>
        <span className="opacity-50">until another break...</span>
      </div>
      <div className="w-full h-[50vh] flex justify-between my-2">
        <div className="w-[63%] p-3 glass">
          <iframe
            className="w-full aspect-video self-stretch"
            src={`https://www.youtube.com/embed/${randomLink}?autoplay=1&controls=0&showinfo=0&modestbranding=1&rel=0&autohide=1`}
            allow="autoplay; encrypted-media"
          />
        </div>
        <MessageCard mode={mode} />
      </div>
    </>
  );
}

const clientName = randomName("", "-");
export function MessageCard({ mode }: { mode: Mode }) {
  const [message, setMessage] = useState<string>("");
  const [messageStream, setMessageStream] = useState<Array<MessageObject>>([]);

  useEffect(() => {
    // Define the listener function outside of the event handler
    const handleChatMessage = (object: MessageObject) => {
      setMessageStream((prev: Array<MessageObject>) => [...prev, object]);
    };

    // Attach the listener to the "chat-message" even
    socket.on("chat-message", handleChatMessage);
    // Cleanup: remove the listener when the component unmounts
    return () => {
      socket.off("chat-message", handleChatMessage);
    };
  }, []);

  return (
    <div className="w-[36%] px-5 py-3 glass text-sm flex flex-col justify-between">
      <div className="overflow-y-scroll flex flex-col justify-end no-scrollbar">
        {messageStream.map((object: MessageObject, key: Key) => {
          return (
            <div className="opacity-80 my-2" key={key}>
              <span className="font-semibold opacity-50">
                {object.clientName}
              </span>{" "}
              <span>{object.message}</span>
            </div>
          );
        })}
      </div>
      {mode === "break" ? (
        <div className="opacity-80 my-2 flex justify-center">
          <input
            type="text"
            placeholder="chat!"
            className="bg-[#161616] border-none outline-none px-4 py-3 w-full rounded-md"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key.toLowerCase() == "enter") {
                if (message.length > 0) {
                  socket.emit("chat-message", {
                    id: socket.id,
                    message,
                    clientName,
                  });
                }
                setMessage("");
              }
            }}
          />
        </div>
      ) : (
        <div className="my-2 flex flex-col justify-start">
          <div className="flex items-center gap-2 py-2">
            <svg
              fill="#ffffff"
              width="24px"
              height="24px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512 282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zM64 512c0-112.272 41.615-214.959 110.096-293.663l631.856 631.856C727.216 919.073 624.416 961.008 512 961.008c-247.024 0-448-201.984-448-449.009V512zm787.023 292.786L219.408 173.17C297.984 105.235 400.24 64.002 512 64.002c247.024 0 448 200.976 448 448 0 111.664-41.152 214.032-108.977 292.784z"></path>
              </g>
            </svg>
            <span className="text-base">Chat disabled</span>
          </div>
          <p className="opacity-50">
            Hold your ideas until the break starts...
          </p>
        </div>
      )}
    </div>
  );
}
