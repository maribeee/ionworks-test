import Repository from './Repository';

export default {
  getData() {
    console.log('getData repo');
    return Repository.get(`/jsonData`).then(response => response.data);
  },
};
