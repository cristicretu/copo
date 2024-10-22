"use client";

import { Key, useEffect, useState } from "react";
import { socket } from "@/socket";
import randomName from "@scaleway/random-name";
import { MessageObject, Mode } from "@/utils/types";
import Link from "next/link";
import { getRandomLink } from "@/utils/constants";

// src/global.d.ts

declare global {
  interface Window {
    umami: {
      trackEvent: (event: string, params?: Record<string, unknown>) => void;
    };
  }
}

export {};

export default function Home() {
  return <CenterMain />;
}

function CenterMain() {
  return (
    <div className="flex justify-center items-center md:h-full py-6">
      <div className="w-4/5 md:w-3/5">
        <div className="flex flex-col mb-6">
          <span className="font-semibold text-lg">copo.</span>
          <span className="opacity-50 text-sm">Find flow</span>
        </div>
        <PomodoroMain />
        <div className="md:w-3/5 text-sm my-4">
          <span className="opacity-50">About</span>
          <p className="mb-4 mt-2 opacity-50">
            copo is a simple, yet unique pomodoro timer: everyone using this
            pomodoro site/app is on the same 25/5 minute intervals. During the
            5-minute breaks, a global chat lets everyone interact with each
            other.
          </p>
          <span className="flex">
            <p className="opacity-50">Designed with care by</p>
            <Link
              href={`https://x.com/@cristicrtu`}
              className="opacity-50 hover:opacity-100 px-1"
              target="_blank"
              onClick={() => {
                window.umami.trackEvent("clicked designer");
              }}
            >
              @cristicrtu
            </Link>
          </span>
          <span className="flex">
            <p className="opacity-50">Built by</p>
            <Link
              href={`https://x.com/_skyash`}
              target="_blank"
              className="opacity-50 hover:opacity-100 px-1"
              onClick={() => {
                window.umami.trackEvent("clicked deveoper");
              }}
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
  const [minutes, setMinutes] = useState<number | undefined>();
  const [seconds, setSeconds] = useState<number | undefined>();
  const [mode, setMode] = useState<Mode | undefined>(); // 'work' or 'break'

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    interval = setInterval(() => {
      if (minutes !== undefined && seconds !== undefined) {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(interval);
          if (mode === "work") {
            setMode(Mode.break);
            setMinutes(5);
          } else {
            setMode(Mode.work);
            setMinutes(25);
          }
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [minutes, seconds, mode]);

  useEffect(() => {
    // Listen for timer updates from the server
    socket.on("timer-update", (timer) => {
      setMinutes(timer.minutes);

      setSeconds(timer.seconds);
      setMode(timer.isBreak ? Mode.break : Mode.work);
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
        <b className="opacity-100 mx-2">
          {minutes !== undefined && seconds !== undefined
            ? `${formattedMinutes}:${formattedSeconds}`
            : null}
        </b>
        <span className="opacity-50">{`until another ${
          mode == Mode.work ? "break" : "pomodoro"
        }...`}</span>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-between my-2 h-auto">
        <div className="w-[100%] md:w-[63%] p-3 glass flex-shrink-0">
          <iframe
            className="w-full h-full aspect-video self-stretch"
            src={`https://www.youtube.com/embed/${randomLink}?autoplay=1&controls=0&showinfo=0&modestbranding=1&rel=0&autohide=1`}
            allow="autoplay; encrypted-media"
            onClick={() => {
              if (window.umami) {
                window.umami.trackEvent("clicked video");
              }
            }}
          />
        </div>
        <MessageCard mode={mode} />
      </div>
    </>
  );
}

const clientName = randomName("", "-");
function MessageCard({ mode }: { mode: Mode | undefined }) {
  const [message, setMessage] = useState<string>("");
  const [messageStream, setMessageStream] = useState<Array<MessageObject>>([
    {
      id: "0",
      message: "let's co-work together!",
      clientName: "skyash",
    },
  ]);

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

  const sendMessage = () => {
    if (message.length > 0) {
      socket.emit("chat-message", {
        id: socket.id,
        message,
        clientName,
      });
    }
    setMessage("");
    if (window.umami) {
      window.umami.trackEvent("sent message");
    }
  };

  return (
    <div className="w-[100%] md:w-[36%] px-4 py-3 glass text-sm flex flex-col justify-between my-2 md:my-0 flex-shrink-0 h-[35vh] md:h-auto">
      <div className="overflow-y-scroll flex flex-col justify-end no-scrollbar">
        {messageStream.map((object: MessageObject, key: Key) => {
          return (
            <div className="opacity-80 my-2 text-sm" key={key}>
              <span className="font-semibold opacity-50">
                {object.clientName}
              </span>{" "}
              <span>{object.message}</span>
            </div>
          );
        })}
      </div>
      {mode === "break" ? (
        <div className="opacity-80 my-2 flex justify-center items-center">
          <input
            type="text"
            placeholder="chat!"
            className="bg-[#161616] border-none outline-none px-4 py-3 w-full rounded-md rounded-r-none"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key.toLowerCase() == "enter") {
                sendMessage();
              }
            }}
          />
          <button
            className="bg-[#161616] py-3 px-2 rounded-r-md"
            onClick={sendMessage}
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
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
                {" "}
                <path
                  d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                  stroke="#ffffff"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
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
