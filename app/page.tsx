export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#161616] text-white">
      <div className="w-3/5">
        <div className="flex flex-col mb-6">
          <span className="font-semibold text-lg">copo.</span>
          <span className="opacity-50 text-sm">Find flow</span>
        </div>
        <div className="text-sm">
          <b className="opacity-100">17:23</b>
          &nbsp;
          <span className="opacity-50">until another break...</span>
        </div>
        <div className="w-full flex justify-between my-2">
          <div className="w-[63%] p-3 glass">
            <iframe
              className="w-full aspect-video self-stretch"
              src="https://www.youtube.com/embed/jfKfPfyJRdk?controls=0&showinfo=0&modestbranding=1&rel=0&autohide=1"
              allow="autoplay; encrypted-media"
            />
          </div>
          <div className="w-[36%] px-5 py-3 glass text-sm">
            <div className="opacity-80 my-2">
              <span className="font-semibold opacity-50">rockfellar</span>{" "}
              <span>you should study 1st law of thermodynamics</span>
            </div>
            <div className="opacity-80 my-2">
              <span className="font-semibold opacity-50">rockfellar</span>{" "}
              <span>you should study 1st law of thermodynamics</span>
            </div>
            <div className="opacity-80 my-2">
              <span className="font-semibold opacity-50">rockfellar</span>{" "}
              <span>you should study 1st law of thermodynamics</span>
            </div>
            <div className="opacity-80 my-2">
              <span className="font-semibold opacity-50">rockfellar</span>{" "}
              <span>you should study 1st law of thermodynamics</span>
            </div>
          </div>
        </div>
        <div className="opacity-50 w-2/4 text-sm my-4">
          <span>About</span>
          <p className="mb-6 mt-4">
            copo is a simple, yet unique pomodoro timer: it's shared across the
            world. this means that everyone will have breaks at the same time
            and will follow a set (25 + 5) schedule.
          </p>
          <span>Built with care by @skyash</span>
        </div>
      </div>
    </div>
  );
}
