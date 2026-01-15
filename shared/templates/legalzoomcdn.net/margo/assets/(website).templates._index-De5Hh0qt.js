var w = Object.defineProperty,
  S = Object.defineProperties;
var L = Object.getOwnPropertyDescriptors;
var x = Object.getOwnPropertySymbols;
var u = Object.prototype.hasOwnProperty,
  f = Object.prototype.propertyIsEnumerable;
var j = (a, t, s) =>
    t in a
      ? w(a, t, { enumerable: !0, configurable: !0, writable: !0, value: s })
      : (a[t] = s),
  c = (a, t) => {
    for (var s in t || (t = {})) u.call(t, s) && j(a, s, t[s]);
    if (x) for (var s of x(t)) f.call(t, s) && j(a, s, t[s]);
    return a;
  },
  d = (a, t) => S(a, L(t));
var p = (a, t) => {
  var s = {};
  for (var r in a) u.call(a, r) && t.indexOf(r) < 0 && (s[r] = a[r]);
  if (a != null && x)
    for (var r of x(a)) t.indexOf(r) < 0 && f.call(a, r) && (s[r] = a[r]);
  return s;
};
import { j as e, r as y } from "./index-DlOqfcZ1.js";
import { T as N } from "./tailwind-page-B-3NcKFe.js";
import { T as C } from "./Header-X14z1RYr.js";
import { B as v } from "./Breadcrumb-AWs1owVg.js";
import { c as E } from "./env-9DNInbPl.js";
import { H as P } from "./HeroSatisfaction-FjRuALH2.js";
import { S as T, T as H, F as A } from "./TemplateCategories-BNwkRB5f.js";
import { F as g } from "./FeaturedTemplates-DwjtM-o4.js";
import { D as M } from "./Disclaimers-DcZ3g5jw.js";
import { b as F, e as B, a as Z, g as k } from "./TemplateCardsRow-D2R5BSsr.js";
import "./FeatureFlagProvider-BooHyywt.js";
import { u as _ } from "./components-CVntVR-p.js";
import { E as A1 } from "./(website).business.business-operations.lz-virtual-mail-prepare-offer-CSbX9N1j.js";
import "./Footer-CHbJ_jos.js";
import "./index.esm-hwGxxp9Z.js";
import "./use-hydrated-BNRMqBT5.js";
import "./cx-lNe0FDi1.js";
import "./useTealiumTracking-qN4dWJhK.js";
import "./set-product-details-Cp8Dl5lh.js";
import "./preload-helper-CzpWA6Lo.js";
import "./Trustpilot-Bvj4fae8.js";
import "./JsonLD-DNncv__y.js";
import "./LearnMore-BFB9JfYo.js";
import "./useShowRatingJsonLd-DNhi2mGM.js";
import "./rating-json-ld-D9a4MKgv.js";
import "./index-BAO0G-d_.js";
import "./merge-CnhzW7Ry.js";
import "./identity-C5ZgJBfx.js";
import "./Modal-BqGgxzW4.js";
import "./classNames-ApZULTIs.js";
import "./clsx-CH7BE6MN.js";
import "./ModalWithTrigger-C5aRoOcN.js";
import "./chunk-G4PTP2XI-D8ii0GKl.js";
import "./chunk-QYI3DYLK-BJcoYNoM.js";
import "./throttle-BoZChKly.js";
const I = (r) => {
    var l = r,
      { title: a, titleId: t } = l,
      s = p(l, ["title", "titleId"]);
    return e.jsxs(
      "svg",
      d(
        c(
          {
            width: 24,
            height: 24,
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            "aria-labelledby": t,
          },
          s
        ),
        {
          children: [
            a ? e.jsx("title", { id: t, children: a }) : null,
            e.jsx("path", {
              d: "M4.52 22.262c-.887.26-1.33.391-1.513.29a.5.5 0 0 1-.258-.434c-.001-.21.325-.536.979-1.19l6.754-6.754A2.002 2.002 0 0 0 13 12.242a2 2 0 1 0-3.932.518l-6.754 6.754c-.654.654-.98.98-1.19.98a.5.5 0 0 1-.433-.258c-.102-.183.029-.627.29-1.513L4.307 7.425c.065-.277.148-.625.34-.92a2 2 0 0 1 .65-.625c.303-.18.653-.249.932-.304l5.207-1.04a2 2 0 0 1 .076-.912c.094-.29.254-.512.402-.686.136-.16.31-.333.488-.512l.782-.782c.179-.179.353-.353.512-.488a2.02 2.02 0 0 1 .686-.402 2 2 0 0 1 1.236 0c.29.094.512.254.687.402.159.135.333.31.511.488L21.6 6.426c.178.179.352.352.487.512.148.174.308.396.402.686a2 2 0 0 1 0 1.236c-.094.29-.254.512-.402.687-.135.159-.309.333-.487.51l-.783.783a9.18 9.18 0 0 1-.511.488 2.022 2.022 0 0 1-.687.402 2 2 0 0 1-.91.076l-1.042 5.207c-.055.28-.123.63-.304.932a2 2 0 0 1-.625.65c-.295.193-.642.275-.92.34L4.52 22.263Z",
              fill: "#252424",
            }),
          ],
        }
      )
    );
  },
  R = (r) => {
    var l = r,
      { title: a, titleId: t } = l,
      s = p(l, ["title", "titleId"]);
    return e.jsxs(
      "svg",
      d(c({ fill: "none", viewBox: "0 0 24 24", "aria-labelledby": t }, s), {
        children: [
          a ? e.jsx("title", { id: t, children: a }) : null,
          e.jsx("path", {
            d: "M8.645 5.5H4a1 1 0 0 1 0-2h4.645a3.502 3.502 0 0 1 6.71 0H20a1 1 0 1 1 0 2h-4.645A3.508 3.508 0 0 1 13 7.855V20h7a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h7V7.855A3.508 3.508 0 0 1 8.645 5.5Z",
            fill: "currentColor",
          }),
          e.jsx("path", {
            d: "M5.5 7a1 1 0 0 1 .84.456l3.003 4.635c.163.25.31.477.43.834.052.154.09.346.112.484.022.138.047.332.046.495 0 .142-.006.269-.022.393-.017.124-.043.222-.059.283l-.002.01C9.34 16.534 7.601 18 5.5 18s-3.84-1.465-4.348-3.41l-.002-.01a2.242 2.242 0 0 1-.059-.283 3.084 3.084 0 0 1-.022-.393 3.231 3.231 0 0 1 .046-.495c.023-.138.06-.33.112-.484.12-.357.267-.583.43-.835l3.004-4.634A1 1 0 0 1 5.5 7Zm0 2.839L4.1 12h2.8L5.5 9.839ZM19.34 7.456a1 1 0 0 0-1.68 0l-3.003 4.635c-.163.25-.31.477-.43.834-.053.154-.09.346-.112.484a3.238 3.238 0 0 0-.046.495c0 .142.006.269.022.393.017.124.043.222.059.283l.002.01C14.66 16.534 16.399 18 18.5 18s3.84-1.465 4.348-3.41l.002-.01c.016-.06.042-.159.059-.283.016-.124.021-.251.022-.393a3.225 3.225 0 0 0-.047-.495 3.231 3.231 0 0 0-.11-.484c-.121-.357-.268-.583-.431-.835l-3.004-4.634ZM17.1 12l1.4-2.161L19.9 12h-2.8Z",
            fill: "currentColor",
          }),
        ],
      })
    );
  },
  V = (r) => {
    var l = r,
      { title: a, titleId: t } = l,
      s = p(l, ["title", "titleId"]);
    return e.jsxs(
      "svg",
      d(c({ fill: "none", viewBox: "0 0 24 24", "aria-labelledby": t }, s), {
        children: [
          a ? e.jsx("title", { id: t, children: a }) : null,
          e.jsx("path", {
            d: "M21.675 17.262a1 1 0 0 1 .063 1.413l-1 1.094C20.028 20.545 19.046 21 18 21c-1.045 0-2.027-.455-2.737-1.23A1.716 1.716 0 0 0 14 19.19c-.455 0-.911.197-1.263.58a1 1 0 1 1-1.474-1.352c.71-.774 1.693-1.228 2.737-1.228 1.045 0 2.027.454 2.737 1.228l.002.002c.35.384.807.58 1.261.58.455 0 .91-.196 1.262-.58l1-1.095a1 1 0 0 1 1.413-.063ZM15.793 2.793a3.121 3.121 0 1 1 4.414 4.414L7.644 19.77l-.058.059c-.288.288-.541.542-.847.73a3 3 0 0 1-.867.358c-.348.084-.707.084-1.114.083H3a1 1 0 0 1-1-1v-1.758c0-.407 0-.765.083-1.114a3 3 0 0 1 .36-.867c.186-.305.44-.559.728-.846l.06-.06L15.792 2.794Z",
            fill: "currentColor",
          }),
        ],
      })
    );
  },
  W = (r) => {
    var l = r,
      { title: a, titleId: t } = l,
      s = p(l, ["title", "titleId"]);
    return e.jsxs(
      "svg",
      d(
        c(
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: 24,
            height: 24,
            viewBox: "0 0 24 24",
            fill: "none",
            "aria-labelledby": t,
          },
          s
        ),
        {
          children: [
            a ? e.jsx("title", { id: t, children: a }) : null,
            e.jsx("path", {
              d: "M6.759 3H11a1 1 0 1 1 0 2H6.8c-.857 0-1.439.001-1.889.038-.438.036-.663.1-.819.18a2 2 0 0 0-.874.874c-.08.157-.145.38-.18.82C3 7.361 3 7.943 3 8.8v8.4c0 .857 0 1.44.038 1.89.035.438.1.662.18.818a2 2 0 0 0 .874.874c.156.08.38.145.819.18C5.361 21 5.943 21 6.8 21h8.4c.857 0 1.439 0 1.889-.037.438-.036.663-.101.819-.18a2 2 0 0 0 .874-.875c.08-.156.145-.38.18-.819C19 18.64 19 18.057 19 17.2V13a1 1 0 1 1 2 0v4.242c0 .805 0 1.469-.044 2.01-.046.562-.145 1.079-.392 1.564a4 4 0 0 1-1.748 1.748c-.485.247-1.002.346-1.564.392-.541.044-1.206.044-2.01.044H6.758c-.805 0-1.47 0-2.01-.044-.563-.046-1.08-.145-1.565-.392a4 4 0 0 1-1.748-1.748c-.247-.485-.346-1.002-.392-1.564C1 18.711 1 18.047 1 17.242V8.758c0-.805 0-1.47.044-2.01.046-.563.145-1.08.392-1.565a4 4 0 0 1 1.748-1.748c.485-.247 1.002-.346 1.564-.392C5.29 3 5.954 3 6.758 3Z",
              fill: "#252424",
            }),
            e.jsx("path", {
              d: "M17.793 1.793a3.121 3.121 0 1 1 4.414 4.414l-9.563 9.563-.059.059c-.287.288-.54.542-.846.73a3 3 0 0 1-.867.358c-.348.084-.707.084-1.114.083H8a1 1 0 0 1-1-1v-1.758c0-.407 0-.765.083-1.114a3 3 0 0 1 .36-.867c.186-.305.44-.559.728-.846l.06-.06 9.562-9.562Z",
              fill: "#252424",
            }),
          ],
        }
      )
    );
  },
  $ = [
    {
      component: e.jsx(R, {}),
      label: "Select from 150+ attorney-drafted form templates",
    },
    {
      component: e.jsx(I, {}),
      label: "Fill quickly and reduce errors with guided questions",
    },
    {
      component: e.jsx(W, {}),
      label: "Customize to meet your needs with a rich editor",
    },
    {
      component: e.jsx(V, {}),
      label: "Sign and manage your documents online securely in one place",
    },
  ];
