import TeamCard from "@/components/cards/TeamCard.jsx";
import SectionHeadingTile from "@/components/tiles/SectionHeadingTile.jsx";

const Team = () => {
  const teams = [
    {
      img: "/team/team1.png",
      name: "Sneha Adhikari",
      contribution: "Person who took the initiative",
    },
    {
      img: "/team/team2.png",
      name: "Hem Ratna",
      contribution: "Person who took the initiative",
    },
    {
      img: "/team/team3.png",
      name: "Julia Chi",
      contribution: "Person who took the initiative",
    },
    {
      img: "/team/team4.png",
      name: "Gyanu",
      contribution: "Person who took the initiative",
    },
  ];

  const teamsUI = teams.map((team) => (
    <>
      <TeamCard
        img={team?.img}
        name={team?.name}
        contribution={team?.contribution}
      />
    </>
  ));

  return (
    <>
      <div className="text-center p-[1rem]">
        <div className="flex sm:w-[90vw]  m-auto flex-col justify-center items-center gap-10">
          <SectionHeadingTile heading="Team" />
          <div className="flex gap-10 justify-center flex-wrap">{teamsUI}</div>
        </div>
      </div>
    </>
  );
};

export default Team;
