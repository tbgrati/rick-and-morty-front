type Props = {
    imageUrl: string;
    onClick: () => void;
}

export const ImageButton = ({ imageUrl, onClick }: Props) => {

    return (
        <div className="flex items-center justify-center">
            <img
                src={imageUrl}
                alt="GIF"
                className="absolute w-12 h-12 object-cover object-center cursor-pointer"
                onClick={onClick}
            />
        </div>
    );
}
