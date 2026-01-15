var ht = Object.defineProperty,
  gt = Object.defineProperties;
var xt = Object.getOwnPropertyDescriptors;
var X = Object.getOwnPropertySymbols;
var Se = Object.prototype.hasOwnProperty,
  Ce = Object.prototype.propertyIsEnumerable;
var ke = (e, t, n) =>
    t in e
      ? ht(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  l = (e, t) => {
    for (var n in t || (t = {})) Se.call(t, n) && ke(e, n, t[n]);
    if (X) for (var n of X(t)) Ce.call(t, n) && ke(e, n, t[n]);
    return e;
  },
  g = (e, t) => gt(e, xt(t));
var q = (e, t) => {
  var n = {};
  for (var o in e) Se.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && X)
    for (var o of X(e)) t.indexOf(o) < 0 && Ce.call(e, o) && (n[o] = e[o]);
  return n;
};
var F = (e, t, n) =>
  new Promise((o, i) => {
    var r = (u) => {
        try {
          c(n.next(u));
        } catch (m) {
          i(m);
        }
      },
      a = (u) => {
        try {
          c(n.throw(u));
        } catch (m) {
          i(m);
        }
      },
      c = (u) => (u.done ? o(u.value) : Promise.resolve(u.value).then(r, a));
    c((n = n.apply(e, t)).next());
  });
import { r as h, j as s } from "./index-DlOqfcZ1.js";
const D = "react",
  Z = "[Builder.io]: ",
  A = {
    log: (...e) => console.log(Z, ...e),
    error: (...e) => console.error(Z, ...e),
    warn: (...e) => console.warn(Z, ...e),
    debug: (...e) => console.debug(Z, ...e),
  };
function V() {
  return typeof window != "undefined" && typeof document != "undefined";
}
const vt = (e) => {
    const t = {};
    return (
      e.forEach((n, o) => {
        t[o] = n;
      }),
      t
    );
  },
  Le = (e) => (e instanceof URLSearchParams ? vt(e) : e),
  Oe = (e) =>
    typeof e == "string"
      ? e
      : e instanceof URLSearchParams
      ? e.toString()
      : new URLSearchParams(e).toString();
function yt() {
  return V() && window.self !== window.top;
}
function N(e) {
  return (
    yt() && Oe(window.location.search).indexOf("builder.frameEditing=") !== -1
  );
}
const kt = () => {
    if (V()) {
      const e = new URL(location.href);
      return e.pathname === "" && (e.pathname = "/"), e;
    } else
      return (
        console.warn(
          "Cannot get location for tracking in non-browser environment"
        ),
        null
      );
  },
  St = () => (typeof navigator == "object" && navigator.userAgent) || "",
  De = () => {
    const e = St(),
      t = {
        Android() {
          return e.match(/Android/i);
        },
        BlackBerry() {
          return e.match(/BlackBerry/i);
        },
        iOS() {
          return e.match(/iPhone|iPod/i);
        },
        Opera() {
          return e.match(/Opera Mini/i);
        },
        Windows() {
          return e.match(/IEMobile/i) || e.match(/WPDesktop/i);
        },
        any() {
          return (
            t.Android() ||
            t.BlackBerry() ||
            t.iOS() ||
            t.Opera() ||
            t.Windows() ||
            D === "reactNative"
          );
        },
      },
      n = e.match(/Tablet|iPad/i),
      o = kt();
    return {
      urlPath: o == null ? void 0 : o.pathname,
      host: (o == null ? void 0 : o.host) || (o == null ? void 0 : o.hostname),
      device: n ? "tablet" : t.any() ? "mobile" : "desktop",
    };
  },
  O = (e) => e != null,
  Y = (e) => JSON.parse(JSON.stringify(e)),
  Ct = (e) => {
    if (e === "localhost" || e === "127.0.0.1") return e;
    const t = e.split(".");
    return t.length > 2 ? t.slice(1).join(".") : e;
  },
  Me = ({ name: e, canTrack: t }) => {
    var n;
    try {
      return t
        ? (n = document.cookie
            .split("; ")
            .find((o) => o.startsWith(`${e}=`))) == null
          ? void 0
          : n.split("=")[1]
        : void 0;
    } catch (o) {
      A.warn("[COOKIE] GET error: ", (o == null ? void 0 : o.message) || o);
      return;
    }
  },
  Ue = (e) =>
    F(void 0, null, function* () {
      return Me(e);
    }),
  wt = (e) =>
    e
      .map(([t, n]) => (n ? `${t}=${n}` : t))
      .filter(O)
      .join("; "),
  Tt = [
    ["secure", ""],
    ["SameSite", "None"],
  ],
  It = ({ name: e, value: t, expires: n }) => {
    const o = !V() || location.protocol === "https:" ? Tt : [[]],
      i = n ? [["expires", n.toUTCString()]] : [[]],
      r = [
        [e, t],
        ...i,
        ["path", "/"],
        ["domain", Ct(window.location.hostname)],
        ...o,
      ];
    return wt(r);
  },
  Ke = (i) =>
    F(void 0, [i], function* ({ name: e, value: t, expires: n, canTrack: o }) {
      try {
        if (!o) return;
        const r = It({ name: e, value: t, expires: n });
        document.cookie = r;
      } catch (r) {
        A.warn("[COOKIE] SET error: ", (r == null ? void 0 : r.message) || r);
      }
    }),
  jt = "builder.tests",
  he = (e) => `${jt}.${e}`,
  Bt = ({ contentId: e }) => Ue({ name: he(e), canTrack: !0 }),
  Et = ({ contentId: e }) => Me({ name: he(e), canTrack: !0 }),
  $t = ({ contentId: e, value: t }) =>
    Ke({ name: he(e), value: t, canTrack: !0 }),
  qe = (e) =>
    O(e.id) && O(e.variations) && Object.keys(e.variations).length > 0,
  Pt = ({ id: e, variations: t }) => {
    var n;
    let o = 0;
    const i = Math.random();
    for (const r in t) {
      const a = (n = t[r]) == null ? void 0 : n.testRatio;
      if (((o += a), i < o)) return r;
    }
    return e;
  },
  He = (e) => {
    const t = Pt(e);
    return (
      $t({ contentId: e.id, value: t }).catch((n) => {
        A.error("could not store A/B test variation: ", n);
      }),
      t
    );
  },
  ze = ({ item: e, testGroupId: t }) => {
    const n = e.variations[t];
    return t === e.id || !n
      ? { testVariationId: e.id, testVariationName: "Default" }
      : {
          data: n.data,
          testVariationId: n.id,
          testVariationName: n.name || (n.id === e.id ? "Default" : ""),
        };
  },
  Rt = ({ item: e, canTrack: t }) => {
    if (!t) return e;
    if (!e) return;
    if (!qe(e)) return e;
    const n =
        Et({ contentId: e.id }) || He({ variations: e.variations, id: e.id }),
      o = ze({ item: e, testGroupId: n });
    return l(l({}, e), o);
  },
  Vt = (n) =>
    F(void 0, [n], function* ({ item: e, canTrack: t }) {
      if (!t || !qe(e)) return e;
      const o =
          (yield Bt({ contentId: e.id })) ||
          He({ variations: e.variations, id: e.id }),
        i = ze({ item: e, testGroupId: o });
      return l(l({}, e), i);
    }),
  J = (e) => (O(e) ? e : !0),
  Ft = (e) => ({ type: "builder.registerComponent", data: pe(e) }),
  Nt = (e) => {
    const t = e.toString().trim();
    return `return (${
      !t.startsWith("function") && !t.startsWith("(") ? "function " : ""
    }${t}).apply(this, arguments)`;
  },
  Wt = (e) => (typeof e == "function" ? Nt(e) : Y(e)),
  pe = (n) => {
    var o = n,
      { inputs: e } = o,
      t = q(o, ["inputs"]);
    return g(l({}, Y(t)), {
      inputs:
        e == null
          ? void 0
          : e.map((i) =>
              Object.entries(i).reduce(
                (r, [a, c]) => g(l({}, r), { [a]: Wt(c) }),
                {}
              )
            ),
    });
  };
function At() {
  return typeof globalThis != "undefined"
    ? globalThis
    : typeof window != "undefined"
    ? window
    : typeof global != "undefined"
    ? global
    : typeof self != "undefined"
    ? self
    : globalThis;
}
function Lt() {
  const e = At().fetch;
  if (typeof e == "undefined")
    throw (
      (console.warn(`Builder SDK could not find a global fetch function. Make sure you have a polyfill for fetch in your project. 
      For more information, read https://github.com/BuilderIO/this-package-uses-fetch`),
      new Error("Builder SDK could not find a global `fetch` function"))
    );
  return e;
}
const Je = Lt();
function me(e, t = null, n = ".") {
  return Object.keys(e).reduce((o, i) => {
    const r = e[i],
      a = [t, i].filter(Boolean).join(n);
    return [
      typeof r == "object",
      r !== null,
      !(Array.isArray(r) && r.length === 0),
    ].every(Boolean)
      ? l(l({}, o), me(r, a, n))
      : g(l({}, o), { [a]: r });
  }, {});
}
function _e(e, t, n = {}) {
  for (const o in e) {
    const i = e[o],
      r = t ? t + "." + o : o;
    i &&
    typeof i == "object" &&
    !Array.isArray(i) &&
    !Object.keys(i).find((a) => a.startsWith("$"))
      ? _e(i, r, n)
      : (n[r] = i);
  }
  return n;
}
const Ot = "v3",
  we = "builder.",
  Dt = "options.",
  Mt = (e) => {
    if (!e) return {};
    const t = Le(e),
      n = {};
    return (
      Object.keys(t).forEach((o) => {
        if (o.startsWith(we)) {
          const i = o.replace(we, "").replace(Dt, "");
          n[i] = t[o];
        }
      }),
      n
    );
  },
  Ut = () => {
    if (!V()) return {};
    const e = new URLSearchParams(window.location.search);
    return Mt(e);
  },
  Te = (e) => typeof e == "number" && !isNaN(e) && e >= 0,
  ge = (e) => {
    const {
      limit: t = 30,
      userAttributes: n,
      query: o,
      model: i,
      apiKey: r,
      enrich: a,
      locale: c,
      apiVersion: u = Ot,
      fields: m,
      omit: p,
      offset: d,
      cacheSeconds: f,
      staleCacheSeconds: b,
      sort: y,
      includeUnpublished: T,
    } = e;
    if (!r) throw new Error("Missing API key");
    if (!["v3"].includes(u))
      throw new Error(`Invalid apiVersion: expected 'v3', received '${u}'`);
    const I = t !== 1,
      S = new URL(`https://cdn.builder.io/api/${u}/content/${i}`);
    if (
      (S.searchParams.set("apiKey", r),
      S.searchParams.set("limit", String(t)),
      S.searchParams.set("noTraverse", String(I)),
      S.searchParams.set("includeRefs", String(!0)),
      c && S.searchParams.set("locale", c),
      a && S.searchParams.set("enrich", String(a)),
      S.searchParams.set("omit", p || "meta.componentsUsed"),
      m && S.searchParams.set("fields", m),
      Number.isFinite(d) &&
        d > -1 &&
        S.searchParams.set("offset", String(Math.floor(d))),
      typeof T == "boolean" &&
        S.searchParams.set("includeUnpublished", String(T)),
      f && Te(f) && S.searchParams.set("cacheSeconds", String(f)),
      b && Te(b) && S.searchParams.set("staleCacheSeconds", String(b)),
      y)
    ) {
      const R = me({ sort: y });
      for (const C in R) S.searchParams.set(C, JSON.stringify(R[C]));
    }
    const $ = l(l({}, Ut()), Le(e.options || {})),
      P = me($);
    for (const R in P) S.searchParams.set(R, String(P[R]));
    if ((n && S.searchParams.set("userAttributes", JSON.stringify(n)), o)) {
      const R = _e({ query: o });
      for (const C in R) S.searchParams.set(C, JSON.stringify(R[C]));
    }
    return S;
  },
  Kt = (e) => "results" in e;
function Ge(e) {
  return F(this, null, function* () {
    const t = yield zt(g(l({}, e), { limit: 1 }));
    return (t && t[0]) || null;
  });
}
const qt = (e) =>
    F(void 0, null, function* () {
      var t;
      const n = ge(e);
      return yield (yield ((t = e.fetch) != null ? t : Je)(
        n.href,
        e.fetchOptions
      )).json();
    }),
  Ht = (o, i, ...r) =>
    F(void 0, [o, i, ...r], function* (e, t, n = ge(e)) {
      const a = J(e.canTrack);
      if ((n.search.includes("preview="), !a || !(V() || D === "reactNative")))
        return t.results;
      try {
        const c = [];
        for (const u of t.results) c.push(yield Vt({ item: u, canTrack: a }));
        t.results = c;
      } catch (c) {
        A.error("Could not process A/B tests. ", c);
      }
      return t.results;
    });
function zt(e) {
  return F(this, null, function* () {
    try {
      const t = ge(e),
        n = yield qt(e);
      return Kt(n)
        ? Ht(e, n)
        : (A.error("Error fetching data. ", { url: t, content: n, options: e }),
          null);
    } catch (t) {
      return A.error("Error fetching data. ", t), null;
    }
  });
}
function Jt(e) {
  const t = V() ? window.location.search : void 0;
  return t ? Oe(t).indexOf("builder.preview=") !== -1 : !1;
}
function _t() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
    const t = (Math.random() * 16) | 0;
    return (e == "x" ? t : (t & 3) | 8).toString(16);
  });
}
function Ye() {
  return _t().replace(/-/g, "");
}
const Qe = "builderSessionId",
  Gt = (t) =>
    F(void 0, [t], function* ({ canTrack: e }) {
      if (!e) return;
      const n = yield Ue({ name: Qe, canTrack: e });
      if (O(n)) return n;
      {
        const o = Yt();
        return Qt({ id: o, canTrack: e }), o;
      }
    }),
  Yt = () => Ye(),
  Qt = ({ id: e, canTrack: t }) => Ke({ name: Qe, value: e, canTrack: t }),
  Xe = () =>
    V() && typeof localStorage != "undefined" ? localStorage : void 0,
  Xt = ({ key: e, canTrack: t }) => {
    var n;
    try {
      return t ? ((n = Xe()) == null ? void 0 : n.getItem(e)) : void 0;
    } catch (o) {
      console.debug("[LocalStorage] GET error: ", o);
      return;
    }
  },
  Zt = ({ key: e, canTrack: t, value: n }) => {
    var o;
    try {
      t && ((o = Xe()) == null || o.setItem(e, n));
    } catch (i) {
      console.debug("[LocalStorage] SET error: ", i);
    }
  },
  Ze = "builderVisitorId",
  en = ({ canTrack: e }) => {
    if (!e) return;
    const t = Xt({ key: Ze, canTrack: e });
    if (O(t)) return t;
    {
      const n = tn();
      return nn({ id: n, canTrack: e }), n;
    }
  },
  tn = () => Ye(),
  nn = ({ id: e, canTrack: t }) => Zt({ key: Ze, value: e, canTrack: t }),
  on = (t) =>
    F(void 0, [t], function* ({ canTrack: e }) {
      if (!e) return { visitorId: void 0, sessionId: void 0 };
      const n = yield Gt({ canTrack: e }),
        o = en({ canTrack: e });
      return { sessionId: n, visitorId: o };
    }),
  rn = (r) =>
    F(void 0, null, function* () {
      var a = r,
        { type: e, canTrack: t, apiKey: n, metadata: o } = a,
        i = q(a, ["type", "canTrack", "apiKey", "metadata"]);
      return {
        type: e,
        data: g(
          l(
            g(l({}, i), { metadata: l({ url: location.href }, o) }),
            yield on({ canTrack: t })
          ),
          { userAttributes: De(), ownerId: n }
        ),
      };
    });
function Ie(e) {
  return F(this, null, function* () {
    if (!e.apiKey) {
      A.error("Missing API key for track call. Please provide your API key.");
      return;
    }
    if (e.canTrack && !N() && (V() || D === "reactNative"))
      return fetch("https://cdn.builder.io/api/v1/track", {
        method: "POST",
        body: JSON.stringify({ events: [yield rn(e)] }),
        headers: { "content-type": "application/json" },
        mode: "cors",
      }).catch((t) => {
        console.error("Failed to track: ", t);
      });
  });
}
const an = [
  "*.beta.builder.io",
  "beta.builder.io",
  "builder.io",
  "localhost",
  "qa.builder.io",
];
function et(e, t) {
  if (!t.origin.startsWith("http") && !t.origin.startsWith("https")) return !1;
  const n = new URL(t.origin),
    o = n.hostname;
  return (
    (e || an).findIndex((i) =>
      i.startsWith("*.") ? o.endsWith(i.slice(1)) : i === o
    ) > -1
  );
}
const ln = "1.1.2",
  je = {};
