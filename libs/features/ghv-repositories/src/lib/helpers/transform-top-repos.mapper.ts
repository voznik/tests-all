import { TopRepo, TopStarredReposQuery } from '@ghv/viewer-data-access';

export const parseTopRepos = (
  data: TopStarredReposQuery
): {
  items: TopRepo[];
  total: number;
  endCursor: Nullable<string>;
  startCursor: Nullable<string>;
} => {
  const repos = data.search.edges ?? [];
  const items = repos.reduce((acc: TopRepo[], repo) => {
    const node = repo?.node;
    if (!node || node.__typename !== 'Repository') {
      return acc;
    }
    return [
      ...acc,
      {
        id: node.id,
        name: node.name,
        description: node.description,
        owner: node.owner.login,
        language: node.primaryLanguage?.name,
        languageColor: node.primaryLanguage?.color,
        isPrivate: node.isPrivate,
        stargazerCount: node.stargazerCount,
        forkCount: node.forkCount,
        updatedAt: new Date(node.updatedAt),
      },
    ];
  }, []);
  return {
    startCursor: data.search.pageInfo.startCursor,
    endCursor: data.search.pageInfo.endCursor,
    items,
    total: data.search.repositoryCount,
  };
};
