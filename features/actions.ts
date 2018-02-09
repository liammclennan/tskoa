import {stringResult, redirectResult, jsonResult, Action} from '../lib/web';

export const handlers: Action[] = [
    {
      verb: 'get',
      path: '/',
      action: async (ctx) => {
        if (1+1 ===2) throw new Error('gaaaahhh');
        return stringResult('');
      }
    },
    {
      verb: 'get',
      path: '/json',
      action: async (ctx) => jsonResult({ a: 1, b: 'foo' })
    },
    {
      verb: 'get',
      path: '/back',
      validation: {
          query: {
              "type": "object",
              "properties": {
                  "to": {"type":"string"}
              },
              "required": ["to"]
          }
      },
      action: async (ctx) => redirectResult(ctx.query.to)
    },
    {
      verb: 'get',
      path: '/hello/:name',
      validation: {
        params: {
          "type": "object",
          "properties": {
            "name": {"type": "number"}
          },
          "required": ["name"]
        }
      },
      action: async ({params: {name}}) => stringResult(`Hello ${name}`)
    },
    {
      verb: 'get',
      path: '/cookie',
      action: async (ctx) => {
        let result = stringResult('Cookies');
        result.cookies = [{ name: 'alpha', value: 'a'}];
        return result;
      }
    }
  ];