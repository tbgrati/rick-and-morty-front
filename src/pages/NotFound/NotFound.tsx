import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col -translate-y-10">
      <span className="relative text-white font-black block overflow-hidden text-[20.4em] w-fit h-max first-letter:tracking-[12vmax] before:content-[''] before:absolute before:h-full before:w-full before:bg-no-repeat before:bg-contain before:bg-center before:bg-[url('https://staticdelivery.nexusmods.com/mods/1151/images/528-0-1447526230.png')] animate-rotateIn">
        44
      </span>
      <div className={"flex items-center flex-col gap-y-6"}>
        <h2 className="text-gray-400 text-2xl">
          We couldn't find the page you were looking for
        </h2>
        <Link to={`/`}>
          <h1 className="hover:text-orange-500 font-semibold text-lg border-2 rounded-full px-4 py-2">
            Take me home
          </h1>
        </Link>
      </div>
    </div>
  );
};