function sn(e, t) {
  let n = je[e];
  if ((n || (n = je[e] = []), n.push(t), V())) {
    const o = { type: "builder.register", data: { type: e, info: t } };
    try {
      parent.postMessage(o, "*"),
        parent !== window && window.postMessage(o, "*");
    } catch (i) {
      console.debug("Could not postmessage", i);
    }
  }
}
const cn = () => {
  sn("insertMenu", {
    name: "_default",
    default: !0,
    items: [
      { name: "Box" },
      { name: "Text" },
      { name: "Image" },
      { name: "Columns" },
      { name: "Core:Section" },
      { name: "Core:Button" },
      { name: "Embed" },
      { name: "Custom Code" },
    ],
  });
};
let Be = !1;
const un = (e = {}) => {
    var t, n;
    Be ||
      ((Be = !0),
      V() &&
        ((t = window.parent) == null ||
          t.postMessage(
            {
              type: "builder.sdkInfo",
              data: {
                target: D,
                version: ln,
                supportsPatchUpdates: !1,
                supportsAddBlockScoping: !0,
                supportsCustomBreakpoints: !0,
              },
            },
            "*"
          ),
        (n = window.parent) == null ||
          n.postMessage(
            { type: "builder.updateContent", data: { options: e } },
            "*"
          ),
        window.addEventListener("message", (o) => {
          var i, r;
          if (!et(e.trustedHosts, o)) return;
          const { data: a } = o;
          if (a != null && a.type)
            switch (a.type) {
              case "builder.evaluate": {
                const c = a.data.text,
                  u = a.data.arguments || [],
                  m = a.data.id,
                  p = new Function(c);
                let d,
                  f = null;
                try {
                  d = p.apply(null, u);
                } catch (b) {
                  f = b;
                }
                f
                  ? (i = window.parent) == null ||
                    i.postMessage(
                      {
                        type: "builder.evaluateError",
                        data: { id: m, error: f.message },
                      },
                      "*"
                    )
                  : d && typeof d.then == "function"
                  ? d
                      .then((b) => {
                        var y;
                        (y = window.parent) == null ||
                          y.postMessage(
                            {
                              type: "builder.evaluateResult",
                              data: { id: m, result: b },
                            },
                            "*"
                          );
                      })
                      .catch(console.error)
                  : (r = window.parent) == null ||
                    r.postMessage(
                      {
                        type: "builder.evaluateResult",
                        data: { result: d, id: m },
                      },
                      "*"
                    );
                break;
              }
            }
        })));
  },
  dn =
    ({ model: e, trustedHosts: t, callbacks: n }) =>
    (o) => {
      if (!et(t, o)) return;
      const { data: i } = o;
      if (i)
        switch (i.type) {
          case "builder.configureSdk": {
            n.configureSdk(i.data);
            break;
          }
          case "builder.triggerAnimation": {
            n.animation(i.data);
            break;
          }
          case "builder.contentUpdate": {
            const r = i.data,
              a = r.key || r.alias || r.entry || r.modelName,
              c = r.data;
            a === e && n.contentUpdate(c);
            break;
          }
        }
    };
var pn = {},
  mn = Object.defineProperty,
  fn = (e, t, n) =>
    t in e
      ? mn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  Ee = (e, t, n) => (fn(e, typeof t != "symbol" ? t + "" : t, n), n);
const bn = new Set([
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ]),
  hn = (e) => typeof e == "string" && bn.has(e.toLowerCase());
function xe(e) {
  return s.jsx(s.Fragment, {
    children: hn(e.TagName)
      ? s.jsx(s.Fragment, {
          children: s.jsx(
            e.TagName,
            l(l({}, e.attributes), e.actionAttributes)
          ),
        })
      : s.jsx(s.Fragment, {
          children:
            typeof e.TagName == "string"
              ? s.jsx(
                  e.TagName,
                  g(l(l({}, e.attributes), e.actionAttributes), {
                    children: e.children,
                  })
                )
              : s.jsx(
                  e.TagName,
                  g(l(l({}, e.attributes), e.actionAttributes), {
                    children: e.children,
                  })
                ),
        }),
  });
}
const _ = () => {
  switch (D) {
    case "react":
    case "reactNative":
    case "rsc":
      return "className";
    case "svelte":
    case "vue":
    case "solid":
    case "qwik":
    case "angular":
      return "class";
  }
};
function gn(e) {
  function t() {
    return l(
      g(l({}, e.attributes), {
        [_()]: `${e.link ? "" : "builder-button"} ${e.attributes[_()] || ""}`,
      }),
      e.link
        ? {
            href: e.link,
            target: e.openLinkInNewTab ? "_blank" : void 0,
            role: "link",
          }
        : { role: "button" }
    );
  }
  return s.jsx(xe, {
    attributes: t(),
    TagName: e.link ? e.builderLinkComponent || "a" : "button",
    actionAttributes: {},
    children: e.text,
  });
}
const ve = h.createContext({
    content: null,
    context: {},
    localState: void 0,
    rootSetState() {},
    rootState: {},
    apiKey: null,
    apiVersion: void 0,
    componentInfos: {},
    inheritedStyles: {},
    BlocksWrapper: "div",
    BlocksWrapperProps: {},
  }),
  tt = h.createContext({ registeredComponents: {} });
function xn(e) {
  var t;
  return l(l({}, (t = e.component) == null ? void 0 : t.options), e.options);
}
const vn = ({ builder: e, context: t, event: n, state: o }) =>
    Object.entries({ state: o, Builder: e, builder: e, context: t, event: n }),
  yn = () => ({
    isEditing: N(),
    isBrowser: V(),
    isServer: !V(),
    getUserAttributes: () => De(),
  }),
  kn = (e, { isExpression: t = !0 }) =>
    t &&
    !(
      e.includes(";") ||
      e.includes(" return ") ||
      e.trim().startsWith("return ")
    )
      ? `return (${e});`
      : e,
  Sn = ({
    code: e,
    builder: t,
    context: n,
    event: o,
    localState: i,
    rootSetState: r,
    rootState: a,
  }) => {
    const c = vn({
      builder: t,
      context: n,
      event: o,
      state: nt({ rootState: a, localState: i, rootSetState: r }),
    });
    return new Function(...c.map(([u]) => u), e)(...c.map(([, u]) => u));
  };
function nt({ rootState: e, localState: t, rootSetState: n }) {
  return new Proxy(e, {
    get: (o, i) => {
      if (t && i in t) return t[i];
      const r = o[i];
      return typeof r == "object" && r !== null
        ? nt({
            rootState: r,
            localState: void 0,
            rootSetState: n
              ? (a) => {
                  (o[i] = a), n(o);
                }
              : void 0,
          })
        : r;
    },
    set: (o, i, r) => {
      if (t && i in t)
        throw new Error(
          "Writing to local state is not allowed as it is read-only."
        );
      return (o[i] = r), n == null || n(o), !0;
    },
  });
}
function Cn() {
  var e;
  return (
    typeof process != "undefined" &&
    O(
      (e = process == null ? void 0 : process.versions) == null
        ? void 0
        : e.node
    )
  );
}
const wn = () => {
    var e;
    if (!Cn()) return !1;
    const t = process.arch === "arm64",
      n = process.version.startsWith("v20"),
      o =
        (e = pn.NODE_OPTIONS) == null
          ? void 0
          : e.includes("--no-node-snapshot");
    return t && n && !o
      ? (A.log(
          "Skipping usage of `isolated-vm` to avoid crashes in Node v20 on an arm64 machine.\n    If you would like to use the `isolated-vm` package on this machine, please provide the `NODE_OPTIONS=--no-node-snapshot` config to your Node process.\n    See https://github.com/BuilderIO/builder/blob/main/packages/sdks/README.md#node-v20--m1-macs-apple-silicon-support for more information.\n    "
        ),
        !0)
      : !1;
  },
  Tn = (e) => (V() || wn(), Sn(e)),
  fe = class H {
    static getCacheKey(t) {
      return JSON.stringify(
        g(l({}, t), { event: t.event ? Math.random() : void 0 })
      );
    }
    static getCachedValue(t) {
      return H.cache.get(t);
    }
    static setCachedValue(t, n) {
      H.cache.size > 20 && H.cache.delete(H.cache.keys().next().value),
        H.cache.set(t, { value: n });
    }
  };
Ee(fe, "cacheLimit", 20), Ee(fe, "cache", new Map());
let ee = fe;
function G({
  code: e,
  context: t,
  localState: n,
  rootState: o,
  rootSetState: i,
  event: r,
  isExpression: a = !0,
  enableCache: c,
}) {
  if (e === "") return;
  const u = {
    code: kn(e, { isExpression: a }),
    builder: yn(),
    context: t,
    event: r,
    rootSetState: i,
    rootState: o,
    localState: n,
  };
  if (c) {
    const m = ee.getCacheKey(u),
      p = ee.getCachedValue(m);
    if (p) return p.value;
  }
  try {
    const m = Tn(u);
    if (c) {
      const p = ee.getCacheKey(u);
      ee.setCachedValue(p, m);
    }
    return m;
  } catch (m) {
    A.error("Failed code evaluation: " + m.message, { code: e });
    return;
  }
}
const ot = (e, t, n) => {
    if (Object(e) !== e) return e;
    const o = Array.isArray(t) ? t : t.toString().match(/[^.[\]]+/g);
    return (
      (o
        .slice(0, -1)
        .reduce(
          (i, r, a) =>
            Object(i[r]) === i[r]
              ? i[r]
              : (i[r] =
                  Math.abs(Number(o[a + 1])) >> 0 === +o[a + 1] ? [] : {}),
          e
        )[o[o.length - 1]] = n),
      e
    );
  },
  In = ({
    block: e,
    context: t,
    localState: n,
    rootState: o,
    rootSetState: i,
  }) => {
    if (!e.bindings) return e;
    const r = Y(e),
      a = g(l({}, r), {
        properties: l({}, r.properties),
        actions: l({}, r.actions),
      });
    for (const c in e.bindings) {
      const u = e.bindings[c],
        m = G({
          code: u,
          localState: n,
          rootState: o,
          rootSetState: i,
          context: t,
          enableCache: !0,
        });
      ot(a, c, m);
    }
    return a;
  };
function oe({
  block: e,
  context: t,
  shouldEvaluateBindings: n,
  localState: o,
  rootState: i,
  rootSetState: r,
}) {
  const a = e;
  return n
    ? In({ block: a, localState: o, rootState: i, rootSetState: r, context: t })
    : a;
}
const ie = (e) =>
  e ? e.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase() : "";
function jn(e, t, n = {}) {
  let o,
    i,
    r,
    a = null,
    c = 0;
  const u = function () {
    (c = n.leading === !1 ? 0 : Date.now()),
      (a = null),
      (r = e.apply(o, i)),
      a || (o = i = null);
  };
  return function () {
    const m = Date.now();
    !c && n.leading === !1 && (c = m);
    const p = t - (m - c);
    return (
      (o = this),
      (i = arguments),
      p <= 0 || p > t
        ? (a && (clearTimeout(a), (a = null)),
          (c = m),
          (r = e.apply(o, i)),
          a || (o = i = null))
        : !a && n.trailing !== !1 && (a = setTimeout(u, p)),
      r
    );
  };
}
function z(e, ...t) {
  const n = Object(e);
  for (let o = 1; o < arguments.length; o++) {
    const i = arguments[o];
    if (i != null)
      for (const r in i)
        Object.prototype.hasOwnProperty.call(i, r) && (n[r] = i[r]);
  }
  return n;
}
function Bn(e) {
  for (const t of e)
    switch (t.trigger) {
      case "pageLoad":
        at(t);
        break;
      case "scrollInView":
        $n(t);
        break;
    }
}
function it(e) {
  console.warn(`Cannot animate element: element with ID ${e} not found!`);
}
function rt(e, t) {
  const n = En(e),
    o = getComputedStyle(t),
    i = e.steps[0].styles,
    r = e.steps[e.steps.length - 1].styles,
    a = [i, r];
  for (const c of a) for (const u of n) u in c || (c[u] = o[u]);
}
function En(e) {
  const t = [];
  for (const n of e.steps)
    for (const o in n.styles) t.indexOf(o) === -1 && t.push(o);
  return t;
}
function at(e) {
  const t = Array.prototype.slice.call(
    document.getElementsByClassName(e.elementId || e.id || "")
  );
  if (!t.length) {
    it(e.elementId || e.id || "");
    return;
  }
  Array.from(t).forEach((n) => {
    rt(e, n),
      (n.style.transition = "none"),
      (n.style.transitionDelay = "0"),
      z(n.style, e.steps[0].styles),
      setTimeout(() => {
        (n.style.transition = `all ${e.duration}s ${ie(e.easing)}`),
          e.delay && (n.style.transitionDelay = e.delay + "s"),
          z(n.style, e.steps[1].styles),
          setTimeout(() => {
            (n.style.transition = ""), (n.style.transitionDelay = "");
          }, (e.delay || 0) * 1e3 + e.duration * 1e3 + 100);
      });
  });
}
function $n(e) {
  const t = Array.prototype.slice.call(
    document.getElementsByClassName(e.elementId || e.id || "")
  );
  if (!t.length) {
    it(e.elementId || e.id || "");
    return;
  }
  Array.from(t).forEach((n) => {
    rt(e, n);
    let o = !1,
      i = !1;
    function r() {
      !o && c(n)
        ? ((o = !0),
          (i = !0),
          setTimeout(() => {
            z(n.style, e.steps[1].styles),
              e.repeat || document.removeEventListener("scroll", a),
              setTimeout(() => {
                (i = !1),
                  e.repeat ||
                    ((n.style.transition = ""), (n.style.transitionDelay = ""));
              }, (e.duration + (e.delay || 0)) * 1e3 + 100);
          }))
        : e.repeat &&
          o &&
          !i &&
          !c(n) &&
          ((o = !1), z(n.style, e.steps[0].styles));
    }
    const a = jn(r, 200, { leading: !1 });
    function c(p) {
      const d = p.getBoundingClientRect(),
        f = window.innerHeight,
        b = ((e.thresholdPercent || 0) / 100) * f;
      return d.bottom > b && d.top < f - b;
    }
    const u = e.steps[0].styles;
    function m() {
      z(n.style, u);
    }
    m(),
      setTimeout(() => {
        (n.style.transition = `all ${e.duration}s ${ie(e.easing)}`),
          e.delay && (n.style.transitionDelay = e.delay + "s");
      }),
      document.addEventListener("scroll", a, { capture: !0, passive: !0 }),
      r();
  });
}
const lt = (e) =>
    Object.entries(e)
      .map(([t, n]) => {
        if (typeof n == "string") return `${ie(t)}: ${n};`;
      })
      .filter(O),
  Pn = (e) =>
    lt(e).join(`
`),
  te = ({ mediaQuery: e, className: t, styles: n }) => {
    const o = `.${t} {
    ${Pn(n)}
  }`;
    return e
      ? `${e} {
      ${o}
    }`
      : o;
  };
function Rn({ style: e }) {
  return e;
}
const Vn = ({ block: e, context: t }) =>
  st(Rn({ style: e.style || {}, context: t, block: e }));
