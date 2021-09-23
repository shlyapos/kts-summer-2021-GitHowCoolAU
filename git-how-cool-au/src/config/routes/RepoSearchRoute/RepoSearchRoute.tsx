import { Route } from "react-router-dom";

type RepoSearchRouteProps = {
    path: string,
    children: React.ReactNode
};

const RepoSearchRoute: React.FC<RepoSearchRouteProps> = ({ path, children }) => {
    return <Route path={path}>{children}</Route>;
};

export default RepoSearchRoute;