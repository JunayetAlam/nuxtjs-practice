type Meta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type ResponsePayload<T> = {
  data: T;
  meta?: Meta;
};

type ApiResponse<T> = {
  data: T;
  statusCode: number;
  meta?: Meta;
};

const sendResponse = <T>({
  data,
  statusCode = 200,
}: {
  data: ResponsePayload<T>;
  statusCode?: number;
}): ApiResponse<T> => {
  return {
    data: data.data,
    statusCode,
    ...(data.meta ? { meta: data.meta } : {}),
  };
};

export default sendResponse;