function st(e) {
  switch (D) {
    case "svelte":
    case "vue":
    case "solid":
    case "angular":
      return lt(e).join(" ");
    case "qwik":
    case "reactNative":
    case "react":
    case "rsc":
      return e;
  }
}
const Fn = ({ block: e, context: t, registeredComponents: n }) => {
    var o;
    const i =
      (o = oe({
        block: e,
        localState: t.localState,
        rootState: t.rootState,
        rootSetState: t.rootSetState,
        context: t.context,
        shouldEvaluateBindings: !1,
      }).component) == null
        ? void 0
        : o.name;
    if (!i) return null;
    const r = n[i];
    if (r) return r;
    console.warn(`
      Could not find a registered component named "${i}". 
      If you registered it, is the file that registered it imported by the file that needs to render it?`);
  },
  Nn = ({ block: e, context: t }) => {
    const c = e,
      { repeat: n } = c,
      o = q(c, ["repeat"]);
    if (!(n != null && n.collection)) return;
    const i = G({
      code: n.collection,
      localState: t.localState,
      rootState: t.rootState,
      rootSetState: t.rootSetState,
      context: t.context,
      enableCache: !0,
    });
    if (!Array.isArray(i)) return;
    const r = n.collection.split(".").pop(),
      a = n.itemName || (r ? r + "Item" : "item");
    return i.map((u, m) => ({
      context: g(l({}, t), {
        localState: g(l({}, t.localState), {
          $index: m,
          $item: u,
          [a]: u,
          [`$${a}Index`]: m,
        }),
      }),
      block: o,
    }));
  },
  re = (e) =>
    l(
      {
        builderBlock: !0,
        builderContext: !0,
        builderComponents: !1,
        builderLinkComponent: !1,
      },
      e
    ),
  Wn = (e, t) =>
    e
      ? re(e.shouldReceiveBuilderProps).builderLinkComponent
        ? { builderLinkComponent: t }
        : {}
      : {},
  An = (e, t) =>
    e
      ? re(e.shouldReceiveBuilderProps).builderComponents
        ? { builderComponents: t }
        : {}
      : {},
  Ln = (e, t) =>
    e
      ? re(e.shouldReceiveBuilderProps).builderBlock
        ? { builderBlock: t }
        : {}
      : {},
  On = (e, t) =>
    e
      ? re(e.shouldReceiveBuilderProps).builderContext
        ? { builderContext: t }
        : {}
      : {},
  ct = {
    small: { min: 320, default: 321, max: 640 },
    medium: { min: 641, default: 642, max: 991 },
    large: { min: 990, default: 991, max: 1200 },
  },
  $e = (e, t = ct) => `@media (max-width: ${t[e].max}px)`,
  ut = ({ small: e, medium: t }) => {
    const n = Y(ct);
    if (!e || !t) return n;
    const o = Math.floor(e / 2);
    n.small = { max: e, min: o, default: o + 1 };
    const i = n.small.max + 1;
    n.medium = { max: t, min: i, default: i + 1 };
    const r = n.medium.max + 1;
    return (n.large = { max: 2e3, min: r, default: r + 1 }), n;
  };
function ae(e) {
  return s.jsx("style", {
    dangerouslySetInnerHTML: { __html: e.styles },
    "data-id": e.id,
  });
}
function Dn(e) {
  function t() {
    const o = oe({
      block: e.block,
      localState: e.context.localState,
      rootState: e.context.rootState,
      rootSetState: e.context.rootSetState,
      context: e.context.context,
      shouldEvaluateBindings: !0,
    });
    return O(o.hide) ? !o.hide : O(o.show) ? o.show : !0;
  }
  function n() {
    var o, i, r;
    const a = oe({
        block: e.block,
        localState: e.context.localState,
        rootState: e.context.rootState,
        rootSetState: e.context.rootSetState,
        context: e.context.context,
        shouldEvaluateBindings: !0,
      }),
      c = a.responsiveStyles,
      u = e.context.content,
      m = ut(
        ((o = u == null ? void 0 : u.meta) == null ? void 0 : o.breakpoints) ||
          {}
      ),
      p = c == null ? void 0 : c.large,
      d = c == null ? void 0 : c.medium,
      f = c == null ? void 0 : c.small,
      b = a.id;
    if (!b) return "";
    const y = p ? te({ className: b, styles: p }) : "",
      T = d ? te({ className: b, styles: d, mediaQuery: $e("medium", m) }) : "",
      I = f ? te({ className: b, styles: f, mediaQuery: $e("small", m) }) : "",
      S = a.animations && a.animations.find((P) => P.trigger === "hover");
    let $ = "";
    if (S) {
      const P =
        ((r = (i = S.steps) == null ? void 0 : i[1]) == null
          ? void 0
          : r.styles) || {};
      $ =
        te({
          className: `${b}:hover`,
          styles: g(l({}, P), {
            transition: `all ${S.duration}s ${ie(S.easing)}`,
            transitionDelay: S.delay ? `${S.delay}s` : "0s",
          }),
        }) || "";
    }
    return [y, T, I, $].join(" ");
  }
  return s.jsx(s.Fragment, {
    children:
      n() && t()
        ? s.jsx(s.Fragment, {
            children: s.jsx(ae, { id: "builderio-block", styles: n() }),
          })
        : null,
  });
}
function Mn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Un = (e) => `on${Mn(e)}`,
  Kn = (e, t) => (n) =>
    G({
      code: e,
      context: t.context,
      localState: t.localState,
      rootState: t.rootState,
      rootSetState: t.rootSetState,
      event: n,
      isExpression: !1,
      enableCache: !0,
    });
function dt(e) {
  var t;
  const n = {},
    o = (t = e.block.actions) != null ? t : {};
  for (const i in o) {
    if (!o.hasOwnProperty(i)) continue;
    const r = o[i];
    let a = Un(i);
    if (e.stripPrefix)
      switch (D) {
        case "vue":
          a = a.replace("v-on:", "");
          break;
        case "svelte":
          a = a.replace("on:", "");
          break;
      }
    n[a] = Kn(r, e);
  }
  return n;
}
function qn({ properties: e }) {
  return e;
}
const Hn = (e) => ({ href: e.href });
function ye({ block: e, context: t }) {
  var n;
  const o = g(l(l({}, Hn(e)), e.properties), {
    "builder-id": e.id,
    style: Vn({ block: e, context: t }),
    [_()]: [
      e.id,
      "builder-block",
      e.class,
      (n = e.properties) == null ? void 0 : n.class,
    ]
      .filter(Boolean)
      .join(" "),
  });
  return qn({ properties: o, context: t, block: e });
}
function zn(e) {
  return s.jsx(xe, {
    TagName: e.Wrapper,
    attributes: ye({ block: e.block, context: e.context }),
    actionAttributes: dt({
      block: e.block,
      rootState: e.context.rootState,
      rootSetState: e.context.rootSetState,
      localState: e.context.localState,
      context: e.context.context,
      stripPrefix: !0,
    }),
    children: e.children,
  });
}
function Jn(e) {
  function t() {
    return e.includeBlockProps
      ? l(
          l({}, ye({ block: e.block, context: e.context })),
          dt({
            block: e.block,
            rootState: e.context.rootState,
            rootSetState: e.context.rootSetState,
            localState: e.context.localState,
            context: e.context.context,
          })
        )
      : {};
  }
  return s.jsx(
    e.Wrapper,
    g(l({}, e.wrapperProps), { attributes: t(), children: e.children })
  );
}
const _n = ({
  componentOptions: e,
  builderBlock: t,
  context: n,
  componentRef: o,
  includeBlockProps: i,
  isInteractive: r,
  contextValue: a,
}) => {
  const c = l(l({}, e), i ? { attributes: ye({ block: t, context: a }) } : {});
  return r
    ? {
        Wrapper: o,
        block: t,
        context: n,
        wrapperProps: e,
        includeBlockProps: i,
      }
    : c;
};
function Pe(e) {
  var t;
  const [n, o] = h.useState(() => (e.isInteractive ? Jn : e.componentRef));
  return s.jsx(s.Fragment, {
    children: e.componentRef
      ? s.jsx(s.Fragment, {
          children: s.jsx(
            n,
            g(
              l(
                {},
                _n({
                  componentOptions: e.componentOptions,
                  builderBlock: e.builderBlock,
                  context: e.context,
                  componentRef: e.componentRef,
                  linkComponent: e.linkComponent,
                  includeBlockProps: e.includeBlockProps,
                  isInteractive: e.isInteractive,
                  contextValue: e.context,
                })
              ),
              {
                children:
                  (t = e.blockChildren) == null
                    ? void 0
                    : t.map((i) =>
                        s.jsx(
                          Q,
                          {
                            block: i,
                            context: e.context,
                            registeredComponents: e.registeredComponents,
                            linkComponent: e.linkComponent,
                          },
                          i.id
                        )
                      ),
              }
            )
          ),
        })
      : null,
  });
}
function Gn(e) {
  const [t, n] = h.useState(() => e.repeatContext);
  return s.jsx(ve.Provider, {
    value: t,
    children: s.jsx(Q, {
      block: e.block,
      context: t,
      registeredComponents: e.registeredComponents,
      linkComponent: e.linkComponent,
    }),
  });
}
function Q(e) {
  var t, n, o;
  function i() {
    return Fn({
      block: e.block,
      context: e.context,
      registeredComponents: e.registeredComponents,
    });
  }
  function r() {
    return Nn({ block: e.block, context: e.context });
  }
  function a() {
    var d;
    return (d = e.block.repeat) != null && d.collection
      ? e.block
      : oe({
          block: e.block,
          localState: e.context.localState,
          rootState: e.context.rootState,
          rootSetState: e.context.rootSetState,
          context: e.context.context,
          shouldEvaluateBindings: !0,
        });
  }
  function c() {
    var d;
    return e.block.tagName === "a" ||
      ((d = a().properties) != null && d.href) ||
      a().href
      ? e.linkComponent || "a"
      : e.block.tagName || "div";
  }
  function u() {
    var d, f;
    if ((d = e.block.repeat) != null && d.collection)
      return !!((f = r == null ? void 0 : r()) != null && f.length);
    const b = "hide" in a() ? a().hide : !1;
    return ("show" in a() ? a().show : !0) && !b;
  }
  function m() {
    var d, f;
    return !((d = i == null ? void 0 : i()) != null && d.component) && !r()
      ? (f = a().children) != null
        ? f
        : []
      : [];
  }
  function p() {
    var d, f, b, y;
    return {
      blockChildren: (d = a().children) != null ? d : [],
      componentRef:
        (f = i == null ? void 0 : i()) == null ? void 0 : f.component,
      componentOptions: l(
        l(
          l(l(l({}, xn(a())), Ln(i(), a())), On(i(), e.context)),
          Wn(i(), e.linkComponent)
        ),
        An(i(), e.registeredComponents)
      ),
      context: e.context,
      linkComponent: e.linkComponent,
      registeredComponents: e.registeredComponents,
      builderBlock: a(),
      includeBlockProps:
        ((b = i == null ? void 0 : i()) == null ? void 0 : b.noWrap) === !0,
      isInteractive: !((y = i == null ? void 0 : i()) != null && y.isRSC),
    };
  }
  return (
    h.useEffect(() => {
      const d = a().id,
        f = a().animations;
      f && d && Bn(f.map((b) => g(l({}, b), { elementId: d })));
    }, []),
    s.jsx(s.Fragment, {
      children: u()
        ? s.jsxs(s.Fragment, {
            children: [
              s.jsx(Dn, { block: e.block, context: e.context }),
              (t = i == null ? void 0 : i()) != null && t.noWrap
                ? s.jsx(s.Fragment, {
                    children: s.jsx(Pe, {
                      componentRef: p().componentRef,
                      componentOptions: p().componentOptions,
                      blockChildren: p().blockChildren,
                      context: p().context,
                      registeredComponents: p().registeredComponents,
                      linkComponent: p().linkComponent,
                      builderBlock: p().builderBlock,
                      includeBlockProps: p().includeBlockProps,
                      isInteractive: p().isInteractive,
                    }),
                  })
                : s.jsx(s.Fragment, {
                    children: r()
                      ? s.jsx(s.Fragment, {
                          children:
                            (o = r()) == null
                              ? void 0
                              : o.map((d, f) =>
                                  s.jsx(
                                    Gn,
                                    {
                                      repeatContext: d.context,
                                      block: d.block,
                                      registeredComponents:
                                        e.registeredComponents,
                                      linkComponent: e.linkComponent,
                                    },
                                    f
                                  )
                                ),
                        })
                      : s.jsxs(zn, {
                          Wrapper: c(),
                          block: a(),
                          context: e.context,
                          children: [
                            s.jsx(Pe, {
                              componentRef: p().componentRef,
                              componentOptions: p().componentOptions,
                              blockChildren: p().blockChildren,
                              context: p().context,
                              registeredComponents: p().registeredComponents,
                              linkComponent: p().linkComponent,
                              builderBlock: p().builderBlock,
                              includeBlockProps: p().includeBlockProps,
                              isInteractive: p().isInteractive,
                            }),
                            (n = m()) == null
                              ? void 0
                              : n.map((d) =>
                                  s.jsx(
                                    Q,
                                    {
                                      block: d,
                                      registeredComponents:
                                        e.registeredComponents,
                                      linkComponent: e.linkComponent,
                                      context: e.context,
                                    },
                                    d.id
                                  )
                                ),
                          ],
                        }),
                  }),
            ],
          })
        : null,
    })
  );
}
function Yn(e) {
  function t() {
    var i;
    return (
      "builder-blocks" +
      ((i = e.blocks) != null && i.length ? "" : " no-blocks")
    );
  }
  function n() {
    var i, r;
    N() &&
      !((i = e.blocks) != null && i.length) &&
      ((r = window.parent) == null ||
        r.postMessage(
          {
            type: "builder.clickEmptyBlocks",
            data: { parentElementId: e.parent, dataPath: e.path },
          },
          "*"
        ));
  }
  function o() {
    var i, r;
    N() &&
      !((i = e.blocks) != null && i.length) &&
      ((r = window.parent) == null ||
        r.postMessage(
          {
            type: "builder.hoverEmptyBlocks",
            data: { parentElementId: e.parent, dataPath: e.path },
          },
          "*"
        ));
  }
  return s.jsxs(s.Fragment, {
    children: [
      s.jsx(
        e.BlocksWrapper,
        g(
          l(
            {
              className: t() + " props-blocks-wrapper-7cd1560e",
              "builder-path": e.path,
              "builder-parent-id": e.parent,
              style: e.styleProp,
              onClick: (i) => n(),
              onMouseEnter: (i) => o(),
              onKeyPress: (i) => n(),
            },
            e.BlocksWrapperProps
          ),
          { children: e.children }
        )
      ),
      s.jsx("style", {
        children: `.props-blocks-wrapper-7cd1560e {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}`,
      }),
    ],
  });
}
function L(e) {
  var t, n, o;
  const i = h.useContext(ve),
    r = h.useContext(tt);
  return s.jsx(Yn, {
    blocks: e.blocks,
    parent: e.parent,
    path: e.path,
    styleProp: e.styleProp,
    BlocksWrapper:
      ((t = e.context) == null ? void 0 : t.BlocksWrapper) || i.BlocksWrapper,
    BlocksWrapperProps:
      ((n = e.context) == null ? void 0 : n.BlocksWrapperProps) ||
      i.BlocksWrapperProps,
    children: e.blocks
      ? s.jsx(s.Fragment, {
          children:
            (o = e.blocks) == null
              ? void 0
              : o.map((a) =>
                  s.jsx(
                    Q,
                    {
                      block: a,
                      linkComponent: e.linkComponent,
                      context: e.context || i,
                      registeredComponents:
                        e.registeredComponents || r.registeredComponents,
                    },
                    a.id
                  )
                ),
        })
      : null,
  });
}
const Qn = (e) => `builder-columns ${e}-breakpoints`;
function Xn(e) {
  var t, n;
  const [o, i] = h.useState(() =>
      typeof e.space == "number" ? e.space || 0 : 20
    ),
    [r, a] = h.useState(() => e.columns || []),
    [c, u] = h.useState(() => e.stackColumnsAt || "tablet");
  function m(C) {
    return C.link ? e.builderLinkComponent || "a" : "div";
  }
  function p(C) {
    var B;
    return ((B = r[C]) == null ? void 0 : B.width) || 100 / r.length;
  }
  function d(C) {
    const B = (o * (r.length - 1)) / r.length;
    return `calc(${p(C)}% - ${B}px)`;
  }
  function f({ stackedStyle: C, desktopStyle: B }) {
    return c === "tablet" ? C : B;
  }
  function b({ stackedStyle: C, desktopStyle: B }) {
    return c === "never" ? B : C;
  }
  const [y, T] = h.useState(() =>
    e.stackColumnsAt === "never"
      ? "row"
      : e.reverseColumnsWhenStacked
      ? "column-reverse"
      : "column"
  );
  function I() {
    return {
      "--flex-dir": y,
      "--flex-dir-tablet": f({ stackedStyle: y, desktopStyle: "row" }),
    };
  }
  function S(C) {
    const B = C === 0 ? 0 : o,
      W = d(C),
      v = `${B}px`,
      x = "100%",
      w = 0;
    return {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      width: W,
      marginLeft: v,
      "--column-width-mobile": b({ stackedStyle: x, desktopStyle: W }),
      "--column-margin-left-mobile": b({ stackedStyle: w, desktopStyle: v }),
      "--column-width-tablet": f({ stackedStyle: x, desktopStyle: W }),
      "--column-margin-left-tablet": f({ stackedStyle: w, desktopStyle: v }),
    };
  }
  function $(C) {
    var B, W;
    return ut(
      ((W = (B = e.builderContext.content) == null ? void 0 : B.meta) == null
        ? void 0
        : W.breakpoints) || {}
    )[C].max;
  }
  function P() {
    return `
        @media (max-width: ${$("medium")}px) {
          .${e.builderBlock.id}-breakpoints {
            flex-direction: var(--flex-dir-tablet);
            align-items: stretch;
          }

          .${e.builderBlock.id}-breakpoints > .builder-column {
            width: var(--column-width-tablet) !important;
            margin-left: var(--column-margin-left-tablet) !important;
          }
        }

        @media (max-width: ${$("small")}px) {
          .${e.builderBlock.id}-breakpoints {
            flex-direction: var(--flex-dir);
            align-items: stretch;
          }

          .${e.builderBlock.id}-breakpoints > .builder-column {
            width: var(--column-width-mobile) !important;
            margin-left: var(--column-margin-left-mobile) !important;
          }
        },
      `;
  }
  function R(C, B) {
    return g(l({}, C.link ? { href: C.link } : {}), {
      [_()]: "builder-column",
      style: st(S(B)),
    });
  }
  return s.jsxs(s.Fragment, {
    children: [
      s.jsxs("div", {
        className:
          Qn((t = e.builderBlock) == null ? void 0 : t.id) + " div-bade6b34",
        style: I(),
        children: [
          s.jsx(ae, { id: "builderio-columns", styles: P() }),
          (n = e.columns) == null
            ? void 0
            : n.map((C, B) =>
                s.jsx(
                  xe,
                  {
                    TagName: m(C),
                    actionAttributes: {},
                    attributes: R(C, B),
                    children: s.jsx(L, {
                      path: `component.options.columns.${B}.blocks`,
                      parent: e.builderBlock.id,
                      styleProp: { flexGrow: "1" },
                      context: e.builderContext,
                      registeredComponents: e.builderComponents,
                      linkComponent: e.builderLinkComponent,
                      blocks: C.blocks,
                    }),
                  },
                  B
                )
              ),
        ],
      }),
      s.jsx("style", {
        children: `.div-bade6b34 {
  display: flex;
  line-height: normal;
}`,
      }),
    ],
  });
}
function Zn(e) {
  return s.jsx("span", { children: e.children });
}
function Re(e) {
  return e.replace(/http(s)?:/, "");
}
function eo(e = "", t, n) {
  const o = new RegExp("([?&])" + t + "=.*?(&|$)", "i"),
    i = e.indexOf("?") !== -1 ? "&" : "?";
  return e.match(o)
    ? e.replace(o, "$1" + t + "=" + encodeURIComponent(n) + "$2")
    : e + i + t + "=" + encodeURIComponent(n);
}
function to(e, t) {
  if (!e || !(e != null && e.match(/cdn\.shopify\.com/)) || !t) return e;
  if (t === "master") return Re(e);
  const n = e.match(
    /(_\d+x(\d+)?)?(\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?)/i
  );
  if (n) {
    const o = e.split(n[0]),
      i = n[3],
      r = t.match("x") ? t : `${t}x`;
    return Re(`${o[0]}_${r}${i}`);
  }
  return null;
}
function le(e) {
  if (!e) return e;
  const t = [100, 200, 400, 800, 1200, 1600, 2e3];
  if (e.match(/builder\.io/)) {
    let n = e;
    const o = Number(e.split("?width=")[1]);
    return (
      isNaN(o) || (n = `${n} ${o}w`),
      t
        .filter((i) => i !== o)
        .map((i) => `${eo(e, "width", i)} ${i}w`)
        .concat([n])
        .join(", ")
    );
  }
  return e.match(/cdn\.shopify\.com/)
    ? t
        .map((n) => [to(e, `${n}x${n}`), n])
        .filter(([n]) => !!n)
        .map(([n, o]) => `${n} ${o}w`)
        .concat([e])
        .join(", ")
    : e;
}
function no(e) {
  var t, n, o, i, r, a;
  function c() {
    var p;
    const d = e.image || e.src;
    if (!d || !(d.match(/builder\.io/) || d.match(/cdn\.shopify\.com/)))
      return e.srcset;
    if (
      e.srcset &&
      (p = e.image) != null &&
      p.includes("builder.io/api/v1/image")
    ) {
      if (!e.srcset.includes(e.image.split("?")[0]))
        return console.debug("Removed given srcset"), le(d);
    } else if (e.image && !e.srcset) return le(d);
    return le(d);
  }
  function u() {
    var p;
    return (p = c == null ? void 0 : c()) != null &&
      p.match(/builder\.io/) &&
      !e.noWebp
      ? c().replace(/\?/g, "?format=webp&")
      : "";
  }
  function m() {
    const p = {
      position: "absolute",
      height: "100%",
      width: "100%",
      left: "0px",
      top: "0px",
    };
    return e.aspectRatio ? p : void 0;
  }
  return s.jsxs(s.Fragment, {
    children: [
      s.jsxs(s.Fragment, {
        children: [
          s.jsxs("picture", {
            children: [
              u() ? s.jsx("source", { type: "image/webp", srcSet: u() }) : null,
              s.jsx("img", {
                loading: e.highPriority ? "eager" : "lazy",
                fetchPriority: e.highPriority ? "high" : "auto",
                alt: e.altText,
                role: e.altText ? void 0 : "presentation",
                style: l(
                  {
                    objectPosition: e.backgroundPosition || "center",
                    objectFit: e.backgroundSize || "cover",
                  },
                  m()
                ),
                className:
                  "builder-image" +
                  (e.className ? " " + e.className : "") +
                  " img-ac3dff4a",
                src: e.image,
                srcSet: c(),
                sizes: e.sizes,
              }),
            ],
          }),
          e.aspectRatio &&
          !(
            (n = (t = e.builderBlock) == null ? void 0 : t.children) != null &&
            n.length &&
            e.fitContent
          )
            ? s.jsx("div", {
                className: "builder-image-sizer div-ac3dff4a",
                style: { paddingTop: e.aspectRatio * 100 + "%" },
              })
            : null,
          (i = (o = e.builderBlock) == null ? void 0 : o.children) != null &&
          i.length &&
          e.fitContent
            ? s.jsx(s.Fragment, { children: e.children })
            : null,
          !e.fitContent &&
          (a = (r = e.builderBlock) == null ? void 0 : r.children) != null &&
          a.length
            ? s.jsx("div", {
                className: "div-ac3dff4a-2",
                children: e.children,
              })
            : null,
        ],
      }),
      s.jsx("style", {
        children: `.img-ac3dff4a {
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}.div-ac3dff4a {
  width: 100%;
  pointer-events: none;
  font-size: 0;
}.div-ac3dff4a-2 {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}`,
      }),
    ],
  });
}
function oo(e) {
  return s.jsx(
    "section",
    g(l({}, e.attributes), {
      style: {
        width: "100%",
        alignSelf: "stretch",
        flexGrow: 1,
        boxSizing: "border-box",
        maxWidth: e.maxWidth || 1200,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        marginLeft: "auto",
        marginRight: "auto",
      },
      children: e.children,
    })
  );
}
const se = {
    "@type": "@builder.io/sdk:Element",
    layerName: "Accordion item title",
    responsiveStyles: {
      large: {
        marginTop: "10px",
        position: "relative",
        display: "flex",
        alignItems: "stretch",
        flexDirection: "column",
        paddingBottom: "10px",
      },
    },
    children: [
      {
        "@type": "@builder.io/sdk:Element",
        responsiveStyles: {
          large: {
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
          },
        },
        component: {
          name: "Text",
          options: { text: "I am an accordion title. Click me!" },
        },
      },
    ],
  },
  ce = {
    "@type": "@builder.io/sdk:Element",
    layerName: "Accordion item detail",
    responsiveStyles: {
      large: {
        position: "relative",
        display: "flex",
        alignItems: "stretch",
        flexDirection: "column",
        marginTop: "10px",
        paddingBottom: "10px",
      },
    },
    children: [
      {
        "@type": "@builder.io/sdk:Element",
        responsiveStyles: {
          large: {
            paddingTop: "50px",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            paddingBottom: "50px",
          },
        },
        component: {
          name: "Text",
          options: { text: "I am an accordion detail, hello!" },
        },
      },
    ],
  },
  io = {
    name: "Builder:Accordion",
    canHaveChildren: !0,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2FagZ9n5CUKRfbL9t6CaJOyVSK4Es2%2Ffab6c1fd3fe542408cbdec078bca7f35",
    defaultStyles: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
    },
    inputs: [
      {
        name: "items",
        type: "list",
        broadcast: !0,
        subFields: [
          {
            name: "title",
            type: "uiBlocks",
            hideFromUI: !0,
            defaultValue: [se],
          },
          {
            name: "detail",
            type: "uiBlocks",
            hideFromUI: !0,
            defaultValue: [ce],
          },
        ],
        defaultValue: [
          { title: [se], detail: [ce] },
          { title: [se], detail: [ce] },
        ],
        showIf: (e) => !e.get("useChildrenForItems"),
      },
      {
        name: "oneAtATime",
        helperText:
          "Only allow opening one at a time (collapse all others when new item openned)",
        type: "boolean",
        defaultValue: !1,
      },
      {
        name: "grid",
        helperText: "Display as a grid",
        type: "boolean",
        defaultValue: !1,
      },
      {
        name: "gridRowWidth",
        helperText: "Display as a grid",
        type: "string",
        showIf: (e) => e.get("grid"),
        defaultValue: "25%",
      },
      {
        name: "useChildrenForItems",
        type: "boolean",
        helperText:
          "Use child elements for each slide, instead of the array. Useful for dynamically repeating items",
        advanced: !0,
        defaultValue: !1,
        onChange: (e) => {
          e.get("useChildrenForItems") === !0 && e.set("items", []);
        },
      },
    ],
    shouldReceiveBuilderProps: {
      builderBlock: !0,
      builderContext: !0,
      builderComponents: !0,
      builderLinkComponent: !0,
    },
  },
  Ve = (e) => e.toString();
