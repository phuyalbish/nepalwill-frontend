import ObjectivesCard from "@/components/cards/ObjectivesCard.jsx";

const Objectives = () => {
    let objectives = [
        {
            img: "/objectives/real_estate_agent.svg",
            title: "Resource Accessibility",
            description:
                "Provide essential educational supplies, such as books, uniforms, stationery, and digital tools, to primary schools in need.",
        },
        {
            img: "/objectives/call_made.svg",
            title: "Resource Accessibility",
            description:
                "Provide essential educational supplies, such as books, uniforms, stationery, and digital tools, to primary schools in need.",
        },
        {
            img: "/objectives/emoji_people.svg",
            title: "Resource Accessibility",
            description:
                "Provide essential educational supplies, such as books, uniforms, stationery, and digital tools, to primary schools in need.",
        },
        {
            img: "/objectives/groups.svg",
            title: "Resource Accessibility",
            description:
                "Provide essential educational supplies, such as books, uniforms, stationery, and digital tools, to primary schools in need.",
        },
        {
            img: "/objectives/shield.svg",
            title: "Resource Accessibility",
            description:
                "Provide essential educational supplies, such as books, uniforms, stationery, and digital tools, to primary schools in need.",
        },
    ];

    const objectivesUI = objectives.map((obj) => (
        <>
           <ObjectivesCard img={obj?.img} title={obj.title} description={obj.description} />
        </>
    ));
    return (
        <>
            <div className="text-center p-[1rem]">
                <div className="flex flex-col gap mx-auto relative w-full">
                    <h1 className="text-5xl mb-16">Objectives of NepalCan</h1>
                    <div className="flex gap-10 justify-center flex-wrap">
                        { objectivesUI }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Objectives;
