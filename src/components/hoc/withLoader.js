import Loader from "../Loader";

const WithLoader = (WrappedComponent, isLoading) => {
    return (props) => {
        return (
            <>
                {isLoading ? <Loader/> : <WrappedComponent {...props}/>}
            </>
        )
    }
};

export default WithLoader;
