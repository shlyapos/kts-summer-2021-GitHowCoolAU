import './Loader.css';

type LoaderProps = {
    children: React.ReactNode
};

const Loader: React.FC<LoaderProps> = ({children}) => {
    return (
        <div className='loader'>
            <div className='loader-wrapper'>
                {children}
            </div>
        </div>
    );
};

export default Loader;