function D() {
  const a = (l, i, o) =>
      e.jsxs(
        "div",
        {
          className: "flex flex-col gap-y-3 pr-4",
          children: [
            e.jsx("div", { style: { width: "24px" }, children: l }),
            e.jsx("div", {
              className: "text-xs md:w-52 lg:w-auto",
              children: i,
            }),
          ],
        },
        o
      ),
    { TEMPLATE_STORE_ASSETS_BASE_URL: t } = E,
    s = `${t}/images/legalzoom/template-store-hero-image.webp`,
    r = { list: [{ text: "Home", href: "/" }, { text: "Templates" }] };
  return e.jsx("div", {
    className: "bg-neutral-50",
    children: e.jsx("div", {
      className: "flex gap-x-20 bg-cover bg-center h-[inherit]",
      style: { backgroundImage: `url('${s}')` },
      children: e.jsxs("div", {
        className:
          "px-6 py-5 md:px-10 md:py-4 flex flex-1 flex-col gap-y-10 w-full lg:w-1/2 lg:max-w-[50%]",
        children: [
          e.jsx(v, c({}, r)),
          e.jsxs("div", {
            className: "md:pl-10 text-neutral-800",
            children: [
              e.jsxs("div", {
                className: "flex flex-col gap-y-10",
                children: [
                  e.jsxs("div", {
                    className: "flex flex-col gap-y-4",
                    children: [
                      e.jsx("h1", {
                        className:
                          "text-3xl font-semibold leading-10 tracking-tight",
                        children:
                          "Create documents easily with templates, drafted by attorneys",
                      }),
                      e.jsx("div", {
                        className: "-mt-3",
                        children: e.jsx("p", {
                          className: "text-base font-normal tracking-tight",
                          children:
                            "$59/document or $99/year for unlimited documents",
                        }),
                      }),
                      e.jsx(T, {
                        showPopularSearchParams: !0,
                        placeholder: "Search templates",
                        borderColor: "transparent",
                      }),
                    ],
                  }),
                  e.jsx("div", {
                    className:
                      "grid grid-cols-2 lg:grid-cols-none lg:grid-flow-col gap-y-8",
                    children: $.map((l, i) => a(l.component, l.label, i)),
                  }),
                ],
              }),
              e.jsx("div", {
                className:
                  "flex items-end gap-6 mt-4 lg:gap-5 justify-between md:justify-start",
                children: e.jsx(P, {}),
              }),
            ],
          }),
        ],
      }),
    }),
  });
}
class O extends y.Component {
  render() {
    const { categoryTemplates: t, categoryHeading: s } = this.props;
    return e.jsx(e.Fragment, {
      children: Object.keys(t).map((r) =>
        e.jsx(
          "div",
          {
            children: e.jsx(g, {
              headingText: s[r],
              seeAllLink: r,
              templatesWithLaunchPoints: t[r],
              categoryName: r,
            }),
          },
          r
        )
      ),
    });
  }
}
function U({
  categoryType: a,
  headingText: t,
  categories: s,
  categoryTemplates: r,
  categoryHeading: l,
}) {
  return e.jsx(y.Fragment, {
    children: (s || []).length
      ? e.jsxs(e.Fragment, {
          children: [
            e.jsx(H, { headingText: t, categoryType: a, categories: s }),
            e.jsx(O, { categoryTemplates: r, categoryHeading: l }),
          ],
        })
      : null,
  });
}
const C1 = ({ data: a }) => [
  { title: B },
  ...((a == null ? void 0 : a.meta) || []),
];
function E1() {
  const a = _(),
    { searchParam: t } = a,
    s = (l) => {
      const {
          featuredTemplatesWithLaunchPoints: i,
          searchedTemplates: o = [],
          searchParam: m = "",
        } = l,
        h = {
          list: [
            { text: "Home", href: "/" },
            { text: "Templates", href: "/templates" },
            { text: m },
          ],
        };
      return e.jsxs("div", {
        children: [
          e.jsxs("div", {
            className:
              "md:pl-2 md:pr-4 py-5 flex flex-col md:flex-row gap-y-4 justify-between",
            children: [
              e.jsx(v, c({}, h)),
              e.jsx("div", {
                className: "px-4",
                children: e.jsx(T, {
                  placeholder: "Search templates",
                  searchParam: m,
                }),
              }),
            ],
          }),
          e.jsx("div", {
            children: (o || []).length
              ? e.jsx("div", {
                  className:
                    "px-4 md:px-12 grid grid-cols-[repeat(2,1fr)] md:flex md:flex-wrap gap-x-3 gap-y-4 md:gap-6",
                  children: o.map((n, b) =>
                    e.jsx(
                      "div",
                      {
                        "data-test": "template-list-item",
                        children: e.jsx(Z, {
                          id: n.id,
                          cardIndex: b,
                          urlHash: k(n),
                          "data-test": "templatecategory",
                          imageSrc: n.thumbnail,
                          title: n.title,
                          description: n.description,
                        }),
                      },
                      n.id
                    )
                  ),
                })
              : e.jsx("div", {
                  className: "text-black text-2xl md:px-16",
                  children: `No templates found for '${m}'`,
                }),
          }),
          e.jsx("div", {
            className: "mb-12",
            children: e.jsx(g, {
              templatesWithLaunchPoints: i,
              headingText: "Featured Templates",
            }),
          }),
        ],
      });
    },
    r = (l) => {
      const {
        featuredTemplatesWithLaunchPoints: i,
        categories: o = [],
        categoryTemplates: m = {},
        categoryHeading: h = {},
      } = l;
      return e.jsxs(e.Fragment, {
        children: [
          e.jsx(D, {}),
          e.jsx(g, {
            templatesWithLaunchPoints: i,
            headingText: "Featured Templates",
          }),
          e.jsx(U, {
            categories: o,
            categoryTemplates: m,
            categoryHeading: h,
            categoryType: "ALL",
            headingText: "Browse by Category",
          }),
          e.jsx(A, {}),
        ],
      });
    };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx(N, {
        theme: C.NEGRONI,
        head: { phoneNumber: "8556920800" },
        children: t ? s(a) : r(a),
      }),
      e.jsx(M, { disclaimers: F }),
    ],
  });
}
export { A1 as ErrorBoundary, E1 as default, C1 as meta };
