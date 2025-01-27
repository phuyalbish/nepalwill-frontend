import TeamCard from "@/components/cards/TeamCard.jsx";

const Team = () => {
    const teams = [
        {
            img: "/team/team1.png",
            name: "Sneha Adhikari",
            contribution: "Person who took the initiative"
        },
        {
            img: "/team/team2.png",
            name: "Hem Ratna",
            contribution: "Person who took the initiative"
        },
        {
            img: "/team/team3.png",
            name: "Julia Chi",
            contribution: "Person who took the initiative"
        },
        {
            img: "/team/team4.png",
            name: "Gyanu",
            contribution: "Person who took the initiative"
        },
    ];

    const teamsUI = teams.map(team => (
        <>
            <TeamCard img={team?.img} name={team?.name} contribution={team?.contribution} />
        </>
    ))

    return (
        <>
            <div className="text-center p-[1rem]">
                <div className="flex flex-col gap mx-auto relative w-full">
                    <h1 className="text-5xl mb-16">Team</h1>
                    <div className="flex gap-10 justify-center flex-wrap">
                        { teamsUI }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Team;