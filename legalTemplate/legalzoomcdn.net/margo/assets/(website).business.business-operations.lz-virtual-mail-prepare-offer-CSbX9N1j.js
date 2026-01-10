var S = Object.defineProperty,
  W = Object.defineProperties;
var B = Object.getOwnPropertyDescriptors;
var c = Object.getOwnPropertySymbols;
var j = Object.prototype.hasOwnProperty,
  w = Object.prototype.propertyIsEnumerable;
var y = (e, t, s) =>
    t in e
      ? S(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s })
      : (e[t] = s),
  o = (e, t) => {
    for (var s in t || (t = {})) j.call(t, s) && y(e, s, t[s]);
    if (c) for (var s of c(t)) w.call(t, s) && y(e, s, t[s]);
    return e;
  },
  v = (e, t) => W(e, B(t));
var N = (e, t) => {
  var s = {};
  for (var r in e) j.call(e, r) && t.indexOf(r) < 0 && (s[r] = e[r]);
  if (e != null && c)
    for (var r of c(e)) t.indexOf(r) < 0 && w.call(e, r) && (s[r] = e[r]);
  return s;
};
import { j as a } from "./index-DlOqfcZ1.js";
import {
  u as I,
  T as p,
  t as _,
  i as C,
  b as G,
  H as k,
  V as q,
} from "./Header-X14z1RYr.js";
import { a as E, c as D } from "./cx-lNe0FDi1.js";
import { F as T, c as P } from "./FeatureFlagProvider-BooHyywt.js";
import { C as F, D as z, a as V } from "./components-CVntVR-p.js";
function A(O) {
  var f = O,
    {
      as: e = "a",
      className: t,
      text: s,
      trackingEvents: r,
      href: n,
      variant: u = "primary",
      children: i,
      disabled: l = !1,
      onClick: g,
      isProductCta: H = !1,
      onClickOverride: m,
    } = f,
    L = N(f, [
      "as",
      "className",
      "text",
      "trackingEvents",
      "href",
      "variant",
      "children",
      "disabled",
      "onClick",
      "isProductCta",
      "onClickOverride",
    ]);
  const d = I(),
    M = {
      primary: E(
        "btn-primary",
        d === p.NEGRONI
          ? "rounded-lg px-6 py-4 text-base md:min-w-[13.5rem] md:w-auto"
          : "rounded-full px-10 py-5 text-lg md:w-auto"
      ),
      secondary: E(
        "btn-secondary",
        d === p.NEGRONI
          ? "rounded-lg px-7 py-2 text-base"
          : "rounded-full px-7 py-2 text-lg"
      ),
      link: d === p.NEGRONI ? "text-base" : "text-lg",
    }[u];
  return a.jsx(
    e,
    v(
      o(
        o(
          o(
            o(
              o(
                {
                  className: D(
                    M,
                    l && "pointer-events-none !bg-grey-bombay",
                    t
                  ),
                  onClick:
                    m != null
                      ? m
                      : (b) => {
                          g == null || g(b),
                            b.preventDefault(),
                            n && (_(r), window.location.assign(n));
                        },
                },
                e === "a" ? { href: n } : {}
              ),
              L
            ),
            i ? {} : C(s)
          ),
          l ? { tabIndex: -1 } : {}
        ),
        H ? G({ "data-tracking-product-cta": !0 }) : void 0
      ),
      { children: i }
    )
  );
}
const U = "https://legalzoomcdn.net/margo/assets/not-found-CFuj15Bm.svg",
  $ = "https://legalzoomcdn.net/margo/assets/potholes-Ca_WpgVk.svg",
  Y = "https://legalzoomcdn.net/margo/assets/trailblazers-DAqGu9h7.svg";
