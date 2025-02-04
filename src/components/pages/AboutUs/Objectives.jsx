import ObjectivesCard from "@/components/cards/ObjectivesCard.jsx";
import SectionHeadingTile from "@/components/tiles/SectionHeadingTile.jsx";

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
      <ObjectivesCard
        img={obj?.img}
        title={obj.title}
        description={obj.description}
      />
    </>
  ));
  return (
    <>
      <div className="text-center p-[1rem]">
        <div className="flex sm:w-[90vw]  m-auto flex-col justify-center items-center gap-10">
          <SectionHeadingTile heading="Objectives of NepalWill" />
          <div className="flex flex-col md:flex-row gap-10 justify-center flex-wrap">
            {objectivesUI}
          </div>
        </div>
      </div>
    </>
  );
};

export default Objectives;
