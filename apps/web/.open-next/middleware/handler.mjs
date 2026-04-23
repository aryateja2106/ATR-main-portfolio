
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = (o, p, a) => {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.9.14";
const __create = Object.create;
const __defProp = Object.defineProperty;
const __getOwnPropDesc = Object.getOwnPropertyDescriptor;
const __getOwnPropNames = Object.getOwnPropertyNames;
const __getProtoOf = Object.getPrototypeOf;
const __hasOwnProp = Object.prototype.hasOwnProperty;
const __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error(`Dynamic require of "${x}" is not supported`);
});
const __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
const __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
const __export = (target, all) => {
  for (const name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
const __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (const key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
const __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
const __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
const __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
const init_error = __esm({
  "../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
let DOWNPLAYED_ERROR_LOGS;
let isDownplayedErrorLog;
const init_logger = __esm({
  "../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// ../../node_modules/.bun/cookie@1.1.1/node_modules/cookie/dist/index.js
const require_dist = __commonJS({
  "../../node_modules/.bun/cookie@1.1.1/node_modules/cookie/dist/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    const cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    const cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    const maxAgeRegExp = /^-?\d+$/;
    const __toString = Object.prototype.toString;
    const NullObject = /* @__PURE__ */ (() => {
      const C = () => {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = `${cookie.name}=${value}`;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += `; Max-Age=${cookie.maxAge}`;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += `; Domain=${cookie.domain}`;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += `; Path=${cookie.path}`;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += `; Expires=${cookie.expires.toUTCString()}`;
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires": {
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          }
          case "priority": {
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          }
          case "samesite": {
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
          }
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
const init_util = __esm({
  "../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
const init_utils = __esm({
  "../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
const edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
let import_cookie;
let NULL_BODY_STATUSES;
let converter;
let edge_default;
const init_edge = __esm({
  "../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
const cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
let cfPropNameMapping;
let handler;
let cloudflare_edge_default;
const init_cloudflare_edge = __esm({
  "../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
const pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
let cachedOrigins;
let cachedPatterns;
let initialized;
let envLoader;
let pattern_env_default;
const init_pattern_env = __esm({
  "../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
const dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
let resolver;
let dummy_default;
const init_dummy = __esm({
  "../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream({
    start(controller) {
      controller.close();
    }
  });
}
let maybeSomethingBuffer;
const init_stream = __esm({
  "../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
const fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
let fetchProxy;
let fetch_default;
const init_fetch = __esm({
  "../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// node-built-in-modules:node:buffer
const node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
const init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__68c7663c._.js
const require_root_of_the_server_68c7663c = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__68c7663c._.js"() {
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__68c7663c._.js", 951615, (e, r, t) => {
      r.exports = e.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 223579, (e, r, t) => {
      self._ENTRIES ||= {};
      const h = Promise.resolve().then(() => e.i(57813));
      h.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(h, { get(e2, r2) {
        if ("then" === r2) return (r3, t3) => e2.then(r3, t3);
        const t2 = (...t3) => e2.then((e3) => (0, e3[r2])(...t3));
        return t2.then = (t3, h2) => e2.then((e3) => e3[r2]).then(t3, h2), t2;
      } });
    }]);
  }
});

// node-built-in-modules:node:async_hooks
const node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
const init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__438ceb6c._.js
const require_root_of_the_server_438ceb6c = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__438ceb6c._.js"() {
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__438ceb6c._.js", 382523, (e, t, r) => {
      const n = Object.defineProperty;
      const i = Object.getOwnPropertyDescriptor;
      const o = Object.getOwnPropertyNames;
      const a = Object.prototype.hasOwnProperty;
      const s = {};
      const c = { RequestCookies: () => y, ResponseCookies: () => m, parseCookie: () => d, parseSetCookie: () => p, stringifyCookie: () => u };
      for (const l in c) n(s, l, { get: c[l], enumerable: true });
      function u(e2) {
        let t2;
        const r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" === typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" === typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean);
        const n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function d(e2) {
        const t2 = /* @__PURE__ */ new Map();
        for (const r2 of e2.split(/; */)) {
          if (!r2) continue;
          const e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          const [n2, i2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != i2 ? i2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function p(e2) {
        if (!e2) return;
        const [[t2, r2], ...n2] = d(e2);
        const { domain: i2, expires: o2, httponly: a2, maxage: s2, path: c2, samesite: l2, secure: u2, partitioned: p2, priority: y2 } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          let m2;
          let g;
          const w = { name: t2, value: decodeURIComponent(r2), domain: i2, ...o2 && { expires: new Date(o2) }, ...a2 && { httpOnly: true }, ..."string" === typeof s2 && { maxAge: Number(s2) }, path: c2, ...l2 && { sameSite: h.includes(m2 = (m2 = l2).toLowerCase()) ? m2 : void 0 }, ...u2 && { secure: true }, ...y2 && { priority: f.includes(g = (g = y2).toLowerCase()) ? g : void 0 }, ...p2 && { partitioned: true } };
          const e3 = {};
          for (const t3 in w) w[t3] && (e3[t3] = w[t3]);
          return e3;
        }
      }
      t.exports = ((e2, t2, r2, s2) => {
        if (t2 && "object" === typeof t2 || "function" === typeof t2) for (const c2 of o(t2)) a.call(e2, c2) || c2 === r2 || n(e2, c2, { get: () => t2[c2], enumerable: !(s2 = i(t2, c2)) || s2.enumerable });
        return e2;
      })(n({}, "__esModule", { value: true }), s);
      const h = ["strict", "lax", "none"];
      const f = ["low", "medium", "high"];
      const y = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const t2 = e2.get("cookie");
          if (t2) for (const [e3, r2] of d(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          const t2 = "string" === typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          let t2;
          const r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          const n2 = "string" === typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          const [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2;
          const n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => u(t3)).join("; ")), this;
        }
        delete(e2) {
          const t2 = this._parsed;
          const r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => u(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      };
      const m = class {
        constructor(e2) {
          let t2;
          let r2;
          let n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const i2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (const e3 of Array.isArray(i2) ? i2 : ((e4) => {
            if (!e4) return [];
            let t3;
            let r3;
            let n3;
            let i3;
            let o2;
            const a2 = [];
            let s2 = 0;
            function c2() {
              while (s2 < e4.length && /\s/.test(e4.charAt(s2))) s2 += 1;
              return s2 < e4.length;
            }
            while (s2 < e4.length) {
              for (t3 = s2, o2 = false; c2(); ) if ("," === (r3 = e4.charAt(s2))) {
                for (n3 = s2, s2 += 1, c2(), i3 = s2; s2 < e4.length && "=" !== (r3 = e4.charAt(s2)) && ";" !== r3 && "," !== r3; ) s2 += 1;
                s2 < e4.length && "=" === e4.charAt(s2) ? (o2 = true, s2 = i3, a2.push(e4.substring(t3, n3)), t3 = s2) : s2 = n3 + 1;
              } else s2 += 1;
              (!o2 || s2 >= e4.length) && a2.push(e4.substring(t3, e4.length));
            }
            return a2;
          })(i2)) {
            const t3 = p(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          const t2 = "string" === typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          let t2;
          const r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          const n2 = "string" === typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          const [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2;
          const i2 = this._parsed;
          return i2.set(t2, ((e3 = { name: "", value: "" }) => ("number" === typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3))({ name: t2, value: r2, ...n2 })), ((e3, t3) => {
            for (const [, r3] of (t3.delete("set-cookie"), e3)) {
              const e4 = u(r3);
              t3.append("set-cookie", e4);
            }
          })(i2, this._headers), this;
        }
        delete(...e2) {
          const [t2, r2] = "string" === typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(u).join("; ");
        }
      };
    }, 100151, (e) => {
      const t = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class r {
        disable() {
          throw t;
        }
        getStore() {
        }
        run() {
          throw t;
        }
        exit() {
          throw t;
        }
        enterWith() {
          throw t;
        }
        static bind(e2) {
          return e2;
        }
      }
      const n = "undefined" !== typeof globalThis && globalThis.AsyncLocalStorage;
      function i() {
        return n ? new n() : new r();
      }
      function o(e2) {
        return n ? n.bind(e2) : r.bind(e2);
      }
      function a() {
        return n ? n.snapshot() : ((e2, ...t2) => e2(...t2));
      }
      e.s(["bindSnapshot", () => o, "createAsyncLocalStorage", () => i, "createSnapshot", () => a]);
    }, 471029, (e) => {
      function t(e7) {
        return Symbol.for(e7);
      }
      let r;
      let n;
      let i;
      let o;
      let a;
      let s;
      let c;
      let l;
      let u;
      let d;
      let p;
      let h;
      let f;
      const y = new function e7(t2) {
        this._currentContext = t2 ? new Map(t2) : /* @__PURE__ */ new Map(), this.getValue = (e9) => this._currentContext.get(e9), this.setValue = (t3, n2) => {
          const i2 = new e7(this._currentContext);
          return i2._currentContext.set(t3, n2), i2;
        }, this.deleteValue = (t3) => {
          const n2 = new e7(this._currentContext);
          return n2._currentContext.delete(t3), n2;
        };
      }();
      const m = (e7, t2) => {
        let r2 = "function" === typeof Symbol && e7[Symbol.iterator];
        if (!r2) return e7;
        let n2;
        let i2;
        const o2 = r2.call(e7);
        const a2 = [];
        try {
          while ((void 0 === t2 || t2-- > 0) && !(n2 = o2.next()).done) a2.push(n2.value);
        } catch (e9) {
          i2 = { error: e9 };
        } finally {
          try {
            n2 && !n2.done && (r2 = o2.return) && r2.call(o2);
          } finally {
            if (i2) throw i2.error;
          }
        }
        return a2;
      };
      const g = (e7, t2, r2) => {
        if (r2 || 2 === arguments.length) for (let n2, i2 = 0, o2 = t2.length; i2 < o2; i2++) !n2 && i2 in t2 || (n2 || (n2 = Array.prototype.slice.call(t2, 0, i2)), n2[i2] = t2[i2]);
        return e7.concat(n2 || Array.prototype.slice.call(t2));
      };
      const w = (() => {
        function e7() {
        }
        return e7.prototype.active = () => y, e7.prototype.with = (e9, t2, r2) => {
          for (let n2 = [], i2 = 3; i2 < arguments.length; i2++) n2[i2 - 3] = arguments[i2];
          return t2.call.apply(t2, g([r2], m(n2), false));
        }, e7.prototype.bind = (e9, t2) => t2, e7.prototype.enable = function() {
          return this;
        }, e7.prototype.disable = function() {
          return this;
        }, e7;
      })();
      const b = "object" === typeof globalThis ? globalThis : "object" === typeof self ? self : e.g;
      const v = "1.9.0";
      const _ = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
      const E = ((e7) => {
        const t2 = /* @__PURE__ */ new Set([e7]);
        const r2 = /* @__PURE__ */ new Set();
        const n2 = e7.match(_);
        if (!n2) return () => false;
        const i2 = { major: +n2[1], minor: +n2[2], patch: +n2[3], prerelease: n2[4] };
        if (null != i2.prerelease) return (t3) => t3 === e7;
        function o2(e9) {
          return r2.add(e9), false;
        }
        return (e9) => {
          if (t2.has(e9)) return true;
          if (r2.has(e9)) return false;
          const n3 = e9.match(_);
          if (!n3) return o2(e9);
          const a2 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
          if (null != a2.prerelease || i2.major !== a2.major) return o2(e9);
          if (0 === i2.major) return i2.minor === a2.minor && i2.patch <= a2.patch ? (t2.add(e9), true) : o2(e9);
          return i2.minor <= a2.minor ? (t2.add(e9), true) : o2(e9);
        };
      })(v);
      const S = Symbol.for(`opentelemetry.js.api.${v.split(".")[0]}`);
      function k(e7, t2, r2, n2) {
        void 0 === n2 && (n2 = false);
        let i2;
        const o2 = b[S] = null != (i2 = b[S]) ? i2 : { version: v };
        if (!n2 && o2[e7]) {
          const a2 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e7}`);
          return r2.error(a2.stack || a2.message), false;
        }
        if (o2.version !== v) {
          const a2 = Error(`@opentelemetry/api: Registration of version v${o2.version} for ${e7} does not match previously registered API v${v}`);
          return r2.error(a2.stack || a2.message), false;
        }
        return o2[e7] = t2, r2.debug(`@opentelemetry/api: Registered a global for ${e7} v${v}.`), true;
      }
      function x(e7) {
        let t2;
        let r2;
        const n2 = null == (t2 = b[S]) ? void 0 : t2.version;
        if (n2 && E(n2)) return null == (r2 = b[S]) ? void 0 : r2[e7];
      }
      function R(e7, t2) {
        t2.debug(`@opentelemetry/api: Unregistering a global for ${e7} v${v}.`);
        const r2 = b[S];
        r2 && delete r2[e7];
      }
      const A = (e7, t2) => {
        let r2 = "function" === typeof Symbol && e7[Symbol.iterator];
        if (!r2) return e7;
        let n2;
        let i2;
        const o2 = r2.call(e7);
        const a2 = [];
        try {
          while ((void 0 === t2 || t2-- > 0) && !(n2 = o2.next()).done) a2.push(n2.value);
        } catch (e9) {
          i2 = { error: e9 };
        } finally {
          try {
            n2 && !n2.done && (r2 = o2.return) && r2.call(o2);
          } finally {
            if (i2) throw i2.error;
          }
        }
        return a2;
      };
      const T = (e7, t2, r2) => {
        if (r2 || 2 === arguments.length) for (let n2, i2 = 0, o2 = t2.length; i2 < o2; i2++) !n2 && i2 in t2 || (n2 || (n2 = Array.prototype.slice.call(t2, 0, i2)), n2[i2] = t2[i2]);
        return e7.concat(n2 || Array.prototype.slice.call(t2));
      };
      const C = (() => {
        function e7(e9) {
          this._namespace = e9.namespace || "DiagComponentLogger";
        }
        return e7.prototype.debug = function() {
          for (let e9 = [], t2 = 0; t2 < arguments.length; t2++) e9[t2] = arguments[t2];
          return P("debug", this._namespace, e9);
        }, e7.prototype.error = function() {
          for (let e9 = [], t2 = 0; t2 < arguments.length; t2++) e9[t2] = arguments[t2];
          return P("error", this._namespace, e9);
        }, e7.prototype.info = function() {
          for (let e9 = [], t2 = 0; t2 < arguments.length; t2++) e9[t2] = arguments[t2];
          return P("info", this._namespace, e9);
        }, e7.prototype.warn = function() {
          for (let e9 = [], t2 = 0; t2 < arguments.length; t2++) e9[t2] = arguments[t2];
          return P("warn", this._namespace, e9);
        }, e7.prototype.verbose = function() {
          for (let e9 = [], t2 = 0; t2 < arguments.length; t2++) e9[t2] = arguments[t2];
          return P("verbose", this._namespace, e9);
        }, e7;
      })();
      function P(e7, t2, r2) {
        const n2 = x("diag");
        if (n2) return r2.unshift(t2), n2[e7].apply(n2, T([], A(r2), false));
      }
      (c = r || (r = {}))[c.NONE = 0] = "NONE", c[c.ERROR = 30] = "ERROR", c[c.WARN = 50] = "WARN", c[c.INFO = 60] = "INFO", c[c.DEBUG = 70] = "DEBUG", c[c.VERBOSE = 80] = "VERBOSE", c[c.ALL = 9999] = "ALL";
      const O = (e7, t2) => {
        let r2 = "function" === typeof Symbol && e7[Symbol.iterator];
        if (!r2) return e7;
        let n2;
        let i2;
        const o2 = r2.call(e7);
        const a2 = [];
        try {
          while ((void 0 === t2 || t2-- > 0) && !(n2 = o2.next()).done) a2.push(n2.value);
        } catch (e9) {
          i2 = { error: e9 };
        } finally {
          try {
            n2 && !n2.done && (r2 = o2.return) && r2.call(o2);
          } finally {
            if (i2) throw i2.error;
          }
        }
        return a2;
      };
      const U = (e7, t2, r2) => {
        if (r2 || 2 === arguments.length) for (let n2, i2 = 0, o2 = t2.length; i2 < o2; i2++) !n2 && i2 in t2 || (n2 || (n2 = Array.prototype.slice.call(t2, 0, i2)), n2[i2] = t2[i2]);
        return e7.concat(n2 || Array.prototype.slice.call(t2));
      };
      const I = (() => {
        function e7() {
          function e9(e10) {
            return () => {
              for (let t3 = [], r2 = 0; r2 < arguments.length; r2++) t3[r2] = arguments[r2];
              const n2 = x("diag");
              if (n2) return n2[e10].apply(n2, U([], O(t3), false));
            };
          }
          this.setLogger = (e10, n2) => {
            if (void 0 === n2 && (n2 = { logLevel: r.INFO }), e10 === this) {
              let i2;
              let o2;
              let a2;
              const s2 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
              return this.error(null != (i2 = s2.stack) ? i2 : s2.message), false;
            }
            "number" === typeof n2 && (n2 = { logLevel: n2 });
            const c2 = x("diag");
            const l2 = ((e11, t3) => {
              function n3(r2, n4) {
                const i3 = t3[r2];
                return "function" === typeof i3 && e11 >= n4 ? i3.bind(t3) : (() => {
                });
              }
              return e11 < r.NONE ? e11 = r.NONE : e11 > r.ALL && (e11 = r.ALL), t3 = t3 || {}, { error: n3("error", r.ERROR), warn: n3("warn", r.WARN), info: n3("info", r.INFO), debug: n3("debug", r.DEBUG), verbose: n3("verbose", r.VERBOSE) };
            })(null != (o2 = n2.logLevel) ? o2 : r.INFO, e10);
            if (c2 && !n2.suppressOverrideMessage) {
              const u2 = null != (a2 = Error().stack) ? a2 : "<failed to generate stacktrace>";
              c2.warn(`Current logger will be overwritten from ${u2}`), l2.warn(`Current logger will overwrite one already registered from ${u2}`);
            }
            return k("diag", l2, this, true);
          }, this.disable = () => {
            R("diag", this);
          }, this.createComponentLogger = (e10) => new C(e10), this.verbose = e9("verbose"), this.debug = e9("debug"), this.info = e9("info"), this.warn = e9("warn"), this.error = e9("error");
        }
        return e7.instance = function() {
          return this._instance || (this._instance = new e7()), this._instance;
        }, e7;
      })();
      const N = (e7, t2) => {
        let r2 = "function" === typeof Symbol && e7[Symbol.iterator];
        if (!r2) return e7;
        let n2;
        let i2;
        const o2 = r2.call(e7);
        const a2 = [];
        try {
          while ((void 0 === t2 || t2-- > 0) && !(n2 = o2.next()).done) a2.push(n2.value);
        } catch (e9) {
          i2 = { error: e9 };
        } finally {
          try {
            n2 && !n2.done && (r2 = o2.return) && r2.call(o2);
          } finally {
            if (i2) throw i2.error;
          }
        }
        return a2;
      };
      const $ = (e7, t2, r2) => {
        if (r2 || 2 === arguments.length) for (let n2, i2 = 0, o2 = t2.length; i2 < o2; i2++) !n2 && i2 in t2 || (n2 || (n2 = Array.prototype.slice.call(t2, 0, i2)), n2[i2] = t2[i2]);
        return e7.concat(n2 || Array.prototype.slice.call(t2));
      };
      const D = "context";
      const j = new w();
      const H = (() => {
        function e7() {
        }
        return e7.getInstance = function() {
          return this._instance || (this._instance = new e7()), this._instance;
        }, e7.prototype.setGlobalContextManager = (e9) => k(D, e9, I.instance()), e7.prototype.active = function() {
          return this._getContextManager().active();
        }, e7.prototype.with = function(e9, t2, r2) {
          for (let n2, i2 = [], o2 = 3; o2 < arguments.length; o2++) i2[o2 - 3] = arguments[o2];
          return (n2 = this._getContextManager()).with.apply(n2, $([e9, t2, r2], N(i2), false));
        }, e7.prototype.bind = function(e9, t2) {
          return this._getContextManager().bind(e9, t2);
        }, e7.prototype._getContextManager = () => x(D) || j, e7.prototype.disable = function() {
          this._getContextManager().disable(), R(D, I.instance());
        }, e7;
      })();
      const L = H.getInstance();
      const M = I.instance();
      const W = (l = (e7, t2) => (l = Object.setPrototypeOf || Array.isArray({ __proto__: [] }) && ((e9, t3) => {
          e9.__proto__ = t3;
        }) || ((e9, t3) => {
          for (const r2 in t3) Object.prototype.hasOwnProperty.call(t3, r2) && (e9[r2] = t3[r2]);
        }))(e7, t2), (e7, t2) => {
        if ("function" !== typeof t2 && null !== t2) throw TypeError(`Class extends value ${String(t2)} is not a constructor or null`);
        function r2() {
          this.constructor = e7;
        }
        l(e7, t2), e7.prototype = null === t2 ? Object.create(t2) : (r2.prototype = t2.prototype, new r2());
      });
      const K = (() => {
        function e7() {
        }
        return e7.prototype.createGauge = (e9, t2) => ee, e7.prototype.createHistogram = (e9, t2) => et, e7.prototype.createCounter = (e9, t2) => Z, e7.prototype.createUpDownCounter = (e9, t2) => er, e7.prototype.createObservableGauge = (e9, t2) => ei, e7.prototype.createObservableCounter = (e9, t2) => en, e7.prototype.createObservableUpDownCounter = (e9, t2) => eo, e7.prototype.addBatchObservableCallback = (e9, t2) => {
        }, e7.prototype.removeBatchObservableCallback = (e9) => {
        }, e7;
      })();
      const q = () => {
      };
      const B = ((e7) => {
        function t2() {
          return null !== e7 && e7.apply(this, arguments) || this;
        }
        return W(t2, e7), t2.prototype.add = (e9, t3) => {
        }, t2;
      })(q);
      const J = ((e7) => {
        function t2() {
          return null !== e7 && e7.apply(this, arguments) || this;
        }
        return W(t2, e7), t2.prototype.add = (e9, t3) => {
        }, t2;
      })(q);
      const z = ((e7) => {
        function t2() {
          return null !== e7 && e7.apply(this, arguments) || this;
        }
        return W(t2, e7), t2.prototype.record = (e9, t3) => {
        }, t2;
      })(q);
      const F = ((e7) => {
        function t2() {
          return null !== e7 && e7.apply(this, arguments) || this;
        }
        return W(t2, e7), t2.prototype.record = (e9, t3) => {
        }, t2;
      })(q);
      const V = (() => {
        function e7() {
        }
        return e7.prototype.addCallback = (e9) => {
        }, e7.prototype.removeCallback = (e9) => {
        }, e7;
      })();
      const X = ((e7) => {
        function t2() {
          return null !== e7 && e7.apply(this, arguments) || this;
        }
        return W(t2, e7), t2;
      })(V);
      const G = ((e7) => {
        function t2() {
          return null !== e7 && e7.apply(this, arguments) || this;
        }
        return W(t2, e7), t2;
      })(V);
      const Y = ((e7) => {
        function t2() {
          return null !== e7 && e7.apply(this, arguments) || this;
        }
        return W(t2, e7), t2;
      })(V);
      const Q = new K();
      const Z = new B();
      const ee = new z();
      const et = new F();
      const er = new J();
      const en = new X();
      const ei = new G();
      const eo = new Y();
      function ea() {
        return Q;
      }
      const es = new ((() => {
        function e7() {
        }
        return e7.prototype.getMeter = (e9, t2, r2) => Q, e7;
      })())();
      const ec = "metrics";
      const el = (() => {
        function e7() {
        }
        return e7.getInstance = function() {
          return this._instance || (this._instance = new e7()), this._instance;
        }, e7.prototype.setGlobalMeterProvider = (e9) => k(ec, e9, I.instance()), e7.prototype.getMeterProvider = () => x(ec) || es, e7.prototype.getMeter = function(e9, t2, r2) {
          return this.getMeterProvider().getMeter(e9, t2, r2);
        }, e7.prototype.disable = () => {
          R(ec, I.instance());
        }, e7;
      })().getInstance();
      const eu = (() => {
        function e7() {
        }
        return e7.prototype.inject = (e9, t2) => {
        }, e7.prototype.extract = (e9, t2) => e9, e7.prototype.fields = () => [], e7;
      })();
      const ed = { get: (e7, t2) => {
        if (null != e7) return e7[t2];
      }, keys: (e7) => null == e7 ? [] : Object.keys(e7) };
      const ep = { set: (e7, t2, r2) => {
        null != e7 && (e7[t2] = r2);
      } };
      const eh = t("OpenTelemetry Baggage Key");
      function ef(e7) {
        return e7.getValue(eh) || void 0;
      }
      function ey() {
        return ef(H.getInstance().active());
      }
      function em(e7, t2) {
        return e7.setValue(eh, t2);
      }
      function eg(e7) {
        return e7.deleteValue(eh);
      }
      const ew = (e7, t2) => {
        let r2 = "function" === typeof Symbol && e7[Symbol.iterator];
        if (!r2) return e7;
        let n2;
        let i2;
        const o2 = r2.call(e7);
        const a2 = [];
        try {
          while ((void 0 === t2 || t2-- > 0) && !(n2 = o2.next()).done) a2.push(n2.value);
        } catch (e9) {
          i2 = { error: e9 };
        } finally {
          try {
            n2 && !n2.done && (r2 = o2.return) && r2.call(o2);
          } finally {
            if (i2) throw i2.error;
          }
        }
        return a2;
      };
      const eb = (e7) => {
        const t2 = "function" === typeof Symbol && Symbol.iterator;
        const r2 = t2 && e7[t2];
        let n2 = 0;
        if (r2) return r2.call(e7);
        if (e7 && "number" === typeof e7.length) return { next: () => (e7 && n2 >= e7.length && (e7 = void 0), { value: e7?.[n2++], done: !e7 }) };
        throw TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      const ev = (() => {
        function e7(e9) {
          this._entries = e9 ? new Map(e9) : /* @__PURE__ */ new Map();
        }
        return e7.prototype.getEntry = function(e9) {
          const t2 = this._entries.get(e9);
          if (t2) return Object.assign({}, t2);
        }, e7.prototype.getAllEntries = function() {
          return Array.from(this._entries.entries()).map((e9) => {
            const t2 = ew(e9, 2);
            return [t2[0], t2[1]];
          });
        }, e7.prototype.setEntry = function(t2, r2) {
          const n2 = new e7(this._entries);
          return n2._entries.set(t2, r2), n2;
        }, e7.prototype.removeEntry = function(t2) {
          const r2 = new e7(this._entries);
          return r2._entries.delete(t2), r2;
        }, e7.prototype.removeEntries = function() {
          for (let t2, r2, n2 = [], i2 = 0; i2 < arguments.length; i2++) n2[i2] = arguments[i2];
          const o2 = new e7(this._entries);
          try {
            for (let a2 = eb(n2), s2 = a2.next(); !s2.done; s2 = a2.next()) {
              const c2 = s2.value;
              o2._entries.delete(c2);
            }
          } catch (e9) {
            t2 = { error: e9 };
          } finally {
            try {
              s2 && !s2.done && (r2 = a2.return) && r2.call(a2);
            } finally {
              if (t2) throw t2.error;
            }
          }
          return o2;
        }, e7.prototype.clear = () => new e7(), e7;
      })();
      const e_ = Symbol("BaggageEntryMetadata");
      const eE = I.instance();
      function eS(e7) {
        return void 0 === e7 && (e7 = {}), new ev(new Map(Object.entries(e7)));
      }
      function ek(e7) {
        return "string" !== typeof e7 && (eE.error(`Cannot create baggage metadata from unknown type: ${typeof e7}`), e7 = ""), { __TYPE__: e_, toString: () => e7 };
      }
      const ex = "propagation";
      const eR = new eu();
      const eA = (() => {
        function e7() {
          this.createBaggage = eS, this.getBaggage = ef, this.getActiveBaggage = ey, this.setBaggage = em, this.deleteBaggage = eg;
        }
        return e7.getInstance = function() {
          return this._instance || (this._instance = new e7()), this._instance;
        }, e7.prototype.setGlobalPropagator = (e9) => k(ex, e9, I.instance()), e7.prototype.inject = function(e9, t2, r2) {
          return void 0 === r2 && (r2 = ep), this._getGlobalPropagator().inject(e9, t2, r2);
        }, e7.prototype.extract = function(e9, t2, r2) {
          return void 0 === r2 && (r2 = ed), this._getGlobalPropagator().extract(e9, t2, r2);
        }, e7.prototype.fields = function() {
          return this._getGlobalPropagator().fields();
        }, e7.prototype.disable = () => {
          R(ex, I.instance());
        }, e7.prototype._getGlobalPropagator = () => x(ex) || eR, e7;
      })().getInstance();
      (u = n || (n = {}))[u.NONE = 0] = "NONE", u[u.SAMPLED = 1] = "SAMPLED";
      const eT = "0000000000000000";
      const eC = "00000000000000000000000000000000";
      const eP = { traceId: eC, spanId: eT, traceFlags: n.NONE };
      const eO = (() => {
        function e7(e9) {
          void 0 === e9 && (e9 = eP), this._spanContext = e9;
        }
        return e7.prototype.spanContext = function() {
          return this._spanContext;
        }, e7.prototype.setAttribute = function(e9, t2) {
          return this;
        }, e7.prototype.setAttributes = function(e9) {
          return this;
        }, e7.prototype.addEvent = function(e9, t2) {
          return this;
        }, e7.prototype.addLink = function(e9) {
          return this;
        }, e7.prototype.addLinks = function(e9) {
          return this;
        }, e7.prototype.setStatus = function(e9) {
          return this;
        }, e7.prototype.updateName = function(e9) {
          return this;
        }, e7.prototype.end = (e9) => {
        }, e7.prototype.isRecording = () => false, e7.prototype.recordException = (e9, t2) => {
        }, e7;
      })();
      const eU = t("OpenTelemetry Context Key SPAN");
      function eI(e7) {
        return e7.getValue(eU) || void 0;
      }
      function eN() {
        return eI(H.getInstance().active());
      }
      function e$(e7, t2) {
        return e7.setValue(eU, t2);
      }
      function eD(e7) {
        return e7.deleteValue(eU);
      }
      function ej(e7, t2) {
        return e$(e7, new eO(t2));
      }
      function eH(e7) {
        let t2;
        return null == (t2 = eI(e7)) ? void 0 : t2.spanContext();
      }
      const eL = /^([0-9a-f]{32})$/i;
      const eM = /^[0-9a-f]{16}$/i;
      function eW(e7) {
        return eL.test(e7) && e7 !== eC;
      }
      function eK(e7) {
        return eM.test(e7) && e7 !== eT;
      }
      function eq(e7) {
        return eW(e7.traceId) && eK(e7.spanId);
      }
      function eB(e7) {
        return new eO(e7);
      }
      const eJ = H.getInstance();
      const ez = (() => {
        function e7() {
        }
        return e7.prototype.startSpan = (e9, t2, r2) => {
          if (void 0 === r2 && (r2 = eJ.active()), null == t2 ? void 0 : t2.root) return new eO();
          let n2;
          const i2 = r2 && eH(r2);
          return "object" === typeof (n2 = i2) && "string" === typeof n2.spanId && "string" === typeof n2.traceId && "number" === typeof n2.traceFlags && eq(i2) ? new eO(i2) : new eO();
        }, e7.prototype.startActiveSpan = function(e9, t2, r2, n2) {
          if (!(arguments.length < 2)) {
            2 === arguments.length ? a2 = t2 : 3 === arguments.length ? (i2 = t2, a2 = r2) : (i2 = t2, o2 = r2, a2 = n2);
            let i2;
            let o2;
            let a2;
            const s2 = null != o2 ? o2 : eJ.active();
            const c2 = this.startSpan(e9, i2, s2);
            const l2 = e$(s2, c2);
            return eJ.with(l2, a2, void 0, c2);
          }
        }, e7;
      })();
      const eF = new ez();
      const eV = (() => {
        function e7(e9, t2, r2, n2) {
          this._provider = e9, this.name = t2, this.version = r2, this.options = n2;
        }
        return e7.prototype.startSpan = function(e9, t2, r2) {
          return this._getTracer().startSpan(e9, t2, r2);
        }, e7.prototype.startActiveSpan = function(e9, t2, r2, n2) {
          const i2 = this._getTracer();
          return Reflect.apply(i2.startActiveSpan, i2, arguments);
        }, e7.prototype._getTracer = function() {
          if (this._delegate) return this._delegate;
          const e9 = this._provider.getDelegateTracer(this.name, this.version, this.options);
          return e9 ? (this._delegate = e9, this._delegate) : eF;
        }, e7;
      })();
      const eX = new ((() => {
        function e7() {
        }
        return e7.prototype.getTracer = (e9, t2, r2) => new ez(), e7;
      })())();
      const eG = (() => {
        function e7() {
        }
        return e7.prototype.getTracer = function(e9, t2, r2) {
          let n2;
          return null != (n2 = this.getDelegateTracer(e9, t2, r2)) ? n2 : new eV(this, e9, t2, r2);
        }, e7.prototype.getDelegate = function() {
          let e9;
          return null != (e9 = this._delegate) ? e9 : eX;
        }, e7.prototype.setDelegate = function(e9) {
          this._delegate = e9;
        }, e7.prototype.getDelegateTracer = function(e9, t2, r2) {
          let n2;
          return null == (n2 = this._delegate) ? void 0 : n2.getTracer(e9, t2, r2);
        }, e7;
      })();
      const eY = "trace";
      const eQ = (() => {
        function e7() {
          this._proxyTracerProvider = new eG(), this.wrapSpanContext = eB, this.isSpanContextValid = eq, this.deleteSpan = eD, this.getSpan = eI, this.getActiveSpan = eN, this.getSpanContext = eH, this.setSpan = e$, this.setSpanContext = ej;
        }
        return e7.getInstance = function() {
          return this._instance || (this._instance = new e7()), this._instance;
        }, e7.prototype.setGlobalTracerProvider = function(e9) {
          const t2 = k(eY, this._proxyTracerProvider, I.instance());
          return t2 && this._proxyTracerProvider.setDelegate(e9), t2;
        }, e7.prototype.getTracerProvider = function() {
          return x(eY) || this._proxyTracerProvider;
        }, e7.prototype.getTracer = function(e9, t2) {
          return this.getTracerProvider().getTracer(e9, t2);
        }, e7.prototype.disable = function() {
          R(eY, I.instance()), this._proxyTracerProvider = new eG();
        }, e7;
      })().getInstance();
      const eZ = { context: L, diag: M, metrics: el, propagation: eA, trace: eQ };
      e.s(["default", 0, eZ], 290280), e.i(290280);
      const e0 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
      const e1 = function() {
        for (let e7 = 0; e7 < e0.length; e7++) this[e0[e7].n] = /* @__PURE__ */ ((e9) => () => {
            for (let t2 = [], r2 = 0; r2 < arguments.length; r2++) t2[r2] = arguments[r2];
            if (console) {
              let n2 = console[e9];
              if ("function" !== typeof n2 && (n2 = console.log), "function" === typeof n2) return n2.apply(console, t2);
            }
          })(e0[e7].c);
      };
      (d = i || (i = {}))[d.INT = 0] = "INT", d[d.DOUBLE = 1] = "DOUBLE", (p = o || (o = {}))[p.NOT_RECORD = 0] = "NOT_RECORD", p[p.RECORD = 1] = "RECORD", p[p.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED", (h = a || (a = {}))[h.INTERNAL = 0] = "INTERNAL", h[h.SERVER = 1] = "SERVER", h[h.CLIENT = 2] = "CLIENT", h[h.PRODUCER = 3] = "PRODUCER", h[h.CONSUMER = 4] = "CONSUMER", (f = s || (s = {}))[f.UNSET = 0] = "UNSET", f[f.OK = 1] = "OK", f[f.ERROR = 2] = "ERROR";
      const e2 = "[_0-9a-z-*/]";
      const e3 = RegExp(`^(?:[a-z]${e2}{0,255}|[a-z0-9]${e2}{0,240}@[a-z]${e2}{0,13})$`);
      const e6 = /^[ -~]{0,255}[!-~]$/;
      const e5 = /,|=/;
      const e8 = (() => {
        function e7(e9) {
          this._internalState = /* @__PURE__ */ new Map(), e9 && this._parse(e9);
        }
        return e7.prototype.set = function(e9, t2) {
          const r2 = this._clone();
          return r2._internalState.has(e9) && r2._internalState.delete(e9), r2._internalState.set(e9, t2), r2;
        }, e7.prototype.unset = function(e9) {
          const t2 = this._clone();
          return t2._internalState.delete(e9), t2;
        }, e7.prototype.get = function(e9) {
          return this._internalState.get(e9);
        }, e7.prototype.serialize = function() {
          return this._keys().reduce((t2, r2) => (t2.push(`${r2}=${this.get(r2)}`), t2), []).join(",");
        }, e7.prototype._parse = function(e9) {
          !(e9.length > 512) && (this._internalState = e9.split(",").reverse().reduce((e10, t2) => {
            const r2 = t2.trim();
            const n2 = r2.indexOf("=");
            if (-1 !== n2) {
              const i2 = r2.slice(0, n2);
              const o2 = r2.slice(n2 + 1, t2.length);
              e3.test(i2) && e6.test(o2) && !e5.test(o2) && e10.set(i2, o2);
            }
            return e10;
          }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
        }, e7.prototype._keys = function() {
          return Array.from(this._internalState.keys()).reverse();
        }, e7.prototype._clone = function() {
          const t2 = new e7();
          return t2._internalState = new Map(this._internalState), t2;
        }, e7;
      })();
      function e4(e7) {
        return new e8(e7);
      }
      e.s(["DiagConsoleLogger", () => e1, "DiagLogLevel", () => r, "INVALID_SPANID", () => eT, "INVALID_SPAN_CONTEXT", () => eP, "INVALID_TRACEID", () => eC, "ProxyTracer", () => eV, "ProxyTracerProvider", () => eG, "ROOT_CONTEXT", () => y, "SamplingDecision", () => o, "SpanKind", () => a, "SpanStatusCode", () => s, "TraceFlags", () => n, "ValueType", () => i, "baggageEntryMetadataFromString", () => ek, "context", () => L, "createContextKey", () => t, "createNoopMeter", () => ea, "createTraceState", () => e4, "default", 0, eZ, "defaultTextMapGetter", () => ed, "defaultTextMapSetter", () => ep, "diag", () => M, "isSpanContextValid", () => eq, "isValidSpanId", () => eK, "isValidTraceId", () => eW, "metrics", () => el, "propagation", () => eA, "trace", () => eQ], 471029);
    }, 126497, (e, t, r) => {
      (() => {
        "undefined" !== typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/.bun/next@16.0.7+abd6e86da31e620f/node_modules/next/dist/compiled/cookie/");
        let e2;
        let r2;
        let n;
        let i;
        const o = {};
        o.parse = (t2, r3) => {
          if ("string" !== typeof t2) throw TypeError("argument str must be a string");
          for (let i2 = {}, o2 = t2.split(n), a = r3?.decode || e2, s = 0; s < o2.length; s++) {
            const c = o2[s];
            let l = c.indexOf("=");
            if (!(l < 0)) {
              const u = c.substr(0, l).trim();
              let d = c.substr(++l, c.length).trim();
              '"' === d[0] && (d = d.slice(1, -1)), void 0 === i2[u] && (i2[u] = ((e3, t3) => {
                try {
                  return t3(e3);
                } catch (t4) {
                  return e3;
                }
              })(d, a));
            }
          }
          return i2;
        }, o.serialize = (e3, t2, n2) => {
          const o2 = n2 || {};
          const a = o2.encode || r2;
          if ("function" !== typeof a) throw TypeError("option encode is invalid");
          if (!i.test(e3)) throw TypeError("argument name is invalid");
          const s = a(t2);
          if (s && !i.test(s)) throw TypeError("argument val is invalid");
          let c = `${e3}=${s}`;
          if (null != o2.maxAge) {
            const l = o2.maxAge - 0;
            if (Number.isNaN(l) || !Number.isFinite(l)) throw TypeError("option maxAge is invalid");
            c += `; Max-Age=${Math.floor(l)}`;
          }
          if (o2.domain) {
            if (!i.test(o2.domain)) throw TypeError("option domain is invalid");
            c += `; Domain=${o2.domain}`;
          }
          if (o2.path) {
            if (!i.test(o2.path)) throw TypeError("option path is invalid");
            c += `; Path=${o2.path}`;
          }
          if (o2.expires) {
            if ("function" !== typeof o2.expires.toUTCString) throw TypeError("option expires is invalid");
            c += `; Expires=${o2.expires.toUTCString()}`;
          }
          if (o2.httpOnly && (c += "; HttpOnly"), o2.secure && (c += "; Secure"), o2.sameSite) switch ("string" === typeof o2.sameSite ? o2.sameSite.toLowerCase() : o2.sameSite) {
            case true:
            case "strict":
              c += "; SameSite=Strict";
              break;
            case "lax":
              c += "; SameSite=Lax";
              break;
            case "none":
              c += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
          return c;
        }, e2 = decodeURIComponent, r2 = encodeURIComponent, n = /; */, i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, t.exports = o;
      })();
    }, 801934, (e, t, r) => {
      (() => {
        let e2;
        let r2;
        let n;
        let i;
        let o;
        const a = { 993: (e3) => {
          const t2 = Object.prototype.hasOwnProperty;
          let r3 = "~";
          function n2() {
          }
          function i2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function o2(e4, t3, n3, o3, a3) {
            if ("function" !== typeof n3) throw TypeError("The listener must be a function");
            const s3 = new i2(n3, o3 || e4, a3);
            const c2 = r3 ? r3 + t3 : t3;
            return e4._events[c2] ? e4._events[c2].fn ? e4._events[c2] = [e4._events[c2], s3] : e4._events[c2].push(s3) : (e4._events[c2] = s3, e4._eventsCount++), e4;
          }
          function a2(e4, t3) {
            0 === --e4._eventsCount ? e4._events = new n2() : delete e4._events[t3];
          }
          function s2() {
            this._events = new n2(), this._eventsCount = 0;
          }
          Object.create && (n2.prototype = /* @__PURE__ */ Object.create(null), new n2().__proto__ || (r3 = false)), s2.prototype.eventNames = function() {
            let e4;
            let n3;
            const i3 = [];
            if (0 === this._eventsCount) return i3;
            for (n3 in e4 = this._events) t2.call(e4, n3) && i3.push(r3 ? n3.slice(1) : n3);
            return Object.getOwnPropertySymbols ? i3.concat(Object.getOwnPropertySymbols(e4)) : i3;
          }, s2.prototype.listeners = function(e4) {
            const t3 = r3 ? r3 + e4 : e4;
            const n3 = this._events[t3];
            if (!n3) return [];
            if (n3.fn) return [n3.fn];
            for (let i3 = 0, o3 = n3.length, a3 = Array(o3); i3 < o3; i3++) a3[i3] = n3[i3].fn;
            return a3;
          }, s2.prototype.listenerCount = function(e4) {
            const t3 = r3 ? r3 + e4 : e4;
            const n3 = this._events[t3];
            return n3 ? n3.fn ? 1 : n3.length : 0;
          }, s2.prototype.emit = function(e4, t3, n3, i3, o3, a3) {
            const s3 = r3 ? r3 + e4 : e4;
            if (!this._events[s3]) return false;
            let c2;
            let l2;
            const u = this._events[s3];
            const d = arguments.length;
            if (u.fn) {
              switch (u.once && this.removeListener(e4, u.fn, void 0, true), d) {
                case 1:
                  return u.fn.call(u.context), true;
                case 2:
                  return u.fn.call(u.context, t3), true;
                case 3:
                  return u.fn.call(u.context, t3, n3), true;
                case 4:
                  return u.fn.call(u.context, t3, n3, i3), true;
                case 5:
                  return u.fn.call(u.context, t3, n3, i3, o3), true;
                case 6:
                  return u.fn.call(u.context, t3, n3, i3, o3, a3), true;
              }
              for (l2 = 1, c2 = Array(d - 1); l2 < d; l2++) c2[l2 - 1] = arguments[l2];
              u.fn.apply(u.context, c2);
            } else {
              let p;
              const h = u.length;
              for (l2 = 0; l2 < h; l2++) switch (u[l2].once && this.removeListener(e4, u[l2].fn, void 0, true), d) {
                case 1:
                  u[l2].fn.call(u[l2].context);
                  break;
                case 2:
                  u[l2].fn.call(u[l2].context, t3);
                  break;
                case 3:
                  u[l2].fn.call(u[l2].context, t3, n3);
                  break;
                case 4:
                  u[l2].fn.call(u[l2].context, t3, n3, i3);
                  break;
                default:
                  if (!c2) for (p = 1, c2 = Array(d - 1); p < d; p++) c2[p - 1] = arguments[p];
                  u[l2].fn.apply(u[l2].context, c2);
              }
            }
            return true;
          }, s2.prototype.on = function(e4, t3, r4) {
            return o2(this, e4, t3, r4, false);
          }, s2.prototype.once = function(e4, t3, r4) {
            return o2(this, e4, t3, r4, true);
          }, s2.prototype.removeListener = function(e4, t3, n3, i3) {
            const o3 = r3 ? r3 + e4 : e4;
            if (!this._events[o3]) return this;
            if (!t3) return a2(this, o3), this;
            const s3 = this._events[o3];
            if (s3.fn) s3.fn !== t3 || i3 && !s3.once || n3 && s3.context !== n3 || a2(this, o3);
            else {
              for (let c2 = 0, l2 = [], u = s3.length; c2 < u; c2++) (s3[c2].fn !== t3 || i3 && !s3[c2].once || n3 && s3[c2].context !== n3) && l2.push(s3[c2]);
              l2.length ? this._events[o3] = 1 === l2.length ? l2[0] : l2 : a2(this, o3);
            }
            return this;
          }, s2.prototype.removeAllListeners = function(e4) {
            let t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && a2(this, t3)) : (this._events = new n2(), this._eventsCount = 0), this;
          }, s2.prototype.off = s2.prototype.removeListener, s2.prototype.addListener = s2.prototype.on, s2.prefixed = r3, s2.EventEmitter = s2, e3.exports = s2;
        }, 213: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 574: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = (e4, t3, r3) => {
            let n2 = 0;
            let i2 = e4.length;
            while (i2 > 0) {
              const o2 = i2 / 2 | 0;
              let a2 = n2 + o2;
              0 >= r3(e4[a2], t3) ? (n2 = ++a2, i2 -= o2 + 1) : i2 = o2;
            }
            return n2;
          };
        }, 821: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          const n2 = r3(574);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              const r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              const i2 = n2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(i2, 0, r4);
            }
            dequeue() {
              const e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 816: (e3, t2, r3) => {
          const n2 = r3(213);
          class i2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          const o2 = (e4, t3, r4) => new Promise((o3, a2) => {
            if ("number" !== typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void o3(e4);
            const s2 = setTimeout(() => {
              if ("function" === typeof r4) {
                try {
                  o3(r4());
                } catch (e5) {
                  a2(e5);
                }
                return;
              }
              const n3 = "string" === typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`;
              const s3 = r4 instanceof Error ? r4 : new i2(n3);
              "function" === typeof e4.cancel && e4.cancel(), a2(s3);
            }, t3);
            n2(e4.then(o3, a2), () => {
              clearTimeout(s2);
            });
          });
          e3.exports = o2, e3.exports.default = o2, e3.exports.TimeoutError = i2;
        } };
        const s = {};
        function c(e3) {
          const t2 = s[e3];
          if (void 0 !== t2) return t2.exports;
          const r3 = s[e3] = { exports: {} };
          let n2 = true;
          try {
            a[e3](r3, r3.exports, c), n2 = false;
          } finally {
            n2 && delete s[e3];
          }
          return r3.exports;
        }
        c.ab = "/ROOT/node_modules/.bun/next@16.0.7+abd6e86da31e620f/node_modules/next/dist/compiled/p-queue/";
        const l = {};
        Object.defineProperty(l, "__esModule", { value: true }), e2 = c(993), r2 = c(816), n = c(821), i = () => {
        }, o = new r2.TimeoutError(), l.default = class extends e2 {
          constructor(e3) {
            let t2;
            let r3;
            let o2;
            let a2;
            if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = i, this._resolveIdle = i, !("number" === typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: n.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r3 = null == (t2 = e3.intervalCap) ? void 0 : t2.toString()) ? r3 : ""}\` (${typeof e3.intervalCap})`);
            if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (a2 = null == (o2 = e3.interval) ? void 0 : o2.toString()) ? a2 : ""}\` (${typeof e3.interval})`);
            this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
          }
          get _doesIntervalAllowAnother() {
            return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
          }
          get _doesConcurrentAllowAnother() {
            return this._pendingCount < this._concurrency;
          }
          _next() {
            this._pendingCount--, this._tryToStartAnother(), this.emit("next");
          }
          _resolvePromises() {
            this._resolveEmpty(), this._resolveEmpty = i, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = i, this.emit("idle"));
          }
          _onResumeInterval() {
            this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
          }
          _isIntervalPaused() {
            const e3 = Date.now();
            if (void 0 === this._intervalId) {
              const t2 = this._intervalEnd - e3;
              if (!(t2 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, t2)), true;
              this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            }
            return false;
          }
          _tryToStartAnother() {
            if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
            if (!this._isPaused) {
              const e3 = !this._isIntervalPaused();
              if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                const t2 = this._queue.dequeue();
                return !!t2 && (this.emit("active"), t2(), e3 && this._initializeIntervalIfNeeded(), true);
              }
            }
            return false;
          }
          _initializeIntervalIfNeeded() {
            this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
              this._onInterval();
            }, this._interval), this._intervalEnd = Date.now() + this._interval);
          }
          _onInterval() {
            0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
          }
          _processQueue() {
            while (this._tryToStartAnother()) ;
          }
          get concurrency() {
            return this._concurrency;
          }
          set concurrency(e3) {
            if (!("number" === typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
            this._concurrency = e3, this._processQueue();
          }
          async add(e3, t2 = {}) {
            return new Promise((n2, i2) => {
              const a2 = async () => {
                this._pendingCount++, this._intervalCount++;
                try {
                  const a3 = void 0 === this._timeout && void 0 === t2.timeout ? e3() : r2.default(Promise.resolve(e3()), void 0 === t2.timeout ? this._timeout : t2.timeout, () => {
                    (void 0 === t2.throwOnTimeout ? this._throwOnTimeout : t2.throwOnTimeout) && i2(o);
                  });
                  n2(await a3);
                } catch (e4) {
                  i2(e4);
                }
                this._next();
              };
              this._queue.enqueue(a2, t2), this._tryToStartAnother(), this.emit("add");
            });
          }
          async addAll(e3, t2) {
            return Promise.all(e3.map(async (e4) => this.add(e4, t2)));
          }
          start() {
            return this._isPaused && (this._isPaused = false, this._processQueue()), this;
          }
          pause() {
            this._isPaused = true;
          }
          clear() {
            this._queue = new this._queueClass();
          }
          async onEmpty() {
            if (0 !== this._queue.size) return new Promise((e3) => {
              const t2 = this._resolveEmpty;
              this._resolveEmpty = () => {
                t2(), e3();
              };
            });
          }
          async onIdle() {
            if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
              const t2 = this._resolveIdle;
              this._resolveIdle = () => {
                t2(), e3();
              };
            });
          }
          get size() {
            return this._queue.size;
          }
          sizeBy(e3) {
            return this._queue.filter(e3).length;
          }
          get pending() {
            return this._pendingCount;
          }
          get isPaused() {
            return this._isPaused;
          }
          get timeout() {
            return this._timeout;
          }
          set timeout(e3) {
            this._timeout = e3;
          }
        }, t.exports = l;
      })();
    }, 478500, (e, t, r) => {
      t.exports = e.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 217651, (e, t, r) => {
      Object.defineProperty(r, "__esModule", { value: true });
      const n = { getTestReqInfo: () => c, withRequest: () => s };
      for (const i in n) Object.defineProperty(r, i, { enumerable: true, get: n[i] });
      const o = new (e.r(478500)).AsyncLocalStorage();
      function a(e2, t2) {
        const r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        const n2 = t2.url(e2);
        return { url: n2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function s(e2, t2, r2) {
        const n2 = a(e2, t2);
        return n2 ? o.run(n2, r2) : r2();
      }
      function c(e2, t2) {
        const r2 = o.getStore();
        return r2 || (e2 && t2 ? a(e2, t2) : void 0);
      }
    }, 938401, (e, t, r) => {
      const n = e.i(951615);
      Object.defineProperty(r, "__esModule", { value: true });
      const i = { handleFetch: () => l, interceptFetch: () => u, reader: () => s };
      for (const o in i) Object.defineProperty(r, o, { enumerable: true, get: i[o] });
      const a = e.r(217651);
      const s = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function c(e2, t2) {
        const { url: r2, method: i2, headers: o2, body: a2, cache: s2, credentials: c2, integrity: l2, mode: u2, redirect: d, referrer: p, referrerPolicy: h } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: i2, headers: [...Array.from(o2), ["next-test-stack", (() => {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        })()]], body: a2 ? n.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: s2, credentials: c2, integrity: l2, mode: u2, redirect: d, referrer: p, referrerPolicy: h } };
      }
      async function l(e2, t2) {
        const r2 = (0, a.getTestReqInfo)(t2, s);
        if (!r2) return e2(t2);
        const { testData: i2, proxyPort: o2 } = r2;
        const l2 = await c(i2, t2);
        const u2 = await e2(`http://localhost:${o2}`, { method: "POST", body: JSON.stringify(l2), next: { internal: true } });
        if (!u2.ok) throw Object.defineProperty(Error(`Proxy request failed: ${u2.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        const d = await u2.json();
        const { api: p } = d;
        switch (p) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
          case "fetch":
            return ((e3) => {
              const { status: t3, headers: r3, body: i3 } = e3.response;
              return new Response(i3 ? n.Buffer.from(i3, "base64") : null, { status: t3, headers: new Headers(r3) });
            })(d);
          default:
            return p;
        }
      }
      function u(t2) {
        return e.g.fetch = (e2, r2) => {
          let n2;
          return (null == r2 || null == (n2 = r2.next) ? void 0 : n2.internal) ? t2(e2, r2) : l(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 325191, (e, t, r) => {
      Object.defineProperty(r, "__esModule", { value: true });
      const n = { interceptTestApis: () => s, wrapRequestHandler: () => c };
      for (const i in n) Object.defineProperty(r, i, { enumerable: true, get: n[i] });
      const o = e.r(217651);
      const a = e.r(938401);
      function s() {
        return (0, a.interceptFetch)(e.g.fetch);
      }
      function c(e2) {
        return (t2, r2) => (0, o.withRequest)(t2, a.reader, () => e2(t2, r2));
      }
    }, 416301, (e, t, r) => {
      r.parse = (e2, t2) => {
        if ("string" !== typeof e2) throw TypeError("argument str must be a string");
        const r2 = {};
        const n2 = e2.length;
        if (n2 < 2) return r2;
        const i2 = t2?.decode || u;
        let o2 = 0;
        let a2 = 0;
        let s2 = 0;
        do {
          if (-1 === (a2 = e2.indexOf("=", o2))) break;
          if (-1 === (s2 = e2.indexOf(";", o2))) s2 = n2;
          else if (a2 > s2) {
            o2 = e2.lastIndexOf(";", a2 - 1) + 1;
            continue;
          }
          const d = c(e2, o2, a2);
          const p = l(e2, a2, d);
          const h = e2.slice(d, p);
          if (!r2.hasOwnProperty(h)) {
            let f = c(e2, a2 + 1, s2);
            let y = l(e2, s2, f);
            34 === e2.charCodeAt(f) && 34 === e2.charCodeAt(y - 1) && (f++, y--);
            const m = e2.slice(f, y);
            r2[h] = ((e3, t3) => {
              try {
                return t3(e3);
              } catch (t4) {
                return e3;
              }
            })(m, i2);
          }
          o2 = s2 + 1;
        } while (o2 < n2);
        return r2;
      }, r.serialize = (e2, t2, r2) => {
        const c2 = r2?.encode || encodeURIComponent;
        if ("function" !== typeof c2) throw TypeError("option encode is invalid");
        if (!i.test(e2)) throw TypeError("argument name is invalid");
        const l2 = c2(t2);
        if (!o.test(l2)) throw TypeError("argument val is invalid");
        let u2 = `${e2}=${l2}`;
        if (!r2) return u2;
        if (null != r2.maxAge) {
          const d = Math.floor(r2.maxAge);
          if (!Number.isFinite(d)) throw TypeError("option maxAge is invalid");
          u2 += `; Max-Age=${d}`;
        }
        if (r2.domain) {
          if (!a.test(r2.domain)) throw TypeError("option domain is invalid");
          u2 += `; Domain=${r2.domain}`;
        }
        if (r2.path) {
          if (!s.test(r2.path)) throw TypeError("option path is invalid");
          u2 += `; Path=${r2.path}`;
        }
        if (r2.expires) {
          let p;
          const h = r2.expires;
          if (p = h, "[object Date]" !== n.call(p) || Number.isNaN(h.valueOf())) throw TypeError("option expires is invalid");
          u2 += `; Expires=${h.toUTCString()}`;
        }
        if (r2.httpOnly && (u2 += "; HttpOnly"), r2.secure && (u2 += "; Secure"), r2.partitioned && (u2 += "; Partitioned"), r2.priority) switch ("string" === typeof r2.priority ? r2.priority.toLowerCase() : r2.priority) {
          case "low":
            u2 += "; Priority=Low";
            break;
          case "medium":
            u2 += "; Priority=Medium";
            break;
          case "high":
            u2 += "; Priority=High";
            break;
          default:
            throw TypeError("option priority is invalid");
        }
        if (r2.sameSite) switch ("string" === typeof r2.sameSite ? r2.sameSite.toLowerCase() : r2.sameSite) {
          case true:
          case "strict":
            u2 += "; SameSite=Strict";
            break;
          case "lax":
            u2 += "; SameSite=Lax";
            break;
          case "none":
            u2 += "; SameSite=None";
            break;
          default:
            throw TypeError("option sameSite is invalid");
        }
        return u2;
      };
      const n = Object.prototype.toString;
      const i = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
      const o = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/;
      const a = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
      const s = /^[\u0020-\u003A\u003D-\u007E]*$/;
      function c(e2, t2, r2) {
        do {
          const n2 = e2.charCodeAt(t2);
          if (32 !== n2 && 9 !== n2) return t2;
        } while (++t2 < r2);
        return r2;
      }
      function l(e2, t2, r2) {
        while (t2 > r2) {
          const n2 = e2.charCodeAt(--t2);
          if (32 !== n2 && 9 !== n2) return t2 + 1;
        }
        return r2;
      }
      function u(e2) {
        return -1 !== e2.indexOf("%") ? decodeURIComponent(e2) : e2;
      }
    }, 794459, (e, t, r) => {
      const n = { 226: function(t2, r2) {
        !((n2, i2) => {
          const o2 = "function";
          const a = "undefined";
          const s = "object";
          const c = "string";
          const l = "major";
          const u = "model";
          const d = "name";
          const p = "type";
          const h = "vendor";
          const f = "version";
          const y = "architecture";
          const m = "console";
          const g = "mobile";
          const w = "tablet";
          const b = "smarttv";
          const v = "wearable";
          const _ = "embedded";
          const E = "Amazon";
          const S = "Apple";
          const k = "ASUS";
          const x = "BlackBerry";
          const R = "Browser";
          const A = "Chrome";
          const T = "Firefox";
          const C = "Google";
          const P = "Huawei";
          const O = "Microsoft";
          const U = "Motorola";
          const I = "Opera";
          const N = "Samsung";
          const $ = "Sharp";
          const D = "Sony";
          const j = "Xiaomi";
          const H = "Zebra";
          const L = "Facebook";
          const M = "Chromium OS";
          const W = "Mac OS";
          const K = (e2, t3) => {
            const r3 = {};
            for (const n3 in e2) t3[n3] && t3[n3].length % 2 === 0 ? r3[n3] = t3[n3].concat(e2[n3]) : r3[n3] = e2[n3];
            return r3;
          };
          const q = (e2) => {
            for (let t3 = {}, r3 = 0; r3 < e2.length; r3++) t3[e2[r3].toUpperCase()] = e2[r3];
            return t3;
          };
          const B = (e2, t3) => typeof e2 === c && -1 !== J(t3).indexOf(J(e2));
          const J = (e2) => e2.toLowerCase();
          const z = (e2, t3) => {
            if (typeof e2 === c) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === a ? e2 : e2.substring(0, 350);
          };
          const F = function(e2, t3) {
            for (let r3, n3, i3, a2, c2, l2, u2 = 0; u2 < t3.length && !c2; ) {
              const d2 = t3[u2];
              const p2 = t3[u2 + 1];
              for (r3 = n3 = 0; r3 < d2.length && !c2 && d2[r3]; ) if (c2 = d2[r3++].exec(e2)) for (i3 = 0; i3 < p2.length; i3++) l2 = c2[++n3], typeof (a2 = p2[i3]) === s && a2.length > 0 ? 2 === a2.length ? typeof a2[1] === o2 ? this[a2[0]] = a2[1].call(this, l2) : this[a2[0]] = a2[1] : 3 === a2.length ? typeof a2[1] !== o2 || a2[1].exec && a2[1].test ? this[a2[0]] = l2 ? l2.replace(a2[1], a2[2]) : void 0 : this[a2[0]] = l2 ? a2[1].call(this, l2, a2[2]) : void 0 : 4 === a2.length && (this[a2[0]] = l2 ? a2[3].call(this, l2.replace(a2[1], a2[2])) : void 0) : this[a2] = l2 || void 0;
              u2 += 2;
            }
          };
          const V = (e2, t3) => {
            for (const r3 in t3) if (typeof t3[r3] === s && t3[r3].length > 0) {
              for (let n3 = 0; n3 < t3[r3].length; n3++) if (B(t3[r3][n3], e2)) return "?" === r3 ? void 0 : r3;
            } else if (B(t3[r3], e2)) return "?" === r3 ? void 0 : r3;
            return e2;
          };
          const X = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" };
          const G = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [f, [d, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [f, [d, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [d, f], [/opios[\/ ]+([\w\.]+)/i], [f, [d, `${I} Mini`]], [/\bopr\/([\w\.]+)/i], [f, [d, I]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [d, f], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [f, [d, `UC${R}`]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [f, [d, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [f, [d, "WeChat"]], [/konqueror\/([\w\.]+)/i], [f, [d, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [f, [d, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [f, [d, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[d, /(.+)/, `$1 Secure ${R}`], f], [/\bfocus\/([\w\.]+)/i], [f, [d, `${T} Focus`]], [/\bopt\/([\w\.]+)/i], [f, [d, `${I} Touch`]], [/coc_coc\w+\/([\w\.]+)/i], [f, [d, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [f, [d, "Dolphin"]], [/coast\/([\w\.]+)/i], [f, [d, `${I} Coast`]], [/miuibrowser\/([\w\.]+)/i], [f, [d, `MIUI ${R}`]], [/fxios\/([-\w\.]+)/i], [f, [d, T]], [/\bqihu|(qi?ho?o?|360)browser/i], [[d, `360 ${R}`]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[d, /(.+)/, `$1 ${R}`], f], [/(comodo_dragon)\/([\w\.]+)/i], [[d, /_/g, " "], f], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [d, f], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [d], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[d, L], f], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [d, f], [/\bgsa\/([\w\.]+) .*safari\//i], [f, [d, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [f, [d, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [f, [d, `${A} Headless`]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[d, `${A} WebView`], f], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [f, [d, `Android ${R}`]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [d, f], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [f, [d, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [f, d], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [d, [f, V, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [d, f], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[d, "Netscape"], f], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [f, [d, `${T} Reality`]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [d, f], [/(cobalt)\/([\w\.]+)/i], [d, [f, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[y, "amd64"]], [/(ia32(?=;))/i], [[y, J]], [/((?:i[346]|x)86)[;\)]/i], [[y, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[y, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[y, "armhf"]], [/windows (ce|mobile); ppc;/i], [[y, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[y, /ower/, "", J]], [/(sun4\w)[;\)]/i], [[y, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[y, J]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [u, [h, N], [p, w]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [u, [h, N], [p, g]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [u, [h, S], [p, g]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [u, [h, S], [p, w]], [/(macintosh);/i], [u, [h, S]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [u, [h, $], [p, g]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [u, [h, P], [p, w]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [u, [h, P], [p, g]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[u, /_/g, " "], [h, j], [p, g]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[u, /_/g, " "], [h, j], [p, w]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [u, [h, "OPPO"], [p, g]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [u, [h, "Vivo"], [p, g]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [u, [h, "Realme"], [p, g]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [u, [h, U], [p, g]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [u, [h, U], [p, w]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [u, [h, "LG"], [p, w]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [u, [h, "LG"], [p, g]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [u, [h, "Lenovo"], [p, w]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[u, /_/g, " "], [h, "Nokia"], [p, g]], [/(pixel c)\b/i], [u, [h, C], [p, w]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [u, [h, C], [p, g]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [u, [h, D], [p, g]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[u, "Xperia Tablet"], [h, D], [p, w]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [u, [h, "OnePlus"], [p, g]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [u, [h, E], [p, w]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[u, /(.+)/g, "Fire Phone $1"], [h, E], [p, g]], [/(playbook);[-\w\),; ]+(rim)/i], [u, h, [p, w]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [u, [h, x], [p, g]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [u, [h, k], [p, w]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [u, [h, k], [p, g]], [/(nexus 9)/i], [u, [h, "HTC"], [p, w]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [h, [u, /_/g, " "], [p, g]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [u, [h, "Acer"], [p, w]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [u, [h, "Meizu"], [p, g]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [h, u, [p, g]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [h, u, [p, w]], [/(surface duo)/i], [u, [h, O], [p, w]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [u, [h, "Fairphone"], [p, g]], [/(u304aa)/i], [u, [h, "AT&T"], [p, g]], [/\bsie-(\w*)/i], [u, [h, "Siemens"], [p, g]], [/\b(rct\w+) b/i], [u, [h, "RCA"], [p, w]], [/\b(venue[\d ]{2,7}) b/i], [u, [h, "Dell"], [p, w]], [/\b(q(?:mv|ta)\w+) b/i], [u, [h, "Verizon"], [p, w]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [u, [h, "Barnes & Noble"], [p, w]], [/\b(tm\d{3}\w+) b/i], [u, [h, "NuVision"], [p, w]], [/\b(k88) b/i], [u, [h, "ZTE"], [p, w]], [/\b(nx\d{3}j) b/i], [u, [h, "ZTE"], [p, g]], [/\b(gen\d{3}) b.+49h/i], [u, [h, "Swiss"], [p, g]], [/\b(zur\d{3}) b/i], [u, [h, "Swiss"], [p, w]], [/\b((zeki)?tb.*\b) b/i], [u, [h, "Zeki"], [p, w]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[h, "Dragon Touch"], u, [p, w]], [/\b(ns-?\w{0,9}) b/i], [u, [h, "Insignia"], [p, w]], [/\b((nxa|next)-?\w{0,9}) b/i], [u, [h, "NextBook"], [p, w]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[h, "Voice"], u, [p, g]], [/\b(lvtel\-)?(v1[12]) b/i], [[h, "LvTel"], u, [p, g]], [/\b(ph-1) /i], [u, [h, "Essential"], [p, g]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [u, [h, "Envizen"], [p, w]], [/\b(trio[-\w\. ]+) b/i], [u, [h, "MachSpeed"], [p, w]], [/\btu_(1491) b/i], [u, [h, "Rotor"], [p, w]], [/(shield[\w ]+) b/i], [u, [h, "Nvidia"], [p, w]], [/(sprint) (\w+)/i], [h, u, [p, g]], [/(kin\.[onetw]{3})/i], [[u, /\./g, " "], [h, O], [p, g]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [u, [h, H], [p, w]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [u, [h, H], [p, g]], [/smart-tv.+(samsung)/i], [h, [p, b]], [/hbbtv.+maple;(\d+)/i], [[u, /^/, "SmartTV"], [h, N], [p, b]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[h, "LG"], [p, b]], [/(apple) ?tv/i], [h, [u, `${S} TV`], [p, b]], [/crkey/i], [[u, `${A}cast`], [h, C], [p, b]], [/droid.+aft(\w)( bui|\))/i], [u, [h, E], [p, b]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [u, [h, $], [p, b]], [/(bravia[\w ]+)( bui|\))/i], [u, [h, D], [p, b]], [/(mitv-\w{5}) bui/i], [u, [h, j], [p, b]], [/Hbbtv.*(technisat) (.*);/i], [h, u, [p, b]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[h, z], [u, z], [p, b]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[p, b]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [h, u, [p, m]], [/droid.+; (shield) bui/i], [u, [h, "Nvidia"], [p, m]], [/(playstation [345portablevi]+)/i], [u, [h, D], [p, m]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [u, [h, O], [p, m]], [/((pebble))app/i], [h, u, [p, v]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [u, [h, S], [p, v]], [/droid.+; (glass) \d/i], [u, [h, C], [p, v]], [/droid.+; (wt63?0{2,3})\)/i], [u, [h, H], [p, v]], [/(quest( 2| pro)?)/i], [u, [h, L], [p, v]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [h, [p, _]], [/(aeobc)\b/i], [u, [h, E], [p, _]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [u, [p, g]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [u, [p, w]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[p, w]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[p, g]], [/(android[-\w\. ]{0,9});.+buil/i], [u, [h, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [f, [d, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [f, [d, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [d, f], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [f, d]], os: [[/microsoft (windows) (vista|xp)/i], [d, f], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [d, [f, V, X]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[d, "Windows"], [f, V, X]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[f, /_/g, "."], [d, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[d, W], [f, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [f, d], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [d, f], [/\(bb(10);/i], [f, [d, x]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [f, [d, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [f, [d, `${T} OS`]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [f, [d, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [f, [d, "watchOS"]], [/crkey\/([\d\.]+)/i], [f, [d, `${A}cast`]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[d, M], f], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [d, f], [/(sunos) ?([\w\.\d]*)/i], [[d, "Solaris"], f], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [d, f]] };
          const Y = function(e2, t3) {
            if (typeof e2 === s && (t3 = e2, e2 = void 0), !(this instanceof Y)) return new Y(e2, t3).getResult();
            const r3 = typeof n2 !== a && n2.navigator ? n2.navigator : void 0;
            let i3 = e2 || (r3?.userAgent ? r3.userAgent : "");
            const m2 = r3?.userAgentData ? r3.userAgentData : void 0;
            const b2 = t3 ? K(G, t3) : G;
            const v2 = r3 && r3.userAgent === i3;
            return this.getBrowser = () => {
              let e3;
              const t4 = {};
              return t4[d] = void 0, t4[f] = void 0, F.call(t4, i3, b2.browser), t4[l] = typeof (e3 = t4[f]) === c ? e3.replace(/[^\d\.]/g, "").split(".")[0] : void 0, v2 && r3 && r3.brave && typeof r3.brave.isBrave === o2 && (t4[d] = "Brave"), t4;
            }, this.getCPU = () => {
              const e3 = {};
              return e3[y] = void 0, F.call(e3, i3, b2.cpu), e3;
            }, this.getDevice = () => {
              const e3 = {};
              return e3[h] = void 0, e3[u] = void 0, e3[p] = void 0, F.call(e3, i3, b2.device), v2 && !e3[p] && m2 && m2.mobile && (e3[p] = g), v2 && "Macintosh" === e3[u] && r3 && typeof r3.standalone !== a && r3.maxTouchPoints && r3.maxTouchPoints > 2 && (e3[u] = "iPad", e3[p] = w), e3;
            }, this.getEngine = () => {
              const e3 = {};
              return e3[d] = void 0, e3[f] = void 0, F.call(e3, i3, b2.engine), e3;
            }, this.getOS = () => {
              const e3 = {};
              return e3[d] = void 0, e3[f] = void 0, F.call(e3, i3, b2.os), v2 && !e3[d] && m2 && "Unknown" !== m2.platform && (e3[d] = m2.platform.replace(/chrome os/i, M).replace(/macos/i, W)), e3;
            }, this.getResult = function() {
              return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
            }, this.getUA = () => i3, this.setUA = function(e3) {
              return i3 = typeof e3 === c && e3.length > 350 ? z(e3, 350) : e3, this;
            }, this.setUA(i3), this;
          };
          if (Y.VERSION = "1.0.35", Y.BROWSER = q([d, f, l]), Y.CPU = q([y]), Y.DEVICE = q([u, h, p, m, g, b, w, v, _]), Y.ENGINE = Y.OS = q([d, f]), typeof r2 !== a) t2.exports && (r2 = t2.exports = Y), r2.UAParser = Y;
          else if (typeof define === o2 && define.amd) e.r, void 0 !== Y && e.v(Y);
          else typeof n2 !== a && (n2.UAParser = Y);
          const Q = typeof n2 !== a && (n2.jQuery || n2.Zepto);
          if (Q && !Q.ua) {
            const Z = new Y();
            Q.ua = Z.getResult(), Q.ua.get = () => Z.getUA(), Q.ua.set = (e2) => {
              Z.setUA(e2);
              const t3 = Z.getResult();
              for (const r3 in t3) Q.ua[r3] = t3[r3];
            };
          }
        })(this);
      } };
      const i = {};
      function o(e2) {
        const t2 = i[e2];
        if (void 0 !== t2) return t2.exports;
        const r2 = i[e2] = { exports: {} };
        let a = true;
        try {
          n[e2].call(r2.exports, r2, r2.exports, o), a = false;
        } finally {
          a && delete i[e2];
        }
        return r2.exports;
      }
      o.ab = "/ROOT/node_modules/.bun/next@16.0.7+abd6e86da31e620f/node_modules/next/dist/compiled/ua-parser-js/", t.exports = o(226);
    }, 969861, (e, t, r) => {
      const n = { H: null, A: null };
      function i(e2) {
        let t2 = `https://react.dev/errors/${e2}`;
        if (1 < arguments.length) {
          t2 += `?args[]=${encodeURIComponent(arguments[1])}`;
          for (let r2 = 2; r2 < arguments.length; r2++) t2 += `&args[]=${encodeURIComponent(arguments[r2])}`;
        }
        return `Minified React error #${e2}; visit ${t2} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`;
      }
      const o = Array.isArray;
      function a() {
      }
      const s = Symbol.for("react.transitional.element");
      const c = Symbol.for("react.portal");
      const l = Symbol.for("react.fragment");
      const u = Symbol.for("react.strict_mode");
      const d = Symbol.for("react.profiler");
      const p = Symbol.for("react.forward_ref");
      const h = Symbol.for("react.suspense");
      const f = Symbol.for("react.memo");
      const y = Symbol.for("react.lazy");
      const m = Symbol.for("react.activity");
      const g = Symbol.for("react.view_transition");
      const w = Symbol.iterator;
      const b = Object.prototype.hasOwnProperty;
      const v = Object.assign;
      function _(e2, t2, r2) {
        const n2 = r2.ref;
        return { $$typeof: s, type: e2, key: t2, ref: void 0 !== n2 ? n2 : null, props: r2 };
      }
      function E(e2) {
        return "object" === typeof e2 && null !== e2 && e2.$$typeof === s;
      }
      const S = /\/+/g;
      function k(e2, t2) {
        let r2;
        let n2;
        return "object" === typeof e2 && null !== e2 && null != e2.key ? (r2 = `${e2.key}`, n2 = { "=": "=0", ":": "=2" }, `$${r2.replace(/[=:]/g, (e3) => n2[e3])}`) : t2.toString(36);
      }
      function x(e2, t2, r2) {
        if (null == e2) return e2;
        const n2 = [];
        let l2 = 0;
        return !function e3(t3, r3, n3, l3, u2) {
          let d2;
          let p2;
          let h2;
          let f2 = typeof t3;
          ("undefined" === f2 || "boolean" === f2) && (t3 = null);
          let m2 = false;
          if (null === t3) m2 = true;
          else switch (f2) {
            case "bigint":
            case "string":
            case "number":
              m2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case s:
                case c:
                  m2 = true;
                  break;
                case y:
                  return e3((m2 = t3._init)(t3._payload), r3, n3, l3, u2);
              }
          }
          if (m2) return u2 = u2(t3), m2 = "" === l3 ? `.${k(t3, 0)}` : l3, o(u2) ? (n3 = "", null != m2 && (n3 = `${m2.replace(S, "$&/")}/`), e3(u2, r3, n3, "", (e4) => e4)) : null != u2 && (E(u2) && (d2 = u2, p2 = n3 + (null == u2.key || t3 && t3.key === u2.key ? "" : `${(`${u2.key}`).replace(S, "$&/")}/`) + m2, u2 = _(d2.type, p2, d2.props)), r3.push(u2)), 1;
          m2 = 0;
          const g2 = "" === l3 ? "." : `${l3}:`;
          if (o(t3)) for (let b2 = 0; b2 < t3.length; b2++) f2 = g2 + k(l3 = t3[b2], b2), m2 += e3(l3, r3, n3, f2, u2);
          else if ("function" === typeof (b2 = null === (h2 = t3) || "object" !== typeof h2 ? null : "function" === typeof (h2 = w && h2[w] || h2["@@iterator"]) ? h2 : null)) for (t3 = b2.call(t3), b2 = 0; !(l3 = t3.next()).done; ) f2 = g2 + k(l3 = l3.value, b2++), m2 += e3(l3, r3, n3, f2, u2);
          else if ("object" === f2) {
            if ("function" === typeof t3.then) return e3(((e4) => {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" === typeof e4.status ? e4.then(a, a) : (e4.status = "pending", e4.then((t4) => {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, (t4) => {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            })(t3), r3, n3, l3, u2);
            throw Error(i(31, "[object Object]" === (r3 = String(t3)) ? `object with keys {${Object.keys(t3).join(", ")}}` : r3));
          }
          return m2;
        }(e2, n2, "", "", (e3) => t2.call(r2, e3, l2++)), n2;
      }
      function R(e2) {
        if (-1 === e2._status) {
          let t2 = e2._result;
          (t2 = t2()).then((t3) => {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = t3);
          }, (t3) => {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = t3);
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function A() {
        return /* @__PURE__ */ new WeakMap();
      }
      function T() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      r.Activity = m, r.Children = { map: x, forEach: (e2, t2, r2) => {
        x(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: (e2) => {
        let t2 = 0;
        return x(e2, () => {
          t2++;
        }), t2;
      }, toArray: (e2) => x(e2, (e3) => e3) || [], only: (e2) => {
        if (!E(e2)) throw Error(i(143));
        return e2;
      } }, r.Fragment = l, r.Profiler = d, r.StrictMode = u, r.Suspense = h, r.ViewTransition = g, r.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = n, r.cache = (e2) => () => {
          let t2 = n.A;
          if (!t2) return e2.apply(null, arguments);
          let r2 = t2.getCacheForType(A);
          void 0 === (t2 = r2.get(e2)) && (t2 = T(), r2.set(e2, t2)), r2 = 0;
          for (const i2 = arguments.length; r2 < i2; r2++) {
            const o2 = arguments[r2];
            if ("function" === typeof o2 || "object" === typeof o2 && null !== o2) {
              let a2 = t2.o;
              null === a2 && (t2.o = a2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = a2.get(o2)) && (t2 = T(), a2.set(o2, t2));
            } else null === (a2 = t2.p) && (t2.p = a2 = /* @__PURE__ */ new Map()), void 0 === (t2 = a2.get(o2)) && (t2 = T(), a2.set(o2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            const s2 = e2.apply(null, arguments);
            return (r2 = t2).s = 1, r2.v = s2;
          } catch (e3) {
            throw (s2 = t2).s = 2, s2.v = e3, e3;
          }
        }, r.cacheSignal = () => {
        const e2 = n.A;
        return e2 ? e2.cacheSignal() : null;
      }, r.captureOwnerStack = () => null, r.cloneElement = (e2, t2, r2) => {
        if (null == e2) throw Error(i(267, e2));
        const n2 = v({}, e2.props);
        let o2 = e2.key;
        if (null != t2) for (a2 in void 0 !== t2.key && (o2 = `${t2.key}`), t2) b.call(t2, a2) && "key" !== a2 && "__self" !== a2 && "__source" !== a2 && ("ref" !== a2 || void 0 !== t2.ref) && (n2[a2] = t2[a2]);
        let a2 = arguments.length - 2;
        if (1 === a2) n2.children = r2;
        else if (1 < a2) {
          for (let s2 = Array(a2), c2 = 0; c2 < a2; c2++) s2[c2] = arguments[c2 + 2];
          n2.children = s2;
        }
        return _(e2.type, o2, n2);
      }, r.createElement = (e2, t2, r2) => {
        let n2;
        const i2 = {};
        let o2 = null;
        if (null != t2) for (n2 in void 0 !== t2.key && (o2 = `${t2.key}`), t2) b.call(t2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (i2[n2] = t2[n2]);
        let a2 = arguments.length - 2;
        if (1 === a2) i2.children = r2;
        else if (1 < a2) {
          for (let s2 = Array(a2), c2 = 0; c2 < a2; c2++) s2[c2] = arguments[c2 + 2];
          i2.children = s2;
        }
        if (e2?.defaultProps) for (n2 in a2 = e2.defaultProps) void 0 === i2[n2] && (i2[n2] = a2[n2]);
        return _(e2, o2, i2);
      }, r.createRef = () => ({ current: null }), r.forwardRef = (e2) => ({ $$typeof: p, render: e2 }), r.isValidElement = E, r.lazy = (e2) => ({ $$typeof: y, _payload: { _status: -1, _result: e2 }, _init: R }), r.memo = (e2, t2) => ({ $$typeof: f, type: e2, compare: void 0 === t2 ? null : t2 }), r.use = (e2) => n.H.use(e2), r.useCallback = (e2, t2) => n.H.useCallback(e2, t2), r.useDebugValue = () => {
      }, r.useId = () => n.H.useId(), r.useMemo = (e2, t2) => n.H.useMemo(e2, t2), r.version = "19.3.0-canary-52684925-20251110";
    }, 690896, (e, t, r) => {
      t.exports = e.r(969861);
    }, 792969, (e) => {
      const t = (0, e.i(100151).createAsyncLocalStorage)();
      e.s([], 266135), e.i(266135), e.s(["actionAsyncStorage", 0, t], 792969);
    }, 869397, 26086, 257145, 435667, 581175, 724200, 844918, 27362, 942137, 567753, 837924, 860097, 604911, 988901, 293112, 128767, (e) => {
      const t = "next-router-prefetch";
      const r = ["rsc", "next-router-state-tree", t, "next-hmr-refresh", "next-router-segment-prefetch"];
      e.s(["FLIGHT_HEADERS", 0, r, "NEXT_HMR_REFRESH_HASH_COOKIE", 0, "__next_hmr_refresh_hash__", "NEXT_REWRITTEN_PATH_HEADER", 0, "x-nextjs-rewritten-path", "NEXT_REWRITTEN_QUERY_HEADER", 0, "x-nextjs-rewritten-query", "NEXT_ROUTER_PREFETCH_HEADER", 0, t, "NEXT_RSC_UNION_QUERY", 0, "_rsc", "RSC_HEADER", 0, "rsc"], 869397);
      let n;
      let i;
      let o;
      const a = e.i(100151);
      const s = (0, a.createAsyncLocalStorage)();
      e.s([], 26086), e.s(["workAsyncStorage", 0, s], 257145);
      const c = (0, a.createAsyncLocalStorage)();
      class l extends Error {
        constructor(e2, t2) {
          super(`Invariant: ${e2.endsWith(".") ? e2 : `${e2}.`} This is a bug in Next.js.`, t2), this.name = "InvariantError";
        }
      }
      function u(e2) {
        throw Object.defineProperty(Error(`\`${e2}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E251", enumerable: false, configurable: true });
      }
      function d(e2, t2) {
        if (e2.isDraftMode) switch (t2.type) {
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "prerender-runtime":
          case "request":
            return t2.draftMode;
        }
      }
      function p(e2) {
        switch (e2.type) {
          case "prerender-runtime":
          case "private-cache":
            return e2.runtimeStagePromise;
          case "prerender":
          case "prerender-client":
          case "prerender-ppr":
          case "prerender-legacy":
          case "request":
          case "cache":
          case "unstable-cache":
            return null;
          default:
            return e2;
        }
      }
      e.s(["InvariantError", () => l], 435667), e.s(["getDraftModeProviderForCacheScope", () => d, "getRuntimeStagePromise", () => p, "throwForMissingRequestStore", () => u], 581175), e.s(["workUnitAsyncStorage", 0, c], 724200);
      const h = e.i(690896);
      const f = "DYNAMIC_SERVER_USAGE";
      class y extends Error {
        constructor(e2) {
          super(`Dynamic server usage: ${e2}`), this.description = e2, this.digest = f;
        }
      }
      function m(e2) {
        return "object" === typeof e2 && null !== e2 && "digest" in e2 && "string" === typeof e2.digest && e2.digest === f;
      }
      e.s(["DynamicServerError", () => y, "isDynamicServerError", () => m], 844918);
      class g extends Error {
        constructor(...e2) {
          super(...e2), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
      function w(e2) {
        return "object" === typeof e2 && null !== e2 && "digest" in e2 && e2.digest === b;
      }
      e.s(["StaticGenBailoutError", () => g], 27362);
      const b = "HANGING_PROMISE_REJECTION";
      class v extends Error {
        constructor(e2, t2) {
          super(`During prerendering, ${t2} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${t2} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${e2}".`), this.route = e2, this.expression = t2, this.digest = b;
        }
      }
      const _ = /* @__PURE__ */ new WeakMap();
      function E(e2, t2, r2) {
        if (e2.aborted) return Promise.reject(new v(t2, r2));
        {
          const n2 = new Promise((n3, i2) => {
            const o2 = i2.bind(null, new v(t2, r2));
            const a2 = _.get(e2);
            if (a2) a2.push(o2);
            else {
              const t3 = [o2];
              _.set(e2, t3), e2.addEventListener("abort", () => {
                for (let e3 = 0; e3 < t3.length; e3++) t3[e3]();
              }, { once: true });
            }
          });
          return n2.catch(S), n2;
        }
      }
      function S() {
      }
      function k(e2, t2, r2) {
        return t2.stagedRendering ? t2.stagedRendering.delayUntilStage(r2, void 0, e2) : new Promise((t3) => {
          setTimeout(() => {
            t3(e2);
          }, 0);
        });
      }
      e.s(["isHangingPromiseRejectionError", () => w, "makeDevtoolsIOAwarePromise", () => k, "makeHangingPromise", () => E], 942137);
      const x = "BAILOUT_TO_CLIENT_SIDE_RENDERING";
      class R extends Error {
        constructor(e2) {
          super(`Bail out to client-side rendering: ${e2}`), this.reason = e2, this.digest = x;
        }
      }
      function A(e2) {
        return "object" === typeof e2 && null !== e2 && "digest" in e2 && e2.digest === x;
      }
      e.s(["BailoutToCSRError", () => R, "isBailoutToCSRError", () => A], 567753);
      const T = ((n = {})[n.Static = 1] = "Static", n[n.Runtime = 2] = "Runtime", n[n.Dynamic = 3] = "Dynamic", n);
      e.s(["RenderStage", () => T], 837924);
      const C = "function" === typeof h.default.unstable_postpone;
      function P(e2, t2, r2) {
        const n2 = Object.defineProperty(new y(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
        throw r2.revalidate = 0, t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = n2.stack, n2;
      }
      function O(e2) {
        switch (e2.type) {
          case "cache":
          case "unstable-cache":
          case "private-cache":
            return;
        }
      }
      function U(e2, t2, r2, n2) {
        if (false === n2.controller.signal.aborted) {
          let i2;
          let o2;
          i2 = H(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`), n2.controller.abort(i2), (o2 = n2.dynamicTracking) && o2.dynamicAccesses.push({ stack: o2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 });
          const a2 = n2.dynamicTracking;
          a2 && null === a2.syncDynamicErrorWithStack && (a2.syncDynamicErrorWithStack = r2);
        }
        throw H(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`);
      }
      function I(e2, t2, r2) {
        (() => {
          if (!C) throw Object.defineProperty(Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E224", enumerable: false, configurable: true });
        })(), r2?.dynamicAccesses.push({ stack: r2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 }), h.default.unstable_postpone(N(e2, t2));
      }
      function N(e2, t2) {
        return `Route ${e2} needs to bail out of prerendering at this point because it used ${t2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      function $(e2) {
        return "object" === typeof e2 && null !== e2 && "string" === typeof e2.message && D(e2.message);
      }
      function D(e2) {
        return e2.includes("needs to bail out of prerendering at this point because it used") && e2.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }
      if (false === D(N("%%%", "^^^"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      const j = "NEXT_PRERENDER_INTERRUPTED";
      function H(e2) {
        const t2 = Object.defineProperty(Error(e2), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        return t2.digest = j, t2;
      }
      function L(e2) {
        return "object" === typeof e2 && null !== e2 && e2.digest === j && "name" in e2 && "message" in e2 && e2 instanceof Error;
      }
      function M(e2, t2) {
        return e2.runtimeStagePromise ? e2.runtimeStagePromise.then(() => t2) : t2;
      }
      /\n\s+at Suspense \(<anonymous>\)(?:(?!\n\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \(<anonymous>\))[\s\S])*?\n\s+at __next_root_layout_boundary__ \([^\n]*\)/, /\n\s+at __next_metadata_boundary__[\n\s]/, /\n\s+at __next_viewport_boundary__[\n\s]/, /\n\s+at __next_outlet_boundary__[\n\s]/, e.s(["abortAndThrowOnSynchronousRequestDataAccess", () => U, "delayUntilRuntimeStage", () => M, "isDynamicPostpone", () => $, "isPrerenderInterruptedError", () => L, "postponeWithTracking", () => I, "throwToInterruptStaticGeneration", () => P, "trackDynamicDataInDynamicRender", () => O], 860097);
      const W = ((i = {})[i.SeeOther = 303] = "SeeOther", i[i.TemporaryRedirect = 307] = "TemporaryRedirect", i[i.PermanentRedirect = 308] = "PermanentRedirect", i);
      e.s(["RedirectStatusCode", () => W], 604911);
      const K = "NEXT_REDIRECT";
      const q = ((o = {}).push = "push", o.replace = "replace", o);
      function B(e2) {
        if ("object" !== typeof e2 || null === e2 || !("digest" in e2) || "string" !== typeof e2.digest) return false;
        const t2 = e2.digest.split(";");
        const [r2, n2] = t2;
        const i2 = t2.slice(2, -2).join(";");
        const o2 = Number(t2.at(-2));
        return r2 === K && ("replace" === n2 || "push" === n2) && "string" === typeof i2 && !Number.isNaN(o2) && o2 in W;
      }
      e.s(["REDIRECT_ERROR_CODE", 0, K, "RedirectType", () => q, "isRedirectError", () => B], 988901);
      const J = new Set(Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 }));
      const z = "NEXT_HTTP_ERROR_FALLBACK";
      function F(e2) {
        if ("object" !== typeof e2 || null === e2 || !("digest" in e2) || "string" !== typeof e2.digest) return false;
        const [t2, r2] = e2.digest.split(";");
        return t2 === z && J.has(Number(r2));
      }
      function V(e2) {
        return B(e2) || F(e2);
      }
      e.s(["HTTP_ERROR_FALLBACK_ERROR_CODE", 0, z, "isHTTPAccessFallbackError", () => F], 293112), e.s(["isNextRouterError", () => V], 128767);
    }, 673129, (e) => {
      const t = e.i(942137);
      const r = Symbol.for("react.postpone");
      const n = e.i(567753);
      const i = e.i(128767);
      const o = e.i(860097);
      const a = e.i(844918);
      e.s(["unstable_rethrow", () => function e2(s) {
        if ((0, i.isNextRouterError)(s) || (0, n.isBailoutToCSRError)(s) || (0, a.isDynamicServerError)(s) || (0, o.isDynamicPostpone)(s) || "object" === typeof s && null !== s && s.$$typeof === r || (0, t.isHangingPromiseRejectionError)(s) || (0, o.isPrerenderInterruptedError)(s)) throw s;
        s instanceof Error && "cause" in s && e2(s.cause);
      }], 673129);
    }, 57813, (e) => {
      let t;
      let r;
      let n;
      let i;
      let o;
      let a;
      let s;
      async function c() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      let l = null;
      async function u() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        l || (l = c());
        const e10 = await l;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function d(...e10) {
        const t10 = await c();
        try {
          let r10;
          await (null == t10 || null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let p = null;
      function h() {
        return p || (p = u()), p;
      }
      function f(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: (e10) => {
          const t10 = new Proxy(() => {
          }, { get(t11, r10) {
            if ("then" === r10) return {};
            throw Object.defineProperty(Error(f(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(f(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(r10, n10, i10) {
            if ("function" === typeof i10[0]) return i10[0](t10);
            throw Object.defineProperty(Error(f(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => t10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      h();
      class y extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class m extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class g extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      const w = "_N_T_";
      const b = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function v(e10) {
        let t10;
        let r10;
        let n10;
        let i10;
        let o10;
        const a10 = [];
        let s2 = 0;
        function c2() {
          while (s2 < e10.length && /\s/.test(e10.charAt(s2))) s2 += 1;
          return s2 < e10.length;
        }
        while (s2 < e10.length) {
          for (t10 = s2, o10 = false; c2(); ) if ("," === (r10 = e10.charAt(s2))) {
            for (n10 = s2, s2 += 1, c2(), i10 = s2; s2 < e10.length && "=" !== (r10 = e10.charAt(s2)) && ";" !== r10 && "," !== r10; ) s2 += 1;
            s2 < e10.length && "=" === e10.charAt(s2) ? (o10 = true, s2 = i10, a10.push(e10.substring(t10, n10)), t10 = s2) : s2 = n10 + 1;
          } else s2 += 1;
          (!o10 || s2 >= e10.length) && a10.push(e10.substring(t10, e10.length));
        }
        return a10;
      }
      function _(e10) {
        const t10 = {};
        const r10 = [];
        if (e10) for (const [n10, i10] of e10.entries()) "set-cookie" === n10.toLowerCase() ? (r10.push(...v(i10)), t10[n10] = 1 === r10.length ? r10[0] : r10) : t10[n10] = i10;
        return t10;
      }
      function E(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...b, GROUP: { builtinReact: [b.reactServerComponents, b.actionBrowser], serverOnly: [b.reactServerComponents, b.actionBrowser, b.instrument, b.middleware], neutralTarget: [b.apiNode, b.apiEdge], clientOnly: [b.serverSideRendering, b.appPagesBrowser], bundled: [b.reactServerComponents, b.actionBrowser, b.serverSideRendering, b.appPagesBrowser, b.shared, b.instrument, b.middleware], appPages: [b.reactServerComponents, b.serverSideRendering, b.appPagesBrowser, b.actionBrowser] } });
      const S = Symbol("response");
      const k = Symbol("passThrough");
      const x = Symbol("waitUntil");
      class R {
        constructor(e10, t10) {
          this[k] = false, this[x] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[S] || (this[S] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[k] = true;
        }
        waitUntil(e10) {
          if ("external" === this[x].kind) return (0, this[x].function)(e10);
          this[x].promises.push(e10);
        }
      }
      class A extends R {
        constructor(e10) {
          let t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new y({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new y({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function T(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function C(e10) {
        const t10 = e10.indexOf("#");
        const r10 = e10.indexOf("?");
        const n10 = r10 > -1 && (t10 < 0 || r10 < t10);
        return n10 || t10 > -1 ? { pathname: e10.substring(0, n10 ? r10 : t10), query: n10 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function P(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        const { pathname: r10, query: n10, hash: i10 } = C(e10);
        return `${t10}${r10}${n10}${i10}`;
      }
      function O(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        const { pathname: r10, query: n10, hash: i10 } = C(e10);
        return `${r10}${t10}${n10}${i10}`;
      }
      function U(e10, t10) {
        if ("string" !== typeof e10) return false;
        const { pathname: r10 } = C(e10);
        return r10 === t10 || r10.startsWith(`${t10}/`);
      }
      const I = /* @__PURE__ */ new WeakMap();
      function N(e10, t10) {
        let r10;
        if (!t10) return { pathname: e10 };
        let n10 = I.get(t10);
        n10 || (n10 = t10.map((e11) => e11.toLowerCase()), I.set(t10, n10));
        const i10 = e10.split("/", 2);
        if (!i10[1]) return { pathname: e10 };
        const o10 = i10[1].toLowerCase();
        const a10 = n10.indexOf(o10);
        return a10 < 0 ? { pathname: e10 } : (r10 = t10[a10], { pathname: e10 = e10.slice(r10.length + 1) || "/", detectedLocale: r10 });
      }
      const $ = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function D(e10, t10) {
        return new URL(String(e10).replace($, "localhost"), t10 && String(t10).replace($, "localhost"));
      }
      const j = Symbol("NextURLInternal");
      class H {
        constructor(e10, t10, r10) {
          let n10;
          let i10;
          "object" === typeof t10 && "pathname" in t10 || "string" === typeof t10 ? (n10 = t10, i10 = r10 || {}) : i10 = r10 || t10 || {}, this[j] = { url: D(e10, n10 ?? i10.base), options: i10, basePath: "" }, this.analyze();
        }
        analyze() {
          let e10;
          let t10;
          let r10;
          let n10;
          let i10;
          const o10 = ((e11, t11) => {
            const { basePath: r11, i18n: n11, trailingSlash: i11 } = t11.nextConfig ?? {};
            const o11 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : i11 };
            r11 && U(o11.pathname, r11) && (o11.pathname = ((e12, t12) => {
              if (!U(e12, t12)) return e12;
              const r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : `/${r12}`;
            })(o11.pathname, r11), o11.basePath = r11);
            let a11 = o11.pathname;
            if (o11.pathname.startsWith("/_next/data/") && o11.pathname.endsWith(".json")) {
              const e12 = o11.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              o11.buildId = e12[0], a11 = "index" !== e12[1] ? `/${e12.slice(1).join("/")}` : "/", true === t11.parseData && (o11.pathname = a11);
            }
            if (n11) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(o11.pathname) : N(o11.pathname, n11.locales);
              o11.locale = e12.detectedLocale, o11.pathname = e12.pathname ?? o11.pathname, !e12.detectedLocale && o11.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(a11) : N(a11, n11.locales)).detectedLocale && (o11.locale = e12.detectedLocale);
            }
            return o11;
          })(this[j].url.pathname, { nextConfig: this[j].options.nextConfig, parseData: true, i18nProvider: this[j].options.i18nProvider });
          const a10 = ((e11, t11) => {
            let r11;
            if (t11?.host && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          })(this[j].url, this[j].options.headers);
          this[j].domainLocale = this[j].options.i18nProvider ? this[j].options.i18nProvider.detectDomainLocale(a10) : ((e11, t11, r11) => {
            if (e11) {
              for (const n11 of (r11 && (r11 = r11.toLowerCase()), e11)) if (t11 === n11.domain?.split(":", 1)[0].toLowerCase() || r11 === n11.defaultLocale.toLowerCase() || n11.locales?.some((e12) => e12.toLowerCase() === r11)) return n11;
            }
          })(null == (t10 = this[j].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, a10);
          const s2 = (null == (r10 = this[j].domainLocale) ? void 0 : r10.defaultLocale) || (null == (i10 = this[j].options.nextConfig) || null == (n10 = i10.i18n) ? void 0 : n10.defaultLocale);
          this[j].url.pathname = o10.pathname, this[j].defaultLocale = s2, this[j].basePath = o10.basePath ?? "", this[j].buildId = o10.buildId, this[j].locale = o10.locale ?? s2, this[j].trailingSlash = o10.trailingSlash;
        }
        formatPathname() {
          let e10;
          let t10;
          return t10 = ((e11, t11, r10, n10) => {
            if (!t11 || t11 === r10) return e11;
            const i10 = e11.toLowerCase();
            return !n10 && (U(i10, "/api") || U(i10, `/${t11.toLowerCase()}`)) ? e11 : P(e11, `/${t11}`);
          })((e10 = { basePath: this[j].basePath, buildId: this[j].buildId, defaultLocale: this[j].options.forceLocale ? void 0 : this[j].defaultLocale, locale: this[j].locale, pathname: this[j].url.pathname, trailingSlash: this[j].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = T(t10)), e10.buildId && (t10 = O(P(t10, `/_next/data/${e10.buildId}`), "/" === e10.pathname ? "index.json" : ".json")), t10 = P(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : O(t10, "/") : T(t10);
        }
        formatSearch() {
          return this[j].url.search;
        }
        get buildId() {
          return this[j].buildId;
        }
        set buildId(e10) {
          this[j].buildId = e10;
        }
        get locale() {
          return this[j].locale ?? "";
        }
        set locale(e10) {
          let t10;
          let r10;
          if (!this[j].locale || !(null == (r10 = this[j].options.nextConfig) || null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[j].locale = e10;
        }
        get defaultLocale() {
          return this[j].defaultLocale;
        }
        get domainLocale() {
          return this[j].domainLocale;
        }
        get searchParams() {
          return this[j].url.searchParams;
        }
        get host() {
          return this[j].url.host;
        }
        set host(e10) {
          this[j].url.host = e10;
        }
        get hostname() {
          return this[j].url.hostname;
        }
        set hostname(e10) {
          this[j].url.hostname = e10;
        }
        get port() {
          return this[j].url.port;
        }
        set port(e10) {
          this[j].url.port = e10;
        }
        get protocol() {
          return this[j].url.protocol;
        }
        set protocol(e10) {
          this[j].url.protocol = e10;
        }
        get href() {
          const e10 = this.formatPathname();
          const t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[j].url = D(e10), this.analyze();
        }
        get origin() {
          return this[j].url.origin;
        }
        get pathname() {
          return this[j].url.pathname;
        }
        set pathname(e10) {
          this[j].url.pathname = e10;
        }
        get hash() {
          return this[j].url.hash;
        }
        set hash(e10) {
          this[j].url.hash = e10;
        }
        get search() {
          return this[j].url.search;
        }
        set search(e10) {
          this[j].url.search = e10;
        }
        get password() {
          return this[j].url.password;
        }
        set password(e10) {
          this[j].url.password = e10;
        }
        get username() {
          return this[j].url.username;
        }
        set username(e10) {
          this[j].url.username = e10;
        }
        get basePath() {
          return this[j].basePath;
        }
        set basePath(e10) {
          this[j].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new H(String(this), this[j].options);
        }
      }
      const L = e.i(382523);
      const M = Symbol("internal request");
      class W extends Request {
        constructor(e10, t10 = {}) {
          const r10 = "string" !== typeof e10 && "url" in e10 ? e10.url : String(e10);
          E(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          const n10 = new H(r10, { headers: _(this.headers), nextConfig: t10.nextConfig });
          this[M] = { cookies: new L.RequestCookies(this.headers), nextUrl: n10, url: n10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[M].cookies;
        }
        get nextUrl() {
          return this[M].nextUrl;
        }
        get page() {
          throw new m();
        }
        get ua() {
          throw new g();
        }
        get url() {
          return this[M].url;
        }
      }
      class K {
        static get(e10, t10, r10) {
          const n10 = Reflect.get(e10, t10, r10);
          return "function" === typeof n10 ? n10.bind(e10) : n10;
        }
        static set(e10, t10, r10, n10) {
          return Reflect.set(e10, t10, r10, n10);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      const q = Symbol("internal response");
      const B = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function J(e10, t10) {
        let r10;
        if (null == e10 || null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          const r11 = [];
          for (const [n10, i10] of e10.request.headers) t10.set(`x-middleware-request-${n10}`, i10), r11.push(n10);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class z extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          const r10 = this.headers;
          const n10 = new Proxy(new L.ResponseCookies(r10), { get(e11, n11, i10) {
            switch (n11) {
              case "delete":
              case "set":
                return (...i11) => {
                  const o10 = Reflect.apply(e11[n11], e11, i11);
                  const a10 = new Headers(r10);
                  return o10 instanceof L.ResponseCookies && r10.set("x-middleware-set-cookie", o10.getAll().map((e12) => (0, L.stringifyCookie)(e12)).join(",")), J(t10, a10), o10;
                };
              default:
                return K.get(e11, n11, i10);
            }
          } });
          this[q] = { cookies: n10, url: t10.url ? new H(t10.url, { headers: _(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[q].cookies;
        }
        static json(e10, t10) {
          const r10 = Response.json(e10, t10);
          return new z(r10.body, r10);
        }
        static redirect(e10, t10) {
          const r10 = "number" === typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!B.has(r10)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          const n10 = "object" === typeof t10 ? t10 : {};
          const i10 = new Headers(null == n10 ? void 0 : n10.headers);
          return i10.set("Location", E(e10)), new z(null, { ...n10, headers: i10, status: r10 });
        }
        static rewrite(e10, t10) {
          const r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", E(e10)), J(t10, r10), new z(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          const t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), J(e10, t10), new z(null, { ...e10, headers: t10 });
        }
      }
      function F(e10, t10) {
        const r10 = "string" === typeof t10 ? new URL(t10) : t10;
        const n10 = new URL(e10, t10);
        const i10 = n10.origin === r10.origin;
        return { url: i10 ? n10.toString().slice(r10.origin.length) : n10.toString(), isRelative: i10 };
      }
      const V = e.i(869397);
      V.NEXT_RSC_UNION_QUERY;
      class X extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new X();
        }
      }
      class G extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r10, n10) {
            if ("symbol" === typeof r10) return K.get(t10, r10, n10);
            const i10 = r10.toLowerCase();
            const o10 = Object.keys(e10).find((e11) => e11.toLowerCase() === i10);
            if (void 0 !== o10) return K.get(t10, o10, n10);
          }, set(t10, r10, n10, i10) {
            if ("symbol" === typeof r10) return K.set(t10, r10, n10, i10);
            const o10 = r10.toLowerCase();
            const a10 = Object.keys(e10).find((e11) => e11.toLowerCase() === o10);
            return K.set(t10, a10 ?? r10, n10, i10);
          }, has(t10, r10) {
            if ("symbol" === typeof r10) return K.has(t10, r10);
            const n10 = r10.toLowerCase();
            const i10 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            return void 0 !== i10 && K.has(t10, i10);
          }, deleteProperty(t10, r10) {
            if ("symbol" === typeof r10) return K.deleteProperty(t10, r10);
            const n10 = r10.toLowerCase();
            const i10 = Object.keys(e10).find((e11) => e11.toLowerCase() === n10);
            return void 0 === i10 || K.deleteProperty(t10, i10);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "append":
              case "delete":
              case "set":
                return X.callable;
              default:
                return K.get(e11, t10, r10);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new G(e10);
        }
        append(e10, t10) {
          const r10 = this.headers[e10];
          "string" === typeof r10 ? this.headers[e10] = [r10, t10] : Array.isArray(r10) ? r10.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          const t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (const [r10, n10] of this.entries()) e10.call(t10, n10, r10, this);
        }
        *entries() {
          for (const e10 of Object.keys(this.headers)) {
            const t10 = e10.toLowerCase();
            const r10 = this.get(t10);
            yield [t10, r10];
          }
        }
        *keys() {
          for (const e10 of Object.keys(this.headers)) {
            const t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (const e10 of Object.keys(this.headers)) {
            const t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      e.i(26086);
      const Y = e.i(257145);
      class Q extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new Q();
        }
      }
      class Z {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return Q.callable;
              default:
                return K.get(e11, t10, r10);
            }
          } });
        }
      }
      const ee = Symbol.for("next.mutated.cookies");
      class et {
        static wrap(e10, t10) {
          const r10 = new L.ResponseCookies(new Headers());
          for (const t11 of e10.getAll()) r10.set(t11);
          let n10 = [];
          const i10 = /* @__PURE__ */ new Set();
          const o10 = () => {
            const e11 = Y.workAsyncStorage.getStore();
            if (e11 && (e11.pathWasRevalidated = true), n10 = r10.getAll().filter((e12) => i10.has(e12.name)), t10) {
              const e12 = [];
              for (const t11 of n10) {
                const r11 = new L.ResponseCookies(new Headers());
                r11.set(t11), e12.push(r11.toString());
              }
              t10(e12);
            }
          };
          const a10 = new Proxy(r10, { get(e11, t11, r11) {
            switch (t11) {
              case ee:
                return n10;
              case "delete":
                return (...t12) => {
                  i10.add("string" === typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), a10;
                  } finally {
                    o10();
                  }
                };
              case "set":
                return (...t12) => {
                  i10.add("string" === typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), a10;
                  } finally {
                    o10();
                  }
                };
              default:
                return K.get(e11, t11, r11);
            }
          } });
          return a10;
        }
      }
      function er(e10) {
        return "action" === e10.phase;
      }
      function en(e10, t10) {
        if (!er(e10)) throw new Q();
      }
      const ei = ((nK = ei || {}).handleRequest = "BaseServer.handleRequest", nK.run = "BaseServer.run", nK.pipe = "BaseServer.pipe", nK.getStaticHTML = "BaseServer.getStaticHTML", nK.render = "BaseServer.render", nK.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", nK.renderToResponse = "BaseServer.renderToResponse", nK.renderToHTML = "BaseServer.renderToHTML", nK.renderError = "BaseServer.renderError", nK.renderErrorToResponse = "BaseServer.renderErrorToResponse", nK.renderErrorToHTML = "BaseServer.renderErrorToHTML", nK.render404 = "BaseServer.render404", nK);
      const eo = ((nq = eo || {}).loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", nq.loadComponents = "LoadComponents.loadComponents", nq);
      const ea = ((nB = ea || {}).getRequestHandler = "NextServer.getRequestHandler", nB.getRequestHandlerWithMetadata = "NextServer.getRequestHandlerWithMetadata", nB.getServer = "NextServer.getServer", nB.getServerRequestHandler = "NextServer.getServerRequestHandler", nB.createServer = "createServer.createServer", nB);
      const es = ((nJ = es || {}).compression = "NextNodeServer.compression", nJ.getBuildId = "NextNodeServer.getBuildId", nJ.createComponentTree = "NextNodeServer.createComponentTree", nJ.clientComponentLoading = "NextNodeServer.clientComponentLoading", nJ.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", nJ.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", nJ.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", nJ.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", nJ.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", nJ.sendRenderResult = "NextNodeServer.sendRenderResult", nJ.proxyRequest = "NextNodeServer.proxyRequest", nJ.runApi = "NextNodeServer.runApi", nJ.render = "NextNodeServer.render", nJ.renderHTML = "NextNodeServer.renderHTML", nJ.imageOptimizer = "NextNodeServer.imageOptimizer", nJ.getPagePath = "NextNodeServer.getPagePath", nJ.getRoutesManifest = "NextNodeServer.getRoutesManifest", nJ.findPageComponents = "NextNodeServer.findPageComponents", nJ.getFontManifest = "NextNodeServer.getFontManifest", nJ.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", nJ.getRequestHandler = "NextNodeServer.getRequestHandler", nJ.renderToHTML = "NextNodeServer.renderToHTML", nJ.renderError = "NextNodeServer.renderError", nJ.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", nJ.render404 = "NextNodeServer.render404", nJ.startResponse = "NextNodeServer.startResponse", nJ.route = "route", nJ.onProxyReq = "onProxyReq", nJ.apiResolver = "apiResolver", nJ.internalFetch = "internalFetch", nJ);
      const ec = ((nz = ec || {}).startServer = "startServer.startServer", nz);
      const el = ((nF = el || {}).getServerSideProps = "Render.getServerSideProps", nF.getStaticProps = "Render.getStaticProps", nF.renderToString = "Render.renderToString", nF.renderDocument = "Render.renderDocument", nF.createBodyResult = "Render.createBodyResult", nF);
      const eu = ((nV = eu || {}).renderToString = "AppRender.renderToString", nV.renderToReadableStream = "AppRender.renderToReadableStream", nV.getBodyResult = "AppRender.getBodyResult", nV.fetch = "AppRender.fetch", nV);
      const ed = ((nX = ed || {}).executeRoute = "Router.executeRoute", nX);
      const ep = ((nG = ep || {}).runHandler = "Node.runHandler", nG);
      const eh = ((nY = eh || {}).runHandler = "AppRouteRouteHandlers.runHandler", nY);
      const ef = ((nQ = ef || {}).generateMetadata = "ResolveMetadata.generateMetadata", nQ.generateViewport = "ResolveMetadata.generateViewport", nQ);
      const ey = ((nZ = ey || {}).execute = "Middleware.execute", nZ);
      const em = /* @__PURE__ */ new Set(["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]);
      const eg = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function ew(e10) {
        return null !== e10 && "object" === typeof e10 && "then" in e10 && "function" === typeof e10.then;
      }
      const eb = process.env.NEXT_OTEL_PERFORMANCE_PREFIX;
      const { context: ev, propagation: e_, trace: eE, SpanStatusCode: eS, SpanKind: ek, ROOT_CONTEXT: ex } = t = e.r(471029);
      class eR extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      const eA = (e10, t10) => {
        "object" === typeof t10 && null !== t10 && t10 instanceof eR && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && (e10.recordException(t10), e10.setAttribute("error.type", t10.name)), e10.setStatus({ code: eS.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      };
      const eT = /* @__PURE__ */ new Map();
      const eC = t.createContextKey("next.rootSpanId");
      let eP = 0;
      const eO = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } };
      const eU = (s = new class e {
        getTracerInstance() {
          return eE.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return ev;
        }
        getTracePropagationData() {
          const e10 = ev.active();
          const t10 = [];
          return e_.inject(e10, t10, eO), t10;
        }
        getActiveScopeSpan() {
          return eE.getSpan(null == ev ? void 0 : ev.active());
        }
        withPropagatedContext(e10, t10, r10) {
          const n10 = ev.active();
          if (eE.getSpanContext(n10)) return t10();
          const i10 = e_.extract(n10, e10, r10);
          return ev.with(i10, t10);
        }
        trace(...e10) {
          const [t10, r10, n10] = e10;
          const { fn: i10, options: o10 } = "function" === typeof r10 ? { fn: r10, options: {} } : { fn: n10, options: { ...r10 } };
          const a10 = o10.spanName ?? t10;
          if (!em.has(t10) && "1" !== process.env.NEXT_OTEL_VERBOSE || o10.hideSpan) return i10();
          let s2 = this.getSpanContext((null == o10 ? void 0 : o10.parentSpan) ?? this.getActiveScopeSpan());
          s2 || (s2 = (null == ev ? void 0 : ev.active()) ?? ex);
          const c2 = s2.getValue(eC);
          const l2 = "number" !== typeof c2 || !eT.has(c2);
          const u2 = eP++;
          return o10.attributes = { "next.span_name": a10, "next.span_type": t10, ...o10.attributes }, ev.with(s2.setValue(eC, u2), () => this.getTracerInstance().startActiveSpan(a10, o10, (e11) => {
            let r11;
            eb && t10 && eg.has(t10) && (r11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let n11 = false;
            const a11 = () => {
              !n11 && (n11 = true, eT.delete(u2), r11 && performance.measure(`${eb}:next-${(t10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => `-${e12.toLowerCase()}`)}`, { start: r11, end: performance.now() }));
            };
            if (l2 && eT.set(u2, new Map(Object.entries(o10.attributes ?? {}))), i10.length > 1) try {
              return i10(e11, (t11) => eA(e11, t11));
            } catch (t11) {
              throw eA(e11, t11), t11;
            } finally {
              a11();
            }
            try {
              const t11 = i10(e11);
              if (ew(t11)) return t11.then((t12) => (e11.end(), t12)).catch((t12) => {
                throw eA(e11, t12), t12;
              }).finally(a11);
              return e11.end(), a11(), t11;
            } catch (t11) {
              throw eA(e11, t11), a11(), t11;
            }
          }));
        }
        wrap(...e10) {
          const t10 = this;
          const [r10, n10, i10] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return em.has(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n10;
            "function" === typeof e11 && "function" === typeof i10 && (e11 = e11.apply(this, arguments));
            const o10 = arguments.length - 1;
            const a10 = arguments[o10];
            if ("function" !== typeof a10) return t10.trace(r10, e11, () => i10.apply(this, arguments));
            {
              const n11 = t10.getContext().bind(ev.active(), a10);
              return t10.trace(r10, e11, (e12, t11) => (arguments[o10] = function(e13) {
                return null == t11 || t11(e13), n11.apply(this, arguments);
              }, i10.apply(this, arguments)));
            }
          } : i10;
        }
        startSpan(...e10) {
          const [t10, r10] = e10;
          const n10 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, n10);
        }
        getSpanContext(e10) {
          return e10 ? eE.setSpan(ev.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          const e10 = ev.active().getValue(eC);
          return eT.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          const r10 = ev.active().getValue(eC);
          const n10 = eT.get(r10);
          n10 && !n10.has(e10) && n10.set(e10, t10);
        }
      }(), () => s);
      const eI = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(eI);
      class eN {
        constructor(e10, t10, r10, n10) {
          let i10;
          const o10 = e10 && ((e11, t11) => {
            const r11 = G.from(e11.headers);
            return { isOnDemandRevalidate: r11.get("x-prerender-revalidate") === t11.previewModeId, revalidateOnlyGenerated: r11.has("x-prerender-revalidate-if-generated") };
          })(t10, e10).isOnDemandRevalidate;
          const a10 = null == (i10 = r10.get(eI)) ? void 0 : i10.value;
          this._isEnabled = !!(!o10 && a10 && e10 && a10 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n10;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: eI, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: eI, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function e$(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" === typeof e10.headers["x-middleware-set-cookie"]) {
          const r10 = e10.headers["x-middleware-set-cookie"];
          const n10 = new Headers();
          for (const e11 of v(r10)) n10.append("set-cookie", e11);
          for (const e11 of new L.ResponseCookies(n10).getAll()) t10.set(e11);
        }
      }
      const eD = e.i(581175);
      const ej = e.i(724200);
      const eH = e.i(801934);
      const eL = e.i(435667);
      const eM = e.i(951615);
      process.env.NEXT_PRIVATE_DEBUG_CACHE && ((e10, ...t10) => {
        console.log(`use-cache: ${e10}`, ...t10);
      }), Symbol.for("@next/cache-handlers");
      const eW = Symbol.for("@next/cache-handlers-map");
      const eK = Symbol.for("@next/cache-handlers-set");
      const eq = globalThis;
      function eB() {
        if (eq[eW]) return eq[eW].entries();
      }
      async function eJ(e10, t10) {
        if (!e10) return t10();
        const r10 = ez(e10);
        try {
          return await t10();
        } finally {
          let n10;
          let i10;
          let t11;
          let o10;
          const a10 = (n10 = r10, i10 = ez(e10), t11 = new Set(n10.pendingRevalidatedTags.map((e11) => {
            const t12 = "object" === typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return `${e11.tag}:${t12}`;
          })), o10 = new Set(n10.pendingRevalidateWrites), { pendingRevalidatedTags: i10.pendingRevalidatedTags.filter((e11) => {
            const r11 = "object" === typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return !t11.has(`${e11.tag}:${r11}`);
          }), pendingRevalidates: Object.fromEntries(Object.entries(i10.pendingRevalidates).filter(([e11]) => !(e11 in n10.pendingRevalidates))), pendingRevalidateWrites: i10.pendingRevalidateWrites.filter((e11) => !o10.has(e11)) });
          await eV(e10, a10);
        }
      }
      function ez(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function eF(e10, t10, r10) {
        if (0 === e10.length) return;
        const n10 = (() => {
          if (eq[eK]) return eq[eK].values();
        })();
        const i10 = [];
        const o10 = /* @__PURE__ */ new Map();
        for (const t11 of e10) {
          let e11;
          const r11 = t11.profile;
          for (const [t12] of o10) if ("string" === typeof t12 && "string" === typeof r11 && t12 === r11 || "object" === typeof t12 && "object" === typeof r11 && JSON.stringify(t12) === JSON.stringify(r11) || t12 === r11) {
            e11 = t12;
            break;
          }
          const n11 = e11 || r11;
          o10.has(n11) || o10.set(n11, []), o10.get(n11).push(t11.tag);
        }
        for (const [e11, s2] of o10) {
          let o11;
          if (e11) {
            let t11;
            if ("object" === typeof e11) t11 = e11;
            else if ("string" === typeof e11) {
              let a10;
              if (!(t11 = null == r10 || null == (a10 = r10.cacheLifeProfiles) ? void 0 : a10[e11])) throw Object.defineProperty(Error(`Invalid profile provided "${e11}" must be configured under cacheLife in next.config or be "max"`), "__NEXT_ERROR_CODE", { value: "E873", enumerable: false, configurable: true });
            }
            t11 && (o11 = { expire: t11.expire });
          }
          for (const t11 of n10 || []) e11 ? i10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, s2, o11)) : i10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, s2));
          t10 && i10.push(t10.revalidateTag(s2, o11));
        }
        await Promise.all(i10);
      }
      async function eV(e10, t10) {
        const r10 = (null == t10 ? void 0 : t10.pendingRevalidatedTags) ?? e10.pendingRevalidatedTags ?? [];
        const n10 = (null == t10 ? void 0 : t10.pendingRevalidates) ?? e10.pendingRevalidates ?? {};
        const i10 = (null == t10 ? void 0 : t10.pendingRevalidateWrites) ?? e10.pendingRevalidateWrites ?? [];
        return Promise.all([eF(r10, e10.incrementalCache, e10), ...Object.values(n10), ...i10]);
      }
      const eX = e.i(100151);
      const eG = (0, eX.createAsyncLocalStorage)();
      class eY {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new eH.default(), this.callbackQueue.pause();
        }
        after(e10) {
          if (ew(e10)) this.waitUntil || eQ(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" === typeof e10) this.addCallback(e10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(e10) {
          this.waitUntil || eQ();
          const t10 = ej.workUnitAsyncStorage.getStore();
          t10 && this.workUnitStores.add(t10);
          const r10 = eG.getStore();
          const n10 = r10 ? r10.rootTaskSpawnPhase : null == t10 ? void 0 : t10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          const i10 = (0, eX.bindSnapshot)(async () => {
            try {
              await eG.run({ rootTaskSpawnPhase: n10 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          });
          this.callbackQueue.add(i10);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (const e11 of this.workUnitStores) e11.phase = "after";
          const e10 = Y.workAsyncStorage.getStore();
          if (!e10) throw Object.defineProperty(new eL.InvariantError("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return eJ(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(Object.defineProperty(new eL.InvariantError("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function eQ() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function eZ(e10) {
        let t10;
        const r10 = { then: (n10, i10) => (t10 || (t10 = e10()), t10.then((e11) => {
          r10.value = e11;
        }).catch(() => {
        }), t10.then(n10, i10)) };
        return r10;
      }
      class e0 {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function e1() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      const e2 = Symbol.for("@next/request-context");
      async function e3(e10, t10, r10) {
        const n10 = /* @__PURE__ */ new Set();
        for (let t11 of ((e11) => {
          const t12 = ["/layout"];
          if (e11.startsWith("/")) {
            const r11 = e11.split("/");
            for (let e12 = 1; e12 < r11.length + 1; e12++) {
              let n11 = r11.slice(0, e12).join("/");
              n11 && (n11.endsWith("/page") || n11.endsWith("/route") || (n11 = `${n11}${!n11.endsWith("/") ? "/" : ""}layout`), t12.push(n11));
            }
          }
          return t12;
        })(e10)) t11 = `${w}${t11}`, n10.add(t11);
        if (t10.pathname && (!r10 || 0 === r10.size)) {
          const e11 = `${w}${t10.pathname}`;
          n10.add(e11);
        }
        n10.has(`${w}/`) && n10.add(`${w}/index`), n10.has(`${w}/index`) && n10.add(`${w}/`);
        const i10 = Array.from(n10);
        return { tags: i10, expirationsByCacheKind: ((e11) => {
          const t11 = /* @__PURE__ */ new Map();
          const r11 = eB();
          if (r11) for (const [n11, i11] of r11) "getExpiration" in i11 && t11.set(n11, eZ(async () => i11.getExpiration(e11)));
          return t11;
        })(i10) };
      }
      class e6 extends W {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new y({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new y({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new y({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      const e5 = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 };
      let e8 = (e10, t10) => eU().withPropagatedContext(e10.headers, t10, e5);
      let e4 = false;
      async function e9(t10) {
        let r10;
        let n10;
        let i10;
        let o10;
        let a10;
        let s2;
        let c2;
        let l2;
        let u2;
        !(() => {
          if (!e4 && (e4 = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            const { interceptTestApis: t11, wrapRequestHandler: r11 } = e.r(325191);
            t11(), e8 = r11(e8);
          }
        })(), await h();
        const d2 = void 0 !== globalThis.__BUILD_MANIFEST;
        t10.request.url = t10.request.url.replace(/\.rsc($|\?)/, "$1");
        const p2 = t10.bypassNextUrl ? new URL(t10.request.url) : new H(t10.request.url, { headers: t10.request.headers, nextConfig: t10.request.nextConfig });
        for (const e10 of [...p2.searchParams.keys()]) {
          const t11 = p2.searchParams.getAll(e10);
          const r11 = ((e11) => {
            for (const t12 of ["nxtP", "nxtI"]) if (e11 !== t12 && e11.startsWith(t12)) return e11.substring(t12.length);
            return null;
          })(e10);
          if (r11) {
            for (const e11 of (p2.searchParams.delete(r11), t11)) p2.searchParams.append(r11, e11);
            p2.searchParams.delete(e10);
          }
        }
        let f2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in p2 && (f2 = p2.buildId || "", p2.buildId = "");
        const y2 = ((e10) => {
          const t11 = new Headers();
          for (const [r11, n11] of Object.entries(e10)) for (let e11 of Array.isArray(n11) ? n11 : [n11]) void 0 !== e11 && ("number" === typeof e11 && (e11 = e11.toString()), t11.append(r11, e11));
          return t11;
        })(t10.request.headers);
        const m2 = y2.has("x-nextjs-data");
        const g2 = "1" === y2.get(V.RSC_HEADER);
        m2 && "/index" === p2.pathname && (p2.pathname = "/");
        const w2 = /* @__PURE__ */ new Map();
        if (!d2) for (const e10 of V.FLIGHT_HEADERS) {
          const t11 = y2.get(e10);
          null !== t11 && (w2.set(e10, t11), y2.delete(e10));
        }
        const b2 = p2.searchParams.get(V.NEXT_RSC_UNION_QUERY);
        const v2 = new e6({ page: t10.page, input: ((l2 = (c2 = "string" === typeof p2) ? new URL(p2) : p2).searchParams.delete(V.NEXT_RSC_UNION_QUERY), c2 ? l2.toString() : l2).toString(), init: { body: t10.request.body, headers: y2, method: t10.request.method, nextConfig: t10.request.nextConfig, signal: t10.request.signal } });
        m2 && Object.defineProperty(v2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t10.IncrementalCache && (globalThis.__incrementalCache = new t10.IncrementalCache({ CurCacheHandler: t10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t10.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: e1() }) }));
        const _2 = t10.request.waitUntil ?? (null == (r10 = null == (u2 = globalThis[e2]) ? void 0 : u2.get()) ? void 0 : r10.waitUntil);
        const E2 = new A({ request: v2, page: t10.page, context: _2 ? { waitUntil: _2 } : void 0 });
        if ((a10 = await e8(v2, () => {
          if ("/middleware" === t10.page || "/src/middleware" === t10.page || "/proxy" === t10.page || "/src/proxy" === t10.page) {
            const e10 = E2.waitUntil.bind(E2);
            const r11 = new e0();
            return eU().trace(ey.execute, { spanName: `middleware ${v2.method}`, attributes: { "http.target": v2.nextUrl.pathname, "http.method": v2.method } }, async () => {
              try {
                let n11;
                let i11;
                let o11;
                let a11;
                let c3;
                let l3;
                const u3 = e1();
                const d3 = await e3("/", v2.nextUrl, null);
                const p3 = (c3 = v2.nextUrl, l3 = (e11) => {
                  s2 = e11;
                }, ((e11, t11, r12, n12, i12, o12, a12, s3, c4, l4, u4, d4) => {
                  function p4(e12) {
                    r12?.setHeader("Set-Cookie", e12);
                  }
                  const h3 = {};
                  return { type: "request", phase: e11, implicitTags: o12, url: { pathname: n12.pathname, search: n12.search ?? "" }, rootParams: i12, get headers() {
                    return h3.headers || (h3.headers = ((e12) => {
                      const t12 = G.from(e12);
                      for (const e13 of V.FLIGHT_HEADERS) t12.delete(e13);
                      return G.seal(t12);
                    })(t11.headers)), h3.headers;
                  }, get cookies() {
                    if (!h3.cookies) {
                      const e12 = new L.RequestCookies(G.from(t11.headers));
                      e$(t11, e12), h3.cookies = Z.seal(e12);
                    }
                    return h3.cookies;
                  }, set cookies(value) {
                    h3.cookies = value;
                  }, get mutableCookies() {
                    if (!h3.mutableCookies) {
                      let f3;
                      let y3;
                      let e12;
                      const n13 = (f3 = t11.headers, y3 = a12 || (r12 ? p4 : void 0), e12 = new L.RequestCookies(G.from(f3)), et.wrap(e12, y3));
                      e$(t11, n13), h3.mutableCookies = n13;
                    }
                    return h3.mutableCookies;
                  }, get userspaceMutableCookies() {
                    if (!h3.userspaceMutableCookies) {
                      let m3;
                      let e12;
                      m3 = this, h3.userspaceMutableCookies = e12 = new Proxy(m3.mutableCookies, { get(t12, r13, n13) {
                        switch (r13) {
                          case "delete":
                            return (...r14) => (en(m3, "cookies().delete"), t12.delete(...r14), e12);
                          case "set":
                            return (...r14) => (en(m3, "cookies().set"), t12.set(...r14), e12);
                          default:
                            return K.get(t12, r13, n13);
                        }
                      } });
                    }
                    return h3.userspaceMutableCookies;
                  }, get draftMode() {
                    return h3.draftMode || (h3.draftMode = new eN(c4, t11, this.cookies, this.mutableCookies)), h3.draftMode;
                  }, renderResumeDataCache: null, isHmrRefresh: l4, serverComponentsHmrCache: u4 || globalThis.__serverComponentsHmrCache, devFallbackParams: null };
                })("action", v2, void 0, c3, {}, d3, l3, null, u3, false, void 0, null));
                const h2 = (({ page: e11, renderOpts: t11, isPrefetchRequest: r12, buildId: n12, previouslyRevalidatedTags: i12, nonce: o12 }) => {
                  let a12;
                  const s3 = !t11.shouldWaitOnAllReady && !t11.supportsDynamicResponse && !t11.isDraftMode && !t11.isPossibleServerAction;
                  const c4 = t11.dev ?? false;
                  const l4 = c4 || s3 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS);
                  const u4 = { isStaticGeneration: s3, page: e11, route: (a12 = e11.split("/").reduce((e12, t12, r13, n13) => t12 ? "(" === t12[0] && t12.endsWith(")") || "@" === t12[0] || ("page" === t12 || "route" === t12) && r13 === n13.length - 1 ? e12 : `${e12}/${t12}` : e12, "")).startsWith("/") ? a12 : `/${a12}`, incrementalCache: t11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t11.cacheLifeProfiles, isBuildTimePrerendering: t11.nextExport, hasReadableErrorStacks: t11.hasReadableErrorStacks, fetchCache: t11.fetchCache, isOnDemandRevalidate: t11.isOnDemandRevalidate, isDraftMode: t11.isDraftMode, isPrefetchRequest: r12, buildId: n12, reactLoadableManifest: (null == t11 ? void 0 : t11.reactLoadableManifest) || {}, assetPrefix: (null == t11 ? void 0 : t11.assetPrefix) || "", nonce: o12, afterContext: ((e12) => {
                    const { waitUntil: t12, onClose: r13, onAfterTaskError: n13 } = e12;
                    return new eY({ waitUntil: t12, onClose: r13, onTaskError: n13 });
                  })(t11), cacheComponentsEnabled: t11.cacheComponents, dev: c4, previouslyRevalidatedTags: i12, refreshTagsByCacheKind: (() => {
                    const e12 = /* @__PURE__ */ new Map();
                    const t12 = eB();
                    if (t12) for (const [r13, n13] of t12) "refreshTags" in n13 && e12.set(r13, eZ(async () => n13.refreshTags()));
                    return e12;
                  })(), runInCleanSnapshot: (0, eX.createSnapshot)(), shouldTrackFetchMetrics: l4 };
                  return t11.store = u4, u4;
                })({ page: "/", renderOpts: { cacheLifeProfiles: null == (i11 = t10.request.nextConfig) || null == (n11 = i11.experimental) ? void 0 : n11.cacheLife, cacheComponents: false, experimental: { isRoutePPREnabled: false, authInterrupts: !!(null == (a11 = t10.request.nextConfig) || null == (o11 = a11.experimental) ? void 0 : o11.authInterrupts) }, supportsDynamicResponse: true, waitUntil: e10, onClose: r11.onClose.bind(r11), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === v2.headers.get(V.NEXT_ROUTER_PREFETCH_HEADER), buildId: f2 ?? "", previouslyRevalidatedTags: [] });
                return await Y.workAsyncStorage.run(h2, () => ej.workUnitAsyncStorage.run(p3, t10.handler, v2, E2));
              } finally {
                setTimeout(() => {
                  r11.dispatchClose();
                }, 0);
              }
            });
          }
          return t10.handler(v2, E2);
        })) && !(a10 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        a10 && s2 && a10.headers.set("set-cookie", s2);
        const S2 = null == a10 ? void 0 : a10.headers.get("x-middleware-rewrite");
        if (a10 && S2 && (g2 || !d2)) {
          const e10 = new H(S2, { forceLocale: true, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          d2 || e10.host !== v2.nextUrl.host || (e10.buildId = f2 || e10.buildId, a10.headers.set("x-middleware-rewrite", String(e10)));
          const { url: r11, isRelative: s3 } = F(e10.toString(), p2.toString());
          !d2 && m2 && a10.headers.set("x-nextjs-rewrite", r11);
          const c3 = !s3 && (null == (o10 = t10.request.nextConfig) || null == (i10 = o10.experimental) || null == (n10 = i10.clientParamParsingOrigins) ? void 0 : n10.some((t11) => new RegExp(t11).test(e10.origin)));
          g2 && (s3 || c3) && (p2.pathname !== e10.pathname && a10.headers.set(V.NEXT_REWRITTEN_PATH_HEADER, e10.pathname), p2.search !== e10.search && a10.headers.set(V.NEXT_REWRITTEN_QUERY_HEADER, e10.search.slice(1)));
        }
        if (a10 && S2 && g2 && b2) {
          const e10 = new URL(S2);
          e10.searchParams.has(V.NEXT_RSC_UNION_QUERY) || (e10.searchParams.set(V.NEXT_RSC_UNION_QUERY, b2), a10.headers.set("x-middleware-rewrite", e10.toString()));
        }
        const k2 = null == a10 ? void 0 : a10.headers.get("Location");
        if (a10 && k2 && !d2) {
          const e10 = new H(k2, { forceLocale: false, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          a10 = new Response(a10.body, a10), e10.host === p2.host && (e10.buildId = f2 || e10.buildId, a10.headers.set("Location", e10.toString())), m2 && (a10.headers.delete("Location"), a10.headers.set("x-nextjs-redirect", F(e10.toString(), p2.toString()).url));
        }
        const R2 = a10 || z.next();
        const T2 = R2.headers.get("x-middleware-override-headers");
        const C2 = [];
        if (T2) {
          for (const [e10, t11] of w2) R2.headers.set(`x-middleware-request-${e10}`, t11), C2.push(e10);
          C2.length > 0 && R2.headers.set("x-middleware-override-headers", `${T2},${C2.join(",")}`);
        }
        return { response: R2, waitUntil: ("internal" === E2[x].kind ? Promise.all(E2[x].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: v2.fetchMetrics };
      }
      const e7 = (e10, t10, r10, n10, i10) => {
        if ("m" === n10) throw TypeError("Private method is not writable");
        if ("a" === n10 && !i10) throw TypeError("Private accessor was defined without a setter");
        if ("function" === typeof t10 ? e10 !== t10 || !i10 : !t10.has(e10)) throw TypeError("Cannot write private member to an object whose class did not declare it");
        return "a" === n10 ? i10.call(e10, r10) : i10 ? i10.value = r10 : t10.set(e10, r10), r10;
      };
      const te = (e10, t10, r10, n10) => {
        if ("a" === r10 && !n10) throw TypeError("Private accessor was defined without a getter");
        if ("function" === typeof t10 ? e10 !== t10 || !n10 : !t10.has(e10)) throw TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === r10 ? n10 : "a" === r10 ? n10.call(e10) : n10 ? n10.value : t10.get(e10);
      };
      function tt(e10) {
        const t10 = e10 ? "__Secure-" : "";
        return { sessionToken: { name: `${t10}authjs.session-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, callbackUrl: { name: `${t10}authjs.callback-url`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, csrfToken: { name: `${e10 ? "__Host-" : ""}authjs.csrf-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, pkceCodeVerifier: { name: `${t10}authjs.pkce.code_verifier`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10, maxAge: 900 } }, state: { name: `${t10}authjs.state`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10, maxAge: 900 } }, nonce: { name: `${t10}authjs.nonce`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10 } }, webauthnChallenge: { name: `${t10}authjs.challenge`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e10, maxAge: 900 } } };
      }
      class tr {
        constructor(e10, t10, r10) {
          if (n0.add(this), n1.set(this, {}), n2.set(this, void 0), n3.set(this, void 0), e7(this, n3, r10, "f"), e7(this, n2, e10, "f"), !t10) return;
          const { name: n10 } = e10;
          for (const [e11, r11] of Object.entries(t10)) e11.startsWith(n10) && r11 && (te(this, n1, "f")[e11] = r11);
        }
        get value() {
          return Object.keys(te(this, n1, "f")).sort((e10, t10) => Number.parseInt(e10.split(".").pop() || "0") - Number.parseInt(t10.split(".").pop() || "0")).map((e10) => te(this, n1, "f")[e10]).join("");
        }
        chunk(e10, t10) {
          const r10 = te(this, n0, "m", n5).call(this);
          for (const n10 of te(this, n0, "m", n6).call(this, { name: te(this, n2, "f").name, value: e10, options: { ...te(this, n2, "f").options, ...t10 } })) r10[n10.name] = n10;
          return Object.values(r10);
        }
        clean() {
          return Object.values(te(this, n0, "m", n5).call(this));
        }
      }
      n1 = /* @__PURE__ */ new WeakMap(), n2 = /* @__PURE__ */ new WeakMap(), n3 = /* @__PURE__ */ new WeakMap(), n0 = /* @__PURE__ */ new WeakSet(), n6 = function(e10) {
        const t10 = Math.ceil(e10.value.length / 3936);
        if (1 === t10) return te(this, n1, "f")[e10.name] = e10.value, [e10];
        const r10 = [];
        for (let n10 = 0; n10 < t10; n10++) {
          const t11 = `${e10.name}.${n10}`;
          const i10 = e10.value.substr(3936 * n10, 3936);
          r10.push({ ...e10, name: t11, value: i10 }), te(this, n1, "f")[t11] = i10;
        }
        return te(this, n3, "f").debug("CHUNKING_SESSION_COOKIE", { message: "Session cookie exceeds allowed 4096 bytes.", emptyCookieSize: 160, valueSize: e10.value.length, chunks: r10.map((e11) => e11.value.length + 160) }), r10;
      }, n5 = function() {
        const e10 = {};
        for (const t10 in te(this, n1, "f")) delete te(this, n1, "f")?.[t10], e10[t10] = { name: t10, value: "", options: { ...te(this, n2, "f").options, maxAge: 0 } };
        return e10;
      };
      class tn extends Error {
        constructor(e10, t10) {
          e10 instanceof Error ? super(void 0, { cause: { err: e10, ...e10.cause, ...t10 } }) : "string" === typeof e10 ? (t10 instanceof Error && (t10 = { err: t10, ...t10.cause }), super(e10, t10)) : super(void 0, e10), this.name = this.constructor.name, this.type = this.constructor.type ?? "AuthError", this.kind = this.constructor.kind ?? "error", Error.captureStackTrace?.(this, this.constructor);
          const r10 = `https://errors.authjs.dev#${this.type.toLowerCase()}`;
          this.message += `${this.message ? ". " : ""}Read more at ${r10}`;
        }
      }
      class ti extends tn {
      }
      ti.kind = "signIn";
      class to extends tn {
      }
      to.type = "AdapterError";
      class ta extends tn {
      }
      ta.type = "AccessDenied";
      class ts extends tn {
      }
      ts.type = "CallbackRouteError";
      class tc extends tn {
      }
      tc.type = "ErrorPageLoop";
      class tl extends tn {
      }
      tl.type = "EventError";
      class tu extends tn {
      }
      tu.type = "InvalidCallbackUrl";
      class td extends ti {
        constructor() {
          super(...arguments), this.code = "credentials";
        }
      }
      td.type = "CredentialsSignin";
      class tp extends tn {
      }
      tp.type = "InvalidEndpoints";
      class th extends tn {
      }
      th.type = "InvalidCheck";
      class tf extends tn {
      }
      tf.type = "JWTSessionError";
      class ty extends tn {
      }
      ty.type = "MissingAdapter";
      class tm extends tn {
      }
      tm.type = "MissingAdapterMethods";
      class tg extends tn {
      }
      tg.type = "MissingAuthorize";
      class tw extends tn {
      }
      tw.type = "MissingSecret";
      class tb extends ti {
      }
      tb.type = "OAuthAccountNotLinked";
      class tv extends ti {
      }
      tv.type = "OAuthCallbackError";
      class t_ extends tn {
      }
      t_.type = "OAuthProfileParseError";
      class tE extends tn {
      }
      tE.type = "SessionTokenError";
      class tS extends tn {
      }
      tS.type = "SignOutError";
      class tk extends tn {
      }
      tk.type = "UnknownAction";
      class tx extends tn {
      }
      tx.type = "UnsupportedStrategy";
      class tR extends tn {
      }
      tR.type = "InvalidProvider";
      class tA extends tn {
      }
      tA.type = "UntrustedHost";
      class tT extends tn {
      }
      tT.type = "Verification";
      class tC extends ti {
      }
      tC.type = "MissingCSRF";
      const tP = /* @__PURE__ */ new Set(["CredentialsSignin", "OAuthAccountNotLinked", "OAuthCallbackError", "AccessDenied", "Verification", "MissingCSRF", "AccountNotLinked", "WebAuthnVerificationError"]);
      class tO extends tn {
      }
      tO.type = "DuplicateConditionalUI";
      class tU extends tn {
      }
      tU.type = "MissingWebAuthnAutocomplete";
      class tI extends tn {
      }
      tI.type = "WebAuthnVerificationError";
      class tN extends ti {
      }
      tN.type = "AccountNotLinked";
      class t$ extends tn {
      }
      t$.type = "ExperimentalFeatureNotEnabled";
      let tD = false;
      function tj(e10, t10) {
        try {
          return /^https?:/.test(new URL(e10, e10.startsWith("/") ? t10 : void 0).protocol);
        } catch {
          return false;
        }
      }
      let tH = false;
      let tL = false;
      let tM = false;
      const tW = ["createVerificationToken", "useVerificationToken", "getUserByEmail"];
      const tK = ["createUser", "getUser", "getUserByEmail", "getUserByAccount", "updateUser", "linkAccount", "createSession", "getSessionAndUser", "updateSession", "deleteSession"];
      const tq = ["createUser", "getUser", "linkAccount", "getAccount", "getAuthenticator", "createAuthenticator", "listAuthenticatorsByUserId", "updateAuthenticatorCounter"];
      const tB = async (e10, t10, r10, n10, i10) => {
        const { crypto: { subtle: o10 } } = (() => {
          if ("undefined" !== typeof globalThis) return globalThis;
          if ("undefined" !== typeof self) return self;
          throw Error("unable to locate global object");
        })();
        return new Uint8Array(await o10.deriveBits({ name: "HKDF", hash: `SHA-${e10.substr(3)}`, salt: r10, info: n10 }, await o10.importKey("raw", t10, "HKDF", false, ["deriveBits"]), i10 << 3));
      };
      function tJ(e10, t10) {
        if ("string" === typeof e10) return new TextEncoder().encode(e10);
        if (!(e10 instanceof Uint8Array)) throw TypeError(`"${t10}"" must be an instance of Uint8Array or a string`);
        return e10;
      }
      async function tz(e10, t10, r10, n10, i10) {
        return tB(((e11) => {
          switch (e11) {
            case "sha256":
            case "sha384":
            case "sha512":
            case "sha1":
              return e11;
            default:
              throw TypeError('unsupported "digest" value');
          }
        })(e10), ((e11) => {
          const t11 = tJ(e11, "ikm");
          if (!t11.byteLength) throw TypeError('"ikm" must be at least one byte in length');
          return t11;
        })(t10), tJ(r10, "salt"), ((e11) => {
          const t11 = tJ(e11, "info");
          if (t11.byteLength > 1024) throw TypeError('"info" must not contain more than 1024 bytes');
          return t11;
        })(n10), ((e11, t11) => {
          if ("number" !== typeof e11 || !Number.isInteger(e11) || e11 < 1) throw TypeError('"keylen" must be a positive integer');
          if (e11 > 255 * (Number.parseInt(t11.substr(3), 10) >> 3 || 20)) throw TypeError('"keylen" too large');
          return e11;
        })(i10, e10));
      }
      const tF = crypto;
      const tV = async (e10, t10) => {
        const r10 = `SHA-${e10.slice(-3)}`;
        return new Uint8Array(await tF.subtle.digest(r10, t10));
      };
      const tX = new TextEncoder();
      const tG = new TextDecoder();
      function tY(...e10) {
        const t10 = new Uint8Array(e10.reduce((e11, { length: t11 }) => e11 + t11, 0));
        let r10 = 0;
        for (const n10 of e10) t10.set(n10, r10), r10 += n10.length;
        return t10;
      }
      function tQ(e10, t10, r10) {
        if (t10 < 0 || t10 >= 4294967296) throw RangeError(`value must be >= 0 and <= ${4294967296 - 1}. Received ${t10}`);
        e10.set([t10 >>> 24, t10 >>> 16, t10 >>> 8, 255 & t10], r10);
      }
      function tZ(e10) {
        const t10 = Math.floor(e10 / 4294967296);
        const r10 = new Uint8Array(8);
        return tQ(r10, t10, 0), tQ(r10, e10 % 4294967296, 4), r10;
      }
      function t0(e10) {
        const t10 = new Uint8Array(4);
        return tQ(t10, e10), t10;
      }
      function t1(e10) {
        return tY(t0(e10.length), e10);
      }
      async function t2(e10, t10, r10) {
        const n10 = Math.ceil((t10 >> 3) / 32);
        const i10 = new Uint8Array(32 * n10);
        for (let t11 = 0; t11 < n10; t11++) {
          const n11 = new Uint8Array(4 + e10.length + r10.length);
          n11.set(t0(t11 + 1)), n11.set(e10, 4), n11.set(r10, 4 + e10.length), i10.set(await tV("sha256", n11), 32 * t11);
        }
        return i10.slice(0, t10 >> 3);
      }
      const t3 = (e10) => ((e11) => {
        let t10 = e11;
        "string" === typeof t10 && (t10 = tX.encode(t10));
        const r10 = [];
        for (let e12 = 0; e12 < t10.length; e12 += 32768) r10.push(String.fromCharCode.apply(null, t10.subarray(e12, e12 + 32768)));
        return btoa(r10.join(""));
      })(e10).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      const t6 = (e10) => {
        let t10 = e10;
        t10 instanceof Uint8Array && (t10 = tG.decode(t10)), t10 = t10.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
        try {
          const r10 = t10;
          const e11 = atob(r10);
          const n10 = new Uint8Array(e11.length);
          for (let t11 = 0; t11 < e11.length; t11++) n10[t11] = e11.charCodeAt(t11);
          return n10;
        } catch {
          throw TypeError("The input to be decoded is not correctly encoded.");
        }
      };
      const t5 = Symbol();
      class t8 extends Error {
        constructor(e10, t10) {
          super(e10, t10), this.code = "ERR_JOSE_GENERIC", this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      t8.code = "ERR_JOSE_GENERIC";
      class t4 extends t8 {
        constructor(e10, t10, r10 = "unspecified", n10 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: n10, payload: t10 } }), this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED", this.claim = r10, this.reason = n10, this.payload = t10;
        }
      }
      t4.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
      class t9 extends t8 {
        constructor(e10, t10, r10 = "unspecified", n10 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: n10, payload: t10 } }), this.code = "ERR_JWT_EXPIRED", this.claim = r10, this.reason = n10, this.payload = t10;
        }
      }
      t9.code = "ERR_JWT_EXPIRED";
      class t7 extends t8 {
        constructor() {
          super(...arguments), this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
        }
      }
      t7.code = "ERR_JOSE_ALG_NOT_ALLOWED";
      class re extends t8 {
        constructor() {
          super(...arguments), this.code = "ERR_JOSE_NOT_SUPPORTED";
        }
      }
      re.code = "ERR_JOSE_NOT_SUPPORTED";
      class rt extends t8 {
        constructor(e10, t10) {
          super(e10, t10), this.code = "ERR_JWE_DECRYPTION_FAILED";
        }
      }
      rt.code = "ERR_JWE_DECRYPTION_FAILED";
      class rr extends t8 {
        constructor() {
          super(...arguments), this.code = "ERR_JWE_INVALID";
        }
      }
      rr.code = "ERR_JWE_INVALID";
      class rn extends t8 {
        constructor() {
          super(...arguments), this.code = "ERR_JWT_INVALID";
        }
      }
      rn.code = "ERR_JWT_INVALID";
      class ri extends t8 {
        constructor() {
          super(...arguments), this.code = "ERR_JWK_INVALID";
        }
      }
      ri.code = "ERR_JWK_INVALID";
      const ro = tF.getRandomValues.bind(tF);
      function ra(e10) {
        switch (e10) {
          case "A128GCM":
          case "A128GCMKW":
          case "A192GCM":
          case "A192GCMKW":
          case "A256GCM":
          case "A256GCMKW":
            return 96;
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return 128;
          default:
            throw new re(`Unsupported JWE Algorithm: ${e10}`);
        }
      }
      const rs = (e10, t10) => {
        if (t10.length << 3 !== ra(e10)) throw new rr("Invalid Initialization Vector length");
      };
      const rc = (e10, t10) => {
        const r10 = e10.byteLength << 3;
        if (r10 !== t10) throw new rr(`Invalid Content Encryption Key length. Expected ${t10} bits, got ${r10} bits`);
      };
      function rl(e10, t10 = "algorithm.name") {
        return TypeError(`CryptoKey does not support this operation, its ${t10} must be ${e10}`);
      }
      function ru(e10, t10) {
        return e10.name === t10;
      }
      function rd(e10, t10, ...r10) {
        switch (t10) {
          case "A128GCM":
          case "A192GCM":
          case "A256GCM": {
            if (!ru(e10.algorithm, "AES-GCM")) throw rl("AES-GCM");
            const r11 = Number.parseInt(t10.slice(1, 4), 10);
            if (e10.algorithm.length !== r11) throw rl(r11, "algorithm.length");
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW": {
            if (!ru(e10.algorithm, "AES-KW")) throw rl("AES-KW");
            const r11 = Number.parseInt(t10.slice(1, 4), 10);
            if (e10.algorithm.length !== r11) throw rl(r11, "algorithm.length");
            break;
          }
          case "ECDH":
            switch (e10.algorithm.name) {
              case "ECDH":
              case "X25519":
              case "X448":
                break;
              default:
                throw rl("ECDH, X25519, or X448");
            }
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW":
            if (!ru(e10.algorithm, "PBKDF2")) throw rl("PBKDF2");
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512": {
            if (!ru(e10.algorithm, "RSA-OAEP")) throw rl("RSA-OAEP");
            const r11 = Number.parseInt(t10.slice(9), 10) || 1;
            if (Number.parseInt(e10.algorithm.hash.name.slice(4), 10) !== r11) throw rl(`SHA-${r11}`, "algorithm.hash");
            break;
          }
          default:
            throw TypeError("CryptoKey does not support this operation");
        }
        if (r10.length && !r10.some((t11) => e10.usages.includes(t11))) {
          let e11 = "CryptoKey does not support this operation, its usages must include ";
          if (r10.length > 2) {
            const t11 = r10.pop();
            e11 += `one of ${r10.join(", ")}, or ${t11}.`;
          } else 2 === r10.length ? e11 += `one of ${r10[0]} or ${r10[1]}.` : e11 += `${r10[0]}.`;
          throw TypeError(e11);
        }
      }
      function rp(e10, t10, ...r10) {
        if ((r10 = r10.filter(Boolean)).length > 2) {
          const t11 = r10.pop();
          e10 += `one of type ${r10.join(", ")}, or ${t11}.`;
        } else 2 === r10.length ? e10 += `one of type ${r10[0]} or ${r10[1]}.` : e10 += `of type ${r10[0]}.`;
        return null == t10 ? e10 += ` Received ${t10}` : "function" === typeof t10 && t10.name ? e10 += ` Received function ${t10.name}` : "object" === typeof t10 && null != t10 && t10.constructor?.name && (e10 += ` Received an instance of ${t10.constructor.name}`), e10;
      }
      const rh = (e10, ...t10) => rp("Key must be ", e10, ...t10);
      function rf(e10, t10, ...r10) {
        return rp(`Key for the ${e10} algorithm must be `, t10, ...r10);
      }
      const ry = (e10) => e10 instanceof CryptoKey || e10?.[Symbol.toStringTag] === "KeyObject";
      const rm = ["CryptoKey"];
      async function rg(e10, t10, r10, n10, i10) {
        if (!(r10 instanceof Uint8Array)) throw TypeError(rh(r10, "Uint8Array"));
        const o10 = Number.parseInt(e10.slice(1, 4), 10);
        const a10 = await tF.subtle.importKey("raw", r10.subarray(o10 >> 3), "AES-CBC", false, ["encrypt"]);
        const s2 = await tF.subtle.importKey("raw", r10.subarray(0, o10 >> 3), { hash: `SHA-${o10 << 1}`, name: "HMAC" }, false, ["sign"]);
        const c2 = new Uint8Array(await tF.subtle.encrypt({ iv: n10, name: "AES-CBC" }, a10, t10));
        const l2 = tY(i10, n10, c2, tZ(i10.length << 3));
        return { ciphertext: c2, tag: new Uint8Array((await tF.subtle.sign("HMAC", s2, l2)).slice(0, o10 >> 3)), iv: n10 };
      }
      async function rw(e10, t10, r10, n10, i10) {
        let o10;
        r10 instanceof Uint8Array ? o10 = await tF.subtle.importKey("raw", r10, "AES-GCM", false, ["encrypt"]) : (rd(r10, e10, "encrypt"), o10 = r10);
        const a10 = new Uint8Array(await tF.subtle.encrypt({ additionalData: i10, iv: n10, name: "AES-GCM", tagLength: 128 }, o10, t10));
        const s2 = a10.slice(-16);
        return { ciphertext: a10.slice(0, -16), tag: s2, iv: n10 };
      }
      const rb = async (e10, t10, r10, n10, i10) => {
        if (!(r10 instanceof CryptoKey) && !(r10 instanceof Uint8Array)) throw TypeError(rh(r10, ...rm, "Uint8Array"));
        switch (n10 ? rs(e10, n10) : n10 = ro(new Uint8Array(ra(e10) >> 3)), e10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return r10 instanceof Uint8Array && rc(r10, Number.parseInt(e10.slice(-3), 10)), rg(e10, t10, r10, n10, i10);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return r10 instanceof Uint8Array && rc(r10, Number.parseInt(e10.slice(1, 4), 10)), rw(e10, t10, r10, n10, i10);
          default:
            throw new re("Unsupported JWE Content Encryption Algorithm");
        }
      };
      const rv = [{ hash: "SHA-256", name: "HMAC" }, true, ["sign"]];
      function r_(e10, t10) {
        if (e10.algorithm.length !== Number.parseInt(t10.slice(1, 4), 10)) throw TypeError(`Invalid key size for alg: ${t10}`);
      }
      function rE(e10, t10, r10) {
        if (e10 instanceof CryptoKey) return rd(e10, t10, r10), e10;
        if (e10 instanceof Uint8Array) return tF.subtle.importKey("raw", e10, "AES-KW", true, [r10]);
        throw TypeError(rh(e10, ...rm, "Uint8Array"));
      }
      const rS = async (e10, t10, r10) => {
        const n10 = await rE(t10, e10, "wrapKey");
        r_(n10, e10);
        const i10 = await tF.subtle.importKey("raw", r10, ...rv);
        return new Uint8Array(await tF.subtle.wrapKey("raw", i10, n10, "AES-KW"));
      };
      const rk = async (e10, t10, r10) => {
        const n10 = await rE(t10, e10, "unwrapKey");
        r_(n10, e10);
        const i10 = await tF.subtle.unwrapKey("raw", r10, n10, "AES-KW", ...rv);
        return new Uint8Array(await tF.subtle.exportKey("raw", i10));
      };
      async function rx(e10, t10, r10, n10, i10 = new Uint8Array(0), o10 = new Uint8Array(0)) {
        let a10;
        if (!(e10 instanceof CryptoKey)) throw TypeError(rh(e10, ...rm));
        if (rd(e10, "ECDH"), !(t10 instanceof CryptoKey)) throw TypeError(rh(t10, ...rm));
        rd(t10, "ECDH", "deriveBits");
        const s2 = tY(t1(tX.encode(r10)), t1(i10), t1(o10), t0(n10));
        return a10 = "X25519" === e10.algorithm.name ? 256 : "X448" === e10.algorithm.name ? 448 : Math.ceil(Number.parseInt(e10.algorithm.namedCurve.substr(-3), 10) / 8) << 3, t2(new Uint8Array(await tF.subtle.deriveBits({ name: e10.algorithm.name, public: e10 }, t10, a10)), n10, s2);
      }
      async function rR(e10) {
        if (!(e10 instanceof CryptoKey)) throw TypeError(rh(e10, ...rm));
        return tF.subtle.generateKey(e10.algorithm, true, ["deriveBits"]);
      }
      function rA(e10) {
        if (!(e10 instanceof CryptoKey)) throw TypeError(rh(e10, ...rm));
        return ["P-256", "P-384", "P-521"].includes(e10.algorithm.namedCurve) || "X25519" === e10.algorithm.name || "X448" === e10.algorithm.name;
      }
      async function rT(e10, t10, r10, n10) {
        if (!(e10 instanceof Uint8Array) || e10.length < 8) throw new rr("PBES2 Salt Input must be 8 or more octets");
        const i10 = tY(tX.encode(t10), new Uint8Array([0]), e10);
        const o10 = Number.parseInt(t10.slice(13, 16), 10);
        const a10 = { hash: `SHA-${t10.slice(8, 11)}`, iterations: r10, name: "PBKDF2", salt: i10 };
        const s2 = await ((e11, t11) => {
          if (e11 instanceof Uint8Array) return tF.subtle.importKey("raw", e11, "PBKDF2", false, ["deriveBits"]);
          if (e11 instanceof CryptoKey) return rd(e11, t11, "deriveBits", "deriveKey"), e11;
          throw TypeError(rh(e11, ...rm, "Uint8Array"));
        })(n10, t10);
        if (s2.usages.includes("deriveBits")) return new Uint8Array(await tF.subtle.deriveBits(a10, s2, o10));
        if (s2.usages.includes("deriveKey")) return tF.subtle.deriveKey(a10, s2, { length: o10, name: "AES-KW" }, false, ["wrapKey", "unwrapKey"]);
        throw TypeError('PBKDF2 key "usages" must include "deriveBits" or "deriveKey"');
      }
      const rC = async (e10, t10, r10, n10 = 2048, i10 = ro(new Uint8Array(16))) => {
        const o10 = await rT(i10, e10, n10, t10);
        return { encryptedKey: await rS(e10.slice(-6), o10, r10), p2c: n10, p2s: t3(i10) };
      };
      const rP = async (e10, t10, r10, n10, i10) => {
        const o10 = await rT(i10, e10, n10, t10);
        return rk(e10.slice(-6), o10, r10);
      };
      function rO(e10) {
        switch (e10) {
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            return "RSA-OAEP";
          default:
            throw new re(`alg ${e10} is not supported either by JOSE or your javascript runtime`);
        }
      }
      const rU = (e10, t10) => {
        if (e10.startsWith("RS") || e10.startsWith("PS")) {
          const { modulusLength: r10 } = t10.algorithm;
          if ("number" !== typeof r10 || r10 < 2048) throw TypeError(`${e10} requires key modulusLength to be 2048 bits or larger`);
        }
      };
      const rI = async (e10, t10, r10) => {
        if (!(t10 instanceof CryptoKey)) throw TypeError(rh(t10, ...rm));
        if (rd(t10, e10, "encrypt", "wrapKey"), rU(e10, t10), t10.usages.includes("encrypt")) return new Uint8Array(await tF.subtle.encrypt(rO(e10), t10, r10));
        if (t10.usages.includes("wrapKey")) {
          const n10 = await tF.subtle.importKey("raw", r10, ...rv);
          return new Uint8Array(await tF.subtle.wrapKey("raw", n10, t10, rO(e10)));
        }
        throw TypeError('RSA-OAEP key "usages" must include "encrypt" or "wrapKey" for this operation');
      };
      const rN = async (e10, t10, r10) => {
        if (!(t10 instanceof CryptoKey)) throw TypeError(rh(t10, ...rm));
        if (rd(t10, e10, "decrypt", "unwrapKey"), rU(e10, t10), t10.usages.includes("decrypt")) return new Uint8Array(await tF.subtle.decrypt(rO(e10), t10, r10));
        if (t10.usages.includes("unwrapKey")) {
          const n10 = await tF.subtle.unwrapKey("raw", r10, t10, rO(e10), ...rv);
          return new Uint8Array(await tF.subtle.exportKey("raw", n10));
        }
        throw TypeError('RSA-OAEP key "usages" must include "decrypt" or "unwrapKey" for this operation');
      };
      function r$(e10) {
        if ("object" !== typeof e10 || null === e10 || "[object Object]" !== Object.prototype.toString.call(e10)) return false;
        if (null === Object.getPrototypeOf(e10)) return true;
        let t10 = e10;
        while (null !== Object.getPrototypeOf(t10)) t10 = Object.getPrototypeOf(t10);
        return Object.getPrototypeOf(e10) === t10;
      }
      function rD(e10) {
        return r$(e10) && "string" === typeof e10.kty;
      }
      const rj = async (e10) => {
        if (!e10.alg) throw TypeError('"alg" argument is required when "jwk.alg" is not present');
        const { algorithm: t10, keyUsages: r10 } = ((e11) => {
          let t11;
          let r11;
          switch (e11.kty) {
            case "RSA":
              switch (e11.alg) {
                case "PS256":
                case "PS384":
                case "PS512":
                  t11 = { name: "RSA-PSS", hash: `SHA-${e11.alg.slice(-3)}` }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RS256":
                case "RS384":
                case "RS512":
                  t11 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e11.alg.slice(-3)}` }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RSA-OAEP":
                case "RSA-OAEP-256":
                case "RSA-OAEP-384":
                case "RSA-OAEP-512":
                  t11 = { name: "RSA-OAEP", hash: `SHA-${Number.parseInt(e11.alg.slice(-3), 10) || 1}` }, r11 = e11.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
                  break;
                default:
                  throw new re('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "EC":
              switch (e11.alg) {
                case "ES256":
                  t11 = { name: "ECDSA", namedCurve: "P-256" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ES384":
                  t11 = { name: "ECDSA", namedCurve: "P-384" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ES512":
                  t11 = { name: "ECDSA", namedCurve: "P-521" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t11 = { name: "ECDH", namedCurve: e11.crv }, r11 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new re('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "OKP":
              switch (e11.alg) {
                case "Ed25519":
                  t11 = { name: "Ed25519" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "EdDSA":
                  t11 = { name: e11.crv }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t11 = { name: e11.crv }, r11 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new re('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            default:
              throw new re('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
          }
          return { algorithm: t11, keyUsages: r11 };
        })(e10);
        const n10 = [t10, e10.ext ?? false, e10.key_ops ?? r10];
        const i10 = { ...e10 };
        return i10.alg = undefined, i10.use = undefined, tF.subtle.importKey("jwk", i10, ...n10);
      };
      const rH = (e10) => e10?.[Symbol.toStringTag] === "KeyObject";
      const rL = async (e10, t10, r10, n10, i10 = false) => {
        const o10 = e10.get(t10);
        if (o10?.[n10]) return o10[n10];
        const a10 = await rj({ ...r10, alg: n10 });
        return i10 && Object.freeze(t10), o10 ? o10[n10] = a10 : e10.set(t10, { [n10]: a10 }), a10;
      };
      const rM = (e10, t10) => {
        if (rH(e10)) {
          const r10 = e10.export({ format: "jwk" });
          return (r10.d = undefined, r10.dp = undefined, r10.dq = undefined, r10.p = undefined, r10.q = undefined, r10.qi = undefined, r10.k) ? t6(r10.k) : (n || (n = /* @__PURE__ */ new WeakMap()), rL(n, e10, r10, t10));
        }
        return rD(e10) ? e10.k ? t6(e10.k) : (n || (n = /* @__PURE__ */ new WeakMap()), rL(n, e10, e10, t10, true)) : e10;
      };
      const rW = (e10, t10) => {
        if (rH(e10)) {
          const n10 = e10.export({ format: "jwk" });
          return n10.k ? t6(n10.k) : (r || (r = /* @__PURE__ */ new WeakMap()), rL(r, e10, n10, t10));
        }
        return rD(e10) ? e10.k ? t6(e10.k) : (r || (r = /* @__PURE__ */ new WeakMap()), rL(r, e10, e10, t10, true)) : e10;
      };
      function rK(e10) {
        switch (e10) {
          case "A128GCM":
            return 128;
          case "A192GCM":
            return 192;
          case "A256GCM":
          case "A128CBC-HS256":
            return 256;
          case "A192CBC-HS384":
            return 384;
          case "A256CBC-HS512":
            return 512;
          default:
            throw new re(`Unsupported JWE Algorithm: ${e10}`);
        }
      }
      const rq = (e10) => ro(new Uint8Array(rK(e10) >> 3));
      const rB = async (e10) => {
        if (e10 instanceof Uint8Array) return { kty: "oct", k: t3(e10) };
        if (!(e10 instanceof CryptoKey)) throw TypeError(rh(e10, ...rm, "Uint8Array"));
        if (!e10.extractable) throw TypeError("non-extractable CryptoKey cannot be exported as a JWK");
        const { ext: t10, key_ops: r10, alg: n10, use: i10, ...o10 } = await tF.subtle.exportKey("jwk", e10);
        return o10;
      };
      async function rJ(e10) {
        return rB(e10);
      }
      const rz = (e10) => e10?.[Symbol.toStringTag];
      const rF = (e10, t10, r10) => {
        if (void 0 !== t10.use && "sig" !== t10.use) throw TypeError("Invalid key for this operation, when present its use must be sig");
        if (void 0 !== t10.key_ops && t10.key_ops.includes?.(r10) !== true) throw TypeError(`Invalid key for this operation, when present its key_ops must include ${r10}`);
        if (void 0 !== t10.alg && t10.alg !== e10) throw TypeError(`Invalid key for this operation, when present its alg must be ${e10}`);
        return true;
      };
      function rV(e10, t10, r10, n10) {
        t10.startsWith("HS") || "dir" === t10 || t10.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(t10) ? ((e11, t11, r11, n11) => {
          if (!(t11 instanceof Uint8Array)) {
            if (n11 && rD(t11)) {
              if (rD(t11) && "oct" === t11.kty && "string" === typeof t11.k && rF(e11, t11, r11)) return;
              throw TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
            }
            if (!ry(t11)) throw TypeError(rf(e11, t11, ...rm, "Uint8Array", n11 ? "JSON Web Key" : null));
            if ("secret" !== t11.type) throw TypeError(`${rz(t11)} instances for symmetric algorithms must be of type "secret"`);
          }
        })(t10, r10, n10, e10) : ((e11, t11, r11, n11) => {
          if (n11 && rD(t11)) switch (r11) {
            case "sign":
              if ("oct" !== t11.kty && "string" === typeof t11.d && rF(e11, t11, r11)) return;
              throw TypeError("JSON Web Key for this operation be a private JWK");
            case "verify":
              if ("oct" !== t11.kty && void 0 === t11.d && rF(e11, t11, r11)) return;
              throw TypeError("JSON Web Key for this operation be a public JWK");
          }
          if (!ry(t11)) throw TypeError(rf(e11, t11, ...rm, n11 ? "JSON Web Key" : null));
          if ("secret" === t11.type) throw TypeError(`${rz(t11)} instances for asymmetric algorithms must not be of type "secret"`);
          if ("sign" === r11 && "public" === t11.type) throw TypeError(`${rz(t11)} instances for asymmetric algorithm signing must be of type "private"`);
          if ("decrypt" === r11 && "public" === t11.type) throw TypeError(`${rz(t11)} instances for asymmetric algorithm decryption must be of type "private"`);
          if (t11.algorithm && "verify" === r11 && "private" === t11.type) throw TypeError(`${rz(t11)} instances for asymmetric algorithm verifying must be of type "public"`);
          if (t11.algorithm && "encrypt" === r11 && "private" === t11.type) throw TypeError(`${rz(t11)} instances for asymmetric algorithm encryption must be of type "public"`);
        })(t10, r10, n10, e10);
      }
      const rX = rV.bind(void 0, false);
      async function rG(e10, t10, r10, n10, i10, o10) {
        let a10;
        let s2;
        if (!(t10 instanceof Uint8Array)) throw TypeError(rh(t10, "Uint8Array"));
        const c2 = Number.parseInt(e10.slice(1, 4), 10);
        const l2 = await tF.subtle.importKey("raw", t10.subarray(c2 >> 3), "AES-CBC", false, ["decrypt"]);
        const u2 = await tF.subtle.importKey("raw", t10.subarray(0, c2 >> 3), { hash: `SHA-${c2 << 1}`, name: "HMAC" }, false, ["sign"]);
        const d2 = tY(o10, n10, r10, tZ(o10.length << 3));
        const p2 = new Uint8Array((await tF.subtle.sign("HMAC", u2, d2)).slice(0, c2 >> 3));
        try {
          a10 = ((e11, t11) => {
            if (!(e11 instanceof Uint8Array)) throw TypeError("First argument must be a buffer");
            if (!(t11 instanceof Uint8Array)) throw TypeError("Second argument must be a buffer");
            if (e11.length !== t11.length) throw TypeError("Input buffers must have the same length");
            const r11 = e11.length;
            let n11 = 0;
            let i11 = -1;
            while (++i11 < r11) n11 |= e11[i11] ^ t11[i11];
            return 0 === n11;
          })(i10, p2);
        } catch {
        }
        if (!a10) throw new rt();
        try {
          s2 = new Uint8Array(await tF.subtle.decrypt({ iv: n10, name: "AES-CBC" }, l2, r10));
        } catch {
        }
        if (!s2) throw new rt();
        return s2;
      }
      async function rY(e10, t10, r10, n10, i10, o10) {
        let a10;
        t10 instanceof Uint8Array ? a10 = await tF.subtle.importKey("raw", t10, "AES-GCM", false, ["decrypt"]) : (rd(t10, e10, "decrypt"), a10 = t10);
        try {
          return new Uint8Array(await tF.subtle.decrypt({ additionalData: o10, iv: n10, name: "AES-GCM", tagLength: 128 }, a10, tY(r10, i10)));
        } catch {
          throw new rt();
        }
      }
      rV.bind(void 0, true);
      const rQ = async (e10, t10, r10, n10, i10, o10) => {
        if (!(t10 instanceof CryptoKey) && !(t10 instanceof Uint8Array)) throw TypeError(rh(t10, ...rm, "Uint8Array"));
        if (!n10) throw new rr("JWE Initialization Vector missing");
        if (!i10) throw new rr("JWE Authentication Tag missing");
        switch (rs(e10, n10), e10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return t10 instanceof Uint8Array && rc(t10, Number.parseInt(e10.slice(-3), 10)), rG(e10, t10, r10, n10, i10, o10);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return t10 instanceof Uint8Array && rc(t10, Number.parseInt(e10.slice(1, 4), 10)), rY(e10, t10, r10, n10, i10, o10);
          default:
            throw new re("Unsupported JWE Content Encryption Algorithm");
        }
      };
      async function rZ(e10, t10, r10, n10) {
        const i10 = e10.slice(0, 7);
        const o10 = await rb(i10, r10, t10, n10, new Uint8Array(0));
        return { encryptedKey: o10.ciphertext, iv: t3(o10.iv), tag: t3(o10.tag) };
      }
      async function r0(e10, t10, r10, n10, i10) {
        return rQ(e10.slice(0, 7), t10, r10, n10, i10, new Uint8Array(0));
      }
      async function r1(e10, t10, r10, n10, i10 = {}) {
        let o10;
        let a10;
        let s2;
        switch (rX(e10, r10, "encrypt"), r10 = await rM?.(r10, e10) || r10, e10) {
          case "dir":
            s2 = r10;
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            if (!rA(r10)) throw new re("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            const { apu: c2, apv: l2 } = i10;
            let { epk: u2 } = i10;
            u2 || (u2 = (await rR(r10)).privateKey);
            const { x: d2, y: p2, crv: h2, kty: f2 } = await rJ(u2);
            const y2 = await rx(r10, u2, "ECDH-ES" === e10 ? t10 : e10, "ECDH-ES" === e10 ? rK(t10) : Number.parseInt(e10.slice(-5, -2), 10), c2, l2);
            if (a10 = { epk: { x: d2, crv: h2, kty: f2 } }, "EC" === f2 && (a10.epk.y = p2), c2 && (a10.apu = t3(c2)), l2 && (a10.apv = t3(l2)), "ECDH-ES" === e10) {
              s2 = y2;
              break;
            }
            s2 = n10 || rq(t10);
            const m2 = e10.slice(-6);
            o10 = await rS(m2, y2, s2);
            break;
          }
          case "RSA1_5":
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            s2 = n10 || rq(t10), o10 = await rI(e10, r10, s2);
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            s2 = n10 || rq(t10);
            const { p2c: c2, p2s: l2 } = i10;
            ({ encryptedKey: o10, ...a10 } = await rC(e10, r10, s2, c2, l2));
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            s2 = n10 || rq(t10), o10 = await rS(e10, r10, s2);
            break;
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW": {
            s2 = n10 || rq(t10);
            const { iv: c2 } = i10;
            ({ encryptedKey: o10, ...a10 } = await rZ(e10, r10, s2, c2));
            break;
          }
          default:
            throw new re('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
        return { cek: s2, encryptedKey: o10, parameters: a10 };
      }
      const r2 = (...e10) => {
        let t10;
        const r10 = e10.filter(Boolean);
        if (0 === r10.length || 1 === r10.length) return true;
        for (const e11 of r10) {
          const r11 = Object.keys(e11);
          if (!t10 || 0 === t10.size) {
            t10 = new Set(r11);
            continue;
          }
          for (const e12 of r11) {
            if (t10.has(e12)) return false;
            t10.add(e12);
          }
        }
        return true;
      };
      const r3 = (e10, t10, r10, n10, i10) => {
        let o10;
        if (void 0 !== i10.crit && n10?.crit === void 0) throw new e10('"crit" (Critical) Header Parameter MUST be integrity protected');
        if (!n10 || void 0 === n10.crit) return /* @__PURE__ */ new Set();
        if (!Array.isArray(n10.crit) || 0 === n10.crit.length || n10.crit.some((e11) => "string" !== typeof e11 || 0 === e11.length)) throw new e10('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
        for (const a10 of (o10 = void 0 !== r10 ? new Map([...Object.entries(r10), ...t10.entries()]) : t10, n10.crit)) {
          if (!o10.has(a10)) throw new re(`Extension Header Parameter "${a10}" is not recognized`);
          if (void 0 === i10[a10]) throw new e10(`Extension Header Parameter "${a10}" is missing`);
          if (o10.get(a10) && void 0 === n10[a10]) throw new e10(`Extension Header Parameter "${a10}" MUST be integrity protected`);
        }
        return new Set(n10.crit);
      };
      class r6 {
        constructor(e10) {
          if (!(e10 instanceof Uint8Array)) throw TypeError("plaintext must be an instance of Uint8Array");
          this._plaintext = e10;
        }
        setKeyManagementParameters(e10) {
          if (this._keyManagementParameters) throw TypeError("setKeyManagementParameters can only be called once");
          return this._keyManagementParameters = e10, this;
        }
        setProtectedHeader(e10) {
          if (this._protectedHeader) throw TypeError("setProtectedHeader can only be called once");
          return this._protectedHeader = e10, this;
        }
        setSharedUnprotectedHeader(e10) {
          if (this._sharedUnprotectedHeader) throw TypeError("setSharedUnprotectedHeader can only be called once");
          return this._sharedUnprotectedHeader = e10, this;
        }
        setUnprotectedHeader(e10) {
          if (this._unprotectedHeader) throw TypeError("setUnprotectedHeader can only be called once");
          return this._unprotectedHeader = e10, this;
        }
        setAdditionalAuthenticatedData(e10) {
          return this._aad = e10, this;
        }
        setContentEncryptionKey(e10) {
          if (this._cek) throw TypeError("setContentEncryptionKey can only be called once");
          return this._cek = e10, this;
        }
        setInitializationVector(e10) {
          if (this._iv) throw TypeError("setInitializationVector can only be called once");
          return this._iv = e10, this;
        }
        async encrypt(e10, t10) {
          let r10;
          let n10;
          let i10;
          let o10;
          let a10;
          if (!this._protectedHeader && !this._unprotectedHeader && !this._sharedUnprotectedHeader) throw new rr("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
          if (!r2(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader)) throw new rr("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
          const s2 = { ...this._protectedHeader, ...this._unprotectedHeader, ...this._sharedUnprotectedHeader };
          if (r3(rr, /* @__PURE__ */ new Map(), t10?.crit, this._protectedHeader, s2), void 0 !== s2.zip) throw new re('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
          const { alg: c2, enc: l2 } = s2;
          if ("string" !== typeof c2 || !c2) throw new rr('JWE "alg" (Algorithm) Header Parameter missing or invalid');
          if ("string" !== typeof l2 || !l2) throw new rr('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
          if (this._cek && ("dir" === c2 || "ECDH-ES" === c2)) throw TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${c2}`);
          {
            let i11;
            ({ cek: n10, encryptedKey: r10, parameters: i11 } = await r1(c2, l2, e10, this._cek, this._keyManagementParameters)), i11 && (t10 && t5 in t10 ? this._unprotectedHeader ? this._unprotectedHeader = { ...this._unprotectedHeader, ...i11 } : this.setUnprotectedHeader(i11) : this._protectedHeader ? this._protectedHeader = { ...this._protectedHeader, ...i11 } : this.setProtectedHeader(i11));
          }
          o10 = this._protectedHeader ? tX.encode(t3(JSON.stringify(this._protectedHeader))) : tX.encode(""), this._aad ? (a10 = t3(this._aad), i10 = tY(o10, tX.encode("."), tX.encode(a10))) : i10 = o10;
          const { ciphertext: u2, tag: d2, iv: p2 } = await rb(l2, this._plaintext, n10, this._iv, i10);
          const h2 = { ciphertext: t3(u2) };
          return p2 && (h2.iv = t3(p2)), d2 && (h2.tag = t3(d2)), r10 && (h2.encrypted_key = t3(r10)), a10 && (h2.aad = a10), this._protectedHeader && (h2.protected = tG.decode(o10)), this._sharedUnprotectedHeader && (h2.unprotected = this._sharedUnprotectedHeader), this._unprotectedHeader && (h2.header = this._unprotectedHeader), h2;
        }
      }
      class r5 {
        constructor(e10) {
          this._flattened = new r6(e10);
        }
        setContentEncryptionKey(e10) {
          return this._flattened.setContentEncryptionKey(e10), this;
        }
        setInitializationVector(e10) {
          return this._flattened.setInitializationVector(e10), this;
        }
        setProtectedHeader(e10) {
          return this._flattened.setProtectedHeader(e10), this;
        }
        setKeyManagementParameters(e10) {
          return this._flattened.setKeyManagementParameters(e10), this;
        }
        async encrypt(e10, t10) {
          const r10 = await this._flattened.encrypt(e10, t10);
          return [r10.protected, r10.encrypted_key, r10.iv, r10.ciphertext, r10.tag].join(".");
        }
      }
      const r8 = (e10) => Math.floor(e10.getTime() / 1e3);
      const r4 = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
      const r9 = (e10) => {
        let t10;
        const r10 = r4.exec(e10);
        if (!r10 || r10[4] && r10[1]) throw TypeError("Invalid time period format");
        const n10 = Number.parseFloat(r10[2]);
        switch (r10[3].toLowerCase()) {
          case "sec":
          case "secs":
          case "second":
          case "seconds":
          case "s":
            t10 = Math.round(n10);
            break;
          case "minute":
          case "minutes":
          case "min":
          case "mins":
          case "m":
            t10 = Math.round(60 * n10);
            break;
          case "hour":
          case "hours":
          case "hr":
          case "hrs":
          case "h":
            t10 = Math.round(3600 * n10);
            break;
          case "day":
          case "days":
          case "d":
            t10 = Math.round(86400 * n10);
            break;
          case "week":
          case "weeks":
          case "w":
            t10 = Math.round(604800 * n10);
            break;
          default:
            t10 = Math.round(31557600 * n10);
        }
        return "-" === r10[1] || "ago" === r10[4] ? -t10 : t10;
      };
      function r7(e10, t10) {
        if (!Number.isFinite(t10)) throw TypeError(`Invalid ${e10} input`);
        return t10;
      }
      class ne {
        constructor(e10 = {}) {
          if (!r$(e10)) throw TypeError("JWT Claims Set MUST be an object");
          this._payload = e10;
        }
        setIssuer(e10) {
          return this._payload = { ...this._payload, iss: e10 }, this;
        }
        setSubject(e10) {
          return this._payload = { ...this._payload, sub: e10 }, this;
        }
        setAudience(e10) {
          return this._payload = { ...this._payload, aud: e10 }, this;
        }
        setJti(e10) {
          return this._payload = { ...this._payload, jti: e10 }, this;
        }
        setNotBefore(e10) {
          return "number" === typeof e10 ? this._payload = { ...this._payload, nbf: r7("setNotBefore", e10) } : e10 instanceof Date ? this._payload = { ...this._payload, nbf: r7("setNotBefore", r8(e10)) } : this._payload = { ...this._payload, nbf: r8(/* @__PURE__ */ new Date()) + r9(e10) }, this;
        }
        setExpirationTime(e10) {
          return "number" === typeof e10 ? this._payload = { ...this._payload, exp: r7("setExpirationTime", e10) } : e10 instanceof Date ? this._payload = { ...this._payload, exp: r7("setExpirationTime", r8(e10)) } : this._payload = { ...this._payload, exp: r8(/* @__PURE__ */ new Date()) + r9(e10) }, this;
        }
        setIssuedAt(e10) {
          return void 0 === e10 ? this._payload = { ...this._payload, iat: r8(/* @__PURE__ */ new Date()) } : e10 instanceof Date ? this._payload = { ...this._payload, iat: r7("setIssuedAt", r8(e10)) } : "string" === typeof e10 ? this._payload = { ...this._payload, iat: r7("setIssuedAt", r8(/* @__PURE__ */ new Date()) + r9(e10)) } : this._payload = { ...this._payload, iat: r7("setIssuedAt", e10) }, this;
        }
      }
      class nt extends ne {
        setProtectedHeader(e10) {
          if (this._protectedHeader) throw TypeError("setProtectedHeader can only be called once");
          return this._protectedHeader = e10, this;
        }
        setKeyManagementParameters(e10) {
          if (this._keyManagementParameters) throw TypeError("setKeyManagementParameters can only be called once");
          return this._keyManagementParameters = e10, this;
        }
        setContentEncryptionKey(e10) {
          if (this._cek) throw TypeError("setContentEncryptionKey can only be called once");
          return this._cek = e10, this;
        }
        setInitializationVector(e10) {
          if (this._iv) throw TypeError("setInitializationVector can only be called once");
          return this._iv = e10, this;
        }
        replicateIssuerAsHeader() {
          return this._replicateIssuerAsHeader = true, this;
        }
        replicateSubjectAsHeader() {
          return this._replicateSubjectAsHeader = true, this;
        }
        replicateAudienceAsHeader() {
          return this._replicateAudienceAsHeader = true, this;
        }
        async encrypt(e10, t10) {
          const r10 = new r5(tX.encode(JSON.stringify(this._payload)));
          return this._replicateIssuerAsHeader && (this._protectedHeader = { ...this._protectedHeader, iss: this._payload.iss }), this._replicateSubjectAsHeader && (this._protectedHeader = { ...this._protectedHeader, sub: this._payload.sub }), this._replicateAudienceAsHeader && (this._protectedHeader = { ...this._protectedHeader, aud: this._payload.aud }), r10.setProtectedHeader(this._protectedHeader), this._iv && r10.setInitializationVector(this._iv), this._cek && r10.setContentEncryptionKey(this._cek), this._keyManagementParameters && r10.setKeyManagementParameters(this._keyManagementParameters), r10.encrypt(e10, t10);
        }
      }
      e.s(["decode", 0, t6, "encode", 0, t3], 806674);
      const nr = e.i(806674);
      const nr = nr;
      const nn = (e10, t10) => {
        if ("string" !== typeof e10 || !e10) throw new ri(`${t10} missing or invalid`);
      };
      async function ni(e10, t10) {
        let r10;
        if (!r$(e10)) throw TypeError("JWK must be an object");
        if (t10 ?? (t10 = "sha256"), "sha256" !== t10 && "sha384" !== t10 && "sha512" !== t10) throw TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
        switch (e10.kty) {
          case "EC":
            nn(e10.crv, '"crv" (Curve) Parameter'), nn(e10.x, '"x" (X Coordinate) Parameter'), nn(e10.y, '"y" (Y Coordinate) Parameter'), r10 = { crv: e10.crv, kty: e10.kty, x: e10.x, y: e10.y };
            break;
          case "OKP":
            nn(e10.crv, '"crv" (Subtype of Key Pair) Parameter'), nn(e10.x, '"x" (Public Key) Parameter'), r10 = { crv: e10.crv, kty: e10.kty, x: e10.x };
            break;
          case "RSA":
            nn(e10.e, '"e" (Exponent) Parameter'), nn(e10.n, '"n" (Modulus) Parameter'), r10 = { e: e10.e, kty: e10.kty, n: e10.n };
            break;
          case "oct":
            nn(e10.k, '"k" (Key Value) Parameter'), r10 = { k: e10.k, kty: e10.kty };
            break;
          default:
            throw new re('"kty" (Key Type) Parameter missing or unsupported');
        }
        const n10 = tX.encode(JSON.stringify(r10));
        return t3(await tV(t10, n10));
      }
      async function no(e10, t10) {
        if (!r$(e10)) throw TypeError("JWK must be an object");
        switch (t10 || (t10 = e10.alg), e10.kty) {
          case "oct":
            if ("string" !== typeof e10.k || !e10.k) throw TypeError('missing "k" (Key Value) Parameter value');
            return t6(e10.k);
          case "RSA":
            if ("oth" in e10 && void 0 !== e10.oth) throw new re('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
          case "EC":
          case "OKP":
            return rj({ ...e10, alg: t10 });
          default:
            throw new re('Unsupported "kty" (Key Type) Parameter value');
        }
      }
      async function na(e10, t10, r10, n10, i10) {
        switch (rX(e10, t10, "decrypt"), t10 = await rW?.(t10, e10) || t10, e10) {
          case "dir":
            if (void 0 !== r10) throw new rr("Encountered unexpected JWE Encrypted Key");
            return t10;
          case "ECDH-ES":
            if (void 0 !== r10) throw new rr("Encountered unexpected JWE Encrypted Key");
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            let i11;
            let o10;
            if (!r$(n10.epk)) throw new rr('JOSE Header "epk" (Ephemeral Public Key) missing or invalid');
            if (!rA(t10)) throw new re("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            const a10 = await no(n10.epk, e10);
            if (void 0 !== n10.apu) {
              if ("string" !== typeof n10.apu) throw new rr('JOSE Header "apu" (Agreement PartyUInfo) invalid');
              try {
                i11 = t6(n10.apu);
              } catch {
                throw new rr("Failed to base64url decode the apu");
              }
            }
            if (void 0 !== n10.apv) {
              if ("string" !== typeof n10.apv) throw new rr('JOSE Header "apv" (Agreement PartyVInfo) invalid');
              try {
                o10 = t6(n10.apv);
              } catch {
                throw new rr("Failed to base64url decode the apv");
              }
            }
            const s2 = await rx(a10, t10, "ECDH-ES" === e10 ? n10.enc : e10, "ECDH-ES" === e10 ? rK(n10.enc) : Number.parseInt(e10.slice(-5, -2), 10), i11, o10);
            if ("ECDH-ES" === e10) return s2;
            if (void 0 === r10) throw new rr("JWE Encrypted Key missing");
            return rk(e10.slice(-6), s2, r10);
          }
          case "RSA1_5":
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            if (void 0 === r10) throw new rr("JWE Encrypted Key missing");
            return rN(e10, t10, r10);
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            let o10;
            if (void 0 === r10) throw new rr("JWE Encrypted Key missing");
            if ("number" !== typeof n10.p2c) throw new rr('JOSE Header "p2c" (PBES2 Count) missing or invalid');
            const a10 = i10?.maxPBES2Count || 1e4;
            if (n10.p2c > a10) throw new rr('JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds');
            if ("string" !== typeof n10.p2s) throw new rr('JOSE Header "p2s" (PBES2 Salt) missing or invalid');
            try {
              o10 = t6(n10.p2s);
            } catch {
              throw new rr("Failed to base64url decode the p2s");
            }
            return rP(e10, t10, r10, n10.p2c, o10);
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            if (void 0 === r10) throw new rr("JWE Encrypted Key missing");
            return rk(e10, t10, r10);
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW": {
            let i11;
            let o10;
            if (void 0 === r10) throw new rr("JWE Encrypted Key missing");
            if ("string" !== typeof n10.iv) throw new rr('JOSE Header "iv" (Initialization Vector) missing or invalid');
            if ("string" !== typeof n10.tag) throw new rr('JOSE Header "tag" (Authentication Tag) missing or invalid');
            try {
              i11 = t6(n10.iv);
            } catch {
              throw new rr("Failed to base64url decode the iv");
            }
            try {
              o10 = t6(n10.tag);
            } catch {
              throw new rr("Failed to base64url decode the tag");
            }
            return r0(e10, t10, r10, i11, o10);
          }
          default:
            throw new re('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
      }
      const ns = (e10, t10) => {
        if (void 0 !== t10 && (!Array.isArray(t10) || t10.some((e11) => "string" !== typeof e11))) throw TypeError(`"${e10}" option must be an array of strings`);
        if (t10) return new Set(t10);
      };
      async function nc(e10, t10, r10) {
        let n10;
        let i10;
        let o10;
        let a10;
        let s2;
        let c2;
        let l2;
        if (!r$(e10)) throw new rr("Flattened JWE must be an object");
        if (void 0 === e10.protected && void 0 === e10.header && void 0 === e10.unprotected) throw new rr("JOSE Header missing");
        if (void 0 !== e10.iv && "string" !== typeof e10.iv) throw new rr("JWE Initialization Vector incorrect type");
        if ("string" !== typeof e10.ciphertext) throw new rr("JWE Ciphertext missing or incorrect type");
        if (void 0 !== e10.tag && "string" !== typeof e10.tag) throw new rr("JWE Authentication Tag incorrect type");
        if (void 0 !== e10.protected && "string" !== typeof e10.protected) throw new rr("JWE Protected Header incorrect type");
        if (void 0 !== e10.encrypted_key && "string" !== typeof e10.encrypted_key) throw new rr("JWE Encrypted Key incorrect type");
        if (void 0 !== e10.aad && "string" !== typeof e10.aad) throw new rr("JWE AAD incorrect type");
        if (void 0 !== e10.header && !r$(e10.header)) throw new rr("JWE Shared Unprotected Header incorrect type");
        if (void 0 !== e10.unprotected && !r$(e10.unprotected)) throw new rr("JWE Per-Recipient Unprotected Header incorrect type");
        if (e10.protected) try {
          const t11 = t6(e10.protected);
          n10 = JSON.parse(tG.decode(t11));
        } catch {
          throw new rr("JWE Protected Header is invalid");
        }
        if (!r2(n10, e10.header, e10.unprotected)) throw new rr("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
        const u2 = { ...n10, ...e10.header, ...e10.unprotected };
        if (r3(rr, /* @__PURE__ */ new Map(), r10?.crit, n10, u2), void 0 !== u2.zip) throw new re('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
        const { alg: d2, enc: p2 } = u2;
        if ("string" !== typeof d2 || !d2) throw new rr("missing JWE Algorithm (alg) in JWE Header");
        if ("string" !== typeof p2 || !p2) throw new rr("missing JWE Encryption Algorithm (enc) in JWE Header");
        const h2 = r10 && ns("keyManagementAlgorithms", r10.keyManagementAlgorithms);
        const f2 = r10 && ns("contentEncryptionAlgorithms", r10.contentEncryptionAlgorithms);
        if (h2 && !h2.has(d2) || !h2 && d2.startsWith("PBES2")) throw new t7('"alg" (Algorithm) Header Parameter value not allowed');
        if (f2 && !f2.has(p2)) throw new t7('"enc" (Encryption Algorithm) Header Parameter value not allowed');
        if (void 0 !== e10.encrypted_key) try {
          i10 = t6(e10.encrypted_key);
        } catch {
          throw new rr("Failed to base64url decode the encrypted_key");
        }
        let y2 = false;
        "function" === typeof t10 && (t10 = await t10(n10, e10), y2 = true);
        try {
          o10 = await na(d2, t10, i10, u2, r10);
        } catch (e11) {
          if (e11 instanceof TypeError || e11 instanceof rr || e11 instanceof re) throw e11;
          o10 = rq(p2);
        }
        if (void 0 !== e10.iv) try {
          a10 = t6(e10.iv);
        } catch {
          throw new rr("Failed to base64url decode the iv");
        }
        if (void 0 !== e10.tag) try {
          s2 = t6(e10.tag);
        } catch {
          throw new rr("Failed to base64url decode the tag");
        }
        const m2 = tX.encode(e10.protected ?? "");
        c2 = void 0 !== e10.aad ? tY(m2, tX.encode("."), tX.encode(e10.aad)) : m2;
        try {
          l2 = t6(e10.ciphertext);
        } catch {
          throw new rr("Failed to base64url decode the ciphertext");
        }
        const g2 = { plaintext: await rQ(p2, o10, l2, a10, s2, c2) };
        if (void 0 !== e10.protected && (g2.protectedHeader = n10), void 0 !== e10.aad) try {
          g2.additionalAuthenticatedData = t6(e10.aad);
        } catch {
          throw new rr("Failed to base64url decode the aad");
        }
        return (void 0 !== e10.unprotected && (g2.sharedUnprotectedHeader = e10.unprotected), void 0 !== e10.header && (g2.unprotectedHeader = e10.header), y2) ? { ...g2, key: t10 } : g2;
      }
      async function nl(e10, t10, r10) {
        if (e10 instanceof Uint8Array && (e10 = tG.decode(e10)), "string" !== typeof e10) throw new rr("Compact JWE must be a string or Uint8Array");
        const { 0: n10, 1: i10, 2: o10, 3: a10, 4: s2, length: c2 } = e10.split(".");
        if (5 !== c2) throw new rr("Invalid Compact JWE");
        const l2 = await nc({ ciphertext: a10, iv: o10 || void 0, protected: n10, tag: s2 || void 0, encrypted_key: i10 || void 0 }, t10, r10);
        const u2 = { plaintext: l2.plaintext, protectedHeader: l2.protectedHeader };
        return "function" === typeof t10 ? { ...u2, key: l2.key } : u2;
      }
      const nu = (e10) => e10.toLowerCase().replace(/^application\//, "");
      async function nd(e10, t10, r10) {
        const n10 = await nl(e10, t10, r10);
        const i10 = ((e11, t11, r11 = {}) => {
          let n11;
          let i11;
          let o11;
          let a11;
          try {
            o11 = JSON.parse(tG.decode(t11));
          } catch {
          }
          if (!r$(o11)) throw new rn("JWT Claims Set must be a top-level JSON object");
          const { typ: s2 } = r11;
          if (s2 && ("string" !== typeof e11.typ || nu(e11.typ) !== nu(s2))) throw new t4('unexpected "typ" JWT header value', o11, "typ", "check_failed");
          const { requiredClaims: c2 = [], issuer: l2, subject: u2, audience: d2, maxTokenAge: p2 } = r11;
          const h2 = [...c2];
          for (const e12 of (void 0 !== p2 && h2.push("iat"), void 0 !== d2 && h2.push("aud"), void 0 !== u2 && h2.push("sub"), void 0 !== l2 && h2.push("iss"), new Set(h2.reverse()))) if (!(e12 in o11)) throw new t4(`missing required "${e12}" claim`, o11, e12, "missing");
          if (l2 && !(Array.isArray(l2) ? l2 : [l2]).includes(o11.iss)) throw new t4('unexpected "iss" claim value', o11, "iss", "check_failed");
          if (u2 && o11.sub !== u2) throw new t4('unexpected "sub" claim value', o11, "sub", "check_failed");
          if (d2 && (n11 = o11.aud, i11 = "string" === typeof d2 ? [d2] : d2, "string" === typeof n11 ? !i11.includes(n11) : !(Array.isArray(n11) && i11.some(Set.prototype.has.bind(new Set(n11)))))) throw new t4('unexpected "aud" claim value', o11, "aud", "check_failed");
          switch (typeof r11.clockTolerance) {
            case "string":
              a11 = r9(r11.clockTolerance);
              break;
            case "number":
              a11 = r11.clockTolerance;
              break;
            case "undefined":
              a11 = 0;
              break;
            default:
              throw TypeError("Invalid clockTolerance option type");
          }
          const { currentDate: f2 } = r11;
          const y2 = r8(f2 || /* @__PURE__ */ new Date());
          if ((void 0 !== o11.iat || p2) && "number" !== typeof o11.iat) throw new t4('"iat" claim must be a number', o11, "iat", "invalid");
          if (void 0 !== o11.nbf) {
            if ("number" !== typeof o11.nbf) throw new t4('"nbf" claim must be a number', o11, "nbf", "invalid");
            if (o11.nbf > y2 + a11) throw new t4('"nbf" claim timestamp check failed', o11, "nbf", "check_failed");
          }
          if (void 0 !== o11.exp) {
            if ("number" !== typeof o11.exp) throw new t4('"exp" claim must be a number', o11, "exp", "invalid");
            if (o11.exp <= y2 - a11) throw new t9('"exp" claim timestamp check failed', o11, "exp", "check_failed");
          }
          if (p2) {
            const e12 = y2 - o11.iat;
            if (e12 - a11 > ("number" === typeof p2 ? p2 : r9(p2))) throw new t9('"iat" claim timestamp check failed (too far in the past)', o11, "iat", "check_failed");
            if (e12 < 0 - a11) throw new t4('"iat" claim timestamp check failed (it should be in the past)', o11, "iat", "check_failed");
          }
          return o11;
        })(n10.protectedHeader, n10.plaintext, r10);
        const { protectedHeader: o10 } = n10;
        if (void 0 !== o10.iss && o10.iss !== i10.iss) throw new t4('replicated "iss" claim header parameter mismatch', i10, "iss", "mismatch");
        if (void 0 !== o10.sub && o10.sub !== i10.sub) throw new t4('replicated "sub" claim header parameter mismatch', i10, "sub", "mismatch");
        if (void 0 !== o10.aud && JSON.stringify(o10.aud) !== JSON.stringify(i10.aud)) throw new t4('replicated "aud" claim header parameter mismatch', i10, "aud", "mismatch");
        const a10 = { payload: i10, protectedHeader: o10 };
        return "function" === typeof t10 ? { ...a10, key: n10.key } : a10;
      }
      const np = e.i(416301);
      const nh = "A256CBC-HS512";
      async function nf(e10) {
        const { token: t10 = {}, secret: r10, maxAge: n10 = 2592e3, salt: i10 } = e10;
        const o10 = Array.isArray(r10) ? r10 : [r10];
        const a10 = await nm(nh, o10[0], i10);
        const s2 = await ni({ kty: "oct", k: nr.encode(a10) }, `sha${a10.byteLength << 3}`);
        return await new nt(t10).setProtectedHeader({ alg: "dir", enc: nh, kid: s2 }).setIssuedAt().setExpirationTime((Date.now() / 1e3 | 0) + n10).setJti(crypto.randomUUID()).encrypt(a10);
      }
      async function ny(e10) {
        const { token: t10, secret: r10, salt: n10 } = e10;
        const i10 = Array.isArray(r10) ? r10 : [r10];
        if (!t10) return null;
        const { payload: o10 } = await nd(t10, async ({ kid: e11, enc: t11 }) => {
          for (const r11 of i10) {
            const i11 = await nm(t11, r11, n10);
            if (void 0 === e11 || e11 === await ni({ kty: "oct", k: nr.encode(i11) }, `sha${i11.byteLength << 3}`)) return i11;
          }
          throw Error("no matching decryption secret");
        }, { clockTolerance: 15, keyManagementAlgorithms: ["dir"], contentEncryptionAlgorithms: [nh, "A256GCM"] });
        return o10;
      }
      async function nm(e10, t10, r10) {
        let n10;
        switch (e10) {
          case "A256CBC-HS512":
            n10 = 64;
            break;
          case "A256GCM":
            n10 = 32;
            break;
          default:
            throw Error("Unsupported JWT Content Encryption Algorithm");
        }
        return await tz("sha256", t10, r10, `Auth.js Generated Encryption Key (${r10})`, n10);
      }
      async function ng({ options: e10, paramValue: t10, cookieValue: r10 }) {
        const { url: n10, callbacks: i10 } = e10;
        let o10 = n10.origin;
        return t10 ? o10 = await i10.redirect({ url: t10, baseUrl: n10.origin }) : r10 && (o10 = await i10.redirect({ url: r10, baseUrl: n10.origin })), { callbackUrl: o10, callbackUrlCookie: o10 !== r10 ? o10 : void 0 };
      }
      const nw = "\x1B[31m";
      const nb = "\x1B[0m";
      const nv = { error(e10) {
        const t10 = e10 instanceof tn ? e10.type : e10.name;
        if (console.error(`${nw}[auth][error]${nb} ${t10}: ${e10.message}`), e10.cause && "object" === typeof e10.cause && "err" in e10.cause && e10.cause.err instanceof Error) {
          const { err: t11, ...r10 } = e10.cause;
          console.error(`${nw}[auth][cause]${nb}:`, t11.stack), r10 && console.error(`${nw}[auth][details]${nb}:`, JSON.stringify(r10, null, 2));
        } else e10.stack && console.error(e10.stack.replace(/.*/, "").substring(1));
      }, warn(e10) {
        const t10 = `https://warnings.authjs.dev#${e10}`;
        console.warn(`\x1B[33m[auth][warn][${e10}]${nb}`, `Read more: ${t10}`);
      }, debug(e10, t10) {
        console.log(`\x1B[90m[auth][debug]:${nb} ${e10}`, JSON.stringify(t10, null, 2));
      } };
      function n_(e10) {
        const t10 = { ...nv };
        return e10.debug || (t10.debug = () => {
        }), e10.logger?.error && (t10.error = e10.logger.error), e10.logger?.warn && (t10.warn = e10.logger.warn), e10.logger?.debug && (t10.debug = e10.logger.debug), e10.logger ?? (e10.logger = t10), t10;
      }
      const nE = ["providers", "session", "csrf", "signin", "signout", "callback", "verify-request", "error", "webauthn-options"];
      async function nS(e10) {
        if (!("body" in e10) || !e10.body || "POST" !== e10.method) return;
        const t10 = e10.headers.get("content-type");
        return t10?.includes("application/json") ? await e10.json() : t10?.includes("application/x-www-form-urlencoded") ? Object.fromEntries(new URLSearchParams(await e10.text())) : void 0;
      }
      async function nk(e10, t10) {
        try {
          if ("GET" !== e10.method && "POST" !== e10.method) throw new tk("Only GET and POST requests are supported");
          t10.basePath ?? (t10.basePath = "/auth");
          const r10 = new URL(e10.url);
          const { action: n10, providerId: i10 } = ((e11, t11) => {
            const r11 = e11.match(RegExp(`^${t11}(.+)`));
            if (null === r11) throw new tk(`Cannot parse action at ${e11}`);
            const n11 = r11.at(-1).replace(/^\//, "").split("/").filter(Boolean);
            if (1 !== n11.length && 2 !== n11.length) throw new tk(`Cannot parse action at ${e11}`);
            const [i11, o10] = n11;
            if (!nE.includes(i11) || o10 && !["signin", "callback", "webauthn-options"].includes(i11)) throw new tk(`Cannot parse action at ${e11}`);
            return { action: i11, providerId: o10 };
          })(r10.pathname, t10.basePath);
          return { url: r10, action: n10, providerId: i10, method: e10.method, headers: Object.fromEntries(e10.headers), body: e10.body ? await nS(e10) : void 0, cookies: (0, np.parse)(e10.headers.get("cookie") ?? "") ?? {}, error: r10.searchParams.get("error") ?? void 0, query: Object.fromEntries(r10.searchParams) };
        } catch (n10) {
          const r10 = n_(t10);
          r10.error(n10), r10.debug("request", e10);
        }
      }
      function nx(e10) {
        const t10 = new Headers(e10.headers);
        e10.cookies?.forEach((e11) => {
          const { name: r11, value: n11, options: i10 } = e11;
          const o10 = (0, np.serialize)(r11, n11, i10);
          t10.has("Set-Cookie") ? t10.append("Set-Cookie", o10) : t10.set("Set-Cookie", o10);
        });
        let r10 = e10.body;
        "application/json" === t10.get("content-type") ? r10 = JSON.stringify(e10.body) : "application/x-www-form-urlencoded" === t10.get("content-type") && (r10 = new URLSearchParams(e10.body).toString());
        const n10 = new Response(r10, { headers: t10, status: e10.redirect ? 302 : e10.status ?? 200 });
        return e10.redirect && n10.headers.set("Location", e10.redirect), n10;
      }
      async function nR(e10) {
        const t10 = new TextEncoder().encode(e10);
        return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", t10))).map((e11) => e11.toString(16).padStart(2, "0")).join("").toString();
      }
      function nA(e10) {
        return Array.from(crypto.getRandomValues(new Uint8Array(e10))).reduce((e11, t10) => e11 + (`0${t10.toString(16)}`).slice(-2), "");
      }
      async function nT({ options: e10, cookieValue: t10, isPost: r10, bodyValue: n10 }) {
        if (t10) {
          const [i11, o11] = t10.split("|");
          if (o11 === await nR(`${i11}${e10.secret}`)) return { csrfTokenVerified: r10 && i11 === n10, csrfToken: i11 };
        }
        const i10 = nA(32);
        const o10 = await nR(`${i10}${e10.secret}`);
        return { cookie: `${i10}|${o10}`, csrfToken: i10 };
      }
      function nC(e10, t10) {
        if (!t10) throw new tC(`CSRF token was missing during an action ${e10}`);
      }
      function nP(e10) {
        return null !== e10 && "object" === typeof e10;
      }
      function nO(e10, ...t10) {
        if (!t10.length) return e10;
        const r10 = t10.shift();
        if (nP(e10) && nP(r10)) for (const t11 in r10) nP(r10[t11]) ? (nP(e10[t11]) || (e10[t11] = Array.isArray(r10[t11]) ? [] : {}), nO(e10[t11], r10[t11])) : void 0 !== r10[t11] && (e10[t11] = r10[t11]);
        return nO(e10, ...t10);
      }
      const nU = Symbol("skip-csrf-check");
      const nI = Symbol("return-type-raw");
      const nN = Symbol("custom-fetch");
      const n$ = Symbol("conform-internal");
      const nD = (e10) => nH({ id: e10.sub ?? e10.id ?? crypto.randomUUID(), name: e10.name ?? e10.nickname ?? e10.preferred_username, email: e10.email, image: e10.picture });
      const nj = (e10) => nH({ access_token: e10.access_token, id_token: e10.id_token, refresh_token: e10.refresh_token, expires_at: e10.expires_at, scope: e10.scope, token_type: e10.token_type, session_state: e10.session_state });
      function nH(e10) {
        const t10 = {};
        for (const [r10, n10] of Object.entries(e10)) void 0 !== n10 && (t10[r10] = n10);
        return t10;
      }
      function nL(e10, t10) {
        if (!e10 && t10) return;
        if ("string" === typeof e10) return { url: new URL(e10) };
        const r10 = new URL(e10?.url ?? "https://authjs.dev");
        if (e10?.params != null) for (let [t11, n10] of Object.entries(e10.params)) "claims" === t11 && (n10 = JSON.stringify(n10)), r10.searchParams.set(t11, String(n10));
        return { url: r10, request: e10?.request, conform: e10?.conform, ...e10?.clientPrivateKey ? { clientPrivateKey: e10?.clientPrivateKey } : null };
      }
      const nM = { signIn: () => true, redirect: ({ url: e10, baseUrl: t10 }) => e10.startsWith("/") ? `${t10}${e10}` : new URL(e10).origin === t10 ? e10 : t10, session: ({ session: e10 }) => ({ user: { name: e10.user?.name, email: e10.user?.email, image: e10.user?.image }, expires: e10.expires?.toISOString?.() ?? e10.expires }), jwt: ({ token: e10 }) => e10 };
      async function nW({ authOptions: e10, providerId: t10, action: r10, url: n10, cookies: i10, callbackUrl: o10, csrfToken: a10, csrfDisabled: s2, isPost: c2 }) {
        let l2;
        let u2;
        const d2 = n_(e10);
        const { providers: p2, provider: h2 } = ((e11) => {
          const { providerId: t11, config: r11 } = e11;
          const n11 = new URL(r11.basePath ?? "/auth", e11.url.origin);
          const i11 = r11.providers.map((e12) => {
            const t12 = "function" === typeof e12 ? e12() : e12;
            const { options: i12, ...o11 } = t12;
            const a11 = i12?.id ?? o11.id;
            const s3 = nO(o11, i12, { signinUrl: `${n11}/signin/${a11}`, callbackUrl: `${n11}/callback/${a11}` });
            if ("oauth" === t12.type || "oidc" === t12.type) {
              let c3;
              let e13;
              let t13;
              let n12;
              let o12;
              s3.redirectProxyUrl ?? (s3.redirectProxyUrl = i12?.redirectProxyUrl ?? r11.redirectProxyUrl);
              const a12 = ((c3 = s3).issuer && (c3.wellKnown ?? (c3.wellKnown = `${c3.issuer}/.well-known/openid-configuration`)), (e13 = nL(c3.authorization, c3.issuer)) && !e13.url?.searchParams.has("scope") && e13.url.searchParams.set("scope", "openid profile email"), t13 = nL(c3.token, c3.issuer), n12 = nL(c3.userinfo, c3.issuer), o12 = c3.checks ?? ["pkce"], c3.redirectProxyUrl && (o12.includes("state") || o12.push("state"), c3.redirectProxyUrl = `${c3.redirectProxyUrl}/callback/${c3.id}`), { ...c3, authorization: e13, token: t13, checks: o12, userinfo: n12, profile: c3.profile ?? nD, account: c3.account ?? nj });
              return a12.authorization?.url.searchParams.get("response_mode") === "form_post" && a12.redirectProxyUrl = undefined, a12[nN] ?? (a12[nN] = i12?.[nN]), a12;
            }
            return s3;
          });
          return { providers: i11, provider: i11.find(({ id: e12 }) => e12 === t11) };
        })({ url: n10, providerId: t10, config: e10 });
        let f2 = false;
        if ((h2?.type === "oauth" || h2?.type === "oidc") && h2.redirectProxyUrl) try {
          f2 = new URL(h2.redirectProxyUrl).origin === n10.origin;
        } catch {
          throw TypeError(`redirectProxyUrl must be a valid URL. Received: ${h2.redirectProxyUrl}`);
        }
        const y2 = { debug: false, pages: {}, theme: { colorScheme: "auto", logo: "", brandColor: "", buttonText: "" }, ...e10, url: n10, action: r10, provider: h2, cookies: nO(tt(e10.useSecureCookies ?? "https:" === n10.protocol), e10.cookies), providers: p2, session: { strategy: e10.adapter ? "database" : "jwt", maxAge: 2592e3, updateAge: 86400, generateSessionToken: () => crypto.randomUUID(), ...e10.session }, jwt: { secret: e10.secret, maxAge: e10.session?.maxAge ?? 2592e3, encode: nf, decode: ny, ...e10.jwt }, events: (l2 = e10.events ?? {}, u2 = d2, Object.keys(l2).reduce((e11, t11) => (e11[t11] = async (...e12) => {
          try {
            const r11 = l2[t11];
            return await r11(...e12);
          } catch (e13) {
            u2.error(new tl(e13));
          }
        }, e11), {})), adapter: ((e11, t11) => {
          if (e11) return Object.keys(e11).reduce((r11, n11) => (r11[n11] = async (...r12) => {
            try {
              t11.debug(`adapter_${n11}`, { args: r12 });
              const i11 = e11[n11];
              return await i11(...r12);
            } catch (r13) {
              const e12 = new to(r13);
              throw t11.error(e12), e12;
            }
          }, r11), {});
        })(e10.adapter, d2), callbacks: { ...nM, ...e10.callbacks }, logger: d2, callbackUrl: n10.origin, isOnRedirectProxy: f2, experimental: { ...e10.experimental } };
        const m2 = [];
        if (s2) y2.csrfTokenVerified = true;
        else {
          const { csrfToken: e11, cookie: t11, csrfTokenVerified: r11 } = await nT({ options: y2, cookieValue: i10?.[y2.cookies.csrfToken.name], isPost: c2, bodyValue: a10 });
          y2.csrfToken = e11, y2.csrfTokenVerified = r11, t11 && m2.push({ name: y2.cookies.csrfToken.name, value: t11, options: y2.cookies.csrfToken.options });
        }
        const { callbackUrl: g2, callbackUrlCookie: w2 } = await ng({ options: y2, cookieValue: i10?.[y2.cookies.callbackUrl.name], paramValue: o10 });
        return y2.callbackUrl = g2, w2 && m2.push({ name: y2.cookies.callbackUrl.name, value: w2, options: y2.cookies.callbackUrl.options }), { options: y2, cookies: m2 };
      }
      let nK;
      let nq;
      let nB;
      let nJ;
      let nz;
      let nF;
      let nV;
      let nX;
      let nG;
      let nY;
      let nQ;
      let nZ;
      let n0;
      let n1;
      let n2;
      let n3;
      let n6;
      let n5;
      let n8;
      let n4;
      let n9;
      let n7;
      let ie;
      const it = {};
      const ir = [];
      const ii = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      function io(e10, t10) {
        for (const r10 in t10) e10[r10] = t10[r10];
        return e10;
      }
      function ia(e10) {
        const t10 = e10.parentNode;
        t10?.removeChild(e10);
      }
      function is(e10, t10, r10, n10, i10) {
        const o10 = { type: e10, props: t10, key: r10, ref: n10, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == i10 ? ++n9 : i10 };
        return null == i10 && null != n4.vnode && n4.vnode(o10), o10;
      }
      function ic(e10) {
        return e10.children;
      }
      function il(e10, t10) {
        this.props = e10, this.context = t10;
      }
      function iu(e10, t10) {
        if (null == t10) return e10.__ ? iu(e10.__, e10.__.__k.indexOf(e10) + 1) : null;
        for (let r10; t10 < e10.__k.length; t10++) if (null != (r10 = e10.__k[t10]) && null != r10.__e) return r10.__e;
        return "function" === typeof e10.type ? iu(e10) : null;
      }
      function id(e10) {
        (!e10.__d && (e10.__d = true) && n7.push(e10) && !ip.__r++ || ie !== n4.debounceRendering) && ((ie = n4.debounceRendering) || setTimeout)(ip);
      }
      function ip() {
        for (let e10; ip.__r = n7.length; ) e10 = n7.sort((e11, t10) => e11.__v.__b - t10.__v.__b), n7 = [], e10.some((e11) => {
          let t10;
          let r10;
          let n10;
          let i10;
          let o10;
          e11.__d && (i10 = (n10 = e11.__v).__e, (o10 = e11.__P) && (t10 = [], (r10 = io({}, n10)).__v = n10.__v + 1, iv(o10, n10, r10, e11.__n, void 0 !== o10.ownerSVGElement, null != n10.__h ? [i10] : null, t10, null == i10 ? iu(n10) : i10, n10.__h), ((e12, t11) => {
            n4.__c?.(t11, e12), e12.some((t12) => {
              try {
                e12 = t12.__h, t12.__h = [], e12.some((e13) => {
                  e13.call(t12);
                });
              } catch (e13) {
                n4.__e(e13, t12.__v);
              }
            });
          })(t10, n10), n10.__e !== i10 && function e12(t11) {
            let r11;
            let n11;
            if (null != (t11 = t11.__) && null != t11.__c) {
              for (t11.__e = t11.__c.base = null, r11 = 0; r11 < t11.__k.length; r11++) if (null != (n11 = t11.__k[r11]) && null != n11.__e) {
                t11.__e = t11.__c.base = n11.__e;
                break;
              }
              return e12(t11);
            }
          }(n10)));
        });
      }
      function ih(e10, t10, r10, n10, i10, o10, a10, s2, c2, l2) {
        let u2;
        let d2;
        let p2;
        let h2;
        let f2;
        let y2;
        let m2;
        const g2 = n10?.__k || ir;
        const w2 = g2.length;
        for (r10.__k = [], u2 = 0; u2 < t10.length; u2++) if (null != (h2 = r10.__k[u2] = null == (h2 = t10[u2]) || "boolean" === typeof h2 ? null : "string" === typeof h2 || "number" === typeof h2 || "bigint" === typeof h2 ? is(null, h2, null, null, h2) : Array.isArray(h2) ? is(ic, { children: h2 }, null, null, null) : h2.__b > 0 ? is(h2.type, h2.props, h2.key, h2.ref ? h2.ref : null, h2.__v) : h2)) {
          if (h2.__ = r10, h2.__b = r10.__b + 1, null === (p2 = g2[u2]) || p2 && h2.key === p2.key && h2.type === p2.type) g2[u2] = void 0;
          else for (d2 = 0; d2 < w2; d2++) {
            if ((p2 = g2[d2]) && h2.key === p2.key && h2.type === p2.type) {
              g2[d2] = void 0;
              break;
            }
            p2 = null;
          }
          iv(e10, h2, p2 = p2 || it, i10, o10, a10, s2, c2, l2), f2 = h2.__e, (d2 = h2.ref) && p2.ref !== d2 && (m2 || (m2 = []), p2.ref && m2.push(p2.ref, null, h2), m2.push(d2, h2.__c || f2, h2)), null != f2 ? (null == y2 && (y2 = f2), "function" === typeof h2.type && h2.__k === p2.__k ? h2.__d = c2 = function e11(t11, r11, n11) {
            for (let i11, o11 = t11.__k, a11 = 0; o11 && a11 < o11.length; a11++) (i11 = o11[a11]) && (i11.__ = t11, r11 = "function" === typeof i11.type ? e11(i11, r11, n11) : iy(n11, i11, i11, o11, i11.__e, r11));
            return r11;
          }(h2, c2, e10) : c2 = iy(e10, h2, p2, g2, f2, c2), "function" === typeof r10.type && (r10.__d = c2)) : c2 && p2.__e === c2 && c2.parentNode !== e10 && (c2 = iu(p2));
        }
        for (r10.__e = y2, u2 = w2; u2--; ) null != g2[u2] && function e11(t11, r11, n11) {
          let i11;
          let o11;
          if (n4.unmount?.(t11), (i11 = t11.ref) && (i11.current && i11.current !== t11.__e || i_(i11, null, r11)), null != (i11 = t11.__c)) {
            if (i11.componentWillUnmount) try {
              i11.componentWillUnmount();
            } catch (e12) {
              n4.__e(e12, r11);
            }
            i11.base = i11.__P = null, t11.__c = void 0;
          }
          if (i11 = t11.__k) for (o11 = 0; o11 < i11.length; o11++) i11[o11] && e11(i11[o11], r11, n11 || "function" !== typeof t11.type);
          n11 || null == t11.__e || ia(t11.__e), t11.__ = t11.__e = t11.__d = void 0;
        }(g2[u2], g2[u2]);
        if (m2) for (u2 = 0; u2 < m2.length; u2++) i_(m2[u2], m2[++u2], m2[++u2]);
      }
      function iy(e10, t10, r10, n10, i10, o10) {
        let a10;
        let s2;
        let c2;
        if (void 0 !== t10.__d) a10 = t10.__d, t10.__d = void 0;
        else if (null == r10 || i10 !== o10 || null == i10.parentNode) e: if (null == o10 || o10.parentNode !== e10) e10.appendChild(i10), a10 = null;
        else {
          for (s2 = o10, c2 = 0; (s2 = s2.nextSibling) && c2 < n10.length; c2 += 1) if (s2 === i10) break e;
          e10.insertBefore(i10, o10), a10 = o10;
        }
        return void 0 !== a10 ? a10 : i10.nextSibling;
      }
      function im(e10, t10, r10) {
        "-" === t10[0] ? e10.setProperty(t10, r10) : e10[t10] = null == r10 ? "" : "number" !== typeof r10 || ii.test(t10) ? r10 : `${r10}px`;
      }
      function ig(e10, t10, r10, n10, i10) {
        let o10;
        e: if ("style" === t10) if ("string" === typeof r10) e10.style.cssText = r10;
        else {
          if ("string" === typeof n10 && (e10.style.cssText = n10 = ""), n10) for (t10 in n10) r10 && t10 in r10 || im(e10.style, t10, "");
          if (r10) for (t10 in r10) n10 && r10[t10] === n10[t10] || im(e10.style, t10, r10[t10]);
        }
        else if ("o" === t10[0] && "n" === t10[1]) o10 = t10 !== (t10 = t10.replace(/Capture$/, "")), t10 = t10.toLowerCase() in e10 ? t10.toLowerCase().slice(2) : t10.slice(2), e10.l || (e10.l = {}), e10.l[t10 + o10] = r10, r10 ? n10 || e10.addEventListener(t10, o10 ? ib : iw, o10) : e10.removeEventListener(t10, o10 ? ib : iw, o10);
        else if ("dangerouslySetInnerHTML" !== t10) {
          if (i10) t10 = t10.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
          else if ("href" !== t10 && "list" !== t10 && "form" !== t10 && "tabIndex" !== t10 && "download" !== t10 && t10 in e10) try {
            e10[t10] = null == r10 ? "" : r10;
            break e;
          } catch (e11) {
          }
          "function" === typeof r10 || (null == r10 || false === r10 && -1 === t10.indexOf("-") ? e10.removeAttribute(t10) : e10.setAttribute(t10, r10));
        }
      }
      function iw(e10) {
        this.l[e10.type + false](n4.event ? n4.event(e10) : e10);
      }
      function ib(e10) {
        this.l[e10.type + true](n4.event ? n4.event(e10) : e10);
      }
      function iv(e10, t10, r10, n10, i10, o10, a10, s2, c2) {
        let l2;
        let u2;
        let d2;
        let p2;
        let h2;
        let f2;
        let y2;
        let m2;
        let g2;
        let w2;
        let b2;
        let v2;
        let _2;
        let E2;
        let S2;
        const k2 = t10.type;
        if (void 0 !== t10.constructor) return null;
        null != r10.__h && (c2 = r10.__h, s2 = t10.__e = r10.__e, t10.__h = null, o10 = [s2]), (l2 = n4.__b) && l2(t10);
        try {
          e: if ("function" === typeof k2) {
            if (m2 = t10.props, g2 = (l2 = k2.contextType) && n10[l2.__c], w2 = l2 ? g2 ? g2.props.value : l2.__ : n10, r10.__c ? y2 = (u2 = t10.__c = r10.__c).__ = u2.__E : ("prototype" in k2 && k2.prototype.render ? t10.__c = u2 = new k2(m2, w2) : (t10.__c = u2 = new il(m2, w2), u2.constructor = k2, u2.render = iE), g2?.sub(u2), u2.props = m2, u2.state || (u2.state = {}), u2.context = w2, u2.__n = n10, d2 = u2.__d = true, u2.__h = [], u2._sb = []), null == u2.__s && (u2.__s = u2.state), null != k2.getDerivedStateFromProps && (u2.__s === u2.state && (u2.__s = io({}, u2.__s)), io(u2.__s, k2.getDerivedStateFromProps(m2, u2.__s))), p2 = u2.props, h2 = u2.state, d2) null == k2.getDerivedStateFromProps && null != u2.componentWillMount && u2.componentWillMount(), null != u2.componentDidMount && u2.__h.push(u2.componentDidMount);
            else {
              if (null == k2.getDerivedStateFromProps && m2 !== p2 && null != u2.componentWillReceiveProps && u2.componentWillReceiveProps(m2, w2), !u2.__e && null != u2.shouldComponentUpdate && false === u2.shouldComponentUpdate(m2, u2.__s, w2) || t10.__v === r10.__v) {
                for (u2.props = m2, u2.state = u2.__s, t10.__v !== r10.__v && (u2.__d = false), u2.__v = t10, t10.__e = r10.__e, t10.__k = r10.__k, t10.__k.forEach((e11) => {
                  e11 && (e11.__ = t10);
                }), b2 = 0; b2 < u2._sb.length; b2++) u2.__h.push(u2._sb[b2]);
                u2._sb = [], u2.__h.length && a10.push(u2);
                break e;
              }
              null != u2.componentWillUpdate && u2.componentWillUpdate(m2, u2.__s, w2), null != u2.componentDidUpdate && u2.__h.push(() => {
                u2.componentDidUpdate(p2, h2, f2);
              });
            }
            if (u2.context = w2, u2.props = m2, u2.__v = t10, u2.__P = e10, v2 = n4.__r, _2 = 0, "prototype" in k2 && k2.prototype.render) {
              for (u2.state = u2.__s, u2.__d = false, v2?.(t10), l2 = u2.render(u2.props, u2.state, u2.context), E2 = 0; E2 < u2._sb.length; E2++) u2.__h.push(u2._sb[E2]);
              u2._sb = [];
            } else do
              u2.__d = false, v2?.(t10), l2 = u2.render(u2.props, u2.state, u2.context), u2.state = u2.__s;
            while (u2.__d && ++_2 < 25);
            u2.state = u2.__s, null != u2.getChildContext && (n10 = io(io({}, n10), u2.getChildContext())), d2 || null == u2.getSnapshotBeforeUpdate || (f2 = u2.getSnapshotBeforeUpdate(p2, h2)), S2 = null != l2 && l2.type === ic && null == l2.key ? l2.props.children : l2, ih(e10, Array.isArray(S2) ? S2 : [S2], t10, r10, n10, i10, o10, a10, s2, c2), u2.base = t10.__e, t10.__h = null, u2.__h.length && a10.push(u2), y2 && (u2.__E = u2.__ = null), u2.__e = false;
          } else null == o10 && t10.__v === r10.__v ? (t10.__k = r10.__k, t10.__e = r10.__e) : t10.__e = ((e11, t11, r11, n11, i11, o11, a11, s3) => {
            let c3;
            let l3;
            let u3;
            let d3 = r11.props;
            const p3 = t11.props;
            const h3 = t11.type;
            let f3 = 0;
            if ("svg" === h3 && (i11 = true), null != o11) {
              for (; f3 < o11.length; f3++) if ((c3 = o11[f3]) && "setAttribute" in c3 === !!h3 && (h3 ? c3.localName === h3 : 3 === c3.nodeType)) {
                e11 = c3, o11[f3] = null;
                break;
              }
            }
            if (null == e11) {
              if (null === h3) return document.createTextNode(p3);
              e11 = i11 ? document.createElementNS("http://www.w3.org/2000/svg", h3) : document.createElement(h3, p3.is && p3), o11 = null, s3 = false;
            }
            if (null === h3) d3 === p3 || s3 && e11.data === p3 || (e11.data = p3);
            else {
              if (o11 = o11 && n8.call(e11.childNodes), l3 = (d3 = r11.props || it).dangerouslySetInnerHTML, u3 = p3.dangerouslySetInnerHTML, !s3) {
                if (null != o11) for (d3 = {}, f3 = 0; f3 < e11.attributes.length; f3++) d3[e11.attributes[f3].name] = e11.attributes[f3].value;
                (u3 || l3) && (u3 && (l3 && u3.__html === l3.__html || u3.__html === e11.innerHTML) || (e11.innerHTML = u3?.__html || ""));
              }
              if (((e12, t12, r12, n12, i12) => {
                let o12;
                for (o12 in r12) "children" === o12 || "key" === o12 || o12 in t12 || ig(e12, o12, null, r12[o12], n12);
                for (o12 in t12) i12 && "function" !== typeof t12[o12] || "children" === o12 || "key" === o12 || "value" === o12 || "checked" === o12 || r12[o12] === t12[o12] || ig(e12, o12, t12[o12], r12[o12], n12);
              })(e11, p3, d3, i11, s3), u3) t11.__k = [];
              else if (ih(e11, Array.isArray(f3 = t11.props.children) ? f3 : [f3], t11, r11, n11, i11 && "foreignObject" !== h3, o11, a11, o11 ? o11[0] : r11.__k && iu(r11, 0), s3), null != o11) for (f3 = o11.length; f3--; ) null != o11[f3] && ia(o11[f3]);
              s3 || ("value" in p3 && void 0 !== (f3 = p3.value) && (f3 !== e11.value || "progress" === h3 && !f3 || "option" === h3 && f3 !== d3.value) && ig(e11, "value", f3, d3.value, false), "checked" in p3 && void 0 !== (f3 = p3.checked) && f3 !== e11.checked && ig(e11, "checked", f3, d3.checked, false));
            }
            return e11;
          })(r10.__e, t10, r10, n10, i10, o10, a10, c2);
          (l2 = n4.diffed) && l2(t10);
        } catch (e11) {
          t10.__v = null, (c2 || null != o10) && (t10.__e = s2, t10.__h = !!c2, o10[o10.indexOf(s2)] = null), n4.__e(e11, t10, r10);
        }
      }
      function i_(e10, t10, r10) {
        try {
          "function" === typeof e10 ? e10(t10) : e10.current = t10;
        } catch (e11) {
          n4.__e(e11, r10);
        }
      }
      function iE(e10, t10, r10) {
        return this.constructor(e10, r10);
      }
      n8 = ir.slice, n4 = { __e: (e10, t10, r10, n10) => {
        for (let i10, o10, a10; t10 = t10.__; ) if ((i10 = t10.__c) && !i10.__) try {
          if ((o10 = i10.constructor) && null != o10.getDerivedStateFromError && (i10.setState(o10.getDerivedStateFromError(e10)), a10 = i10.__d), null != i10.componentDidCatch && (i10.componentDidCatch(e10, n10 || {}), a10 = i10.__d), a10) return i10.__E = i10;
        } catch (t11) {
          e10 = t11;
        }
        throw e10;
      } }, n9 = 0, il.prototype.setState = function(e10, t10) {
        let r10;
        r10 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = io({}, this.state), "function" === typeof e10 && (e10 = e10(io({}, r10), this.props)), e10 && io(r10, e10), null != e10 && this.__v && (t10 && this._sb.push(t10), id(this));
      }, il.prototype.forceUpdate = function(e10) {
        this.__v && (this.__e = true, e10 && this.__h.push(e10), id(this));
      }, il.prototype.render = ic, n7 = [], ip.__r = 0;
      const iS = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;
      const ik = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;
      const ix = /[\s\n\\/='"\0<>]/;
      const iR = /^xlink:?./;
      const iA = /["&<]/;
      function iT(e10) {
        if (false === iA.test(e10 += "")) return e10;
        for (let t10 = 0, r10 = 0, n10 = "", i10 = ""; r10 < e10.length; r10++) {
          switch (e10.charCodeAt(r10)) {
            case 34:
              i10 = "&quot;";
              break;
            case 38:
              i10 = "&amp;";
              break;
            case 60:
              i10 = "&lt;";
              break;
            default:
              continue;
          }
          r10 !== t10 && (n10 += e10.slice(t10, r10)), n10 += i10, t10 = r10 + 1;
        }
        return r10 !== t10 && (n10 += e10.slice(t10, r10)), n10;
      }
      const iC = (e10, t10) => String(e10).replace(/(\n+)/g, `$1${t10 || "	"}`);
      const iP = (e10, t10, r10) => String(e10).length > (t10 || 40) || !r10 && -1 !== String(e10).indexOf("\n") || -1 !== String(e10).indexOf("<");
      const iO = {};
      const iU = /([A-Z])/g;
      function iI(e10) {
        let t10 = "";
        for (const r10 in e10) {
          const n10 = e10[r10];
          null != n10 && "" !== n10 && (t10 && (t10 += " "), t10 += "-" === r10[0] ? r10 : iO[r10] || (iO[r10] = r10.replace(iU, "-$1").toLowerCase()), t10 = "number" === typeof n10 && false === iS.test(r10) ? `${t10}: ${n10}px;` : `${t10}: ${n10};`);
        }
        return t10 || void 0;
      }
      function iN(e10, t10) {
        return Array.isArray(t10) ? t10.reduce(iN, e10) : null != t10 && false !== t10 && e10.push(t10), e10;
      }
      function i$() {
        this.__d = true;
      }
      function iD(e10, t10) {
        return { __v: e10, context: t10, props: e10.props, setState: i$, forceUpdate: i$, __d: true, __h: [] };
      }
      function ij(e10, t10) {
        const r10 = e10.contextType;
        const n10 = r10 && t10[r10.__c];
        return null != r10 ? n10 ? n10.props.value : r10.__ : t10;
      }
      const iH = [];
      const iL = { shallow: true };
      iW.render = iW;
      const iM = [];
      function iW(e10, t10, r10) {
        t10 = t10 || {};
        let n10;
        const i10 = n4.__s;
        return n4.__s = true, n10 = r10 && (r10.pretty || r10.voidElements || r10.sortAttributes || r10.shallow || r10.allAttributes || r10.xml || r10.attributeHook) ? function e11(t11, r11, n11, i11, o10, a10) {
          if (null == t11 || "boolean" === typeof t11) return "";
          if ("object" !== typeof t11) return iT(t11);
          const s2 = n11.pretty;
          const c2 = s2 && "string" === typeof s2 ? s2 : "	";
          if (Array.isArray(t11)) {
            for (let l2 = "", u2 = 0; u2 < t11.length; u2++) s2 && u2 > 0 && (l2 += "\n"), l2 += e11(t11[u2], r11, n11, i11, o10, a10);
            return l2;
          }
          let d2;
          let p2 = t11.type;
          const h2 = t11.props;
          let f2 = false;
          if ("function" === typeof p2) {
            if (f2 = true, !n11.shallow || !i11 && false !== n11.renderRootComponent) {
              if (p2 === ic) {
                const y2 = [];
                return iN(y2, t11.props.children), e11(y2, r11, n11, false !== n11.shallowHighOrder, o10, a10);
              }
              let m2;
              let g2 = t11.__c = iD(t11, r11);
              n4.__b?.(t11);
              const w2 = n4.__r;
              if (p2.prototype && "function" === typeof p2.prototype.render) {
                const b2 = ij(p2, r11);
                (g2 = t11.__c = new p2(h2, b2)).__v = t11, g2._dirty = g2.__d = true, g2.props = h2, null == g2.state && (g2.state = {}), null == g2._nextState && null == g2.__s && (g2._nextState = g2.__s = g2.state), g2.context = b2, p2.getDerivedStateFromProps ? g2.state = Object.assign({}, g2.state, p2.getDerivedStateFromProps(g2.props, g2.state)) : g2.componentWillMount && (g2.componentWillMount(), g2.state = g2._nextState !== g2.state ? g2._nextState : g2.__s !== g2.state ? g2.__s : g2.state), w2?.(t11), m2 = g2.render(g2.props, g2.state, g2.context);
              } else for (let v2 = ij(p2, r11), _2 = 0; g2.__d && _2++ < 25; ) g2.__d = false, w2?.(t11), m2 = p2.call(t11.__c, h2, v2);
              return g2.getChildContext && (r11 = Object.assign({}, r11, g2.getChildContext())), n4.diffed?.(t11), e11(m2, r11, n11, false !== n11.shallowHighOrder, o10, a10);
            }
            p2 = (d2 = p2).displayName || d2 !== Function && d2.name || ((e12) => {
              let t12 = (Function.prototype.toString.call(e12).match(/^\s*function\s+([^( ]+)/) || "")[1];
              if (!t12) {
                for (let r12 = -1, n12 = iH.length; n12--; ) if (iH[n12] === e12) {
                  r12 = n12;
                  break;
                }
                r12 < 0 && (r12 = iH.push(e12) - 1), t12 = `UnnamedComponent${r12}`;
              }
              return t12;
            })(d2);
          }
          let E2;
          let S2;
          let k2 = `<${p2}`;
          if (h2) {
            const x2 = Object.keys(h2);
            n11 && true === n11.sortAttributes && x2.sort();
            for (let R2 = 0; R2 < x2.length; R2++) {
              let A2 = x2[R2];
              let T2 = h2[A2];
              if ("children" !== A2) {
                if (!ix.test(A2) && (n11?.allAttributes || "key" !== A2 && "ref" !== A2 && "__self" !== A2 && "__source" !== A2)) {
                  if ("defaultValue" === A2) A2 = "value";
                  else if ("defaultChecked" === A2) A2 = "checked";
                  else if ("defaultSelected" === A2) A2 = "selected";
                  else if ("className" === A2) {
                    if (void 0 !== h2.class) continue;
                    A2 = "class";
                  } else o10 && iR.test(A2) && (A2 = A2.toLowerCase().replace(/^xlink:?/, "xlink:"));
                  if ("htmlFor" === A2) {
                    if (h2.for) continue;
                    A2 = "for";
                  }
                  "style" === A2 && T2 && "object" === typeof T2 && (T2 = iI(T2)), "a" === A2[0] && "r" === A2[1] && "boolean" === typeof T2 && (T2 = String(T2));
                  const C2 = n11.attributeHook?.(A2, T2, r11, n11, f2);
                  if (C2 || "" === C2) k2 += C2;
                  else if ("dangerouslySetInnerHTML" === A2) S2 = T2?.__html;
                  else if ("textarea" === p2 && "value" === A2) E2 = T2;
                  else if ((T2 || 0 === T2 || "" === T2) && "function" !== typeof T2) {
                    if (!(true !== T2 && "" !== T2 || (T2 = A2, n11?.xml))) {
                      k2 = `${k2} ${A2}`;
                      continue;
                    }
                    if ("value" === A2) {
                      if ("select" === p2) {
                        a10 = T2;
                        continue;
                      }
                      "option" === p2 && a10 === T2 && void 0 === h2.selected && (k2 += " selected");
                    }
                    k2 = `${k2} ${A2}="${iT(T2)}"`;
                  }
                }
              } else E2 = T2;
            }
          }
          if (s2) {
            const P2 = k2.replace(/\n\s*/, " ");
            P2 === k2 || ~P2.indexOf("\n") ? s2 && ~k2.indexOf("\n") && (k2 += "\n") : k2 = P2;
          }
          if (k2 += ">", ix.test(p2)) throw Error(`${p2} is not a valid HTML tag name in ${k2}`);
          let O2;
          const U2 = ik.test(p2) || n11.voidElements?.test(p2);
          const I2 = [];
          if (S2) s2 && iP(S2) && (S2 = `\n${c2}${iC(S2, c2)}`), k2 += S2;
          else if (null != E2 && iN(O2 = [], E2).length) {
            for (let N2 = s2 && ~k2.indexOf("\n"), $2 = false, D2 = 0; D2 < O2.length; D2++) {
              const j2 = O2[D2];
              if (null != j2 && false !== j2) {
                const H2 = e11(j2, r11, n11, true, "svg" === p2 || "foreignObject" !== p2 && o10, a10);
                if (s2 && !N2 && iP(H2) && (N2 = true), H2) if (s2) {
                  const L2 = H2.length > 0 && "<" !== H2[0];
                  $2 && L2 ? I2[I2.length - 1] += H2 : I2.push(H2), $2 = L2;
                } else I2.push(H2);
              }
            }
            if (s2 && N2) for (let M2 = I2.length; M2--; ) I2[M2] = `\n${c2}${iC(I2[M2], c2)}`;
          }
          if (I2.length || S2) k2 += I2.join("");
          else if (n11?.xml) return `${k2.substring(0, k2.length - 1)} />`;
          return !U2 || O2 || S2 ? (s2 && ~k2.indexOf("\n") && (k2 += "\n"), k2 = `${k2}</${p2}>`) : k2 = k2.replace(/>$/, " />"), k2;
        }(e10, t10, r10) : function e11(t11, r11, n11, i11) {
          if (null == t11 || true === t11 || false === t11 || "" === t11) return "";
          if ("object" !== typeof t11) return iT(t11);
          if (iK(t11)) {
            for (let o10 = "", a10 = 0; a10 < t11.length; a10++) o10 += e11(t11[a10], r11, n11, i11);
            return o10;
          }
          n4.__b?.(t11);
          const s2 = t11.type;
          const c2 = t11.props;
          if ("function" === typeof s2) {
            if (s2 === ic) return e11(t11.props.children, r11, n11, i11);
            let l2;
            let u2;
            let d2;
            let p2;
            let h2;
            const f2 = s2.prototype && "function" === typeof s2.prototype.render ? (l2 = r11, d2 = ij(u2 = t11.type, l2), p2 = new u2(t11.props, d2), t11.__c = p2, p2.__v = t11, p2.__d = true, p2.props = t11.props, null == p2.state && (p2.state = {}), null == p2.__s && (p2.__s = p2.state), p2.context = d2, u2.getDerivedStateFromProps ? p2.state = iq({}, p2.state, u2.getDerivedStateFromProps(p2.props, p2.state)) : p2.componentWillMount && (p2.componentWillMount(), p2.state = p2.__s !== p2.state ? p2.__s : p2.state), (h2 = n4.__r) && h2(t11), p2.render(p2.props, p2.state, p2.context)) : ((e12, t12) => {
              let r12;
              const n12 = iD(e12, t12);
              const i12 = ij(e12.type, t12);
              e12.__c = n12;
              for (let o11 = n4.__r, a11 = 0; n12.__d && a11++ < 25; ) n12.__d = false, o11?.(e12), r12 = e12.type.call(n12, e12.props, i12);
              return r12;
            })(t11, r11);
            const y2 = t11.__c;
            y2.getChildContext && (r11 = iq({}, r11, y2.getChildContext()));
            const m2 = e11(f2, r11, n11, i11);
            return n4.diffed?.(t11), m2;
          }
          let g2;
          let w2;
          let b2 = "<";
          if (b2 += s2, c2) for (let v2 in g2 = c2.children, c2) {
            let _2;
            let E2;
            let S2;
            let k2 = c2[v2];
            if (!("key" === v2 || "ref" === v2 || "__self" === v2 || "__source" === v2 || "children" === v2 || "className" === v2 && "class" in c2 || "htmlFor" === v2 && "for" in c2 || ix.test(v2))) {
              if (E2 = v2 = "className" === (_2 = v2) ? "class" : "htmlFor" === _2 ? "for" : "defaultValue" === _2 ? "value" : "defaultChecked" === _2 ? "checked" : "defaultSelected" === _2 ? "selected" : n11 && iR.test(_2) ? _2.toLowerCase().replace(/^xlink:?/, "xlink:") : _2, S2 = k2, k2 = "style" === E2 && null != S2 && "object" === typeof S2 ? iI(S2) : "a" === E2[0] && "r" === E2[1] && "boolean" === typeof S2 ? String(S2) : S2, "dangerouslySetInnerHTML" === v2) w2 = k2?.__html;
              else if ("textarea" === s2 && "value" === v2) g2 = k2;
              else if ((k2 || 0 === k2 || "" === k2) && "function" !== typeof k2) {
                if (true === k2 || "" === k2) {
                  k2 = v2, b2 = `${b2} ${v2}`;
                  continue;
                }
                if ("value" === v2) {
                  if ("select" === s2) {
                    i11 = k2;
                    continue;
                  }
                  "option" !== s2 || i11 !== k2 || "selected" in c2 || (b2 += " selected");
                }
                b2 = `${b2} ${v2}="${iT(k2)}"`;
              }
            }
          }
          const x2 = b2;
          if (b2 += ">", ix.test(s2)) throw Error(`${s2} is not a valid HTML tag name in ${b2}`);
          let R2 = "";
          let A2 = false;
          if (w2) R2 += w2, A2 = true;
          else if ("string" === typeof g2) R2 += iT(g2), A2 = true;
          else if (iK(g2)) for (let T2 = 0; T2 < g2.length; T2++) {
            const C2 = g2[T2];
            if (null != C2 && false !== C2) {
              const P2 = e11(C2, r11, "svg" === s2 || "foreignObject" !== s2 && n11, i11);
              P2 && (R2 += P2, A2 = true);
            }
          }
          else if (null != g2 && false !== g2 && true !== g2) {
            const O2 = e11(g2, r11, "svg" === s2 || "foreignObject" !== s2 && n11, i11);
            O2 && (R2 += O2, A2 = true);
          }
          if (n4.diffed?.(t11), A2) b2 += R2;
          else if (ik.test(s2)) return `${x2} />`;
          return `${b2}</${s2}>`;
        }(e10, t10, false, void 0), n4.__c?.(e10, iM), n4.__s = i10, iM.length = 0, n10;
      }
      const iK = Array.isArray;
      const iq = Object.assign;
      iW.shallowRender = (e10, t10) => iW(e10, t10, iL);
      let iB = 0;
      function iJ(e10, t10, r10, n10, i10) {
        let o10;
        let a10;
        const s2 = {};
        for (a10 in t10) "ref" === a10 ? o10 = t10[a10] : s2[a10] = t10[a10];
        const c2 = { type: e10, props: s2, key: r10, ref: o10, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --iB, __source: i10, __self: n10 };
        if ("function" === typeof e10 && (o10 = e10.defaultProps)) for (a10 in o10) void 0 === s2[a10] && (s2[a10] = o10[a10]);
        return n4.vnode?.(c2), c2;
      }
      async function iz(e10, t10) {
        const r10 = window.SimpleWebAuthnBrowser;
        async function n10(r11) {
          const n11 = new URL(`${e10}/webauthn-options/${t10}`);
          r11 && n11.searchParams.append("action", r11), o10().forEach((e11) => {
            n11.searchParams.append(e11.name, e11.value);
          });
          const i11 = await fetch(n11);
          return i11.ok ? i11.json() : void console.error("Failed to fetch options", i11);
        }
        function i10() {
          const e11 = `#${t10}-form`;
          const r11 = document.querySelector(e11);
          if (!r11) throw Error(`Form '${e11}' not found`);
          return r11;
        }
        function o10() {
          return Array.from(i10().querySelectorAll("input[data-form-field]"));
        }
        async function a10(e11, t11) {
          const r11 = i10();
          if (e11) {
            const t12 = document.createElement("input");
            t12.type = "hidden", t12.name = "action", t12.value = e11, r11.appendChild(t12);
          }
          if (t11) {
            const e12 = document.createElement("input");
            e12.type = "hidden", e12.name = "data", e12.value = JSON.stringify(t11), r11.appendChild(e12);
          }
          return r11.submit();
        }
        async function s2(e11, t11) {
          const n11 = await r10.startAuthentication(e11, t11);
          return await a10("authenticate", n11);
        }
        async function c2(e11) {
          o10().forEach((e12) => {
            if (e12.required && !e12.value) throw Error(`Missing required field: ${e12.name}`);
          });
          const t11 = await r10.startRegistration(e11);
          return await a10("register", t11);
        }
        async function l2() {
          if (!r10.browserSupportsWebAuthnAutofill()) return;
          const e11 = await n10("authenticate");
          if (!e11) return void console.error("Failed to fetch option for autofill authentication");
          try {
            await s2(e11.options, true);
          } catch (e12) {
            console.error(e12);
          }
        }
        (async () => {
          const e11 = i10();
          if (!r10.browserSupportsWebAuthn()) {
            e11.style.display = "none";
            return;
          }
          e11?.addEventListener("submit", async (e12) => {
            e12.preventDefault();
            const t11 = await n10(void 0);
            if (!t11) return void console.error("Failed to fetch options for form submission");
            if ("authenticate" === t11.action) try {
              await s2(t11.options, false);
            } catch (e13) {
              console.error(e13);
            }
            else if ("register" === t11.action) try {
              await c2(t11.options);
            } catch (e13) {
              console.error(e13);
            }
          });
        })(), l2();
      }
      const iF = { default: "Unable to sign in.", Signin: "Try signing in with a different account.", OAuthSignin: "Try signing in with a different account.", OAuthCallbackError: "Try signing in with a different account.", OAuthCreateAccount: "Try signing in with a different account.", EmailCreateAccount: "Try signing in with a different account.", Callback: "Try signing in with a different account.", OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.", EmailSignin: "The e-mail could not be sent.", CredentialsSignin: "Sign in failed. Check the details you provided are correct.", SessionRequired: "Please sign in to access this page." };
      const iV = `:root {
  --border-width: 1px;
  --border-radius: 0.5rem;
  --color-error: #c94b4b;
  --color-info: #157efb;
  --color-info-hover: #0f6ddb;
  --color-info-text: #fff;
}

.__next-auth-theme-auto,
.__next-auth-theme-light {
  --color-background: #ececec;
  --color-background-hover: rgba(236, 236, 236, 0.8);
  --color-background-card: #fff;
  --color-text: #000;
  --color-primary: #444;
  --color-control-border: #bbb;
  --color-button-active-background: #f9f9f9;
  --color-button-active-border: #aaa;
  --color-separator: #ccc;
}

.__next-auth-theme-dark {
  --color-background: #161b22;
  --color-background-hover: rgba(22, 27, 34, 0.8);
  --color-background-card: #0d1117;
  --color-text: #fff;
  --color-primary: #ccc;
  --color-control-border: #555;
  --color-button-active-background: #060606;
  --color-button-active-border: #666;
  --color-separator: #444;
}

@media (prefers-color-scheme: dark) {
  .__next-auth-theme-auto {
    --color-background: #161b22;
    --color-background-hover: rgba(22, 27, 34, 0.8);
    --color-background-card: #0d1117;
    --color-text: #fff;
    --color-primary: #ccc;
    --color-control-border: #555;
    --color-button-active-background: #060606;
    --color-button-active-border: #666;
    --color-separator: #444;
  }

  button,
  a.button {
    color: var(--provider-dark-color, var(--color-primary)) !important;
    background-color: var(
      --provider-dark-bg,
      var(--color-background)
    ) !important;
  }

    :is(button,a.button):hover {
      background-color: var(
        --provider-dark-bg-hover,
        var(--color-background-hover)
      ) !important;
    }

    :is(button,a.button) span {
      color: var(--provider-dark-bg) !important;
    }
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-background);
  margin: 0;
  padding: 0;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji";
}

h1 {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  font-weight: 400;
  color: var(--color-text);
}

p {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  color: var(--color-text);
}

form {
  margin: 0;
  padding: 0;
}

label {
  font-weight: 500;
  text-align: left;
  margin-bottom: 0.25rem;
  display: block;
  color: var(--color-text);
}

input[type] {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  border: var(--border-width) solid var(--color-control-border);
  background: var(--color-background-card);
  font-size: 1rem;
  border-radius: var(--border-radius);
  color: var(--color-text);
}

p {
  font-size: 1.1rem;
  line-height: 2rem;
}

a.button {
  text-decoration: none;
  line-height: 1rem;
}

a.button:link,
  a.button:visited {
    background-color: var(--color-background);
    color: var(--color-primary);
  }

button,
a.button {
  padding: 0.75rem 1rem;
  color: var(--provider-color, var(--color-primary));
  background-color: var(--provider-bg, var(--color-background));
  border: 1px solid #00000031;
  font-size: 0.9rem;
  height: 50px;
  border-radius: var(--border-radius);
  transition: background-color 250ms ease-in-out;
  font-weight: 300;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:is(button,a.button):hover {
    background-color: var(--provider-bg-hover, var(--color-background-hover));
    cursor: pointer;
  }

:is(button,a.button):active {
    cursor: pointer;
  }

:is(button,a.button) span {
    color: #fff;
  }

#submitButton {
  color: var(--button-text-color, var(--color-info-text));
  background-color: var(--brand-color, var(--color-info));
  width: 100%;
}

#submitButton:hover {
    background-color: var(
      --button-hover-bg,
      var(--color-info-hover)
    ) !important;
  }

a.site {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 1rem;
  line-height: 2rem;
}

a.site:hover {
    text-decoration: underline;
  }

.page {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page > div {
    text-align: center;
  }

.error a.button {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 0.5rem;
  }

.error .message {
    margin-bottom: 1.5rem;
  }

.signin input[type="text"] {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

.signin hr {
    display: block;
    border: 0;
    border-top: 1px solid var(--color-separator);
    margin: 2rem auto 1rem auto;
    overflow: visible;
  }

.signin hr::before {
      content: "or";
      background: var(--color-background-card);
      color: #888;
      padding: 0 0.4rem;
      position: relative;
      top: -0.7rem;
    }

.signin .error {
    background: #f5f5f5;
    font-weight: 500;
    border-radius: 0.3rem;
    background: var(--color-error);
  }

.signin .error p {
      text-align: left;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      line-height: 1.2rem;
      color: var(--color-info-text);
    }

.signin > div,
  .signin form {
    display: block;
  }

.signin > div input[type], .signin form input[type] {
      margin-bottom: 0.5rem;
    }

.signin > div button, .signin form button {
      width: 100%;
    }

.signin .provider + .provider {
    margin-top: 1rem;
  }

.logo {
  display: inline-block;
  max-width: 150px;
  margin: 1.25rem 0;
  max-height: 70px;
}

.card {
  background-color: var(--color-background-card);
  border-radius: 1rem;
  padding: 1.25rem 2rem;
}

.card .header {
    color: var(--color-primary);
  }

.card input[type]::-moz-placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type]::placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type] {
    background: color-mix(in srgb, var(--color-background-card) 95%, black);
  }

.section-header {
  color: var(--color-text);
}

@media screen and (min-width: 450px) {
  .card {
    margin: 2rem 0;
    width: 368px;
  }
}

@media screen and (max-width: 450px) {
  .card {
    margin: 1rem 0;
    width: 343px;
  }
}
`;
      function iX({ html: e10, title: t10, status: r10, cookies: n10, theme: i10, headTags: o10 }) {
        return { cookies: n10, status: r10, headers: { "Content-Type": "text/html" }, body: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${iV}</style><title>${t10}</title>${o10 ?? ""}</head><body class="__next-auth-theme-${i10?.colorScheme ?? "auto"}"><div class="page">${iW(e10)}</div></body></html>` };
      }
      function iG(e10) {
        const { url: t10, theme: r10, query: n10, cookies: i10, pages: o10, providers: a10 } = e10;
        return { csrf: (e11, t11, r11) => e11 ? (t11.logger.warn("csrf-disabled"), r11.push({ name: t11.cookies.csrfToken.name, value: "", options: { ...t11.cookies.csrfToken.options, maxAge: 0 } }), { status: 404, cookies: r11 }) : { headers: { "Content-Type": "application/json" }, body: { csrfToken: t11.csrfToken }, cookies: r11 }, providers: (e11) => ({ headers: { "Content-Type": "application/json" }, body: e11.reduce((e12, { id: t11, name: r11, type: n11, signinUrl: i11, callbackUrl: o11 }) => (e12[t11] = { id: t11, name: r11, type: n11, signinUrl: i11, callbackUrl: o11 }, e12), {}) }), signin(t11, s2) {
          if (t11) throw new tk("Unsupported action");
          if (o10?.signIn) {
            let t12 = `${o10.signIn}${o10.signIn.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: e10.callbackUrl ?? "/" })}`;
            return s2 && (t12 = `${t12}&${new URLSearchParams({ error: s2 })}`), { redirect: t12, cookies: i10 };
          }
          const c2 = a10?.find((e11) => "webauthn" === e11.type && e11.enableConditionalUI && !!e11.simpleWebAuthnBrowserVersion);
          let l2 = "";
          if (c2) {
            const { simpleWebAuthnBrowserVersion: e11 } = c2;
            l2 = `<script src="https://unpkg.com/@simplewebauthn/browser@${e11}/dist/bundle/index.umd.min.js" crossorigin="anonymous"></script>`;
          }
          return iX({ cookies: i10, theme: r10, html: ((e11) => {
            const { csrfToken: t12, providers: r11 = [], callbackUrl: n11, theme: i11, email: o11, error: a11 } = e11;
            "undefined" !== typeof document && i11?.brandColor && document.documentElement.style.setProperty("--brand-color", i11.brandColor), "undefined" !== typeof document && i11?.buttonText && document.documentElement.style.setProperty("--button-text-color", i11.buttonText);
            const s3 = a11 && (iF[a11] ?? iF.default);
            const c3 = r11.find((e12) => "webauthn" === e12.type && e12.enableConditionalUI)?.id;
            return iJ("div", { className: "signin", children: [i11?.brandColor && iJ("style", { dangerouslySetInnerHTML: { __html: `:root {--brand-color: ${i11.brandColor}}` } }), i11?.buttonText && iJ("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --button-text-color: ${i11.buttonText}
        }
      ` } }), iJ("div", { className: "card", children: [s3 && iJ("div", { className: "error", children: iJ("p", { children: s3 }) }), i11?.logo && iJ("img", { src: i11.logo, alt: "Logo", className: "logo" }), r11.map((e12, i12) => {
              let a12;
              let s4;
              let c4;
              ("oauth" === e12.type || "oidc" === e12.type) && ({ bg: a12 = "#fff", brandColor: s4, logo: c4 = `https://authjs.dev/img/providers/${e12.id}.svg` } = e12.style ?? {});
              const l3 = s4 ?? a12 ?? "#fff";
              return iJ("div", { className: "provider", children: ["oauth" === e12.type || "oidc" === e12.type ? iJ("form", { action: e12.signinUrl, method: "POST", children: [iJ("input", { type: "hidden", name: "csrfToken", value: t12 }), n11 && iJ("input", { type: "hidden", name: "callbackUrl", value: n11 }), iJ("button", { type: "submit", className: "button", style: { "--provider-bg": "#fff", "--provider-bg-hover": `color-mix(in srgb, ${l3} 30%, #fff)`, "--provider-dark-bg": "#161b22", "--provider-dark-bg-hover": `color-mix(in srgb, ${l3} 30%, #000)` }, tabIndex: 0, children: [iJ("span", { style: { filter: "invert(1) grayscale(1) brightness(1.3) contrast(9000)", "mix-blend-mode": "luminosity", opacity: 0.95 }, children: ["Sign in with ", e12.name] }), c4 && iJ("img", { loading: "lazy", height: 24, src: c4 })] })] }) : null, ("email" === e12.type || "credentials" === e12.type || "webauthn" === e12.type) && i12 > 0 && "email" !== r11[i12 - 1].type && "credentials" !== r11[i12 - 1].type && "webauthn" !== r11[i12 - 1].type && iJ("hr", {}), "email" === e12.type && iJ("form", { action: e12.signinUrl, method: "POST", children: [iJ("input", { type: "hidden", name: "csrfToken", value: t12 }), iJ("label", { className: "section-header", htmlFor: `input-email-for-${e12.id}-provider`, children: "Email" }), iJ("input", { id: `input-email-for-${e12.id}-provider`, autoFocus: true, type: "email", name: "email", value: o11, placeholder: "email@example.com", required: true }), iJ("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", e12.name] })] }), "credentials" === e12.type && iJ("form", { action: e12.callbackUrl, method: "POST", children: [iJ("input", { type: "hidden", name: "csrfToken", value: t12 }), Object.keys(e12.credentials).map((t13) => iJ("div", { children: [iJ("label", { className: "section-header", htmlFor: `input-${t13}-for-${e12.id}-provider`, children: e12.credentials[t13].label ?? t13 }), iJ("input", { name: t13, id: `input-${t13}-for-${e12.id}-provider`, type: e12.credentials[t13].type ?? "text", placeholder: e12.credentials[t13].placeholder ?? "", ...e12.credentials[t13] })] }, `input-group-${e12.id}`)), iJ("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", e12.name] })] }), "webauthn" === e12.type && iJ("form", { action: e12.callbackUrl, method: "POST", id: `${e12.id}-form`, children: [iJ("input", { type: "hidden", name: "csrfToken", value: t12 }), Object.keys(e12.formFields).map((t13) => iJ("div", { children: [iJ("label", { className: "section-header", htmlFor: `input-${t13}-for-${e12.id}-provider`, children: e12.formFields[t13].label ?? t13 }), iJ("input", { name: t13, "data-form-field": true, id: `input-${t13}-for-${e12.id}-provider`, type: e12.formFields[t13].type ?? "text", placeholder: e12.formFields[t13].placeholder ?? "", ...e12.formFields[t13] })] }, `input-group-${e12.id}`)), iJ("button", { id: `submitButton-${e12.id}`, type: "submit", tabIndex: 0, children: ["Sign in with ", e12.name] })] }), ("email" === e12.type || "credentials" === e12.type || "webauthn" === e12.type) && i12 + 1 < r11.length && iJ("hr", {})] }, e12.id);
            })] }), c3 && iJ(ic, { children: iJ("script", { dangerouslySetInnerHTML: { __html: `
const currentURL = window.location.href;
const authURL = currentURL.substring(0, currentURL.lastIndexOf('/'));
(${iz})(authURL, "${c3}");
` } }) })] });
          })({ csrfToken: e10.csrfToken, providers: e10.providers?.filter((e11) => ["email", "oauth", "oidc"].includes(e11.type) || "credentials" === e11.type && e11.credentials || "webauthn" === e11.type && e11.formFields || false), callbackUrl: e10.callbackUrl, theme: e10.theme, error: s2, ...n10 }), title: "Sign In", headTags: l2 });
        }, signout: () => o10?.signOut ? { redirect: o10.signOut, cookies: i10 } : iX({ cookies: i10, theme: r10, html: ((e11) => {
          const { url: t11, csrfToken: r11, theme: n11 } = e11;
          return iJ("div", { className: "signout", children: [n11?.brandColor && iJ("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --brand-color: ${n11.brandColor}
        }
      ` } }), n11?.buttonText && iJ("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --button-text-color: ${n11.buttonText}
        }
      ` } }), iJ("div", { className: "card", children: [n11?.logo && iJ("img", { src: n11.logo, alt: "Logo", className: "logo" }), iJ("h1", { children: "Signout" }), iJ("p", { children: "Are you sure you want to sign out?" }), iJ("form", { action: t11?.toString(), method: "POST", children: [iJ("input", { type: "hidden", name: "csrfToken", value: r11 }), iJ("button", { id: "submitButton", type: "submit", children: "Sign out" })] })] })] });
        })({ csrfToken: e10.csrfToken, url: t10, theme: r10 }), title: "Sign Out" }), verifyRequest: (e11) => o10?.verifyRequest ? { redirect: o10.verifyRequest, cookies: i10 } : iX({ cookies: i10, theme: r10, html: ((e12) => {
          const { url: t11, theme: r11 } = e12;
          return iJ("div", { className: "verify-request", children: [r11.brandColor && iJ("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --brand-color: ${r11.brandColor}
        }
      ` } }), iJ("div", { className: "card", children: [r11.logo && iJ("img", { src: r11.logo, alt: "Logo", className: "logo" }), iJ("h1", { children: "Check your email" }), iJ("p", { children: "A sign in link has been sent to your email address." }), iJ("p", { children: iJ("a", { className: "site", href: t11.origin, children: t11.host }) })] })] });
        })({ url: t10, theme: r10, ...e11 }), title: "Verify Request" }), error: (e11) => o10?.error ? { redirect: `${o10.error}${o10.error.includes("?") ? "&" : "?"}error=${e11}`, cookies: i10 } : iX({ cookies: i10, theme: r10, ...((e12) => {
          const { url: t11, error: r11 = "default", theme: n11 } = e12;
          const i11 = `${t11}/signin`;
          const o11 = { default: { status: 200, heading: "Error", message: iJ("p", { children: iJ("a", { className: "site", href: t11?.origin, children: t11?.host }) }) }, Configuration: { status: 500, heading: "Server error", message: iJ("div", { children: [iJ("p", { children: "There is a problem with the server configuration." }), iJ("p", { children: "Check the server logs for more information." })] }) }, AccessDenied: { status: 403, heading: "Access Denied", message: iJ("div", { children: [iJ("p", { children: "You do not have permission to sign in." }), iJ("p", { children: iJ("a", { className: "button", href: i11, children: "Sign in" }) })] }) }, Verification: { status: 403, heading: "Unable to sign in", message: iJ("div", { children: [iJ("p", { children: "The sign in link is no longer valid." }), iJ("p", { children: "It may have been used already or it may have expired." })] }), signin: iJ("a", { className: "button", href: i11, children: "Sign in" }) } };
          const { status: a11, heading: s2, message: c2, signin: l2 } = o11[r11] ?? o11.default;
          return { status: a11, html: iJ("div", { className: "error", children: [n11?.brandColor && iJ("style", { dangerouslySetInnerHTML: { __html: `
        :root {
          --brand-color: ${n11?.brandColor}
        }
      ` } }), iJ("div", { className: "card", children: [n11?.logo && iJ("img", { src: n11?.logo, alt: "Logo", className: "logo" }), iJ("h1", { children: s2 }), iJ("div", { className: "message", children: c2 }), l2] })] }) };
        })({ url: t10, theme: r10, error: e11 }), title: "Error" }) };
      }
      function iY(e10, t10 = Date.now()) {
        return new Date(t10 + 1e3 * e10);
      }
      async function iQ(e10, t10, r10, n10) {
        if (!r10?.providerAccountId || !r10.type) throw Error("Missing or invalid provider account");
        if (!["email", "oauth", "oidc", "webauthn"].includes(r10.type)) throw Error("Provider not supported");
        const { adapter: i10, jwt: o10, events: a10, session: { strategy: s2, generateSessionToken: c2 } } = n10;
        if (!i10) return { user: t10, account: r10 };
        let l2 = r10;
        const { createUser: u2, updateUser: d2, getUser: p2, getUserByAccount: h2, getUserByEmail: f2, linkAccount: y2, createSession: m2, getSessionAndUser: g2, deleteSession: w2 } = i10;
        let b2 = null;
        let v2 = null;
        let _2 = false;
        const E2 = "jwt" === s2;
        if (e10) if (E2) try {
          const t11 = n10.cookies.sessionToken.name;
          (b2 = await o10.decode({ ...o10, token: e10, salt: t11 })) && "sub" in b2 && b2.sub && (v2 = await p2(b2.sub));
        } catch {
        }
        else {
          const t11 = await g2(e10);
          t11 && (b2 = t11.session, v2 = t11.user);
        }
        if ("email" === l2.type) {
          const r11 = await f2(t10.email);
          return r11 ? (v2?.id !== r11.id && !E2 && e10 && await w2(e10), v2 = await d2({ id: r11.id, emailVerified: /* @__PURE__ */ new Date() }), await a10.updateUser?.({ user: v2 })) : (v2 = await u2({ ...t10, emailVerified: /* @__PURE__ */ new Date() }), await a10.createUser?.({ user: v2 }), _2 = true), { session: b2 = E2 ? {} : await m2({ sessionToken: c2(), userId: v2.id, expires: iY(n10.session.maxAge) }), user: v2, isNewUser: _2 };
        }
        if ("webauthn" === l2.type) {
          const e11 = await h2({ providerAccountId: l2.providerAccountId, provider: l2.provider });
          if (e11) {
            if (v2) {
              if (e11.id === v2.id) {
                const e12 = { ...l2, userId: v2.id };
                return { session: b2, user: v2, isNewUser: _2, account: e12 };
              }
              throw new tN("The account is already associated with another user", { provider: l2.provider });
            }
            b2 = E2 ? {} : await m2({ sessionToken: c2(), userId: e11.id, expires: iY(n10.session.maxAge) });
            const t11 = { ...l2, userId: e11.id };
            return { session: b2, user: e11, isNewUser: _2, account: t11 };
          }
          {
            if (v2) {
              await y2({ ...l2, userId: v2.id }), await a10.linkAccount?.({ user: v2, account: l2, profile: t10 });
              const e13 = { ...l2, userId: v2.id };
              return { session: b2, user: v2, isNewUser: _2, account: e13 };
            }
            if (t10.email ? await f2(t10.email) : null) throw new tN("Another account already exists with the same e-mail address", { provider: l2.provider });
            v2 = await u2({ ...t10 }), await a10.createUser?.({ user: v2 }), await y2({ ...l2, userId: v2.id }), await a10.linkAccount?.({ user: v2, account: l2, profile: t10 }), b2 = E2 ? {} : await m2({ sessionToken: c2(), userId: v2.id, expires: iY(n10.session.maxAge) });
            const e12 = { ...l2, userId: v2.id };
            return { session: b2, user: v2, isNewUser: true, account: e12 };
          }
        }
        const S2 = await h2({ providerAccountId: l2.providerAccountId, provider: l2.provider });
        if (S2) {
          if (v2) {
            if (S2.id === v2.id) return { session: b2, user: v2, isNewUser: _2 };
            throw new tb("The account is already associated with another user", { provider: l2.provider });
          }
          return { session: b2 = E2 ? {} : await m2({ sessionToken: c2(), userId: S2.id, expires: iY(n10.session.maxAge) }), user: S2, isNewUser: _2 };
        }
        {
          const { provider: e11 } = n10;
          const { type: r11, provider: i11, providerAccountId: o11, userId: s3, ...d3 } = l2;
          if (l2 = Object.assign(e11.account(d3) ?? {}, { providerAccountId: o11, provider: i11, type: r11, userId: s3 }), v2) return await y2({ ...l2, userId: v2.id }), await a10.linkAccount?.({ user: v2, account: l2, profile: t10 }), { session: b2, user: v2, isNewUser: _2 };
          const p3 = t10.email ? await f2(t10.email) : null;
          if (p3) {
            const e12 = n10.provider;
            if (e12?.allowDangerousEmailAccountLinking) v2 = p3, _2 = false;
            else throw new tb("Another account already exists with the same e-mail address", { provider: l2.provider });
          } else v2 = await u2({ ...t10, emailVerified: null }), _2 = true;
          return await a10.createUser?.({ user: v2 }), await y2({ ...l2, userId: v2.id }), await a10.linkAccount?.({ user: v2, account: l2, profile: t10 }), { session: b2 = E2 ? {} : await m2({ sessionToken: c2(), userId: v2.id, expires: iY(n10.session.maxAge) }), user: v2, isNewUser: _2 };
        }
      }
      function iZ(e10, t10) {
        if (null == e10) return false;
        try {
          return e10 instanceof t10 || Object.getPrototypeOf(e10)[Symbol.toStringTag] === t10.prototype[Symbol.toStringTag];
        } catch {
          return false;
        }
      }
      "undefined" !== typeof navigator && navigator.userAgent?.startsWith?.("Mozilla/5.0 ") || (i = "oauth4webapi/v3.8.3");
      const i0 = "ERR_INVALID_ARG_VALUE";
      const i1 = "ERR_INVALID_ARG_TYPE";
      function i2(e10, t10, r10) {
        const n10 = TypeError(e10, { cause: r10 });
        return Object.assign(n10, { code: t10 }), n10;
      }
      const i3 = Symbol();
      const i6 = Symbol();
      const i5 = Symbol();
      const i8 = Symbol();
      const i4 = Symbol();
      const i9 = Symbol();
      Symbol();
      const i7 = new TextEncoder();
      const oe = new TextDecoder();
      function ot(e10) {
        return "string" === typeof e10 ? i7.encode(e10) : oe.decode(e10);
      }
      function or(e10) {
        return "string" === typeof e10 ? a(e10) : o(e10);
      }
      o = Uint8Array.prototype.toBase64 ? (e10) => (e10 instanceof ArrayBuffer && (e10 = new Uint8Array(e10)), e10.toBase64({ alphabet: "base64url", omitPadding: true })) : (e10) => {
        e10 instanceof ArrayBuffer && (e10 = new Uint8Array(e10));
        const t10 = [];
        for (let r10 = 0; r10 < e10.byteLength; r10 += 32768) t10.push(String.fromCharCode.apply(null, e10.subarray(r10, r10 + 32768)));
        return btoa(t10.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }, a = Uint8Array.fromBase64 ? (e10) => {
        try {
          return Uint8Array.fromBase64(e10, { alphabet: "base64url" });
        } catch (e11) {
          throw i2("The input to be decoded is not correctly encoded.", i0, e11);
        }
      } : (e10) => {
        try {
          const t10 = atob(e10.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, ""));
          const r10 = new Uint8Array(t10.length);
          for (let e11 = 0; e11 < t10.length; e11++) r10[e11] = t10.charCodeAt(e11);
          return r10;
        } catch (e11) {
          throw i2("The input to be decoded is not correctly encoded.", i0, e11);
        }
      };
      class on extends Error {
        code;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = ai, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class oi extends Error {
        code;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, t10?.code && (this.code = t10?.code), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      function oo(e10, t10, r10) {
        return new oi(e10, { code: t10, cause: r10 });
      }
      function oa(e10) {
        return !(null === e10 || "object" !== typeof e10 || Array.isArray(e10));
      }
      function os(e10) {
        iZ(e10, Headers) && (e10 = Object.fromEntries(e10.entries()));
        const t10 = new Headers(e10 ?? {});
        if (i && !t10.has("user-agent") && t10.set("user-agent", i), t10.has("authorization")) throw i2('"options.headers" must not include the "authorization" header name', i0);
        return t10;
      }
      function oc(e10, t10) {
        if (void 0 !== t10) {
          if ("function" === typeof t10 && (t10 = t10(e10.href)), !(t10 instanceof AbortSignal)) throw i2('"options.signal" must return or be an instance of AbortSignal', i1);
          return t10;
        }
      }
      function ol(e10) {
        return e10.includes("//") ? e10.replace("//", "/") : e10;
      }
      async function ou(e10, t10, r10, n10) {
        if (!(e10 instanceof URL)) throw i2(`"${t10}" must be an instance of URL`, i1);
        oR(e10, n10?.[i3] !== true);
        const i10 = r10(new URL(e10.href));
        const o10 = os(n10?.headers);
        return o10.set("accept", "application/json"), (n10?.[i8] || fetch)(i10.href, { body: void 0, headers: Object.fromEntries(o10.entries()), method: "GET", redirect: "manual", signal: oc(i10, n10?.signal) });
      }
      async function od(e10, t10) {
        return ou(e10, "issuerIdentifier", (e11) => {
          switch (t10?.algorithm) {
            case void 0:
            case "oidc":
              e11.pathname = ol(`${e11.pathname}/.well-known/openid-configuration`);
              break;
            case "oauth2":
              !((e12, t11, r10 = false) => {
                "/" === e12.pathname ? e12.pathname = t11 : e12.pathname = ol(`${t11}/${r10 ? e12.pathname : e12.pathname.replace(/(\/)$/, "")}`);
              })(e11, ".well-known/oauth-authorization-server");
              break;
            default:
              throw i2('"options.algorithm" must be "oidc" (default), or "oauth2"', i0);
          }
          return e11;
        }, t10);
      }
      function op(e10, t10, r10, n10, i10) {
        try {
          if ("number" !== typeof e10 || !Number.isFinite(e10)) throw i2(`${r10} must be a number`, i1, i10);
          if (e10 > 0) return;
          if (t10) {
            if (0 !== e10) throw i2(`${r10} must be a non-negative number`, i0, i10);
            return;
          }
          throw i2(`${r10} must be a positive number`, i0, i10);
        } catch (e11) {
          if (n10) throw oo(e11.message, n10, i10);
          throw e11;
        }
      }
      function oh(e10, t10, r10, n10) {
        try {
          if ("string" !== typeof e10) throw i2(`${t10} must be a string`, i1, n10);
          if (0 === e10.length) throw i2(`${t10} must not be empty`, i0, n10);
        } catch (e11) {
          if (r10) throw oo(e11.message, r10, n10);
          throw e11;
        }
      }
      async function of(e10, t10) {
        if (!(e10 instanceof URL) && e10 !== aR) throw i2('"expectedIssuerIdentifier" must be an instance of URL', i1);
        if (!iZ(t10, Response)) throw i2('"response" must be an instance of Response', i1);
        if (200 !== t10.status) throw oo('"response" is not a conform Authorization Server Metadata response (unexpected HTTP status code)', au, t10);
        aw(t10);
        const r10 = await ax(t10);
        if (oh(r10.issuer, '"response" body "issuer" property', ac, { body: r10 }), e10 !== aR && new URL(r10.issuer).href !== e10.href) throw oo('"response" body "issuer" property does not match the expected value', ay, { expected: e10.href, body: r10, attribute: "issuer" });
        return r10;
      }
      function oy(e10) {
        const t10 = e10;
        const r10 = "application/json";
        if (oq(t10) !== r10) throw ((e11, ...t11) => {
          let r11 = '"response" content-type must be ';
          if (t11.length > 2) {
            const e12 = t11.pop();
            r11 += `${t11.join(", ")}, or ${e12}`;
          } else 2 === t11.length ? r11 += `${t11[0]} or ${t11[1]}` : r11 += t11[0];
          return oo(r11, al, e11);
        })(t10, r10);
      }
      function om() {
        return or(crypto.getRandomValues(new Uint8Array(32)));
      }
      async function og(e10) {
        return oh(e10, "codeVerifier"), or(await crypto.subtle.digest("SHA-256", ot(e10)));
      }
      function ow(e10) {
        const t10 = e10?.[i6];
        return "number" === typeof t10 && Number.isFinite(t10) ? t10 : 0;
      }
      function ob(e10) {
        const t10 = e10?.[i5];
        return "number" === typeof t10 && Number.isFinite(t10) && -1 !== Math.sign(t10) ? t10 : 30;
      }
      function ov() {
        return Math.floor(Date.now() / 1e3);
      }
      function o_(e10) {
        if ("object" !== typeof e10 || null === e10) throw i2('"as" must be an object', i1);
        oh(e10.issuer, '"as.issuer"');
      }
      function oE(e10) {
        if ("object" !== typeof e10 || null === e10) throw i2('"client" must be an object', i1);
        oh(e10.client_id, '"client.client_id"');
      }
      function oS(e10, t10) {
        const r10 = ov() + ow(t10);
        return { jti: om(), aud: e10.issuer, exp: r10 + 60, iat: r10, nbf: r10, iss: t10.client_id, sub: t10.client_id };
      }
      async function ok(e10, t10, r10) {
        if (!r10.usages.includes("sign")) throw i2('CryptoKey instances used for signing assertions must include "sign" in their "usages"', i0);
        const n10 = `${or(ot(JSON.stringify(e10)))}.${or(ot(JSON.stringify(t10)))}`;
        const i10 = or(await crypto.subtle.sign(((e11) => {
          switch (e11.algorithm.name) {
            case "ECDSA":
              return { name: e11.algorithm.name, hash: ((e12) => {
                const { algorithm: t11 } = e12;
                switch (t11.namedCurve) {
                  case "P-256":
                    return "SHA-256";
                  case "P-384":
                    return "SHA-384";
                  case "P-521":
                    return "SHA-512";
                  default:
                    throw new on("unsupported ECDSA namedCurve", { cause: e12 });
                }
              })(e11) };
            case "RSA-PSS":
              switch (ab(e11), e11.algorithm.hash.name) {
                case "SHA-256":
                case "SHA-384":
                case "SHA-512":
                  return { name: e11.algorithm.name, saltLength: Number.parseInt(e11.algorithm.hash.name.slice(-3), 10) >> 3 };
                default:
                  throw new on("unsupported RSA-PSS hash name", { cause: e11 });
              }
            case "RSASSA-PKCS1-v1_5":
              return ab(e11), e11.algorithm.name;
            case "ML-DSA-44":
            case "ML-DSA-65":
            case "ML-DSA-87":
            case "Ed25519":
              return e11.algorithm.name;
          }
          throw new on("unsupported CryptoKey algorithm name", { cause: e11 });
        })(r10), r10, ot(n10)));
        return `${n10}.${i10}`;
      }
      const ox = URL.parse ? (e10, t10) => URL.parse(e10, t10) : (e10, t10) => {
        try {
          return new URL(e10, t10);
        } catch {
          return null;
        }
      };
      function oR(e10, t10) {
        if (t10 && "https:" !== e10.protocol) throw oo("only requests to HTTPS are allowed", ad, e10);
        if ("https:" !== e10.protocol && "http:" !== e10.protocol) throw oo("only HTTP and HTTPS requests are allowed", ap, e10);
      }
      function oA(e10, t10, r10, n10) {
        let i10;
        if ("string" !== typeof e10 || !(i10 = ox(e10))) throw oo(`authorization server metadata does not contain a valid ${r10 ? `"as.mtls_endpoint_aliases.${t10}"` : `"as.${t10}"`}`, void 0 === e10 ? am : ag, { attribute: r10 ? `mtls_endpoint_aliases.${t10}` : t10 });
        return oR(i10, n10), i10;
      }
      function oT(e10, t10, r10, n10) {
        return r10 && e10.mtls_endpoint_aliases && t10 in e10.mtls_endpoint_aliases ? oA(e10.mtls_endpoint_aliases[t10], t10, r10, n10) : oA(e10[t10], t10, r10, n10);
      }
      class oC extends Error {
        cause;
        code;
        error;
        status;
        error_description;
        response;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = an, this.cause = t10.cause, this.error = t10.cause.error, this.status = t10.response.status, this.error_description = t10.cause.error_description, Object.defineProperty(this, "response", { enumerable: false, value: t10.response }), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class oP extends Error {
        cause;
        code;
        error;
        error_description;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = ao, this.cause = t10.cause, this.error = t10.cause.get("error"), this.error_description = t10.cause.get("error_description") ?? void 0, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class oO extends Error {
        cause;
        code;
        response;
        status;
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, this.code = ar, this.cause = t10.cause, this.status = t10.response.status, this.response = t10.response, Object.defineProperty(this, "response", { enumerable: false }), Error.captureStackTrace?.(this, this.constructor);
        }
      }
      const oU = "[a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+";
      const oI = RegExp(`^[,\\s]*(${oU})`);
      const oN = RegExp(`^[,\\s]*(${oU})\\s*=\\s*"((?:[^"\\\\]|\\\\[\\s\\S])*)"[,\\s]*(.*)`);
      const o$ = RegExp(`^[,\\s]*(${oU})\\s*=\\s*(${oU})[,\\s]*(.*)`);
      const oD = /^([a-zA-Z0-9\-\._\~\+\\/]+={0,2})(?:$|[,\s])(.*)/;
      async function oj(e10) {
        if (e10.status > 399 && e10.status < 500) {
          aw(e10), oy(e10);
          try {
            const t10 = await e10.clone().json();
            if (oa(t10) && "string" === typeof t10.error && t10.error.length) return t10;
          } catch {
          }
        }
      }
      async function oH(e10, t10, r10) {
        if (e10.status !== t10) {
          let t11;
          if (oY(e10), t11 = await oj(e10)) throw await e10.body?.cancel(), new oC("server responded with an error in the response body", { cause: t11, response: e10 });
          throw oo(`"response" is not a conform ${r10} response (unexpected HTTP status code)`, au, e10);
        }
      }
      function oL(e10) {
        if (!o2.has(e10)) throw i2('"options.DPoP" is not a valid DPoPHandle', i0);
      }
      async function oM(e10, t10, r10, n10, i10, o10) {
        if (oh(e10, '"accessToken"'), !(r10 instanceof URL)) throw i2('"url" must be an instance of URL', i1);
        oR(r10, o10?.[i3] !== true), n10 = os(n10), o10?.DPoP && (oL(o10.DPoP), await o10.DPoP.addProof(r10, n10, t10.toUpperCase(), e10)), n10.set("authorization", `${n10.has("dpop") ? "DPoP" : "Bearer"} ${e10}`);
        const a10 = await (o10?.[i8] || fetch)(r10.href, { body: i10, headers: Object.fromEntries(n10.entries()), method: t10, redirect: "manual", signal: oc(r10, o10?.signal) });
        return o10?.DPoP?.cacheNonce(a10, r10), a10;
      }
      async function oW(e10, t10, r10, n10) {
        o_(e10), oE(t10);
        const i10 = oT(e10, "userinfo_endpoint", t10.use_mtls_endpoint_aliases, n10?.[i3] !== true);
        const o10 = os(n10?.headers);
        return t10.userinfo_signed_response_alg ? o10.set("accept", "application/jwt") : (o10.set("accept", "application/json"), o10.append("accept", "application/jwt")), oM(r10, "GET", i10, o10, null, { ...n10, [i6]: ow(t10) });
      }
      const oK = Symbol();
      function oq(e10) {
        return e10.headers.get("content-type")?.split(";")[0];
      }
      async function oB(e10, t10, r10, n10, i10) {
        let o10;
        if (o_(e10), oE(t10), !iZ(n10, Response)) throw i2('"response" must be an instance of Response', i1);
        if (oY(n10), 200 !== n10.status) throw oo('"response" is not a conform UserInfo Endpoint response (unexpected HTTP status code)', au, n10);
        if (aw(n10), "application/jwt" === oq(n10)) {
          const { claims: r11, jwt: a10 } = await av(await n10.text(), a_.bind(void 0, t10.userinfo_signed_response_alg, e10.userinfo_signing_alg_values_supported, void 0), ow(t10), ob(t10), i10?.[i9]).then(oQ.bind(void 0, t10.client_id)).then(o0.bind(void 0, e10));
          oV.set(n10, a10), o10 = r11;
        } else {
          if (t10.userinfo_signed_response_alg) throw oo("JWT UserInfo Response expected", aa, n10);
          o10 = await ax(n10);
        }
        if (oh(o10.sub, '"response" body "sub" property', ac, { body: o10 }), r10 === oK) ;
        else if (oh(r10, '"expectedSubject"'), o10.sub !== r10) throw oo('unexpected "response" body "sub" property value', ay, { expected: r10, body: o10, attribute: "sub" });
        return o10;
      }
      async function oJ(e10, t10, r10, n10, i10, o10, a10) {
        return await r10(e10, t10, i10, o10), o10.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), (a10?.[i8] || fetch)(n10.href, { body: i10, headers: Object.fromEntries(o10.entries()), method: "POST", redirect: "manual", signal: oc(n10, a10?.signal) });
      }
      async function oz(e10, t10, r10, n10, i10, o10) {
        const a10 = oT(e10, "token_endpoint", t10.use_mtls_endpoint_aliases, o10?.[i3] !== true);
        i10.set("grant_type", n10);
        const s2 = os(o10?.headers);
        s2.set("accept", "application/json"), o10?.DPoP !== void 0 && (oL(o10.DPoP), await o10.DPoP.addProof(a10, s2, "POST"));
        const c2 = await oJ(e10, t10, r10, a10, i10, s2, o10);
        return o10?.DPoP?.cacheNonce(c2, a10), c2;
      }
      const oF = /* @__PURE__ */ new WeakMap();
      const oV = /* @__PURE__ */ new WeakMap();
      function oX(e10) {
        if (!e10.id_token) return;
        const t10 = oF.get(e10);
        if (!t10) throw i2('"ref" was already garbage collected or did not resolve from the proper sources', i0);
        return t10;
      }
      async function oG(e10, t10, r10, n10, i10, o10) {
        if (o_(e10), oE(t10), !iZ(r10, Response)) throw i2('"response" must be an instance of Response', i1);
        await oH(r10, 200, "Token Endpoint"), aw(r10);
        const a10 = await ax(r10);
        if (oh(a10.access_token, '"response" body "access_token" property', ac, { body: a10 }), oh(a10.token_type, '"response" body "token_type" property', ac, { body: a10 }), a10.token_type = a10.token_type.toLowerCase(), void 0 !== a10.expires_in) {
          const e11 = "number" !== typeof a10.expires_in ? Number.parseFloat(a10.expires_in) : a10.expires_in;
          op(e11, true, '"response" body "expires_in" property', ac, { body: a10 }), a10.expires_in = e11;
        }
        if (void 0 !== a10.refresh_token && oh(a10.refresh_token, '"response" body "refresh_token" property', ac, { body: a10 }), void 0 !== a10.scope && "string" !== typeof a10.scope) throw oo('"response" body "scope" property must be a string', ac, { body: a10 });
        if (void 0 !== a10.id_token) {
          oh(a10.id_token, '"response" body "id_token" property', ac, { body: a10 });
          const o11 = ["aud", "exp", "iat", "iss", "sub"];
          true === t10.require_auth_time && o11.push("auth_time"), void 0 !== t10.default_max_age && (op(t10.default_max_age, true, '"client.default_max_age"'), o11.push("auth_time")), n10?.length && o11.push(...n10);
          const { claims: s2, jwt: c2 } = await av(a10.id_token, a_.bind(void 0, t10.id_token_signed_response_alg, e10.id_token_signing_alg_values_supported, "RS256"), ow(t10), ob(t10), i10).then(o8.bind(void 0, o11)).then(o1.bind(void 0, e10)).then(oZ.bind(void 0, t10.client_id));
          if (Array.isArray(s2.aud) && 1 !== s2.aud.length) {
            if (void 0 === s2.azp) throw oo('ID Token "aud" (audience) claim includes additional untrusted audiences', af, { claims: s2, claim: "aud" });
            if (s2.azp !== t10.client_id) throw oo('unexpected ID Token "azp" (authorized party) claim value', af, { expected: t10.client_id, claims: s2, claim: "azp" });
          }
          void 0 !== s2.auth_time && op(s2.auth_time, true, 'ID Token "auth_time" (authentication time)', ac, { claims: s2 }), oV.set(r10, c2), oF.set(a10, s2);
        }
        if (o10?.[a10.token_type] !== void 0) o10[a10.token_type](r10, a10);
        else if ("dpop" !== a10.token_type && "bearer" !== a10.token_type) throw new on("unsupported `token_type` value", { cause: { body: a10 } });
        return a10;
      }
      function oY(e10) {
        let t10;
        if (t10 = ((e11) => {
          if (!iZ(e11, Response)) throw i2('"response" must be an instance of Response', i1);
          const t11 = e11.headers.get("www-authenticate");
          if (null === t11) return;
          const r10 = [];
          let n10 = t11;
          while (n10) {
            let e12;
            let t12 = n10.match(oI);
            const i10 = t12?.["1"].toLowerCase();
            if (!i10) return;
            const o10 = n10.substring(t12[0].length);
            if (o10 && !o10.match(/^[\s,]/)) return;
            const a10 = o10.match(/^\s+(.*)$/);
            const s2 = !!a10;
            n10 = a10 ? a10[1] : void 0;
            const c2 = {};
            if (s2) while (n10) {
              let r11;
              let i11;
              if (t12 = n10.match(oN)) {
                if ([, r11, i11, n10] = t12, i11.includes("\\")) try {
                  i11 = JSON.parse(`"${i11}"`);
                } catch {
                }
                c2[r11.toLowerCase()] = i11;
                continue;
              }
              if (t12 = n10.match(o$)) {
                [, r11, i11, n10] = t12, c2[r11.toLowerCase()] = i11;
                continue;
              }
              if (t12 = n10.match(oD)) {
                if (Object.keys(c2).length) break;
                [, e12, n10] = t12;
                break;
              }
              return;
            }
            else n10 = o10 || void 0;
            const l2 = { scheme: i10, parameters: c2 };
            e12 && (l2.token68 = e12), r10.push(l2);
          }
          if (r10.length) return r10;
        })(e10)) throw new oO("server responded with a challenge in the WWW-Authenticate HTTP Header", { cause: t10, response: e10 });
      }
      function oQ(e10, t10) {
        return void 0 !== t10.claims.aud ? oZ(e10, t10) : t10;
      }
      function oZ(e10, t10) {
        if (Array.isArray(t10.claims.aud)) {
          if (!t10.claims.aud.includes(e10)) throw oo('unexpected JWT "aud" (audience) claim value', af, { expected: e10, claims: t10.claims, claim: "aud" });
        } else if (t10.claims.aud !== e10) throw oo('unexpected JWT "aud" (audience) claim value', af, { expected: e10, claims: t10.claims, claim: "aud" });
        return t10;
      }
      function o0(e10, t10) {
        return void 0 !== t10.claims.iss ? o1(e10, t10) : t10;
      }
      function o1(e10, t10) {
        const r10 = e10[aA]?.(t10) ?? e10.issuer;
        if (t10.claims.iss !== r10) throw oo('unexpected JWT "iss" (issuer) claim value', af, { expected: r10, claims: t10.claims, claim: "iss" });
        return t10;
      }
      const o2 = /* @__PURE__ */ new WeakSet();
      const o3 = Symbol();
      async function o6(e10, t10, r10, n10, i10, o10, a10) {
        if (o_(e10), oE(t10), !o2.has(n10)) throw i2('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()', i0);
        oh(i10, '"redirectUri"');
        const s2 = aE(n10, "code");
        if (!s2) throw oo('no authorization code in "callbackParameters"', ac);
        const c2 = new URLSearchParams(a10?.additionalParameters);
        return c2.set("redirect_uri", i10), c2.set("code", s2), o10 !== o3 && (oh(o10, '"codeVerifier"'), c2.set("code_verifier", o10)), oz(e10, t10, r10, "authorization_code", c2, a10);
      }
      const o5 = { aud: "audience", c_hash: "code hash", client_id: "client id", exp: "expiration time", iat: "issued at", iss: "issuer", jti: "jwt id", nonce: "nonce", s_hash: "state hash", sub: "subject", ath: "access token hash", htm: "http method", htu: "http uri", cnf: "confirmation", auth_time: "authentication time" };
      function o8(e10, t10) {
        for (const r10 of e10) if (void 0 === t10.claims[r10]) throw oo(`JWT "${r10}" (${o5[r10]}) claim missing`, ac, { claims: t10.claims });
        return t10;
      }
      const o4 = Symbol();
      const o9 = Symbol();
      async function o7(e10, t10, r10, n10) {
        return "string" === typeof n10?.expectedNonce || "number" === typeof n10?.maxAge || n10?.requireIdToken ? ae(e10, t10, r10, n10.expectedNonce, n10.maxAge, n10[i9], n10.recognizedTokenTypes) : at(e10, t10, r10, n10?.[i9], n10?.recognizedTokenTypes);
      }
      async function ae(e10, t10, r10, n10, i10, o10, a10) {
        const s2 = [];
        switch (n10) {
          case void 0:
            n10 = o4;
            break;
          case o4:
            break;
          default:
            oh(n10, '"expectedNonce" argument'), s2.push("nonce");
        }
        switch (i10 ??= t10.default_max_age) {
          case void 0:
            i10 = o9;
            break;
          case o9:
            break;
          default:
            op(i10, true, '"maxAge" argument'), s2.push("auth_time");
        }
        const c2 = await oG(e10, t10, r10, s2, o10, a10);
        oh(c2.id_token, '"response" body "id_token" property', ac, { body: c2 });
        const l2 = oX(c2);
        if (i10 !== o9) {
          const e11 = ov() + ow(t10);
          const r11 = ob(t10);
          if (l2.auth_time + i10 < e11 - r11) throw oo("too much time has elapsed since the last End-User authentication", ah, { claims: l2, now: e11, tolerance: r11, claim: "auth_time" });
        }
        if (n10 === o4) {
          if (void 0 !== l2.nonce) throw oo('unexpected ID Token "nonce" claim value', af, { expected: void 0, claims: l2, claim: "nonce" });
        } else if (l2.nonce !== n10) throw oo('unexpected ID Token "nonce" claim value', af, { expected: n10, claims: l2, claim: "nonce" });
        return c2;
      }
      async function at(e10, t10, r10, n10, i10) {
        const o10 = await oG(e10, t10, r10, void 0, n10, i10);
        const a10 = oX(o10);
        if (a10) {
          if (void 0 !== t10.default_max_age) {
            op(t10.default_max_age, true, '"client.default_max_age"');
            const e11 = ov() + ow(t10);
            const r11 = ob(t10);
            if (a10.auth_time + t10.default_max_age < e11 - r11) throw oo("too much time has elapsed since the last End-User authentication", ah, { claims: a10, now: e11, tolerance: r11, claim: "auth_time" });
          }
          if (void 0 !== a10.nonce) throw oo('unexpected ID Token "nonce" claim value', af, { expected: void 0, claims: a10, claim: "nonce" });
        }
        return o10;
      }
      const ar = "OAUTH_WWW_AUTHENTICATE_CHALLENGE";
      const an = "OAUTH_RESPONSE_BODY_ERROR";
      const ai = "OAUTH_UNSUPPORTED_OPERATION";
      const ao = "OAUTH_AUTHORIZATION_RESPONSE_ERROR";
      const aa = "OAUTH_JWT_USERINFO_EXPECTED";
      const as = "OAUTH_PARSE_ERROR";
      const ac = "OAUTH_INVALID_RESPONSE";
      const al = "OAUTH_RESPONSE_IS_NOT_JSON";
      const au = "OAUTH_RESPONSE_IS_NOT_CONFORM";
      const ad = "OAUTH_HTTP_REQUEST_FORBIDDEN";
      const ap = "OAUTH_REQUEST_PROTOCOL_FORBIDDEN";
      const ah = "OAUTH_JWT_TIMESTAMP_CHECK_FAILED";
      const af = "OAUTH_JWT_CLAIM_COMPARISON_FAILED";
      const ay = "OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED";
      const am = "OAUTH_MISSING_SERVER_METADATA";
      const ag = "OAUTH_INVALID_SERVER_METADATA";
      function aw(e10) {
        if (e10.bodyUsed) throw i2('"response" body has been used already', i0);
      }
      function ab(e10) {
        const { algorithm: t10 } = e10;
        if ("number" !== typeof t10.modulusLength || t10.modulusLength < 2048) throw new on(`unsupported ${t10.name} modulusLength`, { cause: e10 });
      }
      async function av(e10, t10, r10, n10, i10) {
        let o10;
        let a10;
        let { 0: s2, 1: c2, length: l2 } = e10.split(".");
        if (5 === l2) if (void 0 !== i10) e10 = await i10(e10), { 0: s2, 1: c2, length: l2 } = e10.split(".");
        else throw new on("JWE decryption is not configured", { cause: e10 });
        if (3 !== l2) throw oo("Invalid JWT", ac, e10);
        try {
          o10 = JSON.parse(ot(or(s2)));
        } catch (e11) {
          throw oo("failed to parse JWT Header body as base64url encoded JSON", as, e11);
        }
        if (!oa(o10)) throw oo("JWT Header must be a top level object", ac, e10);
        if (t10(o10), void 0 !== o10.crit) throw new on('no JWT "crit" header parameter extensions are supported', { cause: { header: o10 } });
        try {
          a10 = JSON.parse(ot(or(c2)));
        } catch (e11) {
          throw oo("failed to parse JWT Payload body as base64url encoded JSON", as, e11);
        }
        if (!oa(a10)) throw oo("JWT Payload must be a top level object", ac, e10);
        const u2 = ov() + r10;
        if (void 0 !== a10.exp) {
          if ("number" !== typeof a10.exp) throw oo('unexpected JWT "exp" (expiration time) claim type', ac, { claims: a10 });
          if (a10.exp <= u2 - n10) throw oo('unexpected JWT "exp" (expiration time) claim value, expiration is past current timestamp', ah, { claims: a10, now: u2, tolerance: n10, claim: "exp" });
        }
        if (void 0 !== a10.iat && "number" !== typeof a10.iat) throw oo('unexpected JWT "iat" (issued at) claim type', ac, { claims: a10 });
        if (void 0 !== a10.iss && "string" !== typeof a10.iss) throw oo('unexpected JWT "iss" (issuer) claim type', ac, { claims: a10 });
        if (void 0 !== a10.nbf) {
          if ("number" !== typeof a10.nbf) throw oo('unexpected JWT "nbf" (not before) claim type', ac, { claims: a10 });
          if (a10.nbf > u2 + n10) throw oo('unexpected JWT "nbf" (not before) claim value', ah, { claims: a10, now: u2, tolerance: n10, claim: "nbf" });
        }
        if (void 0 !== a10.aud && "string" !== typeof a10.aud && !Array.isArray(a10.aud)) throw oo('unexpected JWT "aud" (audience) claim type', ac, { claims: a10 });
        return { header: o10, claims: a10, jwt: e10 };
      }
      function a_(e10, t10, r10, n10) {
        if (void 0 !== e10) {
          if ("string" === typeof e10 ? n10.alg !== e10 : !e10.includes(n10.alg)) throw oo('unexpected JWT "alg" header parameter', ac, { header: n10, expected: e10, reason: "client configuration" });
          return;
        }
        if (Array.isArray(t10)) {
          if (!t10.includes(n10.alg)) throw oo('unexpected JWT "alg" header parameter', ac, { header: n10, expected: t10, reason: "authorization server metadata" });
          return;
        }
        if (void 0 !== r10) {
          if ("string" === typeof r10 ? n10.alg !== r10 : "function" === typeof r10 ? !r10(n10.alg) : !r10.includes(n10.alg)) throw oo('unexpected JWT "alg" header parameter', ac, { header: n10, expected: r10, reason: "default value" });
          return;
        }
        throw oo('missing client or server configuration to verify used JWT "alg" header parameter', void 0, { client: e10, issuer: t10, fallback: r10 });
      }
      function aE(e10, t10) {
        const { 0: r10, length: n10 } = e10.getAll(t10);
        if (n10 > 1) throw oo(`"${t10}" parameter must be provided only once`, ac);
        return r10;
      }
      const aS = Symbol();
      const ak = Symbol();
      async function ax(e10, t10 = oy) {
        let r10;
        try {
          r10 = await e10.json();
        } catch (r11) {
          throw t10(e10), oo('failed to parse "response" body as JSON', as, r11);
        }
        if (!oa(r10)) throw oo('"response" body must be a top level object', ac, { body: r10 });
        return r10;
      }
      const aR = Symbol();
      const aA = Symbol();
      async function aT(e10, t10, r10) {
        const { cookies: n10, logger: i10 } = r10;
        const o10 = n10[e10];
        const a10 = /* @__PURE__ */ new Date();
        a10.setTime(a10.getTime() + 9e5), i10.debug(`CREATE_${e10.toUpperCase()}`, { name: o10.name, payload: t10, COOKIE_TTL: 900, expires: a10 });
        const s2 = await nf({ ...r10.jwt, maxAge: 900, token: { value: t10 }, salt: o10.name });
        const c2 = { ...o10.options, expires: a10 };
        return { name: o10.name, value: s2, options: c2 };
      }
      async function aC(e10, t10, r10) {
        try {
          const { logger: n10, cookies: i10, jwt: o10 } = r10;
          if (n10.debug(`PARSE_${e10.toUpperCase()}`, { cookie: t10 }), !t10) throw new th(`${e10} cookie was missing`);
          const a10 = await ny({ ...o10, token: t10, salt: i10[e10].name });
          if (a10?.value) return a10.value;
          throw Error("Invalid cookie");
        } catch (t11) {
          throw new th(`${e10} value could not be parsed`, { cause: t11 });
        }
      }
      function aP(e10, t10, r10) {
        const { logger: n10, cookies: i10 } = t10;
        const o10 = i10[e10];
        n10.debug(`CLEAR_${e10.toUpperCase()}`, { cookie: o10 }), r10.push({ name: o10.name, value: "", options: { ...i10[e10].options, maxAge: 0 } });
      }
      function aO(e10, t10) {
        return async (r10, n10, i10) => {
          const { provider: o10, logger: a10 } = i10;
          if (!o10?.checks?.includes(e10)) return;
          const s2 = r10?.[i10.cookies[t10].name];
          a10.debug(`USE_${t10.toUpperCase()}`, { value: s2 });
          const c2 = await aC(t10, s2, i10);
          return aP(t10, i10, n10), c2;
        };
      }
      const aU = { async create(e10) {
        const t10 = om();
        const r10 = await og(t10);
        return { cookie: await aT("pkceCodeVerifier", t10, e10), value: r10 };
      }, use: aO("pkce", "pkceCodeVerifier") };
      const aI = "encodedState";
      const aN = { async create(e10, t10) {
        const { provider: r10 } = e10;
        if (!r10.checks.includes("state")) {
          if (t10) throw new th("State data was provided but the provider is not configured to use state");
          return;
        }
        const n10 = { origin: t10, random: om() };
        const i10 = await nf({ secret: e10.jwt.secret, token: n10, salt: aI, maxAge: 900 });
        return { cookie: await aT("state", i10, e10), value: i10 };
      }, use: aO("state", "state"), async decode(e10, t10) {
        try {
          t10.logger.debug("DECODE_STATE", { state: e10 });
          const r10 = await ny({ secret: t10.jwt.secret, token: e10, salt: aI });
          if (r10) return r10;
          throw Error("Invalid state");
        } catch (e11) {
          throw new th("State could not be decoded", { cause: e11 });
        }
      } };
      const a$ = { async create(e10) {
        if (!e10.provider.checks.includes("nonce")) return;
        const t10 = om();
        return { cookie: await aT("nonce", t10, e10), value: t10 };
      }, use: aO("nonce", "nonce") };
      const aD = "encodedWebauthnChallenge";
      const aj = { create: async (e10, t10, r10) => ({ cookie: await aT("webauthnChallenge", await nf({ secret: e10.jwt.secret, token: { challenge: t10, registerData: r10 }, salt: aD, maxAge: 900 }), e10) }), async use(e10, t10, r10) {
        const n10 = t10?.[e10.cookies.webauthnChallenge.name];
        const i10 = await aC("webauthnChallenge", n10, e10);
        const o10 = await ny({ secret: e10.jwt.secret, token: i10, salt: aD });
        if (aP("webauthnChallenge", e10, r10), !o10) throw new th("WebAuthn challenge was missing");
        return o10;
      } };
      function aH(e10) {
        return encodeURIComponent(e10).replace(/%20/g, "+");
      }
      async function aL(e10, t10, r10) {
        let n10;
        let i10;
        let o10;
        let a10;
        let s2;
        let c2;
        let l2;
        const { logger: u2, provider: d2 } = r10;
        const { token: p2, userinfo: h2 } = d2;
        if (p2?.url && "authjs.dev" !== p2.url.host || h2?.url && "authjs.dev" !== h2.url.host) o10 = { issuer: d2.issuer ?? "https://authjs.dev", token_endpoint: p2?.url.toString(), userinfo_endpoint: h2?.url.toString() };
        else {
          const e11 = new URL(d2.issuer);
          const t11 = await od(e11, { [i3]: true, [i8]: d2[nN] });
          if (!(o10 = await of(e11, t11)).token_endpoint) throw TypeError("TODO: Authorization server did not provide a token endpoint.");
          if (!o10.userinfo_endpoint) throw TypeError("TODO: Authorization server did not provide a userinfo endpoint.");
        }
        const f2 = { client_id: d2.clientId, ...d2.client };
        switch (f2.token_endpoint_auth_method) {
          case void 0:
          case "client_secret_basic":
            a10 = (e11, t11, r11, n11) => {
              let i11;
              let o11;
              let a11;
              let s3;
              let c3;
              n11.set("authorization", (i11 = d2.clientId, o11 = d2.clientSecret, a11 = aH(i11), s3 = aH(o11), c3 = btoa(`${a11}:${s3}`), `Basic ${c3}`));
            };
            break;
          case "client_secret_post":
            oh(n10 = d2.clientSecret, '"clientSecret"'), a10 = (e11, t11, r11, i11) => {
              r11.set("client_id", t11.client_id), r11.set("client_secret", n10);
            };
            break;
          case "client_secret_jwt":
            oh(i10 = d2.clientSecret, '"clientSecret"'), l2 = void 0, a10 = async (e11, t11, r11, n11) => {
              c2 ||= await crypto.subtle.importKey("raw", ot(i10), { hash: "SHA-256", name: "HMAC" }, false, ["sign"]);
              const o11 = { alg: "HS256" };
              const a11 = oS(e11, t11);
              l2?.(o11, a11);
              const s3 = `${or(ot(JSON.stringify(o11)))}.${or(ot(JSON.stringify(a11)))}`;
              const u3 = await crypto.subtle.sign(c2.algorithm, c2, ot(s3));
              r11.set("client_id", t11.client_id), r11.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), r11.set("client_assertion", `${s3}.${or(new Uint8Array(u3))}`);
            };
            break;
          case "private_key_jwt":
            a10 = ((e11, t11) => {
              const { key: r11, kid: n11 } = e11 instanceof CryptoKey ? { key: e11 } : e11?.key instanceof CryptoKey ? (void 0 !== e11.kid && oh(e11.kid, '"kid"'), { key: e11.key, kid: e11.kid }) : {};
              const i11 = '"clientPrivateKey.key"';
              if (!(r11 instanceof CryptoKey)) throw i2(`${i11} must be a CryptoKey`, i1);
              if ("private" !== r11.type) throw i2(`${i11} must be a private CryptoKey`, i0);
              return async (e12, i12, o11, a11) => {
                const s3 = { alg: ((e13) => {
                  switch (e13.algorithm.name) {
                    case "RSA-PSS":
                      switch (e13.algorithm.hash.name) {
                        case "SHA-256":
                          return "PS256";
                        case "SHA-384":
                          return "PS384";
                        case "SHA-512":
                          return "PS512";
                        default:
                          throw new on("unsupported RsaHashedKeyAlgorithm hash name", { cause: e13 });
                      }
                    case "RSASSA-PKCS1-v1_5":
                      switch (e13.algorithm.hash.name) {
                        case "SHA-256":
                          return "RS256";
                        case "SHA-384":
                          return "RS384";
                        case "SHA-512":
                          return "RS512";
                        default:
                          throw new on("unsupported RsaHashedKeyAlgorithm hash name", { cause: e13 });
                      }
                    case "ECDSA":
                      switch (e13.algorithm.namedCurve) {
                        case "P-256":
                          return "ES256";
                        case "P-384":
                          return "ES384";
                        case "P-521":
                          return "ES512";
                        default:
                          throw new on("unsupported EcKeyAlgorithm namedCurve", { cause: e13 });
                      }
                    case "Ed25519":
                    case "ML-DSA-44":
                    case "ML-DSA-65":
                    case "ML-DSA-87":
                      return e13.algorithm.name;
                    case "EdDSA":
                      return "Ed25519";
                    default:
                      throw new on("unsupported CryptoKey algorithm name", { cause: e13 });
                  }
                })(r11), kid: n11 };
                const c3 = oS(e12, i12);
                t11?.[i4]?.(s3, c3), o11.set("client_id", i12.client_id), o11.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), o11.set("client_assertion", await ok(s3, c3, r11));
              };
            })(d2.token.clientPrivateKey, { [i4](e11, t11) {
              t11.aud = [o10.issuer, o10.token_endpoint];
            } });
            break;
          case "none":
            a10 = (e11, t11, r11, n11) => {
              r11.set("client_id", t11.client_id);
            };
            break;
          default:
            throw Error("unsupported client authentication method");
        }
        const y2 = [];
        const m2 = await aN.use(t10, y2, r10);
        try {
          s2 = ((e11, t11, r11, n11) => {
            let i11;
            if (o_(e11), oE(t11), r11 instanceof URL && (r11 = r11.searchParams), !(r11 instanceof URLSearchParams)) throw i2('"parameters" must be an instance of URLSearchParams, or URL', i1);
            if (aE(r11, "response")) throw oo('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()', ac, { parameters: r11 });
            const o11 = aE(r11, "iss");
            const a11 = aE(r11, "state");
            if (!o11 && e11.authorization_response_iss_parameter_supported) throw oo('response parameter "iss" (issuer) missing', ac, { parameters: r11 });
            if (o11 && o11 !== e11.issuer) throw oo('unexpected "iss" (issuer) response parameter value', ac, { expected: e11.issuer, parameters: r11 });
            switch (n11) {
              case void 0:
              case ak:
                if (void 0 !== a11) throw oo('unexpected "state" response parameter encountered', ac, { expected: void 0, parameters: r11 });
                break;
              case aS:
                break;
              default:
                if (oh(n11, '"expectedState" argument'), a11 !== n11) throw oo(void 0 === a11 ? 'response parameter "state" missing' : 'unexpected "state" response parameter value', ac, { expected: n11, parameters: r11 });
            }
            if (aE(r11, "error")) throw new oP("authorization response from the server is an error", { cause: r11 });
            const s3 = aE(r11, "id_token");
            const c3 = aE(r11, "token");
            if (void 0 !== s3 || void 0 !== c3) throw new on("implicit and hybrid flows are not supported");
            return i11 = new URLSearchParams(r11), o2.add(i11), i11;
          })(o10, f2, new URLSearchParams(e10), d2.checks.includes("state") ? m2 : aS);
        } catch (e11) {
          if (e11 instanceof oP) {
            const t11 = { providerId: d2.id, ...Object.fromEntries(e11.cause.entries()) };
            throw u2.debug("OAuthCallbackError", t11), new tv("OAuth Provider returned an error", t11);
          }
          throw e11;
        }
        const g2 = await aU.use(t10, y2, r10);
        let w2 = d2.callbackUrl;
        !r10.isOnRedirectProxy && d2.redirectProxyUrl && (w2 = d2.redirectProxyUrl);
        let b2 = await o6(o10, f2, a10, s2, w2, g2 ?? "decoy", { [i3]: true, [i8]: (...e11) => (d2.checks.includes("pkce") || e11[1].body.delete("code_verifier"), (d2[nN] ?? fetch)(...e11)) });
        d2.token?.conform && (b2 = await d2.token.conform(b2.clone()) ?? b2);
        let v2 = {};
        const _2 = "oidc" === d2.type;
        if (d2[n$]) switch (d2.id) {
          case "microsoft-entra-id":
          case "azure-ad": {
            const { tid: e11 } = ((e12) => {
              let t11;
              let r11;
              if ("string" !== typeof e12) throw new rn("JWTs must use Compact JWS serialization, JWT must be a string");
              const { 1: n11, length: i11 } = e12.split(".");
              if (5 === i11) throw new rn("Only JWTs using Compact JWS serialization can be decoded");
              if (3 !== i11) throw new rn("Invalid JWT");
              if (!n11) throw new rn("JWTs must contain a payload");
              try {
                t11 = t6(n11);
              } catch {
                throw new rn("Failed to base64url decode the payload");
              }
              try {
                r11 = JSON.parse(tG.decode(t11));
              } catch {
                throw new rn("Failed to parse the decoded payload as JSON");
              }
              if (!r$(r11)) throw new rn("Invalid JWT Claims Set");
              return r11;
            })((await b2.clone().json()).id_token);
            if ("string" === typeof e11) {
              const t11 = o10.issuer?.match(/microsoftonline\.com\/(\w+)\/v2\.0/)?.[1] ?? "common";
              const r11 = new URL(o10.issuer.replace(t11, e11));
              const n11 = await od(r11, { [i8]: d2[nN] });
              o10 = await of(r11, n11);
            }
          }
        }
        const E2 = await o7(o10, f2, b2, { expectedNonce: await a$.use(t10, y2, r10), requireIdToken: _2 });
        if (_2) {
          const t11 = oX(E2);
          if (v2 = t11, d2[n$] && "apple" === d2.id) try {
            v2.user = JSON.parse(e10?.user);
          } catch {
          }
          if (false === d2.idToken) {
            const e11 = await oW(o10, f2, E2.access_token, { [i8]: d2[nN], [i3]: true });
            v2 = await oB(o10, f2, t11.sub, e11);
          }
        } else if (h2?.request) {
          const e11 = await h2.request({ tokens: E2, provider: d2 });
          e11 instanceof Object && (v2 = e11);
        } else if (h2?.url) {
          const e11 = await oW(o10, f2, E2.access_token, { [i8]: d2[nN] });
          v2 = await e11.json();
        } else throw TypeError("No userinfo endpoint configured");
        return E2.expires_in && (E2.expires_at = Math.floor(Date.now() / 1e3) + Number(E2.expires_in)), { ...await aM(v2, d2, E2, u2), profile: v2, cookies: y2 };
      }
      async function aM(e10, t10, r10, n10) {
        try {
          const n11 = await t10.profile(e10, r10);
          return { user: { ...n11, id: crypto.randomUUID(), email: n11.email?.toLowerCase() }, account: { ...r10, provider: t10.id, type: t10.type, providerAccountId: n11.id ?? crypto.randomUUID() } };
        } catch (r11) {
          n10.debug("getProfile error details", e10), n10.error(new t_(r11, { provider: t10.id }));
        }
      }
      async function aW(e10, t10, r10, n10) {
        const i10 = await az(e10, t10, r10);
        const { cookie: o10 } = await aj.create(e10, i10.challenge, r10);
        return { status: 200, cookies: [...n10 ?? [], o10], body: { action: "register", options: i10 }, headers: { "Content-Type": "application/json" } };
      }
      async function aK(e10, t10, r10, n10) {
        const i10 = await aJ(e10, t10, r10);
        const { cookie: o10 } = await aj.create(e10, i10.challenge);
        return { status: 200, cookies: [...n10 ?? [], o10], body: { action: "authenticate", options: i10 }, headers: { "Content-Type": "application/json" } };
      }
      async function aq(e10, t10, r10) {
        let n10;
        const { adapter: i10, provider: o10 } = e10;
        const a10 = t10.body && "string" === typeof t10.body.data ? JSON.parse(t10.body.data) : void 0;
        if (!a10 || "object" !== typeof a10 || !("id" in a10) || "string" !== typeof a10.id) throw new tn("Invalid WebAuthn Authentication response");
        const s2 = aX(aV(a10.id));
        const c2 = await i10.getAuthenticator(s2);
        if (!c2) throw new tn(`WebAuthn authenticator not found in database: ${JSON.stringify({ credentialID: s2 })}`);
        const { challenge: l2 } = await aj.use(e10, t10.cookies, r10);
        try {
          let u2;
          const r11 = o10.getRelayingParty(e10, t10);
          n10 = await o10.simpleWebAuthn.verifyAuthenticationResponse({ ...o10.verifyAuthenticationOptions, expectedChallenge: l2, response: a10, authenticator: { ...u2 = c2, credentialDeviceType: u2.credentialDeviceType, transports: aG(u2.transports), credentialID: aV(u2.credentialID), credentialPublicKey: aV(u2.credentialPublicKey) }, expectedOrigin: r11.origin, expectedRPID: r11.id });
        } catch (e11) {
          throw new tI(e11);
        }
        const { verified: d2, authenticationInfo: p2 } = n10;
        if (!d2) throw new tI("WebAuthn authentication response could not be verified");
        try {
          const { newCounter: e11 } = p2;
          await i10.updateAuthenticatorCounter(c2.credentialID, e11);
        } catch (e11) {
          throw new to(`Failed to update authenticator counter. This may cause future authentication attempts to fail. ${JSON.stringify({ credentialID: s2, oldCounter: c2.counter, newCounter: p2.newCounter })}`, e11);
        }
        const h2 = await i10.getAccount(c2.providerAccountId, o10.id);
        if (!h2) throw new tn(`WebAuthn account not found in database: ${JSON.stringify({ credentialID: s2, providerAccountId: c2.providerAccountId })}`);
        const f2 = await i10.getUser(h2.userId);
        if (!f2) throw new tn(`WebAuthn user not found in database: ${JSON.stringify({ credentialID: s2, providerAccountId: c2.providerAccountId, userID: h2.userId })}`);
        return { account: h2, user: f2 };
      }
      async function aB(e10, t10, r10) {
        let n10;
        let i10;
        const { provider: o10 } = e10;
        const a10 = t10.body && "string" === typeof t10.body.data ? JSON.parse(t10.body.data) : void 0;
        if (!a10 || "object" !== typeof a10 || !("id" in a10) || "string" !== typeof a10.id) throw new tn("Invalid WebAuthn Registration response");
        const { challenge: s2, registerData: c2 } = await aj.use(e10, t10.cookies, r10);
        if (!c2) throw new tn("Missing user registration data in WebAuthn challenge cookie");
        try {
          const r11 = o10.getRelayingParty(e10, t10);
          i10 = await o10.simpleWebAuthn.verifyRegistrationResponse({ ...o10.verifyRegistrationOptions, expectedChallenge: s2, response: a10, expectedOrigin: r11.origin, expectedRPID: r11.id });
        } catch (e11) {
          throw new tI(e11);
        }
        if (!i10.verified || !i10.registrationInfo) throw new tI("WebAuthn registration response could not be verified");
        const l2 = { providerAccountId: aX(i10.registrationInfo.credentialID), provider: e10.provider.id, type: o10.type };
        const u2 = { providerAccountId: l2.providerAccountId, counter: i10.registrationInfo.counter, credentialID: aX(i10.registrationInfo.credentialID), credentialPublicKey: aX(i10.registrationInfo.credentialPublicKey), credentialBackedUp: i10.registrationInfo.credentialBackedUp, credentialDeviceType: i10.registrationInfo.credentialDeviceType, transports: (n10 = a10.response.transports, n10?.join(",")) };
        return { user: c2, account: l2, authenticator: u2 };
      }
      async function aJ(e10, t10, r10) {
        const { provider: n10, adapter: i10 } = e10;
        const o10 = r10?.id ? await i10.listAuthenticatorsByUserId(r10.id) : null;
        const a10 = n10.getRelayingParty(e10, t10);
        return await n10.simpleWebAuthn.generateAuthenticationOptions({ ...n10.authenticationOptions, rpID: a10.id, allowCredentials: o10?.map((e11) => ({ id: aV(e11.credentialID), type: "public-key", transports: aG(e11.transports) })) });
      }
      async function az(e10, t10, r10) {
        const { provider: n10, adapter: i10 } = e10;
        const o10 = r10.id ? await i10.listAuthenticatorsByUserId(r10.id) : null;
        const a10 = nA(32);
        const s2 = n10.getRelayingParty(e10, t10);
        return await n10.simpleWebAuthn.generateRegistrationOptions({ ...n10.registrationOptions, userID: a10, userName: r10.email, userDisplayName: r10.name ?? void 0, rpID: s2.id, rpName: s2.name, excludeCredentials: o10?.map((e11) => ({ id: aV(e11.credentialID), type: "public-key", transports: aG(e11.transports) })) });
      }
      function aF(e10) {
        const { provider: t10, adapter: r10 } = e10;
        if (!r10) throw new ty("An adapter is required for the WebAuthn provider");
        if (!t10 || "webauthn" !== t10.type) throw new tR("Provider must be WebAuthn");
        return { ...e10, provider: t10, adapter: r10 };
      }
      function aV(e10) {
        return new Uint8Array(eM.Buffer.from(e10, "base64"));
      }
      function aX(e10) {
        return eM.Buffer.from(e10).toString("base64");
      }
      function aG(e10) {
        return e10 ? e10.split(",") : void 0;
      }
      async function aY(e10, t10, r10, n10) {
        if (!t10.provider) throw new tR("Callback route called without provider");
        const { query: i10, body: o10, method: a10, headers: s2 } = e10;
        const { provider: c2, adapter: l2, url: u2, callbackUrl: d2, pages: p2, jwt: h2, events: f2, callbacks: y2, session: { strategy: m2, maxAge: g2 }, logger: w2 } = t10;
        const b2 = "jwt" === m2;
        try {
          if ("oauth" === c2.type || "oidc" === c2.type) {
            let a11;
            const s3 = c2.authorization?.url.searchParams.get("response_mode") === "form_post" ? o10 : i10;
            if (t10.isOnRedirectProxy && s3?.state) {
              const e11 = await aN.decode(s3.state, t10);
              if (e11?.origin && new URL(e11.origin).origin !== t10.url.origin) {
                const t11 = `${e11.origin}?${new URLSearchParams(s3)}`;
                return w2.debug("Proxy redirecting to", t11), { redirect: t11, cookies: n10 };
              }
            }
            const m3 = await aL(s3, e10.cookies, t10);
            m3.cookies.length && n10.push(...m3.cookies), w2.debug("authorization result", m3);
            const { user: v2, account: _2, profile: E2 } = m3;
            if (!v2 || !_2 || !E2) return { redirect: `${u2}/signin`, cookies: n10 };
            if (l2) {
              const { getUserByAccount: e11 } = l2;
              a11 = await e11({ providerAccountId: _2.providerAccountId, provider: c2.id });
            }
            const S2 = await aQ({ user: a11 ?? v2, account: _2, profile: E2 }, t10);
            if (S2) return { redirect: S2, cookies: n10 };
            const { user: k2, session: x2, isNewUser: R2 } = await iQ(r10.value, v2, _2, t10);
            if (b2) {
              const e11 = { name: k2.name, email: k2.email, picture: k2.image, sub: k2.id?.toString() };
              const i11 = await y2.jwt({ token: e11, user: k2, account: _2, profile: E2, isNewUser: R2, trigger: R2 ? "signUp" : "signIn" });
              if (null === i11) n10.push(...r10.clean());
              else {
                const e12 = t10.cookies.sessionToken.name;
                const o11 = await h2.encode({ ...h2, token: i11, salt: e12 });
                const a12 = /* @__PURE__ */ new Date();
                a12.setTime(a12.getTime() + 1e3 * g2);
                const s4 = r10.chunk(o11, { expires: a12 });
                n10.push(...s4);
              }
            } else n10.push({ name: t10.cookies.sessionToken.name, value: x2.sessionToken, options: { ...t10.cookies.sessionToken.options, expires: x2.expires } });
            if (await f2.signIn?.({ user: k2, account: _2, profile: E2, isNewUser: R2 }), R2 && p2.newUser) return { redirect: `${p2.newUser}${p2.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: d2 })}`, cookies: n10 };
            return { redirect: d2, cookies: n10 };
          }
          if ("email" === c2.type) {
            const e11 = i10?.token;
            const o11 = i10?.email;
            if (!e11) {
              const t11 = TypeError("Missing token. The sign-in URL was manually opened without token or the link was not sent correctly in the email.", { cause: { hasToken: !!e11 } });
              throw t11.name = "Configuration", t11;
            }
            const a11 = c2.secret ?? t10.secret;
            const s3 = await l2.useVerificationToken({ identifier: o11, token: await nR(`${e11}${a11}`) });
            const u3 = !!s3;
            const m3 = u3 && s3.expires.valueOf() < Date.now();
            if (!u3 || m3 || o11 && s3.identifier !== o11) throw new tT({ hasInvite: u3, expired: m3 });
            const { identifier: w3 } = s3;
            const v2 = await l2.getUserByEmail(w3) ?? { id: crypto.randomUUID(), email: w3, emailVerified: null };
            const _2 = { providerAccountId: v2.email, userId: v2.id, type: "email", provider: c2.id };
            const E2 = await aQ({ user: v2, account: _2 }, t10);
            if (E2) return { redirect: E2, cookies: n10 };
            const { user: S2, session: k2, isNewUser: x2 } = await iQ(r10.value, v2, _2, t10);
            if (b2) {
              const e12 = { name: S2.name, email: S2.email, picture: S2.image, sub: S2.id?.toString() };
              const i11 = await y2.jwt({ token: e12, user: S2, account: _2, isNewUser: x2, trigger: x2 ? "signUp" : "signIn" });
              if (null === i11) n10.push(...r10.clean());
              else {
                const e13 = t10.cookies.sessionToken.name;
                const o12 = await h2.encode({ ...h2, token: i11, salt: e13 });
                const a12 = /* @__PURE__ */ new Date();
                a12.setTime(a12.getTime() + 1e3 * g2);
                const s4 = r10.chunk(o12, { expires: a12 });
                n10.push(...s4);
              }
            } else n10.push({ name: t10.cookies.sessionToken.name, value: k2.sessionToken, options: { ...t10.cookies.sessionToken.options, expires: k2.expires } });
            if (await f2.signIn?.({ user: S2, account: _2, isNewUser: x2 }), x2 && p2.newUser) return { redirect: `${p2.newUser}${p2.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: d2 })}`, cookies: n10 };
            return { redirect: d2, cookies: n10 };
          }
          if ("credentials" === c2.type && "POST" === a10) {
            const e11 = o10 ?? {};
            Object.entries(i10 ?? {}).forEach(([e12, t11]) => u2.searchParams.set(e12, t11));
            const l3 = await c2.authorize(e11, new Request(u2, { headers: s2, method: a10, body: JSON.stringify(o10) }));
            if (l3) l3.id = l3.id?.toString() ?? crypto.randomUUID();
            else throw new td();
            const p3 = { providerAccountId: l3.id, type: "credentials", provider: c2.id };
            const m3 = await aQ({ user: l3, account: p3, credentials: e11 }, t10);
            if (m3) return { redirect: m3, cookies: n10 };
            const w3 = { name: l3.name, email: l3.email, picture: l3.image, sub: l3.id };
            const b3 = await y2.jwt({ token: w3, user: l3, account: p3, isNewUser: false, trigger: "signIn" });
            if (null === b3) n10.push(...r10.clean());
            else {
              const e12 = t10.cookies.sessionToken.name;
              const i11 = await h2.encode({ ...h2, token: b3, salt: e12 });
              const o11 = /* @__PURE__ */ new Date();
              o11.setTime(o11.getTime() + 1e3 * g2);
              const a11 = r10.chunk(i11, { expires: o11 });
              n10.push(...a11);
            }
            return await f2.signIn?.({ user: l3, account: p3 }), { redirect: d2, cookies: n10 };
          }if ("webauthn" === c2.type && "POST" === a10) {
            let i11;
            let o11;
            let a11;
            const s3 = e10.body?.action;
            if ("string" !== typeof s3 || "authenticate" !== s3 && "register" !== s3) throw new tn("Invalid action parameter");
            const c3 = aF(t10);
            switch (s3) {
              case "authenticate": {
                const t11 = await aq(c3, e10, n10);
                i11 = t11.user, o11 = t11.account;
                break;
              }
              case "register": {
                const r11 = await aB(t10, e10, n10);
                i11 = r11.user, o11 = r11.account, a11 = r11.authenticator;
              }
            }
            await aQ({ user: i11, account: o11 }, t10);
            const { user: l3, isNewUser: u3, session: m3, account: w3 } = await iQ(r10.value, i11, o11, t10);
            if (!w3) throw new tn("Error creating or finding account");
            if (a11 && l3.id && await c3.adapter.createAuthenticator({ ...a11, userId: l3.id }), b2) {
              const e11 = { name: l3.name, email: l3.email, picture: l3.image, sub: l3.id?.toString() };
              const i12 = await y2.jwt({ token: e11, user: l3, account: w3, isNewUser: u3, trigger: u3 ? "signUp" : "signIn" });
              if (null === i12) n10.push(...r10.clean());
              else {
                const e12 = t10.cookies.sessionToken.name;
                const o12 = await h2.encode({ ...h2, token: i12, salt: e12 });
                const a12 = /* @__PURE__ */ new Date();
                a12.setTime(a12.getTime() + 1e3 * g2);
                const s4 = r10.chunk(o12, { expires: a12 });
                n10.push(...s4);
              }
            } else n10.push({ name: t10.cookies.sessionToken.name, value: m3.sessionToken, options: { ...t10.cookies.sessionToken.options, expires: m3.expires } });
            if (await f2.signIn?.({ user: l3, account: w3, isNewUser: u3 }), u3 && p2.newUser) return { redirect: `${p2.newUser}${p2.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: d2 })}`, cookies: n10 };
            return { redirect: d2, cookies: n10 };
          }
          throw new tR(`Callback for provider type (${c2.type}) is not supported`);
        } catch (t11) {
          if (t11 instanceof tn) throw t11;
          const e11 = new ts(t11, { provider: c2.id });
          throw w2.debug("callback route error details", { method: a10, query: i10, body: o10 }), e11;
        }
      }
      async function aQ(e10, t10) {
        let r10;
        const { signIn: n10, redirect: i10 } = t10.callbacks;
        try {
          r10 = await n10(e10);
        } catch (e11) {
          if (e11 instanceof tn) throw e11;
          throw new ta(e11);
        }
        if (!r10) throw new ta("AccessDenied");
        if ("string" === typeof r10) return await i10({ url: r10, baseUrl: t10.url.origin });
      }
      async function aZ(e10, t10, r10, n10, i10) {
        const { adapter: o10, jwt: a10, events: s2, callbacks: c2, logger: l2, session: { strategy: u2, maxAge: d2 } } = e10;
        const p2 = { body: null, headers: { "Content-Type": "application/json" }, cookies: r10 };
        const h2 = t10.value;
        if (!h2) return p2;
        if ("jwt" === u2) {
          try {
            const r11 = e10.cookies.sessionToken.name;
            const o11 = await a10.decode({ ...a10, token: h2, salt: r11 });
            if (!o11) throw Error("Invalid JWT");
            const l3 = await c2.jwt({ token: o11, ...n10 && { trigger: "update" }, session: i10 });
            const u3 = iY(d2);
            if (null !== l3) {
              const e11 = { user: { name: l3.name, email: l3.email, image: l3.picture }, expires: u3.toISOString() };
              const n11 = await c2.session({ session: e11, token: l3 });
              p2.body = n11;
              const i11 = await a10.encode({ ...a10, token: l3, salt: r11 });
              const o12 = t10.chunk(i11, { expires: u3 });
              p2.cookies?.push(...o12), await s2.session?.({ session: n11, token: l3 });
            } else p2.cookies?.push(...t10.clean());
          } catch (e11) {
            l2.error(new tf(e11)), p2.cookies?.push(...t10.clean());
          }
          return p2;
        }
        try {
          const { getSessionAndUser: r11, deleteSession: a11, updateSession: l3 } = o10;
          let u3 = await r11(h2);
          if (u3 && u3.session.expires.valueOf() < Date.now() && (await a11(h2), u3 = null), u3) {
            const { user: t11, session: r12 } = u3;
            const o11 = e10.session.updateAge;
            const a12 = r12.expires.valueOf() - 1e3 * d2 + 1e3 * o11;
            const f2 = iY(d2);
            a12 <= Date.now() && await l3({ sessionToken: h2, expires: f2 });
            const y2 = await c2.session({ session: { ...r12, user: t11 }, user: t11, newSession: i10, ...n10 ? { trigger: "update" } : {} });
            p2.body = y2, p2.cookies?.push({ name: e10.cookies.sessionToken.name, value: h2, options: { ...e10.cookies.sessionToken.options, expires: f2 } }), await s2.session?.({ session: y2 });
          } else h2 && p2.cookies?.push(...t10.clean());
        } catch (e11) {
          l2.error(new tE(e11));
        }
        return p2;
      }
      async function a0(e10, t10) {
        let r10;
        let n10;
        const { logger: i10, provider: o10 } = t10;
        let a10 = o10.authorization?.url;
        if (!a10 || "authjs.dev" === a10.host) {
          const e11 = new URL(o10.issuer);
          const t11 = await od(e11, { [i8]: o10[nN], [i3]: true });
          const r11 = await of(e11, t11);
          if (!r11.authorization_endpoint) throw TypeError("Authorization server did not provide an authorization endpoint.");
          a10 = new URL(r11.authorization_endpoint);
        }
        const s2 = a10.searchParams;
        let c2 = o10.callbackUrl;
        !t10.isOnRedirectProxy && o10.redirectProxyUrl && (c2 = o10.redirectProxyUrl, n10 = o10.callbackUrl, i10.debug("using redirect proxy", { redirect_uri: c2, data: n10 }));
        const l2 = Object.assign({ response_type: "code", client_id: o10.clientId, redirect_uri: c2, ...o10.authorization?.params }, Object.fromEntries(o10.authorization?.url.searchParams ?? []), e10);
        for (const e11 in l2) s2.set(e11, l2[e11]);
        const u2 = [];
        o10.authorization?.url.searchParams.get("response_mode") === "form_post" && (t10.cookies.state.options.sameSite = "none", t10.cookies.state.options.secure = true, t10.cookies.nonce.options.sameSite = "none", t10.cookies.nonce.options.secure = true);
        const d2 = await aN.create(t10, n10);
        if (d2 && (s2.set("state", d2.value), u2.push(d2.cookie)), o10.checks?.includes("pkce")) if (r10 && !r10.code_challenge_methods_supported?.includes("S256")) "oidc" === o10.type && (o10.checks = ["nonce"]);
        else {
          const { value: e11, cookie: r11 } = await aU.create(t10);
          s2.set("code_challenge", e11), s2.set("code_challenge_method", "S256"), u2.push(r11);
        }
        const p2 = await a$.create(t10);
        return p2 && (s2.set("nonce", p2.value), u2.push(p2.cookie)), "oidc" !== o10.type || a10.searchParams.has("scope") || a10.searchParams.set("scope", "openid profile email"), i10.debug("authorization url is ready", { url: a10, cookies: u2, provider: o10 }), { redirect: a10.toString(), cookies: u2 };
      }
      async function a1(e10, t10) {
        let r10;
        const { body: n10 } = e10;
        const { provider: i10, callbacks: o10, adapter: a10 } = t10;
        const s2 = (i10.normalizeIdentifier ?? ((e11) => {
          if (!e11) throw Error("Missing email from request body.");
          let [t11, r11] = e11.toLowerCase().trim().split("@");
          return r11 = r11.split(",")[0], `${t11}@${r11}`;
        }))(n10?.email);
        const c2 = { id: crypto.randomUUID(), email: s2, emailVerified: null };
        const l2 = await a10.getUserByEmail(s2) ?? c2;
        const u2 = { providerAccountId: s2, userId: l2.id, type: "email", provider: i10.id };
        try {
          r10 = await o10.signIn({ user: l2, account: u2, email: { verificationRequest: true } });
        } catch (e11) {
          throw new ta(e11);
        }
        if (!r10) throw new ta("AccessDenied");
        if ("string" === typeof r10) return { redirect: await o10.redirect({ url: r10, baseUrl: t10.url.origin }) };
        const { callbackUrl: d2, theme: p2 } = t10;
        const h2 = await i10.generateVerificationToken?.() ?? nA(32);
        const f2 = new Date(Date.now() + (i10.maxAge ?? 86400) * 1e3);
        const y2 = i10.secret ?? t10.secret;
        const m2 = new URL(t10.basePath, t10.url.origin);
        const g2 = i10.sendVerificationRequest({ identifier: s2, token: h2, expires: f2, url: `${m2}/callback/${i10.id}?${new URLSearchParams({ callbackUrl: d2, token: h2, email: s2 })}`, provider: i10, theme: p2, request: new Request(e10.url, { headers: e10.headers, method: e10.method, body: "POST" === e10.method ? JSON.stringify(e10.body ?? {}) : void 0 }) });
        const w2 = a10.createVerificationToken?.({ identifier: s2, token: await nR(`${h2}${y2}`), expires: f2 });
        return await Promise.all([g2, w2]), { redirect: `${m2}/verify-request?${new URLSearchParams({ provider: i10.id, type: i10.type })}` };
      }
      async function a2(e10, t10, r10) {
        const n10 = `${r10.url.origin}${r10.basePath}/signin`;
        if (!r10.provider) return { redirect: n10, cookies: t10 };
        switch (r10.provider.type) {
          case "oauth":
          case "oidc": {
            const { redirect: n11, cookies: i10 } = await a0(e10.query, r10);
            return i10 && t10.push(...i10), { redirect: n11, cookies: t10 };
          }
          case "email":
            return { ...await a1(e10, r10), cookies: t10 };
          default:
            return { redirect: n10, cookies: t10 };
        }
      }
      async function a3(e10, t10, r10) {
        const { jwt: n10, events: i10, callbackUrl: o10, logger: a10, session: s2 } = r10;
        const c2 = t10.value;
        if (!c2) return { redirect: o10, cookies: e10 };
        try {
          if ("jwt" === s2.strategy) {
            const e11 = r10.cookies.sessionToken.name;
            const t11 = await n10.decode({ ...n10, token: c2, salt: e11 });
            await i10.signOut?.({ token: t11 });
          } else {
            const e11 = await r10.adapter?.deleteSession(c2);
            await i10.signOut?.({ session: e11 });
          }
        } catch (e11) {
          a10.error(new tS(e11));
        }
        return e10.push(...t10.clean()), { redirect: o10, cookies: e10 };
      }
      async function a6(e10, t10) {
        const { adapter: r10, jwt: n10, session: { strategy: i10 } } = e10;
        const o10 = t10.value;
        if (!o10) return null;
        if ("jwt" === i10) {
          const t11 = e10.cookies.sessionToken.name;
          const r11 = await n10.decode({ ...n10, token: o10, salt: t11 });
          if (r11?.sub) return { id: r11.sub, name: r11.name, email: r11.email, image: r11.picture };
        } else {
          const e11 = await r10?.getSessionAndUser(o10);
          if (e11) return e11.user;
        }
        return null;
      }
      async function a5(e10, t10, r10, n10) {
        const i10 = aF(t10);
        const { provider: o10 } = i10;
        const { action: a10 } = e10.query ?? {};
        if ("register" !== a10 && "authenticate" !== a10 && void 0 !== a10) return { status: 400, body: { error: "Invalid action" }, cookies: n10, headers: { "Content-Type": "application/json" } };
        const s2 = await a6(t10, r10);
        const c2 = s2 ? { user: s2, exists: true } : await o10.getUserInfo(t10, e10);
        const l2 = c2?.user;
        switch (((e11, t11, r11) => {
          const { user: n11, exists: i11 = false } = r11 ?? {};
          switch (e11) {
            case "authenticate":
              return "authenticate";
            case "register":
              if (n11 && t11 === i11) return "register";
              break;
            case void 0:
              if (!t11) if (!n11) return "authenticate";
              else if (i11) return "authenticate";
              else return "register";
          }
          return null;
        })(a10, !!s2, c2)) {
          case "authenticate":
            return aK(i10, e10, l2, n10);
          case "register":
            if ("string" === typeof l2?.email) return aW(i10, e10, l2, n10);
            break;
          default:
            return { status: 400, body: { error: "Invalid request" }, cookies: n10, headers: { "Content-Type": "application/json" } };
        }
      }
      async function a8(e10, t10) {
        const { action: r10, providerId: n10, error: i10, method: o10 } = e10;
        const a10 = t10.skipCSRFCheck === nU;
        const { options: s2, cookies: c2 } = await nW({ authOptions: t10, action: r10, providerId: n10, url: e10.url, callbackUrl: e10.body?.callbackUrl ?? e10.query?.callbackUrl, csrfToken: e10.body?.csrfToken, cookies: e10.cookies, isPost: "POST" === o10, csrfDisabled: a10 });
        const l2 = new tr(s2.cookies.sessionToken, e10.cookies, s2.logger);
        if ("GET" === o10) {
          const t11 = iG({ ...s2, query: e10.query, cookies: c2 });
          switch (r10) {
            case "callback":
              return await aY(e10, s2, l2, c2);
            case "csrf":
              return t11.csrf(a10, s2, c2);
            case "error":
              return t11.error(i10);
            case "providers":
              return t11.providers(s2.providers);
            case "session":
              return await aZ(s2, l2, c2);
            case "signin":
              return t11.signin(n10, i10);
            case "signout":
              return t11.signout();
            case "verify-request":
              return t11.verifyRequest();
            case "webauthn-options":
              return await a5(e10, s2, l2, c2);
          }
        }
          const { csrfTokenVerified: t11 } = s2;
          switch (r10) {
            case "callback":
              return "credentials" === s2.provider.type && nC(r10, t11), await aY(e10, s2, l2, c2);
            case "session":
              return nC(r10, t11), await aZ(s2, l2, c2, true, e10.body?.data);
            case "signin":
              return nC(r10, t11), await a2(e10, c2, s2);
            case "signout":
              return nC(r10, t11), await a3(c2, l2, s2);
          }
        throw new tk(`Cannot handle action: ${r10}`);
      }
      function a4(e10, t10, r10, n10, i10) {
        let o10;
        const a10 = i10?.basePath;
        const s2 = n10.AUTH_URL ?? n10.NEXTAUTH_URL;
        if (s2) o10 = new URL(s2), a10 && "/" !== a10 && "/" !== o10.pathname && (o10.pathname !== a10 && n_(i10).warn("env-url-basepath-mismatch"), o10.pathname = "/");
        else {
          const e11 = r10.get("x-forwarded-host") ?? r10.get("host");
          const n11 = r10.get("x-forwarded-proto") ?? t10 ?? "https";
          const i11 = n11.endsWith(":") ? n11 : `${n11}:`;
          o10 = new URL(`${i11}//${e11}`);
        }
        const c2 = o10.toString().replace(/\/$/, "");
        if (a10) {
          const t11 = a10?.replace(/(^\/|\/$)/g, "") ?? "";
          return new URL(`${c2}/${t11}/${e10}`);
        }
        return new URL(`${c2}/${e10}`);
      }
      async function a9(e10, t10) {
        const r10 = n_(t10);
        const n10 = await nk(e10, t10);
        if (!n10) return Response.json("Bad request.", { status: 400 });
        const i10 = ((e11, t11) => {
          const { url: r11 } = e11;
          const n11 = [];
          if (!tD && t11.debug && n11.push("debug-enabled"), !t11.trustHost) return new tA(`Host must be trusted. URL was: ${e11.url}`);
          if (!t11.secret?.length) return new tw("Please define a `secret`");
          const i11 = e11.query?.callbackUrl;
          if (i11 && !tj(i11, r11.origin)) return new tu(`Invalid callback URL. Received: ${i11}`);
          const { callbackUrl: o11 } = tt(t11.useSecureCookies ?? "https:" === r11.protocol);
          const a11 = e11.cookies?.[t11.cookies?.callbackUrl?.name ?? o11.name];
          if (a11 && !tj(a11, r11.origin)) return new tu(`Invalid callback URL. Received: ${a11}`);
          let s2 = false;
          for (const e12 of t11.providers) {
            const t12 = "function" === typeof e12 ? e12() : e12;
            if (("oauth" === t12.type || "oidc" === t12.type) && !(t12.issuer ?? t12.options?.issuer)) {
              let e13;
              const { authorization: r12, token: n12, userinfo: i12 } = t12;
              if ("string" === typeof r12 || r12?.url ? "string" === typeof n12 || n12?.url ? "string" === typeof i12 || i12?.url || (e13 = "userinfo") : e13 = "token" : e13 = "authorization", e13) return new tp(`Provider "${t12.id}" is missing both \`issuer\` and \`${e13}\` endpoint config. At least one of them is required`);
            }
            if ("credentials" === t12.type) tH = true;
            else if ("email" === t12.type) tL = true;
            else if ("webauthn" === t12.type) {
              let c2;
              if (tM = true, t12.simpleWebAuthnBrowserVersion && (c2 = t12.simpleWebAuthnBrowserVersion, !/^v\d+(?:\.\d+){0,2}$/.test(c2))) return new tn(`Invalid provider config for "${t12.id}": simpleWebAuthnBrowserVersion "${t12.simpleWebAuthnBrowserVersion}" must be a valid semver string.`);
              if (t12.enableConditionalUI) {
                if (s2) return new tO("Multiple webauthn providers have 'enableConditionalUI' set to True. Only one provider can have this option enabled at a time");
                if (s2 = true, !Object.values(t12.formFields).some((e13) => e13.autocomplete && e13.autocomplete.toString().indexOf("webauthn") > -1)) return new tU(`Provider "${t12.id}" has 'enableConditionalUI' set to True, but none of its formFields have 'webauthn' in their autocomplete param`);
              }
            }
          }
          if (tH) {
            const e12 = t11.session?.strategy === "database";
            const r12 = !t11.providers.some((e13) => "credentials" !== ("function" === typeof e13 ? e13() : e13).type);
            if (e12 && r12) return new tx("Signing in with credentials only supported if JWT strategy is enabled");
            if (t11.providers.some((e13) => {
              const t12 = "function" === typeof e13 ? e13() : e13;
              return "credentials" === t12.type && !t12.authorize;
            })) return new tg("Must define an authorize() handler to use credentials authentication provider");
          }
          const { adapter: l2, session: u2 } = t11;
          const d2 = [];
          if (tL || u2?.strategy === "database" || !u2?.strategy && l2) if (tL) {
            if (!l2) return new ty("Email login requires an adapter");
            d2.push(...tW);
          } else {
            if (!l2) return new ty("Database session requires an adapter");
            d2.push(...tK);
          }
          if (tM) {
            if (!t11.experimental?.enableWebAuthn) return new t$("WebAuthn is an experimental feature. To enable it, set `experimental.enableWebAuthn` to `true` in your config");
            if (n11.push("experimental-webauthn"), !l2) return new ty("WebAuthn requires an adapter");
            d2.push(...tq);
          }
          if (l2) {
            const e12 = d2.filter((e13) => !(e13 in l2));
            if (e12.length) return new tm(`Required adapter methods were missing: ${e12.join(", ")}`);
          }
          return tD || (tD = true), n11;
        })(n10, t10);
        if (Array.isArray(i10)) i10.forEach(r10.warn);
        else if (i10) {
          if (r10.error(i10), !(/* @__PURE__ */ new Set(["signin", "signout", "error", "verify-request"])).has(n10.action) || "GET" !== n10.method) return Response.json({ message: "There was a problem with the server configuration. Check the server logs for more information." }, { status: 500 });
          const { pages: e11, theme: o11 } = t10;
          const a11 = e11?.error && n10.url.searchParams.get("callbackUrl")?.startsWith(e11.error);
          if (!e11?.error || a11) return a11 && r10.error(new tc(`The error page ${e11?.error} should not require authentication`)), nx(iG({ theme: o11 }).error("Configuration"));
          const s2 = `${n10.url.origin}${e11.error}?error=Configuration`;
          return Response.redirect(s2);
        }
        const o10 = e10.headers?.has("X-Auth-Return-Redirect");
        const a10 = t10.raw === nI;
        try {
          const e11 = await a8(n10, t10);
          if (a10) return e11;
          const r11 = nx(e11);
          const i11 = r11.headers.get("Location");
          if (!o10 || !i11) return r11;
          return Response.json({ url: i11 }, { headers: r11.headers });
        } catch (d2) {
          r10.error(d2);
          const i11 = d2 instanceof tn;
          if (i11 && a10 && !o10) throw d2;
          if ("POST" === e10.method && "session" === n10.action) return Response.json(null, { status: 400 });
          const s2 = new URLSearchParams({ error: d2 instanceof tn && tP.has(d2.type) ? d2.type : "Configuration" });
          d2 instanceof td && s2.set("code", d2.code);
          const c2 = i11 && d2.kind || "error";
          const l2 = t10.pages?.[c2] ?? `${t10.basePath}/${c2.toLowerCase()}`;
          const u2 = `${n10.url.origin}${l2}?${s2}`;
          if (o10) return Response.json({ url: u2 });
          return Response.redirect(u2);
        }
      }
      e.i(794459), "undefined" === typeof URLPattern || URLPattern;
      const a7 = e.i(860097);
      const se = e.i(27362);
      const st = e.i(942137);
      function sr() {
        const e10 = eG.getStore();
        return (null == e10 ? void 0 : e10.rootTaskSpawnPhase) === "action";
      }
      function sn(e10) {
        const t10 = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
        if (!t10) return e10;
        const { origin: r10 } = new URL(t10);
        const { href: n10, origin: i10 } = e10.nextUrl;
        return new W(n10.replace(i10, r10), e10);
      }
      function si(e10) {
        try {
          e10.secret ?? (e10.secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET);
          const t10 = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
          if (!t10) return;
          const { pathname: r10 } = new URL(t10);
          if ("/" === r10) return;
          e10.basePath || (e10.basePath = r10);
        } catch {
        } finally {
          e10.basePath || (e10.basePath = "/api/auth"), ((e11, t10, r10 = false) => {
            try {
              const n10 = e11.AUTH_URL;
              n10 && (t10.basePath ? r10 || n_(t10).warn("env-url-basepath-redundant") : t10.basePath = new URL(n10).pathname);
            } catch {
            } finally {
              t10.basePath ?? (t10.basePath = "/auth");
            }
            if (!t10.secret?.length) {
              t10.secret = [];
              const r11 = e11.AUTH_SECRET;
              for (const n10 of (r11 && t10.secret.push(r11), [1, 2, 3])) {
                const r12 = e11[`AUTH_SECRET_${n10}`];
                r12 && t10.secret.unshift(r12);
              }
            }
            t10.redirectProxyUrl ?? (t10.redirectProxyUrl = e11.AUTH_REDIRECT_PROXY_URL), t10.trustHost ?? (t10.trustHost = !!(e11.AUTH_URL ?? e11.AUTH_TRUST_HOST ?? e11.VERCEL ?? e11.CF_PAGES ?? "production" !== e11.NODE_ENV)), t10.providers = t10.providers.map((t11) => {
              const { id: r11 } = "function" === typeof t11 ? t11({}) : t11;
              const n10 = r11.toUpperCase().replace(/-/g, "_");
              const i10 = e11[`AUTH_${n10}_ID`];
              const o10 = e11[`AUTH_${n10}_SECRET`];
              const a10 = e11[`AUTH_${n10}_ISSUER`];
              const s2 = e11[`AUTH_${n10}_KEY`];
              const c2 = "function" === typeof t11 ? t11({ clientId: i10, clientSecret: o10, issuer: a10, apiKey: s2 }) : t11;
              return "oauth" === c2.type || "oidc" === c2.type ? (c2.clientId ?? (c2.clientId = i10), c2.clientSecret ?? (c2.clientSecret = o10), c2.issuer ?? (c2.issuer = a10)) : "email" === c2.type && (c2.apiKey ?? (c2.apiKey = s2)), c2;
            });
          })(process.env, e10, true);
        }
      }
      e.i(837924), e.s([], 279242), e.i(279242);
      const so = e.i(690896);
      const sa = { current: null };
      const ss = "function" === typeof so.cache ? so.cache : (e10) => e10;
      const sc = console.warn;
      function sl(e10) {
        return (...t10) => {
          sc(e10(...t10));
        };
      }
      function su() {
        const e10 = "cookies";
        const t10 = Y.workAsyncStorage.getStore();
        const r10 = ej.workUnitAsyncStorage.getStore();
        if (t10) {
          if (r10 && "after" === r10.phase && !sr()) throw Object.defineProperty(Error(`Route ${t10.route} used \`cookies()\` inside \`after()\`. This is not supported. If you need this data inside an \`after()\` callback, use \`cookies()\` outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E843", enumerable: false, configurable: true });
          if (t10.forceStatic) return sp(Z.seal(new L.RequestCookies(new Headers({}))));
          if (t10.dynamicShouldError) throw Object.defineProperty(new se.StaticGenBailoutError(`Route ${t10.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E849", enumerable: false, configurable: true });
          if (r10) switch (r10.type) {
            case "cache": {
              const o10 = Object.defineProperty(Error(`Route ${t10.route} used \`cookies()\` inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`cookies()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E831", enumerable: false, configurable: true });
              throw Error.captureStackTrace(o10, su), t10.invalidDynamicUsageError ??= o10, o10;
            }
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${t10.route} used \`cookies()\` inside a function cached with \`unstable_cache()\`. Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`cookies()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E846", enumerable: false, configurable: true });
            case "prerender": {
              const n10 = t10;
              const i10 = r10;
              const a10 = sd.get(i10);
              if (a10) return a10;
              const s2 = (0, st.makeHangingPromise)(i10.renderSignal, n10.route, "`cookies()`");
              return sd.set(i10, s2), s2;
            }
            case "prerender-client": {
              const c2 = "`cookies`";
              throw Object.defineProperty(new eL.InvariantError(`${c2} must not be used within a Client Component. Next.js should be preventing ${c2} from being included in Client Components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E832", enumerable: false, configurable: true });
            }
            case "prerender-ppr":
              return (0, a7.postponeWithTracking)(t10.route, e10, r10.dynamicTracking);
            case "prerender-legacy":
              return (0, a7.throwToInterruptStaticGeneration)(e10, t10, r10);
            case "prerender-runtime":
              return (0, a7.delayUntilRuntimeStage)(r10, sp(r10.cookies));
            case "private-cache":
              return sp(r10.cookies);
            case "request":
              return (0, a7.trackDynamicDataInDynamicRender)(r10), sp(er(r10) ? r10.userspaceMutableCookies : r10.cookies);
          }
        }
        (0, eD.throwForMissingRequestStore)(e10);
      }
      ss((e10) => {
        try {
          sc(sa.current);
        } finally {
          sa.current = null;
        }
      });
      const sd = /* @__PURE__ */ new WeakMap();
      function sp(e10) {
        const t10 = sd.get(e10);
        if (t10) return t10;
        const r10 = Promise.resolve(e10);
        return sd.set(e10, r10), r10;
      }
      function sh() {
        const e10 = "headers";
        const t10 = Y.workAsyncStorage.getStore();
        const r10 = ej.workUnitAsyncStorage.getStore();
        if (t10) {
          if (r10 && "after" === r10.phase && !sr()) throw Object.defineProperty(Error(`Route ${t10.route} used \`headers()\` inside \`after()\`. This is not supported. If you need this data inside an \`after()\` callback, use \`headers()\` outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E839", enumerable: false, configurable: true });
          if (t10.forceStatic) return sy(G.seal(new Headers({})));
          if (r10) switch (r10.type) {
            case "cache": {
              const e11 = Object.defineProperty(Error(`Route ${t10.route} used \`headers()\` inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`headers()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E833", enumerable: false, configurable: true });
              throw Error.captureStackTrace(e11, sh), t10.invalidDynamicUsageError ??= e11, e11;
            }
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${t10.route} used \`headers()\` inside a function cached with \`unstable_cache()\`. Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`headers()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E838", enumerable: false, configurable: true });
          }
          if (t10.dynamicShouldError) throw Object.defineProperty(new se.StaticGenBailoutError(`Route ${t10.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E828", enumerable: false, configurable: true });
          if (r10) switch (r10.type) {
            case "prerender": {
              const n10 = t10;
              const i10 = r10;
              const o10 = sf.get(i10);
              if (o10) return o10;
              const a10 = (0, st.makeHangingPromise)(i10.renderSignal, n10.route, "`headers()`");
              return sf.set(i10, a10), a10;
            }
            case "prerender-client": {
              const s2 = "`headers`";
              throw Object.defineProperty(new eL.InvariantError(`${s2} must not be used within a client component. Next.js should be preventing ${s2} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E693", enumerable: false, configurable: true });
            }
            case "prerender-ppr":
              return (0, a7.postponeWithTracking)(t10.route, e10, r10.dynamicTracking);
            case "prerender-legacy":
              return (0, a7.throwToInterruptStaticGeneration)(e10, t10, r10);
            case "prerender-runtime":
              return (0, a7.delayUntilRuntimeStage)(r10, sy(r10.headers));
            case "private-cache":
              return sy(r10.headers);
            case "request":
              return (0, a7.trackDynamicDataInDynamicRender)(r10), sy(r10.headers);
          }
        }
        (0, eD.throwForMissingRequestStore)(e10);
      }
      sl((e10, t10) => {
        const r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Object.defineProperty(Error(`${r10}used ${t10}. \`cookies()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E830", enumerable: false, configurable: true });
      });
      const sf = /* @__PURE__ */ new WeakMap();
      function sy(e10) {
        const t10 = sf.get(e10);
        if (t10) return t10;
        const r10 = Promise.resolve(e10);
        return sf.set(e10, r10), r10;
      }
      async function sm(e10, t10) {
        return a9(new Request(a4("session", e10.get("x-forwarded-proto"), e10, process.env, t10), { headers: { cookie: e10.get("cookie") ?? "" } }), { ...t10, callbacks: { ...t10.callbacks, async session(...e11) {
          const r10 = await t10.callbacks?.session?.(...e11) ?? { ...e11[0].session, expires: e11[0].session.expires?.toISOString?.() ?? e11[0].session.expires };
          return { user: e11[0].user ?? e11[0].token, ...r10 };
        } } });
      }
      function sg(e10) {
        return "function" === typeof e10;
      }
      function sw(e10, t10) {
        return "function" === typeof e10 ? async (...r10) => {
          if (!r10.length) {
            const r11 = await sh();
            const n11 = await e10(void 0);
            return t10?.(n11), sm(r11, n11).then((e11) => e11.json());
          }
          if (r10[0] instanceof Request) {
            const n11 = r10[0];
            const i11 = r10[1];
            const o11 = await e10(n11);
            return t10?.(o11), sb([n11, i11], o11);
          }
          if (sg(r10[0])) {
            const n11 = r10[0];
            return async (...r11) => {
              const i11 = await e10(r11[0]);
              return t10?.(i11), sb(r11, i11, n11);
            };
          }
          const n10 = "req" in r10[0] ? r10[0].req : r10[0];
          const i10 = "res" in r10[0] ? r10[0].res : r10[1];
          const o10 = await e10(n10);
          return t10?.(o10), sm(new Headers(n10.headers), o10).then(async (e11) => {
            const t11 = await e11.json();
            for (const t12 of e11.headers.getSetCookie()) "headers" in i10 ? i10.headers.append("set-cookie", t12) : i10.appendHeader("set-cookie", t12);
            return t11;
          });
        } : (...t11) => {
          if (!t11.length) return Promise.resolve(sh()).then((t12) => sm(t12, e10).then((e11) => e11.json()));
          if (t11[0] instanceof Request) return sb([t11[0], t11[1]], e10);
          if (sg(t11[0])) {
            const r11 = t11[0];
            return async (...t12) => sb(t12, e10, r11).then((e11) => e11);
          }
          const r10 = "req" in t11[0] ? t11[0].req : t11[0];
          const n10 = "res" in t11[0] ? t11[0].res : t11[1];
          return sm(new Headers(r10.headers), e10).then(async (e11) => {
            const t12 = await e11.json();
            for (const t13 of e11.headers.getSetCookie()) "headers" in n10 ? n10.headers.append("set-cookie", t13) : n10.appendHeader("set-cookie", t13);
            return t12;
          });
        };
      }
      async function sb(e10, t10, r10) {
        const n10 = sn(e10[0]);
        const i10 = await sm(n10.headers, t10);
        const o10 = await i10.json();
        let a10 = true;
        t10.callbacks?.authorized && (a10 = await t10.callbacks.authorized({ request: n10, auth: o10 }));
        let s2 = z.next?.();
        if (a10 instanceof Response) {
          let c2;
          let l2;
          let u2;
          let e11;
          let r11;
          s2 = a10;
          const i11 = a10.headers.get("Location");
          const { pathname: o11 } = n10.nextUrl;
          i11 && (c2 = o11, l2 = new URL(i11).pathname, u2 = t10, e11 = l2.replace(`${c2}/`, ""), r11 = Object.values(u2.pages ?? {}), (sv.has(e11) || r11.includes(l2)) && l2 === c2) && (a10 = true);
        } else if (r10) n10.auth = o10, s2 = await r10(n10, e10[1]) ?? z.next();
        else if (!a10) {
          const e11 = t10.pages?.signIn ?? `${t10.basePath}/signin`;
          if (n10.nextUrl.pathname !== e11) {
            const t11 = n10.nextUrl.clone();
            t11.pathname = e11, t11.searchParams.set("callbackUrl", n10.nextUrl.href), s2 = z.redirect(t11);
          }
        }
        const d2 = new Response(s2?.body, s2);
        for (const e11 of i10.headers.getSetCookie()) d2.headers.append("set-cookie", e11);
        return d2;
      }
      sl((e10, t10) => {
        const r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Object.defineProperty(Error(`${r10}used ${t10}. \`headers()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E836", enumerable: false, configurable: true });
      }), e.i(844918), /* @__PURE__ */ new WeakMap(), sl((e10, t10) => {
        const r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Object.defineProperty(Error(`${r10}used ${t10}. \`draftMode()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E835", enumerable: false, configurable: true });
      });
      const sv = /* @__PURE__ */ new Set(["providers", "session", "csrf", "signin", "signout", "callback", "verify-request", "error"]);
      URLSearchParams;
      const s_ = e.i(604911);
      const sE = e.i(988901);
      const sS = e.r(792969).actionAsyncStorage;
      function sk(e10, t10) {
        throw ((e11, t11, r10 = s_.RedirectStatusCode.TemporaryRedirect) => {
          const n10 = Object.defineProperty(Error(sE.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          return n10.digest = `${sE.REDIRECT_ERROR_CODE};${t11};${e11};${r10};`, n10;
        })(e10, t10 ??= sS?.getStore()?.isAction ? sE.RedirectType.push : sE.RedirectType.replace, s_.RedirectStatusCode.TemporaryRedirect);
      }
      const sx = e.i(293112);
      function sR() {
        throw Object.defineProperty(Error("`unstable_isUnrecognizedActionError` can only be used on the client."), "__NEXT_ERROR_CODE", { value: "E776", enumerable: false, configurable: true });
      }
      async function sA(e10, t10, r10, n10) {
        const i10 = new Headers(await sh());
        const { redirect: o10 = true, redirectTo: a10, ...s2 } = t10 instanceof FormData ? Object.fromEntries(t10) : t10;
        const c2 = a10?.toString() ?? i10.get("Referer") ?? "/";
        const l2 = a4("signin", i10.get("x-forwarded-proto"), i10, process.env, n10);
        if (!e10) return l2.searchParams.append("callbackUrl", c2), o10 && sk(l2.toString()), l2.toString();
        let u2 = `${l2}/${e10}?${new URLSearchParams(r10)}`;
        let d2 = {};
        for (const t11 of n10.providers) {
          const { options: r11, ...n11 } = "function" === typeof t11 ? t11() : t11;
          const i11 = r11?.id ?? n11.id;
          if (i11 === e10) {
            d2 = { id: i11, type: r11?.type ?? n11.type };
            break;
          }
        }
        if (!d2.id) {
          const e11 = `${l2}?${new URLSearchParams({ callbackUrl: c2 })}`;
          return o10 && sk(e11), e11;
        }
        "credentials" === d2.type && (u2 = u2.replace("signin", "callback")), i10.set("Content-Type", "application/x-www-form-urlencoded");
        const p2 = new Request(u2, { method: "POST", headers: i10, body: new URLSearchParams({ ...s2, callbackUrl: c2 }) });
        const h2 = await a9(p2, { ...n10, raw: nI, skipCSRFCheck: nU });
        const f2 = await su();
        for (const e11 of h2?.cookies ?? []) f2.set(e11.name, e11.value, e11.options);
        const y2 = (h2 instanceof Response ? h2.headers.get("Location") : h2.redirect) ?? u2;
        return o10 ? sk(y2) : y2;
      }
      async function sT(e10, t10) {
        const r10 = new Headers(await sh());
        r10.set("Content-Type", "application/x-www-form-urlencoded");
        const n10 = a4("signout", r10.get("x-forwarded-proto"), r10, process.env, t10);
        const i10 = new URLSearchParams({ callbackUrl: e10?.redirectTo ?? r10.get("Referer") ?? "/" });
        const o10 = new Request(n10, { method: "POST", headers: r10, body: i10 });
        const a10 = await a9(o10, { ...t10, raw: nI, skipCSRFCheck: nU });
        const s2 = await su();
        for (const e11 of a10?.cookies ?? []) s2.set(e11.name, e11.value, e11.options);
        return e10?.redirect ?? true ? sk(a10.redirect) : a10;
      }
      async function sC(e10, t10) {
        const r10 = new Headers(await sh());
        r10.set("Content-Type", "application/json");
        const n10 = new Request(a4("session", r10.get("x-forwarded-proto"), r10, process.env, t10), { method: "POST", headers: r10, body: JSON.stringify({ data: e10 }) });
        const i10 = await a9(n10, { ...t10, raw: nI, skipCSRFCheck: nU });
        const o10 = await su();
        for (const e11 of i10?.cookies ?? []) o10.set(e11.name, e11.value, e11.options);
        return i10.body;
      }
      sx.HTTP_ERROR_FALLBACK_ERROR_CODE, sx.HTTP_ERROR_FALLBACK_ERROR_CODE, sx.HTTP_ERROR_FALLBACK_ERROR_CODE, e.r(673129).unstable_rethrow, e.s(["unstable_isUnrecognizedActionError", () => sR], 908781), e.i(908781);
      const sP = ((e10) => {
        if ("function" === typeof e10) {
          const t11 = async (t12) => {
            const r10 = await e10(t12);
            return si(r10), a9(sn(t12), r10);
          };
          return { handlers: { GET: t11, POST: t11 }, auth: sw(e10, (e11) => si(e11)), signIn: async (t12, r10, n10) => {
            const i10 = await e10(void 0);
            return si(i10), sA(t12, r10, n10, i10);
          }, signOut: async (t12) => {
            const r10 = await e10(void 0);
            return si(r10), sT(t12, r10);
          }, unstable_update: async (t12) => {
            const r10 = await e10(void 0);
            return si(r10), sC(t12, r10);
          } };
        }
        si(e10);
        const t10 = (t11) => a9(sn(t11), e10);
        return { handlers: { GET: t10, POST: t10 }, auth: sw(e10), signIn: (t11, r10, n10) => sA(t11, r10, n10, e10), signOut: (t11) => sT(t11, e10), unstable_update: (t11) => sC(t11, e10) };
      })({ pages: { signIn: "/login", newUser: "/" }, providers: [], callbacks: { authorized({ auth: e10, request: { nextUrl: t10 } }) {
        const r10 = !!e10?.user;
        const n10 = "/" === t10.pathname;
        const i10 = t10.pathname.startsWith("/blog");
        const o10 = t10.pathname.startsWith("/chat");
        const a10 = t10.pathname.startsWith("/register");
        const s2 = t10.pathname.startsWith("/login");
        return !!t10.pathname.startsWith("/api") || !!n10 || !!i10 || (r10 && (s2 || a10) ? Response.redirect(new URL("/chat", t10)) : !!a10 || !!s2 || (o10 ? !!r10 : !r10 || Response.redirect(new URL("/chat", t10))));
      } } }).auth;
      e.s(["config", 0, { matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.txt$|.*\\.pdf$|.*\\.xml$).*)"] }, "default", 0, sP], 13017);
      const sO = e.i(13017);
      e.i(128767);
      const sU = { ...sO };
      const sI = "/middleware";
      const sN = sU.middleware || sU.default;
      if ("function" !== typeof sN) throw new class extends Error {
        constructor(e10) {
          super(e10), this.stack = "";
        }
      }(`The Middleware file "${sI}" must export a function named \`middleware\` or a default function.`);
      function s$(e10) {
        return e9({ ...e10, page: sI, handler: async (...e11) => {
          try {
            return await sN(...e11);
          } catch (i10) {
            const t10 = e11[0];
            const r10 = new URL(t10.url);
            const n10 = r10.pathname + r10.search;
            throw await d(i10, { path: n10, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/proxy", routeType: "proxy", revalidateReason: void 0 }), i10;
          }
        } });
      }
      e.s(["default", () => s$], 57813);
    }]);
  }
});

// .next/server/edge/chunks/turbopack-apps_web_edge-wrapper_09c397a0.js
const require_turbopack_apps_web_edge_wrapper_09c397a0 = __commonJS({
  ".next/server/edge/chunks/turbopack-apps_web_edge-wrapper_09c397a0.js"() {
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/turbopack-apps_web_edge-wrapper_09c397a0.js", { otherChunks: ["chunks/[root-of-the-server]__68c7663c._.js", "chunks/[root-of-the-server]__438ceb6c._.js"], runtimeModuleIds: [223579] }]), (() => {
      let e;
      if (!Array.isArray(globalThis.TURBOPACK)) return;
      const t = /* @__PURE__ */ new WeakMap();
      function r(e2, t2) {
        this.m = e2, this.e = t2;
      }
      const n = r.prototype;
      const o = Object.prototype.hasOwnProperty;
      const u = "undefined" !== typeof Symbol && Symbol.toStringTag;
      function l(e2, t2, r2) {
        o.call(e2, t2) || Object.defineProperty(e2, t2, r2);
      }
      function i(e2, t2) {
        let r2 = e2[t2];
        return r2 || (r2 = a(t2), e2[t2] = r2), r2;
      }
      function a(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function s(e2, t2) {
        l(e2, "__esModule", { value: true }), u && l(e2, u, { value: "Module" });
        let r2 = 0;
        while (r2 < t2.length) {
          const n2 = t2[r2++];
          const o2 = t2[r2++];
          if ("number" === typeof o2) if (0 === o2) l(e2, n2, { value: t2[r2++], enumerable: true, writable: false });
          else throw Error(`unexpected tag: ${o2}`);
          else "function" === typeof t2[r2] ? l(e2, n2, { get: o2, set: t2[r2++], enumerable: true }) : l(e2, n2, { get: o2, enumerable: true });
        }
        Object.seal(e2);
      }
      n.s = function(e2, t2) {
        let r2;
        let n2;
        null != t2 ? n2 = (r2 = i(this.c, t2)).exports : (r2 = this.m, n2 = this.e), r2.namespaceObject = n2, s(n2, e2);
      }, n.j = function(e2, r2) {
        let n2;
        let u2;
        let l2;
        let a2;
        let s2;
        null != r2 ? a2 = (l2 = i(this.c, r2)).exports : (l2 = this.m, a2 = this.e);
        const c2 = (n2 = l2, u2 = a2, (s2 = t.get(n2)) || (t.set(n2, s2 = []), n2.exports = n2.namespaceObject = new Proxy(u2, { get(e3, t2) {
          if (o.call(e3, t2) || "default" === t2 || "__esModule" === t2) return Reflect.get(e3, t2);
          for (const e4 of s2) {
            const r3 = Reflect.get(e4, t2);
            if (void 0 !== r3) return r3;
          }
        }, ownKeys(e3) {
          const t2 = Reflect.ownKeys(e3);
          for (const e4 of s2) for (const r3 of Reflect.ownKeys(e4)) "default" === r3 || t2.includes(r3) || t2.push(r3);
          return t2;
        } })), s2);
        "object" === typeof e2 && null !== e2 && c2.push(e2);
      }, n.v = function(e2, t2) {
        (null != t2 ? i(this.c, t2) : this.m).exports = e2;
      }, n.n = function(e2, t2) {
        let r2;
        (r2 = null != t2 ? i(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
      };
      const c = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__;
      const f = [null, c({}), c([]), c(c)];
      function p(e2, t2, r2) {
        const n2 = [];
        let o2 = -1;
        for (let t3 = e2; ("object" === typeof t3 || "function" === typeof t3) && !f.includes(t3); t3 = c(t3)) for (const r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ ((e3, t4) => () => e3[t4])(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
        return r2 && o2 >= 0 || (o2 >= 0 ? n2.splice(o2, 1, 0, e2) : n2.push("default", 0, e2)), s(t2, n2), t2;
      }
      function d(e2) {
        return "function" === typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function h(e2) {
        const t2 = S(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        const r2 = t2.exports;
        return t2.namespaceObject = p(r2, d(r2), r2?.__esModule);
      }
      function m(e2) {
        return "string" === typeof e2 ? e2 : e2.path;
      }
      function b() {
        let e2;
        let t2;
        return { promise: new Promise((r2, n2) => {
          t2 = n2, e2 = r2;
        }), resolve: e2, reject: t2 };
      }
      n.i = h, n.A = function(e2) {
        return this.r(e2)(h.bind(this));
      }, n.t = "function" === typeof __require ? __require : (() => {
        throw Error("Unexpected use of runtime require");
      }), n.r = function(e2) {
        return S(e2, this.m).exports;
      }, n.f = (e2) => {
        function t2(t3) {
          if (o.call(e2, t3)) return e2[t3].module();
          const r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (o.call(e2, t3)) return e2[t3].id();
          const r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      const y = Symbol("turbopack queues");
      const O = Symbol("turbopack exports");
      const g = Symbol("turbopack error");
      function w(e2) {
        e2 && 1 !== e2.status && (e2.status = 1, e2.forEach((e3) => e3.queueCount--), e2.forEach((e3) => e3.queueCount-- ? e3.queueCount++ : e3()));
      }
      n.a = function(e2, t2) {
        const r2 = this.m;
        const n2 = t2 ? Object.assign([], { status: -1 }) : void 0;
        const o2 = /* @__PURE__ */ new Set();
        const { resolve: u2, reject: l2, promise: i2 } = b();
        const a2 = Object.assign(i2, { [O]: r2.exports, [y]: (e3) => {
          n2 && e3(n2), o2.forEach(e3), a2.catch(() => {
          });
        } });
        const s2 = { get: () => a2, set(e3) {
          e3 !== a2 && (a2[O] = e3);
        } };
        Object.defineProperty(r2, "exports", s2), Object.defineProperty(r2, "namespaceObject", s2), e2((e3) => {
          const t3 = e3.map((e4) => {
            if (null !== e4 && "object" === typeof e4) {
              if (y in e4) return e4;
              if (null != e4 && "object" === typeof e4 && "then" in e4 && "function" === typeof e4.then) {
                const t4 = Object.assign([], { status: 0 });
                const r4 = { [O]: {}, [y]: (e5) => e5(t4) };
                return e4.then((e5) => {
                  r4[O] = e5, w(t4);
                }, (e5) => {
                  r4[g] = e5, w(t4);
                }), r4;
              }
            }
            return { [O]: e4, [y]: () => {
            } };
          });
          const r3 = () => t3.map((e4) => {
            if (e4[g]) throw e4[g];
            return e4[O];
          });
          const { promise: u3, resolve: l3 } = b();
          const i3 = Object.assign(() => l3(r3), { queueCount: 0 });
          function a3(e4) {
            e4 !== n2 && !o2.has(e4) && (o2.add(e4), e4 && 0 === e4.status && (i3.queueCount++, e4.push(i3)));
          }
          return t3.map((e4) => e4[y](a3)), i3.queueCount ? u3 : r3();
        }, (e3) => {
          e3 ? l2(a2[g] = e3) : u2(a2[O]), w(n2);
        }), n2 && -1 === n2.status && (n2.status = 0);
      };
      const _ = function(e2) {
        const t2 = new URL(e2, "x:/");
        const r2 = {};
        for (const e3 in t2) r2[e3] = t2[e3];
        for (const t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
      };
      function j(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      _.prototype = URL.prototype, n.U = _, n.z = (e2) => {
        throw Error("dynamic usage of require is not supported");
      }, n.g = globalThis;
      const C = r.prototype;
      let k;
      const R = ((k = R || {})[k.Runtime = 0] = "Runtime", k[k.Parent = 1] = "Parent", k[k.Update = 2] = "Update", k);
      const U = /* @__PURE__ */ new Map();
      n.M = U;
      const v = /* @__PURE__ */ new Map();
      const P = /* @__PURE__ */ new Map();
      async function T(e2, t2, r2) {
        let n2;
        if ("string" === typeof r2) return M(e2, t2, x(r2));
        const o2 = r2.included || [];
        const u2 = o2.map((e3) => !!U.has(e3) || v.get(e3));
        if (u2.length > 0 && u2.every((e3) => e3)) return void await Promise.all(u2);
        const l2 = r2.moduleChunks || [];
        const i2 = l2.map((e3) => P.get(e3)).filter((e3) => e3);
        if (i2.length > 0) {
          if (i2.length === l2.length) return void await Promise.all(i2);
          const r3 = /* @__PURE__ */ new Set();
          for (const e3 of l2) P.has(e3) || r3.add(e3);
          for (const n3 of r3) {
            const r4 = M(e2, t2, x(n3));
            P.set(n3, r4), i2.push(r4);
          }
          n2 = Promise.all(i2);
        } else {
          for (const o3 of (n2 = M(e2, t2, x(r2.path)), l2)) P.has(o3) || P.set(o3, n2);
        }
        for (const e3 of o2) v.has(e3) || v.set(e3, n2);
        await n2;
      }
      C.l = function(e2) {
        return T(1, this.m.id, e2);
      };
      const $ = Promise.resolve(void 0);
      const E = /* @__PURE__ */ new WeakMap();
      function M(t2, r2, n2) {
        const o2 = e.loadChunkCached(t2, n2);
        let u2 = E.get(o2);
        if (void 0 === u2) {
          const e2 = E.set.bind(E, o2, $);
          u2 = o2.then(e2).catch((e3) => {
            let o3;
            switch (t2) {
              case 0:
                o3 = `as a runtime dependency of chunk ${r2}`;
                break;
              case 1:
                o3 = `from module ${r2}`;
                break;
              case 2:
                o3 = "from an HMR update";
                break;
              default:
                j(t2, (e4) => `Unknown source type: ${e4}`);
            }
            throw Error(`Failed to load chunk ${n2} ${o3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
          }), E.set(o2, u2);
        }
        return u2;
      }
      function x(e2) {
        return `${e2.split("/").map((e3) => encodeURIComponent(e3)).join("/")}`;
      }
      C.L = function(e2) {
        return M(1, this.m.id, e2);
      }, C.R = function(e2) {
        const t2 = this.r(e2);
        return t2?.default ?? t2;
      }, C.P = (e2) => `/ROOT/${e2 ?? ""}`, C.b = (e2) => {
        const t2 = new Blob([`self.TURBOPACK_WORKER_LOCATION = ${JSON.stringify(location.origin)};
self.TURBOPACK_NEXT_CHUNK_URLS = ${JSON.stringify(e2.reverse().map(x), null, 2)};
importScripts(...self.TURBOPACK_NEXT_CHUNK_URLS.map(c => self.TURBOPACK_WORKER_LOCATION + c).reverse());`], { type: "text/javascript" });
        return URL.createObjectURL(t2);
      };
      const A = /\.js(?:\?[^#]*)?(?:#.*)?$/;
      n.w = function(t2, r2, n2) {
        return e.loadWebAssembly(1, this.m.id, t2, r2, n2);
      }, n.u = function(t2, r2) {
        return e.loadWebAssemblyModule(1, this.m.id, t2, r2);
      };
      const K = {};
      n.c = K;
      const S = (e2, t2) => {
        const r2 = K[e2];
        if (r2) {
          if (r2.error) throw r2.error;
          return r2;
        }
        return N(e2, R.Parent, t2.id);
      };
      function N(e2, t2, n2) {
        const o2 = U.get(e2);
        if ("function" !== typeof o2) throw Error(((e3, t3, r2) => {
          let n3;
          switch (t3) {
            case 0:
              n3 = `as a runtime entry of chunk ${r2}`;
              break;
            case 1:
              n3 = `because it was required from module ${r2}`;
              break;
            case 2:
              n3 = "because of an HMR update";
              break;
            default:
              j(t3, (e4) => `Unknown source type: ${e4}`);
          }
          return `Module ${e3} was instantiated ${n3}, but the module factory is not available.`;
        })(e2, t2, n2));
        const u2 = a(e2);
        const l2 = u2.exports;
        K[e2] = u2;
        const i2 = new r(u2, l2);
        try {
          o2(i2, u2, l2);
        } catch (e3) {
          throw u2.error = e3, e3;
        }
        return u2.namespaceObject && u2.exports !== u2.namespaceObject && p(u2.exports, u2.namespaceObject), u2;
      }
      function q(t2) {
        let r2;
        const n2 = ((e2) => {
          if ("string" === typeof e2) return e2;
          const t3 = decodeURIComponent(("undefined" !== typeof TURBOPACK_NEXT_CHUNK_URLS ? TURBOPACK_NEXT_CHUNK_URLS.pop() : e2.getAttribute("src")).replace(/[?#].*$/, ""));
          return t3.startsWith("") ? t3.slice(0) : t3;
        })(t2[0]);
        return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !((e2, t3, r3, n3) => {
          let o2 = 1;
          while (o2 < e2.length) {
            let t4 = e2[o2];
            let n4 = o2 + 1;
            while (n4 < e2.length && "function" !== typeof e2[n4]) n4++;
            if (n4 === e2.length) throw Error("malformed chunk format, expected a factory function");
            if (!r3.has(t4)) {
              const u2 = e2[n4];
              for (Object.defineProperty(u2, "name", { value: "module evaluation" }); o2 < n4; o2++) t4 = e2[o2], r3.set(t4, u2);
            }
            o2 = n4 + 1;
          }
        })(t2, 0, U)), e.registerChunk(n2, r2);
      }
      function L(e2, t2, r2 = false) {
        let n2;
        try {
          n2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !r2 || n2.__esModule ? n2 : p(n2, d(n2), true);
      }
      n.y = async (e2) => {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2?.__esModule && t2.default && "default" in t2.default ? p(t2.default, d(t2), true) : t2;
      }, L.resolve = (e2, t2) => __require.resolve(e2, t2), n.x = L, e = { registerChunk(e2, t2) {
        B.add(e2), ((e3) => {
          const t3 = W.get(e3);
          if (null != t3) {
            for (const r2 of t3) r2.requiredChunks.delete(e3), 0 === r2.requiredChunks.size && I(r2.runtimeModuleIds, r2.chunkPath);
            W.delete(e3);
          }
        })(e2), null != t2 && (0 === t2.otherChunks.length ? I(t2.runtimeModuleIds, e2) : ((e3, t3, r2) => {
          const n2 = /* @__PURE__ */ new Set();
          const o2 = { runtimeModuleIds: r2, chunkPath: e3, requiredChunks: n2 };
          for (const e4 of t3) {
            const t4 = m(e4);
            if (B.has(t4)) continue;
            n2.add(t4);
            let r3 = W.get(t4);
            null == r3 && (r3 = /* @__PURE__ */ new Set(), W.set(t4, r3)), r3.add(o2);
          }
          0 === o2.requiredChunks.size && I(o2.runtimeModuleIds, o2.chunkPath);
        })(e2, t2.otherChunks.filter((e3) => {
          let t3;
          return t3 = m(e3), A.test(t3);
        }), t2.runtimeModuleIds));
      }, loadChunkCached(e2, t2) {
        throw Error("chunk loading is not supported");
      }, async loadWebAssembly(e2, t2, r2, n2, o2) {
        const u2 = await H(r2, n2);
        return await WebAssembly.instantiate(u2, o2);
      }, loadWebAssemblyModule: async (e2, t2, r2, n2) => H(r2, n2) };
      const B = /* @__PURE__ */ new Set();
      const W = /* @__PURE__ */ new Map();
      function I(e2, t2) {
        for (const r2 of e2) !((e3, t3) => {
          const r3 = K[t3];
          if (r3) {
            if (r3.error) throw r3.error;
            return;
          }
          N(t3, R.Runtime, e3);
        })(t2, r2);
      }
      async function H(e2, t2) {
        let r2;
        try {
          r2 = t2();
        } catch (e3) {
        }
        if (!r2) throw Error(`dynamically loading WebAssembly is not supported in this runtime as global was not injected for chunk '${e2}'`);
        return r2;
      }
      const F = globalThis.TURBOPACK;
      globalThis.TURBOPACK = { push: q }, F.forEach(q);
    })();
  }
});

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
const edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
const init_edgeFunctionHandler = __esm({
  "../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|_next\\/static|_next\\/image|.*\\.png$|.*\\.txt$|.*\\.pdf$|.*\\.xml$).*))(\\\\.json)?[\\/#\\?]?$"] }];
    require_root_of_the_server_68c7663c();
    require_root_of_the_server_438ceb6c();
    require_turbopack_apps_web_edge_wrapper_09c397a0();
  }
});

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
const DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
const DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
const NEXT_DIR = path.join(__dirname, ".next");
const OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
const NextConfig = { "env": {}, "webpack": null, "typescript": { "ignoreBuildErrors": false }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 14400, "formats": ["image/webp"], "maximumRedirects": 3, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [{ "hostname": "avatar.vercel.sh" }, { "protocol": "https", "hostname": "cdn.simpleicons.org" }, { "protocol": "https", "hostname": "ui.shadcn.com" }, { "protocol": "https", "hostname": "cursor.com" }], "qualities": [75], "unoptimized": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/Users/aryateja/Desktop/Claude-WorkOnMac/ATR-main-portfolio", "cacheComponents": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "cacheHandlers": {}, "experimental": { "useSkewCookie": false, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "dynamicOnHover": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "proxyPrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 11, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "viewTransition": false, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": false, "staleTimes": { "dynamic": 0, "static": 300 }, "reactDebugChannel": false, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "inlineCss": false, "useCache": false, "globalNotFound": false, "browserDebugInfoInTerminal": false, "lockDistDir": true, "isolatedDevBuild": true, "proxyClientMaxBodySize": 10485760, "hideLogsAfterAbort": false, "mcpServer": true, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "turbopack": { "root": "/Users/aryateja/Desktop/Claude-WorkOnMac/ATR-main-portfolio" }, "distDirRoot": ".next" };
const BuildId = "A5t6Z7yKSP7YV5klSzW1h";
const RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/api/chat", "regex": "^/api/chat(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/chat(?:/)?$" }, { "page": "/api/document", "regex": "^/api/document(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/document(?:/)?$" }, { "page": "/api/files/upload", "regex": "^/api/files/upload(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/files/upload(?:/)?$" }, { "page": "/api/history", "regex": "^/api/history(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/history(?:/)?$" }, { "page": "/api/suggestions", "regex": "^/api/suggestions(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/suggestions(?:/)?$" }, { "page": "/api/vote", "regex": "^/api/vote(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/vote(?:/)?$" }, { "page": "/blog", "regex": "^/blog(?:/)?$", "routeKeys": {}, "namedRegex": "^/blog(?:/)?$" }, { "page": "/chat", "regex": "^/chat(?:/)?$", "routeKeys": {}, "namedRegex": "^/chat(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/login", "regex": "^/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/login(?:/)?$" }, { "page": "/register", "regex": "^/register(?:/)?$", "routeKeys": {}, "namedRegex": "^/register(?:/)?$" }, { "page": "/sitemap.xml", "regex": "^/sitemap\\.xml(?:/)?$", "routeKeys": {}, "namedRegex": "^/sitemap\\.xml(?:/)?$" }], "dynamic": [{ "page": "/api/auth/[...nextauth]", "regex": "^/api/auth/(.+?)(?:/)?$", "routeKeys": { "nxtPnextauth": "nxtPnextauth" }, "namedRegex": "^/api/auth/(?<nxtPnextauth>.+?)(?:/)?$" }, { "page": "/blog/[slug]", "regex": "^/blog/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/blog/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/chat/[id]", "regex": "^/chat/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/chat/(?<nxtPid>[^/]+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
const ConfigHeaders = [{ "source": "/resume/:path*", "headers": [{ "key": "Content-Disposition", "value": 'attachment; filename="Arya_Teja_PM_Resume.pdf"' }], "regex": "^/resume(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }];
const PrerenderManifest = { "version": 4, "routes": { "/_global-error": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_not-found": { "initialStatus": 404, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_not-found", "dataRoute": "/_not-found.rsc", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/login": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/login", "dataRoute": "/login.rsc", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/register": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/register", "dataRoute": "/register.rsc", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/blog": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/blog", "dataRoute": "/blog.rsc", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sitemap.xml": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "application/xml", "x-next-cache-tags": "_N_T_/layout,_N_T_/sitemap.xml/layout,_N_T_/sitemap.xml/route,_N_T_/sitemap.xml" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sitemap.xml", "dataRoute": null, "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "fdc0f895862f325e0be8db8ad383cd23", "previewModeSigningKey": "f5f32b1e2566a4fac472a04fef73f3af06abf41a557bd3c6ffac155cd9453af4", "previewModeEncryptionKey": "6af4945bbe03aec69fba2ec0de3c61b47beb6d23fc615d61662ac3d749dde0cd" } };
const MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/[root-of-the-server]__68c7663c._.js", "server/edge/chunks/[root-of-the-server]__438ceb6c._.js", "server/edge/chunks/turbopack-apps_web_edge-wrapper_09c397a0.js"], "name": "middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|_next\\/static|_next\\/image|.*\\.png$|.*\\.txt$|.*\\.pdf$|.*\\.xml$).*))(\\\\.json)?[\\/#\\?]?$", "originalSource": "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.txt$|.*\\.pdf$|.*\\.xml$).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "A5t6Z7yKSP7YV5klSzW1h", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "gjhUnXDpiOre5w0ojyJcgCqSddEPWEHOCZUX2TPkqJw=", "__NEXT_PREVIEW_MODE_ID": "fdc0f895862f325e0be8db8ad383cd23", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "6af4945bbe03aec69fba2ec0de3c61b47beb6d23fc615d61662ac3d749dde0cd", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "f5f32b1e2566a4fac472a04fef73f3af06abf41a557bd3c6ffac155cd9453af4" } } }, "sortedMiddleware": ["/"], "functions": {} };
const AppPathRoutesManifest = { "/(auth)/api/auth/[...nextauth]/route": "/api/auth/[...nextauth]", "/(auth)/login/page": "/login", "/(auth)/register/page": "/register", "/(chat)/api/chat/route": "/api/chat", "/(chat)/api/document/route": "/api/document", "/(chat)/api/files/upload/route": "/api/files/upload", "/(chat)/api/history/route": "/api/history", "/(chat)/api/suggestions/route": "/api/suggestions", "/(chat)/api/vote/route": "/api/vote", "/(chat)/chat/[id]/page": "/chat/[id]", "/(chat)/chat/page": "/chat", "/(portfolio)/blog/[slug]/page": "/blog/[slug]", "/(portfolio)/blog/page": "/blog", "/(portfolio)/page": "/", "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/favicon.ico/route": "/favicon.ico", "/sitemap.xml/route": "/sitemap.xml" };
const FunctionsConfigManifest = { "version": 1, "functions": { "/api/chat": { "maxDuration": 60 } } };
const PagesManifest = { "/404": "pages/404.html", "/500": "pages/500.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream2 } from "node:stream/web";

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/utils/binary.js
const commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header, preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream2({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
let CommonHeaders;
((CommonHeaders2) => {
  CommonHeaders2.CACHE_CONTROL = "cache-control";
  CommonHeaders2.NEXT_CACHE = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location2, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location2)) {
    return location2;
  }
  const locationURL = new URL(location2);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
const CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
const CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
const VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
const NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
const NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
const NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {});
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = Boolean(event.headers.rsc);
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// ../../node_modules/.bun/path-to-regexp@6.3.0/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  const tokens = [];
  let i = 0;
  while (i < str.length) {
    const char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      let name = "";
      let j = i + 1;
      while (j < str.length) {
        const code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      let count = 1;
      let pattern = "";
      let j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  const tokens = lexer(str);
  const _a = options.prefixes;
  const prefixes = _a === void 0 ? "./" : _a;
  const _b = options.delimiter;
  const delimiter = _b === void 0 ? "/#?" : _b;
  const result = [];
  let key = 0;
  let i = 0;
  let path3 = "";
  const tryConsume = (type) => {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  const mustConsume = (type) => {
    const value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    const _a2 = tokens[i];
    const nextType = _a2.type;
    const index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  const consumeText = () => {
    let result2 = "";
    let value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  const isSafe = (value2) => {
    for (let _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      const char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  const safePattern = (prefix2) => {
    const prev = result[result.length - 1];
    const prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    const char = tryConsume("CHAR");
    const name = tryConsume("NAME");
    const pattern = tryConsume("PATTERN");
    if (name || pattern) {
      let prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    const value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    const open = tryConsume("OPEN");
    if (open) {
      const prefix = consumeText();
      const name_1 = tryConsume("NAME") || "";
      const pattern_1 = tryConsume("PATTERN") || "";
      const suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  const reFlags = flags(options);
  const _a = options.encode;
  const encode = _a === void 0 ? ((x) => x) : _a;
  const _b = options.validate;
  const validate = _b === void 0 ? true : _b;
  const matches = tokens.map((token) => {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return (data) => {
    let path3 = "";
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      const value = data ? data[token.name] : void 0;
      const optional = token.modifier === "?" || token.modifier === "*";
      const repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (let j = 0; j < value.length; j++) {
          const segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        const segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      const typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  const keys = [];
  const re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  const _a = options.decode;
  const decode = _a === void 0 ? ((x) => x) : _a;
  return (pathname) => {
    const m = re.exec(pathname);
    if (!m)
      return false;
    const path3 = m[0];
    const index = m.index;
    const params = /* @__PURE__ */ Object.create(null);
    const _loop_1 = (i2) => {
      if (m[i2] === void 0)
        return "continue";
      const key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map((value) => decode(value, key));
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (let i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options?.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  const groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  let index = 0;
  let execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  const parts = paths.map((path3) => pathToRegexp(path3, keys, options).source);
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  const _a = options.strict;
  const strict = _a === void 0 ? false : _a;
  const _b = options.start;
  const start = _b === void 0 ? true : _b;
  const _c = options.end;
  const end = _c === void 0 ? true : _c;
  const _d = options.encode;
  const encode = _d === void 0 ? ((x) => x) : _d;
  const _e = options.delimiter;
  const delimiter = _e === void 0 ? "/#?" : _e;
  const _f = options.endsWith;
  const endsWith = _f === void 0 ? "" : _f;
  const endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  const delimiterRe = "[".concat(escapeString(delimiter), "]");
  let route = start ? "^" : "";
  for (let _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    const token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      const prefix = escapeString(encode(token.prefix));
      const suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            const mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    const endToken = tokens[tokens.length - 1];
    const isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
const optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
const optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
const optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
const staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
const dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/routing/matcher.js
const routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
const getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
const computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
const middlewareManifest = MiddlewareManifest;
const functionsConfigManifest = FunctionsConfigManifest;
const middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
const REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/core/routingHandler.js
const MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
const MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
const INTERNAL_HEADER_PREFIX = "x-opennext-";
const INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
const INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
const INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
const INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
const INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
const geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// ../../node_modules/.bun/@opennextjs+aws@3.9.14+b00fceb1964c2915/node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
const defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
const handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
const middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
