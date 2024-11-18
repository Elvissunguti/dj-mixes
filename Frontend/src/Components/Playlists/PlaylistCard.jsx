import React from "react";
import mixImage from "../Assets/mix image.png";

const PlaylistCard = ({ name, mixCount, playlistId, userName, onClick }) => {
  return (
    <section
      className="relative w-64 h-48 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => onClick()}
      style={{ backgroundImage: `url(${mixImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-4 text-white">
        <div>
          <h2 className="text-lg font-semibold truncate">{name}</h2>
          <p className="text-sm opacity-80">By {userName}</p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm opacity-90">{mixCount} {mixCount > 1 ? "mixes" : "mix"}</span>
        </div>
      </div>
    </section>
  );
};

export default PlaylistCard;
