#wizard text: Inputs: length:
#wizard input: length
#wizard text: trend setup:
#wizard input: trendSetup

input length = 20;
input trendSetup = 3;

plot Bullish = IsDescending(open, trendSetup)[1] and
    IsLongBlack(length)[1] and
    IsLongWhite(length) and
    open > close[1] and
    open < open[1] and
    close > open[1];

Bullish.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
Bullish.SetDefaultColor(GetColor(8));
Bullish.SetLineWeight(2);
