import DataRepo from './DataRepo.js';

const repositories = {
  data: DataRepo,
};

export const RepositoryFactory = {
  get: name => repositories[name],
};