function ro(e) {
  var t;
  const [n, o] = h.useState(() => []);
  function i() {
    return !!(e.grid || e.oneAtATime);
  }
  function r() {
    return l(
      { display: "flex", alignItems: "stretch", flexDirection: "column" },
      e.grid && {
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
      }
    );
  }
  function a() {
    return Object.fromEntries(
      Object.entries({
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        cursor: "pointer",
      }).filter(([b, y]) => y !== void 0)
    );
  }
  function c(f) {
    return `builder-accordion-title builder-accordion-title-${
      n.includes(f) ? "open" : "closed"
    }`;
  }
  function u(f) {
    return `builder-accordion-detail builder-accordion-detail-${
      n.includes(f) ? "open" : "closed"
    }`;
  }
  function m() {
    let f = null;
    if (e.grid && n.length && document) {
      const b = n[0];
      let y = document.querySelector(
        `.builder-accordion-title[data-index="${b}"]`
      );
      if (((f = b), y)) {
        let T = y.getBoundingClientRect();
        for (; (y = y && y.nextElementSibling); )
          if (y) {
            if (y.classList.contains("builder-accordion-detail")) continue;
            const I = y.getBoundingClientRect();
            if (I.left > T.left) {
              const S = parseInt(y.getAttribute("data-index") || "", 10);
              isNaN(S) || ((T = I), (f = S));
            } else break;
          }
      }
    }
    return typeof f == "number" && (f = f + 1), f;
  }
  function p() {
    const f = l(
      { order: typeof m() == "number" ? m() : void 0 },
      e.grid && { width: "100%" }
    );
    return Object.fromEntries(
      Object.entries(f).filter(([b, y]) => y !== void 0)
    );
  }
  function d(f) {
    n.includes(f)
      ? o(i() ? [] : n.filter((b) => b !== f))
      : o(i() ? [f] : n.concat(f));
  }
  return s.jsx("div", {
    className: "builder-accordion",
    style: r(),
    children:
      (t = e.items) == null
        ? void 0
        : t.map((f, b) =>
            s.jsxs(s.Fragment, {
              children: [
                s.jsx("div", {
                  className: c(b),
                  style: g(l({}, a()), {
                    width: e.grid ? e.gridRowWidth : void 0,
                    order: m() !== null ? Ve(b) : Ve(b + 1),
                  }),
                  "data-index": b,
                  onClick: (y) => d(b),
                  children: s.jsx(L, {
                    blocks: f.title,
                    path: `items.${b}.title`,
                    parent: e.builderBlock.id,
                    context: e.builderContext,
                    registeredComponents: e.builderComponents,
                    linkComponent: e.builderLinkComponent,
                  }),
                }),
                n.includes(b)
                  ? s.jsx("div", {
                      className: u(b),
                      style: p(),
                      children: s.jsx(L, {
                        blocks: f.detail,
                        path: `items.${b}.detail`,
                        parent: e.builderBlock.id,
                        context: e.builderContext,
                        registeredComponents: e.builderComponents,
                        linkComponent: e.builderLinkComponent,
                      }),
                    })
                  : null,
              ],
            })
          ),
  });
}
const ao = {
    name: "Core:Button",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2FIsxPKMo2gPRRKeakUztj1D6uqed2%2F81a15681c3e74df09677dfc57a615b13",
    defaultStyles: {
      appearance: "none",
      paddingTop: "15px",
      paddingBottom: "15px",
      paddingLeft: "25px",
      paddingRight: "25px",
      backgroundColor: "#000000",
      color: "white",
      borderRadius: "4px",
      textAlign: "center",
      cursor: "pointer",
    },
    inputs: [
      { name: "text", type: "text", defaultValue: "Click me!", bubble: !0 },
      { name: "link", type: "url", bubble: !0 },
      {
        name: "openLinkInNewTab",
        type: "boolean",
        defaultValue: !1,
        friendlyName: "Open link in new tab",
      },
    ],
    static: !0,
    noWrap: !0,
    shouldReceiveBuilderProps: {
      builderBlock: !1,
      builderContext: !1,
      builderComponents: !1,
      builderLinkComponent: !0,
    },
  },
  lo = {
    name: "Columns",
    isRSC: !0,
    inputs: [
      {
        name: "columns",
        type: "array",
        broadcast: !0,
        subFields: [
          {
            name: "blocks",
            type: "array",
            hideFromUI: !0,
            defaultValue: [
              {
                "@type": "@builder.io/sdk:Element",
                responsiveStyles: {
                  large: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    flexShrink: "0",
                    position: "relative",
                    marginTop: "30px",
                    textAlign: "center",
                    lineHeight: "normal",
                    height: "auto",
                    minHeight: "20px",
                    minWidth: "20px",
                    overflow: "hidden",
                  },
                },
                component: {
                  name: "Image",
                  options: {
                    image:
                      "https://builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    aspectRatio: 0.7004048582995948,
                  },
                },
              },
              {
                "@type": "@builder.io/sdk:Element",
                responsiveStyles: {
                  large: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    flexShrink: "0",
                    position: "relative",
                    marginTop: "30px",
                    textAlign: "center",
                    lineHeight: "normal",
                    height: "auto",
                  },
                },
                component: {
                  name: "Text",
                  options: { text: "<p>Enter some text...</p>" },
                },
              },
            ],
          },
          {
            name: "width",
            type: "number",
            hideFromUI: !0,
            helperText: "Width %, e.g. set to 50 to fill half of the space",
          },
          {
            name: "link",
            type: "url",
            helperText:
              "Optionally set a url that clicking this column will link to",
          },
        ],
        defaultValue: [
          {
            blocks: [
              {
                "@type": "@builder.io/sdk:Element",
                responsiveStyles: {
                  large: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    flexShrink: "0",
                    position: "relative",
                    marginTop: "30px",
                    textAlign: "center",
                    lineHeight: "normal",
                    height: "auto",
                    minHeight: "20px",
                    minWidth: "20px",
                    overflow: "hidden",
                  },
                },
                component: {
                  name: "Image",
                  options: {
                    image:
                      "https://builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    aspectRatio: 0.7004048582995948,
                  },
                },
              },
              {
                "@type": "@builder.io/sdk:Element",
                responsiveStyles: {
                  large: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    flexShrink: "0",
                    position: "relative",
                    marginTop: "30px",
                    textAlign: "center",
                    lineHeight: "normal",
                    height: "auto",
                  },
                },
                component: {
                  name: "Text",
                  options: { text: "<p>Enter some text...</p>" },
                },
              },
            ],
          },
          {
            blocks: [
              {
                "@type": "@builder.io/sdk:Element",
                responsiveStyles: {
                  large: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    flexShrink: "0",
                    position: "relative",
                    marginTop: "30px",
                    textAlign: "center",
                    lineHeight: "normal",
                    height: "auto",
                    minHeight: "20px",
                    minWidth: "20px",
                    overflow: "hidden",
                  },
                },
                component: {
                  name: "Image",
                  options: {
                    image:
                      "https://builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    aspectRatio: 0.7004048582995948,
                  },
                },
              },
              {
                "@type": "@builder.io/sdk:Element",
                responsiveStyles: {
                  large: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    flexShrink: "0",
                    position: "relative",
                    marginTop: "30px",
                    textAlign: "center",
                    lineHeight: "normal",
                    height: "auto",
                  },
                },
                component: {
                  name: "Text",
                  options: { text: "<p>Enter some text...</p>" },
                },
              },
            ],
          },
        ],
        onChange: (e) => {
          function t() {
            n.forEach((o) => {
              o.delete("width");
            });
          }
          const n = e.get("columns");
          Array.isArray(n) &&
            n.find((o) => o.get("width")) &&
            (n.find((o) => !o.get("width")) ||
              n.reduce((o, i) => o + i.get("width"), 0) !== 100) &&
            t();
        },
      },
      {
        name: "space",
        type: "number",
        defaultValue: 20,
        helperText: "Size of gap between columns",
        advanced: !0,
      },
      {
        name: "stackColumnsAt",
        type: "string",
        defaultValue: "tablet",
        helperText:
          "Convert horizontal columns to vertical at what device size",
        enum: ["tablet", "mobile", "never"],
        advanced: !0,
      },
      {
        name: "reverseColumnsWhenStacked",
        type: "boolean",
        defaultValue: !1,
        helperText:
          "When stacking columns for mobile devices, reverse the ordering",
        advanced: !0,
      },
    ],
    shouldReceiveBuilderProps: {
      builderBlock: !0,
      builderContext: !0,
      builderComponents: !0,
      builderLinkComponent: !0,
    },
  },
  so = {
    shouldReceiveBuilderProps: {
      builderBlock: !1,
      builderContext: !1,
      builderComponents: !1,
      builderLinkComponent: !1,
    },
    name: "Fragment",
    static: !0,
    hidden: !0,
    canHaveChildren: !0,
    noWrap: !0,
  },
  co = {
    name: "Image",
    static: !0,
    image:
      "https://firebasestorage.googleapis.com/v0/b/builder-3b0a2.appspot.com/o/images%2Fbaseline-insert_photo-24px.svg?alt=media&token=4e5d0ef4-f5e8-4e57-b3a9-38d63a9b9dc4",
    defaultStyles: {
      position: "relative",
      minHeight: "20px",
      minWidth: "20px",
      overflow: "hidden",
    },
    canHaveChildren: !0,
    inputs: [
      {
        name: "image",
        type: "file",
        bubble: !0,
        allowedFileTypes: ["jpeg", "jpg", "png", "svg", "webp"],
        required: !0,
        defaultValue:
          "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F72c80f114dc149019051b6852a9e3b7a",
        onChange: (e) => {
          e.delete("srcset"), e.delete("noWebp");
          function t(r, a = 6e4) {
            return new Promise((c, u) => {
              const m = document.createElement("img");
              let p = !1;
              (m.onload = () => {
                (p = !0), c(m);
              }),
                m.addEventListener("error", (d) => {
                  console.warn("Image load failed", d.error), u(d.error);
                }),
                (m.src = r),
                setTimeout(() => {
                  p || u(new Error("Image load timed out"));
                }, a);
            });
          }
          function n(r) {
            return Math.round(r * 1e3) / 1e3;
          }
          const o = e.get("image"),
            i = e.get("aspectRatio");
          if (
            (fetch(o)
              .then((r) => r.blob())
              .then((r) => {
                r.type.includes("svg") && e.set("noWebp", !0);
              }),
            o && (!i || i === 0.7041))
          )
            return t(o).then((r) => {
              const a = e.get("aspectRatio");
              e.get("image") === o &&
                (!a || a === 0.7041) &&
                r.width &&
                r.height &&
                (e.set("aspectRatio", n(r.height / r.width)),
                e.set("height", r.height),
                e.set("width", r.width));
            });
        },
      },
      {
        name: "backgroundSize",
        type: "text",
        defaultValue: "cover",
        enum: [
          {
            label: "contain",
            value: "contain",
            helperText: "The image should never get cropped",
          },
          {
            label: "cover",
            value: "cover",
            helperText: "The image should fill it's box, cropping when needed",
          },
        ],
      },
      {
        name: "backgroundPosition",
        type: "text",
        defaultValue: "center",
        enum: [
          "center",
          "top",
          "left",
          "right",
          "bottom",
          "top left",
          "top right",
          "bottom left",
          "bottom right",
        ],
      },
      {
        name: "altText",
        type: "string",
        helperText: "Text to display when the user has images off",
      },
      { name: "height", type: "number", hideFromUI: !0 },
      { name: "width", type: "number", hideFromUI: !0 },
      { name: "sizes", type: "string", hideFromUI: !0 },
      { name: "srcset", type: "string", hideFromUI: !0 },
      { name: "lazy", type: "boolean", defaultValue: !0, hideFromUI: !0 },
      {
        name: "fitContent",
        type: "boolean",
        helperText:
          "When child blocks are provided, fit to them instead of using the image's aspect ratio",
        defaultValue: !0,
      },
      {
        name: "highPriority",
        type: "boolean",
        advanced: !0,
        helperText:
          "Mark this image as high priority compared to other images on the page. This prevents lazy loading of the image and tells the browser to load this image before others on the page.",
      },
      {
        name: "aspectRatio",
        type: "number",
        helperText:
          "This is the ratio of height/width, e.g. set to 1.5 for a 300px wide and 200px tall photo. Set to 0 to not force the image to maintain it's aspect ratio",
        advanced: !0,
        defaultValue: 0.7041,
      },
    ],
    shouldReceiveBuilderProps: {
      builderBlock: !0,
      builderContext: !1,
      builderComponents: !1,
      builderLinkComponent: !1,
    },
  },
  uo = {
    shouldReceiveBuilderProps: {
      builderBlock: !1,
      builderContext: !1,
      builderComponents: !1,
      builderLinkComponent: !1,
    },
    name: "Core:Section",
    static: !0,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2FIsxPKMo2gPRRKeakUztj1D6uqed2%2F682efef23ace49afac61748dd305c70a",
    inputs: [
      { name: "maxWidth", type: "number", defaultValue: 1200 },
      {
        name: "lazyLoad",
        type: "boolean",
        defaultValue: !1,
        advanced: !0,
        description: "Only render this section when in view",
      },
    ],
    defaultStyles: {
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "50px",
      paddingBottom: "50px",
      marginTop: "0px",
      width: "100vw",
      marginLeft: "calc(50% - 50vw)",
    },
    canHaveChildren: !0,
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        responsiveStyles: { large: { textAlign: "center" } },
        component: {
          name: "Text",
          options: {
            text: "<p><b>I am a section! My content keeps from getting too wide, so that it's easy to read even on big screens.</b></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>",
          },
        },
      },
    ],
  },
  po = {
    name: "Slot",
    isRSC: !0,
    description:
      "Allow child blocks to be inserted into this content when used as a Symbol",
    docsLink: "https://www.builder.io/c/docs/symbols-with-blocks",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F3aad6de36eae43b59b52c85190fdef56",
    inputs: [
      { name: "name", type: "string", required: !0, defaultValue: "children" },
    ],
    shouldReceiveBuilderProps: {
      builderBlock: !1,
      builderContext: !0,
      builderComponents: !1,
      builderLinkComponent: !1,
    },
  };
