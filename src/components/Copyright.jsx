import logo from "@assets/merkulove.png";

const Copyright = () => {
  return (
    <div className="flex flex-col items-center text-[10px] tracking-[0.7px] gap-2.5 sm:flex-row sm:justify-between">
      <p>
        Copyright © {new Date().getFullYear()} By Merkulove. All Rights Reserved
      </p>
      <div className="flex items-center gap-2.5">
        Powered by
        <img
          className="w-9 will-change-transform transition-transform hover:scale-90"
          src={logo}
          alt="Merkulove"
        />
      </div>
    </div>
  );
};

export default Copyright;
