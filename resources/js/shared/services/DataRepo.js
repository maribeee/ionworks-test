import Repository from './Repository';

export default {
  getAllData() {
    return Repository.get(`/getAllData`).then(response => response.data);
  },
  getChartByData(cRate, temp) {
    return Repository.get(`/getChartData/crate/${cRate}/temp/${temp}`).then(response => response.data);
  }
};