function mo(e) {
  var t, n, o;
  return s.jsx(
    "div",
    g(
      l(
        { style: { pointerEvents: "auto" } },
        !((t = e.builderContext.context) != null && t.symbolId) && {
          "builder-slot": e.name,
        }
      ),
      {
        children: s.jsx(L, {
          parent: (n = e.builderContext.context) == null ? void 0 : n.symbolId,
          path: `symbol.data.${e.name}`,
          context: e.builderContext,
          blocks: (o = e.builderContext.rootState) == null ? void 0 : o[e.name],
        }),
      }
    )
  );
}
const fo = {
    name: "Symbol",
    noWrap: !0,
    static: !0,
    isRSC: !0,
    inputs: [
      { name: "symbol", type: "uiSymbol" },
      {
        name: "dataOnly",
        helperText: "Make this a data symbol that doesn't display any UI",
        type: "boolean",
        defaultValue: !1,
        advanced: !0,
        hideFromUI: !0,
      },
      {
        name: "inheritState",
        helperText: "Inherit the parent component state and data",
        type: "boolean",
        defaultValue: !1,
        advanced: !0,
      },
      {
        name: "renderToLiquid",
        helperText:
          "Render this symbols contents to liquid. Turn off to fetch with javascript and use custom targeting",
        type: "boolean",
        defaultValue: !1,
        advanced: !0,
        hideFromUI: !0,
      },
      { name: "useChildren", hideFromUI: !0, type: "boolean" },
    ],
    shouldReceiveBuilderProps: {
      builderBlock: !0,
      builderContext: !0,
      builderComponents: !0,
      builderLinkComponent: !0,
    },
  },
  ue = {
    "@type": "@builder.io/sdk:Element",
    responsiveStyles: {
      large: {
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "10px",
        paddingBottom: "10px",
        minWidth: "100px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        userSelect: "none",
      },
    },
    component: { name: "Text", options: { text: "New tab" } },
  },
  de = {
    "@type": "@builder.io/sdk:Element",
    responsiveStyles: {
      large: {
        height: "200px",
        display: "flex",
        marginTop: "20px",
        flexDirection: "column",
      },
    },
    component: { name: "Text", options: { text: "New tab content " } },
  },
  bo = {
    name: "Builder: Tabs",
    inputs: [
      {
        name: "tabs",
        type: "list",
        broadcast: !0,
        subFields: [
          {
            name: "label",
            type: "uiBlocks",
            hideFromUI: !0,
            defaultValue: [ue],
          },
          {
            name: "content",
            type: "uiBlocks",
            hideFromUI: !0,
            defaultValue: [de],
          },
        ],
        defaultValue: [
          {
            label: [
              g(l({}, ue), {
                component: { name: "Text", options: { text: "Tab 1" } },
              }),
            ],
            content: [
              g(l({}, de), {
                component: { name: "Text", options: { text: "Tab 1 content" } },
              }),
            ],
          },
          {
            label: [
              g(l({}, ue), {
                component: { name: "Text", options: { text: "Tab 2" } },
              }),
            ],
            content: [
              g(l({}, de), {
                component: { name: "Text", options: { text: "Tab 2 content" } },
              }),
            ],
          },
        ],
      },
      {
        name: "activeTabStyle",
        type: "uiStyle",
        helperText: "CSS styles for the active tab",
        defaultValue: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
      },
      {
        name: "defaultActiveTab",
        type: "number",
        helperText:
          'Default tab to open to. Set to "1" for the first tab, "2" for the second, or choose "0" for none',
        defaultValue: 1,
        advanced: !0,
      },
      {
        name: "collapsible",
        type: "boolean",
        helperText:
          "If on, clicking an open tab closes it so no tabs are active",
        defaultValue: !1,
        advanced: !0,
      },
      {
        name: "tabHeaderLayout",
        type: "enum",
        helperText:
          "Change the layout of the tab headers (uses justify-content)",
        defaultValue: "flex-start",
        enum: [
          { label: "Center", value: "center" },
          { label: "Space between", value: "space-between" },
          { label: "Space around", value: "space-around" },
          { label: "Left", value: "flex-start" },
          { label: "Right", value: "flex-end" },
        ],
      },
    ],
    shouldReceiveBuilderProps: {
      builderBlock: !0,
      builderContext: !0,
      builderComponents: !0,
      builderLinkComponent: !0,
    },
  };
function ho(e) {
  var t;
  const [n, o] = h.useState(() =>
    e.defaultActiveTab ? e.defaultActiveTab - 1 : 0
  );
  function i(a) {
    return e.tabs && e.tabs[a].content;
  }
  function r(a) {
    a === n && e.collapsible ? o(-1) : o(a);
  }
  return s.jsxs("div", {
    children: [
      s.jsx("div", {
        className: "builder-tabs-wrap",
        style: {
          display: "flex",
          flexDirection: "row",
          justifyContent: e.tabHeaderLayout || "flex-start",
          overflow: "auto",
        },
        children:
          (t = e.tabs) == null
            ? void 0
            : t.map((a, c) =>
                s.jsx(
                  "span",
                  {
                    className: `builder-tab-wrap ${
                      n === c ? "builder-tab-active" : ""
                    }`,
                    style: l({}, n === c ? e.activeTabStyle : {}),
                    onClick: (u) => r(c),
                    children: s.jsx(L, {
                      parent: e.builderBlock.id,
                      path: `component.options.tabs.${c}.label`,
                      blocks: a.label,
                      context: e.builderContext,
                      registeredComponents: e.builderComponents,
                      linkComponent: e.builderLinkComponent,
                    }),
                  },
                  c
                )
              ),
      }),
      i(n)
        ? s.jsx("div", {
            children: s.jsx(L, {
              parent: e.builderBlock.id,
              path: `component.options.tabs.${n}.content`,
              blocks: i(n),
              context: e.builderContext,
              registeredComponents: e.builderComponents,
              linkComponent: e.builderLinkComponent,
            }),
          })
        : null,
    ],
  });
}
const go = {
  shouldReceiveBuilderProps: {
    builderBlock: !1,
    builderContext: !1,
    builderComponents: !1,
    builderLinkComponent: !1,
  },
  name: "Text",
  static: !0,
  isRSC: !0,
  image:
    "https://firebasestorage.googleapis.com/v0/b/builder-3b0a2.appspot.com/o/images%2Fbaseline-text_fields-24px%20(1).svg?alt=media&token=12177b73-0ee3-42ca-98c6-0dd003de1929",
  inputs: [
    {
      name: "text",
      type: "html",
      required: !0,
      autoFocus: !0,
      bubble: !0,
      defaultValue: "Enter some text...",
    },
  ],
  defaultStyles: { lineHeight: "normal", height: "auto", textAlign: "center" },
};
function xo(e) {
  var t;
  return s.jsx("div", {
    className: "builder-text",
    dangerouslySetInnerHTML: {
      __html: ((t = e.text) == null ? void 0 : t.toString()) || "",
    },
    style: { outline: "none" },
  });
}
const vo = {
  shouldReceiveBuilderProps: {
    builderBlock: !1,
    builderContext: !1,
    builderComponents: !1,
    builderLinkComponent: !1,
  },
  name: "Custom Code",
  static: !0,
  requiredPermissions: ["editCode"],
  inputs: [
    {
      name: "code",
      type: "html",
      required: !0,
      defaultValue: "<p>Hello there, I am custom HTML code!</p>",
      code: !0,
    },
    {
      name: "replaceNodes",
      type: "boolean",
      helperText: "Preserve server rendered dom nodes",
      advanced: !0,
    },
    {
      name: "scriptsClientOnly",
      type: "boolean",
      defaultValue: !1,
      helperText:
        "Only print and run scripts on the client. Important when scripts influence DOM that could be replaced when client loads",
      advanced: !0,
    },
  ],
};
function yo(e) {
  const t = h.useRef(null),
    [n, o] = h.useState(() => []),
    [i, r] = h.useState(() => []);
  return (
    h.useEffect(() => {
      var a;
      if (
        !((a = t.current) != null && a.getElementsByTagName) ||
        typeof window == "undefined"
      )
        return;
      const c = t.current.getElementsByTagName("script");
      for (let u = 0; u < c.length; u++) {
        const m = c[u];
        if (m.src) {
          if (n.includes(m.src)) continue;
          n.push(m.src);
          const p = document.createElement("script");
          (p.async = !0), (p.src = m.src), document.head.appendChild(p);
        } else if (
          !m.type ||
          [
            "text/javascript",
            "application/javascript",
            "application/ecmascript",
          ].includes(m.type)
        ) {
          if (i.includes(m.innerText)) continue;
          try {
            i.push(m.innerText), new Function(m.innerText)();
          } catch (p) {
            console.warn("`CustomCode`: Error running script:", p);
          }
        }
      }
    }, []),
    s.jsx("div", {
      ref: t,
      className:
        "builder-custom-code" + (e.replaceNodes ? " replace-nodes" : ""),
      dangerouslySetInnerHTML: { __html: e.code },
    })
  );
}
const ko = {
    shouldReceiveBuilderProps: {
      builderBlock: !1,
      builderContext: !1,
      builderComponents: !1,
      builderLinkComponent: !1,
    },
    name: "Embed",
    static: !0,
    inputs: [
      {
        name: "url",
        type: "url",
        required: !0,
        defaultValue: "",
        helperText: "e.g. enter a youtube url, google map, etc",
      },
      {
        name: "content",
        type: "html",
        defaultValue:
          '<div style="padding: 20px; text-align: center">(Choose an embed URL)<div>',
        hideFromUI: !0,
      },
    ],
  },
  So = ["text/javascript", "application/javascript", "application/ecmascript"],
  Co = (e) => So.includes(e.type);
