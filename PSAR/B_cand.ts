#wizard text: Inputs: length:
#wizard input: length
#wizard text: trend setup:
#wizard input: trendSetup

input length = 20;
input trendSetup = 3;

plot Bearish = IsAscending(open, trendSetup)[1] and
    IsLongWhite(length)[1] and
    IsLongBlack(length) and
    open < close[1] and
    open > open[1] and
    close < open[1];

Bearish.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
Bearish.SetDefaultColor(GetColor(1));
Bearish.SetLineWeight(2);
