Typescript & Koa & A Sensible Interface
======================================

Koa is a low-level framework. A toolbox of web technology. This project configures a basic Koa with Typescript (I hide this in `lib/app.ts`) and provides an action interface where route handlers can return a promise containing a result. This converts a statement-based imperative API into an expression-based API.

Note that this project is oriented around a web API, there is no provision for view rendering, although it can be easily added.  

See `features/actions.ts` for examples of what actions can do. 

Features
--------

* Async, promise based actions.
* Helpers for text results, json results, redirection and cookies. 
* jsonschema validation of params, querystring and body. 