function wo(e) {
  const t = h.useRef(null),
    [n, o] = h.useState(() => []),
    [i, r] = h.useState(() => []),
    [a, c] = h.useState(() => !1);
  function u() {
    if (!t.current || !t.current.getElementsByTagName) return;
    const m = t.current.getElementsByTagName("script");
    for (let p = 0; p < m.length; p++) {
      const d = m[p];
      if (d.src && !n.includes(d.src)) {
        n.push(d.src);
        const f = document.createElement("script");
        (f.async = !0), (f.src = d.src), document.head.appendChild(f);
      } else if (Co(d) && !i.includes(d.innerText))
        try {
          i.push(d.innerText), new Function(d.innerText)();
        } catch (f) {
          console.warn("`Embed`: Error running script:", f);
        }
    }
  }
  return (
    h.useEffect(() => {
      t.current && !a && (c(!0), u());
    }, [t.current, a]),
    s.jsx("div", {
      className: "builder-embed",
      ref: t,
      dangerouslySetInnerHTML: { __html: e.content },
    })
  );
}
const To = {
    name: "Form:Form",
    defaults: {
      responsiveStyles: { large: { marginTop: "15px", paddingBottom: "15px" } },
    },
    image:
      "https://cdn.builder.io/api/v1/image/assets%2FIsxPKMo2gPRRKeakUztj1D6uqed2%2Fef36d2a846134910b64b88e6d18c5ca5",
    inputs: [
      {
        name: "sendSubmissionsTo",
        type: "string",
        enum: [
          {
            label: "Send to email",
            value: "email",
            helperText:
              "Send form submissions to the email address of your choosing",
          },
          {
            label: "Custom",
            value: "custom",
            helperText:
              "Handle where the form requests go manually with a little code, e.g. to your own custom backend",
          },
        ],
        defaultValue: "email",
      },
      {
        name: "sendSubmissionsToEmail",
        type: "string",
        required: !0,
        defaultValue: "your@email.com",
        showIf: 'options.get("sendSubmissionsTo") === "email"',
      },
      {
        name: "sendWithJs",
        type: "boolean",
        helperText: "Set to false to use basic html form action",
        defaultValue: !0,
        showIf: 'options.get("sendSubmissionsTo") === "custom"',
      },
      { name: "name", type: "string", defaultValue: "My form" },
      {
        name: "action",
        type: "string",
        helperText: "URL to send the form data to",
        showIf: 'options.get("sendSubmissionsTo") === "custom"',
      },
      {
        name: "contentType",
        type: "string",
        defaultValue: "application/json",
        advanced: !0,
        enum: [
          "application/json",
          "multipart/form-data",
          "application/x-www-form-urlencoded",
        ],
        showIf:
          'options.get("sendSubmissionsTo") === "custom" && options.get("sendWithJs") === true',
      },
      {
        name: "method",
        type: "string",
        showIf: 'options.get("sendSubmissionsTo") === "custom"',
        defaultValue: "POST",
        advanced: !0,
      },
      {
        name: "previewState",
        type: "string",
        enum: ["unsubmitted", "sending", "success", "error"],
        defaultValue: "unsubmitted",
        helperText:
          'Choose a state to edit, e.g. choose "success" to show what users see on success and edit the message',
        showIf:
          'options.get("sendSubmissionsTo") !== "zapier" && options.get("sendWithJs") === true',
      },
      {
        name: "successUrl",
        type: "url",
        helperText:
          "Optional URL to redirect the user to on form submission success",
        showIf:
          'options.get("sendSubmissionsTo") !== "zapier" && options.get("sendWithJs") === true',
      },
      {
        name: "resetFormOnSubmit",
        type: "boolean",
        showIf:
          "options.get('sendSubmissionsTo') === 'custom' && options.get('sendWithJs') === true",
        advanced: !0,
      },
      {
        name: "successMessage",
        type: "uiBlocks",
        hideFromUI: !0,
        defaultValue: [
          {
            "@type": "@builder.io/sdk:Element",
            responsiveStyles: { large: { marginTop: "10px" } },
            component: {
              name: "Text",
              options: { text: "<span>Thanks!</span>" },
            },
          },
        ],
      },
      { name: "validate", type: "boolean", defaultValue: !0, advanced: !0 },
      {
        name: "errorMessagePath",
        type: "text",
        advanced: !0,
        helperText:
          'Path to where to get the error message from in a JSON response to display to the user, e.g. "error.message" for a response like { "error": { "message": "this username is taken" }}',
      },
      {
        name: "errorMessage",
        type: "uiBlocks",
        hideFromUI: !0,
        defaultValue: [
          {
            "@type": "@builder.io/sdk:Element",
            responsiveStyles: { large: { marginTop: "10px" } },
            bindings: {
              "component.options.text":
                "state.formErrorMessage || block.component.options.text",
            },
            component: {
              name: "Text",
              options: {
                text: "<span>Form submission error :( Please check your answers and try again</span>",
              },
            },
          },
        ],
      },
      {
        name: "sendingMessage",
        type: "uiBlocks",
        hideFromUI: !0,
        defaultValue: [
          {
            "@type": "@builder.io/sdk:Element",
            responsiveStyles: { large: { marginTop: "10px" } },
            component: {
              name: "Text",
              options: { text: "<span>Sending...</span>" },
            },
          },
        ],
      },
      {
        name: "customHeaders",
        type: "map",
        valueType: { type: "string" },
        advanced: !0,
        showIf:
          'options.get("sendSubmissionsTo") === "custom" && options.get("sendWithJs") === true',
      },
    ],
    noWrap: !0,
    canHaveChildren: !0,
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        responsiveStyles: { large: { marginTop: "10px" } },
        component: {
          name: "Text",
          options: { text: "<span>Enter your name</span>" },
        },
      },
      {
        "@type": "@builder.io/sdk:Element",
        responsiveStyles: { large: { marginTop: "10px" } },
        component: {
          name: "Form:Input",
          options: { name: "name", placeholder: "Jane Doe" },
        },
      },
      {
        "@type": "@builder.io/sdk:Element",
        responsiveStyles: { large: { marginTop: "10px" } },
        component: {
          name: "Text",
          options: { text: "<span>Enter your email</span>" },
        },
      },
      {
        "@type": "@builder.io/sdk:Element",
        responsiveStyles: { large: { marginTop: "10px" } },
        component: {
          name: "Form:Input",
          options: { name: "email", placeholder: "jane@doe.com" },
        },
      },
      {
        "@type": "@builder.io/sdk:Element",
        responsiveStyles: { large: { marginTop: "10px" } },
        component: { name: "Form:SubmitButton", options: { text: "Submit" } },
      },
    ],
    shouldReceiveBuilderProps: {
      builderBlock: !0,
      builderContext: !0,
      builderComponents: !0,
      builderLinkComponent: !0,
    },
  },
  Io = [
    "production",
    "qa",
    "test",
    "development",
    "dev",
    "cdn-qa",
    "cloud",
    "fast",
    "cdn2",
    "cdn-prod",
  ],
  jo = () => {
    const e = "production";
    return Io.includes(e) ? e : "production";
  },
  Bo = (e, t, n) => {
    const o = String.prototype.split
      .call(t, /[,[\].]+?/)
      .filter(Boolean)
      .reduce((i, r) => (i != null ? i[r] : i), e);
    return o === void 0 || o === e ? n : o;
  };
