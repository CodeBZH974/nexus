import axiosInstance from './axiosInstance';

const axiosFetcher = async (args, extraArg) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance({
    url,
    method: config?.method || 'get',
    data: extraArg?.arg,
    ...config,
  });

  return res;
};

export default axiosFetcher;
