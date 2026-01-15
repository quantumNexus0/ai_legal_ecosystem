var x = Object.defineProperty,
  j = Object.defineProperties;
var k = Object.getOwnPropertyDescriptors;
var h = Object.getOwnPropertySymbols;
var v = Object.prototype.hasOwnProperty,
  p = Object.prototype.propertyIsEnumerable;
var u = (e, l, n) =>
    l in e
      ? x(e, l, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[l] = n),
  d = (e, l) => {
    for (var n in l || (l = {})) v.call(l, n) && u(e, n, l[n]);
    if (h) for (var n of h(l)) p.call(l, n) && u(e, n, l[n]);
    return e;
  },
  t = (e, l) => j(e, k(l));
var s = (e, l) => {
  var n = {};
  for (var a in e) v.call(e, a) && l.indexOf(a) < 0 && (n[a] = e[a]);
  if (e != null && h)
    for (var a of h(e)) l.indexOf(a) < 0 && p.call(e, a) && (n[a] = e[a]);
  return n;
};
import { j as o } from "./index-DlOqfcZ1.js";
var i = { xs: 12, sm: 16, md: 24, lg: 32, xl: 40, xxl: 60 },
  L = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M1 5a3 3 0 0 1 3-3h16a3 3 0 1 1 0 6H4a3 3 0 0 1-3-3m3 5a1 1 0 0 0-1 1v5.241c0 .805 0 1.47.044 2.01.046.563.145 1.08.392 1.565a4 4 0 0 0 1.748 1.748c.485.247 1.002.346 1.564.392C7.29 22 7.954 22 8.758 22h6.483c.805 0 1.47 0 2.01-.044.563-.046 1.08-.145 1.565-.392a4 4 0 0 0 1.748-1.748c.247-.485.346-1.002.392-1.564.044-.541.044-1.206.044-2.01V11a1 1 0 0 0-1-1zm6 3a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M4 7.997a2.3 2.3 0 0 1-.39-.035A2 2 0 0 1 2.038 6.39C2 6.197 2 5.965 2 5.5s0-.697.038-.89A2 2 0 0 1 3.61 3.038C3.803 3 4.035 3 4.5 3h15c.465 0 .697 0 .89.038a2 2 0 0 1 1.572 1.572c.038.193.038.425.038.89s0 .697-.038.89a2 2 0 0 1-1.572 1.572c-.107.02-.226.03-.39.035M10 13h4M4 8h16v8.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C17.72 21 16.88 21 15.2 21H8.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C4 18.72 4 17.88 4 16.2z",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  f = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M12.813 1.668a2 2 0 0 0-1.626 0c-.4.178-.659.49-.84.746-.177.25-.367.579-.576.94l-8.267 14.28c-.21.362-.4.692-.53.971-.132.285-.274.666-.229 1.102a2 2 0 0 0 .813 1.41c.355.258.757.326 1.069.355.306.028.687.028 1.106.028h16.534c.419 0 .8 0 1.106-.028.312-.029.714-.097 1.069-.354a2 2 0 0 0 .813-1.41c.045-.437-.097-.818-.229-1.103-.13-.28-.32-.609-.53-.971L14.23 3.354c-.21-.361-.4-.69-.577-.94-.18-.255-.44-.568-.84-.746M13 9a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2z",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M12 9v4m0 4h.01M10.615 3.892 2.39 18.098c-.456.788-.684 1.182-.65 1.506a1 1 0 0 0 .406.705c.263.191.718.191 1.629.191h16.45c.91 0 1.365 0 1.628-.191a1 1 0 0 0 .407-.705c.034-.324-.195-.718-.65-1.506L13.383 3.892c-.454-.785-.681-1.178-.978-1.31a1 1 0 0 0-.812 0c-.297.132-.524.525-.979 1.31",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  M = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        d: "M12.707 5.707a1 1 0 0 0-1.414-1.414l-7 7a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414-1.414L7.414 13H19a1 1 0 1 0 0-2H7.414z",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M19 12H5m0 0 7 7m-7-7 7-7",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  g = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        d: "M7 6a1 1 0 0 0 0 2h7.586l-8.293 8.293a1 1 0 1 0 1.414 1.414L16 9.414V17a1 1 0 1 0 2 0V7a1 1 0 0 0-1-1z",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M7 17 17 7m0 0H7m10 0v10",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  w = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        d: "M12.707 4.293a1 1 0 1 0-1.414 1.414L16.586 11H5a1 1 0 1 0 0 2h11.586l-5.293 5.293a1 1 0 0 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414z",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M5 12h14m0 0-7-7m7 7-7 7",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  H = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M11.825 2.032a2 2 0 0 1 .35 0c.133.012.261.04.362.063l7.454 1.656c.2.045.4.09.568.14.188.056.402.138.61.288a2 2 0 0 1 .669.834c.101.236.135.463.15.658.012.176.012.38.012.585v1.176c0 .252 0 .498-.017.706a2 2 0 0 1-.201.77 2 2 0 0 1-.874.874 2 2 0 0 1-.77.201q-.066.006-.138.009v6.016l.138.009c.229.019.499.063.77.201a2 2 0 0 1 .874.874c.138.271.182.541.201.77.017.208.017.454.017.706v.864c0 .252 0 .498-.017.706a2 2 0 0 1-.201.77 2 2 0 0 1-.874.874 2 2 0 0 1-.77.201c-.208.017-.454.017-.706.017H4.568c-.252 0-.498 0-.706-.017a2 2 0 0 1-.77-.201 2 2 0 0 1-.874-.874 2 2 0 0 1-.201-.77C2 19.93 2 19.684 2 19.432v-.864c0-.252 0-.498.017-.706a2 2 0 0 1 .201-.77 2 2 0 0 1 .874-.874 2 2 0 0 1 .77-.201L4 16.008V9.992l-.138-.009a2 2 0 0 1-.77-.201 2 2 0 0 1-.874-.874 2 2 0 0 1-.201-.77C2 7.93 2 7.684 2 7.432V6.256c0-.205 0-.41.013-.585.014-.195.048-.422.15-.658a2 2 0 0 1 .668-.834 2 2 0 0 1 .61-.288c.169-.05.368-.095.568-.14l7.454-1.656a3 3 0 0 1 .362-.063M6 10v6h2.5v-6zm4.5 0v6h3v-6zm5 0v6H18v-6z",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M5 9v8m4.5-8v8m5-8v8M19 9v8M3 18.6v.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C3.76 21 4.04 21 4.6 21h14.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C21 20.24 21 19.96 21 19.4v-.8c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C20.24 17 19.96 17 19.4 17H4.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C3 17.76 3 18.04 3 18.6m8.653-15.523-7.4 1.645c-.447.099-.67.149-.838.269a1 1 0 0 0-.334.417C3 5.597 3 5.826 3 6.283V7.4c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C3.76 9 4.04 9 4.6 9h14.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C21 8.24 21 7.96 21 7.4V6.283c0-.457 0-.686-.081-.875a1 1 0 0 0-.335-.417c-.166-.12-.39-.17-.837-.27l-7.4-1.644a2 2 0 0 0-.26-.049 1 1 0 0 0-.174 0c-.066.006-.13.02-.26.05",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  R = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M6 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h9a5 5 0 0 0 2.436-9.367A5 5 0 0 0 14 3zm8 8a3 3 0 1 0 0-6H7v6zm-7 2v6h8a3 3 0 1 0 0-6z",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M6 12h8a4 4 0 0 0 0-8H6zm0 0h9a4 4 0 0 1 0 8H6z",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  I = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1m5.207 8.707a1 1 0 0 0-1.414-1.414L10.5 13.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0z",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "m7.5 12 3 3 6-6m5.5 3c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  B = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M15.134 2.154a4.83 4.83 0 0 0-6.268 0 2.83 2.83 0 0 1-1.612.668 4.83 4.83 0 0 0-4.432 4.432 2.83 2.83 0 0 1-.668 1.612 4.83 4.83 0 0 0 0 6.268c.387.454.62 1.018.668 1.612a4.83 4.83 0 0 0 4.432 4.432 2.83 2.83 0 0 1 1.612.668 4.83 4.83 0 0 0 6.268 0 2.83 2.83 0 0 1 1.612-.668 4.83 4.83 0 0 0 4.432-4.432 2.83 2.83 0 0 1 .668-1.612 4.83 4.83 0 0 0 0-6.268 2.83 2.83 0 0 1-.668-1.612 4.83 4.83 0 0 0-4.432-4.432 2.83 2.83 0 0 1-1.612-.668m1.073 8.053a1 1 0 0 0-1.414-1.414L11 12.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0z",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "m9 12 2 2 4.5-4.5M7.334 3.819a3.83 3.83 0 0 0 2.18-.904 3.83 3.83 0 0 1 4.972 0c.613.523 1.376.84 2.18.904a3.83 3.83 0 0 1 3.515 3.515 3.82 3.82 0 0 0 .904 2.18 3.83 3.83 0 0 1 0 4.972 3.83 3.83 0 0 0-.904 2.18 3.83 3.83 0 0 1-3.515 3.515 3.83 3.83 0 0 0-2.18.904 3.83 3.83 0 0 1-4.972 0 3.83 3.83 0 0 0-2.18-.904 3.83 3.83 0 0 1-3.515-3.515 3.83 3.83 0 0 0-.904-2.18 3.83 3.83 0 0 1 0-4.972c.523-.613.84-1.376.904-2.18a3.83 3.83 0 0 1 3.515-3.515",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  W = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M5.293 8.293a1 1 0 0 1 1.414 0L12 13.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "m6 9 6 6 6-6",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  V = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M8.293 5.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L13.586 12 8.293 6.707a1 1 0 0 1 0-1.414",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "m9 18 6-6-6-6",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  q = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M15.707 5.293a1 1 0 0 1 0 1.414L10.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "m15 18-6-6 6-6",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  A = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M11.293 8.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1-1.414 1.414L12 10.414l-5.293 5.293a1 1 0 0 1-1.414-1.414z",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "m18 15-6-6-6 6",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  S = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsxs(o.Fragment, {
        children: [
          o.jsx("path", {
            fill: "currentColor",
            d: "M10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0",
          }),
          " ",
          o.jsx("path", {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M12 4C9.138 4 6.805 5.265 5.077 6.707s-2.91 3.107-3.503 4.046l-.024.038c-.118.185-.27.425-.347.762a2.2 2.2 0 0 0 0 .894c.077.337.23.577.347.762l.024.038c.593.939 1.776 2.605 3.503 4.046S9.138 20 12 20s5.195-1.265 6.923-2.707c1.726-1.441 2.91-3.107 3.503-4.046l.024-.038c.117-.185.27-.425.347-.762a2.2 2.2 0 0 0 0-.894c-.077-.337-.23-.577-.347-.762l-.024-.038c-.593-.939-1.777-2.605-3.503-4.046C17.195 5.265 14.862 4 12 4m0 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8",
            clipRule: "evenodd",
          }),
        ],
      }),
      line: o.jsxs(o.Fragment, {
        children: [
          o.jsx("path", {
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            d: "M2.42 12.713c-.136-.215-.204-.323-.242-.49a1.2 1.2 0 0 1 0-.446c.038-.167.106-.274.242-.49C3.546 9.505 6.895 5 12 5s8.455 4.505 9.58 6.287c.137.215.205.323.243.49.029.125.029.322 0 .446-.038.167-.106.274-.242.49C20.455 14.495 17.105 19 12 19c-5.106 0-8.455-4.505-9.58-6.287",
          }),
          " ",
          o.jsx("path", {
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            d: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
          }),
        ],
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  F = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M15.241 1H8.76c-.805 0-1.47 0-2.01.044-.563.046-1.08.145-1.565.392a4 4 0 0 0-1.748 1.748c-.247.485-.346 1.002-.392 1.564C3 5.29 3 5.954 3 6.758v10.483c0 .805 0 1.47.044 2.01.046.563.145 1.08.392 1.565a4 4 0 0 0 1.748 1.748c.485.247 1.002.346 1.564.392C7.29 23 7.954 23 8.758 23h6.483c.805 0 1.47 0 2.01-.044.563-.046 1.08-.145 1.565-.392a4 4 0 0 0 1.748-1.748c.247-.485.346-1.002.392-1.564.044-.541.044-1.206.044-2.01V6.758c0-.805 0-1.47-.044-2.01-.046-.563-.145-1.08-.392-1.565a4 4 0 0 0-1.748-1.748c-.485-.247-1.002-.346-1.564-.392C16.71 1 16.046 1 15.242 1M8 6a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2zm-1 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M14 11H8m2 4H8m8-8H8m12-.2v10.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C17.72 22 16.88 22 15.2 22H8.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C4 19.72 4 18.88 4 17.2V6.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C6.28 2 7.12 2 8.8 2h6.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C20 4.28 20 5.12 20 6.8",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  U = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        d: "M3 3a1 1 0 0 0 0 2h18a1 1 0 1 0 0-2zm12 5.25a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2zm-1 6.5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1M3 19a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2zM4.568 7c-.252 0-.498 0-.706.017a2 2 0 0 0-.77.201 2 2 0 0 0-.874.874 2 2 0 0 0-.201.77C2 9.07 2 9.316 2 9.568v4.864c0 .252 0 .498.017.706.019.229.063.499.201.77a2 2 0 0 0 .874.874c.271.138.541.182.77.201.208.017.454.017.706.017h4.864c.252 0 .498 0 .706-.017a2 2 0 0 0 .77-.201 2 2 0 0 0 .874-.874 2 2 0 0 0 .201-.77c.017-.208.017-.454.017-.706V9.568c0-.252 0-.498-.017-.706a2 2 0 0 0-.201-.77 2 2 0 0 0-.874-.874 2 2 0 0 0-.77-.201C9.93 7 9.684 7 9.432 7z",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M21 9.25h-6M21 4H3m18 10.75h-6M21 20H3m1.6-4h4.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C11 15.24 11 14.96 11 14.4V9.6c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C10.24 8 9.96 8 9.4 8H4.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C3 8.76 3 9.04 3 9.6v4.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C3.76 16 4.04 16 4.6 16",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  P = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1m0 6a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2zm1 5a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0z",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M12 16v-4m0-4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  z = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        d: "M15.031 3H19a1 1 0 1 1 0 2h-3.307l-5.25 14H14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2h3.307l5.25-14H10a1 1 0 0 1 0-2z",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M19 4h-9m4 16H5M15 4 9 20",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  E = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsxs(o.Fragment, {
        children: [
          o.jsx("path", {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M12.775 2.75a6 6 0 0 1 8.484 8.485l-.012.012-3 3a6 6 0 0 1-9.048-.648 1 1 0 1 1 1.602-1.198 4 4 0 0 0 6.032.432l2.993-2.994a4 4 0 0 0-5.656-5.655L12.455 5.89a1 1 0 0 1-1.41-1.418l1.72-1.71z",
            clipRule: "evenodd",
          }),
          " ",
          o.jsx("path", {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M7.9 8.373a6 6 0 0 1 6.9 2.028 1 1 0 1 1-1.6 1.198 4 4 0 0 0-6.033-.432L4.174 14.16a4 4 0 0 0 5.655 5.655l1.704-1.703a1 1 0 1 1 1.414 1.414l-1.71 1.71-.012.012a6 6 0 0 1-8.484-8.484l.012-.012 3-3a6 6 0 0 1 2.146-1.38",
            clipRule: "evenodd",
          }),
        ],
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  X = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsxs(o.Fragment, {
        children: [
          o.jsx("path", {
            fill: "currentColor",
            d: "M7.759 2H10a1 1 0 1 1 0 2H7.8c-.857 0-1.439 0-1.889.038-.438.035-.663.1-.819.18a2 2 0 0 0-.874.874c-.08.156-.145.38-.18.819C4 6.361 4 6.943 4 7.8v8.4c0 .857 0 1.439.038 1.889.035.438.1.663.18.819a2 2 0 0 0 .874.874c.156.08.38.145.819.18C6.361 20 6.943 20 7.8 20h8.4c.857 0 1.439 0 1.889-.038.438-.035.663-.1.819-.18a2 2 0 0 0 .874-.874c.08-.156.145-.38.18-.819.037-.45.038-1.032.038-1.889V14a1 1 0 1 1 2 0v2.241c0 .805 0 1.47-.044 2.01-.046.563-.145 1.08-.392 1.565a4 4 0 0 1-1.748 1.748c-.485.247-1.002.346-1.564.392-.541.044-1.206.044-2.01.044H7.758c-.805 0-1.47 0-2.01-.044-.563-.046-1.08-.145-1.565-.392a4 4 0 0 1-1.748-1.748c-.247-.485-.346-1.002-.392-1.564C2 17.71 2 17.046 2 16.242V7.758c0-.805 0-1.47.044-2.01.046-.563.145-1.08.392-1.565a4 4 0 0 1 1.748-1.748c.485-.247 1.002-.346 1.564-.392C6.29 2 6.954 2 7.758 2",
          }),
          " ",
          o.jsx("path", {
            fill: "currentColor",
            d: "M14 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V5.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L18.586 4H15a1 1 0 0 1-1-1",
          }),
        ],
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M21 9V3m0 0h-6m6 0-9 9m-2-9H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 5.28 3 6.12 3 7.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C5.28 21 6.12 21 7.8 21h8.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C21 18.72 21 17.88 21 16.2V14",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  T = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M3 10a9 9 0 0 1 18 0c0 2.526-1.147 4.74-2.708 6.767-1.304 1.694-2.974 3.349-4.641 5.002l-.002.001-.942.937a1 1 0 0 1-1.414 0l-.944-.938c-1.668-1.653-3.337-3.308-4.641-5.002C4.147 14.74 3 12.527 3 10m12 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
        clipRule: "evenodd",
      }),
      line: o.jsxs(o.Fragment, {
        children: [
          o.jsx("path", {
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            d: "M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
          }),
          " ",
          o.jsx("path", {
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            d: "M12 22c4-4 8-7.582 8-12a8 8 0 1 0-16 0c0 4.418 4 8 8 12",
          }),
        ],
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  b = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsxs(o.Fragment, {
        children: [
          o.jsx("path", {
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            d: "M21 12H9m12-6H9m12 12H9",
          }),
          " ",
          o.jsx("path", {
            fill: "currentColor",
            d: "M4.412 10V6.28l.016-.408q-.272.248-.608.432a2.5 2.5 0 0 1-.688.256l-.144-.928q.185-.015.408-.104a4 4 0 0 0 .896-.504q.2-.152.304-.304h.896V10zm-1.755 9v-.744q.72-.488 1.216-.88.504-.4.808-.736a2.5 2.5 0 0 0 .448-.648 1.4 1.4 0 0 0 .144-.608.83.83 0 0 0-.224-.6q-.225-.24-.632-.24-.449 0-.704.304-.248.304-.272.864l-.952-.36q.039-.545.288-.92.255-.383.688-.584.44-.208 1.008-.208.487 0 .84.136.36.136.592.376.24.232.36.536t.12.632q0 .512-.256.968-.249.456-.768.904-.52.448-1.32.944v.008l.288-.016q.176-.008.36-.008a8 8 0 0 1 .32-.008h1.456V19z",
          }),
        ],
      }),
      line: o.jsxs(o.Fragment, {
        children: [
          o.jsx("path", {
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            d: "M21 12H9m12-6H9m12 12H9",
          }),
          " ",
          o.jsx("path", {
            fill: "currentColor",
            d: "M4.412 10V6.28l.016-.408q-.272.248-.608.432a2.5 2.5 0 0 1-.688.256l-.144-.928a1.5 1.5 0 0 0 .408-.104 4 4 0 0 0 .896-.504q.2-.152.304-.304h.896V10zm-1.755 9v-.744q.72-.488 1.216-.88.504-.4.808-.736a2.5 2.5 0 0 0 .448-.648 1.4 1.4 0 0 0 .144-.608.83.83 0 0 0-.224-.6q-.225-.24-.632-.24-.449 0-.704.304-.249.304-.272.864l-.952-.36q.039-.545.288-.92.256-.383.688-.584.44-.208 1.008-.208.487 0 .84.136.36.136.592.376.24.232.36.536t.12.632q0 .512-.256.968-.249.456-.768.904-.52.448-1.32.944v.008l.288-.016q.176-.008.36-.008a8 8 0 0 1 .32-.008h1.456V19z",
          }),
        ],
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  y = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M8 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1m0-6a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1m0 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1m-6-6a2 2 0 1 1 4 0 2 2 0 0 1-4 0m0-6a2 2 0 1 1 4 0 2 2 0 0 1-4 0m0 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M21 12H9m12-6H9m12 12H9m-4-6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m0-6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m0 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  D = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsxs(o.Fragment, {
        children: [
          o.jsx("path", {
            fill: "currentColor",
            d: "M12.686.965a3 3 0 0 0-1.371 0c-.516.12-.973.419-1.494.759C7.565 3.19 5.304 4.647 3.052 6.118c-.34.222-.51.334-.57.475a.5.5 0 0 0 0 .386c.06.142.23.253.57.476l7.744 5.063c.698.457.845.535.975.566a1 1 0 0 0 .459 0c.13-.03.276-.11.974-.566l7.743-5.063c.341-.223.512-.334.57-.476a.5.5 0 0 0 0-.386c-.059-.141-.229-.253-.57-.475-2.251-1.471-4.512-2.928-6.768-4.394-.52-.34-.978-.638-1.494-.76",
          }),
          " ",
          o.jsx("path", {
            fill: "currentColor",
            d: "M22.997 9.982c0-.48 0-.72-.1-.854a.5.5 0 0 0-.367-.198c-.167-.011-.368.12-.77.384l-7.572 4.95c-.522.343-.982.644-1.5.766a3 3 0 0 1-1.377 0c-.517-.122-.976-.423-1.5-.766l-7.57-4.95c-.403-.264-.604-.395-.77-.384a.5.5 0 0 0-.367.198c-.1.134-.101.374-.101.854L1 16.242c0 .804 0 1.468.044 2.01.046.562.145 1.079.392 1.564a4 4 0 0 0 1.748 1.748c.485.247 1.002.346 1.564.392C5.29 22 5.954 22 6.758 22h10.483c.805 0 1.47 0 2.01-.044.563-.046 1.08-.145 1.565-.392a4 4 0 0 0 1.748-1.748c.247-.485.346-1.002.392-1.564.044-.541.044-1.206.044-2.01z",
          }),
        ],
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "m13.744 2.634 7.528 4.893c.266.173.399.26.495.374a1 1 0 0 1 .189.348c.044.143.044.302.044.62V16.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C19.72 21 18.88 21 17.2 21H6.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C2 18.72 2 17.88 2 16.2V8.868c0-.317 0-.476.044-.62a1 1 0 0 1 .189-.347c.096-.115.229-.201.495-.374l7.528-4.893m3.488 0c-.631-.41-.947-.616-1.287-.696a2 2 0 0 0-.914 0c-.34.08-.656.285-1.287.696m3.488 0 7.224 4.695c.344.224.516.336.576.477a.5.5 0 0 1 0 .388c-.06.141-.232.253-.576.477l-7.224 4.695c-.631.41-.947.616-1.287.696-.3.07-.613.07-.914 0-.34-.08-.656-.285-1.287-.696L3.032 8.671c-.344-.224-.516-.336-.576-.477a.5.5 0 0 1 0-.388c.06-.141.232-.253.576-.477l7.224-4.695",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  N = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsxs(o.Fragment, {
        children: [
          o.jsx("path", {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M15.241 1H8.76c-.805 0-1.47 0-2.01.044-.563.046-1.08.145-1.565.392a4 4 0 0 0-1.748 1.748c-.247.485-.346 1.002-.392 1.564C3 5.29 3 5.954 3 6.758v10.483c0 .805 0 1.47.044 2.01.046.563.145 1.08.392 1.565a4 4 0 0 0 1.748 1.748c.485.247 1.002.346 1.564.392C7.29 23 7.954 23 8.758 23h4.282c.371 0 .556 0 .661-.052a.4.4 0 0 0 .218-.21c.056-.103.065-.351.083-.85a3 3 0 0 1 .877-2.01l.378-.378-.378-.379a3 3 0 1 1 4.242-4.242l.379.378.379-.378a3 3 0 0 1 .608-.47c.222-.13.333-.195.386-.254a.4.4 0 0 0 .103-.18c.024-.074.024-.173.024-.37V6.759c0-.805 0-1.47-.044-2.01-.046-.563-.145-1.08-.392-1.565a4 4 0 0 0-1.748-1.748c-.485-.247-1.002-.346-1.564-.392C16.71 1 16.046 1 15.242 1M7 5a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2zm-1 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1",
            clipRule: "evenodd",
          }),
          " ",
          o.jsx("path", {
            fill: "currentColor",
            d: "M16.293 17.707a1 1 0 0 1 1.414-1.414l1.793 1.793 1.793-1.793a1 1 0 0 1 1.414 1.414L20.914 19.5l1.793 1.793a1 1 0 0 1-1.414 1.414L19.5 20.914l-1.793 1.793a1 1 0 0 1-1.414-1.414l1.793-1.793z",
          }),
        ],
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M14 11H8m2 4H8m8-8H8m12 5V6.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C17.72 2 16.88 2 15.2 2H8.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C4 4.28 4 5.12 4 6.8v10.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C6.28 22 7.12 22 8.8 22H12m4-6 5 5m0-5-5 5",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  O = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M21.707 2.293a3.83 3.83 0 0 0-5.414 0L4.976 13.609c-.233.234-.41.41-.565.61a4 4 0 0 0-.364.56c-.12.223-.209.456-.327.764l-2.153 5.598a1 1 0 0 0 1.292 1.292l5.38-2.069.093-.036.125-.048c.308-.118.541-.208.764-.327q.295-.16.56-.364c.2-.155.376-.332.61-.566L21.707 7.707a3.83 3.83 0 0 0 0-5.414M5.381 16.795l-1.14 2.964 2.964-1.14z",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "m2.5 21.5 5.55-2.134c.354-.137.532-.205.698-.294q.221-.12.42-.273c.149-.116.283-.25.552-.52L21 7a2.828 2.828 0 1 0-4-4L5.72 14.28c-.269.269-.403.403-.519.552a3 3 0 0 0-.273.42c-.089.166-.157.344-.294.699zm0 0 2.058-5.351c.147-.383.221-.574.347-.662a.5.5 0 0 1 .38-.08c.15.028.295.173.585.463l2.26 2.26c.29.29.435.435.464.586a.5.5 0 0 1-.08.379c-.089.126-.28.2-.663.347z",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  Q = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        d: "M12.403 1.185a2 2 0 0 0-.806 0c-.307.063-.582.217-.8.34l-.06.033L8.4 2.856l8.963 4.98 2.33-1.31c.407-.23.61-.344.678-.495a.5.5 0 0 0-.001-.411c-.069-.15-.273-.264-.68-.49l-6.427-3.572-.06-.034c-.218-.122-.493-.276-.8-.339m2.914 7.802L6.342 4c-.76.423-1.469.816-2.031 1.13-.409.226-.613.34-.681.49a.5.5 0 0 0-.001.411c.067.15.271.265.679.494l7.3 4.107c.143.08.214.12.29.136a.5.5 0 0 0 .204 0c.075-.016.147-.056.29-.136zm6.679-.097c0-.448 0-.672-.095-.803a.5.5 0 0 0-.35-.204c-.16-.018-.356.092-.747.312l-7.396 4.16c-.149.084-.223.125-.277.184a.5.5 0 0 0-.106.182c-.025.076-.025.161-.025.331v8.176c0 .447 0 .67.094.801a.5.5 0 0 0 .348.205c.16.019.355-.09.744-.306l6.477-3.597.063-.034c.23-.128.521-.288.745-.53.193-.21.339-.457.428-.728.103-.313.102-.644.101-.908v-.072c0-1.963-.003-5.303-.004-7.169M10.558 22.234c-.16.019-.355-.09-.745-.306l-6.476-3.597-.063-.034c-.231-.128-.522-.288-.745-.53a2 2 0 0 1-.428-.728c-.103-.313-.102-.644-.101-.908v-.072c0-1.963.002-5.303.004-7.169 0-.448 0-.672.095-.803a.5.5 0 0 1 .35-.204c.16-.018.356.092.747.312l7.396 4.16c.149.084.223.125.277.185a.5.5 0 0 1 .106.18c.025.077.025.162.025.332v8.176c0 .447 0 .67-.094.801a.5.5 0 0 1-.348.205",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M20.5 7.278 12 12m0 0L3.5 7.278M12 12v9.5m9-5.441V7.94c0-.342 0-.513-.05-.666a1 1 0 0 0-.215-.364c-.109-.119-.258-.202-.558-.368l-7.4-4.111c-.284-.158-.425-.237-.575-.268a1 1 0 0 0-.403 0c-.15.031-.292.11-.576.268l-7.4 4.11c-.3.167-.45.25-.558.369a1 1 0 0 0-.215.364C3 7.428 3 7.599 3 7.94v8.118c0 .342 0 .514.05.666a1 1 0 0 0 .215.364c.109.119.258.202.558.368l7.4 4.111c.284.158.425.237.576.268.133.027.27.027.402 0 .15-.031.292-.11.576-.268l7.4-4.11c.3-.167.45-.25.558-.369a1 1 0 0 0 .215-.364c.05-.152.05-.324.05-.666M16.5 9.5l-9-5",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  G = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1m0 6a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 0 1 1-1",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M12 8v8m-4-4h8m6 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  J = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsxs(o.Fragment, {
        children: [
          o.jsx("path", {
            fill: "currentColor",
            d: "M10 6a1 1 0 0 1 1-1 6 6 0 0 1 6 6 1 1 0 1 1-2 0 4 4 0 0 0-4-4 1 1 0 0 1-1-1",
          }),
          " ",
          o.jsx("path", {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M2 11a9 9 0 1 1 16.032 5.618l3.675 3.675a1 1 0 0 1-1.414 1.414l-3.675-3.675A9 9 0 0 1 2 11m9-7a7 7 0 1 0 0 14 7 7 0 0 0 0-14",
            clipRule: "evenodd",
          }),
        ],
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "m21 21-4.35-4.35M11 6a5 5 0 0 1 5 5m3 0a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  K = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M7.759 2H8a1 1 0 1 1 0 2h-.2c-.857 0-1.439 0-1.889.038-.438.035-.663.1-.819.18a2 2 0 0 0-.874.874c-.08.156-.145.38-.18.819C4 6.361 4 6.943 4 7.8V8a1 1 0 1 1-2 0v-.241c0-.805 0-1.47.044-2.01.046-.563.145-1.08.392-1.565a4 4 0 0 1 1.748-1.748c.485-.247 1.002-.346 1.564-.392C6.29 2 6.954 2 7.758 2M3 15a1 1 0 0 1 1 1v.2c0 .857 0 1.439.038 1.889.035.438.1.663.18.819a2 2 0 0 0 .874.874c.156.08.38.145.819.18C6.361 20 6.943 20 7.8 20H8a1 1 0 1 1 0 2h-.241c-.805 0-1.47 0-2.01-.044-.563-.046-1.08-.145-1.565-.392a4 4 0 0 1-1.748-1.748c-.247-.485-.346-1.002-.392-1.564C2 17.71 2 17.046 2 16.242V16a1 1 0 0 1 1-1M18.089 4.038C17.639 4 17.057 4 16.2 4H16a1 1 0 1 1 0-2h.241c.805 0 1.47 0 2.01.044.563.046 1.08.145 1.565.392a4 4 0 0 1 1.748 1.748c.247.485.346 1.002.392 1.564C22 6.29 22 6.954 22 7.758V8a1 1 0 1 1-2 0v-.2c0-.857 0-1.439-.038-1.889-.035-.438-.1-.663-.18-.819a2 2 0 0 0-.874-.874c-.156-.08-.38-.145-.819-.18M21 15a1 1 0 0 1 1 1v.241c0 .805 0 1.47-.044 2.01-.046.563-.145 1.08-.392 1.565a4 4 0 0 1-1.748 1.748c-.485.247-1.002.346-1.564.392-.541.044-1.206.044-2.01.044H16a1 1 0 1 1 0-2h.2c.857 0 1.439 0 1.889-.038.438-.035.663-.1.819-.18a2 2 0 0 0 .874-.874c.08-.156.145-.38.18-.819.037-.45.038-1.032.038-1.889V16a1 1 0 0 1 1-1M2 12a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m4.5 0a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H7.5a1 1 0 0 1-1-1m9 0a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1M11 12a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1m9 0a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H21a1 1 0 0 1-1-1",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M8 3h-.2c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 5.28 3 6.12 3 7.8V8m5 13h-.2c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V16m18-8v-.2c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C18.72 3 17.88 3 16.2 3H16m5 13v.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H16M3 12h.01m4.49 0h.01m8.99 0h.01M12 12h.01M21 12h.01",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  Y = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M3.957 9.44a4 4 0 1 1 4.226-.087l2.996 1.525 9.367-4.769a1 1 0 1 1 .908 1.782L13.384 12l8.07 4.109a1 1 0 1 1-.908 1.782l-9.367-4.769-2.996 1.526a4 4 0 1 1-3.845-.287L8.975 12 4.338 9.64a4 4 0 0 1-.38-.2M4 6a2 2 0 1 1 1.193 1.83l-.196-.1A2 2 0 0 1 4 6m.997 10.27a2 2 0 1 0 .197-.1z",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M4.5 8.6 21 17m0-10L4.5 15.4M6 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6m0 12a3 3 0 1 1 0 6 3 3 0 0 1 0-6",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  Z = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        d: "M21.595 1.458c-.396-.133-.764-.037-.947.016-.2.058-.438.151-.677.244L3.014 8.336a10 10 0 0 0-.724.303c-.173.085-.54.275-.744.669a1.5 1.5 0 0 0 .001 1.384c.205.394.572.583.744.668.2.098.458.199.725.303l4.72 1.835c.352.137.528.206.704.21a1 1 0 0 0 .448-.095c.159-.074.292-.208.56-.475l4.845-4.845a1 1 0 1 1 1.414 1.414l-4.845 4.845c-.267.268-.401.401-.475.56a1 1 0 0 0-.095.448c.005.176.073.352.21.704l1.835 4.72c.104.267.205.525.303.725.085.172.274.539.668.744a1.5 1.5 0 0 0 1.384 0c.394-.204.584-.57.669-.742.098-.2.2-.458.303-.725l6.618-16.957c.093-.24.186-.477.244-.677.053-.183.149-.551.017-.947a1.5 1.5 0 0 0-.948-.947",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M10.5 13.5 21 3M10.627 13.828l2.628 6.758c.232.596.347.893.514.98a.5.5 0 0 0 .462 0c.167-.086.283-.384.515-.979l6.59-16.888c.21-.537.315-.806.258-.977a.5.5 0 0 0-.316-.316c-.172-.057-.44.048-.978.257L3.413 9.253c-.595.233-.893.349-.98.516a.5.5 0 0 0 0 .461c.087.167.385.283.98.514l6.759 2.629c.12.046.18.07.232.106a.5.5 0 0 1 .116.117c.037.05.06.111.107.232",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  _ = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        d: "M12.646 1.776a1.5 1.5 0 0 0-1.292 0c-.353.168-.547.46-.645.62a8 8 0 0 0-.307.583L8.246 7.346l-4.822.705a8 8 0 0 0-.65.113c-.182.044-.52.139-.789.423a1.5 1.5 0 0 0-.398 1.228c.051.387.27.663.391.805.127.148.295.312.46.472l3.488 3.397-.823 4.799a8 8 0 0 0-.095.652c-.014.187-.029.538.158.882a1.5 1.5 0 0 0 1.045.759c.384.071.714-.051.887-.123a8 8 0 0 0 .591-.291L12 18.9l4.31 2.267c.204.107.412.216.592.29.174.073.503.195.887.124a1.5 1.5 0 0 0 1.045-.76c.187-.343.172-.694.158-.881a8 8 0 0 0-.095-.652l-.822-4.799 3.487-3.397c.165-.16.333-.324.46-.472.122-.142.34-.418.39-.805a1.5 1.5 0 0 0-.397-1.228c-.27-.284-.607-.38-.79-.423a8 8 0 0 0-.649-.113l-4.822-.705L13.6 2.98a8 8 0 0 0-.308-.582c-.098-.16-.292-.453-.645-.621",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M11.283 3.453c.23-.467.345-.7.502-.775a.5.5 0 0 1 .43 0c.157.075.272.308.502.775l2.187 4.43c.068.138.102.207.152.26a.5.5 0 0 0 .155.114c.066.03.143.042.295.064l4.891.715c.515.075.773.113.892.238a.5.5 0 0 1 .133.41c-.023.172-.21.353-.582.716l-3.54 3.446c-.11.108-.165.162-.2.225a.5.5 0 0 0-.06.184c-.009.072.004.148.03.3l.835 4.867c.088.514.132.77.05.922a.5.5 0 0 1-.349.253c-.17.032-.4-.09-.862-.332l-4.373-2.3c-.136-.07-.204-.107-.276-.12a.5.5 0 0 0-.192 0c-.072.013-.14.05-.276.12l-4.373 2.3c-.461.243-.692.364-.862.332a.5.5 0 0 1-.348-.253c-.083-.152-.039-.409.05-.922l.834-4.867c.026-.152.039-.228.03-.3a.5.5 0 0 0-.06-.184c-.035-.063-.09-.117-.2-.225L3.16 10.4c-.373-.363-.56-.544-.582-.716a.5.5 0 0 1 .132-.41c.12-.125.377-.163.892-.238l4.891-.715c.152-.022.228-.034.295-.064a.5.5 0 0 0 .155-.113c.05-.054.084-.123.152-.26z",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  $ = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M10.839 3H5.16c-.527 0-.981 0-1.356.03-.395.033-.789.104-1.167.297a3 3 0 0 0-1.311 1.311c-.193.378-.264.772-.296 1.167C1 6.18 1 6.635 1 7.161V15c0 1.34.88 2.476 2.093 2.86a4.001 4.001 0 0 0 7.781.14h3.662a3.5 3.5 0 0 0 6.937-.06 2 2 0 0 0 .292-.092 2 2 0 0 0 1.083-1.082 2 2 0 0 0 .14-.65c.012-.175.012-.38.012-.59v-2.914c0-.19.001-.43-.055-.665q-.075-.308-.24-.578a2.8 2.8 0 0 0-.43-.508l-.037-.037-4.062-4.062-.036-.036a2.8 2.8 0 0 0-.51-.431 2 2 0 0 0-.577-.24A2.8 2.8 0 0 0 16.388 6h-1.406l-.013-.195c-.032-.395-.103-.789-.296-1.167a3 3 0 0 0-1.311-1.311c-.378-.193-.772-.264-1.167-.296A18 18 0 0 0 10.838 3m10.16 12.696L21 15.5v-2.837c0-.131 0-.196-.002-.244v-.004l-.003-.002a6 6 0 0 0-.17-.174l-4.063-4.063a6 6 0 0 0-.175-.17l-.002-.003h-.004A6 6 0 0 0 16.337 8H15v7.696A3.5 3.5 0 0 1 18 14a3.5 3.5 0 0 1 3 1.696M7 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4m9.5 2.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M14 7h2.337c.245 0 .367 0 .482.028a1 1 0 0 1 .29.12c.1.061.187.148.36.32l4.062 4.063c.173.173.26.26.322.36q.082.136.12.29c.027.115.027.237.027.482V15.5c0 .466 0 .699-.076.883a1 1 0 0 1-.541.54c-.184.077-.417.077-.883.077m-5 0H14m0 0V7.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C12.48 4 11.92 4 10.8 4H5.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C2 5.52 2 6.08 2 7.2V15a2 2 0 0 0 2 2m10 0h-4m0 0a3 3 0 1 1-6 0m6 0a3 3 0 1 0-6 0m16.5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  o1 = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M3 21a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1M6 3a1 1 0 0 1 1 1v7a5 5 0 0 0 10 0V4a1 1 0 1 1 2 0v7a7 7 0 1 1-14 0V4a1 1 0 0 1 1-1",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M18 4v7a6 6 0 0 1-12 0V4M4 21h16",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  e1 = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M8.786 14.5h6.428c.727 0 1.222 0 1.654.076a5 5 0 0 1 4.056 4.056c.076.432.076.927.076 1.654 0 .158.005.318-.023.474a1.5 1.5 0 0 1-1.216 1.217c-.137.024-.28.023-.351.023Q12 21.961 4.59 22c-.07 0-.214.001-.35-.023a1.5 1.5 0 0 1-1.217-1.216c-.028-.157-.023-.317-.023-.475 0-.727 0-1.222.076-1.654a5 5 0 0 1 4.056-4.056c.432-.076.927-.076 1.654-.076M6.5 7.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M20 21c0-1.396 0-2.093-.172-2.661a4 4 0 0 0-2.667-2.667c-.568-.172-1.265-.172-2.661-.172h-5c-1.396 0-2.093 0-2.661.172a4 4 0 0 0-2.667 2.667C4 18.907 4 19.604 4 21M16.5 7.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  l1 = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M19.491 8.187A6 6 0 0 1 18 20H6.5A6.5 6.5 0 0 1 4.968 7.181a8.003 8.003 0 0 1 14.523 1.005m-12.198 4.52a1 1 0 0 0 1.414 0L11 10.414V16a1 1 0 1 0 2 0v-5.586l2.293 2.293a1 1 0 0 0 1.414-1.414l-4-4a1 1 0 0 0-1.414 0l-4 4a1 1 0 0 0 0 1.414",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M4 16.242A4.5 4.5 0 0 1 6.08 8.02a6.002 6.002 0 0 1 11.84 0A4.5 4.5 0 0 1 20 16.242M8 16l4-4m0 0 4 4m-4-4v9",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  r1 = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M18 6 6 18M6 6l12 12",
      }),
      line: o.jsx("path", {
        fill: "currentColor",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M18 6 6 18M6 6l12 12",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  n1 = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1m3.707 7.293a1 1 0 0 1 0 1.414L13.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 12 8.293 9.707a1 1 0 0 1 1.414-1.414L12 10.586l2.293-2.293a1 1 0 0 1 1.414 0",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "m15 9-6 6m0-6 6 6m7-3c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  },
  i1 = (a) => {
    var r = a,
      { variant: e = "solid", size: l = "md" } = r,
      n = s(r, ["variant", "size"]);
    const c = {
      solid: o.jsx("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M8.236 6.432c-.872-1.225-1.855-1.587-2.598-1.37-.974.286-1.468.923-1.601 1.679-.14.8.109 1.865.94 2.907a1 1 0 0 1-1.565 1.246c-1.107-1.39-1.605-3.019-1.345-4.5.268-1.524 1.324-2.756 3.008-3.25 1.915-.563 3.68.567 4.79 2.13.941 1.322 1.559 3.114 1.617 5.07q.4-.096.769-.155c.638-.1 1.464-.158 2.117.193.377.203.68.533.827.982.137.418.113.856.023 1.262q-.027.12-.045.225c.303-.203.67-.502 1.086-.894.488-.461.934-.809 1.35-1.017.408-.204.96-.355 1.512-.108.527.236.762.707.871 1 .116.31.177.656.22.92l.035.218c.024.148.044.276.068.397q.044-.03.095-.068a1 1 0 0 1 1.18 1.616c-.425.31-.888.565-1.377.615a1.52 1.52 0 0 1-1.393-.596c-.255-.331-.367-.73-.43-1.006a11 11 0 0 1-.126-.694l-.052-.318a6 6 0 0 0-.58.496c-.494.466-.98.865-1.433 1.157-.418.27-.942.536-1.481.551a1.5 1.5 0 0 1-.949-.287 1.56 1.56 0 0 1-.555-.823c-.157-.532-.092-1.172.052-1.818l.014-.073-.066-.005a3.4 3.4 0 0 0-.652.05c-.37.06-.778.157-1.21.279-.238 2.015-.694 4.196-1.517 5.83-.472.937-1.117 1.802-2.015 2.3-.949.527-2.04.57-3.196.107-1.874-.751-2.446-2.796-1.884-4.632.573-1.87 2.287-3.661 5.146-4.59q.36-.117.77-.256.399-.135.826-.275c.061-1.788-.468-3.4-1.246-4.495m1.008 6.683q-.374.126-.74.245c-2.37.77-3.507 2.148-3.852 3.274-.355 1.16.087 1.937.716 2.19.674.27 1.127.197 1.48.001.404-.224.817-.69 1.2-1.451.567-1.125.952-2.66 1.196-4.259m8.86-.618-.005-.01z",
        clipRule: "evenodd",
      }),
      line: o.jsx("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeWidth: "2",
        d: "M4.195 10.271C2.257 7.84 2.699 4.883 5.357 4.103s5.496 2.983 5.09 7.388c-.405 4.406-1.792 9.727-5.45 8.26-2.503-1.002-2.03-5.644 3.198-7.342 2.628-.853 6.588-2.432 6.047 0-.54 2.432.833 2.04 2.703.276C20.64 9.197 17.981 16.31 21 14.107",
      }),
    };
    return o.jsx(
      "svg",
      t(
        d(
          {
            height: i[l],
            width: i[l],
            viewBox: "0 0 24 24",
            fill: e === "line" ? "none" : void 0,
          },
          n
        ),
        { children: c[e] }
      )
    );
  };
export {
  M as A,
  H as B,
  I as C,
  f as D,
  S as E,
  F,
  U as I,
  X as L,
  D as M,
  Q as P,
  i1 as S,
  $ as T,
  l1 as U,
  r1 as X,
  g as a,
  B as b,
  T as c,
  e1 as d,
  K as e,
  L as f,
  Y as g,
  _ as h,
  N as i,
  w as j,
  J as k,
  q as l,
  V as m,
  W as n,
  A as o,
  Z as p,
  R as q,
  z as r,
  o1 as s,
  y as t,
  b as u,
  E as v,
  G as w,
  n1 as x,
  O as y,
  P as z,
};
