const movingAverages = {
  computeMASignal: function (ma, close) {
    if (ma < close) return n.BUY
    if (ma > close) return n.SELL
    return n.NEUTRAL
  },
}

const oscillators = {
  computeRSISignal: function (rsi7, prevRsi7) {
    if (e < 30 && prevRsi7 > rsi7) return n.BUY
    if (e > 70 && prevRsi7 < rsi7) return n.SELL
    return n.NEUTRAL
  },

  computeStochSignal: function (stochK, stochD, prevStochK, prevStochD) {
    if (stochK < 20 && stochD < 20 && stochK > stochD && prevStochK < prevStochD) return n.BUY
    if (stochK > 80 && stochD > 80 && stochK < stochD && prevStochK > prevStochD) return n.SELL
    return n.NEUTRAL
  },

  computeCCI20Signal: function (cci20, prevCci20) {
    if (cci20 < -100 && cci20 > prevCci20) return n.BUY
    if (cci20 > 100 && cci20 < prevCci20) return n.SELL
    return n.NEUTRAL
  },

  computeADXSignal: function (adx, adxPlusDi, adxMinusDi, prevAdxPlusDi, prevAdxMinuxDi) {
    if (adx > 20 && prevAdxPlusDi < prevAdxMinuxDi && adxPlusDi > adxMinusDi) return n.BUY
    if (adx > 20 && prevAdxPlusDi > prevAdxMinuxDi && adxPlusDi < adxMinusDi) return n.SELL
    return n.NEUTRAL
  },

  computeAOSignal: function (ao, prevAo) {
    if (ao > 0 && prevAo < 0 || ao > 0 && prevAo > 0 && ao > prevAo) return n.BUY
    if (ao < 0 && prevAo > 0 || ao < 0 && prevAo < 0 && ao < prevAo) return n.SELL
    return n.NEUTRAL
  },

  computeMomSignal: function (mom, prevMom) {
    if (mom < prevMom) return n.BUY
    if (mom > prevMom) return n.SELL
    return n.NEUTRAL
  },

  computeMACDSignal: function (macd, macdSignal) {
    if (macd > macdSignal) return n.BUY
    if (macd < macdSignal) return n.SELL
    return n.NEUTRAL
  },

  computeBBSignal: function (close, bbLower, bbUpper) {
    if (close < bbLower) return n.BUY
    if (close > bbUpper) return n.SELL
    return n.NEUTRAL
  },

  computePSARSignal: function (psar, open) {
    if (psar < open) return n.BUY
    if (psar > open) return n.SELL
    return n.NEUTRAL
  }
}

const misc = {
  computeSimpleSignal: function (signal) {
    if (signal === 1) return n.BUY
    if (signal === -1) return n.SELL
    return n.NEUTRAL
  },

  computeRecommendSignal: function (e) {
    if (e >= -1 && e < -0.5) return n.STRONG_SELL
    if (e >= -0.5 && e < 0) return n.SELL
    if (e === 0) return n.NEUTRAL
    if (e > 0 && e <= 0.5) return n.BUY
    if (e > 0.5 && e <= 1) return n.STRONG_BUY
  }
}