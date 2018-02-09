export type Verb = 'get' | 'post' | 'put' | 'delete';

export interface ActionParams {
  params: any;
  cookies: any;
  query: any;
  body: any;
}

export interface Cookie {
  name: string;
  value: string;
}

export interface ActionResult {
  statusCode?: number;
  body?: any;
  redirectTo?: string;
  cookies: Cookie[]
}

export interface Action {
  verb: string;
  path: string;
  validation?: any;
  action: (ctx: ActionParams) => Promise<any>
}

export function stringResult(content: string, statusCode: number = 200) : ActionResult {
  return {
    statusCode,
    body: content,
    cookies: []
  };
}

export function jsonResult(data: any, statusCode: number = 200) : ActionResult {
  return {
    statusCode,
    body: data,
    cookies: []
  };
}

export function redirectResult(path: string) : ActionResult {
  return {
    redirectTo: path,
    cookies: []
  };
}