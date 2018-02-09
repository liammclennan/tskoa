import * as Koa from 'koa';
const router = require('koa-router')();
const koaBody = require('koa-body');
import * as ajv from 'ajv';

import * as Web from './web';
const validator = new ajv({
  allErrors: true,
  removeAdditional: true,
  coerceTypes: true
});

export function start(handlers: Web.Action[]) {
  const app = new Koa();
  app.use(koaBody());

  handlers.forEach((handler) => {

    router[handler.verb](handler.path, async (ctx: any) => {
      if (handler.validation) {
        if (handler.validation.params) {
          const isValid = validator.validate(handler.validation.params, ctx.params);
          if (!isValid) {
            ctx.status = 400;
            ctx.body = validator.errors;
            return;
          }
        }

        if (handler.validation.query) {
          const isValid = validator.validate(handler.validation.query, ctx.request.query);
          if (!isValid) {
            ctx.status = 400;
            ctx.body = validator.errors;
            return;
          }
        }

        if (handler.validation.body) {
          const isValid = validator.validate(handler.validation.body, ctx.request.body);
          if (!isValid) {
            ctx.status = 400;
            ctx.body = validator.errors;
            return;
          }
        }
      }
      await handler.action({
        params: ctx.params,
        cookies: ctx.cookies,
        query: ctx.request.query,
        body: ctx.request.body
      }).then(({ statusCode, body, redirectTo, cookies }) => {
        if (cookies.length) {
          cookies.forEach((cookie: Web.Cookie) => {
            ctx.cookies.set(cookie.name, cookie.value);
          });
        }
        if (redirectTo) {
          ctx.redirect(redirectTo);
          return;
        }
        ctx.status = statusCode;
        ctx.body = body || '';
      }).catch((error) => {
        ctx.status = 500;
        ctx.body = Object.assign({}, error, { message: error.message, stack: error.stack });
      });
    });
  });

  app.use(router.routes());
  app.listen(3000);
}
