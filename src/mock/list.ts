export default [
  {
    url: '/mock/list',
    method: 'post',
    response: ({ body }: Record<string, Record<string, unknown>>) => {
      return {
        'pageNum': body.pageNum,
        'pageSize': body.pageSize,
        'size': 20,
        'total': '@natural(1000, 5000)',
        'pages': '@natural(50, 250)',
        'list|20': [
          {
            'id|+1': 2283,
            name: '@cname',
            date: '@natural(1640966400000, 1956499200000)',
            'status|0-3': 0
          }
        ]
      }
    }
  }
];
