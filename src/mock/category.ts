import { StatusMap } from '../App.vue'

export default [
  {
    url: '/mock/remote-status-list',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: 'ok',
        list: Object.entries(StatusMap).map(([value, label]) => ({label, value}))
      }
    }
  }
];
