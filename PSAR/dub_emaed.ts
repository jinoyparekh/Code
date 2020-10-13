# dub_emaed

input Hprice = high;
input Lprice = low;
input price = close;
input Hlength = 50;
input Llength = 50;
input Hdisplace = 0;
input Ldisplace = 0;

#   EMA of HIGHS
plot HAvg = MovAvgExponential(Hprice[-Hdisplace], Hlength);

HAvg.SetDefaultColor(Color.WHITE);
HAvg.SetLineWeight(5);
HAvg.SetPaintingStrategy(PaintingStrategy.LINE_VS_POINTS);
HAvg.SetStyle(Curve.FIRM);
HAvg.HideBubble();
HAvg.HideTitle();

HAvg.AssignValueColor(if HAvg< HAvg[1] then Color.VIOLET else (if HAvg == HAvg[1] then Color.YELLOW else Color.YELLOW));

#   EMA of LOWS
plot LAvg = MovAvgExponential(Lprice[-Ldisplace], LLength);

LAvg.SetDefaultColor(Color.WHITE);
LAvg.SetLineWeight(5);
LAvg.SetPaintingStrategy(PaintingStrategy.LINE_VS_POINTS);
LAvg.SetStyle(Curve.FIRM);
LAvg.HideBubble();
LAvg.HideTitle();

LAvg.AssignValueColor(if LAvg< LAvg[1] then Color.VIOLET else (if LAvg == LAvg[1] then Color.YELLOW else Color.YELLOW));

#   Crosses for SES
#   SES = Standard Entry Signal

#   Cross above High Average
def CrossUp = if price > HAvg AND price[1] < HAvg then 1 else 0;
Plot SESup = if CrossUp then high else double.nan;

SESup.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
SESup.SetLineWeight(3);
SESup.SetDefaultColor(color.YELLOW);
SESup.HideBubble();
SESup.HideTitle();

#   Cross above Low Average
def CrossDn = if price < Lavg AND price[1] > LAvg then 1 else 0;
Plot SESdn = if CrossDn then low else double.nan;

SESdn.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
SESdn.SetLineWeight(3);
SESdn.SetDefaultColor(color.VIOLET);
SESdn.HideBubble();
SESdn.HideTitle();

#   Aggregation Period to 20 min
def agg = AggregationPeriod.TWENTY_MIN;
def data = close(period = agg);

#   2 EMAs
def BDfastEMA=ExpAverage(DATA,20);
def BDslowEMA=ExpAverage(DATA,100);

#   EMA20 crossing ABOVE EMA100
def UpCross = if BDfastEMA > BDslowEma AND BDfastEMA[1] < BDslowEMA then 1 else 0;
Plot BDup = if UpCross then high else double.nan;

BDup.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BDup.SetLineWeight(5);
BDup.SetDefaultColor(color.WHITE);
BDup.HideBubble();
BDup.HideTitle();

#   EMA20 crossing BELOW EMA100
def DnCross = if BDfastEMA < BDslowEma AND BDfastEMA[1] > BDslowEMA then 1 else 0;
Plot BDdn = if DnCross then low else double.nan;

BDdn.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
BDdn.SetLineWeight(5);
BDdn.SetDefaultColor(color.WHITE);
BDdn.HideBubble();
BDdn.HideTitle();
