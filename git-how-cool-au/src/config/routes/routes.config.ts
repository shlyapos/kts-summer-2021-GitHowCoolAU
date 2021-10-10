const routes = {
    repoBranches: {
        mask: "/repos/:owner?/:name?",
        create: (
            owner: string, name: string
        ): string => `/repos/${owner}/${name}`
    }
};

export default routes;