const te = function (e) {
    return ["open", "high", "low", "close"].filter(function (t) {
      return t !== e
    })
  },
  oe = function (e) {
    return ["SMA5", "SMA10", "SMA20", "SMA30", "SMA50", "SMA100", "SMA200", "EMA5", "EMA10", "EMA20", "EMA30", "EMA50", "EMA100", "EMA200"].filter(function (t) {
      return t !== e
    })
  },
  ne = function (e) {
    return ["Ichimoku.BLine", "Ichimoku.CLine", "Ichimoku.Lead1", "Ichimoku.Lead2"].filter(function (t) {
      return t !== e
    })
  },
  re = ["crosses", "crosses_above", "crosses_below"],
  SIGNAL = {
    STRONG_BUY: {
      key: "Strong Buy",
      title: window.t("Strong Buy"),
      shortTitle: window.t("Strong Buy"),
      cssClass: "tv-screener-table__signal--strong-buy"
    },
    BUY: {
      key: "Buy",
      title: window.t("Buy"),
      shortTitle: window.t("B", {
        context: "first_letter_of_Buy"
      }),
      cssClass: "tv-screener-table__signal--buy"
    },
    STRONG_SELL: {
      key: "Strong Sell",
      title: window.t("Strong Sell"),
      shortTitle: window.t("Strong Sell"),
      cssClass: "tv-screener-table__signal--strong-sell"
    },
    SELL: {
      key: "Sell",
      title: window.t("Sell"),
      shortTitle: window.t("S", {
        context: "first_letter_of_Sell"
      }),
      cssClass: "tv-screener-table__signal--sell"
    },
    NEUTRAL: {
      key: "Neutral",
      title: window.t("Neutral"),
      shortTitle: window.t("N", {
        context: "first_letter_of_Neutral"
      }),
      cssClass: "tv-screener-table__signal--neutral"
    }
  },
  FIELDS = {
    name: {
      fixed: !0,
      control: "select",
      category: O,
      inplaceEditorLeftOffset: 10,
      filterTitle: S.quoteFieldTitles.type[0],
      rangeTitles: J,
      additionalColumns: ["description", "name", "type", "subtype", "update_mode"],
      additionalFormatter: function (e, t, o, n, r) {
        var i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "",
          a = Z(o, n);
        return ee(e, a, t, i, r)
      },
      mutateDisplayValue: n,
      tooltip: function (e, t) {
        return ie.description.disabled || !ie.description.checked ? t : e
      },
      useDefaultRange: !0,
      defaultRange: ["dr", "fund", "common", "preferred"],
      customFilterCondition: function (e) {
        return ie.type.customFilterCondition(e)
      },
      search: !0
    },
    description: {
      hiddenColumn: !0,
      hideSetupColumn: !0
    },
    country_code: {
      hiddenColumn: !1,
      hideSetupColumn: !0,
      skipField: !0
    },
    crypto_code: {
      hiddenColumn: !1,
      hideSetupColumn: !0,
      skipField: !0
    },
    exchange: {
      control: "select",
      category: O,
      mutateDisplayValue: function (e) {
        return "AMEX" === e ? "NYSE ARCA" : e
      },
      rangeTitles: {
        AMEX: ["NYSE ARCA", "NYSE ARCA", {
          nowrap: !0
        }]
      }
    },
    sector: {
      category: O,
      filterCondition: "select",
      sourceRange: ["Major", "Minor", "Exotic"],
      mutateDisplayValue: function (e) {
        var t, o, r, i;
        for (t = arguments.length,
          o = Array(t > 1 ? t - 1 : 0),
          r = 1; r < t; r++)
          o[r - 1] = arguments[r];
        return i = n(e, o),
          window.t(i)
      }
    },
    index: {
      control: "select",
      isSingle: !0,
      category: O,
      hideSetupColumn: !0,
      groupFilter: !0,
      customFilterCondition: function (e) {
        var t = ie.index.sourceRange.find(function (t) {
          return t.name === e
        });
        return !!t && {
          type: "index",
          values: [t.id]
        }
      }
    },
    industry: {
      control: "select",
      category: O
    },
    country: {
      control: "select",
      category: O
    },
    type: {
      hiddenColumn: !0,
      hideSetupColumn: !0,
      filterCondition: "select",
      category: O,
      rangeTitles: J,
      sortableColumn: !1,
      resettableFilter: !1,
      useDefaultRange: !0,
      defaultRange: ["dr", "fund", "common", "preferred"],
      additionalColumns: ["subtype"],
      mutateDisplayValue: function (e, t) {
        var o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        return "stock" !== e || "common" !== t && "preferred" !== t ? J[e] ? J[e][o ? 1 : 0] : "" : J[t][o ? 1 : 0]
      },
      customFilterCondition: function (e) {
        var t, o, n, r, i, a = {
          dr: [""],
          fund: ["", "etf", "unit", "mutual", "money", "reit", "trust"],
          common: ["common"],
          preferred: ["preferred"]
        };
        if (Array.isArray(e)) {
          for (o in t = !1,
            e)
            "common" !== e[o] && "preferred" !== e[o] || (t = !0);
          if (t) {
            for (i in n = [],
              r = [],
              e)
              "common" === e[i] || "preferred" === e[i] ? n.push("stock") : n.push(e[i]),
              r = r.concat(a[e[i]]);
            return [{
              left: "type",
              operation: "in_range",
              right: n.filter(function (e, t, o) {
                return o.indexOf(e) === t
              })
            }, {
              left: "subtype",
              operation: "in_range",
              right: r.filter(function (e, t, o) {
                return o.indexOf(e) === t
              })
            }]
          }
          return [{
            left: "type",
            operation: "in_range",
            right: e
          }]
        }
        return "common" === e || "preferred" === e ? [{
          left: "type",
          operation: "equal",
          right: "stock"
        }, {
          left: "subtype",
          operation: "equal",
          right: e
        }] : [{
          left: "type",
          operation: "equal",
          right: e
        }]
      }
    },
    market_cap_basic: {
      control: "range",
      formatter: T,
      category: O
    },
    market_cap_calc: {
      control: "range",
      formatter: T,
      category: O
    },
    market_cap_diluted_calc: {
      control: "range",
      formatter: T,
      category: O
    },
    volume: {
      control: "range",
      formatter: T,
      category: O
    },
    average_volume_10d_calc: {
      title: S.quoteFieldTitles.average_volume[0],
      shortTitle: S.quoteFieldTitles.average_volume[1],
      control: "range",
      formatter: T,
      category: O,
      useDefaultTimeInterval: !0
    },
    average_volume_30d_calc: {
      control: "range",
      formatter: T,
      category: O,
      useDefaultTimeInterval: !0
    },
    average_volume_60d_calc: {
      control: "range",
      formatter: T,
      category: O,
      useDefaultTimeInterval: !0
    },
    average_volume_90d_calc: {
      control: "range",
      formatter: T,
      category: O,
      useDefaultTimeInterval: !0
    },
    relative_volume_10d_calc: {
      title: S.quoteFieldTitles.relative_volume[0],
      shortTitle: S.quoteFieldTitles.relative_volume[1],
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: O
    },
    change: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: {
        stock: ["premarket_change", "postmarket_change"],
        default: []
      },
      formatter: E,
      category: P,
      highlightChange: !0
    },
    "change.1": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: {
        stock: ["change", "premarket_change", "postmarket_change"],
        default: []
      },
      formatter: E,
      category: P,
      highlightChange: !0
    },
    "change.5": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: {
        stock: ["change", "premarket_change", "postmarket_change"],
        default: []
      },
      formatter: E,
      category: P,
      highlightChange: !0
    },
    "change.15": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: {
        stock: ["change", "premarket_change", "postmarket_change"],
        default: []
      },
      formatter: E,
      category: P,
      highlightChange: !0
    },
    "change.60": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: {
        stock: ["change", "premarket_change", "postmarket_change"],
        default: []
      },
      formatter: E,
      category: P,
      highlightChange: !0
    },
    "change.240": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: {
        stock: ["change", "premarket_change", "postmarket_change"],
        default: []
      },
      formatter: E,
      category: P,
      highlightChange: !0
    },
    change_abs: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: F,
      forexFormatter: F,
      category: P,
      highlightChange: !0
    },
    "change_abs.1": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: F,
      forexFormatter: F,
      category: P,
      highlightChange: !0
    },
    "change_abs.5": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: F,
      forexFormatter: F,
      category: P,
      highlightChange: !0
    },
    "change_abs.15": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: F,
      forexFormatter: F,
      category: P,
      highlightChange: !0
    },
    "change_abs.60": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: F,
      forexFormatter: F,
      category: P,
      highlightChange: !0
    },
    "change_abs.240": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: F,
      forexFormatter: F,
      category: P,
      highlightChange: !0
    },
    bid: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      forexFormatter: F,
      category: O,
      mutateDisplayValue: function (e) {
        return "<span>" + e + "</span>"
      }
    },
    ask: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      forexFormatter: F,
      category: O,
      mutateDisplayValue: function (e) {
        return "<span>" + e + "</span>"
      }
    },
    open: {
      control: "condition",
      conditionFields: te("open").concat(oe(), "HullMA9"),
      formatter: F,
      forexFormatter: F,
      category: O
    },
    close: {
      title: window.t("Last"),
      shortTitle: window.t("Last"),
      control: "condition",
      conditionFields: {
        stock: te("close").concat("premarket_close", "postmarket_close", oe(), "HullMA9", "BB.upper", "BB.lower", ne()),
        forex: te("close").concat("bid", "ask", oe(), "HullMA9", "BB.upper", "BB.lower", ne()),
        default: te("close").concat(oe(), "BB.upper", "BB.lower", "HullMA9", ne())
      },
      formatter: F,
      forexFormatter: F,
      category: O,
      mutateDisplayValue: function (e) {
        return "<span>" + e + "</span>"
      }
    },
    high: {
      control: "condition",
      conditionFields: te("high").concat(oe(), "HullMA9"),
      formatter: F,
      forexFormatter: F,
      category: O
    },
    low: {
      control: "condition",
      conditionFields: te("low").concat(oe(), "HullMA9"),
      formatter: F,
      forexFormatter: F,
      category: O
    },
    gap: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: E,
      filterFormatter: R,
      category: P,
      highlightChange: !0
    },
    price_earnings_ttm: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    },
    price_sales_ratio: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    },
    return_on_assets: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    },
    return_on_equity: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    },
    debt_to_equity: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      category: N
    },
    current_ratio: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    },
    quick_ratio: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    },
    price_book_fq: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    },
    price_book_ratio: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    },
    price_free_cash_flow_ttm: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    },
    beta_1_year: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      category: P
    },
    operating_margin: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: E,
      filterFormatter: R,
      category: N,
      highlightChange: !0
    },
    earnings_per_share_basic_ttm: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    },
    ebitda: {
      control: "range",
      formatter: T,
      category: N
    },
    change_from_open: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: E,
      filterFormatter: R,
      category: P,
      highlightChange: !0
    },
    change_from_open_abs: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: F,
      forexFormatter: F,
      category: P,
      highlightChange: !0
    },
    "Perf.W": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: E,
      filterFormatter: R,
      category: P,
      highlightChange: !0
    },
    "Perf.1M": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: E,
      filterFormatter: R,
      category: P,
      highlightChange: !0
    },
    "Perf.3M": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: E,
      filterFormatter: R,
      category: P,
      highlightChange: !0
    },
    "Perf.6M": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: E,
      filterFormatter: R,
      category: P,
      highlightChange: !0
    },
    "Perf.Y": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: E,
      filterFormatter: R,
      category: P,
      highlightChange: !0
    },
    "Perf.YTD": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: E,
      filterFormatter: R,
      category: P,
      highlightChange: !0
    },
    "Volatility.W": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: E,
      filterFormatter: R,
      category: P
    },
    "Volatility.M": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: E,
      filterFormatter: R,
      category: P
    },
    "Volatility.D": {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: E,
      filterFormatter: R,
      category: P
    },
    RSI: {
      control: "condition",
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: P,
      displaySignal: !0,
      additionalColumns: ["RSI", "RSI[1]"],
      mutateDisplayValue: v.signalDisplayFunctions.processRSISignal,
      signalComputation: v.signalComputationFunctions.computeRSISignal
    },
    RSI7: {
      control: "condition",
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: P,
      displaySignal: !0,
      additionalColumns: ["RSI7", "RSI7[1]"],
      mutateDisplayValue: v.signalDisplayFunctions.processRSISignal,
      signalComputation: v.signalComputationFunctions.computeRSISignal
    },
    ADX: {
      control: "condition",
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: P,
      displaySignal: !0,
      additionalColumns: ["ADX", "ADX+DI", "ADX-DI", "ADX+DI[1]", "ADX-DI[1]"],
      mutateDisplayValue: v.signalDisplayFunctions.processADXSignal,
      signalComputation: v.signalComputationFunctions.computeADXSignal
    },
    "ADX+DI": {
      control: "condition",
      conditionFields: ["ADX-DI"],
      formatter: A,
      filterFormatter: x,
      category: P
    },
    "ADX-DI": {
      control: "condition",
      conditionFields: ["ADX+DI"],
      formatter: A,
      filterFormatter: x,
      category: P
    },
    ATR: {
      control: "condition",
      conditionFields: [],
      formatter: F,
      category: P
    },
    Mom: {
      control: "condition",
      conditionFields: [],
      formatter: F,
      filterFormatter: x,
      category: P,
      displaySignal: !0,
      additionalColumns: ["Mom", "Mom[1]"],
      mutateDisplayValue: v.signalDisplayFunctions.processMomSignal,
      signalComputation: v.signalComputationFunctions.computeMomSignal
    },
    "High.All": {
      control: "toggle",
      filter: {
        operator: "eless",
        value: "high"
      },
      formatter: A,
      forexFormatter: F,
      category: P
    },
    "Low.All": {
      control: "toggle",
      filter: {
        operator: "egreater",
        value: "low"
      },
      formatter: A,
      forexFormatter: F,
      category: P
    },
    price_52_week_high: {
      control: "toggle",
      filter: {
        operator: "eless",
        value: "high"
      },
      formatter: A,
      forexFormatter: F,
      category: P
    },
    price_52_week_low: {
      control: "toggle",
      filter: {
        operator: "egreater",
        value: "low"
      },
      formatter: A,
      forexFormatter: F,
      category: P
    },
    "High.6M": {
      control: "toggle",
      filter: {
        operator: "eless",
        value: "high"
      },
      formatter: A,
      forexFormatter: F,
      category: P
    },
    "Low.6M": {
      control: "toggle",
      filter: {
        operator: "egreater",
        value: "low"
      },
      formatter: A,
      forexFormatter: F,
      category: P
    },
    "High.3M": {
      control: "toggle",
      filter: {
        operator: "eless",
        value: "high"
      },
      formatter: A,
      forexFormatter: F,
      category: P
    },
    "Low.3M": {
      control: "toggle",
      filter: {
        operator: "egreater",
        value: "low"
      },
      formatter: A,
      forexFormatter: F,
      category: P
    },
    "High.1M": {
      control: "toggle",
      filter: {
        operator: "eless",
        value: "high"
      },
      formatter: A,
      forexFormatter: F,
      category: P
    },
    "Low.1M": {
      control: "toggle",
      filter: {
        operator: "egreater",
        value: "low"
      },
      formatter: A,
      forexFormatter: F,
      category: P
    },
    EMA5: {
      control: "condition",
      conditionFields: te().concat(oe("EMA5")),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["EMA5", "close"],
      mutateDisplayValue: v.signalDisplayFunctions.processMASignal,
      signalComputation: v.signalComputationFunctions.computeMASignal
    },
    EMA10: {
      control: "condition",
      conditionFields: te().concat(oe("EMA10")),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["EMA10", "close"],
      mutateDisplayValue: v.signalDisplayFunctions.processMASignal,
      signalComputation: v.signalComputationFunctions.computeMASignal
    },
    EMA20: {
      control: "condition",
      conditionFields: te().concat(oe("EMA20")),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["EMA20", "close"],
      mutateDisplayValue: v.signalDisplayFunctions.processMASignal,
      signalComputation: v.signalComputationFunctions.computeMASignal
    },
    EMA30: {
      control: "condition",
      conditionFields: te().concat(oe("EMA30")),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["EMA30", "close"],
      mutateDisplayValue: v.signalDisplayFunctions.processMASignal,
      signalComputation: v.signalComputationFunctions.computeMASignal
    },
    EMA50: {
      control: "condition",
      conditionFields: te().concat(oe("EMA50")),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["EMA50", "close"],
      mutateDisplayValue: v.signalDisplayFunctions.processMASignal,
      signalComputation: v.signalComputationFunctions.computeMASignal
    },
    EMA100: {
      control: "condition",
      conditionFields: te().concat(oe("EMA100")),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["EMA100", "close"],
      mutateDisplayValue: v.signalDisplayFunctions.processMASignal,
      signalComputation: v.signalComputationFunctions.computeMASignal
    },
    EMA200: {
      control: "condition",
      conditionFields: te().concat(oe("EMA200")),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["EMA200", "close"],
      mutateDisplayValue: v.signalDisplayFunctions.processMASignal,
      signalComputation: v.signalComputationFunctions.computeMASignal
    },
    SMA5: {
      control: "condition",
      conditionFields: te().concat(oe("SMA5")),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["SMA5", "close"],
      mutateDisplayValue: v.signalDisplayFunctions.processMASignal,
      signalComputation: v.signalComputationFunctions.computeMASignal
    },
    SMA10: {
      control: "condition",
      conditionFields: te().concat(oe("SMA10")),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["SMA10", "close"],
      mutateDisplayValue: v.signalDisplayFunctions.processMASignal,
      signalComputation: v.signalComputationFunctions.computeMASignal
    },
    SMA20: {
      control: "condition",
      conditionFields: te().concat(oe("SMA20")),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["SMA20", "close"],
      mutateDisplayValue: v.signalDisplayFunctions.processMASignal,
      signalComputation: v.signalComputationFunctions.computeMASignal
    },
    SMA30: {
      control: "condition",
      conditionFields: te().concat(oe("SMA30")),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["SMA30", "close"],
      mutateDisplayValue: v.signalDisplayFunctions.processMASignal,
      signalComputation: v.signalComputationFunctions.computeMASignal
    },
    SMA50: {
      control: "condition",
      conditionFields: te().concat(oe("SMA50")),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["SMA50", "close"],
      mutateDisplayValue: v.signalDisplayFunctions.processMASignal,
      signalComputation: v.signalComputationFunctions.computeMASignal
    },
    SMA100: {
      control: "condition",
      conditionFields: te().concat(oe("SMA100")),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["SMA100", "close"],
      mutateDisplayValue: v.signalDisplayFunctions.processMASignal,
      signalComputation: v.signalComputationFunctions.computeMASignal
    },
    SMA200: {
      control: "condition",
      conditionFields: te().concat(oe("SMA200")),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["SMA200", "close"],
      mutateDisplayValue: v.signalDisplayFunctions.processMASignal,
      signalComputation: v.signalComputationFunctions.computeMASignal
    },
    "Stoch.K": {
      control: "condition",
      conditionFields: te().concat(["Stoch.D"]),
      formatter: A,
      category: P,
      displaySignal: !0,
      additionalColumns: ["Stoch.K", "Stoch.D", "Stoch.K[1]", "Stoch.D[1]"],
      mutateDisplayValue: v.signalDisplayFunctions.processStochSignal,
      signalComputation: v.signalComputationFunctions.computeStochSignal
    },
    "Stoch.D": {
      control: "condition",
      conditionFields: te().concat(["Stoch.K"]),
      formatter: A,
      category: P
    },
    "MACD.macd": {
      control: "condition",
      conditionFields: te().concat(["MACD.signal"]),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["MACD.macd", "MACD.signal"],
      mutateDisplayValue: v.signalDisplayFunctions.processMACDSignal,
      signalComputation: v.signalComputationFunctions.computeMACDSignal
    },
    "MACD.signal": {
      control: "condition",
      conditionFields: te().concat(["MACD.macd"]),
      formatter: F,
      category: P
    },
    "Aroon.Up": {
      control: "condition",
      conditionFields: ["Aroon.Down"],
      formatter: A,
      category: P
    },
    "Aroon.Down": {
      control: "condition",
      conditionFields: ["Aroon.Up"],
      formatter: A,
      category: P
    },
    "BB.upper": {
      control: "condition",
      conditionFields: te().concat(["BB.lower", "KltChnl.upper", "KltChnl.lower"]),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["close", "BB.upper"],
      mutateDisplayValue: v.signalDisplayFunctions.processBBSellSignal,
      signalComputation: v.signalComputationFunctions.computeBBSellSignal
    },
    "BB.lower": {
      control: "condition",
      conditionFields: te().concat(["BB.upper", "KltChnl.upper", "KltChnl.lower"]),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["close", "BB.lower"],
      mutateDisplayValue: v.signalDisplayFunctions.processBBBuySignal,
      signalComputation: v.signalComputationFunctions.computeBBBuySignal
    },
    "KltChnl.upper": {
      control: "condition",
      conditionFields: te().concat(["KltChnl.lower", "BB.upper", "BB.lower"]),
      formatter: F,
      category: P
    },
    "KltChnl.lower": {
      control: "condition",
      conditionFields: te().concat(["KltChnl.upper", "BB.upper", "BB.lower"]),
      formatter: F,
      category: P
    },
    "P.SAR": {
      control: "condition",
      conditionFields: te(),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["P.SAR", "open"],
      mutateDisplayValue: v.signalDisplayFunctions.processPSARSignal,
      signalComputation: v.signalComputationFunctions.computePSARSignal
    },
    "Value.Traded": {
      control: "range",
      formatter: T,
      category: O
    },
    MoneyFlow: {
      control: "condition",
      conditionFields: [],
      formatter: A,
      category: P
    },
    ChaikinMoneyFlow: {
      control: "condition",
      conditionFields: [],
      formatter: A,
      category: P
    },
    goodwill: {
      control: "range",
      formatter: T,
      category: N
    },
    net_debt: {
      control: "range",
      formatter: T,
      category: N
    },
    total_debt: {
      control: "range",
      formatter: T,
      category: N
    },
    revenue_per_employee: {
      control: "range",
      formatter: T,
      category: N
    },
    return_on_invested_capital: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: E,
      filterFormatter: R,
      category: N,
      highlightChange: !0
    },
    after_tax_margin: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: E,
      filterFormatter: R,
      category: N,
      highlightChange: !0
    },
    pre_tax_margin: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: E,
      filterFormatter: R,
      category: N,
      highlightChange: !0
    },
    gross_margin: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: E,
      filterFormatter: R,
      category: N,
      highlightChange: !0
    },
    dividends_paid: {
      control: "range",
      formatter: T,
      category: N
    },
    dividend_yield_recent: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: E,
      filterFormatter: R,
      category: N,
      highlightChange: !0
    },
    basic_eps_net_income: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    },
    net_income: {
      control: "range",
      formatter: T,
      category: N
    },
    gross_profit: {
      control: "range",
      formatter: T,
      category: N
    },
    gross_profit_fq: {
      control: "range",
      formatter: T,
      category: N
    },
    number_of_shareholders: {
      control: "range",
      formatter: T,
      category: N
    },
    float_shares_outstanding: {
      control: "range",
      formatter: T,
      category: N
    },
    total_shares_outstanding_fundamental: {
      control: "range",
      formatter: T,
      category: N
    },
    total_shares_outstanding: {
      control: "range",
      formatter: T,
      category: N
    },
    total_shares_diluted: {
      control: "range",
      formatter: T,
      category: N
    },
    total_value_traded: {
      control: "range",
      formatter: T,
      category: N
    },
    total_assets: {
      control: "range",
      formatter: T,
      category: N
    },
    total_current_assets: {
      control: "range",
      formatter: T,
      category: N
    },
    total_revenue: {
      control: "range",
      formatter: T,
      category: N
    },
    dividends_per_share_fq: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    },
    earnings_per_share_diluted_ttm: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    },
    enterprise_value_ebitda_ttm: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    },
    enterprise_value_fq: {
      control: "range",
      formatter: T,
      category: N
    },
    price_revenue_ttm: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    },
    number_of_employees: {
      control: "range",
      formatter: T,
      category: N
    },
    last_annual_eps: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    },
    last_annual_revenue: {
      control: "range",
      formatter: T,
      category: N
    },
    CCI20: {
      control: "condition",
      conditionFields: [],
      formatter: A,
      category: P,
      displaySignal: !0,
      additionalColumns: ["CCI20", "CCI20[1]"],
      mutateDisplayValue: v.signalDisplayFunctions.processCCI20Signal,
      signalComputation: v.signalComputationFunctions.computeCCI20Signal
    },
    "DonchCh20.Upper": {
      control: "condition",
      conditionFields: te().concat(["DonchCh20.Lower"]),
      formatter: F,
      category: P
    },
    "DonchCh20.Lower": {
      control: "condition",
      conditionFields: te().concat(["DonchCh20.Upper"]),
      formatter: F,
      category: P
    },
    HullMA9: {
      control: "condition",
      conditionFields: te().concat(oe("HullMA9")),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["Rec.HullMA9"],
      mutateDisplayValue: v.signalDisplayFunctions.processSimpleSignal,
      signalComputation: v.signalComputationFunctions.computeSimpleSignal
    },
    AO: {
      control: "condition",
      conditionFields: [],
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["AO", "AO[1]"],
      mutateDisplayValue: v.signalDisplayFunctions.processAOSignal,
      signalComputation: v.signalComputationFunctions.computeAOSignal
    },
    "Pivot.M.Classic.Middle": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Classic.R1": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Classic.R2": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Classic.R3": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Classic.S1": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Classic.S2": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Classic.S3": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Fibonacci.Middle": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Fibonacci.R1": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Fibonacci.R2": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Fibonacci.R3": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Fibonacci.S1": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Fibonacci.S2": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Fibonacci.S3": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Camarilla.Middle": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Camarilla.R1": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Camarilla.R2": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Camarilla.R3": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Camarilla.S1": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Camarilla.S2": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Camarilla.S3": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Woodie.Middle": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Woodie.R1": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Woodie.R2": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Woodie.R3": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Woodie.S1": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Woodie.S2": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Woodie.S3": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Demark.Middle": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Demark.R1": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    "Pivot.M.Demark.S1": {
      formatter: A,
      forexFormatter: F,
      category: P,
      align: "right"
    },
    candlestick: {
      alias: "name",
      control: "select",
      category: P,
      sortableColumn: !1,
      additionalColumns: B.map(function (e) {
        return e.key
      }),
      mutateDisplayValue: function (e) {
        var t, o, n, r, i;
        for (t = arguments.length,
          o = Array(t > 1 ? t - 1 : 0),
          n = 1; n < t; n++)
          o[n - 1] = arguments[n];
        for (r = [],
          i = 0; i < B.length; ++i)
          o[i] && r.push(B[i]);
        return r.length ? r.map(function (e) {
          return '<span class="tv-screener-table__pattern_icon apply-common-tooltip common-tooltip-fixed common-tooltip-below common-tooltip-html" data-color-theme="round-shadow" title=\'<div class="tv-screener-table__pattern_tooltip_container">' + e.svg + "<div>" + e.name + "</div></div>'>" + e.svg + "</span>"
        }).join(" ") : '<span class="tv-screener-table__pattern_empty">—</span>'
      },
      range: B.map(function (e) {
        return e.name
      }),
      sourceRange: B,
      customFilterCondition: function (e) {
        return Array.isArray(e) || (e = [e]), {
          left: e.map(function (e) {
            return K(e, B)
          }).join(","),
          operation: "equal",
          right: 1
        }
      }
    },
    update_mode: {
      hiddenColumn: !1,
      hideSetupColumn: !0,
      skipField: !0
    },
    premarket_change: {
      title: window.t("Pre-market Change %"),
      shortTitle: window.t("Pre-market chg %"),
      control: "condition",
      hiddenOperators: re,
      conditionFields: ["change"],
      formatter: E,
      filterFormatter: R,
      category: P,
      highlightChange: !0
    },
    premarket_change_abs: {
      title: window.t("Pre-market Change"),
      shortTitle: window.t("Pre-market chg"),
      control: "condition",
      hiddenOperators: re,
      conditionFields: ["change_abs"],
      formatter: F,
      forexFormatter: F,
      category: P,
      highlightChange: !0
    },
    premarket_change_from_open: {
      title: window.t("Pre-market Change from Open %"),
      shortTitle: window.t("Pre-market chg from Open %"),
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: E,
      filterFormatter: R,
      category: P,
      highlightChange: !0
    },
    premarket_change_from_open_abs: {
      title: window.t("Pre-market Change from Open"),
      shortTitle: window.t("Pre-market chg from Open"),
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: F,
      forexFormatter: F,
      category: P,
      highlightChange: !0
    },
    premarket_close: {
      title: window.t("Pre-market Close"),
      shortTitle: window.t("Pre-market Close"),
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: O
    },
    premarket_gap: {
      title: window.t("Pre-market Gap %"),
      shortTitle: window.t("Pre-market Gap %"),
      control: "condition",
      hiddenOperators: re,
      conditionFields: ["gap"],
      formatter: E,
      filterFormatter: R,
      category: P,
      highlightChange: !0
    },
    premarket_high: {
      title: window.t("Pre-market High"),
      shortTitle: window.t("Pre-market High"),
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: O
    },
    premarket_low: {
      title: window.t("Pre-market Low"),
      shortTitle: window.t("Pre-market Low"),
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: O
    },
    premarket_open: {
      title: window.t("Pre-market Open"),
      shortTitle: window.t("Pre-market Open"),
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: O
    },
    premarket_volume: {
      title: window.t("Pre-market Volume"),
      shortTitle: window.t("Pre-market Volume"),
      control: "range",
      formatter: T,
      category: O
    },
    postmarket_change: {
      title: window.t("Post-market Change %"),
      shortTitle: window.t("Post-market chg %"),
      control: "condition",
      hiddenOperators: re,
      conditionFields: ["change"],
      formatter: E,
      filterFormatter: R,
      category: P,
      highlightChange: !0
    },
    postmarket_change_abs: {
      title: window.t("Post-market Change"),
      shortTitle: window.t("Post-market chg"),
      control: "condition",
      hiddenOperators: re,
      conditionFields: ["change_abs"],
      formatter: F,
      forexFormatter: F,
      category: P,
      highlightChange: !0
    },
    postmarket_close: {
      title: window.t("Post-market Close"),
      shortTitle: window.t("Post-market Close"),
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: O
    },
    postmarket_high: {
      title: window.t("Post-market High"),
      shortTitle: window.t("Post-market High"),
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: O
    },
    postmarket_low: {
      title: window.t("Post-market Low"),
      shortTitle: window.t("Post-market Low"),
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: O
    },
    postmarket_open: {
      title: window.t("Post-market Open"),
      shortTitle: window.t("Post-market Open"),
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: O
    },
    postmarket_volume: {
      title: window.t("Post-market Volume"),
      shortTitle: window.t("Post-market Volume"),
      control: "range",
      formatter: T,
      category: O
    },
    earnings_per_share_forecast_next_fq: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    },
    earnings_per_share_fq: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    },
    earnings_release_date: {
      control: "select",
      isSingle: !0,
      category: N,
      sortable: !1,
      useDefaultRange: !0,
      defaultRange: I.filter(function (e) {
        return -1 !== V.indexOf(e.key)
      }).map(function (e) {
        return e.name
      }),
      sourceRange: I,
      customFilterCondition: j("earnings_release_date"),
      formatter: D
    },
    earnings_release_next_date: {
      control: "select",
      isSingle: !0,
      category: N,
      sortable: !1,
      useDefaultRange: !0,
      defaultRange: I.filter(function (e) {
        return -1 !== q.indexOf(e.key)
      }).map(function (e) {
        return e.name
      }),
      sourceRange: I,
      customFilterCondition: j("earnings_release_next_date"),
      formatter: D
    },
    "Recommend.All": {
      control: "select",
      category: P,
      mutateDisplayValue: v.signalDisplayFunctions.processRecommendSignal,
      signalComputation: v.signalComputationFunctions.computeRecommendSignal,
      useDefaultRange: !0,
      sortable: !1,
      sortSelectedFirst: !1,
      defaultRange: v.recommendsRange,
      customFilterCondition: function (e) {
        return (0,
          v.generateRecommendsRequest)(e, "Recommend.All")
      }
    },
    "Recommend.MA": {
      control: "select",
      category: P,
      mutateDisplayValue: v.signalDisplayFunctions.processRecommendSignal,
      signalComputation: v.signalComputationFunctions.computeRecommendSignal,
      useDefaultRange: !0,
      sortable: !1,
      sortSelectedFirst: !1,
      defaultRange: v.recommendsRange,
      customFilterCondition: function (e) {
        return (0,
          v.generateRecommendsRequest)(e, "Recommend.MA")
      }
    },
    "Recommend.Other": {
      control: "select",
      category: P,
      mutateDisplayValue: v.signalDisplayFunctions.processRecommendSignal,
      signalComputation: v.signalComputationFunctions.computeRecommendSignal,
      useDefaultRange: !0,
      sortable: !1,
      sortSelectedFirst: !1,
      defaultRange: v.recommendsRange,
      customFilterCondition: function (e) {
        return (0,
          v.generateRecommendsRequest)(e, "Recommend.Other")
      }
    },
    "Stoch.RSI.K": {
      control: "condition",
      conditionFields: ["Stoch.RSI.D"],
      formatter: A,
      category: P,
      displaySignal: !0,
      additionalColumns: ["Rec.Stoch.RSI"],
      mutateDisplayValue: v.signalDisplayFunctions.processSimpleSignal,
      signalComputation: v.signalComputationFunctions.computeSimpleSignal
    },
    "Stoch.RSI.D": {
      control: "condition",
      conditionFields: ["Stoch.RSI.K"],
      formatter: A,
      category: P
    },
    "W.R": {
      control: "condition",
      conditionFields: [],
      formatter: A,
      category: P,
      displaySignal: !0,
      additionalColumns: ["Rec.WR"],
      mutateDisplayValue: v.signalDisplayFunctions.processSimpleSignal,
      signalComputation: v.signalComputationFunctions.computeSimpleSignal
    },
    ROC: {
      control: "condition",
      conditionFields: [],
      formatter: A,
      category: P
    },
    BBPower: {
      control: "condition",
      conditionFields: [],
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["Rec.BBPower"],
      mutateDisplayValue: v.signalDisplayFunctions.processSimpleSignal,
      signalComputation: v.signalComputationFunctions.computeSimpleSignal
    },
    UO: {
      control: "condition",
      conditionFields: [],
      formatter: A,
      category: P,
      displaySignal: !0,
      additionalColumns: ["Rec.UO"],
      mutateDisplayValue: v.signalDisplayFunctions.processSimpleSignal,
      signalComputation: v.signalComputationFunctions.computeSimpleSignal
    },
    VWAP: {
      control: "condition",
      conditionFields: te(),
      formatter: F,
      category: P
    },
    VWMA: {
      control: "condition",
      conditionFields: te().concat(oe("VWMA")),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["Rec.VWMA"],
      mutateDisplayValue: v.signalDisplayFunctions.processSimpleSignal,
      signalComputation: v.signalComputationFunctions.computeSimpleSignal
    },
    ADR: {
      control: "condition",
      conditionFields: te(),
      formatter: F,
      category: P
    },
    "Ichimoku.CLine": {
      control: "condition",
      conditionFields: te().concat(ne("Ichimoku.CLine")),
      formatter: F,
      category: P
    },
    "Ichimoku.BLine": {
      control: "condition",
      conditionFields: te().concat(ne("Ichimoku.BLine")),
      formatter: F,
      category: P,
      displaySignal: !0,
      additionalColumns: ["Rec.Ichimoku"],
      mutateDisplayValue: v.signalDisplayFunctions.processSimpleSignal,
      signalComputation: v.signalComputationFunctions.computeSimpleSignal
    },
    "Ichimoku.Lead1": {
      control: "condition",
      conditionFields: te().concat(ne("Ichimoku.Lead1")),
      formatter: F,
      category: P
    },
    "Ichimoku.Lead2": {
      control: "condition",
      conditionFields: te().concat(ne("Ichimoku.Lead2")),
      formatter: F,
      category: P
    },
    elements: {
      hiddenOperators: re,
      title: $.t("Industries"),
      shortTitle: $.t("Industries"),
      control: "condition",
      conditionFields: [],
      formatter: x,
      category: O
    },
    basic_elements: {
      hiddenOperators: re,
      title: $.t("Stocks"),
      shortTitle: $.t("Stocks"),
      control: "condition",
      conditionFields: [],
      formatter: x,
      category: O
    },
    dps_common_stock_prim_issue_fy: {
      control: "condition",
      hiddenOperators: re,
      conditionFields: [],
      formatter: A,
      filterFormatter: x,
      category: N
    }
  },