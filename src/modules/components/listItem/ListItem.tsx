
type Props = {
    image: string;
    name: string;
    status: string;
    type: string;
    origin: string;
    episodes: string[];
}

export const ListItem = ({ image, name, status, type, origin, episodes }: Props) => {
    return (
        <div className="w-full rounded-lg flex flex-row gap-4 bg-primary-400 overflow-hidden p-4">
            <img
                src={image}
                alt="Character"
                className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex flex-row gap-4">
                <div>
                    <h1 className="font-bold">{name}</h1>
                    <h2>{status}</h2>
                    <h2>Type: {type}</h2>
                    <h2>Origin: {origin}</h2>
                </div>
                <div className="flex flex-col">
                    <h2>Appeared in:</h2>
                    <div className="max-h-20 overflow-y-auto pr-2 scrollbar">
                        {episodes.map((episode, index) => (
                            <p key={index} className="text-sm">{episode}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
