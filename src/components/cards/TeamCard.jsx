const TeamCard = ({img, name, contribution}) => {
    return (
        <>
            <div className="flex flex-col gap-2">
                <img className="w-full" src={img} alt="" />
                <h3 className="font-bold text-xl">{ name }</h3>
                <p>{ contribution }</p>
            </div>
        </>
    );
};

export default TeamCard;
