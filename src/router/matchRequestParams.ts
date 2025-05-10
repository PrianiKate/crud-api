import http from 'http';
import { Route } from '../model/general';

const REQUEST_PARAM_REGEX = /:[a-zA-Z\d\-]+/;

export const matchRequestRoute = (req: http.IncomingMessage, route: Route) => {
  if (route.method === req.method && route.path === req.url) {
    return {
      isFound: true,
      params: {},
    };
  }
  const path = route.path;
  const url = req.url;
  const matchRequestParam = REQUEST_PARAM_REGEX.exec(path);
  if (matchRequestParam) {
    const matchRequestParamIndex = matchRequestParam.index;
    const stringForMatch = path.slice(0, matchRequestParamIndex);
    if (url?.startsWith(stringForMatch) && req.method === route.method) {
      const paramName = path.slice(matchRequestParamIndex + 1);
      const paramValue = url.slice(url.lastIndexOf('/') + 1);
      return {
        isFound: true,
        params: {
          [paramName]: paramValue,
        },
      };
    }
  }
  return {
    isFound: false,
    params: {},
  };
};
