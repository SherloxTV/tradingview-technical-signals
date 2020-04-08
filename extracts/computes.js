{
  computeMASignal = function (e, t) {
    var o = n.NEUTRAL;
    return e < t && (o = n.BUY),
      e > t && (o = n.SELL),
      o
  },
  computeRSISignal= function (e, t) {
    var o = n.NEUTRAL;
    return e < 30 && t > e && (o = n.BUY),
      e > 70 && t < e && (o = n.SELL),
      o
  },
  computeStochSignal= function (e, t, o, r) {
    var i = n.NEUTRAL;
    return e < 20 && t < 20 && e > t && o < r && (i = n.BUY),
      e > 80 && t > 80 && e < t && o > r && (i = n.SELL),
      i
  },
  computeCCI20Signal= function (e, t) {
    var o = n.NEUTRAL;
    return e < -100 && e > t && (o = n.BUY),
      e > 100 && e < t && (o = n.SELL),
      o
  },
  computeADXSignal= function (e, t, o, r, i) {
    var a = n.NEUTRAL;
    return e > 20 && r < i && t > o && (a = n.BUY),
      e > 20 && r > i && t < o && (a = n.SELL),
      a
  },
  computeAOSignal= function (e, t) {
    var o = n.NEUTRAL;
    return (e > 0 && t < 0 || e > 0 && t > 0 && e > t) && (o = n.BUY),
      (e < 0 && t > 0 || e < 0 && t < 0 && e < t) && (o = n.SELL),
      o
  },
  computeMomSignal= function (e, t) {
    var o = n.NEUTRAL;
    return e < t && (o = n.BUY),
      e > t && (o = n.SELL),
      o
  },
  computeMACDSignal= function (e, t) {
    var o = n.NEUTRAL;
    return e > t && (o = n.BUY),
      e < t && (o = n.SELL),
      o
  },
  computeBBBuySignal= function (e, t) {
    var o = n.NEUTRAL;
    return e < t && (o = n.BUY),
      o
  },
  computeBBSellSignal= function (e, t) {
    var o = n.NEUTRAL;
    return e > t && (o = n.SELL),
      o
  },
  computePSARSignal= function (e, t) {
    var o = n.NEUTRAL;
    return e < t && (o = n.BUY),
      e > t && (o = n.SELL),
      o
  },
  computeRecommendSignal= function (e) {
    var t = void 0;
    return e >= -1 && e < -.5 && (t = n.STRONG_SELL),
      e >= -.5 && e < 0 && (t = n.SELL),
      0 === e && (t = n.NEUTRAL),
      e > 0 && e <= .5 && (t = n.BUY),
      e > .5 && e <= 1 && (t = n.STRONG_BUY),
      t
  },
  computeSimpleSignal= function (e) {
    var t = n.NEUTRAL;
    return -1 === e && (t = n.SELL),
      1 === e && (t = n.BUY),
      t
  }
}