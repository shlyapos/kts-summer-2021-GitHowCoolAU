import React from "react";
import { Route } from "react-router-dom";

import routes from "config/routes/routes.config";

type RepoSearchRouteProps = {
  children: React.ReactNode
};

const RepoSearchRoute: React.FC<RepoSearchRouteProps> = ({
  children,
}) => {
  return <Route path={routes.repoBranches.mask}>{children}</Route>;
};

export default RepoSearchRoute;
