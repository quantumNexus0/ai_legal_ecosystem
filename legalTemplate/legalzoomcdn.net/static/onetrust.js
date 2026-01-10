!(function (t, r) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = r())
    : "function" == typeof define && define.amd
    ? define([], r)
    : "object" == typeof exports
    ? (exports.AnalyticsOneTrust = r())
    : (t.AnalyticsOneTrust = r());
})(self, function () {
  return (function () {
    "use strict";
    var t = {
        d: function (r, e) {
          for (var n in e)
            t.o(e, n) &&
              !t.o(r, n) &&
              Object.defineProperty(r, n, { enumerable: !0, get: e[n] });
        },
        o: function (t, r) {
          return Object.prototype.hasOwnProperty.call(t, r);
        },
        r: function (t) {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(t, "__esModule", { value: !0 });
        },
      },
      r = {};
    function e(t) {
      return (
        (e =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        e(t)
      );
    }
    function n(t, r) {
      for (var n = 0; n < r.length; n++) {
        var o = r[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          "value" in o && (o.writable = !0),
          Object.defineProperty(
            t,
            ((i = o.key),
            (a = void 0),
            (a = (function (t, r) {
              if ("object" !== e(t) || null === t) return t;
              var n = t[Symbol.toPrimitive];
              if (void 0 !== n) {
                var o = n.call(t, r || "default");
                if ("object" !== e(o)) return o;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === r ? String : Number)(t);
            })(i, "string")),
            "symbol" === e(a) ? a : String(a)),
            o
          );
      }
      var i, a;
    }
    function o(t, r) {
      if (r && ("object" === e(r) || "function" == typeof r)) return r;
      if (void 0 !== r)
        throw new TypeError(
          "Derived constructors may only return object or undefined"
        );
      return (function (t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      })(t);
    }
    function i(t) {
      var r = "function" == typeof Map ? new Map() : void 0;
      return (
        (i = function (t) {
          if (
            null === t ||
            ((e = t), -1 === Function.toString.call(e).indexOf("[native code]"))
          )
            return t;
          var e;
          if ("function" != typeof t)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          if (void 0 !== r) {
            if (r.has(t)) return r.get(t);
            r.set(t, n);
          }
          function n() {
            return a(t, arguments, f(this).constructor);
          }
          return (
            (n.prototype = Object.create(t.prototype, {
              constructor: {
                value: n,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
            c(n, t)
          );
        }),
        i(t)
      );
    }
    function a(t, r, e) {
      return (
        (a = u()
          ? Reflect.construct.bind()
          : function (t, r, e) {
              var n = [null];
              n.push.apply(n, r);
              var o = new (Function.bind.apply(t, n))();
              return e && c(o, e.prototype), o;
            }),
        a.apply(null, arguments)
      );
    }
    function u() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        );
      } catch (t) {
        return !1;
      }
    }
    function c(t, r) {
      return (
        (c = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function (t, r) {
              return (t.__proto__ = r), t;
            }),
        c(t, r)
      );
    }
    function f(t) {
      return (
        (f = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            }),
        f(t)
      );
    }
    t.r(r),
      t.d(r, {
        withOneTrust: function () {
          return Vt;
        },
      });
    var l = (function (t) {
      !(function (t, r) {
        if ("function" != typeof r && null !== r)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(r && r.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          r && c(t, r);
      })(h, t);
      var r,
        e,
        i,
        a,
        l,
        s =
          ((r = h),
          (e = u()),
          function () {
            var t,
              n = f(r);
            if (e) {
              var i = f(this).constructor;
              t = Reflect.construct(n, arguments, i);
            } else t = n.apply(this, arguments);
            return o(this, t);
          });
      function h(t, r) {
        var e;
        return (
          (function (t, r) {
            if (!(t instanceof r))
              throw new TypeError("Cannot call a class as a function");
          })(this, h),
          ((e = s.call(this, r)).name = t),
          e
        );
      }
      return (
        (i = h),
        a && n(i.prototype, a),
        l && n(i, l),
        Object.defineProperty(i, "prototype", { writable: !1 }),
        i
      );
    })(i(Error));
    function s(t) {
      return (
        (s =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        s(t)
      );
    }
    function h(t, r) {
      for (var e = 0; e < r.length; e++) {
        var n = r[e];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(
            t,
            ((o = n.key),
            (i = void 0),
            (i = (function (t, r) {
              if ("object" !== s(t) || null === t) return t;
              var e = t[Symbol.toPrimitive];
              if (void 0 !== e) {
                var n = e.call(t, r || "default");
                if ("object" !== s(n)) return n;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === r ? String : Number)(t);
            })(o, "string")),
            "symbol" === s(i) ? i : String(i)),
            n
          );
      }
      var o, i;
    }
    function p(t, r) {
      if (!(t instanceof r))
        throw new TypeError("Cannot call a class as a function");
    }
    function y(t, r) {
      return (
        (y = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function (t, r) {
              return (t.__proto__ = r), t;
            }),
        y(t, r)
      );
    }
    function v(t) {
      var r = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var e,
          n = g(t);
        if (r) {
          var o = g(this).constructor;
          e = Reflect.construct(n, arguments, o);
        } else e = n.apply(this, arguments);
        return d(this, e);
      };
    }
    function d(t, r) {
      if (r && ("object" === s(r) || "function" == typeof r)) return r;
      if (void 0 !== r)
        throw new TypeError(
          "Derived constructors may only return object or undefined"
        );
      return (function (t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      })(t);
    }
    function g(t) {
      return (
        (g = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            }),
        g(t)
      );
    }
    var m = (function (t) {
      !(function (t, r) {
        if ("function" != typeof r && null !== r)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(r && r.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          r && y(t, r);
      })(i, t);
      var r,
        e,
        n,
        o = v(i);
      function i(t, r) {
        return (
          p(this, i),
          2 === arguments.length &&
            (t += " (Received: ".concat(JSON.stringify(r), ")")),
          o.call(this, "ValidationError", "[Validation] ".concat(t))
        );
      }
      return (
        (r = i),
        e && h(r.prototype, e),
        n && h(r, n),
        Object.defineProperty(r, "prototype", { writable: !1 }),
        r
      );
    })(l);
    function b(t) {
      return (
        (b =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        b(t)
      );
    }
    function w(t, r) {
      if ("function" != typeof t)
        throw new m("".concat(r, " is not a function"), t);
    }
    function O(t, r) {
      if (null === t || "object" !== b(t))
        throw new m("".concat(r, " is not an object"), t);
    }
    function j(t) {
      return (
        (j =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        j(t)
      );
    }
    function x(t) {
      var r = !0;
      if (t && "object" === j(t) && !Array.isArray(t))
        for (var e in ((r = !1), t))
          if ("boolean" != typeof t[e]) {
            r = !0;
            break;
          }
      if (r)
        throw new m(
          "Consent Categories should be {[categoryName: string]: boolean}",
          t
        );
    }
    function E(t) {
      if ("object" !== j(t) || !t)
        throw new m("Options should be an object", t);
      w(t.getCategories, "getCategories"),
        t.shouldLoadSegment && w(t.shouldLoadSegment, "shouldLoadSegment"),
        t.shouldEnableIntegration &&
          w(t.shouldEnableIntegration, "shouldEnableIntegration"),
        t.shouldDisableSegment &&
          w(t.shouldDisableSegment, "shouldDisableSegment"),
        t.integrationCategoryMappings &&
          O(t.integrationCategoryMappings, "integrationCategoryMappings"),
        t.registerOnConsentChanged &&
          w(t.registerOnConsentChanged, "registerOnConsentChanged");
    }
    var S = function (t) {
      for (
        var r = arguments.length, e = new Array(r > 1 ? r - 1 : 0), n = 1;
        n < r;
        n++
      )
        e[n - 1] = arguments[n];
      var o = e.reduce(
        function (t, r) {
          return function (e) {
            return r(t(e));
          };
        },
        function (t) {
          return t;
        }
      );
      return function () {
        return o(t.apply(void 0, arguments));
      };
    };
    function L(t) {
      return (
        (L =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        L(t)
      );
    }
    function P(t, r) {
      for (var e = 0; e < r.length; e++) {
        var n = r[e];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(
            t,
            ((o = n.key),
            (i = void 0),
            (i = (function (t, r) {
              if ("object" !== L(t) || null === t) return t;
              var e = t[Symbol.toPrimitive];
              if (void 0 !== e) {
                var n = e.call(t, r || "default");
                if ("object" !== L(n)) return n;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === r ? String : Number)(t);
            })(o, "string")),
            "symbol" === L(i) ? i : String(i)),
            n
          );
      }
      var o, i;
    }
    function _(t, r, e) {
      return (
        r && P(t.prototype, r),
        e && P(t, e),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        t
      );
    }
    function k(t, r) {
      if (!(t instanceof r))
        throw new TypeError("Cannot call a class as a function");
    }
    function N(t, r) {
      return (
        (N = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function (t, r) {
              return (t.__proto__ = r), t;
            }),
        N(t, r)
      );
    }
    function T(t) {
      var r = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var e,
          n = C(t);
        if (r) {
          var o = C(this).constructor;
          e = Reflect.construct(n, arguments, o);
        } else e = n.apply(this, arguments);
        return G(this, e);
      };
    }
    function G(t, r) {
      if (r && ("object" === L(r) || "function" == typeof r)) return r;
      if (void 0 !== r)
        throw new TypeError(
          "Derived constructors may only return object or undefined"
        );
      return (function (t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      })(t);
    }
    function C(t) {
      return (
        (C = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            }),
        C(t)
      );
    }
    var A = (function (t) {
        !(function (t, r) {
          if ("function" != typeof r && null !== r)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(r && r.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            Object.defineProperty(t, "prototype", { writable: !1 }),
            r && N(t, r);
        })(e, t);
        var r = T(e);
        function e(t) {
          var n;
          return (
            k(this, e),
            ((n = r.call(this, "AbortLoadError", "")).loadSegmentNormally = t),
            n
          );
        }
        return _(e);
      })(l),
      F = (function () {
        function t() {
          k(this, t);
        }
        return (
          _(t, [
            {
              key: "abort",
              value: function (t) {
                if ("object" !== L(t))
                  throw new m("arg should be an object", t);
                throw new A(t.loadSegmentNormally);
              },
            },
          ]),
          t
        );
      })();
    function D(t) {
      return (
        (D =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        D(t)
      );
    }
    function I() {
      I = function () {
        return r;
      };
      var t,
        r = {},
        e = Object.prototype,
        n = e.hasOwnProperty,
        o =
          Object.defineProperty ||
          function (t, r, e) {
            t[r] = e.value;
          },
        i = "function" == typeof Symbol ? Symbol : {},
        a = i.iterator || "@@iterator",
        u = i.asyncIterator || "@@asyncIterator",
        c = i.toStringTag || "@@toStringTag";
      function f(t, r, e) {
        return (
          Object.defineProperty(t, r, {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          t[r]
        );
      }
      try {
        f({}, "");
      } catch (t) {
        f = function (t, r, e) {
          return (t[r] = e);
        };
      }
      function l(t, r, e, n) {
        var i = r && r.prototype instanceof d ? r : d,
          a = Object.create(i.prototype),
          u = new k(n || []);
        return o(a, "_invoke", { value: S(t, e, u) }), a;
      }
      function s(t, r, e) {
        try {
          return { type: "normal", arg: t.call(r, e) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      r.wrap = l;
      var h = "suspendedStart",
        p = "executing",
        y = "completed",
        v = {};
      function d() {}
      function g() {}
      function m() {}
      var b = {};
      f(b, a, function () {
        return this;
      });
      var w = Object.getPrototypeOf,
        O = w && w(w(N([])));
      O && O !== e && n.call(O, a) && (b = O);
      var j = (m.prototype = d.prototype = Object.create(b));
      function x(t) {
        ["next", "throw", "return"].forEach(function (r) {
          f(t, r, function (t) {
            return this._invoke(r, t);
          });
        });
      }
      function E(t, r) {
        function e(o, i, a, u) {
          var c = s(t[o], t, i);
          if ("throw" !== c.type) {
            var f = c.arg,
              l = f.value;
            return l && "object" == D(l) && n.call(l, "__await")
              ? r.resolve(l.__await).then(
                  function (t) {
                    e("next", t, a, u);
                  },
                  function (t) {
                    e("throw", t, a, u);
                  }
                )
              : r.resolve(l).then(
                  function (t) {
                    (f.value = t), a(f);
                  },
                  function (t) {
                    return e("throw", t, a, u);
                  }
                );
          }
          u(c.arg);
        }
        var i;
        o(this, "_invoke", {
          value: function (t, n) {
            function o() {
              return new r(function (r, o) {
                e(t, n, r, o);
              });
            }
            return (i = i ? i.then(o, o) : o());
          },
        });
      }
      function S(r, e, n) {
        var o = h;
        return function (i, a) {
          if (o === p) throw new Error("Generator is already running");
          if (o === y) {
            if ("throw" === i) throw a;
            return { value: t, done: !0 };
          }
          for (n.method = i, n.arg = a; ; ) {
            var u = n.delegate;
            if (u) {
              var c = L(u, n);
              if (c) {
                if (c === v) continue;
                return c;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;
            else if ("throw" === n.method) {
              if (o === h) throw ((o = y), n.arg);
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            o = p;
            var f = s(r, e, n);
            if ("normal" === f.type) {
              if (((o = n.done ? y : "suspendedYield"), f.arg === v)) continue;
              return { value: f.arg, done: n.done };
            }
            "throw" === f.type &&
              ((o = y), (n.method = "throw"), (n.arg = f.arg));
          }
        };
      }
      function L(r, e) {
        var n = e.method,
          o = r.iterator[n];
        if (o === t)
          return (
            (e.delegate = null),
            ("throw" === n &&
              r.iterator.return &&
              ((e.method = "return"),
              (e.arg = t),
              L(r, e),
              "throw" === e.method)) ||
              ("return" !== n &&
                ((e.method = "throw"),
                (e.arg = new TypeError(
                  "The iterator does not provide a '" + n + "' method"
                )))),
            v
          );
        var i = s(o, r.iterator, e.arg);
        if ("throw" === i.type)
          return (e.method = "throw"), (e.arg = i.arg), (e.delegate = null), v;
        var a = i.arg;
        return a
          ? a.done
            ? ((e[r.resultName] = a.value),
              (e.next = r.nextLoc),
              "return" !== e.method && ((e.method = "next"), (e.arg = t)),
              (e.delegate = null),
              v)
            : a
          : ((e.method = "throw"),
            (e.arg = new TypeError("iterator result is not an object")),
            (e.delegate = null),
            v);
      }
      function P(t) {
        var r = { tryLoc: t[0] };
        1 in t && (r.catchLoc = t[1]),
          2 in t && ((r.finallyLoc = t[2]), (r.afterLoc = t[3])),
          this.tryEntries.push(r);
      }
      function _(t) {
        var r = t.completion || {};
        (r.type = "normal"), delete r.arg, (t.completion = r);
      }
      function k(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(P, this),
          this.reset(!0);
      }
      function N(r) {
        if (r || "" === r) {
          var e = r[a];
          if (e) return e.call(r);
          if ("function" == typeof r.next) return r;
          if (!isNaN(r.length)) {
            var o = -1,
              i = function e() {
                for (; ++o < r.length; )
                  if (n.call(r, o)) return (e.value = r[o]), (e.done = !1), e;
                return (e.value = t), (e.done = !0), e;
              };
            return (i.next = i);
          }
        }
        throw new TypeError(D(r) + " is not iterable");
      }
      return (
        (g.prototype = m),
        o(j, "constructor", { value: m, configurable: !0 }),
        o(m, "constructor", { value: g, configurable: !0 }),
        (g.displayName = f(m, c, "GeneratorFunction")),
        (r.isGeneratorFunction = function (t) {
          var r = "function" == typeof t && t.constructor;
          return (
            !!r &&
            (r === g || "GeneratorFunction" === (r.displayName || r.name))
          );
        }),
        (r.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, m)
              : ((t.__proto__ = m), f(t, c, "GeneratorFunction")),
            (t.prototype = Object.create(j)),
            t
          );
        }),
        (r.awrap = function (t) {
          return { __await: t };
        }),
        x(E.prototype),
        f(E.prototype, u, function () {
          return this;
        }),
        (r.AsyncIterator = E),
        (r.async = function (t, e, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new E(l(t, e, n, o), i);
          return r.isGeneratorFunction(e)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        x(j),
        f(j, c, "Generator"),
        f(j, a, function () {
          return this;
        }),
        f(j, "toString", function () {
          return "[object Generator]";
        }),
        (r.keys = function (t) {
          var r = Object(t),
            e = [];
          for (var n in r) e.push(n);
          return (
            e.reverse(),
            function t() {
              for (; e.length; ) {
                var n = e.pop();
                if (n in r) return (t.value = n), (t.done = !1), t;
              }
              return (t.done = !0), t;
            }
          );
        }),
        (r.values = N),
        (k.prototype = {
          constructor: k,
          reset: function (r) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = t),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = t),
              this.tryEntries.forEach(_),
              !r)
            )
              for (var e in this)
                "t" === e.charAt(0) &&
                  n.call(this, e) &&
                  !isNaN(+e.slice(1)) &&
                  (this[e] = t);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (r) {
            if (this.done) throw r;
            var e = this;
            function o(n, o) {
              return (
                (u.type = "throw"),
                (u.arg = r),
                (e.next = n),
                o && ((e.method = "next"), (e.arg = t)),
                !!o
              );
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var a = this.tryEntries[i],
                u = a.completion;
              if ("root" === a.tryLoc) return o("end");
              if (a.tryLoc <= this.prev) {
                var c = n.call(a, "catchLoc"),
                  f = n.call(a, "finallyLoc");
                if (c && f) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                } else if (c) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                } else {
                  if (!f)
                    throw new Error("try statement without catch or finally");
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, r) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var o = this.tryEntries[e];
              if (
                o.tryLoc <= this.prev &&
                n.call(o, "finallyLoc") &&
                this.prev < o.finallyLoc
              ) {
                var i = o;
                break;
              }
            }
            i &&
              ("break" === t || "continue" === t) &&
              i.tryLoc <= r &&
              r <= i.finallyLoc &&
              (i = null);
            var a = i ? i.completion : {};
            return (
              (a.type = t),
              (a.arg = r),
              i
                ? ((this.method = "next"), (this.next = i.finallyLoc), v)
                : this.complete(a)
            );
          },
          complete: function (t, r) {
            if ("throw" === t.type) throw t.arg;
            return (
              "break" === t.type || "continue" === t.type
                ? (this.next = t.arg)
                : "return" === t.type
                ? ((this.rval = this.arg = t.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === t.type && r && (this.next = r),
              v
            );
          },
          finish: function (t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var e = this.tryEntries[r];
              if (e.finallyLoc === t)
                return this.complete(e.completion, e.afterLoc), _(e), v;
            }
          },
          catch: function (t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var e = this.tryEntries[r];
              if (e.tryLoc === t) {
                var n = e.completion;
                if ("throw" === n.type) {
                  var o = n.arg;
                  _(e);
                }
                return o;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (r, e, n) {
            return (
              (this.delegate = { iterator: N(r), resultName: e, nextLoc: n }),
              "next" === this.method && (this.arg = t),
              v
            );
          },
        }),
        r
      );
    }
    function R(t, r) {
      var e = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(t);
        r &&
          (n = n.filter(function (r) {
            return Object.getOwnPropertyDescriptor(t, r).enumerable;
          })),
          e.push.apply(e, n);
      }
      return e;
    }
    function M(t) {
      for (var r = 1; r < arguments.length; r++) {
        var e = null != arguments[r] ? arguments[r] : {};
        r % 2
          ? R(Object(e), !0).forEach(function (r) {
              B(t, r, e[r]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e))
          : R(Object(e)).forEach(function (r) {
              Object.defineProperty(
                t,
                r,
                Object.getOwnPropertyDescriptor(e, r)
              );
            });
      }
      return t;
    }
    function B(t, r, e) {
      return (
        (r = (function (t) {
          var r = (function (t, r) {
            if ("object" !== D(t) || null === t) return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
              var n = e.call(t, r || "default");
              if ("object" !== D(n)) return n;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return ("string" === r ? String : Number)(t);
          })(t, "string");
          return "symbol" === D(r) ? r : String(r);
        })(r)) in t
          ? Object.defineProperty(t, r, {
              value: e,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[r] = e),
        t
      );
    }
    function Y(t, r, e, n, o, i, a) {
      try {
        var u = t[i](a),
          c = u.value;
      } catch (t) {
        return void e(t);
      }
      u.done ? r(c) : Promise.resolve(c).then(n, o);
    }
    var z = function (t) {
        return (function () {
          var r,
            e =
              ((r = I().mark(function r(e) {
                var n, o, i;
                return I().wrap(function (r) {
                  for (;;)
                    switch ((r.prev = r.next)) {
                      case 0:
                        return (n = e.payload), (o = e.next), (r.next = 3), t();
                      case 3:
                        x((i = r.sent)),
                          (n.obj.context.consent = M(
                            M({}, n.obj.context.consent),
                            {},
                            { categoryPreferences: i }
                          )),
                          o(n);
                      case 7:
                      case "end":
                        return r.stop();
                    }
                }, r);
              })),
              function () {
                var t = this,
                  e = arguments;
                return new Promise(function (n, o) {
                  var i = r.apply(t, e);
                  function a(t) {
                    Y(i, n, o, a, u, "next", t);
                  }
                  function u(t) {
                    Y(i, n, o, a, u, "throw", t);
                  }
                  a(void 0);
                });
              });
          return function (t) {
            return e.apply(this, arguments);
          };
        })();
      },
      U = function (t, r) {
        return r.reduce(function (r, e) {
          return e in t && (r[e] = t[e]), r;
        }, {});
      };
    function V(t) {
      return (
        (V =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        V(t)
      );
    }
    function W() {
      W = function () {
        return r;
      };
      var t,
        r = {},
        e = Object.prototype,
        n = e.hasOwnProperty,
        o =
          Object.defineProperty ||
          function (t, r, e) {
            t[r] = e.value;
          },
        i = "function" == typeof Symbol ? Symbol : {},
        a = i.iterator || "@@iterator",
        u = i.asyncIterator || "@@asyncIterator",
        c = i.toStringTag || "@@toStringTag";
      function f(t, r, e) {
        return (
          Object.defineProperty(t, r, {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          t[r]
        );
      }
      try {
        f({}, "");
      } catch (t) {
        f = function (t, r, e) {
          return (t[r] = e);
        };
      }
      function l(t, r, e, n) {
        var i = r && r.prototype instanceof d ? r : d,
          a = Object.create(i.prototype),
          u = new k(n || []);
        return o(a, "_invoke", { value: S(t, e, u) }), a;
      }
      function s(t, r, e) {
        try {
          return { type: "normal", arg: t.call(r, e) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      r.wrap = l;
      var h = "suspendedStart",
        p = "executing",
        y = "completed",
        v = {};
      function d() {}
      function g() {}
      function m() {}
      var b = {};
      f(b, a, function () {
        return this;
      });
      var w = Object.getPrototypeOf,
        O = w && w(w(N([])));
      O && O !== e && n.call(O, a) && (b = O);
      var j = (m.prototype = d.prototype = Object.create(b));
      function x(t) {
        ["next", "throw", "return"].forEach(function (r) {
          f(t, r, function (t) {
            return this._invoke(r, t);
          });
        });
      }
      function E(t, r) {
        function e(o, i, a, u) {
          var c = s(t[o], t, i);
          if ("throw" !== c.type) {
            var f = c.arg,
              l = f.value;
            return l && "object" == V(l) && n.call(l, "__await")
              ? r.resolve(l.__await).then(
                  function (t) {
                    e("next", t, a, u);
                  },
                  function (t) {
                    e("throw", t, a, u);
                  }
                )
              : r.resolve(l).then(
                  function (t) {
                    (f.value = t), a(f);
                  },
                  function (t) {
                    return e("throw", t, a, u);
                  }
                );
          }
          u(c.arg);
        }
        var i;
        o(this, "_invoke", {
          value: function (t, n) {
            function o() {
              return new r(function (r, o) {
                e(t, n, r, o);
              });
            }
            return (i = i ? i.then(o, o) : o());
          },
        });
      }
      function S(r, e, n) {
        var o = h;
        return function (i, a) {
          if (o === p) throw new Error("Generator is already running");
          if (o === y) {
            if ("throw" === i) throw a;
            return { value: t, done: !0 };
          }
          for (n.method = i, n.arg = a; ; ) {
            var u = n.delegate;
            if (u) {
              var c = L(u, n);
              if (c) {
                if (c === v) continue;
                return c;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;
            else if ("throw" === n.method) {
              if (o === h) throw ((o = y), n.arg);
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            o = p;
            var f = s(r, e, n);
            if ("normal" === f.type) {
              if (((o = n.done ? y : "suspendedYield"), f.arg === v)) continue;
              return { value: f.arg, done: n.done };
            }
            "throw" === f.type &&
              ((o = y), (n.method = "throw"), (n.arg = f.arg));
          }
        };
      }
      function L(r, e) {
        var n = e.method,
          o = r.iterator[n];
        if (o === t)
          return (
            (e.delegate = null),
            ("throw" === n &&
              r.iterator.return &&
              ((e.method = "return"),
              (e.arg = t),
              L(r, e),
              "throw" === e.method)) ||
              ("return" !== n &&
                ((e.method = "throw"),
                (e.arg = new TypeError(
                  "The iterator does not provide a '" + n + "' method"
                )))),
            v
          );
        var i = s(o, r.iterator, e.arg);
        if ("throw" === i.type)
          return (e.method = "throw"), (e.arg = i.arg), (e.delegate = null), v;
        var a = i.arg;
        return a
          ? a.done
            ? ((e[r.resultName] = a.value),
              (e.next = r.nextLoc),
              "return" !== e.method && ((e.method = "next"), (e.arg = t)),
              (e.delegate = null),
              v)
            : a
          : ((e.method = "throw"),
            (e.arg = new TypeError("iterator result is not an object")),
            (e.delegate = null),
            v);
      }
      function P(t) {
        var r = { tryLoc: t[0] };
        1 in t && (r.catchLoc = t[1]),
          2 in t && ((r.finallyLoc = t[2]), (r.afterLoc = t[3])),
          this.tryEntries.push(r);
      }
      function _(t) {
        var r = t.completion || {};
        (r.type = "normal"), delete r.arg, (t.completion = r);
      }
      function k(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(P, this),
          this.reset(!0);
      }
      function N(r) {
        if (r || "" === r) {
          var e = r[a];
          if (e) return e.call(r);
          if ("function" == typeof r.next) return r;
          if (!isNaN(r.length)) {
            var o = -1,
              i = function e() {
                for (; ++o < r.length; )
                  if (n.call(r, o)) return (e.value = r[o]), (e.done = !1), e;
                return (e.value = t), (e.done = !0), e;
              };
            return (i.next = i);
          }
        }
        throw new TypeError(V(r) + " is not iterable");
      }
      return (
        (g.prototype = m),
        o(j, "constructor", { value: m, configurable: !0 }),
        o(m, "constructor", { value: g, configurable: !0 }),
        (g.displayName = f(m, c, "GeneratorFunction")),
        (r.isGeneratorFunction = function (t) {
          var r = "function" == typeof t && t.constructor;
          return (
            !!r &&
            (r === g || "GeneratorFunction" === (r.displayName || r.name))
          );
        }),
        (r.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, m)
              : ((t.__proto__ = m), f(t, c, "GeneratorFunction")),
            (t.prototype = Object.create(j)),
            t
          );
        }),
        (r.awrap = function (t) {
          return { __await: t };
        }),
        x(E.prototype),
        f(E.prototype, u, function () {
          return this;
        }),
        (r.AsyncIterator = E),
        (r.async = function (t, e, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new E(l(t, e, n, o), i);
          return r.isGeneratorFunction(e)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        x(j),
        f(j, c, "Generator"),
        f(j, a, function () {
          return this;
        }),
        f(j, "toString", function () {
          return "[object Generator]";
        }),
        (r.keys = function (t) {
          var r = Object(t),
            e = [];
          for (var n in r) e.push(n);
          return (
            e.reverse(),
            function t() {
              for (; e.length; ) {
                var n = e.pop();
                if (n in r) return (t.value = n), (t.done = !1), t;
              }
              return (t.done = !0), t;
            }
          );
        }),
        (r.values = N),
        (k.prototype = {
          constructor: k,
          reset: function (r) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = t),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = t),
              this.tryEntries.forEach(_),
              !r)
            )
              for (var e in this)
                "t" === e.charAt(0) &&
                  n.call(this, e) &&
                  !isNaN(+e.slice(1)) &&
                  (this[e] = t);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (r) {
            if (this.done) throw r;
            var e = this;
            function o(n, o) {
              return (
                (u.type = "throw"),
                (u.arg = r),
                (e.next = n),
                o && ((e.method = "next"), (e.arg = t)),
                !!o
              );
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var a = this.tryEntries[i],
                u = a.completion;
              if ("root" === a.tryLoc) return o("end");
              if (a.tryLoc <= this.prev) {
                var c = n.call(a, "catchLoc"),
                  f = n.call(a, "finallyLoc");
                if (c && f) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                } else if (c) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                } else {
                  if (!f)
                    throw new Error("try statement without catch or finally");
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, r) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var o = this.tryEntries[e];
              if (
                o.tryLoc <= this.prev &&
                n.call(o, "finallyLoc") &&
                this.prev < o.finallyLoc
              ) {
                var i = o;
                break;
              }
            }
            i &&
              ("break" === t || "continue" === t) &&
              i.tryLoc <= r &&
              r <= i.finallyLoc &&
              (i = null);
            var a = i ? i.completion : {};
            return (
              (a.type = t),
              (a.arg = r),
              i
                ? ((this.method = "next"), (this.next = i.finallyLoc), v)
                : this.complete(a)
            );
          },
          complete: function (t, r) {
            if ("throw" === t.type) throw t.arg;
            return (
              "break" === t.type || "continue" === t.type
                ? (this.next = t.arg)
                : "return" === t.type
                ? ((this.rval = this.arg = t.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === t.type && r && (this.next = r),
              v
            );
          },
          finish: function (t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var e = this.tryEntries[r];
              if (e.finallyLoc === t)
                return this.complete(e.completion, e.afterLoc), _(e), v;
            }
          },
          catch: function (t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var e = this.tryEntries[r];
              if (e.tryLoc === t) {
                var n = e.completion;
                if ("throw" === n.type) {
                  var o = n.arg;
                  _(e);
                }
                return o;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (r, e, n) {
            return (
              (this.delegate = { iterator: N(r), resultName: e, nextLoc: n }),
              "next" === this.method && (this.arg = t),
              v
            );
          },
        }),
        r
      );
    }
    function J(t, r, e, n, o, i, a) {
      try {
        var u = t[i](a),
          c = u.value;
      } catch (t) {
        return void e(t);
      }
      u.done ? r(c) : Promise.resolve(c).then(n, o);
    }
    var K = (function () {
      var t,
        r =
          ((t = W().mark(function t(r, e, n) {
            var o, i, a;
            return W().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (
                      (n
                        ? ((u = Object.values(n).reduce(function (t, r) {
                            return t.concat(r);
                          })),
                          (o = Array.from(new Set(u))))
                        : (o =
                            (null === (i = e.consentSettings) || void 0 === i
                              ? void 0
                              : i.allCategories) || []),
                      o.length)
                    ) {
                      t.next = 3;
                      break;
                    }
                    throw new m(
                      "Invariant: No consent categories defined in Segment",
                      []
                    );
                  case 3:
                    return (t.next = 5), r();
                  case 5:
                    return (a = t.sent), t.abrupt("return", U(a, o));
                  case 7:
                  case "end":
                    return t.stop();
                }
              var u;
            }, t);
          })),
          function () {
            var r = this,
              e = arguments;
            return new Promise(function (n, o) {
              var i = t.apply(r, e);
              function a(t) {
                J(i, n, o, a, u, "next", t);
              }
              function u(t) {
                J(i, n, o, a, u, "throw", t);
              }
              a(void 0);
            });
          });
      return function (t, e, n) {
        return r.apply(this, arguments);
      };
    })();
    function q(t) {
      return (
        (q =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        q(t)
      );
    }
    function H() {
      H = function () {
        return r;
      };
      var t,
        r = {},
        e = Object.prototype,
        n = e.hasOwnProperty,
        o =
          Object.defineProperty ||
          function (t, r, e) {
            t[r] = e.value;
          },
        i = "function" == typeof Symbol ? Symbol : {},
        a = i.iterator || "@@iterator",
        u = i.asyncIterator || "@@asyncIterator",
        c = i.toStringTag || "@@toStringTag";
      function f(t, r, e) {
        return (
          Object.defineProperty(t, r, {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          t[r]
        );
      }
      try {
        f({}, "");
      } catch (t) {
        f = function (t, r, e) {
          return (t[r] = e);
        };
      }
      function l(t, r, e, n) {
        var i = r && r.prototype instanceof d ? r : d,
          a = Object.create(i.prototype),
          u = new k(n || []);
        return o(a, "_invoke", { value: S(t, e, u) }), a;
      }
      function s(t, r, e) {
        try {
          return { type: "normal", arg: t.call(r, e) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      r.wrap = l;
      var h = "suspendedStart",
        p = "executing",
        y = "completed",
        v = {};
      function d() {}
      function g() {}
      function m() {}
      var b = {};
      f(b, a, function () {
        return this;
      });
      var w = Object.getPrototypeOf,
        O = w && w(w(N([])));
      O && O !== e && n.call(O, a) && (b = O);
      var j = (m.prototype = d.prototype = Object.create(b));
      function x(t) {
        ["next", "throw", "return"].forEach(function (r) {
          f(t, r, function (t) {
            return this._invoke(r, t);
          });
        });
      }
      function E(t, r) {
        function e(o, i, a, u) {
          var c = s(t[o], t, i);
          if ("throw" !== c.type) {
            var f = c.arg,
              l = f.value;
            return l && "object" == q(l) && n.call(l, "__await")
              ? r.resolve(l.__await).then(
                  function (t) {
                    e("next", t, a, u);
                  },
                  function (t) {
                    e("throw", t, a, u);
                  }
                )
              : r.resolve(l).then(
                  function (t) {
                    (f.value = t), a(f);
                  },
                  function (t) {
                    return e("throw", t, a, u);
                  }
                );
          }
          u(c.arg);
        }
        var i;
        o(this, "_invoke", {
          value: function (t, n) {
            function o() {
              return new r(function (r, o) {
                e(t, n, r, o);
              });
            }
            return (i = i ? i.then(o, o) : o());
          },
        });
      }
      function S(r, e, n) {
        var o = h;
        return function (i, a) {
          if (o === p) throw new Error("Generator is already running");
          if (o === y) {
            if ("throw" === i) throw a;
            return { value: t, done: !0 };
          }
          for (n.method = i, n.arg = a; ; ) {
            var u = n.delegate;
            if (u) {
              var c = L(u, n);
              if (c) {
                if (c === v) continue;
                return c;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;
            else if ("throw" === n.method) {
              if (o === h) throw ((o = y), n.arg);
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            o = p;
            var f = s(r, e, n);
            if ("normal" === f.type) {
              if (((o = n.done ? y : "suspendedYield"), f.arg === v)) continue;
              return { value: f.arg, done: n.done };
            }
            "throw" === f.type &&
              ((o = y), (n.method = "throw"), (n.arg = f.arg));
          }
        };
      }
      function L(r, e) {
        var n = e.method,
          o = r.iterator[n];
        if (o === t)
          return (
            (e.delegate = null),
            ("throw" === n &&
              r.iterator.return &&
              ((e.method = "return"),
              (e.arg = t),
              L(r, e),
              "throw" === e.method)) ||
              ("return" !== n &&
                ((e.method = "throw"),
                (e.arg = new TypeError(
                  "The iterator does not provide a '" + n + "' method"
                )))),
            v
          );
        var i = s(o, r.iterator, e.arg);
        if ("throw" === i.type)
          return (e.method = "throw"), (e.arg = i.arg), (e.delegate = null), v;
        var a = i.arg;
        return a
          ? a.done
            ? ((e[r.resultName] = a.value),
              (e.next = r.nextLoc),
              "return" !== e.method && ((e.method = "next"), (e.arg = t)),
              (e.delegate = null),
              v)
            : a
          : ((e.method = "throw"),
            (e.arg = new TypeError("iterator result is not an object")),
            (e.delegate = null),
            v);
      }
      function P(t) {
        var r = { tryLoc: t[0] };
        1 in t && (r.catchLoc = t[1]),
          2 in t && ((r.finallyLoc = t[2]), (r.afterLoc = t[3])),
          this.tryEntries.push(r);
      }
      function _(t) {
        var r = t.completion || {};
        (r.type = "normal"), delete r.arg, (t.completion = r);
      }
      function k(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(P, this),
          this.reset(!0);
      }
      function N(r) {
        if (r || "" === r) {
          var e = r[a];
          if (e) return e.call(r);
          if ("function" == typeof r.next) return r;
          if (!isNaN(r.length)) {
            var o = -1,
              i = function e() {
                for (; ++o < r.length; )
                  if (n.call(r, o)) return (e.value = r[o]), (e.done = !1), e;
                return (e.value = t), (e.done = !0), e;
              };
            return (i.next = i);
          }
        }
        throw new TypeError(q(r) + " is not iterable");
      }
      return (
        (g.prototype = m),
        o(j, "constructor", { value: m, configurable: !0 }),
        o(m, "constructor", { value: g, configurable: !0 }),
        (g.displayName = f(m, c, "GeneratorFunction")),
        (r.isGeneratorFunction = function (t) {
          var r = "function" == typeof t && t.constructor;
          return (
            !!r &&
            (r === g || "GeneratorFunction" === (r.displayName || r.name))
          );
        }),
        (r.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, m)
              : ((t.__proto__ = m), f(t, c, "GeneratorFunction")),
            (t.prototype = Object.create(j)),
            t
          );
        }),
        (r.awrap = function (t) {
          return { __await: t };
        }),
        x(E.prototype),
        f(E.prototype, u, function () {
          return this;
        }),
        (r.AsyncIterator = E),
        (r.async = function (t, e, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new E(l(t, e, n, o), i);
          return r.isGeneratorFunction(e)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        x(j),
        f(j, c, "Generator"),
        f(j, a, function () {
          return this;
        }),
        f(j, "toString", function () {
          return "[object Generator]";
        }),
        (r.keys = function (t) {
          var r = Object(t),
            e = [];
          for (var n in r) e.push(n);
          return (
            e.reverse(),
            function t() {
              for (; e.length; ) {
                var n = e.pop();
                if (n in r) return (t.value = n), (t.done = !1), t;
              }
              return (t.done = !0), t;
            }
          );
        }),
        (r.values = N),
        (k.prototype = {
          constructor: k,
          reset: function (r) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = t),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = t),
              this.tryEntries.forEach(_),
              !r)
            )
              for (var e in this)
                "t" === e.charAt(0) &&
                  n.call(this, e) &&
                  !isNaN(+e.slice(1)) &&
                  (this[e] = t);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (r) {
            if (this.done) throw r;
            var e = this;
            function o(n, o) {
              return (
                (u.type = "throw"),
                (u.arg = r),
                (e.next = n),
                o && ((e.method = "next"), (e.arg = t)),
                !!o
              );
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var a = this.tryEntries[i],
                u = a.completion;
              if ("root" === a.tryLoc) return o("end");
              if (a.tryLoc <= this.prev) {
                var c = n.call(a, "catchLoc"),
                  f = n.call(a, "finallyLoc");
                if (c && f) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                } else if (c) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                } else {
                  if (!f)
                    throw new Error("try statement without catch or finally");
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, r) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var o = this.tryEntries[e];
              if (
                o.tryLoc <= this.prev &&
                n.call(o, "finallyLoc") &&
                this.prev < o.finallyLoc
              ) {
                var i = o;
                break;
              }
            }
            i &&
              ("break" === t || "continue" === t) &&
              i.tryLoc <= r &&
              r <= i.finallyLoc &&
              (i = null);
            var a = i ? i.completion : {};
            return (
              (a.type = t),
              (a.arg = r),
              i
                ? ((this.method = "next"), (this.next = i.finallyLoc), v)
                : this.complete(a)
            );
          },
          complete: function (t, r) {
            if ("throw" === t.type) throw t.arg;
            return (
              "break" === t.type || "continue" === t.type
                ? (this.next = t.arg)
                : "return" === t.type
                ? ((this.rval = this.arg = t.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === t.type && r && (this.next = r),
              v
            );
          },
          finish: function (t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var e = this.tryEntries[r];
              if (e.finallyLoc === t)
                return this.complete(e.completion, e.afterLoc), _(e), v;
            }
          },
          catch: function (t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var e = this.tryEntries[r];
              if (e.tryLoc === t) {
                var n = e.completion;
                if ("throw" === n.type) {
                  var o = n.arg;
                  _(e);
                }
                return o;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (r, e, n) {
            return (
              (this.delegate = { iterator: N(r), resultName: e, nextLoc: n }),
              "next" === this.method && (this.arg = t),
              v
            );
          },
        }),
        r
      );
    }
    function Q(t, r, e, n, o, i, a) {
      try {
        var u = t[i](a),
          c = u.value;
      } catch (t) {
        return void e(t);
      }
      u.done ? r(c) : Promise.resolve(c).then(n, o);
    }
    function X(t, r) {
      for (var e = 0; e < r.length; e++) {
        var n = r[e];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(
            t,
            ((o = n.key),
            (i = void 0),
            (i = (function (t, r) {
              if ("object" !== q(t) || null === t) return t;
              var e = t[Symbol.toPrimitive];
              if (void 0 !== e) {
                var n = e.call(t, r || "default");
                if ("object" !== q(n)) return n;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === r ? String : Number)(t);
            })(o, "string")),
            "symbol" === q(i) ? i : String(i)),
            n
          );
      }
      var o, i;
    }
    var Z = (function () {
        function t(r) {
          var e = this;
          !(function (t, r) {
            if (!(t instanceof r))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            (function (t) {
              if (
                (O(t, "analytics"),
                !("load" in t && "on" in t && "addSourceMiddleware" in t))
              )
                throw new m("analytics is not an Analytics instance", t);
            })(r),
            (this._uninitializedAnalytics = r),
            (this.loadNormally = r.load.bind(this._uninitializedAnalytics)),
            (this.cdnSettings = new Promise(function (t) {
              return e.analytics.on("initialize", t);
            }));
        }
        var r, e, n;
        return (
          (r = t),
          (e = [
            {
              key: "analytics",
              get: function () {
                return $(this._uninitializedAnalytics);
              },
            },
            {
              key: "replaceLoadMethod",
              value: function (t) {
                this.analytics.load = t;
              },
            },
            {
              key: "page",
              value: function () {
                this.analytics.page();
              },
            },
            {
              key: "configureConsentStampingMiddleware",
              value: function (t) {
                var r = this,
                  e = t.getCategories,
                  n = t.pruneUnmappedCategories,
                  o = t.integrationCategoryMappings,
                  i = (function () {
                    var t,
                      i =
                        ((t = H().mark(function t() {
                          return H().wrap(function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  if (!n) {
                                    t.next = 10;
                                    break;
                                  }
                                  return (
                                    (t.t0 = K),
                                    (t.t1 = e),
                                    (t.next = 5),
                                    r.cdnSettings
                                  );
                                case 5:
                                  return (
                                    (t.t2 = t.sent),
                                    (t.t3 = o),
                                    t.abrupt(
                                      "return",
                                      (0, t.t0)(t.t1, t.t2, t.t3)
                                    )
                                  );
                                case 10:
                                  return t.abrupt("return", e());
                                case 11:
                                case "end":
                                  return t.stop();
                              }
                          }, t);
                        })),
                        function () {
                          var r = this,
                            e = arguments;
                          return new Promise(function (n, o) {
                            var i = t.apply(r, e);
                            function a(t) {
                              Q(i, n, o, a, u, "next", t);
                            }
                            function u(t) {
                              Q(i, n, o, a, u, "throw", t);
                            }
                            a(void 0);
                          });
                        });
                    return function () {
                      return i.apply(this, arguments);
                    };
                  })(),
                  a = z(i);
                return this.analytics.addSourceMiddleware(a);
              },
            },
            {
              key: "consentChange",
              value: function (t) {
                try {
                  x(t);
                } catch (t) {
                  return console.error(t);
                }
                this.analytics.track("Segment Consent Preference", void 0, {
                  consent: { categoryPreferences: t },
                });
              },
            },
          ]),
          e && X(r.prototype, e),
          n && X(r, n),
          Object.defineProperty(r, "prototype", { writable: !1 }),
          t
        );
      })(),
      $ = function (t) {
        if (Array.isArray(t)) {
          var r,
            e,
            n = null !== (r = t._loadOptions) && void 0 !== r ? r : {},
            o =
              window[
                null !== (e = null == n ? void 0 : n.globalAnalyticsKey) &&
                void 0 !== e
                  ? e
                  : "analytics"
              ];
          if (null != o && o.initialized) return o;
        }
        return t;
      };
    function tt(t) {
      return (
        (tt =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        tt(t)
      );
    }
    function rt() {
      rt = function () {
        return r;
      };
      var t,
        r = {},
        e = Object.prototype,
        n = e.hasOwnProperty,
        o =
          Object.defineProperty ||
          function (t, r, e) {
            t[r] = e.value;
          },
        i = "function" == typeof Symbol ? Symbol : {},
        a = i.iterator || "@@iterator",
        u = i.asyncIterator || "@@asyncIterator",
        c = i.toStringTag || "@@toStringTag";
      function f(t, r, e) {
        return (
          Object.defineProperty(t, r, {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          t[r]
        );
      }
      try {
        f({}, "");
      } catch (t) {
        f = function (t, r, e) {
          return (t[r] = e);
        };
      }
      function l(t, r, e, n) {
        var i = r && r.prototype instanceof d ? r : d,
          a = Object.create(i.prototype),
          u = new k(n || []);
        return o(a, "_invoke", { value: S(t, e, u) }), a;
      }
      function s(t, r, e) {
        try {
          return { type: "normal", arg: t.call(r, e) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      r.wrap = l;
      var h = "suspendedStart",
        p = "executing",
        y = "completed",
        v = {};
      function d() {}
      function g() {}
      function m() {}
      var b = {};
      f(b, a, function () {
        return this;
      });
      var w = Object.getPrototypeOf,
        O = w && w(w(N([])));
      O && O !== e && n.call(O, a) && (b = O);
      var j = (m.prototype = d.prototype = Object.create(b));
      function x(t) {
        ["next", "throw", "return"].forEach(function (r) {
          f(t, r, function (t) {
            return this._invoke(r, t);
          });
        });
      }
      function E(t, r) {
        function e(o, i, a, u) {
          var c = s(t[o], t, i);
          if ("throw" !== c.type) {
            var f = c.arg,
              l = f.value;
            return l && "object" == tt(l) && n.call(l, "__await")
              ? r.resolve(l.__await).then(
                  function (t) {
                    e("next", t, a, u);
                  },
                  function (t) {
                    e("throw", t, a, u);
                  }
                )
              : r.resolve(l).then(
                  function (t) {
                    (f.value = t), a(f);
                  },
                  function (t) {
                    return e("throw", t, a, u);
                  }
                );
          }
          u(c.arg);
        }
        var i;
        o(this, "_invoke", {
          value: function (t, n) {
            function o() {
              return new r(function (r, o) {
                e(t, n, r, o);
              });
            }
            return (i = i ? i.then(o, o) : o());
          },
        });
      }
      function S(r, e, n) {
        var o = h;
        return function (i, a) {
          if (o === p) throw new Error("Generator is already running");
          if (o === y) {
            if ("throw" === i) throw a;
            return { value: t, done: !0 };
          }
          for (n.method = i, n.arg = a; ; ) {
            var u = n.delegate;
            if (u) {
              var c = L(u, n);
              if (c) {
                if (c === v) continue;
                return c;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;
            else if ("throw" === n.method) {
              if (o === h) throw ((o = y), n.arg);
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            o = p;
            var f = s(r, e, n);
            if ("normal" === f.type) {
              if (((o = n.done ? y : "suspendedYield"), f.arg === v)) continue;
              return { value: f.arg, done: n.done };
            }
            "throw" === f.type &&
              ((o = y), (n.method = "throw"), (n.arg = f.arg));
          }
        };
      }
      function L(r, e) {
        var n = e.method,
          o = r.iterator[n];
        if (o === t)
          return (
            (e.delegate = null),
            ("throw" === n &&
              r.iterator.return &&
              ((e.method = "return"),
              (e.arg = t),
              L(r, e),
              "throw" === e.method)) ||
              ("return" !== n &&
                ((e.method = "throw"),
                (e.arg = new TypeError(
                  "The iterator does not provide a '" + n + "' method"
                )))),
            v
          );
        var i = s(o, r.iterator, e.arg);
        if ("throw" === i.type)
          return (e.method = "throw"), (e.arg = i.arg), (e.delegate = null), v;
        var a = i.arg;
        return a
          ? a.done
            ? ((e[r.resultName] = a.value),
              (e.next = r.nextLoc),
              "return" !== e.method && ((e.method = "next"), (e.arg = t)),
              (e.delegate = null),
              v)
            : a
          : ((e.method = "throw"),
            (e.arg = new TypeError("iterator result is not an object")),
            (e.delegate = null),
            v);
      }
      function P(t) {
        var r = { tryLoc: t[0] };
        1 in t && (r.catchLoc = t[1]),
          2 in t && ((r.finallyLoc = t[2]), (r.afterLoc = t[3])),
          this.tryEntries.push(r);
      }
      function _(t) {
        var r = t.completion || {};
        (r.type = "normal"), delete r.arg, (t.completion = r);
      }
      function k(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(P, this),
          this.reset(!0);
      }
      function N(r) {
        if (r || "" === r) {
          var e = r[a];
          if (e) return e.call(r);
          if ("function" == typeof r.next) return r;
          if (!isNaN(r.length)) {
            var o = -1,
              i = function e() {
                for (; ++o < r.length; )
                  if (n.call(r, o)) return (e.value = r[o]), (e.done = !1), e;
                return (e.value = t), (e.done = !0), e;
              };
            return (i.next = i);
          }
        }
        throw new TypeError(tt(r) + " is not iterable");
      }
      return (
        (g.prototype = m),
        o(j, "constructor", { value: m, configurable: !0 }),
        o(m, "constructor", { value: g, configurable: !0 }),
        (g.displayName = f(m, c, "GeneratorFunction")),
        (r.isGeneratorFunction = function (t) {
          var r = "function" == typeof t && t.constructor;
          return (
            !!r &&
            (r === g || "GeneratorFunction" === (r.displayName || r.name))
          );
        }),
        (r.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, m)
              : ((t.__proto__ = m), f(t, c, "GeneratorFunction")),
            (t.prototype = Object.create(j)),
            t
          );
        }),
        (r.awrap = function (t) {
          return { __await: t };
        }),
        x(E.prototype),
        f(E.prototype, u, function () {
          return this;
        }),
        (r.AsyncIterator = E),
        (r.async = function (t, e, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new E(l(t, e, n, o), i);
          return r.isGeneratorFunction(e)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        x(j),
        f(j, c, "Generator"),
        f(j, a, function () {
          return this;
        }),
        f(j, "toString", function () {
          return "[object Generator]";
        }),
        (r.keys = function (t) {
          var r = Object(t),
            e = [];
          for (var n in r) e.push(n);
          return (
            e.reverse(),
            function t() {
              for (; e.length; ) {
                var n = e.pop();
                if (n in r) return (t.value = n), (t.done = !1), t;
              }
              return (t.done = !0), t;
            }
          );
        }),
        (r.values = N),
        (k.prototype = {
          constructor: k,
          reset: function (r) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = t),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = t),
              this.tryEntries.forEach(_),
              !r)
            )
              for (var e in this)
                "t" === e.charAt(0) &&
                  n.call(this, e) &&
                  !isNaN(+e.slice(1)) &&
                  (this[e] = t);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (r) {
            if (this.done) throw r;
            var e = this;
            function o(n, o) {
              return (
                (u.type = "throw"),
                (u.arg = r),
                (e.next = n),
                o && ((e.method = "next"), (e.arg = t)),
                !!o
              );
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var a = this.tryEntries[i],
                u = a.completion;
              if ("root" === a.tryLoc) return o("end");
              if (a.tryLoc <= this.prev) {
                var c = n.call(a, "catchLoc"),
                  f = n.call(a, "finallyLoc");
                if (c && f) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                } else if (c) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                } else {
                  if (!f)
                    throw new Error("try statement without catch or finally");
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, r) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var o = this.tryEntries[e];
              if (
                o.tryLoc <= this.prev &&
                n.call(o, "finallyLoc") &&
                this.prev < o.finallyLoc
              ) {
                var i = o;
                break;
              }
            }
            i &&
              ("break" === t || "continue" === t) &&
              i.tryLoc <= r &&
              r <= i.finallyLoc &&
              (i = null);
            var a = i ? i.completion : {};
            return (
              (a.type = t),
              (a.arg = r),
              i
                ? ((this.method = "next"), (this.next = i.finallyLoc), v)
                : this.complete(a)
            );
          },
          complete: function (t, r) {
            if ("throw" === t.type) throw t.arg;
            return (
              "break" === t.type || "continue" === t.type
                ? (this.next = t.arg)
                : "return" === t.type
                ? ((this.rval = this.arg = t.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === t.type && r && (this.next = r),
              v
            );
          },
          finish: function (t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var e = this.tryEntries[r];
              if (e.finallyLoc === t)
                return this.complete(e.completion, e.afterLoc), _(e), v;
            }
          },
          catch: function (t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var e = this.tryEntries[r];
              if (e.tryLoc === t) {
                var n = e.completion;
                if ("throw" === n.type) {
                  var o = n.arg;
                  _(e);
                }
                return o;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (r, e, n) {
            return (
              (this.delegate = { iterator: N(r), resultName: e, nextLoc: n }),
              "next" === this.method && (this.arg = t),
              v
            );
          },
        }),
        r
      );
    }
    function et(t, r) {
      var e = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(t);
        r &&
          (n = n.filter(function (r) {
            return Object.getOwnPropertyDescriptor(t, r).enumerable;
          })),
          e.push.apply(e, n);
      }
      return e;
    }
    function nt(t) {
      for (var r = 1; r < arguments.length; r++) {
        var e = null != arguments[r] ? arguments[r] : {};
        r % 2
          ? et(Object(e), !0).forEach(function (r) {
              ot(t, r, e[r]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e))
          : et(Object(e)).forEach(function (r) {
              Object.defineProperty(
                t,
                r,
                Object.getOwnPropertyDescriptor(e, r)
              );
            });
      }
      return t;
    }
    function ot(t, r, e) {
      return (
        (r = (function (t) {
          var r = (function (t, r) {
            if ("object" !== tt(t) || null === t) return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
              var n = e.call(t, r || "default");
              if ("object" !== tt(n)) return n;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return ("string" === r ? String : Number)(t);
          })(t, "string");
          return "symbol" === tt(r) ? r : String(r);
        })(r)) in t
          ? Object.defineProperty(t, r, {
              value: e,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[r] = e),
        t
      );
    }
    function it(t, r, e, n, o, i, a) {
      try {
        var u = t[i](a),
          c = u.value;
      } catch (t) {
        return void e(t);
      }
      u.done ? r(c) : Promise.resolve(c).then(n, o);
    }
    function at(t) {
      return function () {
        var r = this,
          e = arguments;
        return new Promise(function (n, o) {
          var i = t.apply(r, e);
          function a(t) {
            it(i, n, o, a, u, "next", t);
          }
          function u(t) {
            it(i, n, o, a, u, "throw", t);
          }
          a(void 0);
        });
      };
    }
    var ut = function () {
        for (var t = arguments.length, r = new Array(t), e = 0; e < t; e++)
          r[e] = arguments[e];
        var n = r[0];
        E(n);
        var o = n.shouldDisableSegment,
          i = n.getCategories,
          a = n.shouldLoadSegment,
          u = n.integrationCategoryMappings,
          c = n.pruneUnmappedCategories,
          f = n.shouldEnableIntegration,
          l = n.registerOnConsentChanged,
          s = n.shouldLoadWrapper;
        return function (t) {
          var r = new Z(t),
            e = (null == s ? void 0 : s()) || Promise.resolve();
          e.then(function () {
            null == l ||
              l(function (t) {
                return r.consentChange(t);
              });
          });
          var n = (function () {
            var t = at(
              rt().mark(function t(n, l) {
                var s, h, p, y, v;
                return rt().wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            null !== (s = l) &&
                              void 0 !== s &&
                              s.initialPageview &&
                              (r.page(),
                              (l = nt(nt({}, l), {}, { initialPageview: !1 }))),
                            (t.next = 3),
                            null == o ? void 0 : o()
                          );
                        case 3:
                          if (!t.sent) {
                            t.next = 5;
                            break;
                          }
                          return t.abrupt("return");
                        case 5:
                          return (t.prev = 5), (t.next = 8), e;
                        case 8:
                          return (t.next = 10), null == a ? void 0 : a(new F());
                        case 10:
                          if (((t.t0 = t.sent), t.t0)) {
                            t.next = 15;
                            break;
                          }
                          return (t.next = 14), i();
                        case 14:
                          t.t0 = t.sent;
                        case 15:
                          (y = t.t0), (t.next = 26);
                          break;
                        case 18:
                          if (
                            ((t.prev = 18),
                            (t.t1 = t.catch(5)),
                            !(t.t1 instanceof A))
                          ) {
                            t.next = 25;
                            break;
                          }
                          return (
                            !0 === t.t1.loadSegmentNormally &&
                              r.loadNormally(n, l),
                            t.abrupt("return")
                          );
                        case 25:
                          throw t.t1;
                        case 26:
                          return (
                            x(y),
                            r.configureConsentStampingMiddleware({
                              getCategories: i,
                              integrationCategoryMappings: u,
                              pruneUnmappedCategories: c,
                            }),
                            (v = function (t) {
                              return t.remotePlugins ? ct(t, y, u, f) : t;
                            }),
                            t.abrupt(
                              "return",
                              r.loadNormally(
                                n,
                                nt(
                                  nt({}, l),
                                  {},
                                  {
                                    updateCDNSettings: S(
                                      v,
                                      (null === (h = l) || void 0 === h
                                        ? void 0
                                        : h.updateCDNSettings) ||
                                        function (t) {
                                          return t;
                                        }
                                    ),
                                    disable: ft(
                                      y,
                                      null === (p = l) || void 0 === p
                                        ? void 0
                                        : p.disable
                                    ),
                                  }
                                )
                              )
                            )
                          );
                        case 30:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[5, 18]]
                );
              })
            );
            return function (r, e) {
              return t.apply(this, arguments);
            };
          })();
          return r.replaceLoadMethod(n), t;
        };
      },
      ct = function (t, r, e, n) {
        var o = t.remotePlugins,
          i = t.integrations,
          a = function (t) {
            var o = e
              ? e[t]
              : (function (t) {
                  if (
                    t &&
                    "object" === tt(t) &&
                    "consentSettings" in t &&
                    "object" === tt(t.consentSettings) &&
                    t.consentSettings &&
                    "categories" in t.consentSettings &&
                    Array.isArray(t.consentSettings.categories)
                  )
                    return t.consentSettings.categories || void 0;
                })(i[t]);
            return n
              ? n(o || [], r, { creationName: t })
              : !o ||
                  !o.length ||
                  o.every(function (t) {
                    return r[t];
                  });
          };
        return Object.keys(i).reduce(function (t, r) {
          return (
            a(r) ||
              ((t.remotePlugins =
                t.remotePlugins &&
                t.remotePlugins.filter(function (t) {
                  return t.creationName !== r;
                })),
              delete t.integrations[r]),
            t
          );
        }, nt(nt({}, t), {}, { remotePlugins: o, integrations: nt({}, i) }));
      },
      ft = function (t, r) {
        return (
          !0 === r ||
          function (e) {
            return (
              (n = t),
              (!(!(o = e.consentSettings) || o.hasUnmappedDestinations) &&
                Object.keys(n)
                  .filter(function (t) {
                    return n[t];
                  })
                  .every(function (t) {
                    return !o.allCategories.includes(t);
                  })) ||
                ("function" == typeof r && r(e))
            );
            var n, o;
          }
        );
      };
    function lt(t) {
      return (
        (lt =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        lt(t)
      );
    }
    function st() {
      st = function () {
        return r;
      };
      var t,
        r = {},
        e = Object.prototype,
        n = e.hasOwnProperty,
        o =
          Object.defineProperty ||
          function (t, r, e) {
            t[r] = e.value;
          },
        i = "function" == typeof Symbol ? Symbol : {},
        a = i.iterator || "@@iterator",
        u = i.asyncIterator || "@@asyncIterator",
        c = i.toStringTag || "@@toStringTag";
      function f(t, r, e) {
        return (
          Object.defineProperty(t, r, {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          t[r]
        );
      }
      try {
        f({}, "");
      } catch (t) {
        f = function (t, r, e) {
          return (t[r] = e);
        };
      }
      function l(t, r, e, n) {
        var i = r && r.prototype instanceof d ? r : d,
          a = Object.create(i.prototype),
          u = new k(n || []);
        return o(a, "_invoke", { value: S(t, e, u) }), a;
      }
      function s(t, r, e) {
        try {
          return { type: "normal", arg: t.call(r, e) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      r.wrap = l;
      var h = "suspendedStart",
        p = "executing",
        y = "completed",
        v = {};
      function d() {}
      function g() {}
      function m() {}
      var b = {};
      f(b, a, function () {
        return this;
      });
      var w = Object.getPrototypeOf,
        O = w && w(w(N([])));
      O && O !== e && n.call(O, a) && (b = O);
      var j = (m.prototype = d.prototype = Object.create(b));
      function x(t) {
        ["next", "throw", "return"].forEach(function (r) {
          f(t, r, function (t) {
            return this._invoke(r, t);
          });
        });
      }
      function E(t, r) {
        function e(o, i, a, u) {
          var c = s(t[o], t, i);
          if ("throw" !== c.type) {
            var f = c.arg,
              l = f.value;
            return l && "object" == lt(l) && n.call(l, "__await")
              ? r.resolve(l.__await).then(
                  function (t) {
                    e("next", t, a, u);
                  },
                  function (t) {
                    e("throw", t, a, u);
                  }
                )
              : r.resolve(l).then(
                  function (t) {
                    (f.value = t), a(f);
                  },
                  function (t) {
                    return e("throw", t, a, u);
                  }
                );
          }
          u(c.arg);
        }
        var i;
        o(this, "_invoke", {
          value: function (t, n) {
            function o() {
              return new r(function (r, o) {
                e(t, n, r, o);
              });
            }
            return (i = i ? i.then(o, o) : o());
          },
        });
      }
      function S(r, e, n) {
        var o = h;
        return function (i, a) {
          if (o === p) throw new Error("Generator is already running");
          if (o === y) {
            if ("throw" === i) throw a;
            return { value: t, done: !0 };
          }
          for (n.method = i, n.arg = a; ; ) {
            var u = n.delegate;
            if (u) {
              var c = L(u, n);
              if (c) {
                if (c === v) continue;
                return c;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;
            else if ("throw" === n.method) {
              if (o === h) throw ((o = y), n.arg);
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            o = p;
            var f = s(r, e, n);
            if ("normal" === f.type) {
              if (((o = n.done ? y : "suspendedYield"), f.arg === v)) continue;
              return { value: f.arg, done: n.done };
            }
            "throw" === f.type &&
              ((o = y), (n.method = "throw"), (n.arg = f.arg));
          }
        };
      }
      function L(r, e) {
        var n = e.method,
          o = r.iterator[n];
        if (o === t)
          return (
            (e.delegate = null),
            ("throw" === n &&
              r.iterator.return &&
              ((e.method = "return"),
              (e.arg = t),
              L(r, e),
              "throw" === e.method)) ||
              ("return" !== n &&
                ((e.method = "throw"),
                (e.arg = new TypeError(
                  "The iterator does not provide a '" + n + "' method"
                )))),
            v
          );
        var i = s(o, r.iterator, e.arg);
        if ("throw" === i.type)
          return (e.method = "throw"), (e.arg = i.arg), (e.delegate = null), v;
        var a = i.arg;
        return a
          ? a.done
            ? ((e[r.resultName] = a.value),
              (e.next = r.nextLoc),
              "return" !== e.method && ((e.method = "next"), (e.arg = t)),
              (e.delegate = null),
              v)
            : a
          : ((e.method = "throw"),
            (e.arg = new TypeError("iterator result is not an object")),
            (e.delegate = null),
            v);
      }
      function P(t) {
        var r = { tryLoc: t[0] };
        1 in t && (r.catchLoc = t[1]),
          2 in t && ((r.finallyLoc = t[2]), (r.afterLoc = t[3])),
          this.tryEntries.push(r);
      }
      function _(t) {
        var r = t.completion || {};
        (r.type = "normal"), delete r.arg, (t.completion = r);
      }
      function k(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(P, this),
          this.reset(!0);
      }
      function N(r) {
        if (r || "" === r) {
          var e = r[a];
          if (e) return e.call(r);
          if ("function" == typeof r.next) return r;
          if (!isNaN(r.length)) {
            var o = -1,
              i = function e() {
                for (; ++o < r.length; )
                  if (n.call(r, o)) return (e.value = r[o]), (e.done = !1), e;
                return (e.value = t), (e.done = !0), e;
              };
            return (i.next = i);
          }
        }
        throw new TypeError(lt(r) + " is not iterable");
      }
      return (
        (g.prototype = m),
        o(j, "constructor", { value: m, configurable: !0 }),
        o(m, "constructor", { value: g, configurable: !0 }),
        (g.displayName = f(m, c, "GeneratorFunction")),
        (r.isGeneratorFunction = function (t) {
          var r = "function" == typeof t && t.constructor;
          return (
            !!r &&
            (r === g || "GeneratorFunction" === (r.displayName || r.name))
          );
        }),
        (r.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, m)
              : ((t.__proto__ = m), f(t, c, "GeneratorFunction")),
            (t.prototype = Object.create(j)),
            t
          );
        }),
        (r.awrap = function (t) {
          return { __await: t };
        }),
        x(E.prototype),
        f(E.prototype, u, function () {
          return this;
        }),
        (r.AsyncIterator = E),
        (r.async = function (t, e, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new E(l(t, e, n, o), i);
          return r.isGeneratorFunction(e)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        x(j),
        f(j, c, "Generator"),
        f(j, a, function () {
          return this;
        }),
        f(j, "toString", function () {
          return "[object Generator]";
        }),
        (r.keys = function (t) {
          var r = Object(t),
            e = [];
          for (var n in r) e.push(n);
          return (
            e.reverse(),
            function t() {
              for (; e.length; ) {
                var n = e.pop();
                if (n in r) return (t.value = n), (t.done = !1), t;
              }
              return (t.done = !0), t;
            }
          );
        }),
        (r.values = N),
        (k.prototype = {
          constructor: k,
          reset: function (r) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = t),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = t),
              this.tryEntries.forEach(_),
              !r)
            )
              for (var e in this)
                "t" === e.charAt(0) &&
                  n.call(this, e) &&
                  !isNaN(+e.slice(1)) &&
                  (this[e] = t);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (r) {
            if (this.done) throw r;
            var e = this;
            function o(n, o) {
              return (
                (u.type = "throw"),
                (u.arg = r),
                (e.next = n),
                o && ((e.method = "next"), (e.arg = t)),
                !!o
              );
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var a = this.tryEntries[i],
                u = a.completion;
              if ("root" === a.tryLoc) return o("end");
              if (a.tryLoc <= this.prev) {
                var c = n.call(a, "catchLoc"),
                  f = n.call(a, "finallyLoc");
                if (c && f) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                } else if (c) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                } else {
                  if (!f)
                    throw new Error("try statement without catch or finally");
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, r) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var o = this.tryEntries[e];
              if (
                o.tryLoc <= this.prev &&
                n.call(o, "finallyLoc") &&
                this.prev < o.finallyLoc
              ) {
                var i = o;
                break;
              }
            }
            i &&
              ("break" === t || "continue" === t) &&
              i.tryLoc <= r &&
              r <= i.finallyLoc &&
              (i = null);
            var a = i ? i.completion : {};
            return (
              (a.type = t),
              (a.arg = r),
              i
                ? ((this.method = "next"), (this.next = i.finallyLoc), v)
                : this.complete(a)
            );
          },
          complete: function (t, r) {
            if ("throw" === t.type) throw t.arg;
            return (
              "break" === t.type || "continue" === t.type
                ? (this.next = t.arg)
                : "return" === t.type
                ? ((this.rval = this.arg = t.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === t.type && r && (this.next = r),
              v
            );
          },
          finish: function (t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var e = this.tryEntries[r];
              if (e.finallyLoc === t)
                return this.complete(e.completion, e.afterLoc), _(e), v;
            }
          },
          catch: function (t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var e = this.tryEntries[r];
              if (e.tryLoc === t) {
                var n = e.completion;
                if ("throw" === n.type) {
                  var o = n.arg;
                  _(e);
                }
                return o;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (r, e, n) {
            return (
              (this.delegate = { iterator: N(r), resultName: e, nextLoc: n }),
              "next" === this.method && (this.arg = t),
              v
            );
          },
        }),
        r
      );
    }
    function ht(t, r, e, n, o, i, a) {
      try {
        var u = t[i](a),
          c = u.value;
      } catch (t) {
        return void e(t);
      }
      u.done ? r(c) : Promise.resolve(c).then(n, o);
    }
    function pt(t) {
      return function () {
        var r = this,
          e = arguments;
        return new Promise(function (n, o) {
          var i = t.apply(r, e);
          function a(t) {
            ht(i, n, o, a, u, "next", t);
          }
          function u(t) {
            ht(i, n, o, a, u, "throw", t);
          }
          a(void 0);
        });
      };
    }
    function yt(t, r) {
      return vt.apply(this, arguments);
    }
    function vt() {
      return (vt = pt(
        st().mark(function t(r, e) {
          return st().wrap(function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  return t.abrupt(
                    "return",
                    new Promise(function (t, n) {
                      if (r()) t();
                      else {
                        !(function n() {
                          return setTimeout(function () {
                            r() ? t() : n();
                          }, e);
                        })();
                      }
                    })
                  );
                case 1:
                case "end":
                  return t.stop();
              }
          }, t);
        })
      )).apply(this, arguments);
    }
    function dt(t) {
      return (
        (dt =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        dt(t)
      );
    }
    function gt(t, r) {
      for (var e = 0; e < r.length; e++) {
        var n = r[e];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(t, St(n.key), n);
      }
    }
    function mt(t, r) {
      if (r && ("object" === dt(r) || "function" == typeof r)) return r;
      if (void 0 !== r)
        throw new TypeError(
          "Derived constructors may only return object or undefined"
        );
      return bt(t);
    }
    function bt(t) {
      if (void 0 === t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return t;
    }
    function wt(t) {
      var r = "function" == typeof Map ? new Map() : void 0;
      return (
        (wt = function (t) {
          if (
            null === t ||
            ((e = t), -1 === Function.toString.call(e).indexOf("[native code]"))
          )
            return t;
          var e;
          if ("function" != typeof t)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          if (void 0 !== r) {
            if (r.has(t)) return r.get(t);
            r.set(t, n);
          }
          function n() {
            return Ot(t, arguments, Et(this).constructor);
          }
          return (
            (n.prototype = Object.create(t.prototype, {
              constructor: {
                value: n,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
            xt(n, t)
          );
        }),
        wt(t)
      );
    }
    function Ot(t, r, e) {
      return (
        (Ot = jt()
          ? Reflect.construct.bind()
          : function (t, r, e) {
              var n = [null];
              n.push.apply(n, r);
              var o = new (Function.bind.apply(t, n))();
              return e && xt(o, e.prototype), o;
            }),
        Ot.apply(null, arguments)
      );
    }
    function jt() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        );
      } catch (t) {
        return !1;
      }
    }
    function xt(t, r) {
      return (
        (xt = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function (t, r) {
              return (t.__proto__ = r), t;
            }),
        xt(t, r)
      );
    }
    function Et(t) {
      return (
        (Et = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            }),
        Et(t)
      );
    }
    function St(t) {
      var r = (function (t, r) {
        if ("object" !== dt(t) || null === t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
          var n = e.call(t, r || "default");
          if ("object" !== dt(n)) return n;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === r ? String : Number)(t);
      })(t, "string");
      return "symbol" === dt(r) ? r : String(r);
    }
    var Lt = (function (t) {
      !(function (t, r) {
        if ("function" != typeof r && null !== r)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(r && r.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          r && xt(t, r);
      })(u, t);
      var r,
        e,
        n,
        o,
        i,
        a =
          ((r = u),
          (e = jt()),
          function () {
            var t,
              n = Et(r);
            if (e) {
              var o = Et(this).constructor;
              t = Reflect.construct(n, arguments, o);
            } else t = n.apply(this, arguments);
            return mt(this, t);
          });
      function u(t, r) {
        var e, n, o, i;
        return (
          (function (t, r) {
            if (!(t instanceof r))
              throw new TypeError("Cannot call a class as a function");
          })(this, u),
          (e = a.call(
            this,
            "Invariant: "
              .concat(t, " (Received: ")
              .concat(JSON.stringify(r), ")")
          )),
          (n = bt(e)),
          (i = "OtConsentWrapperValidationError"),
          (o = St((o = "name"))) in n
            ? Object.defineProperty(n, o, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (n[o] = i),
          e
        );
      }
      return (
        (n = u),
        o && gt(n.prototype, o),
        i && gt(n, i),
        Object.defineProperty(n, "prototype", { writable: !1 }),
        n
      );
    })(wt(Error));
    function Pt(t, r) {
      var e = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(t);
        r &&
          (n = n.filter(function (r) {
            return Object.getOwnPropertyDescriptor(t, r).enumerable;
          })),
          e.push.apply(e, n);
      }
      return e;
    }
    function _t(t) {
      for (var r = 1; r < arguments.length; r++) {
        var e = null != arguments[r] ? arguments[r] : {};
        r % 2
          ? Pt(Object(e), !0).forEach(function (r) {
              kt(t, r, e[r]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e))
          : Pt(Object(e)).forEach(function (r) {
              Object.defineProperty(
                t,
                r,
                Object.getOwnPropertyDescriptor(e, r)
              );
            });
      }
      return t;
    }
    function kt(t, r, e) {
      return (
        (r = (function (t) {
          var r = (function (t, r) {
            if ("object" !== Nt(t) || null === t) return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
              var n = e.call(t, r || "default");
              if ("object" !== Nt(n)) return n;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return ("string" === r ? String : Number)(t);
          })(t, "string");
          return "symbol" === Nt(r) ? r : String(r);
        })(r)) in t
          ? Object.defineProperty(t, r, {
              value: e,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[r] = e),
        t
      );
    }
    function Nt(t) {
      return (
        (Nt =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        Nt(t)
      );
    }
    var Tt = function (t) {
        return t.trim().split(",").filter(Boolean);
      },
      Gt = function () {
        var t = window.OneTrust;
        if (t)
          return "object" === Nt(t) &&
            "OnConsentChanged" in t &&
            "IsAlertBoxClosed" in t &&
            "GetDomainData" in t
            ? t
            : void (
                "geolocationResponse" in t ||
                console.error(
                  new Lt("window.OneTrust is unexpected type", t).message
                )
              );
      },
      Ct = function () {
        var t = window.OnetrustActiveGroups;
        if (t) {
          if ("string" != typeof t)
            throw new Lt("window.OnetrustActiveGroups is not a string", t);
          return t;
        }
      },
      At = function () {
        var t =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Ct();
        return t ? Tt(t || "") : [];
      },
      Ft = function (t) {
        return { groupId: t.CustomGroupId.trim() };
      },
      Dt = function () {
        var t = Gt();
        return t ? t.GetDomainData().Groups.map(Ft) : [];
      },
      It = function () {
        var t =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : At(),
          r = Dt().reduce(
            function (r, e) {
              return (
                t.includes(e.groupId)
                  ? r.userSetConsentGroups.push(e)
                  : r.userDeniedConsentGroups.push(e),
                r
              );
            },
            { userSetConsentGroups: [], userDeniedConsentGroups: [] }
          );
        return r;
      },
      Rt = function () {
        var t =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : It(),
          r = t.userSetConsentGroups,
          e = t.userDeniedConsentGroups,
          n = r.reduce(function (t, r) {
            return _t(_t({}, t), {}, kt({}, r.groupId, !0));
          }, {}),
          o = e.reduce(function (t, r) {
            return _t(_t({}, t), {}, kt({}, r.groupId, !1));
          }, {});
        return _t(_t({}, n), o);
      },
      Mt = function (t) {
        return Rt(It(t));
      };
    function Bt(t) {
      return (
        (Bt =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        Bt(t)
      );
    }
    function Yt() {
      Yt = function () {
        return r;
      };
      var t,
        r = {},
        e = Object.prototype,
        n = e.hasOwnProperty,
        o =
          Object.defineProperty ||
          function (t, r, e) {
            t[r] = e.value;
          },
        i = "function" == typeof Symbol ? Symbol : {},
        a = i.iterator || "@@iterator",
        u = i.asyncIterator || "@@asyncIterator",
        c = i.toStringTag || "@@toStringTag";
      function f(t, r, e) {
        return (
          Object.defineProperty(t, r, {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          t[r]
        );
      }
      try {
        f({}, "");
      } catch (t) {
        f = function (t, r, e) {
          return (t[r] = e);
        };
      }
      function l(t, r, e, n) {
        var i = r && r.prototype instanceof d ? r : d,
          a = Object.create(i.prototype),
          u = new k(n || []);
        return o(a, "_invoke", { value: S(t, e, u) }), a;
      }
      function s(t, r, e) {
        try {
          return { type: "normal", arg: t.call(r, e) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      r.wrap = l;
      var h = "suspendedStart",
        p = "executing",
        y = "completed",
        v = {};
      function d() {}
      function g() {}
      function m() {}
      var b = {};
      f(b, a, function () {
        return this;
      });
      var w = Object.getPrototypeOf,
        O = w && w(w(N([])));
      O && O !== e && n.call(O, a) && (b = O);
      var j = (m.prototype = d.prototype = Object.create(b));
      function x(t) {
        ["next", "throw", "return"].forEach(function (r) {
          f(t, r, function (t) {
            return this._invoke(r, t);
          });
        });
      }
      function E(t, r) {
        function e(o, i, a, u) {
          var c = s(t[o], t, i);
          if ("throw" !== c.type) {
            var f = c.arg,
              l = f.value;
            return l && "object" == Bt(l) && n.call(l, "__await")
              ? r.resolve(l.__await).then(
                  function (t) {
                    e("next", t, a, u);
                  },
                  function (t) {
                    e("throw", t, a, u);
                  }
                )
              : r.resolve(l).then(
                  function (t) {
                    (f.value = t), a(f);
                  },
                  function (t) {
                    return e("throw", t, a, u);
                  }
                );
          }
          u(c.arg);
        }
        var i;
        o(this, "_invoke", {
          value: function (t, n) {
            function o() {
              return new r(function (r, o) {
                e(t, n, r, o);
              });
            }
            return (i = i ? i.then(o, o) : o());
          },
        });
      }
      function S(r, e, n) {
        var o = h;
        return function (i, a) {
          if (o === p) throw new Error("Generator is already running");
          if (o === y) {
            if ("throw" === i) throw a;
            return { value: t, done: !0 };
          }
          for (n.method = i, n.arg = a; ; ) {
            var u = n.delegate;
            if (u) {
              var c = L(u, n);
              if (c) {
                if (c === v) continue;
                return c;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;
            else if ("throw" === n.method) {
              if (o === h) throw ((o = y), n.arg);
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            o = p;
            var f = s(r, e, n);
            if ("normal" === f.type) {
              if (((o = n.done ? y : "suspendedYield"), f.arg === v)) continue;
              return { value: f.arg, done: n.done };
            }
            "throw" === f.type &&
              ((o = y), (n.method = "throw"), (n.arg = f.arg));
          }
        };
      }
      function L(r, e) {
        var n = e.method,
          o = r.iterator[n];
        if (o === t)
          return (
            (e.delegate = null),
            ("throw" === n &&
              r.iterator.return &&
              ((e.method = "return"),
              (e.arg = t),
              L(r, e),
              "throw" === e.method)) ||
              ("return" !== n &&
                ((e.method = "throw"),
                (e.arg = new TypeError(
                  "The iterator does not provide a '" + n + "' method"
                )))),
            v
          );
        var i = s(o, r.iterator, e.arg);
        if ("throw" === i.type)
          return (e.method = "throw"), (e.arg = i.arg), (e.delegate = null), v;
        var a = i.arg;
        return a
          ? a.done
            ? ((e[r.resultName] = a.value),
              (e.next = r.nextLoc),
              "return" !== e.method && ((e.method = "next"), (e.arg = t)),
              (e.delegate = null),
              v)
            : a
          : ((e.method = "throw"),
            (e.arg = new TypeError("iterator result is not an object")),
            (e.delegate = null),
            v);
      }
      function P(t) {
        var r = { tryLoc: t[0] };
        1 in t && (r.catchLoc = t[1]),
          2 in t && ((r.finallyLoc = t[2]), (r.afterLoc = t[3])),
          this.tryEntries.push(r);
      }
      function _(t) {
        var r = t.completion || {};
        (r.type = "normal"), delete r.arg, (t.completion = r);
      }
      function k(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(P, this),
          this.reset(!0);
      }
      function N(r) {
        if (r || "" === r) {
          var e = r[a];
          if (e) return e.call(r);
          if ("function" == typeof r.next) return r;
          if (!isNaN(r.length)) {
            var o = -1,
              i = function e() {
                for (; ++o < r.length; )
                  if (n.call(r, o)) return (e.value = r[o]), (e.done = !1), e;
                return (e.value = t), (e.done = !0), e;
              };
            return (i.next = i);
          }
        }
        throw new TypeError(Bt(r) + " is not iterable");
      }
      return (
        (g.prototype = m),
        o(j, "constructor", { value: m, configurable: !0 }),
        o(m, "constructor", { value: g, configurable: !0 }),
        (g.displayName = f(m, c, "GeneratorFunction")),
        (r.isGeneratorFunction = function (t) {
          var r = "function" == typeof t && t.constructor;
          return (
            !!r &&
            (r === g || "GeneratorFunction" === (r.displayName || r.name))
          );
        }),
        (r.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, m)
              : ((t.__proto__ = m), f(t, c, "GeneratorFunction")),
            (t.prototype = Object.create(j)),
            t
          );
        }),
        (r.awrap = function (t) {
          return { __await: t };
        }),
        x(E.prototype),
        f(E.prototype, u, function () {
          return this;
        }),
        (r.AsyncIterator = E),
        (r.async = function (t, e, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new E(l(t, e, n, o), i);
          return r.isGeneratorFunction(e)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        x(j),
        f(j, c, "Generator"),
        f(j, a, function () {
          return this;
        }),
        f(j, "toString", function () {
          return "[object Generator]";
        }),
        (r.keys = function (t) {
          var r = Object(t),
            e = [];
          for (var n in r) e.push(n);
          return (
            e.reverse(),
            function t() {
              for (; e.length; ) {
                var n = e.pop();
                if (n in r) return (t.value = n), (t.done = !1), t;
              }
              return (t.done = !0), t;
            }
          );
        }),
        (r.values = N),
        (k.prototype = {
          constructor: k,
          reset: function (r) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = t),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = t),
              this.tryEntries.forEach(_),
              !r)
            )
              for (var e in this)
                "t" === e.charAt(0) &&
                  n.call(this, e) &&
                  !isNaN(+e.slice(1)) &&
                  (this[e] = t);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (r) {
            if (this.done) throw r;
            var e = this;
            function o(n, o) {
              return (
                (u.type = "throw"),
                (u.arg = r),
                (e.next = n),
                o && ((e.method = "next"), (e.arg = t)),
                !!o
              );
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var a = this.tryEntries[i],
                u = a.completion;
              if ("root" === a.tryLoc) return o("end");
              if (a.tryLoc <= this.prev) {
                var c = n.call(a, "catchLoc"),
                  f = n.call(a, "finallyLoc");
                if (c && f) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                } else if (c) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                } else {
                  if (!f)
                    throw new Error("try statement without catch or finally");
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, r) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var o = this.tryEntries[e];
              if (
                o.tryLoc <= this.prev &&
                n.call(o, "finallyLoc") &&
                this.prev < o.finallyLoc
              ) {
                var i = o;
                break;
              }
            }
            i &&
              ("break" === t || "continue" === t) &&
              i.tryLoc <= r &&
              r <= i.finallyLoc &&
              (i = null);
            var a = i ? i.completion : {};
            return (
              (a.type = t),
              (a.arg = r),
              i
                ? ((this.method = "next"), (this.next = i.finallyLoc), v)
                : this.complete(a)
            );
          },
          complete: function (t, r) {
            if ("throw" === t.type) throw t.arg;
            return (
              "break" === t.type || "continue" === t.type
                ? (this.next = t.arg)
                : "return" === t.type
                ? ((this.rval = this.arg = t.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === t.type && r && (this.next = r),
              v
            );
          },
          finish: function (t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var e = this.tryEntries[r];
              if (e.finallyLoc === t)
                return this.complete(e.completion, e.afterLoc), _(e), v;
            }
          },
          catch: function (t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var e = this.tryEntries[r];
              if (e.tryLoc === t) {
                var n = e.completion;
                if ("throw" === n.type) {
                  var o = n.arg;
                  _(e);
                }
                return o;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (r, e, n) {
            return (
              (this.delegate = { iterator: N(r), resultName: e, nextLoc: n }),
              "next" === this.method && (this.arg = t),
              v
            );
          },
        }),
        r
      );
    }
    function zt(t, r, e, n, o, i, a) {
      try {
        var u = t[i](a),
          c = u.value;
      } catch (t) {
        return void e(t);
      }
      u.done ? r(c) : Promise.resolve(c).then(n, o);
    }
    function Ut(t) {
      return function () {
        var r = this,
          e = arguments;
        return new Promise(function (n, o) {
          var i = t.apply(r, e);
          function a(t) {
            zt(i, n, o, a, u, "next", t);
          }
          function u(t) {
            zt(i, n, o, a, u, "throw", t);
          }
          a(void 0);
        });
      };
    }
    var Vt = function (t) {
      var r,
        e,
        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return ut({
        shouldLoadWrapper:
          ((e = Ut(
            Yt().mark(function t() {
              return Yt().wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (t.next = 2),
                        yt(function () {
                          return void 0 !== Gt();
                        }, 500)
                      );
                    case 2:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          )),
          function () {
            return e.apply(this, arguments);
          }),
        shouldLoadSegment:
          ((r = Ut(
            Yt().mark(function t() {
              return Yt().wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (t.next = 2),
                        yt(function () {
                          var t = Gt();
                          return Boolean(At().length) && true;
                        }, 500)
                      );
                    case 2:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          )),
          function () {
            return r.apply(this, arguments);
          }),
        getCategories: function () {
          return Rt();
        },
        registerOnConsentChanged: n.disableConsentChangedEvent
          ? void 0
          : function (t) {
              Gt().OnConsentChanged(function (r) {
                var e = Mt(r.detail);
                t(e);
              });
            },
        integrationCategoryMappings: n.integrationCategoryMappings,
      })(t);
    };
    return "undefined" != typeof window && (window.withOneTrust = Vt), r;
  })();
});
//# sourceMappingURL=analytics-onetrust.umd.js.map
