"use client";

import { Key, useEffect, useState } from "react";
import { socket } from "@/socket";
import randomName from "@scaleway/random-name";
import { messageObject } from "@/utils/interfaces";

const clientName = randomName("", "-");
export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [messageStream, setMessageStream] = useState<Array<messageObject>>([]);

  useEffect(() => {
    // Define the listener function outside of the event handler
    const handleChatMessage = (object: messageObject) => {
      setMessageStream((prev: Array<messageObject>) => [...prev, object]);
    };

    // Attach the listener to the "chat-message" event
    socket.on("chat-message", handleChatMessage);
    // Cleanup: remove the listener when the component unmounts
    return () => {
      socket.off("chat-message", handleChatMessage);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-[#161616] text-white">
      <div className="w-3/5">
        <div className="flex flex-col mb-6">
          <span className="font-semibold text-lg">copo.</span>
          <span className="opacity-50 text-sm">Find flow</span>
        </div>
        <div className="text-sm">
          <b className="opacity-100 mx-2">17:23</b>
          <span className="opacity-50">until another break...</span>
        </div>
        <div className="w-full h-[45vh] flex justify-between my-2">
          <div className="w-[63%] p-3 glass">
            <iframe
              className="w-full aspect-video self-stretch"
              src="https://www.youtube.com/embed/jfKfPfyJRdk?controls=0&showinfo=0&modestbranding=1&rel=0&autohide=1"
              allow="autoplay; encrypted-media"
            />
          </div>
          <div className="w-[36%] px-5 py-3 glass text-sm flex flex-col justify-between">
            <div className="overflow-y-scroll flex flex-col justify-end no-scrollbar">
              {messageStream.map((object: messageObject, key: Key) => {
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
          </div>
        </div>
        <div className="opacity-50 w-2/4 text-sm my-4">
          <span>About</span>
          <p className="mb-6 mt-4">
            copo is a simple, yet unique pomodoro timer: it's shared across the
            world. this means that everyone will have breaks at the same time
            and will follow a set 25 + 5 schedule.
          </p>
          <span>Built with care by @skyash</span>
        </div>
      </div>
    </div>
  );
}