function J({ links: e }) {
  return a.jsx("ul", {
    className: "list-disc list-inside ml-4",
    children: e.map((t) =>
      a.jsx(
        "li",
        {
          className: "font-semibold underline",
          children: a.jsx("a", { href: t.href, children: t.label }),
        },
        t.href
      )
    ),
  });
}
function h({
  title: e,
  subTitle: t,
  listTitle: s,
  imgSrc: r,
  imgAlt: n,
  imgHeight: u,
  imgWidth: i,
  links: l,
}) {
  return a.jsxs("div", {
    className:
      "container gap-x-8 gap-y-12 flex justify-between flex-col py-12 p-8 lg:flex-row-reverse lg:gap-y-0",
    children: [
      a.jsx("img", {
        loading: "eager",
        src: r,
        height: u,
        width: i,
        className: "w-full h-auto p-0 md:px-44 lg:w-1/2 lg:p-0",
        alt: n,
      }),
      a.jsxs("div", {
        className: "lg:text-left p-0 md:px-10 lg:p-0 gap",
        children: [
          a.jsx("h1", {
            className:
              "text-black text-4xl font-semibold leading-10 tracking-tighter md:text-5xl",
            children: e,
          }),
          a.jsxs("div", {
            className:
              "text-black text-base leading-6 tracking-tight my-6 flex flex-col gap-y-4",
            children: [
              a.jsx("p", { children: t }),
              a.jsx("span", { children: s }),
              l && a.jsx(J, { links: l }),
            ],
          }),
        ],
      }),
    ],
  });
}
const R = "8883790854",
  x = [
    { label: "Home", href: "/" },
    { label: "Legal form templates", href: "/templates" },
    { label: "My account", href: "/my/account" },
    { label: "All business products & services", href: "/business/" },
    { label: "All personal products & services", href: "/personal/" },
    { label: "Resources", href: "/articles" },
  ];
function re({ includeHeader: e = !0 }) {
  const t = F(),
    s = z(t) ? t : void 0;
  return s && s.status > 399
    ? a.jsxs(T, {
        featureFlags: {},
        children: [
          e ? a.jsx(k, { phoneNumber: R }) : null,
          s.status > 499
            ? a.jsx(h, {
                links: x,
                title: "The road to innovation is full of potholes.",
                subTitle: "We’re working on patching this one.",
                imgSrc: $,
                imgAlt:
                  "A person in a yellow jacket taking notes next to an open manhole with a warning sign above it, under a bright sun and a partly cloudy sky, with a red flower in the foreground.",
                imgWidth: "628",
                imgHeight: "804",
                listTitle: "In the meantime, try one of these:",
              })
            : s.status === 404 || s.status === 410
            ? a.jsx(h, {
                links: x,
                title: "Your curiosity is inspiring.",
                subTitle:
                  "Unfortunately, the page you’re looking for isn’t here.",
                imgSrc: U,
                imgAlt:
                  "A person standing on books, peering through a telescope, with a light bulb overhead, framed images of a question mark and abstract shapes, and a flower sprouting from a pencil.",
                imgWidth: "669",
                imgHeight: "750",
                listTitle: "Try one of these:",
              })
            : a.jsx(h, {
                links: x,
                title: "We love trailblazers!",
                subTitle:
                  "Unfortunately, this path happens to be a restricted one.",
                imgSrc: Y,
                imgAlt:
                  "A person jogging on a curved path past pine trees, a warning sign, and red flowers under a sunny sky.",
                imgWidth: "660",
                imgHeight: "788",
                listTitle: "Let’s get you back on track:",
              }),
        ],
      })
    : a.jsxs(T, {
        featureFlags: {},
        children: [e ? a.jsx(k, { phoneNumber: R }) : null, a.jsx(K, {})],
      });
}
function K() {
  const e = F(),
    { pathname: t } = V(),
    s = z(e) ? e : void 0;
  q(() => {
    P({
      content_name: "error boundary",
      content_type: "error",
      screen_name: t,
      screen_type: "component",
      category: "margo",
    });
  });
  const r = () => {
    var n;
    (n = document.querySelector("button.chat-button")) == null || n.click();
  };
  return (
    console.error("ErrorBoundary Rendered", e),
    a.jsx("main", {
      children: a.jsxs("div", {
        className:
          "mb-40 mt-20 flex flex-col items-center justify-center text-center",
        role: "alert",
        children: [
          a.jsx("h1", {
            className:
              "mb-12 text-center text-4xl font-semibold tracking-tight",
            children:
              s && s.statusText
                ? `${s.status} ${s.statusText}`
                : "Something went wrong",
          }),
          a.jsxs("div", {
            className: "flex justify-center space-x-10",
            children: [
              a.jsx(A, { onClick: r, text: "Chat" }),
              a.jsx(A, { href: t, text: "Try Again" }),
            ],
          }),
          null,
        ],
      }),
    })
  );
}
export { A as C, re as E, K as M };
