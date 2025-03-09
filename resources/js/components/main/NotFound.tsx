import EmptyImage from '@/assets/empty.svg';

const NotFound = (props: { title: string; description?: string }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 py-32 lg:border-2 border-muted-foreground/50 rounded-xl border-dashed">
            <img src={EmptyImage} alt="Empty" className="max-h-52" />
            <h2>{props.title}</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id, temporibus?</p>
        </div>
    );
};

export default NotFound;