function Eo(e) {
  var t, n;
  const o = h.useRef(null),
    [i, r] = h.useState(() => "unsubmitted"),
    [a, c] = h.useState(() => null),
    [u, m] = h.useState(() => "");
  function p(b) {
    var y, T;
    const I = l(l({}, e.builderContext.rootState), b);
    e.builderContext.rootSetState
      ? (T = (y = e.builderContext).rootSetState) == null || T.call(y, I)
      : (e.builderContext.rootState = I);
  }
  function d() {
    return (N() && e.previewState) || i;
  }
  function f(b) {
    var y;
    const T = e.sendWithJs || e.sendSubmissionsTo === "email";
    if (e.sendSubmissionsTo === "zapier") b.preventDefault();
    else if (T) {
      if (!(e.action || e.sendSubmissionsTo === "email")) {
        b.preventDefault();
        return;
      }
      b.preventDefault();
      const I = b.currentTarget || b.target,
        S = e.customHeaders || {};
      let $;
      const P = new FormData(I),
        R = Array.from(I.querySelectorAll("input,select,textarea"))
          .filter((v) => !!v.name)
          .map((v) => {
            let x;
            const w = v.name;
            if (v instanceof HTMLInputElement)
              if (v.type === "radio") {
                if (v.checked) return (x = v.name), { key: w, value: x };
              } else if (v.type === "checkbox") x = v.checked;
              else if (v.type === "number" || v.type === "range") {
                const k = v.valueAsNumber;
                isNaN(k) || (x = k);
              } else v.type === "file" ? (x = v.files) : (x = v.value);
            else x = v.value;
            return { key: w, value: x };
          });
      let C = e.contentType;
      if (
        (e.sendSubmissionsTo === "email" && (C = "multipart/form-data"),
        Array.from(R).forEach(({ value: v }) => {
          (v instanceof File ||
            (Array.isArray(v) && v[0] instanceof File) ||
            v instanceof FileList) &&
            (C = "multipart/form-data");
        }),
        C !== "application/json")
      )
        $ = P;
      else {
        const v = {};
        Array.from(R).forEach(({ value: x, key: w }) => {
          ot(v, w, x);
        }),
          ($ = JSON.stringify(v));
      }
      C &&
        C !== "multipart/form-data" &&
        ((T && (y = e.action) != null && y.includes("zapier.com")) ||
          (S["content-type"] = C));
      const B = new CustomEvent("presubmit", { detail: { body: $ } });
      if (o.current && (o.current.dispatchEvent(B), B.defaultPrevented)) return;
      r("sending");
      const W = `${
        jo() === "dev" ? "http://localhost:5000" : "https://builder.io"
      }/api/v1/form-submit?apiKey=${e.builderContext.apiKey}&to=${btoa(
        e.sendSubmissionsToEmail || ""
      )}&name=${encodeURIComponent(e.name || "")}`;
      fetch(e.sendSubmissionsTo === "email" ? W : e.action, {
        body: $,
        headers: S,
        method: e.method || "post",
      }).then(
        (v) =>
          F(this, null, function* () {
            let x;
            const w = v.headers.get("content-type");
            if (
              (w && w.indexOf("application/json") !== -1
                ? (x = yield v.json())
                : (x = yield v.text()),
              !v.ok && e.errorMessagePath)
            ) {
              let k = Bo(x, e.errorMessagePath);
              k &&
                (typeof k != "string" && (k = JSON.stringify(k)),
                m(k),
                p({ formErrorMessage: k }));
            }
            if ((c(x), r(v.ok ? "success" : "error"), v.ok)) {
              const k = new CustomEvent("submit:success", {
                detail: { res: v, body: x },
              });
              if (o.current) {
                if ((o.current.dispatchEvent(k), k.defaultPrevented)) return;
                e.resetFormOnSubmit !== !1 && o.current.reset();
              }
              if (e.successUrl)
                if (o.current) {
                  const j = new CustomEvent("route", {
                    detail: { url: e.successUrl },
                  });
                  o.current.dispatchEvent(j),
                    j.defaultPrevented || (location.href = e.successUrl);
                } else location.href = e.successUrl;
            }
          }),
        (v) => {
          const x = new CustomEvent("submit:error", { detail: { error: v } });
          (o.current && (o.current.dispatchEvent(x), x.defaultPrevented)) ||
            (c(v), r("error"));
        }
      );
    }
  }
  return s.jsxs(s.Fragment, {
    children: [
      " ",
      s.jsxs(
        "form",
        g(
          l(
            {
              validate: e.validate,
              ref: o,
              action: !e.sendWithJs && e.action,
              method: e.method,
              name: e.name,
              onSubmit: (b) => f(b),
            },
            e.attributes
          ),
          {
            children: [
              e.builderBlock && e.builderBlock.children
                ? s.jsx(s.Fragment, {
                    children:
                      (n =
                        (t = e.builderBlock) == null ? void 0 : t.children) ==
                      null
                        ? void 0
                        : n.map((b, y) =>
                            s.jsx(
                              Q,
                              {
                                block: b,
                                context: e.builderContext,
                                registeredComponents: e.builderComponents,
                                linkComponent: e.builderLinkComponent,
                              },
                              `form-block-${y}`
                            )
                          ),
                  })
                : null,
              d() === "error"
                ? s.jsx(L, {
                    path: "errorMessage",
                    blocks: e.errorMessage,
                    context: e.builderContext,
                  })
                : null,
              d() === "sending"
                ? s.jsx(L, {
                    path: "sendingMessage",
                    blocks: e.sendingMessage,
                    context: e.builderContext,
                  })
                : null,
              d() === "error" && a
                ? s.jsx("pre", {
                    className: "builder-form-error-text pre-3a20f614",
                    children: JSON.stringify(a, null, 2),
                  })
                : null,
              d() === "success"
                ? s.jsx(L, {
                    path: "successMessage",
                    blocks: e.successMessage,
                    context: e.builderContext,
                  })
                : null,
            ],
          }
        )
      ),
      " ",
      s.jsx("style", {
        children:
          ".pre-3a20f614 {   padding: 10px;   color: red;   text-align: center; }",
      }),
      " ",
    ],
  });
}
const $o = {
  shouldReceiveBuilderProps: {
    builderBlock: !1,
    builderContext: !1,
    builderComponents: !1,
    builderLinkComponent: !1,
  },
  name: "Form:Input",
  image:
    "https://cdn.builder.io/api/v1/image/assets%2FIsxPKMo2gPRRKeakUztj1D6uqed2%2Fad6f37889d9e40bbbbc72cdb5875d6ca",
  inputs: [
    {
      name: "type",
      type: "text",
      enum: [
        "text",
        "number",
        "email",
        "url",
        "checkbox",
        "radio",
        "range",
        "date",
        "datetime-local",
        "search",
        "tel",
        "time",
        "file",
        "month",
        "week",
        "password",
        "color",
        "hidden",
      ],
      defaultValue: "text",
    },
    {
      name: "name",
      type: "string",
      required: !0,
      helperText:
        'Every input in a form needs a unique name describing what it takes, e.g. "email"',
    },
    {
      name: "placeholder",
      type: "string",
      defaultValue: "Hello there",
      helperText: "Text to display when there is no value",
    },
    { name: "defaultValue", type: "string" },
    { name: "value", type: "string", advanced: !0 },
    {
      name: "required",
      type: "boolean",
      helperText: "Is this input required to be filled out to submit a form",
      defaultValue: !1,
    },
  ],
  noWrap: !0,
  static: !0,
  defaultStyles: {
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    borderRadius: "3px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#ccc",
  },
};
function Po(e) {
  return h.createElement(
    "input",
    g(l({}, e.attributes), {
      key: N() && e.defaultValue ? e.defaultValue : "default-key",
      placeholder: e.placeholder,
      type: e.type,
      name: e.name,
      value: e.value,
      defaultValue: e.defaultValue,
      required: e.required,
    })
  );
}
const Ro = {
  shouldReceiveBuilderProps: {
    builderBlock: !1,
    builderContext: !1,
    builderComponents: !1,
    builderLinkComponent: !1,
  },
  name: "Form:Select",
  image:
    "https://cdn.builder.io/api/v1/image/assets%2FIsxPKMo2gPRRKeakUztj1D6uqed2%2F83acca093fb24aaf94dee136e9a4b045",
  defaultStyles: { alignSelf: "flex-start" },
  inputs: [
    {
      name: "options",
      type: "list",
      required: !0,
      subFields: [
        { name: "value", type: "text", required: !0 },
        { name: "name", type: "text" },
      ],
      defaultValue: [{ value: "option 1" }, { value: "option 2" }],
    },
    {
      name: "name",
      type: "string",
      required: !0,
      helperText:
        'Every select in a form needs a unique name describing what it gets, e.g. "email"',
    },
    { name: "defaultValue", type: "string" },
    { name: "value", type: "string", advanced: !0 },
    { name: "required", type: "boolean", defaultValue: !1 },
  ],
  static: !0,
  noWrap: !0,
};
function Vo(e) {
  var t;
  return h.createElement(
    "select",
    g(l({}, e.attributes), {
      value: e.value,
      key: N() && e.defaultValue ? e.defaultValue : "default-key",
      defaultValue: e.defaultValue,
      name: e.name,
      required: e.required,
    }),
    (t = e.options) == null
      ? void 0
      : t.map((n, o) =>
          s.jsx(
            "option",
            { value: n.value, children: n.name || n.value },
            `${n.name}-${o}`
          )
        )
  );
}
const Fo = {
  shouldReceiveBuilderProps: {
    builderBlock: !1,
    builderContext: !1,
    builderComponents: !1,
    builderLinkComponent: !1,
  },
  name: "Form:SubmitButton",
  image:
    "https://cdn.builder.io/api/v1/image/assets%2FIsxPKMo2gPRRKeakUztj1D6uqed2%2Fdf2820ffed1f4349a94c40b3221f5b98",
  defaultStyles: {
    appearance: "none",
    paddingTop: "15px",
    paddingBottom: "15px",
    paddingLeft: "25px",
    paddingRight: "25px",
    backgroundColor: "#3898EC",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
  },
  inputs: [{ name: "text", type: "text", defaultValue: "Click me" }],
  static: !0,
  noWrap: !0,
};
function No(e) {
  return s.jsx(
    "button",
    g(l({ type: "submit" }, e.attributes), { children: e.text })
  );
}
const Wo = {
  shouldReceiveBuilderProps: {
    builderBlock: !1,
    builderContext: !1,
    builderComponents: !1,
    builderLinkComponent: !1,
  },
  name: "Form:TextArea",
  image:
    "https://cdn.builder.io/api/v1/image/assets%2FIsxPKMo2gPRRKeakUztj1D6uqed2%2Ff74a2f3de58c4c3e939204e5b6b8f6c3",
  inputs: [
    { advanced: !0, name: "value", type: "string" },
    {
      name: "name",
      type: "string",
      required: !0,
      helperText:
        'Every input in a form needs a unique name describing what it gets, e.g. "email"',
    },
    { name: "defaultValue", type: "string" },
    { name: "placeholder", type: "string", defaultValue: "Hello there" },
    { name: "required", type: "boolean", defaultValue: !1 },
  ],
  defaultStyles: {
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    borderRadius: "3px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#ccc",
  },
  static: !0,
  noWrap: !0,
};
function Ao(e) {
  return s.jsx(
    "textarea",
    g(l({}, e.attributes), {
      placeholder: e.placeholder,
      name: e.name,
      value: e.value,
      defaultValue: e.defaultValue,
      required: e.required,
    })
  );
}
const Lo = {
  shouldReceiveBuilderProps: {
    builderBlock: !1,
    builderContext: !1,
    builderComponents: !1,
    builderLinkComponent: !1,
  },
  name: "Raw:Img",
  hideFromInsertMenu: !0,
  image:
    "https://firebasestorage.googleapis.com/v0/b/builder-3b0a2.appspot.com/o/images%2Fbaseline-insert_photo-24px.svg?alt=media&token=4e5d0ef4-f5e8-4e57-b3a9-38d63a9b9dc4",
  inputs: [
    {
      name: "image",
      bubble: !0,
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png", "svg", "gif", "webp"],
      required: !0,
    },
  ],
  noWrap: !0,
  static: !0,
};
function Oo(e) {
  return s.jsx(
    "img",
    l(
      {
        style: {
          objectFit: e.backgroundSize || "cover",
          objectPosition: e.backgroundPosition || "center",
        },
        alt: e.altText,
        src: e.imgSrc || e.image,
      },
      e.attributes
    ),
    (N() && e.imgSrc) || "default-key"
  );
}
const Do = {
  name: "Video",
  canHaveChildren: !0,
  defaultStyles: { minHeight: "20px", minWidth: "20px" },
  image:
    "https://firebasestorage.googleapis.com/v0/b/builder-3b0a2.appspot.com/o/images%2Fbaseline-videocam-24px%20(1).svg?alt=media&token=49a84e4a-b20e-4977-a650-047f986874bb",
  inputs: [
    {
      name: "video",
      type: "file",
      allowedFileTypes: ["mp4"],
      bubble: !0,
      defaultValue:
        "https://cdn.builder.io/o/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fd27731a526464deba0016216f5f9e570%2Fcompressed?apiKey=YJIGb4i01jvw0SRdL5Bt&token=d27731a526464deba0016216f5f9e570&alt=media&optimized=true",
      required: !0,
    },
    {
      name: "posterImage",
      type: "file",
      allowedFileTypes: ["jpeg", "png"],
      helperText: "Image to show before the video plays",
    },
    { name: "autoPlay", type: "boolean", defaultValue: !0 },
    { name: "controls", type: "boolean", defaultValue: !1 },
    { name: "muted", type: "boolean", defaultValue: !0 },
    { name: "loop", type: "boolean", defaultValue: !0 },
    { name: "playsInline", type: "boolean", defaultValue: !0 },
    {
      name: "fit",
      type: "text",
      defaultValue: "cover",
      enum: ["contain", "cover", "fill", "auto"],
    },
    {
      name: "preload",
      type: "text",
      defaultValue: "metadata",
      enum: ["auto", "metadata", "none"],
    },
    {
      name: "fitContent",
      type: "boolean",
      helperText:
        "When child blocks are provided, fit to them instead of using the aspect ratio",
      defaultValue: !0,
      advanced: !0,
    },
    {
      name: "position",
      type: "text",
      defaultValue: "center",
      enum: [
        "center",
        "top",
        "left",
        "right",
        "bottom",
        "top left",
        "top right",
        "bottom left",
        "bottom right",
      ],
    },
    { name: "height", type: "number", advanced: !0 },
    { name: "width", type: "number", advanced: !0 },
    {
      name: "aspectRatio",
      type: "number",
      advanced: !0,
      defaultValue: 0.7004048582995948,
    },
    {
      name: "lazyLoad",
      type: "boolean",
      helperText:
        'Load this video "lazily" - as in only when a user scrolls near the video. Recommended for optmized performance and bandwidth consumption',
      defaultValue: !0,
      advanced: !0,
    },
  ],
  shouldReceiveBuilderProps: {
    builderBlock: !0,
    builderContext: !1,
    builderComponents: !1,
    builderLinkComponent: !1,
  },
};
function Mo(e) {
  var t, n, o, i, r, a, c;
  function u() {
    return l(
      l(
        l(
          l(
            l({}, e.autoPlay === !0 ? { autoPlay: !0 } : {}),
            e.muted === !0 ? { muted: !0 } : {}
          ),
          e.controls === !0 ? { controls: !0 } : {}
        ),
        e.loop === !0 ? { loop: !0 } : {}
      ),
      e.playsInline === !0 ? { playsInline: !0 } : {}
    );
  }
  function m() {
    return l({}, u());
  }
  return s.jsxs("div", {
    style: { position: "relative" },
    children: [
      s.jsx(
        "video",
        g(l({ className: "builder-video" }, m()), {
          preload: e.preload || "metadata",
          style: l(
            g(
              l(
                { width: "100%", height: "100%" },
                (t = e.attributes) == null ? void 0 : t.style
              ),
              {
                objectFit: e.fit,
                objectPosition: e.position,
                zIndex: 2,
                borderRadius: "1px",
              }
            ),
            e.aspectRatio ? { position: "absolute" } : null
          ),
          src: e.video || "no-src",
          poster: e.posterImage,
          children: e.lazyLoad
            ? null
            : s.jsx("source", { type: "video/mp4", src: e.video }),
        })
      ),
      e.aspectRatio &&
      !(
        e.fitContent &&
        (o = (n = e.builderBlock) == null ? void 0 : n.children) != null &&
        o.length
      )
        ? s.jsx("div", {
            style: {
              width: "100%",
              paddingTop: e.aspectRatio * 100 + "%",
              pointerEvents: "none",
              fontSize: "0px",
            },
          })
        : null,
      (r = (i = e.builderBlock) == null ? void 0 : i.children) != null &&
      r.length &&
      e.fitContent
        ? s.jsx("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            },
            children: e.children,
          })
        : null,
      (c = (a = e.builderBlock) == null ? void 0 : a.children) != null &&
      c.length &&
      !e.fitContent
        ? s.jsx("div", {
            style: {
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            },
            children: e.children,
          })
        : null,
    ],
  });
}
const Uo = () => [
    l({ component: yo }, vo),
    l({ component: wo }, ko),
    l({ component: Eo }, To),
    l({ component: Po }, $o),
    l({ component: No }, Fo),
    l({ component: Vo }, Ro),
    l({ component: Ao }, Wo),
    l({ component: Oo }, Lo),
    l({ component: Mo }, Do),
  ],
  Fe = () => [
    l({ component: gn }, ao),
    l({ component: Xn }, lo),
    l({ component: Zn }, so),
    l({ component: no }, co),
    l({ component: oo }, uo),
    l({ component: mo }, po),
    l({ component: di }, fo),
    l({ component: xo }, go),
    l({ component: ho }, bo),
    l({ component: ro }, io),
    ...Uo(),
  ],
  Ko = `function updateCookiesAndStyles(contentId, variants, isHydrationTarget) {
  function getAndSetVariantId() {
    function setCookie(name, value, days) {
      let expires = '';
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
      }
      document.cookie = name + '=' + (value || '') + expires + '; path=/' + '; Secure; SameSite=None';
    }
    function getCookie(name) {
      const nameEQ = name + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }
    const cookieName = \`builder.tests.\${contentId}\`;
    const variantInCookie = getCookie(cookieName);
    const availableIDs = variants.map(vr => vr.id).concat(contentId);
    if (variantInCookie && availableIDs.includes(variantInCookie)) {
      return variantInCookie;
    }
    let n = 0;
    const random = Math.random();
    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      const testRatio = variant.testRatio;
      n += testRatio;
      if (random < n) {
        setCookie(cookieName, variant.id);
        return variant.id;
      }
    }
    setCookie(cookieName, contentId);
    return contentId;
  }
  const winningVariantId = getAndSetVariantId();
  const styleEl = document.currentScript?.previousElementSibling;
  if (isHydrationTarget) {
    styleEl.remove();
    const thisScriptEl = document.currentScript;
    thisScriptEl?.remove();
  } else {
    const newStyleStr = variants.concat({
      id: contentId
    }).filter(variant => variant.id !== winningVariantId).map(value => {
      return \`.variant-\${value.id} {  display: none; }
        \`;
    }).join('');
    styleEl.innerHTML = newStyleStr;
  }
}`,
  qo = `function updateVariantVisibility(variantContentId, defaultContentId, isHydrationTarget) {
  if (!navigator.cookieEnabled) {
    return;
  }
  function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  const cookieName = \`builder.tests.\${defaultContentId}\`;
  const winningVariant = getCookie(cookieName);
  const parentDiv = document.currentScript?.parentElement;
  const isDefaultContent = variantContentId === defaultContentId;
  const isWinningVariant = winningVariant === variantContentId;
  if (isWinningVariant && !isDefaultContent) {
    parentDiv?.removeAttribute('hidden');
    parentDiv?.removeAttribute('aria-hidden');
  } else if (!isWinningVariant && isDefaultContent) {
    parentDiv?.setAttribute('hidden', 'true');
    parentDiv?.setAttribute('aria-hidden', 'true');
  }
  if (isHydrationTarget) {
    if (!isWinningVariant) {
      parentDiv?.remove();
    }
    const thisScriptEl = document.currentScript;
    thisScriptEl?.remove();
  }
  return;
}`,
  pt = "builderIoAbTest",
  mt = "builderIoRenderContent",
  ne = (e) =>
    Object.values((e == null ? void 0 : e.variations) || {}).map((t) =>
      g(l({}, t), { testVariationId: t.id, id: e == null ? void 0 : e.id })
    ),
  Ho = ({ canTrack: e, content: t }) => !(!(ne(t).length > 0) || !e || V()),
  zo = (e) => e === "react",
  ft = zo(D),
  Jo = () => `
  window.${pt} = ${Ko}
  window.${mt} = ${qo}
  `,
  _o = (e, t) => `
  window.${pt}(
    "${t}",${JSON.stringify(e)}, ${ft}
  )`,
  Go = ({ contentId: e, variationId: t }) => `window.${mt}(
    "${t}", "${e}", ${ft}
  )`;
function be(e) {
  return s.jsx("script", {
    dangerouslySetInnerHTML: { __html: e.scriptStr },
    "data-id": e.id,
  });
}
function Ne(e) {
  return Math.round(e * 1e3) / 1e3;
}
const Yo = (e, t, n = !0) => {
    if (!(e instanceof HTMLElement)) return null;
    let o = n ? e : e.parentElement;
    do {
      if (!o) return null;
      if (t(o)) return o;
    } while ((o = o.parentElement));
    return null;
  },
  Qo = (e) =>
    Yo(e, (t) => {
      const n = t.getAttribute("builder-id") || t.id;
      return (n == null ? void 0 : n.indexOf("builder-")) === 0;
    }),
  We = ({ event: e, target: t }) => {
    const n = t.getBoundingClientRect(),
      o = e.clientX - n.left,
      i = e.clientY - n.top,
      r = Ne(o / n.width),
      a = Ne(i / n.height);
    return { x: r, y: a };
  },
  Xo = (e) => {
    const t = e.target,
      n = t && Qo(t),
      o =
        (n == null ? void 0 : n.getAttribute("builder-id")) ||
        (n == null ? void 0 : n.id);
    return {
      targetBuilderElement: o || void 0,
      metadata: {
        targetOffset: t ? We({ event: e, target: t }) : void 0,
        builderTargetOffset: n ? We({ event: e, target: n }) : void 0,
        builderElementIndex:
          n && o
            ? [].slice.call(document.getElementsByClassName(o)).indexOf(n)
            : void 0,
      },
    };
  },
  Zo = (e) => {
    var t, n;
    const o = e.family + (e.kind && !e.kind.includes("#") ? ", " + e.kind : ""),
      i = o.split(",")[0],
      r =
        (n = e.fileUrl) != null
          ? n
          : (t = e == null ? void 0 : e.files) == null
          ? void 0
          : t.regular;
    let a = "";
    if (
      (r &&
        o &&
        i &&
        (a += `
@font-face {
font-family: "${o}";
src: local("${i}"), url('${r}') format('woff2');
font-display: fallback;
font-weight: 400;
}
      `.trim()),
      e.files)
    )
      for (const c in e.files) {
        if (String(Number(c)) !== c) continue;
        const u = e.files[c];
        u &&
          u !== r &&
          (a += `
@font-face {
font-family: "${o}";
src: url('${u}') format('woff2');
font-display: fallback;
font-weight: ${c};
}
        `.trim());
      }
    return a;
  },
  ei = ({ customFonts: e }) => {
    var t;
    return (
      ((t = e == null ? void 0 : e.map((n) => Zo(n))) == null
        ? void 0
        : t.join(" ")) || ""
    );
  },
  ti = ({ cssCode: e, contentId: t }) =>
    e
      ? t
        ? (e == null
            ? void 0
            : e.replace(/&/g, `div[builder-content-id="${t}"]`)) || ""
        : e
      : "",
  ni = `
.builder-button {
  all: unset;
}

.builder-text > p:first-of-type, .builder-text > .builder-paragraph:first-of-type {
  margin: 0;
}
.builder-text > p, .builder-text > .builder-paragraph {
  color: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  font-weight: inherit;
  font-size: inherit;
  text-align: inherit;
  font-family: inherit;
}
`,
  oi = (e) => (e ? "" : ni),
  ii = (e) => `variant-${e}`;
