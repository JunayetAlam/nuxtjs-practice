type Arg = {
  data: {
    data: any;
    meta?: { total: number; page: number; limit: number; totalPages: number };
  };
  statusCode: number;
};

export default ({ data, statusCode = 200 }: Arg) => {
  return {
    data: data.data,
    statusCode,
    ...(data.meta && { meta: data.meta }),
  };
};
