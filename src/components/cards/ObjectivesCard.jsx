const ObjectivesCard = ({img, title, description}) => {
    return (
        <>
            <div className="flex flex-col gap-5 text-center w-[30%] bg-white p-[1.5rem]">
                <img className="mx-auto" src={img} alt={img} />
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </>
    );
}

export default ObjectivesCard;