function ri(e) {
  var t, n, o, i, r, a, c;
  const u = h.useRef(null);
  function m(x) {
    var w, k;
    const j = l(l({}, e.builderContextSignal.rootState), x);
    e.builderContextSignal.rootSetState
      ? (k = (w = e.builderContextSignal).rootSetState) == null || k.call(w, j)
      : e.setBuilderContextSignal((E) => g(l({}, E), { rootState: j }));
  }
  function p(x) {
    var w, k, j, E, M;
    const K = g(l(l({}, e.builderContextSignal.content), x), {
      data: l(
        l({}, (w = e.builderContextSignal.content) == null ? void 0 : w.data),
        x == null ? void 0 : x.data
      ),
      meta: g(
        l(
          l({}, (k = e.builderContextSignal.content) == null ? void 0 : k.meta),
          x == null ? void 0 : x.meta
        ),
        {
          breakpoints:
            ((j = x == null ? void 0 : x.meta) == null
              ? void 0
              : j.breakpoints) ||
            ((M =
              (E = e.builderContextSignal.content) == null ? void 0 : E.meta) ==
            null
              ? void 0
              : M.breakpoints),
        }
      ),
    });
    e.setBuilderContextSignal((U) => g(l({}, U), { content: K }));
  }
  function d() {
    return e.showContent ? {} : { hidden: !0, "aria-hidden": !0 };
  }
  const [f, b] = h.useState(() => e.contentWrapper || "div");
  function y(x) {
    return dn({
      model: e.model,
      trustedHosts: e.trustedHosts,
      callbacks: {
        configureSdk: (w) => {
          var k;
          const { breakpoints: j, contentId: E } = w;
          !E ||
            E !==
              ((k = e.builderContextSignal.content) == null ? void 0 : k.id) ||
            (j && p({ meta: { breakpoints: j } }));
        },
        animation: (w) => {
          at(w);
        },
        contentUpdate: (w) => {
          p(w);
        },
      },
    })(x);
  }
  function T() {
    var x, w;
    const k =
      (w = (x = e.builderContextSignal.content) == null ? void 0 : x.data) ==
      null
        ? void 0
        : w.jsCode;
    k &&
      G({
        code: k,
        context: e.context || {},
        localState: void 0,
        rootState: e.builderContextSignal.rootState,
        rootSetState: e.builderContextSignal.rootSetState,
        enableCache: !1,
      });
  }
  const [I, S] = h.useState(() => ({})),
    [$, P] = h.useState(() => ({})),
    [R, C] = h.useState(() => !1);
  function B(x) {
    var w, k;
    if (e.builderContextSignal.content) {
      const j =
          (w = e.builderContextSignal.content) == null
            ? void 0
            : w.testVariationId,
        E = (k = e.builderContextSignal.content) == null ? void 0 : k.id;
      Ie(
        g(
          l(
            {
              type: "click",
              canTrack: J(e.canTrack),
              contentId: E,
              apiKey: e.apiKey,
              variationId: j !== E ? j : void 0,
            },
            Xo(x)
          ),
          { unique: !R }
        )
      );
    }
    R || C(!0);
  }
  function W() {
    var x, w, k;
    const j =
      (k =
        (w = (x = e.builderContextSignal.content) == null ? void 0 : x.data) ==
        null
          ? void 0
          : w.httpRequests) != null
        ? k
        : {};
    Object.entries(j).forEach(([E, M]) => {
      if (!M || $[E] || (I[E] && !N())) return;
      $[E] = !0;
      const K = M.replace(/{{([^}]+)}}/g, (U, bt) =>
        String(
          G({
            code: bt,
            context: e.context || {},
            localState: void 0,
            rootState: e.builderContextSignal.rootState,
            rootSetState: e.builderContextSignal.rootSetState,
            enableCache: !0,
          })
        )
      );
      Je(K)
        .then((U) => U.json())
        .then((U) => {
          m({ [E]: U }), (I[E] = !0);
        })
        .catch((U) => {
          console.error("error fetching dynamic data", M, U);
        })
        .finally(() => {
          $[E] = !1;
        });
    });
  }
  function v() {
    N() &&
      window.dispatchEvent(
        new CustomEvent("builder:component:stateChange", {
          detail: {
            state: Y(e.builderContextSignal.rootState),
            ref: { name: e.model },
          },
        })
      );
  }
  return (
    h.useEffect(() => {
      var x, w;
      if (V()) {
        if (
          (N() &&
            (window.addEventListener("message", y),
            cn(),
            un(
              l(
                l(
                  l({}, e.locale ? { locale: e.locale } : {}),
                  e.enrich ? { enrich: e.enrich } : {}
                ),
                e.trustedHosts ? { trustedHosts: e.trustedHosts } : {}
              )
            ),
            Object.values(e.builderContextSignal.componentInfos).forEach(
              (k) => {
                var j;
                const E = Ft(k);
                (j = window.parent) == null || j.postMessage(E, "*");
              }
            ),
            window.addEventListener(
              "builder:component:stateChangeListenerActivated",
              v
            )),
          e.builderContextSignal.content && J(e.canTrack))
        ) {
          const k =
              (x = e.builderContextSignal.content) == null
                ? void 0
                : x.testVariationId,
            j = (w = e.builderContextSignal.content) == null ? void 0 : w.id,
            E = e.apiKey;
          Ie({
            type: "impression",
            canTrack: !0,
            contentId: j,
            apiKey: E,
            variationId: k !== j ? k : void 0,
          });
        }
        if (Jt() && !N()) {
          const k = new URL(location.href).searchParams,
            j = k.get("builder.preview"),
            E = k.get(`builder.overrides.${j}`),
            M = k.get("apiKey") || k.get("builder.space");
          j === e.model &&
            M === e.apiKey &&
            (!e.content || E === e.content.id) &&
            Ge({
              model: e.model,
              apiKey: e.apiKey,
              apiVersion: e.builderContextSignal.apiVersion,
            }).then((K) => {
              K && p(K);
            });
        }
      }
    }, []),
    h.useEffect(() => {
      e.apiKey ||
        A.error(
          "No API key provided to `Content` component. This can cause issues. Please provide an API key using the `apiKey` prop."
        ),
        T(),
        W(),
        v();
    }, []),
    h.useEffect(() => {
      e.content && p(e.content);
    }, [e.content]),
    h.useEffect(() => {
      T();
    }, [
      (n = (t = e.builderContextSignal.content) == null ? void 0 : t.data) ==
      null
        ? void 0
        : n.jsCode,
    ]),
    h.useEffect(() => {
      W();
    }, [
      (i = (o = e.builderContextSignal.content) == null ? void 0 : o.data) ==
      null
        ? void 0
        : i.httpRequests,
    ]),
    h.useEffect(() => {
      v();
    }, [e.builderContextSignal.rootState]),
    h.useEffect(() => {
      e.data && m(e.data);
    }, [e.data]),
    h.useEffect(() => {
      e.locale && m({ locale: e.locale });
    }, [e.locale]),
    h.useEffect(
      () => () => {
        V() &&
          (window.removeEventListener("message", y),
          window.removeEventListener(
            "builder:component:stateChangeListenerActivated",
            v
          ));
      },
      []
    ),
    s.jsx(ve.Provider, {
      value: e.builderContextSignal,
      children: e.builderContextSignal.content
        ? s.jsx(
            f,
            g(
              l(
                l(
                  {
                    ref: u,
                    onClick: (x) => B(x),
                    "builder-content-id":
                      (r = e.builderContextSignal.content) == null
                        ? void 0
                        : r.id,
                    "builder-model": e.model,
                  },
                  d()
                ),
                e.contentWrapperProps
              ),
              {
                className: ii(
                  ((a = e.content) == null ? void 0 : a.testVariationId) ||
                    ((c = e.content) == null ? void 0 : c.id)
                ),
                children: e.children,
              }
            )
          )
        : null,
    })
  );
}
function ai(e) {
  const [t, n] = h.useState(() =>
    `
${ti({ cssCode: e.cssCode, contentId: e.contentId })}
${ei({ customFonts: e.customFonts })}
${oi(e.isNestedRender)}
`.trim()
  );
  return s.jsx(ae, { id: "builderio-content", styles: t });
}
const li = ({ content: e, data: t, locale: n }) => {
    var o, i, r;
    const a = {},
      c = ((o = e == null ? void 0 : e.data) == null ? void 0 : o.state) || {};
    return (
      (r = (i = e == null ? void 0 : e.data) == null ? void 0 : i.inputs) ==
        null ||
        r.forEach((u) => {
          u.name && u.defaultValue !== void 0 && (a[u.name] = u.defaultValue);
        }),
      l(l(l(l({}, a), c), t), n ? { locale: n } : {})
    );
  },
  si = ({ content: e, data: t }) =>
    e
      ? g(l({}, e), {
          data: l(l({}, e == null ? void 0 : e.data), t),
          meta: e == null ? void 0 : e.meta,
        })
      : void 0;
function Ae(e) {
  var t, n, o, i, r, a, c;
  const [u, m] = h.useState(() => {
    var T, I;
    return Go({
      variationId: (T = e.content) == null ? void 0 : T.testVariationId,
      contentId: (I = e.content) == null ? void 0 : I.id,
    });
  });
  function p(T) {
    y((I) => g(l({}, I), { rootState: T }));
  }
  const [d, f] = h.useState(() =>
      [...Fe(), ...(e.customComponents || [])].reduce((T, $) => {
        var P = $,
          { component: I } = P,
          S = q(P, ["component"]);
        return g(l({}, T), { [S.name]: l({ component: I }, pe(S)) });
      }, {})
    ),
    [b, y] = h.useState(() => ({
      content: si({ content: e.content, data: e.data }),
      localState: void 0,
      rootState: li({ content: e.content, data: e.data, locale: e.locale }),
      rootSetState: p,
      context: e.context || {},
      canTrack: e.canTrack,
      apiKey: e.apiKey,
      apiVersion: e.apiVersion,
      componentInfos: [...Fe(), ...(e.customComponents || [])].reduce(
        (T, $) => {
          var P = $,
            { component: I } = P,
            S = q(P, ["component"]);
          return g(l({}, T), { [S.name]: pe(S) });
        },
        {}
      ),
      inheritedStyles: {},
      BlocksWrapper: e.blocksWrapper || "div",
      BlocksWrapperProps: e.blocksWrapperProps || {},
    }));
  return s.jsx(tt.Provider, {
    value: { registeredComponents: d },
    children: s.jsxs(ri, {
      content: e.content,
      data: e.data,
      model: e.model,
      context: e.context,
      apiKey: e.apiKey,
      canTrack: e.canTrack,
      locale: e.locale,
      enrich: e.enrich,
      showContent: e.showContent,
      builderContextSignal: b,
      contentWrapper: e.contentWrapper,
      contentWrapperProps: e.contentWrapperProps,
      trustedHosts: e.trustedHosts,
      setBuilderContextSignal: y,
      children: [
        e.isSsrAbTest
          ? s.jsx(be, { id: "builderio-variant-visibility", scriptStr: u })
          : null,
        s.jsx(ai, {
          isNestedRender: e.isNestedRender,
          contentId: (t = b.content) == null ? void 0 : t.id,
          cssCode:
            (o = (n = b.content) == null ? void 0 : n.data) == null
              ? void 0
              : o.cssCode,
          customFonts:
            (r = (i = b.content) == null ? void 0 : i.data) == null
              ? void 0
              : r.customFonts,
        }),
        s.jsx(L, {
          blocks:
            (c = (a = b.content) == null ? void 0 : a.data) == null
              ? void 0
              : c.blocks,
          context: b,
          registeredComponents: d,
          linkComponent: e.linkComponent,
        }),
      ],
    }),
  });
}
function ci(e) {
  var t;
  const [n, o] = h.useState(() =>
    Ho({ canTrack: J(e.canTrack), content: e.content })
  );
  function i() {
    var c;
    return _o(
      ne(e.content).map((u) => ({
        id: u.testVariationId,
        testRatio: u.testRatio,
      })),
      ((c = e.content) == null ? void 0 : c.id) || ""
    );
  }
  function r() {
    return ne(e.content)
      .map((c) => `.variant-${c.testVariationId} { display: none; } `)
      .join("");
  }
  function a() {
    var c;
    return n
      ? g(l({}, e.content), {
          testVariationId: (c = e.content) == null ? void 0 : c.id,
        })
      : Rt({ item: e.content, canTrack: J(e.canTrack) });
  }
  return (
    h.useEffect(() => {}, []),
    h.useEffect(() => {}),
    s.jsxs(s.Fragment, {
      children: [
        !e.isNestedRender && D !== "reactNative"
          ? s.jsx(be, { id: "builderio-init-variants-fns", scriptStr: Jo() })
          : null,
        n
          ? s.jsxs(s.Fragment, {
              children: [
                s.jsx(ae, { id: "builderio-variants", styles: r() }),
                s.jsx(be, {
                  id: "builderio-variants-visibility",
                  scriptStr: i(),
                }),
                (t = ne(e.content)) == null
                  ? void 0
                  : t.map((c) =>
                      s.jsx(
                        Ae,
                        {
                          isNestedRender: e.isNestedRender,
                          content: c,
                          showContent: !1,
                          model: e.model,
                          data: e.data,
                          context: e.context,
                          apiKey: e.apiKey,
                          apiVersion: e.apiVersion,
                          customComponents: e.customComponents,
                          linkComponent: e.linkComponent,
                          canTrack: e.canTrack,
                          locale: e.locale,
                          enrich: e.enrich,
                          isSsrAbTest: n,
                          blocksWrapper: e.blocksWrapper,
                          blocksWrapperProps: e.blocksWrapperProps,
                          contentWrapper: e.contentWrapper,
                          contentWrapperProps: e.contentWrapperProps,
                          trustedHosts: e.trustedHosts,
                        },
                        c.testVariationId
                      )
                    ),
              ],
            })
          : null,
        s.jsx(Ae, {
          isNestedRender: e.isNestedRender,
          content: a(),
          showContent: !0,
          model: e.model,
          data: e.data,
          context: e.context,
          apiKey: e.apiKey,
          apiVersion: e.apiVersion,
          customComponents: e.customComponents,
          linkComponent: e.linkComponent,
          canTrack: e.canTrack,
          locale: e.locale,
          enrich: e.enrich,
          isSsrAbTest: n,
          blocksWrapper: e.blocksWrapper,
          blocksWrapperProps: e.blocksWrapperProps,
          contentWrapper: e.contentWrapper,
          contentWrapperProps: e.contentWrapperProps,
          trustedHosts: e.trustedHosts,
        }),
      ],
    })
  );
}
const ui = (n) =>
  F(void 0, [n], function* ({ builderContextValue: e, symbol: t }) {
    if (t != null && t.model && e != null && e.apiKey)
      return Ge(
        l(
          { model: t.model, apiKey: e.apiKey, apiVersion: e.apiVersion },
          (t == null ? void 0 : t.entry) && { query: { id: t.entry } }
        )
      ).catch((o) => {
        A.error("Could not fetch symbol content: ", o);
      });
  });
function di(e) {
  var t, n, o, i;
  function r() {
    return "div";
  }
  function a() {
    return "div";
  }
  function c() {
    var d, f;
    return [
      e.attributes[_()],
      "builder-symbol",
      (d = e.symbol) != null && d.inline ? "builder-inline-symbol" : void 0,
      ((f = e.symbol) != null && f.dynamic) || e.dynamic
        ? "builder-dynamic-symbol"
        : void 0,
    ]
      .filter(Boolean)
      .join(" ");
  }
  const [u, m] = h.useState(() => {
    var d;
    return (d = e.symbol) == null ? void 0 : d.content;
  });
  function p() {
    u ||
      ui({ symbol: e.symbol, builderContextValue: e.builderContext }).then(
        (d) => {
          d && m(d);
        }
      );
  }
  return (
    h.useEffect(() => {}, []),
    h.useEffect(() => {
      p();
    }, [e.symbol]),
    s.jsx(
      "div",
      g(l({}, e.attributes), {
        className: c(),
        children: s.jsx(ci, {
          isNestedRender: !0,
          apiVersion: e.builderContext.apiVersion,
          apiKey: e.builderContext.apiKey,
          context: g(l({}, e.builderContext.context), {
            symbolId: (t = e.builderBlock) == null ? void 0 : t.id,
          }),
          customComponents: Object.values(e.builderComponents),
          data: l(
            l(
              l({}, (n = e.symbol) == null ? void 0 : n.data),
              e.builderContext.localState
            ),
            (o = u == null ? void 0 : u.data) == null ? void 0 : o.state
          ),
          canTrack: e.builderContext.canTrack,
          model: (i = e.symbol) == null ? void 0 : i.model,
          content: u,
          linkComponent: e.builderLinkComponent,
          blocksWrapper: r(),
          contentWrapper: a(),
        }),
      })
    )
  );
}
export { zt as C, ci as J };
