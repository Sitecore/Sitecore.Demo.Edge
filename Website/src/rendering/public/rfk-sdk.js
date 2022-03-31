var RFK;
(() => {
  var e = {
      718: (e) => {
        function t(e, t) {
          for (let r = 0; r < t.length; r++) {
            const n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        function r(e, t) {
          return (
            (r =
              Object.setPrototypeOf ||
              function (e, t) {
                return (e.__proto__ = t), e;
              }),
            r(e, t)
          );
        }
        function n(e) {
          return (
            (n = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
                }),
            n(e)
          );
        }
        function o(e) {
          return (
            (o =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e;
                  }),
            o(e)
          );
        }
        function i(e, t) {
          if (t && ('object' === o(t) || 'function' == typeof t)) return t;
          if (void 0 !== t)
            throw new TypeError('Derived constructors may only return object or undefined');
          return (function (e) {
            if (void 0 === e)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          })(e);
        }
        e.exports = {
          defineProperty: function (e, t, r) {
            return (
              t in e
                ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (e[t] = r),
              e
            );
          },
          createClass: function (e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e;
          },
          inherits: function (e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError('Super expression must either be null or a function');
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              t && r(e, t);
          },
          createSuper: function (e) {
            const t = (function () {
              if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
              if (Reflect.construct.sham) return !1;
              if ('function' == typeof Proxy) return !0;
              try {
                return (
                  Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
                );
              } catch (e) {
                return !1;
              }
            })();
            return function () {
              const r = n(e);
              let o;
              if (t) {
                const e = n(this).constructor;
                o = Reflect.construct(r, arguments, e);
              } else o = r.apply(this, arguments);
              return i(this, o);
            };
          },
        };
      },
    },
    t = {};
  function r(n) {
    var o = t[n];
    if (void 0 !== o) return o.exports;
    var i = (t[n] = { exports: {} });
    return e[n](i, i.exports, r), i.exports;
  }
  (r.d = (e, t) => {
    for (var n in t)
      r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
  }),
    (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (r.r = (e) => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    });
  var n = {};
  (() => {
    'use strict';
    r.r(n),
      r.d(n, {
        Actions: () => z,
        PageController: () => Ot,
        WidgetController: () => _n,
        api: () => o,
        init: () => So,
        setCredentials: () => bo,
        setWidget: () => wo,
        setWidgetType: () => Ao,
        types: () => ee,
        ui: () => t,
        widgets: () => u,
      });
    var e = {};
    r.r(e),
      r.d(e, {
        getDefaultRequestFor: () => Xe,
        setDefaultRequestFor: () => et,
      });
    var t = {};
    r.r(t),
      r.d(t, {
        Children: () => pr,
        Component: () => R,
        ContainerRendererFactory: () => un,
        Fragment: () => w,
        PureComponent: () => sr,
        StrictMode: () => qr,
        Suspense: () => fr,
        SuspenseList: () => mr,
        WidgetFactory: () => on,
        WidgetRenderer: () => ln,
        cloneElement: () => Hr,
        createContext: () => Q,
        createElement: () => b,
        createFactory: () => Wr,
        createPortal: () => Er,
        createRef: () => A,
        findDOMNode: () => Lr,
        forwardRef: () => ur,
        html: () => cn,
        hydrate: () => Tr,
        isValidElement: () => Vr,
        lazy: () => yr,
        memo: () => ar,
        options: () => p,
        render: () => Rr,
        setupWidget: () => rn,
        toChildArray: () => D,
        unmountComponentAtNode: () => Ur,
        useCallback: () => Qt,
        useContext: () => Yt,
        useDebugValue: () => zt,
        useEffect: () => jt,
        useImperativeHandle: () => $t,
        useLayoutEffect: () => Ft,
        useMemo: () => Jt,
        useReducer: () => Mt,
        useRef: () => Bt,
        useState: () => Gt,
        useWidget: () => Yr,
        useWidgetVisibility: () => Zr,
      });
    var o = {};
    r.r(o),
      r.d(o, {
        BannerRequest: () => Vn,
        DataProvider: () => Ve,
        DiscoverRequest: () => Hn,
        HTMLBlockRequest: () => Kn,
        PreviewSearchRequest: () => Nn,
        RecommendationRequest: () => xn,
        Request: () => Ye,
        SEORequest: () => Wn,
        SearchResultsRequest: () => Dn,
        clearCache: () => In,
        defaultRequests: () => e,
        getRfkUserId: () => Pn,
        setUserId: () => On,
        setup: () => Tn,
        trackAddToCartEvent: () => vt,
        trackAppearEvent: () => pn,
        trackDiscoverChoiceChangeEvent: () => fn,
        trackDiscoverClickToProductEvent: () => yn,
        trackDiscoverCloseEvent: () => Cn,
        trackDiscoverNavigationChangeEvent: () => vn,
        trackDiscoverProductChangeEvent: () => gn,
        trackDiscoverSwatchChangeEvent: () => mn,
        trackFullPageSearchClickEvent: () => kn,
        trackFullPageSearchFacetClickEvent: () => En,
        trackOrderConfirmEvent: () => bt,
        trackPDPViewEvent: () => Et,
        trackPageViewEvent: () => St,
        trackPreviewSearchClickEvent: () => bn,
        trackPreviewSearchSuggestionClickEvent: () => An,
        trackPreviewSearchTopCategoriesClickEvent: () => wn,
        trackPreviewSuggestedCategoryClickEvent: () => Sn,
        trackRecommendationClickEvent: () => Rn,
        trackStatusCartEvent: () => Ct,
        trackUserLoginEvent: () => kt,
        trackWidgetClickEvent: () => hn,
        trackWidgetEvent: () => dn,
      });
    var i = {};
    r.r(i),
      r.d(i, {
        NAVIGATION_NEXT: () => Gn,
        NAVIGATION_PREV: () => Mn,
        PRODUCT_CLICKED: () => qn,
      });
    var s = {};
    r.r(s),
      r.d(s, {
        CLEAR_FILTERS: () => Zn,
        FACET_CLICKED: () => $n,
        KEYPHRASE_CHANGED: () => zn,
        PAGE_NUMBER_CHANGED: () => Qn,
        PRODUCT_CLICKED: () => Bn,
        RESULTS_PER_PAGE_CHANGED: () => Yn,
        SORT_CHANGED: () => Jn,
      });
    var a = {};
    r.r(a),
      r.d(a, {
        CHOICE_CHANGED: () => oo,
        CLOSED: () => ro,
        NAVIGATION_NEXT: () => so,
        NAVIGATION_PREV: () => ao,
        OPENED: () => to,
        PRODUCT_CHANGED: () => no,
        REFRESH: () => io,
      });
    var c = {};
    r.r(c),
      r.d(c, {
        CATEGORY_CHANGED: () => ho,
        KEYPHRASE_CHANGED: () => _o,
        SUGGESTION_CHANGED: () => uo,
        TRENDING_CATEGORY_CHANGED: () => po,
      });
    var l = {};
    r.r(l), r.d(l, { getByType: () => yo });
    var u = {};
    r.r(u),
      r.d(u, {
        ContentBlock: () => Un,
        Discover: () => co,
        DiscoverActions: () => a,
        PreviewSearch: () => fo,
        PreviewSearchActions: () => c,
        Recommendation: () => jn,
        RecommendationActions: () => i,
        SearchResults: () => Xn,
        SearchResultsActions: () => s,
        WidgetControllers: () => l,
      });
    var d,
      p,
      h,
      _,
      f,
      g,
      y,
      m = {},
      v = [],
      C = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    function k(e, t) {
      for (var r in t) e[r] = t[r];
      return e;
    }
    function E(e) {
      var t = e.parentNode;
      t && t.removeChild(e);
    }
    function b(e, t, r) {
      var n,
        o,
        i,
        s = {};
      for (i in t) 'key' == i ? (n = t[i]) : 'ref' == i ? (o = t[i]) : (s[i] = t[i]);
      if (
        (arguments.length > 2 && (s.children = arguments.length > 3 ? d.call(arguments, 2) : r),
        'function' == typeof e && null != e.defaultProps)
      )
        for (i in e.defaultProps) void 0 === s[i] && (s[i] = e.defaultProps[i]);
      return S(e, s, n, o, null);
    }
    function S(e, t, r, n, o) {
      var i = {
        type: e,
        props: t,
        key: r,
        ref: n,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: null == o ? ++h : o,
      };
      return null == o && null != p.vnode && p.vnode(i), i;
    }
    function A() {
      return { current: null };
    }
    function w(e) {
      return e.children;
    }
    function R(e, t) {
      (this.props = e), (this.context = t);
    }
    function T(e, t) {
      if (null == t) return e.__ ? T(e.__, e.__.__k.indexOf(e) + 1) : null;
      for (var r; t < e.__k.length; t++) if (null != (r = e.__k[t]) && null != r.__e) return r.__e;
      return 'function' == typeof e.type ? T(e) : null;
    }
    function I(e) {
      var t, r;
      if (null != (e = e.__) && null != e.__c) {
        for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
          if (null != (r = e.__k[t]) && null != r.__e) {
            e.__e = e.__c.base = r.__e;
            break;
          }
        return I(e);
      }
    }
    function O(e) {
      ((!e.__d && (e.__d = !0) && _.push(e) && !P.__r++) || g !== p.debounceRendering) &&
        ((g = p.debounceRendering) || f)(P);
    }
    function P() {
      for (var e; (P.__r = _.length); )
        (e = _.sort(function (e, t) {
          return e.__v.__b - t.__v.__b;
        })),
          (_ = []),
          e.some(function (e) {
            var t, r, n, o, i, s;
            e.__d &&
              ((i = (o = (t = e).__v).__e),
              (s = t.__P) &&
                ((r = []),
                ((n = k({}, o)).__v = o.__v + 1),
                L(
                  s,
                  o,
                  n,
                  t.__n,
                  void 0 !== s.ownerSVGElement,
                  null != o.__h ? [i] : null,
                  r,
                  null == i ? T(o) : i,
                  o.__h
                ),
                q(r, o),
                o.__e != i && I(o)));
          });
    }
    function x(e, t, r, n, o, i, s, a, c, l) {
      var u,
        d,
        p,
        h,
        _,
        f,
        g,
        y = (n && n.__k) || v,
        C = y.length;
      for (r.__k = [], u = 0; u < t.length; u++)
        if (
          null !=
          (h = r.__k[u] =
            null == (h = t[u]) || 'boolean' == typeof h
              ? null
              : 'string' == typeof h || 'number' == typeof h || 'bigint' == typeof h
              ? S(null, h, null, null, h)
              : Array.isArray(h)
              ? S(w, { children: h }, null, null, null)
              : h.__b > 0
              ? S(h.type, h.props, h.key, null, h.__v)
              : h)
        ) {
          if (
            ((h.__ = r),
            (h.__b = r.__b + 1),
            null === (p = y[u]) || (p && h.key == p.key && h.type === p.type))
          )
            y[u] = void 0;
          else
            for (d = 0; d < C; d++) {
              if ((p = y[d]) && h.key == p.key && h.type === p.type) {
                y[d] = void 0;
                break;
              }
              p = null;
            }
          L(e, h, (p = p || m), o, i, s, a, c, l),
            (_ = h.__e),
            (d = h.ref) &&
              p.ref != d &&
              (g || (g = []), p.ref && g.push(p.ref, null, h), g.push(d, h.__c || _, h)),
            null != _
              ? (null == f && (f = _),
                'function' == typeof h.type && h.__k === p.__k
                  ? (h.__d = c = N(h, c, e))
                  : (c = K(e, h, p, y, _, c)),
                'function' == typeof r.type && (r.__d = c))
              : c && p.__e == c && c.parentNode != e && (c = T(p));
        }
      for (r.__e = f, u = C; u--; )
        null != y[u] &&
          ('function' == typeof r.type &&
            null != y[u].__e &&
            y[u].__e == r.__d &&
            (r.__d = T(n, u + 1)),
          j(y[u], y[u]));
      if (g) for (u = 0; u < g.length; u++) M(g[u], g[++u], g[++u]);
    }
    function N(e, t, r) {
      for (var n, o = e.__k, i = 0; o && i < o.length; i++)
        (n = o[i]) &&
          ((n.__ = e), (t = 'function' == typeof n.type ? N(n, t, r) : K(r, n, n, o, n.__e, t)));
      return t;
    }
    function D(e, t) {
      return (
        (t = t || []),
        null == e ||
          'boolean' == typeof e ||
          (Array.isArray(e)
            ? e.some(function (e) {
                D(e, t);
              })
            : t.push(e)),
        t
      );
    }
    function K(e, t, r, n, o, i) {
      var s, a, c;
      if (void 0 !== t.__d) (s = t.__d), (t.__d = void 0);
      else if (null == r || o != i || null == o.parentNode)
        e: if (null == i || i.parentNode !== e) e.appendChild(o), (s = null);
        else {
          for (a = i, c = 0; (a = a.nextSibling) && c < n.length; c += 2) if (a == o) break e;
          e.insertBefore(o, i), (s = i);
        }
      return void 0 !== s ? s : o.nextSibling;
    }
    function W(e, t, r) {
      '-' === t[0]
        ? e.setProperty(t, r)
        : (e[t] = null == r ? '' : 'number' != typeof r || C.test(t) ? r : r + 'px');
    }
    function V(e, t, r, n, o) {
      var i;
      e: if ('style' === t)
        if ('string' == typeof r) e.style.cssText = r;
        else {
          if (('string' == typeof n && (e.style.cssText = n = ''), n))
            for (t in n) (r && t in r) || W(e.style, t, '');
          if (r) for (t in r) (n && r[t] === n[t]) || W(e.style, t, r[t]);
        }
      else if ('o' === t[0] && 'n' === t[1])
        (i = t !== (t = t.replace(/Capture$/, ''))),
          (t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2)),
          e.l || (e.l = {}),
          (e.l[t + i] = r),
          r ? n || e.addEventListener(t, i ? U : H, i) : e.removeEventListener(t, i ? U : H, i);
      else if ('dangerouslySetInnerHTML' !== t) {
        if (o) t = t.replace(/xlink[H:h]/, 'h').replace(/sName$/, 's');
        else if (
          'href' !== t &&
          'list' !== t &&
          'form' !== t &&
          'tabIndex' !== t &&
          'download' !== t &&
          t in e
        )
          try {
            e[t] = null == r ? '' : r;
            break e;
          } catch (e) {}
        'function' == typeof r ||
          (null != r && (!1 !== r || ('a' === t[0] && 'r' === t[1]))
            ? e.setAttribute(t, r)
            : e.removeAttribute(t));
      }
    }
    function H(e) {
      this.l[e.type + !1](p.event ? p.event(e) : e);
    }
    function U(e) {
      this.l[e.type + !0](p.event ? p.event(e) : e);
    }
    function L(e, t, r, n, o, i, s, a, c) {
      var l,
        u,
        d,
        h,
        _,
        f,
        g,
        y,
        m,
        v,
        C,
        E = t.type;
      if (void 0 !== t.constructor) return null;
      null != r.__h && ((c = r.__h), (a = t.__e = r.__e), (t.__h = null), (i = [a])),
        (l = p.__b) && l(t);
      try {
        e: if ('function' == typeof E) {
          if (
            ((y = t.props),
            (m = (l = E.contextType) && n[l.__c]),
            (v = l ? (m ? m.props.value : l.__) : n),
            r.__c
              ? (g = (u = t.__c = r.__c).__ = u.__E)
              : ('prototype' in E && E.prototype.render
                  ? (t.__c = u = new E(y, v))
                  : ((t.__c = u = new R(y, v)), (u.constructor = E), (u.render = F)),
                m && m.sub(u),
                (u.props = y),
                u.state || (u.state = {}),
                (u.context = v),
                (u.__n = n),
                (d = u.__d = !0),
                (u.__h = [])),
            null == u.__s && (u.__s = u.state),
            null != E.getDerivedStateFromProps &&
              (u.__s == u.state && (u.__s = k({}, u.__s)),
              k(u.__s, E.getDerivedStateFromProps(y, u.__s))),
            (h = u.props),
            (_ = u.state),
            d)
          )
            null == E.getDerivedStateFromProps &&
              null != u.componentWillMount &&
              u.componentWillMount(),
              null != u.componentDidMount && u.__h.push(u.componentDidMount);
          else {
            if (
              (null == E.getDerivedStateFromProps &&
                y !== h &&
                null != u.componentWillReceiveProps &&
                u.componentWillReceiveProps(y, v),
              (!u.__e &&
                null != u.shouldComponentUpdate &&
                !1 === u.shouldComponentUpdate(y, u.__s, v)) ||
                t.__v === r.__v)
            ) {
              (u.props = y),
                (u.state = u.__s),
                t.__v !== r.__v && (u.__d = !1),
                (u.__v = t),
                (t.__e = r.__e),
                (t.__k = r.__k),
                t.__k.forEach(function (e) {
                  e && (e.__ = t);
                }),
                u.__h.length && s.push(u);
              break e;
            }
            null != u.componentWillUpdate && u.componentWillUpdate(y, u.__s, v),
              null != u.componentDidUpdate &&
                u.__h.push(function () {
                  u.componentDidUpdate(h, _, f);
                });
          }
          (u.context = v),
            (u.props = y),
            (u.state = u.__s),
            (l = p.__r) && l(t),
            (u.__d = !1),
            (u.__v = t),
            (u.__P = e),
            (l = u.render(u.props, u.state, u.context)),
            (u.state = u.__s),
            null != u.getChildContext && (n = k(k({}, n), u.getChildContext())),
            d || null == u.getSnapshotBeforeUpdate || (f = u.getSnapshotBeforeUpdate(h, _)),
            (C = null != l && l.type === w && null == l.key ? l.props.children : l),
            x(e, Array.isArray(C) ? C : [C], t, r, n, o, i, s, a, c),
            (u.base = t.__e),
            (t.__h = null),
            u.__h.length && s.push(u),
            g && (u.__E = u.__ = null),
            (u.__e = !1);
        } else
          null == i && t.__v === r.__v
            ? ((t.__k = r.__k), (t.__e = r.__e))
            : (t.__e = G(r.__e, t, r, n, o, i, s, c));
        (l = p.diffed) && l(t);
      } catch (e) {
        (t.__v = null),
          (c || null != i) && ((t.__e = a), (t.__h = !!c), (i[i.indexOf(a)] = null)),
          p.__e(e, t, r);
      }
    }
    function q(e, t) {
      p.__c && p.__c(t, e),
        e.some(function (t) {
          try {
            (e = t.__h),
              (t.__h = []),
              e.some(function (e) {
                e.call(t);
              });
          } catch (e) {
            p.__e(e, t.__v);
          }
        });
    }
    function G(e, t, r, n, o, i, s, a) {
      var c,
        l,
        u,
        p = r.props,
        h = t.props,
        _ = t.type,
        f = 0;
      if (('svg' === _ && (o = !0), null != i))
        for (; f < i.length; f++)
          if ((c = i[f]) && (c === e || (_ ? c.localName == _ : 3 == c.nodeType))) {
            (e = c), (i[f] = null);
            break;
          }
      if (null == e) {
        if (null === _) return document.createTextNode(h);
        (e = o
          ? document.createElementNS('http://www.w3.org/2000/svg', _)
          : document.createElement(_, h.is && h)),
          (i = null),
          (a = !1);
      }
      if (null === _) p === h || (a && e.data === h) || (e.data = h);
      else {
        if (
          ((i = i && d.call(e.childNodes)),
          (l = (p = r.props || m).dangerouslySetInnerHTML),
          (u = h.dangerouslySetInnerHTML),
          !a)
        ) {
          if (null != i)
            for (p = {}, f = 0; f < e.attributes.length; f++)
              p[e.attributes[f].name] = e.attributes[f].value;
          (u || l) &&
            ((u && ((l && u.__html == l.__html) || u.__html === e.innerHTML)) ||
              (e.innerHTML = (u && u.__html) || ''));
        }
        if (
          ((function (e, t, r, n, o) {
            var i;
            for (i in r) 'children' === i || 'key' === i || i in t || V(e, i, null, r[i], n);
            for (i in t)
              (o && 'function' != typeof t[i]) ||
                'children' === i ||
                'key' === i ||
                'value' === i ||
                'checked' === i ||
                r[i] === t[i] ||
                V(e, i, t[i], r[i], n);
          })(e, h, p, o, a),
          u)
        )
          t.__k = [];
        else if (
          ((f = t.props.children),
          x(
            e,
            Array.isArray(f) ? f : [f],
            t,
            r,
            n,
            o && 'foreignObject' !== _,
            i,
            s,
            i ? i[0] : r.__k && T(r, 0),
            a
          ),
          null != i)
        )
          for (f = i.length; f--; ) null != i[f] && E(i[f]);
        a ||
          ('value' in h &&
            void 0 !== (f = h.value) &&
            (f !== e.value || ('progress' === _ && !f)) &&
            V(e, 'value', f, p.value, !1),
          'checked' in h &&
            void 0 !== (f = h.checked) &&
            f !== e.checked &&
            V(e, 'checked', f, p.checked, !1));
      }
      return e;
    }
    function M(e, t, r) {
      try {
        'function' == typeof e ? e(t) : (e.current = t);
      } catch (e) {
        p.__e(e, r);
      }
    }
    function j(e, t, r) {
      var n, o;
      if (
        (p.unmount && p.unmount(e),
        (n = e.ref) && ((n.current && n.current !== e.__e) || M(n, null, t)),
        null != (n = e.__c))
      ) {
        if (n.componentWillUnmount)
          try {
            n.componentWillUnmount();
          } catch (e) {
            p.__e(e, t);
          }
        n.base = n.__P = null;
      }
      if ((n = e.__k))
        for (o = 0; o < n.length; o++) n[o] && j(n[o], t, 'function' != typeof e.type);
      r || null == e.__e || E(e.__e), (e.__e = e.__d = void 0);
    }
    function F(e, t, r) {
      return this.constructor(e, r);
    }
    function B(e, t, r) {
      var n, o, i;
      p.__ && p.__(e, t),
        (o = (n = 'function' == typeof r) ? null : (r && r.__k) || t.__k),
        (i = []),
        L(
          t,
          (e = ((!n && r) || t).__k = b(w, null, [e])),
          o || m,
          m,
          void 0 !== t.ownerSVGElement,
          !n && r ? [r] : o ? null : t.firstChild ? d.call(t.childNodes) : null,
          i,
          !n && r ? r : o ? o.__e : t.firstChild,
          n
        ),
        q(i, e);
    }
    function $(e, t) {
      B(e, t, $);
    }
    function J(e, t, r) {
      var n,
        o,
        i,
        s = k({}, e.props);
      for (i in t) 'key' == i ? (n = t[i]) : 'ref' == i ? (o = t[i]) : (s[i] = t[i]);
      return (
        arguments.length > 2 && (s.children = arguments.length > 3 ? d.call(arguments, 2) : r),
        S(e.type, s, n || e.key, o || e.ref, null)
      );
    }
    function Q(e, t) {
      var r = {
        __c: (t = '__cC' + y++),
        __: e,
        Consumer: function (e, t) {
          return e.children(t);
        },
        Provider: function (e) {
          var r, n;
          return (
            this.getChildContext ||
              ((r = []),
              ((n = {})[t] = this),
              (this.getChildContext = function () {
                return n;
              }),
              (this.shouldComponentUpdate = function (e) {
                this.props.value !== e.value && r.some(O);
              }),
              (this.sub = function (e) {
                r.push(e);
                var t = e.componentWillUnmount;
                e.componentWillUnmount = function () {
                  r.splice(r.indexOf(e), 1), t && t.call(e);
                };
              })),
            e.children
          );
        },
      };
      return (r.Provider.__ = r.Consumer.contextType = r);
    }
    (d = v.slice),
      (p = {
        __e: function (e, t) {
          for (var r, n, o; (t = t.__); )
            if ((r = t.__c) && !r.__)
              try {
                if (
                  ((n = r.constructor) &&
                    null != n.getDerivedStateFromError &&
                    (r.setState(n.getDerivedStateFromError(e)), (o = r.__d)),
                  null != r.componentDidCatch && (r.componentDidCatch(e), (o = r.__d)),
                  o)
                )
                  return (r.__E = r);
              } catch (t) {
                e = t;
              }
          throw e;
        },
      }),
      (h = 0),
      (R.prototype.setState = function (e, t) {
        var r;
        (r =
          null != this.__s && this.__s !== this.state ? this.__s : (this.__s = k({}, this.state))),
          'function' == typeof e && (e = e(k({}, r), this.props)),
          e && k(r, e),
          null != e && this.__v && (t && this.__h.push(t), O(this));
      }),
      (R.prototype.forceUpdate = function (e) {
        this.__v && ((this.__e = !0), e && this.__h.push(e), O(this));
      }),
      (R.prototype.render = w),
      (_ = []),
      (f =
        'function' == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout),
      (P.__r = 0),
      (y = 0);
    const Y = (e) => (t) => `${e}/${t}`,
      z = {
        LOAD: 'core/LOAD',
        REQUEST: 'core/REQUEST',
        REQUEST_SUCCESS: 'core/REQUEST_SUCCESS',
        REQUEST_FAIL: 'core/REQUEST_FAIL',
        WIDGET_APPEAR: 'core/WIDGET_APPEAR',
        PAGE_CONTAINER_READY: 'core/PAGE_CONTAINER_READY',
        WIDGET_READY: 'core/WIDGET_READY',
        INITIALIZE: 'core/INITIALIZE',
        INITIALIZED: 'core/INITIALIZED',
        RESET_WIDGET: 'core/RESET_WIDGET',
        PAGE_CONTEXT_CHANGED: 'core/PAGE_CONTEXT_CHANGED',
        ADD_WIDGETS: 'core/ADD_WIDGETS',
        ADD_TO_CART: 'core/interaction/ADD_TO_CART',
        ORDER_CONFIRM: 'core/interaction/ORDER_CONFIRM',
        USER_LOGIN: 'core/interaction/USER_LOGIN',
        ADD_TO_WISHLIST: 'core/interaction/ADD_TO_WISHLIST',
        CART_STATUS: 'core/interaction/CART_STATUS',
        PRODUCT_CLICK: 'core/interaction/PRODUCT_CLICK',
      };
    function Z(e) {
      return e && 'object' == typeof e && !Array.isArray(e);
    }
    function X(e, t) {
      let { mutate: r = !1 } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      const n = r ? e : Object.assign({}, e);
      return (
        Z(e) &&
          Z(t) &&
          Object.keys(t).forEach((r) => {
            Z(t[r])
              ? r in e
                ? (n[r] = X(e[r], t[r]))
                : Object.assign(n, { [r]: t[r] })
              : Object.assign(n, { [r]: t[r] });
          }),
        n
      );
    }
    let ee, te, re, ne, oe, ie;
    !(function (e) {
      (e.RECOMMENDATION = 'recommendation'),
        (e.PREVIEW_SEARCH = 'preview_search'),
        (e.SEARCH_RESULTS = 'content_grid'),
        (e.CONTENT_BLOCK = 'content_block'),
        (e.HTML_BLOCK = 'html_block'),
        (e.BANNER = 'banner'),
        (e.SEO = 'seo'),
        (e.DISCOVER = 'discover');
    })(ee || (ee = {})),
      (function (e) {
        (e.DESKTOP = 'pc'), (e.MOBILE = 'mobile'), (e.TABLET = 'tablet');
      })(te || (te = {})),
      (function (e) {
        (e.JS = 'js'), (e.HTML = 'html'), (e.CSS = 'css');
      })(re || (re = {})),
      (function (e) {
        (e.BROWSER = 'browser'), (e.WEBVIEW = 'webview'), (e.NATIVE = 'native');
      })(ne || (ne = {})),
      (function (e) {
        (e.PAGE = 'page'), (e.COMMON_ACROSS_PAGES = 'common_across_pages');
      })(oe || (oe = {})),
      (function (e) {
        (e.ASC = 'asc'), (e.DESC = 'desc');
      })(ie || (ie = {}));
    const se = [te.DESKTOP, te.MOBILE, te.TABLET],
      ae = [re.HTML, re.CSS, re.JS],
      ce = (e, t, r) => {
        if (!t) return r;
        if ('string' == typeof t) return e[t];
        const [n, ...o] = t;
        return (n in e && (o.length ? ce(e[n], o, r) : e[n])) || r;
      },
      le = (e, t) => (e && e[t] ? (delete e[t], e) : e),
      ue = (e, t, r) => {
        if (!t) return;
        if ('string' == typeof t) return void 0 === r ? le(e, t) : Object.assign(e, { [t]: r });
        const [n, ...o] = t;
        if (void 0 === n) return r;
        const i = e || (Number.isInteger(n) ? [] : {}),
          s = ue(i[n], o, r);
        return void 0 === s ? le(e, n) : Object.assign(i, { [n]: s });
      };
    function de(e, t) {
      const r = {},
        n = Object.keys(e);
      for (let o = 0; o < n.length; o++) {
        const i = n[o];
        -1 === t.indexOf(i) && (r[i] = e[i]);
      }
      return r;
    }
    const pe = (e) => {
        const t = e.split('_');
        return `${t[0]}${t
          .slice(1)
          .map((e) => e[0].toUpperCase() + e.slice(1))
          .join('')}`;
      },
      he = function (e, t) {
        let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '';
        const n = pe(t);
        return `${e}${n[0].toUpperCase() + n.slice(1)}${r}`;
      };
    var _e = r(718);
    function fe(e, t, r) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    class ge {
      constructor() {
        fe(this, 'listeners', []), fe(this, 'data', {});
      }
      set(e, t, r) {
        if (e in this.props) {
          const o = this.getPropExportKey(e, r);
          if (this.get(e, void 0) !== t) {
            const r = this.props[e];
            var n;
            void 0 === t
              ? this.removeKey(
                  null === (n = r.parent) || void 0 === n ? void 0 : n.key,
                  r.keyPath[0]
                )
              : ue(this.data, o, t),
              this.onChange(e, t);
          }
        }
        return this;
      }
      get(e, t, r) {
        return e in this.props ? ce(this.data, this.getPropExportKey(e, r), t) : t;
      }
      resetValue(e, t) {
        if (e in this.props) {
          const r = this.props[e],
            n = r.initialValue ? r.initialValue() : void 0;
          return void 0 === n && t && r.parent && 'map' === r.parent.type
            ? this.removeKey(r.parent.key, t)
            : this.set(e, n, t);
        }
        return this;
      }
      getMapExportKey(e, t) {
        return e.map((e) => ('#KEY#' === e ? t : e));
      }
      getPropExportKey(e, t) {
        if (e in this.props) {
          const r = this.props[e].exportKey;
          return t ? this.getMapExportKey(r, t) : r;
        }
        return [];
      }
      getValue(e, t, r) {
        return e in this.props ? this.get(e, t, r) : t;
      }
      setValue(e, t, r) {
        return e in this.props
          ? 'array' === this.props[e].type && 0 === t.length
            ? this.resetValue(e, r)
            : this.set(e, t, r)
          : this;
      }
      removeKey(e, t) {
        if (!e) return (this.data = de(this.data, [t])), this;
        let r = de(this.getValue(e, {}), [t]);
        return 0 === Object.keys(r).length && (r = void 0), this.setValue(e, r);
      }
      updateValue(e, t, r) {
        return this.setValue(e, X(this.getValue(e, {}, r), t), r);
      }
      addValue(e, t, r) {
        return e in this.props && 'array' === this.props[e].type
          ? this.setValue(e, this.getValue(e, [], r).concat(t), r)
          : this;
      }
      removeValue(e, t) {
        let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : (e) => e !== t,
          n = arguments.length > 3 ? arguments[3] : void 0;
        return (
          e in this.props &&
            'array' === this.props[e].type &&
            this.setValue(
              e,
              this.getValue(e, [], n).filter((e) => r(e, t)),
              n
            ),
          this
        );
      }
      transformJson(e) {
        return e;
      }
      toJson() {
        if (0 === Object.keys(this.data).length) return this.transformJson(void 0);
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        return 0 === t.length
          ? this.transformJson(this.data)
          : this.transformJson(
              ((n = this.data),
              t.reduce((e, t) => (Object.hasOwnProperty.call(n, t) ? ue(e, [t], ce(n, t)) : e), {}))
            );
        var n;
      }
      onChange(e, t) {
        this.listeners.forEach((r) => {
          r.onChange(this, e, t);
        });
      }
      addListeners(e) {
        e.forEach((e) => this.addListener(e));
      }
      addListener(e) {
        this.listeners.find((t) => t === e) || this.listeners.push(e);
      }
    }
    const ye = function (e, t, r) {
        let { parentType: n } = t,
          o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
        if ('map' === n) {
          if (e.length < r - o + 1) throw new Error('Invalid number of arguments');
          if ('string' != typeof e[0]) throw new Error(`Invalid map key argument: ${e[0]}`);
          const t = e.slice(1);
          return [
            ...Array(r)
              .fill(void 0)
              .map((e, r) => t[r]),
            e[0],
          ];
        }
        return e;
      },
      me = (e, t, r, n, o) => {
        const i = {};
        return (
          Object.keys(t).forEach((s) => {
            const {
                key: a,
                methodKey: c,
                config: l,
                config: {
                  accessProp: u,
                  exportKey: d,
                  setter: p,
                  getter: h,
                  type: _,
                  model: f,
                  initialValue: g,
                },
              } = ((e, t, r) => {
                var n;
                const { exportKey: o = [e], getter: i, setter: s, name: a } = r,
                  c = 'map' === (null == t ? void 0 : t.type),
                  l = t ? `${t.key}.${a || e}` : a || e,
                  u = t ? `${t.accessProp}.${e}` : e,
                  d = [...(c ? ['#KEY#'] : []), ...o],
                  p =
                    (null == t || null === (n = t.exportKey) || void 0 === n
                      ? void 0
                      : n.concat(...d)) || d,
                  h = l.replace(/\./g, '_'),
                  _ = i || he('get', h),
                  f = s || he('set', h);
                return {
                  config: {
                    ...r,
                    key: l,
                    accessProp: u,
                    exportKey: p,
                    keyPath: d,
                    getter: _,
                    setter: f,
                    parent: t,
                  },
                  key: l,
                  methodKey: h,
                };
              })(s, e, t[s]),
              y = { type: _, ...o };
            i[a] = l;
            const m = g ? g() : void 0;
            if (
              (void 0 === m || a.includes('#KEY#') || ue(r, d, m),
              n.push({
                typeOptions: y,
                prop: u,
                key: h,
                value: function () {
                  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
                    t[r] = arguments[r];
                  return this.getValue(a, ...ye(t, y, 1, 1));
                },
              }),
              n.push({
                typeOptions: y,
                prop: u,
                key: p,
                value: function () {
                  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
                    t[r] = arguments[r];
                  return this.setValue(a, ...ye(t, y, 1));
                },
              }),
              n.push({
                typeOptions: y,
                prop: u,
                key: he('reset', c),
                value: function () {
                  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
                    t[r] = arguments[r];
                  return this.resetValue(a, ...ye(t, y, 0));
                },
              }),
              'array' === _)
            ) {
              const e = c.replace(/s$/, '').replace(/ie$/, 'y');
              n.push({
                typeOptions: y,
                prop: u,
                key: he('add', e),
                value: function () {
                  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
                    t[r] = arguments[r];
                  return this.addValue(a, ...ye(t, y, 1));
                },
              }),
                n.push({
                  typeOptions: y,
                  prop: u,
                  key: he('remove', e),
                  value: function () {
                    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
                      t[r] = arguments[r];
                    return this.removeValue(a, ...ye(t, y, 2, 1));
                  },
                });
            } else
              'model' === _ && f
                ? (Object.assign(i, me(l, f.properties, r, n, o)),
                  n.push({
                    typeOptions: y,
                    prop: u,
                    key: he('update', c),
                    value: function () {
                      for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
                        t[r] = arguments[r];
                      return this.updateValue(a, ...ye(t, y, 1));
                    },
                  }))
                : 'map' === _ &&
                  f &&
                  Object.assign(i, me(l, f.properties, r, n, { parentType: _, ...o }));
          }),
          i
        );
      },
      ve = (e) => {
        const { name: t, properties: r = {} } = e,
          n = {},
          o = [],
          i = me(null, r, n, o);
        (0, _e.inherits)(a, ge);
        const s = (0, _e.createSuper)(a);
        function a() {
          for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
          const o = s.call.apply(s, [this].concat(t));
          return (
            (0, _e.defineProperty)(o, 'listeners', []),
            (0, _e.defineProperty)(o, 'props', i),
            (0, _e.defineProperty)(o, 'data', JSON.parse(JSON.stringify(n))),
            o
          );
        }
        return (0, _e.createClass)(a, o), Object.defineProperty(a, 'name', { value: t }), a;
      },
      Ce = {
        stagingApiDomain: 'https://api-staging.rfksrv.com',
        uatApiDomain: 'https://api-uat.rfksrv.com',
        prodApiDomain: 'https://api.rfksrv.com',
        apiKey: '',
        customerKey: '',
        tokenPath: '/account/1/access-token',
        legacySearchPath: '/search-rec/{{key}}/3',
        legacyEventPath: '/event/{{key}}/1',
        env: 'prod',
        serviceHost: '',
        searchPath: '/api/search-rec/3',
        eventPath: '/api/event/1',
        useToken: !1,
        userId: null,
        debug: !1,
      },
      ke = (e, t) => {
        Ce.hasOwnProperty(e)
          ? (Ce[e] = t)
          : console.warn(`${e} is not a valid configuration property.`);
      },
      Ee = (e) => Ce[e] || null,
      be = () =>
        Ce.useToken
          ? {
              apiDomain: Ce[`${Ce.env}ApiDomain`],
              searchPath: Ce.legacySearchPath.replace('{{key}}', Ce.customerKey),
              eventPath: Ce.legacyEventPath.replace('{{key}}', Ce.customerKey),
              useToken: Ce.useToken,
              tokenPath: Ce.tokenPath,
              apiKey: Ce.apiKey,
              customerKey: Ce.customerKey,
              debug: Ce.debug,
            }
          : {
              apiDomain: Ce.serviceHost,
              searchPath: Ce.searchPath,
              useToken: Ce.useToken,
              customerKey: Ce.customerKey,
              eventPath: Ce.eventPath,
              debug: Ce.debug,
            },
      Se = (e) => {
        const t = new Headers();
        return (
          t.append('Content-Type', 'application/json'),
          t.append('Access-Control-Request-Headers', 'authorization,content-type'),
          t.append('Access-Control-Request-Method', 'POST'),
          t.append('x-api-key', e),
          t
        );
      },
      Ae = (e) => {
        const t = new Headers();
        return (
          t.append('Content-Type', 'application/json'),
          t.append('Access-Control-Request-Headers', 'authorization,content-type'),
          t.append('Access-Control-Request-Method', 'POST'),
          e && t.append('Authorization', `Bearer ${e}`),
          t
        );
      };
    let we = null,
      Re = null,
      Te = null;
    const Ie = async () => {
        if (we && Re && Te && new Date().getTime() - Re <= Te) return we;
        try {
          const { tokenPath: e, apiKey: t, apiDomain: r } = be(),
            n = await fetch(`${r}${e}`, {
              method: 'POST',
              body: JSON.stringify({ scope: ['search-rec', 'event'] }),
              headers: Se(t),
            }),
            o = await n.json(),
            { accessToken: i, accessTokenExpiry: s } = o;
          return (Re = new Date().getTime()), (we = i), (Te = s), we;
        } catch (e) {
          return null;
        }
      },
      Oe = window,
      Pe = class {
        constructor(e) {
          (this.name = e),
            (this.cache = {}),
            Oe.RFK_CACHE || (Oe.RFK_CACHE = {}),
            (Oe.RFK_CACHE[e] = this.cache);
        }
        hashKey(e) {
          let t,
            r,
            n,
            o = 0;
          for (t = 0, n = e.length; t < n; t++)
            (r = e.charCodeAt(t)), (o = (o << 5) - o + r), (o |= 0);
          return o;
        }
        sortObjectKeys(e) {
          return null == e
            ? ''
            : 'object' != typeof e
            ? e
            : Object.keys(e)
                .sort()
                .reduce(
                  (t, r) => (
                    Array.isArray(e[r])
                      ? (t[r] = e[r].map((e) => this.sortObjectKeys(e)))
                      : 'object' == typeof e[r]
                      ? (t[r] = this.sortObjectKeys(e[r]))
                      : (t[r] = e[r]),
                    t
                  ),
                  {}
                );
        }
        createKey(e) {
          const t = JSON.stringify(this.sortObjectKeys(e));
          return Ee('debug')
            ? (console.debug('SDK ::: cache ::: createKey', e), t)
            : String(this.hashKey(t));
        }
        has(e) {
          return e in this.cache;
        }
        get(e) {
          return this.cache[e];
        }
        set(e, t) {
          this.cache[e] = t;
        }
        all() {
          return this.cache;
        }
        clear() {
          (this.cache = {}), (window.RFK_CACHE[this.name] = this.cache);
        }
        getName() {
          return this.name;
        }
      },
      xe = new Pe('api-adapter'),
      Ne = { cache: !0 };
    class De {
      static async trackEvent(e) {
        console.debug('SDK ::: trackEvent ', e);
        const { useToken: t, apiDomain: r, eventPath: n } = be(),
          o = t ? await Ie() : null;
        try {
          const t = await fetch(`${r}${n}`, {
            method: 'POST',
            headers: Ae(o),
            body: JSON.stringify(e),
            keepalive: !0,
          });
          return await t.json();
        } catch (e) {
          return console.error(e), console.error('There was a problem on the service call'), null;
        }
      }
      static async callApiWithoutCache(e) {
        try {
          const { url: t, ...r } = e,
            n = await fetch(t, { ...r, body: JSON.stringify(r.body) });
          return await n.json();
        } catch (e) {
          return console.error(e), console.error('There was a problem on the service call'), null;
        }
      }
      static async callApiWithCache(e) {
        const t = xe.createKey(e);
        if (xe.has(t)) return xe.get(t);
        const r = await De.callApiWithoutCache(e);
        return xe.set(t, r), r;
      }
      static async callApi(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Ne;
        console.debug('SDK ::: callApi ', e);
        const { useToken: r, apiDomain: n, searchPath: o } = be(),
          i = r ? await Ie() : null,
          s = { url: `${n}${o}`, method: 'POST', headers: Ae(i), body: e };
        return t.cache ? De.callApiWithCache(s) : De.callApiWithoutCache(s);
      }
      static clearCache() {
        xe.clear(), (we = null), (Re = null), (Te = null);
      }
    }
    class Ke {
      constructor() {
        var e, t, r;
        (e = this),
          (t = 'cache'),
          (r = new Pe('data-provider')),
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r);
      }
      getCache() {
        return this.cache;
      }
      setCache(e) {
        this.cache = e;
      }
      buildCachedResponse(e) {
        return { ...this.cache.get(e), cached: !0 };
      }
      getCachedResponse(e, t) {
        const r = this.cache.createKey(e);
        return !t.force && this.cache.has(r)
          ? { cacheKey: r, response: this.buildCachedResponse(r) }
          : { cacheKey: r, response: null };
      }
      validateResponse(e, t) {
        return 'number' == typeof e.err && 200 !== e.err ? e : null;
      }
      getWidgetType(e, t, r) {
        const {
          widget: { type: n },
        } = t;
        return n;
      }
      getWidgetResponseForType(e, t, r) {
        let { batch: n, ...o } = r;
        return X(o, Xe(e).toJson());
      }
      getAllWidgetResponse(e, t, r) {
        const n = this.getWidgetType(e, t, r);
        return n ? this.getWidgetResponseForType(n, t, r) : r;
      }
      getWidgetResponse(e, t) {
        return { ...t, widget: void 0, batch: [{ widget: { rfkid: e } }] };
      }
      getWidgetResponseCacheKey(e, t) {
        const r = this.getRequestWidgetFromBatch(e, t);
        return Object.assign({}, t, this.getWidgetResponse(e, r));
      }
      getAllWidgetResponseCacheKey(e, t, r) {
        return Object.assign({}, this.getAllWidgetResponse(e, t, r), this.getWidgetResponse(e));
      }
      cacheWidgetResponse(e, t, r) {
        this.cache.set(
          this.cache.createKey(
            this.isAllWidget(e, r)
              ? this.getAllWidgetResponseCacheKey(e, t, r)
              : this.getWidgetResponseCacheKey(e, r)
          ),
          t
        );
      }
      getRequestWidgetFromBatch(e, t) {
        var r;
        return null === (r = t.batch) || void 0 === r
          ? void 0
          : r.find((t) => {
              let { widget: { rfkid: r } = {} } = t;
              return r === e;
            });
      }
      isAllWidget(e, t) {
        return !this.getRequestWidgetFromBatch(e, t);
      }
      cacheResponse(e, t, r) {
        this.cache.set(e, t);
        const { batch: n = [], widget: o } = t;
        n.length > 0
          ? n.forEach((e) => {
              const {
                widget: { rfkid: t },
              } = e;
              this.cacheWidgetResponse(t, e, r);
            })
          : o && this.cacheWidgetResponse(o.rfkid, t, r);
      }
      processResponse(e, t, r) {
        return this.cacheResponse(e, t, r), this.cache.get(e);
      }
    }
    let We = new Ke();
    const Ve = {
        get: async function (e) {
          let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          const { cacheKey: r, response: n } = We.getCachedResponse(e, t);
          if (n) return Promise.resolve(n);
          try {
            const t = await De.callApi({ data: e }, { cache: !1 }),
              n = We.validateResponse(t, e);
            return n ? Promise.reject(n) : Promise.resolve(We.processResponse(r, t, e));
          } catch (e) {
            return Promise.reject(e);
          }
        },
        setProcessor: (e) => {
          We = e;
        },
        getProcessor: () => We,
      },
      He = {
        name: 'Appearance',
        properties: {
          templates: {
            type: 'model',
            model: {
              name: 'Templates',
              properties: {
                sections: { type: 'array' },
                devices: { type: 'array' },
                keep_variables: {},
                keep_original_css: {},
              },
            },
          },
          variables: {
            type: 'model',
            model: {
              name: 'Variables',
              properties: { sections: { type: 'array' } },
            },
          },
        },
      },
      Ue = {
        name: 'Content',
        properties: { product: {}, article: {}, store: {} },
      },
      Le = {
        name: 'ContextValues',
        properties: {
          geo: {
            type: 'model',
            model: {
              name: 'ContextValuesGeo',
              properties: {
                value: {
                  type: 'array',
                  exportKey: ['field', 'value'],
                  name: 'items',
                },
              },
            },
          },
          user: {
            type: 'model',
            model: {
              name: 'ContextValuesUser',
              properties: {
                value: {
                  type: 'array',
                  exportKey: ['field', 'value'],
                  name: 'items',
                },
              },
            },
          },
          browser: {
            type: 'model',
            model: {
              name: 'ContextValuesBrowser',
              properties: {
                value: {
                  type: 'array',
                  exportKey: ['field', 'value'],
                  name: 'items',
                },
              },
            },
          },
          page: {
            type: 'model',
            model: {
              name: 'ContextValuesPage',
              properties: {
                value: {
                  type: 'array',
                  exportKey: ['field', 'value'],
                  name: 'items',
                },
              },
            },
          },
          campaign: {
            type: 'model',
            model: {
              name: 'ContextValuesCampaign',
              properties: {
                value: {
                  type: 'array',
                  exportKey: ['field', 'value'],
                  name: 'items',
                },
              },
            },
          },
          product: {
            type: 'model',
            model: {
              name: 'ContextValuesProduct',
              properties: {
                value: {
                  type: 'array',
                  exportKey: ['field', 'value'],
                  name: 'items',
                },
              },
            },
          },
          category: {
            type: 'model',
            model: {
              name: 'ContextValuesCategory',
              properties: {
                value: {
                  type: 'array',
                  exportKey: ['field', 'value'],
                  name: 'items',
                },
              },
            },
          },
          hard_filter: {
            type: 'model',
            model: {
              name: 'ContextValuesHardFilter',
              properties: {
                value: {
                  type: 'array',
                  exportKey: ['field', 'value'],
                  name: 'items',
                },
              },
            },
          },
          channel: {
            type: 'model',
            model: {
              name: 'ContextValuesChannel',
              properties: {
                value: {
                  type: 'array',
                  exportKey: ['field', 'value'],
                  name: 'items',
                },
              },
            },
          },
        },
      },
      qe = {
        name: 'Features',
        properties: {
          discover: {
            type: 'model',
            model: {
              name: 'Discover',
              properties: { choice_id: { required: !0 } },
            },
          },
        },
      },
      Ge = {
        name: 'Filters',
        properties: { value: { required: !0, type: 'array', name: 'values' } },
      },
      Me = {
        name: 'SortItem',
        properties: { type: { required: !0 }, order: { required: !0 } },
      },
      je = {
        name: 'Facet',
        properties: {
          min_count: {},
          max: {},
          total: {},
          sort: {
            type: 'model',
            model: Me,
            exportKey: ['sort', 0],
            name: 'SortCriteria',
          },
        },
      },
      Fe = {
        name: 'Query',
        properties: {
          keyphrase: { exportKey: ['keyphrase', 'value', 0] },
          category: { type: 'array', name: 'categories' },
        },
      },
      Be = {
        name: 'Sort',
        properties: {
          choices: {},
          value: {
            type: 'model',
            model: Me,
            exportKey: ['value', 0],
            name: 'criteria',
          },
        },
      },
      $e = { name: 'Widget', properties: { all: {}, rfkid: {} } },
      Je = {
        name: 'Context',
        file: 'context',
        buildInterface: !0,
        properties: {
          store: {
            type: 'model',
            model: {
              name: 'ContextStore',
              file: 'store',
              properties: { id: {}, group_id: {} },
            },
          },
          user: {
            type: 'model',
            model: {
              name: 'ContextUser',
              file: 'user',
              properties: {
                groups: { type: 'array' },
                order_id: { type: 'array', name: 'orderIds' },
                gender: {},
                email: {},
                uuid: {},
                id: { exportKey: ['user_id'] },
                new_user: {},
              },
            },
          },
          page: {
            type: 'model',
            model: {
              name: 'ContextPage',
              file: 'page',
              properties: {
                skus: { type: 'array', exportKey: ['sku'] },
                product_groups: { type: 'array', exportKey: ['product_group'] },
                category_uri: {},
                uri: {},
                ccid: {},
                category_id: {},
                locale_country: {},
                locale_language: {},
                locale_currency: {},
                referrer: {},
                title: {},
                container_id: {},
                all_category_ids: { type: 'array' },
              },
            },
          },
          campaign: {
            type: 'model',
            model: {
              name: 'ContextCampaign',
              file: 'campaign',
              properties: { utm_campaign: {}, utm_source: {} },
            },
          },
          geo: {
            type: 'model',
            model: {
              name: 'ContextGeo',
              file: 'geo',
              properties: { ip: {}, country: {}, state: {}, city: {}, zip: {} },
            },
          },
          fitment: {
            type: 'model',
            model: {
              name: 'ContextFitment',
              file: 'fitment',
              properties: { ids: { type: 'array' }, items: { type: 'array' } },
            },
          },
          browser: {
            type: 'model',
            model: {
              name: 'ContextBrowser',
              file: 'browser',
              properties: { user_agent: {}, device: {}, app_type: {} },
            },
          },
          channel: {
            type: 'model',
            model: {
              name: 'ContextChannel',
              file: 'channel',
              properties: { type: {} },
            },
          },
        },
      },
      Qe = ve({
        name: 'RfkRequest',
        file: 'rfkRequest',
        buildInterface: !0,
        properties: {
          number_products: { exportKey: ['n_item'] },
          page_number: {},
          appearance: { type: 'model', model: He },
          facets: {
            type: 'map',
            exportKey: ['facet'],
            model: je,
            name: 'facet',
          },
          facets_all: { exportKey: ['facet', 'all'] },
          facets_max: { exportKey: ['facet', 'max'] },
          facets_total: { exportKey: ['facet', 'total'] },
          facets_sort: {
            type: 'model',
            model: Me,
            exportKey: ['facet', 'sort', 'value', 0],
            name: 'FacetsSortCriteria',
          },
          filters: {
            type: 'map',
            model: Ge,
            exportKey: ['filter'],
            name: 'filter',
          },
          widget: { type: 'model', model: $e },
          batch: {
            type: 'array',
            model: {
              name: 'BatchItem',
              properties: {
                appearance: { type: 'model', model: He },
                facets: {
                  type: 'map',
                  exportKey: ['facet'],
                  model: je,
                  name: 'facet',
                },
                facets_all: { exportKey: ['facet', 'all'] },
                facets_max: { exportKey: ['facet', 'max'] },
                facets_total: { exportKey: ['facet', 'total'] },
                facets_sort: {
                  type: 'model',
                  model: Me,
                  exportKey: ['facet', 'sort', 'value', 0],
                  name: 'FacetsSortCriteria',
                },
                filter: { type: 'model', model: Ge },
                widget: { type: 'model', model: $e, required: !0 },
                features: { type: 'model', model: qe },
                content: { type: 'model', model: Ue },
                sort: { type: 'model', model: Be },
                query: { type: 'model', model: Fe },
                context_values: { type: 'model', model: Le },
              },
            },
            name: 'batchItems',
          },
          features: { type: 'model', model: qe },
          context: { type: 'model', model: Je },
          content: { type: 'model', model: Ue },
          sort: { type: 'model', model: Be },
          query: { type: 'model', model: Fe },
          suggestion: {
            type: 'model',
            model: {
              name: 'Suggestion',
              properties: {
                keyphrase: { exportKey: ['keyphrase', 'max'] },
                category: { exportKey: ['category', 'max'] },
                recent: { exportKey: ['recent', 'max'] },
                trending_category: { exportKey: ['trending_category', 'max'] },
              },
            },
          },
          context_values: { type: 'model', model: Le },
        },
      });
    class Ye extends Qe {
      constructor() {
        var e;
        super(...arguments),
          (e = 'rfkId') in this
            ? Object.defineProperty(this, e, {
                value: '',
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (this[e] = '');
      }
      getRfkId() {
        return this.rfkId;
      }
      setRfkId(e) {
        return (this.rfkId = e), this.addBatchItem({ widget: { rfkid: e } }), this;
      }
      fetch() {
        return Ve.get(this.toJson());
      }
      getWidgetInfo(e) {
        var t;
        return null === (t = this.getBatchItems()) || void 0 === t
          ? void 0
          : t.find((t) => {
              let { widget: r } = t;
              return r.rfkid && r.rfkid === e;
            });
      }
      addWidgetBatchItem(e, t) {
        return this.addBatchItem({ ...t, widget: { rfkid: e } }), this;
      }
      addAllWidgetsBatchItem(e) {
        return this.addBatchItem({ ...e, widget: { all: !0 } }), this;
      }
      addAllAppearanceTemplatesDevices() {
        return se.forEach((e) => this.addAppearanceTemplatesDevice(e)), this;
      }
      addAllAppearanceTemplatesSections() {
        return ae.forEach((e) => this.addAppearanceTemplatesSection(e)), this;
      }
      addAllAppearanceVariablesSections() {
        return ae.forEach((e) => this.addAppearanceVariablesSection(e)), this;
      }
    }
    const ze = () => {
        const e = new Ye();
        return e.setAppearanceTemplates({}), e.setAppearanceVariables({}), e;
      },
      Ze = {
        [ee.RECOMMENDATION]: () => {
          const e = new Ye();
          return e.setContentProduct({}), e;
        },
        [ee.DISCOVER]: () => {
          const e = new Ye();
          return e.setContentProduct({}), e.setContextValuesProduct({}), e;
        },
        [ee.SEARCH_RESULTS]: () => {
          const e = new Ye();
          return (
            e.setContentProduct({}), e.setFacetsAll(!0), e.setPageNumber(1), e.setSortChoices(!0), e
          );
        },
        [ee.PREVIEW_SEARCH]: () => {
          const e = new Ye();
          return (
            e.setContentProduct({}),
            e.setSuggestionKeyphrase(3),
            e.setSuggestionCategory(3),
            e.setSuggestionTrendingCategory(3),
            e
          );
        },
        [ee.CONTENT_BLOCK]: ze,
        [ee.HTML_BLOCK]: ze,
        [ee.SEO]: ze,
        [ee.BANNER]: ze,
      },
      Xe = (e) => (Ze[e] ? Ze[e]() : new Ye()),
      et = (e, t) => {
        Ze[e] = t;
      },
      tt = class extends Ye {
        constructor(e, t) {
          super();
          const r = Xe(ee.CONTENT_BLOCK).toJson(),
            n = Xe(ee.RECOMMENDATION).toJson(),
            o = Xe(ee.DISCOVER).toJson(),
            i = Xe(ee.SEARCH_RESULTS).toJson();
          if (
            (e.forEach((e) => {
              let { rfkId: t, type: r } = e;
              const n = r ? Xe(r).toJson() : void 0;
              this.addWidgetBatchItem(t, n);
            }),
            t)
          ) {
            const e = X(n, X(o, X(i, r)));
            this.addAllWidgetsBatchItem(e);
          }
        }
      },
      rt = ve(Je);
    class nt extends rt {}
    const ot = (e) => void 0 === e,
      it = 18e5,
      st = Date.now(),
      at = window.location.hostname.split('.').reverse().splice(0, 2).reverse().join('.');
    class ct {
      constructor() {
        var e, t;
        (t = {}),
          (e = 'cachedCookies') in this
            ? Object.defineProperty(this, e, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (this[e] = t);
      }
      isBase64(e) {
        return !!e && 0 === e.indexOf('0!');
      }
      decodeCookieValue(e) {
        let t = ((e) => window.decodeURIComponent(e))(e);
        return (
          (t = this.isBase64(t)
            ? ((e, t) => {
                if ((e && 'object' == typeof e) || '{' === (e && e[0])) return e;
                const r = {},
                  n = [65, 91],
                  o = [97, 123],
                  i = [48, 58],
                  s = String.fromCharCode;
                let a,
                  c,
                  l = 0,
                  u = '';
                const d = [n, o, i, 43, 47];
                for (a in d)
                  if (d[a] && 'object' == typeof d[a])
                    for (c = d[a][0]; c < d[a][1]; c++) r[s(c)] = l++;
                  else r[s(d[a])] = l++;
                for (c = 0; c < e.length - 0; c += 72) {
                  const t = e.substring(c, c + 72);
                  let n,
                    o,
                    i,
                    a = 0,
                    l = 0;
                  for (o = 0; o < t.length; o++)
                    for (n = r[t.charAt(o)], a = (a << 6) + n, l += 6; l >= 8; )
                      (i = (a >>> (l -= 8)) % 256), i && (u += s(i));
                }
                return u;
              })(t.substr(2))
            : t),
          t
        );
      }
      getCookieValue(e, t) {
        const r = e.substr(t.length + 1, e.length);
        return r ? this.decodeCookieValue(r) : '';
      }
      getCookieFromBrowser(e) {
        const t = document.cookie.split('; ');
        for (let r = 0; r < t.length; r++)
          if (t[r].substr(0, e.length) === e) {
            const n = this.getCookieValue(t[r], e);
            return (this.cachedCookies[e] = n), n;
          }
        return '';
      }
      setCookieInBrowser(e, t, r, n) {
        const o = new Date();
        let i =
          n && t
            ? '0!' +
              ((e, t) => {
                e && 'object' == typeof e && (e = JSON.stringify(e));
                const r = [],
                  n = [];
                let o,
                  i,
                  s = 0,
                  a = 0,
                  c = t ? '' : '1,';
                const l = String.fromCharCode;
                for (
                  e = ((e, t) => {
                    e = e.replace(/\r\n/g, '\n');
                    const r = String.fromCharCode;
                    let n,
                      o,
                      i = '';
                    for (n = 0; n < e.length; n++)
                      (o = e.charCodeAt(n)),
                        (i +=
                          o < 128
                            ? r(o)
                            : o > 127 && o < 2048
                            ? r((o >> 6) | 192) + r((63 & o) | 128)
                            : r((o >> 12) | 224) + r(((o >> 6) & 63) | 128) + r((63 & o) | 128));
                    return i;
                  })(e);
                  s < e.length;

                ) {
                  for (o = 0; o < 3; o++) r[o] = e.charCodeAt(s++);
                  for (
                    n[0] = r[0] >> 2,
                      n[1] = ((3 & r[0]) << 4) | (r[1] >> 4),
                      n[2] = ((15 & r[1]) << 2) | (r[2] >> 6),
                      n[3] = 63 & r[2],
                      isNaN(r[1]) ? (n[2] = n[3] = 64) : isNaN(r[2]) && (n[3] = 64),
                      o = 0;
                    o < 4;
                    o++
                  )
                    (i = n[o]),
                      '1' === t
                        ? (c +=
                            i < 26
                              ? l(i + 65)
                              : i < 52
                              ? l(i + 71)
                              : i < 62
                              ? l(i - 4)
                              : '+/,'.charAt(i - 62))
                        : (t && i < 64 && ((i ^= t.charCodeAt(a % t.length) % 64), a++),
                          (c +=
                            i < 10
                              ? l(i + 48)
                              : i < 36
                              ? l(i + 87)
                              : i < 62
                              ? l(i + 29)
                              : '-_,'.charAt(i - 62)));
                }
                return c;
              })(t, '1').replace(/,/g, '~')
            : encodeURIComponent(t);
        o.setMilliseconds(o.getMilliseconds() + r),
          (i += `;domain=${at};path=/;`),
          (i += r ? `;expires=${o.toUTCString()}` : ''),
          (i += ';secure;SameSite=None;'),
          (document.cookie = `${e}=${i}`);
      }
      removeCookieFromBrowser(e) {
        document.cookie = `${e}=;domain=${at};path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;secure;SameSite=None`;
      }
      removeCachedCookie(e) {
        this.cachedCookies[e] && delete this.cachedCookies[e], this.removeCookieFromBrowser(e);
      }
      set(e, t, r, n) {
        if (t) {
          const o = 'object' == typeof t ? JSON.stringify(t) : t;
          (this.cachedCookies[e] = o), this.setCookieInBrowser(e, o, r, n);
        } else this.removeCachedCookie(e);
      }
      get(e) {
        if (this.cachedCookies[e]) return this.cachedCookies[e];
        const t = this.getCookieFromBrowser(e);
        return (this.cachedCookies[e] = t), t;
      }
      remove(e) {
        this.removeCachedCookie(e);
      }
      getCookiesFromBrowser() {
        const e = document.cookie.split(';');
        let t;
        const r = {};
        for (let n = 0; n < e.length; n++)
          if (
            e[n].substr(0, 4).indexOf('__r') >= 0 &&
            ((t = e[n].match(/\s*([^=]*)=(.*)/)), t && t.length > 2)
          ) {
            const e = this.decodeCookieValue(t[2]);
            (r[t[1]] = e), (this.cachedCookies[t[1]] = e);
          }
        return r;
      }
      getAllCookies() {
        return this.getCookiesFromBrowser();
      }
      clearCache() {
        this.cachedCookies = {};
      }
      clearAll() {
        const e = Object.keys(this.getAllCookies());
        this.clearCache();
        for (let t = 0; t < e.length; t++) this.removeCachedCookie(e[t]);
      }
    }
    class lt {
      clearAll() {
        Object.keys(localStorage)
          .filter((e) => '__r' === e.substring(0, 3))
          .forEach((e) => {
            localStorage.removeItem(e);
          });
      }
      set(e, t, r) {
        const n = { v: t, tm: new Date().getTime() || 0, tx: r };
        void 0 !== t ? localStorage.setItem(e, JSON.stringify(n)) : localStorage.removeItem(e);
      }
      get(e) {
        const t = new Date().getTime() || 0;
        let r = JSON.parse(localStorage.getItem(e));
        return r.tx && t - r.tm > r.tx && (localStorage.removeItem(e), (r = void 0)), r && r.v;
      }
      remove(e) {
        localStorage.removeItem(e);
      }
    }
    let ut;
    const dt = class {
        static init(e) {
          ut = e && window.localStorage ? new lt() : new ct();
        }
        static set(e, t) {
          let r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            n = arguments.length > 3 ? arguments[3] : void 0;
          ut.set(e, t, n || 3e5, r);
        }
        static get(e) {
          let t = ut.get(e);
          const r = t
            ? ((e) => {
                try {
                  return JSON.parse(e);
                } catch (t) {
                  return e;
                }
              })(t)
            : {};
          return 'undefined' === t && (t = void 0), t && r ? r : t;
        }
        static remove(e) {
          ut.remove(e);
        }
      },
      pt = {},
      ht = () => {
        const e = String(Ee('customerKey')).split('-');
        return (2 === e.length && e[1]) || '';
      },
      _t = () => {
        let e = 0,
          t = dt.get('__rutma');
        return (
          dt.get('__rutmb') || (dt.set('__rutmb', ht(), !1, it), (e = 1)),
          (t = t
            ? ((e, t) => {
                const r = e.split('.');
                return (
                  r.length > 3 &&
                    (t && ((r[1] = r[2]), (r[2] = st), (r[3] = 1 * r[3] + 1)),
                    4 === r.length && (r[4] = 1),
                    5 === r.length && (r[5] = 1),
                    (r[4] = 1 * r[4] + 1),
                    (r[5] = 1 + (t ? 0 : 1 * r[5])),
                    (e = r.join('.'))),
                  e
                );
              })(t, e)
            : `${(() => {
                let e = dt.get('__ruid');
                if (e) return e;
                e = ('xx-xx-4x-1' + 'pc'[0] + '-').replace(/[x]/g, () => {
                  return (
                    (e = (36 * Math.random()) | 0),
                    String.fromCharCode(e < 10 ? e + 48 : e < 36 ? e + 87 : e + 29)
                  );
                  var e;
                });
                for (let t = 0; t < 5; t++)
                  e += ('0000' + ((1679615 * Math.random()) | 0).toString(36)).slice(-4);
                const t = ht() + '-' + e + '-' + st;
                return dt.set('__ruid', t, !1), t;
              })()}.${st}.${st}.1.1.1`),
          dt.set('__rutma', t, !1, it),
          t
        );
      },
      ft = () => {
        const e = Ee('userId');
        if (e) return { user_id: e };
        const { uid: t } = (() => {
          const { customerKey: e } = be();
          (pt.domainHashCkey = e.match(/(.*)-(\d*)/)[2]),
            (pt.domainHash = pt.domainHashCkey),
            (pt.domainRoot = at);
          const t = _t(),
            r = t.split('.');
          var n;
          return (
            (pt.uid = r[0]),
            (pt.usetLastDigit =
              ((n = r[0]),
              (Array.isArray(n) || 'string' == typeof n) && n.length ? n[n.length - 1] : void 0)),
            (pt.previousSessionStartTime = parseInt(r[1])),
            (pt.currentSessionStartTime = parseInt(r[2])),
            (pt.visitCount = parseInt(r[3])),
            (pt.pageViewCount = parseInt(r[4])),
            (pt.visitPageCount = parseInt(r[5])),
            (pt.utma = t),
            pt
          );
        })();
        return { uuid: t };
      },
      gt = async (e) => {
        if (e.data) return (e.data = { ...e.data, ...ft(), t: Date.now() }), await De.trackEvent(e);
        throw new Error('eventUtils.track: params.data is not defined.');
      },
      yt = (e) =>
        !e.find((e) => {
          let { sku: t, quantity: r, price: n } = e;
          return ot(t) || ot(r) || ot(n);
        }),
      mt = (e) => {
        let { email: t, id: r } = e;
        return !ot(t) && !ot(r);
      },
      vt = async (e, t, r) => {
        if (yt(e)) {
          const n = {
            data: {
              type: 'a2c',
              name: t,
              value: {
                products: e.map((e) => {
                  let { sku: t, quantity: r, price: n, priceOriginal: o } = e;
                  return { sku: t, quantity: r, price: n, price_original: o };
                }),
                ...(r ? { context: r } : []),
              },
            },
          };
          return gt(n);
        }
        return Promise.reject(
          new Error('A field is missing on one or more of the products provided.')
        );
      },
      Ct = async (e, t) => {
        if (yt(e)) {
          const r = {
            data: {
              type: 'status',
              name: 'cart',
              value: {
                products: e.map((e) => {
                  let { sku: t, quantity: r, price: n, priceOriginal: o } = e;
                  return { sku: t, quantity: r, price: n, price_original: o };
                }),
                ...(t ? { context: t } : []),
              },
            },
          };
          return gt(r);
        }
        return Promise.reject(
          new Error('A field is missing on one or more of the products provided.')
        );
      },
      kt = async (e, t) => {
        if (mt(e)) {
          const r = {
            data: {
              type: 'user',
              name: 'login',
              value: {
                user: { id: e.id, email: e.email, eid: e.emailId },
                ...(t ? { context: t } : []),
              },
            },
          };
          return gt(r);
        }
        return Promise.reject(new Error('User information is not correct'));
      },
      Et = async function (e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
          r = arguments.length > 2 ? arguments[2] : void 0;
        if (e) {
          const n = {
            data: {
              type: 'view',
              name: 'pdp',
              value: {
                products: [{ sku: e, ...(t ? { fitment: t } : []) }],
                ...(r ? { context: r } : []),
              },
            },
          };
          return gt(n);
        }
        return Promise.reject(new Error('sku not provided.'));
      },
      bt = async (e, t, r, n) => {
        if (!yt(e))
          return Promise.reject(
            new Error('A field is missing on one or more of the products provided, event not sent.')
          );
        if (!mt(t))
          return Promise.reject(new Error('User information is not correct, event not sent'));
        if (
          !((e) => {
            let { orderId: t, total: r, subtotal: n } = e;
            return !ot(t) && !ot(r) && !ot(n);
          })(r)
        )
          return Promise.reject(new Error('Checkout information is not correct, event not sent.'));
        const o = {
          data: {
            type: 'order',
            name: 'confirm',
            value: {
              products: e.map((e) => {
                let { sku: t, quantity: r, price: n, priceOriginal: o } = e;
                return { sku: t, quantity: r, price: n, price_original: o };
              }),
              user: { id: t.id, email: t.email, eid: t.emailId },
              checkout: {
                order_id: r.orderId,
                total: r.total,
                subtotal: r.subtotal,
              },
              ...(n ? { context: n } : []),
            },
          },
        };
        return gt(o);
      },
      St = async (e) => {
        const t = {
          data: {
            type: 'view',
            name: 'page',
            value: { ...(e ? { context: e } : []) },
          },
        };
        return gt(t);
      },
      At = [];
    class wt {
      static subscribe(e) {
        At.push(e);
      }
      static async dispatch(e, t) {
        console.debug('SDK ::: dispatcher ::: dispatch', `[${e}]`, t),
          At.forEach((r) => {
            r.handleAction(e, { ...t });
          });
      }
    }
    const Rt = {
        async getData(e, t) {
          const r = e.getRfkId(),
            n = Ot.getContext(),
            o = X({ context: n.toJson() }, e.toJson());
          wt.dispatch(z.REQUEST, {
            rfkId: r,
            request: e,
            pageContext: n,
            requestPayload: o,
          });
          try {
            const i = await Ve.get(o, t);
            return (
              wt.dispatch(z.REQUEST_SUCCESS, {
                rfkId: r,
                request: e,
                pageContext: n,
                response: i,
                requestPayload: o,
              }),
              i
            );
          } catch (t) {
            return (
              wt.dispatch(z.REQUEST_FAIL, {
                error: t,
                rfkId: r,
                request: e,
                pageContext: n,
                requestPayload: o,
              }),
              Promise.reject(t)
            );
          }
        },
      },
      Tt = {
        widgetTypesConfigMapping: {},
        widgetsConfigMapping: {},
        setWidgetType(e, t) {
          X(this.widgetTypesConfigMapping, { [e]: t }, { mutate: !0 });
        },
        getType(e) {
          const { type: t } = this.widgetsConfigMapping[e] || {};
          return t;
        },
        set(e, t) {
          X(this.widgetsConfigMapping, { [e]: t }, { mutate: !0 });
        },
        get(e) {
          const t = this.widgetsConfigMapping[e];
          if (!t) return;
          const { component: r, controller: n, options: o } = this.getForType(e) || {},
            { component: i = r, controller: s = n, options: a } = t;
          return {
            ...t,
            component: i,
            controller: s,
            options: a ? X(o || {}, a) : o,
          };
        },
        getWidgetIds() {
          return Object.keys(this.widgetsConfigMapping);
        },
        getGlobalWidgetIds() {
          return this.getWidgetIds().filter((e) => this.widgetsConfigMapping[e].global);
        },
        getForType(e) {
          const t = this.getType(e);
          return t ? this.widgetTypesConfigMapping[t] : void 0;
        },
        getOrCreate(e) {
          return (
            this.widgetsConfigMapping[e] || (this.widgetsConfigMapping[e] = {}),
            this.widgetsConfigMapping[e]
          );
        },
        getMetadata(e) {
          const { metadata: t } = this.get(e) || {};
          return t;
        },
        setMetadata(e, t) {
          Object.assign(this.getOrCreate(e), { metadata: t }), this.setType(e, t.type);
        },
        updateMetadata(e, t) {
          X(this.getOrCreate(e), { metadata: t }, { mutate: !0 }), this.setType(e, t.type);
        },
        setType(e, t) {
          this.getType(e) || Object.assign(this.getOrCreate(e), { type: t });
        },
        update(e, t) {
          X(this.getOrCreate(e), t, { mutate: !0 });
        },
        getController(e) {
          const { controller: t } = this.get(e) || {};
          return t;
        },
      };
    function It(e, t, r) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    const Ot = new (class {
      constructor() {
        It(this, 'initialized', !1),
          It(this, 'addedWidgets', []),
          this.setContext(new nt()),
          wt.subscribe(this),
          (this.onChange = (function (e, t, r) {
            let n;
            return function () {
              const t = this;
              for (var o = arguments.length, i = new Array(o), s = 0; s < o; s++)
                i[s] = arguments[s];
              const a = i,
                c = function () {
                  (n = null), e.apply(t, a);
                },
                l = r;
              clearTimeout(n), (n = setTimeout(c, 50)), l && e.apply(t, a);
            };
          })(this.onChange.bind(this))),
          (this.addWidgets = (function (e, t) {
            let r,
              n = [];
            return function () {
              const t = this;
              for (var o = arguments.length, i = new Array(o), s = 0; s < o; s++)
                i[s] = arguments[s];
              n.push(i);
              const a = function () {
                (r = null), e.call(t, n), (n = []);
              };
              clearTimeout(r), (r = setTimeout(a, 100));
            };
          })(this.addWidgetsAggregated.bind(this)));
      }
      getContext() {
        return this.context;
      }
      setContext(e) {
        (this.context = e), this.context.addListener(this);
      }
      register(e) {
        wt.subscribe(e);
      }
      getDispatcher() {
        return wt;
      }
      processResponse(e, t) {
        const { batch: r = [], widget: n } = t,
          o = [],
          i = [],
          s = n ? [{ widget: n }] : r;
        if (s.length > 0) {
          const t = (e.getBatchItems() || [])
            .map((e) => {
              let { widget: { rfkid: t } = {} } = e;
              return t;
            })
            .filter((e) => !!e);
          s.filter((e) => {
            let { widget: t } = e;
            return !!t;
          }).forEach((e) => {
            let {
              widget: { rfkid: r, used_in: n },
            } = e;
            (null != t && t.includes(r)) || n !== oe.PAGE ? i.push(r) : o.push(r);
          });
        }
        return (
          this.addedWidgets.push(...o, ...i),
          o.length > 0 &&
            wt.dispatch(z.PAGE_CONTAINER_READY, {
              widgets: o,
              options: this.initOptions,
            }),
          i
            .filter((e) => !this.canPreRender(e))
            .forEach((e) => {
              wt.dispatch(z.WIDGET_READY, {
                rfkId: e,
                options: this.initOptions,
              });
            }),
          { widgets: { inPage: o, common: i } }
        );
      }
      canPreRender(e) {
        const { type: t, options: { preRender: r = !1 } = {} } = Tt.get(e) || {};
        return !!t && r;
      }
      setupWidgets(e) {
        Tt.getWidgetIds().forEach((t) => {
          this.canPreRender(t) && wt.dispatch(z.WIDGET_READY, { rfkId: t, options: e });
        });
      }
      async initialize(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        (this.initOptions = t), this.setupWidgets(t);
        const r = new tt(
            Tt.getGlobalWidgetIds().map((e) => ({
              rfkId: e,
              type: Tt.getType(e),
            })),
            !t.pageContainerDisabled && e
          ),
          n = await Rt.getData(r);
        this.processResponse(r, n), (this.initialized = !0), wt.dispatch(z.INITIALIZED, {});
      }
      addWidgetsList(e) {
        const t = e.filter((e) => !this.addedWidgets.includes(e));
        if (t.length > 0) {
          wt.dispatch(z.ADD_WIDGETS, { widgets: t });
          const e = new tt(
            t.map((e) => ({ rfkId: e, type: Tt.getType(e) })),
            !1
          );
          Rt.getData(e).then((t) => this.processResponse(e, t));
        }
      }
      addWidget(e) {
        this.addWidgets([e]);
      }
      addWidgetsAggregated() {
        const e = [];
        (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(function () {
          let [t] = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          t.length > 0 && e.push(...t);
        }),
          this.addWidgetsList(e);
      }
      handleAction(e, t) {
        switch (e) {
          case z.INITIALIZE: {
            const { isContainer: e, options: r } = t;
            this.initialize(e, r);
            break;
          }
          case z.ADD_TO_CART: {
            const { sku: e, quantity: r, price: n, priceOriginal: o, page: i = 'unknown' } = t;
            vt(
              [{ sku: e, quantity: r, price: n, priceOriginal: o }],
              i,
              this.getContext().toJson()
            );
            break;
          }
          case z.ADD_TO_WISHLIST: {
            const { sku: e, quantity: r, price: n, priceOriginal: o, page: i = 'unknown' } = t;
            vt(
              [{ sku: e, quantity: r, price: n, priceOriginal: o }],
              i,
              this.getContext().toJson()
            );
            break;
          }
          case z.USER_LOGIN: {
            const { id: e, email: r } = t;
            kt({ id: e, email: r }, this.getContext().toJson());
            break;
          }
          case z.CART_STATUS: {
            const { products: e } = t;
            Ct(e, this.getContext().toJson());
            break;
          }
          case z.ORDER_CONFIRM: {
            const { products: e, user: r, orderId: n, subtotal: o, total: i } = t;
            bt(e, r, { orderId: n, subtotal: o, total: i }, this.getContext().toJson());
            break;
          }
        }
      }
      onChange(e, t, r) {
        this.initialized && wt.dispatch(z.PAGE_CONTEXT_CHANGED, { context: this.context });
      }
    })();
    var Pt,
      xt,
      Nt,
      Dt = 0,
      Kt = [],
      Wt = p.__b,
      Vt = p.__r,
      Ht = p.diffed,
      Ut = p.__c,
      Lt = p.unmount;
    function qt(e, t) {
      p.__h && p.__h(xt, e, Dt || t), (Dt = 0);
      var r = xt.__H || (xt.__H = { __: [], __h: [] });
      return e >= r.__.length && r.__.push({}), r.__[e];
    }
    function Gt(e) {
      return (Dt = 1), Mt(nr, e);
    }
    function Mt(e, t, r) {
      var n = qt(Pt++, 2);
      return (
        (n.t = e),
        n.__c ||
          ((n.__ = [
            r ? r(t) : nr(void 0, t),
            function (e) {
              var t = n.t(n.__[0], e);
              n.__[0] !== t && ((n.__ = [t, n.__[1]]), n.__c.setState({}));
            },
          ]),
          (n.__c = xt)),
        n.__
      );
    }
    function jt(e, t) {
      var r = qt(Pt++, 3);
      !p.__s && rr(r.__H, t) && ((r.__ = e), (r.__H = t), xt.__H.__h.push(r));
    }
    function Ft(e, t) {
      var r = qt(Pt++, 4);
      !p.__s && rr(r.__H, t) && ((r.__ = e), (r.__H = t), xt.__h.push(r));
    }
    function Bt(e) {
      return (
        (Dt = 5),
        Jt(function () {
          return { current: e };
        }, [])
      );
    }
    function $t(e, t, r) {
      (Dt = 6),
        Ft(
          function () {
            'function' == typeof e ? e(t()) : e && (e.current = t());
          },
          null == r ? r : r.concat(e)
        );
    }
    function Jt(e, t) {
      var r = qt(Pt++, 7);
      return rr(r.__H, t) && ((r.__ = e()), (r.__H = t), (r.__h = e)), r.__;
    }
    function Qt(e, t) {
      return (
        (Dt = 8),
        Jt(function () {
          return e;
        }, t)
      );
    }
    function Yt(e) {
      var t = xt.context[e.__c],
        r = qt(Pt++, 9);
      return (r.c = e), t ? (null == r.__ && ((r.__ = !0), t.sub(xt)), t.props.value) : e.__;
    }
    function zt(e, t) {
      p.useDebugValue && p.useDebugValue(t ? t(e) : e);
    }
    function Zt() {
      Kt.forEach(function (e) {
        if (e.__P)
          try {
            e.__H.__h.forEach(er), e.__H.__h.forEach(tr), (e.__H.__h = []);
          } catch (t) {
            (e.__H.__h = []), p.__e(t, e.__v);
          }
      }),
        (Kt = []);
    }
    (p.__b = function (e) {
      (xt = null), Wt && Wt(e);
    }),
      (p.__r = function (e) {
        Vt && Vt(e), (Pt = 0);
        var t = (xt = e.__c).__H;
        t && (t.__h.forEach(er), t.__h.forEach(tr), (t.__h = []));
      }),
      (p.diffed = function (e) {
        Ht && Ht(e);
        var t = e.__c;
        t &&
          t.__H &&
          t.__H.__h.length &&
          ((1 !== Kt.push(t) && Nt === p.requestAnimationFrame) ||
            (
              (Nt = p.requestAnimationFrame) ||
              function (e) {
                var t,
                  r = function () {
                    clearTimeout(n), Xt && cancelAnimationFrame(t), setTimeout(e);
                  },
                  n = setTimeout(r, 100);
                Xt && (t = requestAnimationFrame(r));
              }
            )(Zt)),
          (xt = null);
      }),
      (p.__c = function (e, t) {
        t.some(function (e) {
          try {
            e.__h.forEach(er),
              (e.__h = e.__h.filter(function (e) {
                return !e.__ || tr(e);
              }));
          } catch (r) {
            t.some(function (e) {
              e.__h && (e.__h = []);
            }),
              (t = []),
              p.__e(r, e.__v);
          }
        }),
          Ut && Ut(e, t);
      }),
      (p.unmount = function (e) {
        Lt && Lt(e);
        var t = e.__c;
        if (t && t.__H)
          try {
            t.__H.__.forEach(er);
          } catch (e) {
            p.__e(e, t.__v);
          }
      });
    var Xt = 'function' == typeof requestAnimationFrame;
    function er(e) {
      var t = xt;
      'function' == typeof e.__c && e.__c(), (xt = t);
    }
    function tr(e) {
      var t = xt;
      (e.__c = e.__()), (xt = t);
    }
    function rr(e, t) {
      return (
        !e ||
        e.length !== t.length ||
        t.some(function (t, r) {
          return t !== e[r];
        })
      );
    }
    function nr(e, t) {
      return 'function' == typeof t ? t(e) : t;
    }
    function or(e, t) {
      for (var r in t) e[r] = t[r];
      return e;
    }
    function ir(e, t) {
      for (var r in e) if ('__source' !== r && !(r in t)) return !0;
      for (var n in t) if ('__source' !== n && e[n] !== t[n]) return !0;
      return !1;
    }
    function sr(e) {
      this.props = e;
    }
    function ar(e, t) {
      function r(e) {
        var r = this.props.ref,
          n = r == e.ref;
        return (
          !n && r && (r.call ? r(null) : (r.current = null)),
          t ? !t(this.props, e) || !n : ir(this.props, e)
        );
      }
      function n(t) {
        return (this.shouldComponentUpdate = r), b(e, t);
      }
      return (
        (n.displayName = 'Memo(' + (e.displayName || e.name) + ')'),
        (n.prototype.isReactComponent = !0),
        (n.__f = !0),
        n
      );
    }
    ((sr.prototype = new R()).isPureReactComponent = !0),
      (sr.prototype.shouldComponentUpdate = function (e, t) {
        return ir(this.props, e) || ir(this.state, t);
      });
    var cr = p.__b;
    p.__b = function (e) {
      e.type && e.type.__f && e.ref && ((e.props.ref = e.ref), (e.ref = null)), cr && cr(e);
    };
    var lr =
      ('undefined' != typeof Symbol && Symbol.for && Symbol.for('react.forward_ref')) || 3911;
    function ur(e) {
      function t(t, r) {
        var n = or({}, t);
        return (
          delete n.ref,
          e(n, (r = t.ref || r) && ('object' != typeof r || 'current' in r) ? r : null)
        );
      }
      return (
        (t.$$typeof = lr),
        (t.render = t),
        (t.prototype.isReactComponent = t.__f = !0),
        (t.displayName = 'ForwardRef(' + (e.displayName || e.name) + ')'),
        t
      );
    }
    var dr = function (e, t) {
        return null == e ? null : D(D(e).map(t));
      },
      pr = {
        map: dr,
        forEach: dr,
        count: function (e) {
          return e ? D(e).length : 0;
        },
        only: function (e) {
          var t = D(e);
          if (1 !== t.length) throw 'Children.only';
          return t[0];
        },
        toArray: D,
      },
      hr = p.__e;
    p.__e = function (e, t, r) {
      if (e.then)
        for (var n, o = t; (o = o.__); )
          if ((n = o.__c) && n.__c)
            return null == t.__e && ((t.__e = r.__e), (t.__k = r.__k)), n.__c(e, t);
      hr(e, t, r);
    };
    var _r = p.unmount;
    function fr() {
      (this.__u = 0), (this.t = null), (this.__b = null);
    }
    function gr(e) {
      var t = e.__.__c;
      return t && t.__e && t.__e(e);
    }
    function yr(e) {
      var t, r, n;
      function o(o) {
        if (
          (t ||
            (t = e()).then(
              function (e) {
                r = e.default || e;
              },
              function (e) {
                n = e;
              }
            ),
          n)
        )
          throw n;
        if (!r) throw t;
        return b(r, o);
      }
      return (o.displayName = 'Lazy'), (o.__f = !0), o;
    }
    function mr() {
      (this.u = null), (this.o = null);
    }
    (p.unmount = function (e) {
      var t = e.__c;
      t && t.__R && t.__R(), t && !0 === e.__h && (e.type = null), _r && _r(e);
    }),
      ((fr.prototype = new R()).__c = function (e, t) {
        var r = t.__c,
          n = this;
        null == n.t && (n.t = []), n.t.push(r);
        var o = gr(n.__v),
          i = !1,
          s = function () {
            i || ((i = !0), (r.__R = null), o ? o(a) : a());
          };
        r.__R = s;
        var a = function () {
            if (!--n.__u) {
              if (n.state.__e) {
                var e = n.state.__e;
                n.__v.__k[0] = (function e(t, r, n) {
                  return (
                    t &&
                      ((t.__v = null),
                      (t.__k =
                        t.__k &&
                        t.__k.map(function (t) {
                          return e(t, r, n);
                        })),
                      t.__c &&
                        t.__c.__P === r &&
                        (t.__e && n.insertBefore(t.__e, t.__d), (t.__c.__e = !0), (t.__c.__P = n))),
                    t
                  );
                })(e, e.__c.__P, e.__c.__O);
              }
              var t;
              for (n.setState({ __e: (n.__b = null) }); (t = n.t.pop()); ) t.forceUpdate();
            }
          },
          c = !0 === t.__h;
        n.__u++ || c || n.setState({ __e: (n.__b = n.__v.__k[0]) }), e.then(s, s);
      }),
      (fr.prototype.componentWillUnmount = function () {
        this.t = [];
      }),
      (fr.prototype.render = function (e, t) {
        if (this.__b) {
          if (this.__v.__k) {
            var r = document.createElement('div'),
              n = this.__v.__k[0].__c;
            this.__v.__k[0] = (function e(t, r, n) {
              return (
                t &&
                  (t.__c &&
                    t.__c.__H &&
                    (t.__c.__H.__.forEach(function (e) {
                      'function' == typeof e.__c && e.__c();
                    }),
                    (t.__c.__H = null)),
                  null != (t = or({}, t)).__c &&
                    (t.__c.__P === n && (t.__c.__P = r), (t.__c = null)),
                  (t.__k =
                    t.__k &&
                    t.__k.map(function (t) {
                      return e(t, r, n);
                    }))),
                t
              );
            })(this.__b, r, (n.__O = n.__P));
          }
          this.__b = null;
        }
        var o = t.__e && b(w, null, e.fallback);
        return o && (o.__h = null), [b(w, null, t.__e ? null : e.children), o];
      });
    var vr = function (e, t, r) {
      if (
        (++r[1] === r[0] && e.o.delete(t),
        e.props.revealOrder && ('t' !== e.props.revealOrder[0] || !e.o.size))
      )
        for (r = e.u; r; ) {
          for (; r.length > 3; ) r.pop()();
          if (r[1] < r[0]) break;
          e.u = r = r[2];
        }
    };
    function Cr(e) {
      return (
        (this.getChildContext = function () {
          return e.context;
        }),
        e.children
      );
    }
    function kr(e) {
      var t = this,
        r = e.i;
      (t.componentWillUnmount = function () {
        B(null, t.l), (t.l = null), (t.i = null);
      }),
        t.i && t.i !== r && t.componentWillUnmount(),
        e.__v
          ? (t.l ||
              ((t.i = r),
              (t.l = {
                nodeType: 1,
                parentNode: r,
                childNodes: [],
                appendChild: function (e) {
                  this.childNodes.push(e), t.i.appendChild(e);
                },
                insertBefore: function (e, r) {
                  this.childNodes.push(e), t.i.appendChild(e);
                },
                removeChild: function (e) {
                  this.childNodes.splice(this.childNodes.indexOf(e) >>> 1, 1), t.i.removeChild(e);
                },
              })),
            B(b(Cr, { context: t.context }, e.__v), t.l))
          : t.l && t.componentWillUnmount();
    }
    function Er(e, t) {
      return b(kr, { __v: e, i: t });
    }
    ((mr.prototype = new R()).__e = function (e) {
      var t = this,
        r = gr(t.__v),
        n = t.o.get(e);
      return (
        n[0]++,
        function (o) {
          var i = function () {
            t.props.revealOrder ? (n.push(o), vr(t, e, n)) : o();
          };
          r ? r(i) : i();
        }
      );
    }),
      (mr.prototype.render = function (e) {
        (this.u = null), (this.o = new Map());
        var t = D(e.children);
        e.revealOrder && 'b' === e.revealOrder[0] && t.reverse();
        for (var r = t.length; r--; ) this.o.set(t[r], (this.u = [1, 0, this.u]));
        return e.children;
      }),
      (mr.prototype.componentDidUpdate = mr.prototype.componentDidMount =
        function () {
          var e = this;
          this.o.forEach(function (t, r) {
            vr(e, r, t);
          });
        });
    var br = ('undefined' != typeof Symbol && Symbol.for && Symbol.for('react.element')) || 60103,
      Sr =
        /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
      Ar = 'undefined' != typeof document,
      wr = function (e) {
        return (
          'undefined' != typeof Symbol && 'symbol' == typeof Symbol()
            ? /fil|che|rad/i
            : /fil|che|ra/i
        ).test(e);
      };
    function Rr(e, t, r) {
      return (
        null == t.__k && (t.textContent = ''),
        B(e, t),
        'function' == typeof r && r(),
        e ? e.__c : null
      );
    }
    function Tr(e, t, r) {
      return $(e, t), 'function' == typeof r && r(), e ? e.__c : null;
    }
    (R.prototype.isReactComponent = {}),
      ['componentWillMount', 'componentWillReceiveProps', 'componentWillUpdate'].forEach(function (
        e
      ) {
        Object.defineProperty(R.prototype, e, {
          configurable: !0,
          get: function () {
            return this['UNSAFE_' + e];
          },
          set: function (t) {
            Object.defineProperty(this, e, {
              configurable: !0,
              writable: !0,
              value: t,
            });
          },
        });
      });
    var Ir = p.event;
    function Or() {}
    function Pr() {
      return this.cancelBubble;
    }
    function xr() {
      return this.defaultPrevented;
    }
    p.event = function (e) {
      return (
        Ir && (e = Ir(e)),
        (e.persist = Or),
        (e.isPropagationStopped = Pr),
        (e.isDefaultPrevented = xr),
        (e.nativeEvent = e)
      );
    };
    var Nr = {
        configurable: !0,
        get: function () {
          return this.class;
        },
      },
      Dr = p.vnode;
    p.vnode = function (e) {
      var t = e.type,
        r = e.props,
        n = r;
      if ('string' == typeof t) {
        var o = -1 === t.indexOf('-');
        for (var i in ((n = {}), r)) {
          var s = r[i];
          (Ar && 'children' === i && 'noscript' === t) ||
            ('value' === i && 'defaultValue' in r && null == s) ||
            ('defaultValue' === i && 'value' in r && null == r.value
              ? (i = 'value')
              : 'download' === i && !0 === s
              ? (s = '')
              : /ondoubleclick/i.test(i)
              ? (i = 'ondblclick')
              : /^onchange(textarea|input)/i.test(i + t) && !wr(r.type)
              ? (i = 'oninput')
              : /^on(Ani|Tra|Tou|BeforeInp)/.test(i)
              ? (i = i.toLowerCase())
              : o && Sr.test(i)
              ? (i = i.replace(/[A-Z0-9]/, '-$&').toLowerCase())
              : null === s && (s = void 0),
            (n[i] = s));
        }
        'select' == t &&
          n.multiple &&
          Array.isArray(n.value) &&
          (n.value = D(r.children).forEach(function (e) {
            e.props.selected = -1 != n.value.indexOf(e.props.value);
          })),
          'select' == t &&
            null != n.defaultValue &&
            (n.value = D(r.children).forEach(function (e) {
              e.props.selected = n.multiple
                ? -1 != n.defaultValue.indexOf(e.props.value)
                : n.defaultValue == e.props.value;
            })),
          (e.props = n);
      }
      t &&
        r.class != r.className &&
        ((Nr.enumerable = 'className' in r),
        null != r.className && (n.class = r.className),
        Object.defineProperty(n, 'className', Nr)),
        (e.$$typeof = br),
        Dr && Dr(e);
    };
    var Kr = p.__r;
    function Wr(e) {
      return b.bind(null, e);
    }
    function Vr(e) {
      return !!e && e.$$typeof === br;
    }
    function Hr(e) {
      return Vr(e) ? J.apply(null, arguments) : e;
    }
    function Ur(e) {
      return !!e.__k && (B(null, e), !0);
    }
    function Lr(e) {
      return (e && (e.base || (1 === e.nodeType && e))) || null;
    }
    p.__r = function (e) {
      Kr && Kr(e), e.__c;
    };
    var qr = w;
    function Gr() {
      return (
        (Gr =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          }),
        Gr.apply(this, arguments)
      );
    }
    var Mr = new Map(),
      jr = new WeakMap(),
      Fr = 0;
    function Br(e, t, r) {
      if ((void 0 === r && (r = {}), !e)) return function () {};
      var n = (function (e) {
          var t = (function (e) {
              return Object.keys(e)
                .sort()
                .filter(function (t) {
                  return void 0 !== e[t];
                })
                .map(function (t) {
                  return (
                    t +
                    '_' +
                    ('root' === t
                      ? (r = e.root)
                        ? (jr.has(r) || ((Fr += 1), jr.set(r, Fr.toString())), jr.get(r))
                        : '0'
                      : e[t])
                  );
                  var r;
                })
                .toString();
            })(e),
            r = Mr.get(t);
          if (!r) {
            var n,
              o = new Map(),
              i = new IntersectionObserver(function (t) {
                t.forEach(function (t) {
                  var r,
                    i =
                      t.isIntersecting &&
                      n.some(function (e) {
                        return t.intersectionRatio >= e;
                      });
                  e.trackVisibility && void 0 === t.isVisible && (t.isVisible = i),
                    null == (r = o.get(t.target)) ||
                      r.forEach(function (e) {
                        e(i, t);
                      });
                });
              }, e);
            (n = i.thresholds || (Array.isArray(e.threshold) ? e.threshold : [e.threshold || 0])),
              (r = { id: t, observer: i, elements: o }),
              Mr.set(t, r);
          }
          return r;
        })(r),
        o = n.id,
        i = n.observer,
        s = n.elements,
        a = s.get(e) || [];
      return (
        s.has(e) || s.set(e, a),
        a.push(t),
        i.observe(e),
        function () {
          a.splice(a.indexOf(t), 1),
            0 === a.length && (s.delete(e), i.unobserve(e)),
            0 === s.size && (i.disconnect(), Mr.delete(o));
        }
      );
    }
    function $r(e) {
      return 'function' != typeof e.children;
    }
    var Jr = (function (e) {
      var t, r;
      function n(t) {
        var r;
        return (
          ((r = e.call(this, t) || this).node = null),
          (r._unobserveCb = null),
          (r.handleNode = function (e) {
            r.node &&
              (r.unobserve(),
              e ||
                r.props.triggerOnce ||
                r.props.skip ||
                r.setState({ inView: !!r.props.initialInView, entry: void 0 })),
              (r.node = e || null),
              r.observeNode();
          }),
          (r.handleChange = function (e, t) {
            e && r.props.triggerOnce && r.unobserve(),
              $r(r.props) || r.setState({ inView: e, entry: t }),
              r.props.onChange && r.props.onChange(e, t);
          }),
          (r.state = { inView: !!t.initialInView, entry: void 0 }),
          r
        );
      }
      (r = e),
        ((t = n).prototype = Object.create(r.prototype)),
        (t.prototype.constructor = t),
        (t.__proto__ = r);
      var o = n.prototype;
      return (
        (o.componentDidUpdate = function (e) {
          (e.rootMargin === this.props.rootMargin &&
            e.root === this.props.root &&
            e.threshold === this.props.threshold &&
            e.skip === this.props.skip &&
            e.trackVisibility === this.props.trackVisibility &&
            e.delay === this.props.delay) ||
            (this.unobserve(), this.observeNode());
        }),
        (o.componentWillUnmount = function () {
          this.unobserve(), (this.node = null);
        }),
        (o.observeNode = function () {
          if (this.node && !this.props.skip) {
            var e = this.props,
              t = e.threshold,
              r = e.root,
              n = e.rootMargin,
              o = e.trackVisibility,
              i = e.delay;
            this._unobserveCb = Br(this.node, this.handleChange, {
              threshold: t,
              root: r,
              rootMargin: n,
              trackVisibility: o,
              delay: i,
            });
          }
        }),
        (o.unobserve = function () {
          this._unobserveCb && (this._unobserveCb(), (this._unobserveCb = null));
        }),
        (o.render = function () {
          if (!$r(this.props)) {
            var e = this.state,
              t = e.inView,
              r = e.entry;
            return this.props.children({
              inView: t,
              entry: r,
              ref: this.handleNode,
            });
          }
          var n = this.props,
            o = n.children,
            i = n.as,
            s = n.tag,
            a = (function (e, t) {
              if (null == e) return {};
              var r,
                n,
                o = {},
                i = Object.keys(e);
              for (n = 0; n < i.length; n++) (r = i[n]), t.indexOf(r) >= 0 || (o[r] = e[r]);
              return o;
            })(n, [
              'children',
              'as',
              'tag',
              'triggerOnce',
              'threshold',
              'root',
              'rootMargin',
              'onChange',
              'skip',
              'trackVisibility',
              'delay',
              'initialInView',
            ]);
          return b(i || s || 'div', Gr({ ref: this.handleNode }, a), o);
        }),
        n
      );
    })(R);
    (Jr.displayName = 'InView'),
      (Jr.defaultProps = { threshold: 0, triggerOnce: !1, initialInView: !1 });
    const Qr = Q({}),
      Yr = () => Yt(Qr),
      zr = (e) => e(z.WIDGET_APPEAR, { time: Date.now() }),
      Zr = (e) => {
        const { dispatch: t, options: { visibility: r = {} } = {} } = Yr(),
          n = e || r,
          {
            ref: o,
            inView: i,
            entry: s,
          } = (function (e) {
            var t = void 0 === e ? {} : e,
              r = t.threshold,
              n = t.delay,
              o = t.trackVisibility,
              i = t.rootMargin,
              s = t.root,
              a = t.triggerOnce,
              c = t.skip,
              l = t.initialInView,
              u = Bt(),
              d = Gt({ inView: !!l }),
              p = d[0],
              h = d[1],
              _ = Qt(
                function (e) {
                  void 0 !== u.current && (u.current(), (u.current = void 0)),
                    c ||
                      (e &&
                        (u.current = Br(
                          e,
                          function (e, t) {
                            h({ inView: e, entry: t }),
                              t.isIntersecting &&
                                a &&
                                u.current &&
                                (u.current(), (u.current = void 0));
                          },
                          {
                            root: s,
                            rootMargin: i,
                            threshold: r,
                            trackVisibility: o,
                            delay: n,
                          }
                        )));
                },
                [Array.isArray(r) ? r.toString() : r, s, i, a, c, o, n]
              );
            jt(function () {
              u.current || !p.entry || a || c || h({ inView: !!l });
            });
            var f = [_, p.inView, p.entry];
            return (f.ref = f[0]), (f.inView = f[1]), (f.entry = f[2]), f;
          })(n),
          { manual: a } = n,
          c = Qt(() => {
            zr(t);
          }, [t]);
        return (
          jt(() => {
            a && i && zr(t);
          }, [t, i, s, a]),
          { ref: o, inView: i, entry: s, trigger: c }
        );
      },
      Xr = (e, t, r) => {
        let { onUpdate: n, onInView: o } = r;
        const i = (r) => {
          const { ref: i, inView: s, entry: a } = Zr(t),
            c = Qt(
              (e) => {
                if (e)
                  if (1 === e.nodeType) i(e);
                  else {
                    const t = Lr(e);
                    t && 1 === t.nodeType && i(t);
                  }
                else i(null);
              },
              [i, r.available]
            );
          return (
            jt(() => {
              s && o(a), n(s, a);
            }, [s, a]),
            b(e, { ...r, ref: c })
          );
        };
        return (i.displayName = 'withWidgetAppear'), i;
      },
      en = (e, t, r, n, o) => {
        const { properties: { custom: i } = {} } = o;
        return i ? i({ rfkId: e, state: t, context: r, props: n, options: o }) : t;
      };
    function tn(e, t) {
      const r = new e(t);
      return Ot.register(r), r;
    }
    function rn(e, t) {
      var r;
      let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      const o = Ot.getDispatcher();
      let i, s;
      n.rfkId && ((i = tn(e, n.rfkId)), (s = i.getStore()));
      const a = null === (r = n.properties) || void 0 === r ? void 0 : r.initial;
      function c(r) {
        const { manual: c, onUpdate: l, onInView: u, ...d } = n.visibility || {};
        i || ((i = tn(e, r.rfkId)), (s = i.getStore()));
        const p = n.rfkId || r.rfkId;
        let h = s.getState();
        const _ = (e, t) => o.dispatch(e, { rfkId: p, ...t }),
          f = c
            ? t
            : Xr(t, d, {
                onInView: () => {
                  zr(_), u && u();
                },
                onUpdate: (e, t) => {
                  l && l(e, t);
                },
              }),
          g = () => {
            const e = s.getState();
            for (const t in e) if (e[t] !== h[t]) return (h = e), this.setState({});
            for (const t in h) if (!(t in e)) return (h = e), this.setState({});
          };
        (this.componentWillReceiveProps = (e) => {
          (r = e), g();
        }),
          (this.componentDidMount = () => {
            s.subscribe(g), o.dispatch(z.LOAD, { ...r, rfkId: p });
          }),
          (this.componentWillUnmount = () => {
            s.unsubscribe(g);
          }),
          (this.render = (e) => {
            var t, r;
            return b(Qr.Provider, {
              value: {
                store: s,
                rfkId: p,
                dispatch: _,
                context: null === (t = i) || void 0 === t ? void 0 : t.getContext(),
                options: n,
              },
              children: b(
                f,
                Object.assign(
                  { rfkId: p, dispatch: _ },
                  a,
                  e,
                  h,
                  en(p, h, null === (r = i) || void 0 === r ? void 0 : r.getContext(), e, n)
                )
              ),
            });
          });
      }
      return ((c.prototype = new R()).constructor = c);
    }
    const nn = { visibility: { threshold: 0.2, triggerOnce: !0 } },
      on = class extends class {
        getWidgetComponentConfig(e) {
          const t = Tt.get(e);
          if (t)
            if (t.controller) {
              if (t.component) return t;
              console.warn(`Widget "${e}" has an invalid component configured`);
            } else console.warn(`Widget "${e}" has an invalid controller configured`);
          else console.warn(`Widget "${e}" is not supported`);
        }
        setup(e) {
          const t = Tt.getController(e),
            r = this.getWidgetComponentConfig(e);
          if (t && r) return this.doSetup(t, r, e);
        }
      } {
        doSetup(e, t, r) {
          const { component: n, options: o } = t;
          return rn(e, n, { ...X(nn, o), rfkId: r });
        }
      };
    var sn = function (e, t, r, n) {
        var o;
        t[0] = 0;
        for (var i = 1; i < t.length; i++) {
          var s = t[i++],
            a = t[i] ? ((t[0] |= s ? 1 : 2), r[t[i++]]) : t[++i];
          3 === s
            ? (n[0] = a)
            : 4 === s
            ? (n[1] = Object.assign(n[1] || {}, a))
            : 5 === s
            ? ((n[1] = n[1] || {})[t[++i]] = a)
            : 6 === s
            ? (n[1][t[++i]] += a + '')
            : s
            ? ((o = e.apply(a, sn(e, a, r, ['', null]))),
              n.push(o),
              a[0] ? (t[0] |= 2) : ((t[i - 2] = 0), (t[i] = o)))
            : n.push(a);
        }
        return n;
      },
      an = new Map();
    const cn = function (e) {
        var t = an.get(this);
        return (
          t || ((t = new Map()), an.set(this, t)),
          (t = sn(
            this,
            t.get(e) ||
              (t.set(
                e,
                (t = (function (e) {
                  for (
                    var t,
                      r,
                      n = 1,
                      o = '',
                      i = '',
                      s = [0],
                      a = function (e) {
                        1 === n && (e || (o = o.replace(/^\s*\n\s*|\s*\n\s*$/g, '')))
                          ? s.push(0, e, o)
                          : 3 === n && (e || o)
                          ? (s.push(3, e, o), (n = 2))
                          : 2 === n && '...' === o && e
                          ? s.push(4, e, 0)
                          : 2 === n && o && !e
                          ? s.push(5, 0, !0, o)
                          : n >= 5 &&
                            ((o || (!e && 5 === n)) && (s.push(n, 0, o, r), (n = 6)),
                            e && (s.push(n, e, 0, r), (n = 6))),
                          (o = '');
                      },
                      c = 0;
                    c < e.length;
                    c++
                  ) {
                    c && (1 === n && a(), a(c));
                    for (var l = 0; l < e[c].length; l++)
                      (t = e[c][l]),
                        1 === n
                          ? '<' === t
                            ? (a(), (s = [s]), (n = 3))
                            : (o += t)
                          : 4 === n
                          ? '--' === o && '>' === t
                            ? ((n = 1), (o = ''))
                            : (o = t + o[0])
                          : i
                          ? t === i
                            ? (i = '')
                            : (o += t)
                          : '"' === t || "'" === t
                          ? (i = t)
                          : '>' === t
                          ? (a(), (n = 1))
                          : n &&
                            ('=' === t
                              ? ((n = 5), (r = o), (o = ''))
                              : '/' === t && (n < 5 || '>' === e[c][l + 1])
                              ? (a(),
                                3 === n && (s = s[0]),
                                (n = s),
                                (s = s[0]).push(2, 0, n),
                                (n = 0))
                              : ' ' === t || '\t' === t || '\n' === t || '\r' === t
                              ? (a(), (n = 2))
                              : (o += t)),
                        3 === n && '!--' === o && ((n = 4), (s = s[0]));
                  }
                  return a(), s;
                })(e))
              ),
              t),
            arguments,
            []
          )).length > 1
            ? t
            : t[0]
        );
      }.bind(b),
      ln = class extends class {
        constructor(e) {
          this.widgetFactory = e;
        }
        render(e, t) {
          const r = this.widgetFactory.setup(e);
          r && this.doRender(r, t);
        }
      } {
        createElement(e) {
          const t = document.createElement('div');
          return (t.dataset.rfkid = e), t;
        }
        doRender(e, t) {
          const r = Object.keys(t.dataset)
            .filter((e) => e.startsWith('rfkWidget'))
            .reduce((e, r) => {
              const n = r.replace('rfkWidget', ''),
                o = n.charAt(0).toLowerCase() + n.slice(1);
              return Object.assign(e, { [o]: t.dataset[r] });
            }, {});
          B(cn`<${e} ...${r} />`, t);
        }
      },
      un = class {
        constructor(e) {
          this.renderer = new (class {
            constructor(e) {
              this.widgetRenderer = e;
            }
            render(e, t) {
              for (let r = 0; r < e.length; r++) {
                const n = e[r],
                  o = this.widgetRenderer.createElement(n);
                t.appendChild(o), this.widgetRenderer.render(n, o);
              }
            }
          })(e);
        }
        render(e, t) {
          this.renderer.render(e, t);
        }
      },
      dn = async (e, t, r, n, o) => {
        if (e) {
          const i = {
            data: {
              name: t,
              type: 'widget',
              value: {
                rfkid: e,
                ...(r ? { f: r } : []),
                ...(o ? { context: o } : []),
                ...n,
              },
            },
          };
          return gt(i);
        }
        return Promise.reject(new Error('widget has not been provided'));
      },
      pn = async (e, t) => dn(e, 'appear', null, {}, t),
      hn = async (e, t, r, n) => {
        let { type: o, subType: i, feature: s } = t;
        return dn(e, 'click', s, { click_type: o, click_sub_type: i, ...r }, n);
      };
    class _n {
      constructor(e) {
        (this.store = (function (e, t) {
          let r = [];
          function n(e) {
            const t = [];
            for (let n = 0; n < r.length; n++) r[n] === e ? (e = null) : t.push(r[n]);
            r = t;
          }
          return (
            (e = e || {}),
            {
              reset() {
                e = {};
              },
              setState: function (n, o) {
                const i = o ? n : Object.assign({}, e, n);
                console.debug(
                  'SDK ::: store ::: update :::',
                  t,
                  '::: prev',
                  JSON.parse(JSON.stringify(e)),
                  'next',
                  JSON.parse(JSON.stringify(i))
                ),
                  (e = i);
                const s = r;
                for (let t = 0; t < s.length; t++) s[t](e);
              },
              subscribe: (e) => (
                r.push(e),
                () => {
                  n(e);
                }
              ),
              unsubscribe: n,
              getState: () => e,
            }
          );
        })({}, e)),
          (this.rfkId = e),
          (this.onHandleActions = (e, t) => {}),
          (this.context = new nt()),
          this.resetRequest();
      }
      setState(e) {
        this.store.setState(e);
      }
      getState() {
        return this.store.getState();
      }
      getStore() {
        return this.store;
      }
      getContext() {
        return this.context;
      }
      getContextJson() {
        return X(Ot.getContext().toJson(), this.request.toJson('context').context || {});
      }
      fetch(e) {
        return Rt.getData(this.request, e);
      }
      onPageContextChange() {
        this.fetch();
      }
      onWidgetAppear() {
        pn(this.rfkId, this.getContextJson());
      }
      resetRequest() {
        this.initializeRequest(), this.request.setRfkId(this.rfkId);
      }
      reset() {
        this.store.reset(), this.resetRequest();
      }
      handleAction(e, t) {
        const { rfkId: r } = t;
        if ((e === z.PAGE_CONTEXT_CHANGED && this.onPageContextChange(), r === this.rfkId)) {
          switch (e) {
            case z.RESET_WIDGET:
              this.reset();
              break;
            case z.WIDGET_APPEAR:
              this.onWidgetAppear();
          }
          this.handleInternalActions(e, t);
        }
        this.onHandleActions(e, t);
      }
      setOnHandleActions(e) {
        this.onHandleActions = e;
      }
      getId() {
        return this.rfkId;
      }
    }
    const fn = async (e, t, r, n, o, i) =>
        hn(e, { type: 'facet', subType: t }, { click_text_id: r, click_text: n, index: o }, i),
      gn = async (e, t, r, n) =>
        hn(
          e,
          { type: 'product', subType: 'product_switch' },
          { index: r, products: [{ sku: t }] },
          n
        ),
      yn = async (e, t, r, n) =>
        hn(e, { type: 'product', subType: 'product' }, { index: r, products: [{ sku: t }] }, n),
      mn = async (e, t, r, n) =>
        hn(e, { type: 'product', subType: 'swatch' }, { index: r, products: [{ sku: t }] }, n),
      vn = async (e, t, r, n) =>
        hn(e, { type: 'pagination' }, { click_text: r, click_text_id: t }, n),
      Cn = async (e, t, r) => hn(e, { type: 'close' }, { click_text: t }, r),
      kn = async function (e, t) {
        let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
          n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : '',
          o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : '',
          i = arguments.length > 5 ? arguments[5] : void 0;
        return e
          ? t
            ? dn(e, 'click', 'sp', { index: r, products: [{ sku: t }], kw: n, m: o }, i)
            : Promise.reject(new Error('product sku has not been provided'))
          : Promise.reject(new Error('widget has not been provided'));
      },
      En = async (e, t, r, n, o, i) =>
        dn(e, 'click', 'sp', { w: 'facet', type: t, text: r, index: n, tindex: o }, i),
      bn = async function (e, t) {
        let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
          n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : '',
          o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : '',
          i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : '',
          s = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : '',
          a = arguments.length > 7 ? arguments[7] : void 0,
          c = arguments.length > 8 ? arguments[8] : void 0;
        return e
          ? dn(
              e,
              'click',
              'sb',
              {
                index: r,
                ...('' !== t ? { products: [{ sku: t }] } : []),
                kw: n,
                m: o,
                type: s,
                text: i,
                ...(a ? { w: a } : []),
              },
              c
            )
          : Promise.reject(new Error('widget has not been provided'));
      },
      Sn = async function (e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '',
          n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : '',
          o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : '',
          i = arguments.length > 5 ? arguments[5] : void 0;
        return await bn(e, '', t, r, n, o, 'category', 'suggestion', i);
      },
      An = async function (e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '',
          n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : '',
          o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : '',
          i = arguments.length > 5 ? arguments[5] : void 0;
        return await bn(e, '', t, r, n, o, 'keyphrase', 'suggestion', i);
      },
      wn = async function (e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '',
          n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : '',
          o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : '',
          i = arguments.length > 5 ? arguments[5] : void 0;
        return bn(e, '', t, r, n, o, 'trending_category', 'suggestion', i);
      },
      Rn = async function (e, t) {
        let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
          n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : '',
          o = arguments.length > 4 ? arguments[4] : void 0;
        return e
          ? dn(
              e,
              'click',
              'rw',
              {
                index: r,
                ...(t ? { products: [{ sku: t }] } : []),
                ...('' !== n ? ('prev' === n ? { prev: 1 } : { next: 1 }) : []),
              },
              o
            )
          : Promise.reject(new Error('widget has not been provided'));
      },
      Tn = function (e) {
        let {
            env: t,
            customerKey: r,
            apiKey: n,
            serviceHost: o,
            useToken: i,
            userId: s,
            debug: a,
            useStorage: c = !1,
          } = e,
          { processor: l } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        ke('env', t),
          ke('customerKey', r),
          ke('apiKey', n),
          ke('serviceHost', o),
          ke('useToken', i),
          ke('userId', s),
          ke('debug', a),
          dt.init(c),
          l && Ve.setProcessor(l);
      },
      In = () => {
        De.clearCache();
      },
      On = (e) => {
        ke('userId', e);
      },
      Pn = () => {
        const { user_id: e, uuid: t } = ft();
        return e || t;
      },
      xn = function () {
        return Xe(ee.RECOMMENDATION);
      },
      Nn = function () {
        return Xe(ee.PREVIEW_SEARCH);
      },
      Dn = function () {
        return Xe(ee.SEARCH_RESULTS);
      },
      Kn = function () {
        return Xe(ee.HTML_BLOCK);
      },
      Wn = function () {
        return Xe(ee.SEO);
      },
      Vn = function () {
        return Xe(ee.BANNER);
      },
      Hn = function () {
        return Xe(ee.DISCOVER);
      };
    class Un extends _n {
      initializeRequest() {
        return (this.request = Xe(ee.CONTENT_BLOCK)), this;
      }
      handleInternalActions(e, t) {
        switch (e) {
          case z.LOAD:
            this.fetch();
            break;
          case z.REQUEST:
            this.setState({ loading: !0 });
            break;
          case z.REQUEST_SUCCESS: {
            const {
              appearance: e,
              appearance: {
                templates: {
                  html: { devices: { [te.DESKTOP]: { content: r = null } = {} } = {} } = {},
                  css: { devices: { [te.DESKTOP]: { content: n = null } = {} } = {} } = {},
                } = {},
              } = {},
            } = t.response;
            this.setState({
              appearance: e,
              cssContent: n,
              htmlContent: r,
              loading: !1,
              loaded: !0,
            });
          }
        }
      }
    }
    const Ln = Y('recommendation'),
      qn = Ln('PRODUCT_CLICKED'),
      Gn = Ln('NAVIGATION_NEXT'),
      Mn = Ln('NAVIGATION_PREV');
    class jn extends _n {
      initializeRequest() {
        return (this.request = Xe(ee.RECOMMENDATION)), this;
      }
      arrowClick(e) {
        let { direction: t } = e;
        Rn(this.getId(), '', 0, t, this.getContextJson()).then(() =>
          console.debug('RecommendationController ::: trackRecommendationClick finished')
        );
      }
      productClick(e) {
        let { sku: t, index: r } = e;
        Rn(this.getId(), t, r, '', this.getContextJson()).then(() =>
          console.debug('RecommendationController ::: trackRecommendationClick finished')
        );
      }
      handleInternalActions(e, t) {
        switch (e) {
          case Gn:
            this.arrowClick({ direction: 'next' });
            break;
          case Mn:
            this.arrowClick({ direction: 'prev' });
            break;
          case qn:
            this.productClick({ ...t });
            break;
          case z.LOAD:
            this.fetch();
            break;
          case z.REQUEST:
            this.setState({ loading: !0 });
            break;
          case z.REQUEST_SUCCESS: {
            const { content: { product: { value: e = [] } = {} } = {} } = t.response;
            this.setState({
              products: e,
              available: e.length > 0,
              loading: !1,
              loaded: !0,
            });
          }
        }
      }
    }
    const Fn = Y('recommendation'),
      Bn = Fn('PRODUCT_CLICKED'),
      $n = Fn('FACET_CLICKED'),
      Jn = Fn('SORT_CHANGED'),
      Qn = Fn('PAGE_NUMBER_CHANGED'),
      Yn = Fn('RESULTS_PER_PAGE_CHANGED'),
      zn = Fn('KEYPHRASE_CHANGED'),
      Zn = Fn('CLEAR_FILTERS');
    class Xn extends _n {
      initializeRequest() {
        return (
          (this.request = Xe(ee.SEARCH_RESULTS)),
          this.request.getQueryKeyphrase() &&
            this.setState({ keyphrase: this.request.getQueryKeyphrase() }),
          this.request.getPageNumber() && this.setState({ page: this.request.getPageNumber() }),
          this.request.getNumberProducts() &&
            this.setState({
              productsPerPage: this.request.getNumberProducts(),
            }),
          this
        );
      }
      resetControls() {
        this.setPage(1);
      }
      setPage(e) {
        this.setState({ page: e }), this.request.setPageNumber(e);
      }
      setProductsPerPage(e) {
        this.setState({ productsPerPage: e }), this.request.setNumberProducts(e);
      }
      setKeyphrase(e) {
        this.resetRequest(),
          this.resetControls(),
          this.setState({
            keyphrase: e,
            facets: this.formatFacetsFromResponse(this.getState().facet),
          }),
          this.request.setQueryKeyphrase(e);
      }
      setSort(e, t) {
        this.setState({ sortType: e, sortDirection: t }),
          this.request.resetSortCriteria().setSortCriteriaType(e).setSortCriteriaOrder(t);
      }
      facetClick(e) {
        let {
          facetType: t,
          facetValue: r,
          facetValueIndex: n,
          valueIndex: o,
          facetIndex: i,
          checked: s,
        } = e;
        En(this.rfkId, t, r, o, i, this.getContextJson()).then(() =>
          console.debug('SearchController ::: trackFacetClick finished')
        );
        const { facet: a, facet: { [t]: { value: c = [] } = {} } = {} } = this.getState(),
          { id: l = r } = c[n] || {};
        this.resetControls(),
          s ? this.request.addFilterValue(t, l) : this.request.removeFilterValue(t, l),
          this.setState({ facets: this.formatFacetsFromResponse(a) }),
          this.fetch();
      }
      productClick(e) {
        let { sku: t, index: r } = e;
        const { keyphrase: n } = this.getState();
        kn(this.rfkId, t, r, n, '', this.getContextJson()).then(() =>
          console.debug('SearchController ::: trackFullPageSearchClick finished')
        );
      }
      pageNumberChange(e) {
        let { pageNumber: t } = e;
        this.setPage(t), this.fetch();
      }
      keyphraseChange(e) {
        let { keyphrase: t } = e;
        this.setKeyphrase(t), this.fetch();
      }
      productsPerPageChange(e) {
        let { numProducts: t } = e;
        this.setProductsPerPage(t), this.fetch();
      }
      sortChange(e) {
        let { sortType: t, sortDirection: r } = e;
        this.setSort(t, r), this.fetch();
      }
      clearFilters() {
        this.setState({ facets: [] }), this.request.resetFilter(), this.fetch();
      }
      formatFacetsFromResponse() {
        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        const { filter: t = {} } = this.request.toJson(),
          r = [],
          n = Object.keys(e);
        for (let o = 0; o < n.length; o++) {
          const i = { ...e[n[o]], facetType: n[o] };
          (i.values = i.value.map((e, r) => {
            const { [n[o]]: { value: i = [] } = {} } = t;
            return {
              ...e,
              index: r,
              selected: i.includes(e.id) || i.includes(e.text),
            };
          })),
            r.push(i);
        }
        return r;
      }
      handleInternalActions(e, t) {
        switch (e) {
          case z.LOAD:
            this.fetch();
            break;
          case z.REQUEST:
            this.setState({ loading: !0 });
            break;
          case z.REQUEST_SUCCESS:
            {
              const {
                sort: { choices: e = this.getState().sortChoices } = {},
                page_number: r,
                total_item: n,
                total_page: o,
                n_item: i,
                facet: s,
                content: { product: { value: a = [] } = {} } = {},
              } = t.response;
              this.setState({
                page: r,
                products: a,
                loading: !1,
                loaded: !0,
                facets: this.formatFacetsFromResponse(s),
                facet: s,
                sortChoices: e,
                totalPages: o,
                totalItems: n,
                numberOfItems: i,
              });
            }
            break;
          case $n:
            this.facetClick({ ...t });
            break;
          case Bn:
            this.productClick({ ...t });
            break;
          case Jn:
            this.sortChange({ ...t });
            break;
          case Qn:
            this.pageNumberChange({ ...t });
            break;
          case Yn:
            this.productsPerPageChange({ ...t });
            break;
          case zn:
            this.keyphraseChange({ ...t });
            break;
          case Zn:
            this.clearFilters();
        }
      }
    }
    const eo = Y('discover'),
      to = eo('OPENED'),
      ro = eo('CLOSED'),
      no = eo('PRODUCT_CHANGED'),
      oo = eo('CHOICE_CHANGED'),
      io = eo('REFRESH'),
      so = eo('NAVIGATION_NEXT'),
      ao = eo('NAVIGATION_PREV'),
      co = class extends _n {
        initializeRequest() {
          return (this.request = Xe(ee.DISCOVER)), this;
        }
        setMainProduct(e) {
          let { sku: t, productGroup: r } = e;
          this.request.resetContextPageProductGroups(),
            this.request.resetContextPageSkus(),
            r
              ? this.request.setContextPageProductGroups([r])
              : t && this.request.setContextPageSkus([t]);
        }
        mainProductChange(e) {
          let { sku: t, productGroup: r } = e;
          this.store.reset(),
            this.setState({ open: !0 }),
            this.setMainProduct({ sku: t, productGroup: r });
        }
        tabChange(e) {
          let { choiceId: t, sku: r, productGroup: n } = e;
          this.setMainProduct({ sku: r, productGroup: n }),
            t && this.request.setFeaturesDiscoverChoiceId(t),
            this.fetch();
        }
        handleProductChange(e) {
          gn(this.rfkId, e.sku, e.index, this.getContextJson()),
            this.mainProductChange(e),
            this.fetch();
        }
        handleChoiceChange(e) {
          const { tabs: t = [] } = this.getState(),
            r = t.findIndex((t) => {
              let { choiceId: r } = t;
              return r === e.choiceId;
            }),
            { text: n, textId: o } = t[r] || {};
          fn(this.rfkId, e.choiceId, o, n, r, this.getContextJson()), this.tabChange(e);
        }
        handleInternalActions(e, t) {
          switch (e) {
            case to:
              this.mainProductChange(t), this.fetch({ force: !0 }), this.setState({ open: !0 });
              break;
            case ro:
              this.store.reset(), this.resetRequest(), this.setState({ open: !1 });
              break;
            case no:
              this.handleProductChange(t);
              break;
            case oo:
              this.handleChoiceChange(t);
              break;
            case so:
              vn(this.rfkId, 'next', 'Next', this.getContextJson());
              break;
            case ao:
              vn(this.rfkId, 'prev', 'Prev', this.getContextJson());
              break;
            case io:
              this.fetch({ force: !0 });
              break;
            case z.RESET_WIDGET:
              Cn(this.rfkId, 'Close', this.getContextJson());
              break;
            case z.REQUEST:
              this.setState({ loading: !0, error: null });
              break;
            case z.REQUEST_FAIL:
              this.setState({ error: t.response, loading: !1, loaded: !0 });
              break;
            case z.REQUEST_SUCCESS: {
              var r;
              const {
                  content: { product: { value: e = [] } = {} } = {},
                  context_values: { product: { value: o = [] } = {} } = {},
                  features: { discover: { choices: i = [] } = {} } = {},
                } = t.response,
                s = i.map((e) => {
                  let { values: [{ choice_id: t, selected: r, text: n, text_id: o }] = [] } = e;
                  return {
                    label: n,
                    choiceId: t,
                    selected: r,
                    text: n,
                    textId: o,
                  };
                });
              var n;
              null !== (r = s[0]) &&
                void 0 !== r &&
                r.choiceId &&
                this.request.setFeaturesDiscoverChoiceId(
                  null === (n = s[0]) || void 0 === n ? void 0 : n.choiceId
                );
              const a = s.find((e) => {
                  let { selected: t } = e;
                  return t;
                }),
                c = o.length ? o[0] : {};
              this.setState({
                products: e,
                loading: !1,
                loaded: !0,
                mainProduct: c,
                selectedTab: null == a ? void 0 : a.choiceId,
                tabs: s,
              }),
                this.setMainProduct({ sku: c.sku });
            }
          }
        }
      },
      lo = Y('previewSearch'),
      uo = lo('SUGGESTION_CHANGED'),
      po = lo('TRENDING_CATEGORY_CHANGED'),
      ho = lo('CATEGORY_CHANGED'),
      _o = lo('KEYPHRASE_CHANGED');
    class fo extends _n {
      initializeRequest() {
        return (this.request = Xe(ee.PREVIEW_SEARCH)), this;
      }
      setKeyphrase(e) {
        this.setState({ keyphrase: e, selectedKeyword: e });
      }
      setCategory(e) {
        this.setState({ category: e, selectedKeyword: e });
      }
      setSuggestion(e) {
        this.setState({ suggestion: e, selectedKeyword: e });
      }
      setTrendingCategory(e) {
        this.setState({ trendingCategory: e, selectedKeyword: e });
      }
      productClick(e) {
        let { sku: t, index: r } = e;
        const { context: n, keyphrase: o } = this.getState();
        bn(this.rfkId, t, r, o, '', n).then(() =>
          console.debug('PreviewSearchController ::: trackFullPageSearchClick finished')
        );
      }
      keyphraseChange(e) {
        let { keyphrase: t } = e;
        this.setKeyphrase(t),
          this.setState({ lockSuggestions: !1, lockCategories: !1 }),
          this.request.resetFilterValues('category_names'),
          this.request.setQueryKeyphrase(t),
          this.fetch();
      }
      categoryChange(e) {
        let { category: t } = e;
        this.setCategory(t),
          this.setState({ lockSuggestions: !0, lockCategories: !0 }),
          this.request.setFilterValues('category_names', [t]),
          this.fetch();
      }
      suggestionChange(e) {
        let { suggestion: t } = e;
        this.setSuggestion(t),
          this.setState({ lockSuggestions: !0, lockCategories: !0 }),
          this.request.resetFilterValues('category_names'),
          this.request.setQueryKeyphrase(t),
          this.fetch();
      }
      trendingCategoryChange(e) {
        let { trendingCategory: t } = e;
        this.setState({ lockSuggestions: !1, lockCategories: !1 }), this.setTrendingCategory(t);
      }
      handleInternalActions(e, t) {
        switch (e) {
          case z.REQUEST:
            this.setState({ loading: !0 }), console.debug('PreviewSearchController ::: REQUEST');
            break;
          case z.REQUEST_SUCCESS:
            {
              const {
                  content: { product: { value: e = [] } = {} } = {},
                  suggestion: { category: r = [], trending_category: n = [], keyphrase: o = [] },
                } = t.response,
                {
                  suggestions: i,
                  lockSuggestions: s,
                  categories: a,
                  lockCategories: c,
                } = this.getState();
              this.setState({
                products: e,
                loading: !1,
                loaded: !0,
                categories: c ? a : r,
                trendingCategories: n,
                suggestions: s ? i : o,
              });
            }
            break;
          case z.PRODUCT_CLICK:
            this.productClick({ ...t });
            break;
          case _o:
            this.keyphraseChange({ ...t });
            break;
          case ho:
            console.debug('PreviewSearchController ::: CATEGORY_CHANGED'), this.categoryChange(t);
            break;
          case po:
            console.debug('PreviewSearchController ::: TRENDING_CATEGORY_HOVER'),
              this.trendingCategoryChange(t);
            break;
          case uo:
            console.debug('PreviewSearchController ::: SUGGESTION_HOVER'), this.suggestionChange(t);
        }
      }
    }
    const go = {
        [ee.CONTENT_BLOCK]: Un,
        [ee.RECOMMENDATION]: jn,
        [ee.SEARCH_RESULTS]: Xn,
        [ee.DISCOVER]: co,
        [ee.PREVIEW_SEARCH]: fo,
      },
      yo = (e) => go[e] || (console.warn(`Unknown type of widget "${e}"`), null);
    class mo extends Ke {
      getWidgetType(e, t, r) {
        if (this.isAllWidget(e, r)) {
          const t = Tt.getType(e);
          if (t) return t;
        }
        return super.getWidgetType(e, t, r);
      }
      cacheWidgetResponse(e, t, r) {
        const { type: n, variation_id: o } = t.widget;
        Tt.setMetadata(e, { rfkId: e, type: n, variationId: o }),
          super.cacheWidgetResponse(e, t, r);
      }
    }
    let vo;
    const Co = new ln(new on()),
      ko = new un(Co);
    class Eo {
      constructor() {
        var e;
        (e = 'containerRendered') in this
          ? Object.defineProperty(this, e, {
              value: false,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (this[e] = false),
          Ot.getDispatcher().subscribe(this);
      }
      getContainerNode() {
        return document.querySelector('[data-rfkid="rfkid_container"]');
      }
      isContainer() {
        return !!this.getContainerNode();
      }
      handleAction(e, t) {
        switch (e) {
          case z.PAGE_CONTAINER_READY:
            if (this.isContainer() && !this.containerRendered) {
              const e = this.getContainerNode();
              e && (ko.render(t.widgets, e), (this.containerRendered = !0));
            }
            break;
          case z.WIDGET_READY: {
            if (!t.rfkId) return;
            const { nodeSelector: e = `[data-rfkid="${t.rfkId}"]` } = Tt.get(t.rfkId) || {},
              r = document.querySelector(e);
            r && Co.render(t.rfkId, r);
            break;
          }
        }
      }
    }
    const bo = (e) => {
        Tn(e, { processor: new mo() });
      },
      So = (e) => {
        const {
            autoIncludeNewWidgets: t = !1,
            autoIncludeWidgets: r = !0,
            uri: n = window.location.pathname,
          } = e || {},
          o = Tt.getGlobalWidgetIds();
        t &&
          (() => {
            const e = document.querySelector('[data-rfkid="rfkid_container"]');
            (vo = new MutationObserver((t) => {
              const r = [];
              t.forEach((t) => {
                t.addedNodes.forEach((t) => {
                  t.nodeType !== Node.ELEMENT_NODE ||
                    (e && e.contains(t)) ||
                    !t.dataset.rfkid ||
                    r.push(t.dataset.rfkid);
                });
              }),
                r.length > 0 && Ot.addWidgets(r);
            })),
              vo.observe(document.body, {
                subtree: !0,
                childList: !0,
                characterData: !0,
              });
          })();
        const i = new Eo();
        Ot.getContext().setPageUri(n),
          Ot.getContext().setUserUuid(ft().uuid),
          St(Ot.getContext().toJson()),
          (r
            ? Array.from(
                document.querySelectorAll(
                  ':not([data-rfkid="rfkid_container"]) > [data-rfkid]:not([data-rfkid="rfkid_container"])'
                )
              ).map((e) => e.dataset.rfkid)
            : []
          )
            .concat(o)
            .filter((e, t, r) => r.indexOf(e) === t)
            .forEach((e) => {
              Tt.set(e, { global: !0 });
            }),
          Ot.getDispatcher().dispatch(z.INITIALIZE, {
            isContainer: i.isContainer(),
            options: e,
          });
      },
      Ao = (e, t) => Tt.setWidgetType(e, t),
      wo = (e, t) => Tt.set(e, t),
      Ro = {
        controller: Un,
        component: (e) => {
          let { htmlContent: t, cssContent: r, appearance: { css_names: n = [] } = {} } = e;
          const { rfkId: o } = Yr(),
            { ref: i } = Zr(),
            s = Bt(null);
          return (
            jt(() => {
              s.current && t && i(s.current.parentNode);
            }, [s.current, !!t]),
            Ft(() => {
              var e;
              null !== (e = s.current) &&
                void 0 !== e &&
                e.parentNode &&
                n.length > 0 &&
                s.current.parentNode.classList.add(...n);
            }, [s.current, n.join('*')]),
            Ft(() => {
              s.current &&
                r &&
                (function (e, t, r) {
                  let n = document.querySelector(`[data-rfk-id-style=${e}]`);
                  var o;
                  n ||
                    ((n = document.createElement('style')),
                    n.setAttribute('type', 'text/css'),
                    (n.dataset.rfkIdStyle = e),
                    null === (o = t.parentNode) || void 0 === o || o.appendChild(n)),
                    (n.innerHTML = r);
                })(o, s.current, r);
            }, [s.current, r]),
            Ft(() => {
              s.current && t && (s.current.innerHTML = t);
            }, [s.current, t]),
            cn`<div ref=${s}></div>`
          );
        },
        options: { visibility: { manual: !0 } },
      };
    Ao(ee.CONTENT_BLOCK, Ro),
      Ao(ee.BANNER, Ro),
      Ao(ee.SEO, {
        ...Ro,
        component: (e) => {
          let { htmlContent: t } = e;
          return (
            Ft(() => {
              t && document.head.insertAdjacentHTML('beforeend', t);
            }, [t]),
            null
          );
        },
      }),
      Ao(ee.HTML_BLOCK, Ro),
      Ao(ee.PREVIEW_SEARCH, { controller: fo }),
      Ao(ee.RECOMMENDATION, { controller: jn }),
      Ao(ee.SEARCH_RESULTS, { controller: Xn }),
      Ao(ee.DISCOVER, {
        controller: co,
        options: { visibility: { manual: !0 } },
      });
  })(),
    (RFK = n);
})();
//# sourceMappingURL=rfk-sdk.js.map
