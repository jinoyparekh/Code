# Area between red and green horizontal plot lines (gray continuous cloud plot) represents body of trend. Area above and below red and green horizontal  plot lines represents tail accumulation and distribution. Price will be more volitile in tails. Trading at signals is good for quick scalping trades.

input n = 8;
input averageType = AverageType.WILDERS;
input upper = 90;
input lower = 10;
input signals = yes;

def h = high;
def l = low;
def c = close;
def x = barNumber();
def nan = double.nan;
script Range
    {
     input c = close;
     input n = 8;
     def Min = lowest(close, n);
     def Max = highest(close, n);
     def hh = Highest(c, n);
     def ll = Lowest(c, n);
     plot R = (((Max - Min) * (c - ll)) /  (hh - ll)) + Min;
    }
def a = close;
def b = CompoundValue(1, b[1] + (a-b[1]) / (n * Power(a/b[1], 4)), a);
def Avg = MovingAverage(averageType, b-b[1], n);
def AbsAvg = MovingAverage(averageType, AbsValue(b-b[1]), n);
def R = Avg / AbsAvg;
def Lpivot;
def Lbar;
def Hpivot;
def Hbar;
if 50 * (R + 1) crosses below lower
    {
     Lpivot = h;
     Lbar = x;
    }
else
    {
     Lpivot = Lpivot[1];
     Lbar = Lbar[1];
    }
if 50 * (R + 1) crosses above upper
    {
     Hpivot = l;
     Hbar = x;
    }
else
    {
     Hpivot = Hpivot[1];
     Hbar = Hbar[1];
    }
plot st = Range(50 * (R + 1), n);
     st.SetLineWeight(2);
     st.AssignValueColor(if 50 * (R + 1) < lower
                         then color.red
                         else if 50 * (R + 1) > upper
                         then color.green
                         else color.light_gray);
     st.HideBubble();
     st.HideTitle();
plot lp = if x >= highestAll(Lbar)
          then highestAll(if isNaN(c[-1])
                          then Lpivot
                          else nan)
          else nan;
     lp.SetLineWeight(2);
     lp.SetDefaultColor(Color.Green);
     lp.HideBubble();
     lp.HideTitle();
plot hp = if x >= highestAll(Hbar)
          then highestAll(if isNaN(c[-1])
                          then Hpivot
                          else nan)
          else nan;
     hp.SetlineWeight(2);
     hp.SetDefaultColor(Color.Red);
     hp.HideBubble();
     hp.HideTitle();
addCloud(lp, st, color.light_red, color.gray);
addCloud(st, hp, color.light_green, color.gray);
plot upSignal = if signals and
                   50 * (R + 1) crosses above lower
                then l - (3*tickSize())
                else nan;
     upSignal.SetPaintingStrategy(PaintingStrategy.Arrow_UP);
     upSignal.SetLineWeight(3);
     upSignal.SetDefaultColor(Color.Green);
     upSignal.HideBubble();
     upSignal.HideTitle();
plot up2Signal = if signals and
                   50 * (R + 1) crosses above upper
                then l - (5*tickSize())
                else nan;
     up2Signal.SetPaintingStrategy(PaintingStrategy.Arrow_UP);
     up2Signal.SetLineWeight(1);
     up2Signal.SetDefaultColor(Color.Cyan);
     up2Signal.HideBubble();
     up2Signal.HideTitle();
plot dnSignal = if signals and
                   50 * (R + 1) crosses below upper
                then h + (3*tickSize())
                else nan;
     dnSignal.SetPaintingStrategy(PaintingStrategy.Arrow_DOWN);
     dnSignal.SetLineWeight(3);
     dnSignal.SetDefaultColor(Color.Red);
     dnSignal.HideBubble();
     dnSignal.HideTitle();
plot dn2Signal = if signals and
                   50 * (R + 1) crosses below lower
                then h + (5*tickSize())
                else nan;
     dn2Signal.SetPaintingStrategy(PaintingStrategy.Arrow_DOWN);
     dn2Signal.SetLineWeight(1);
     dn2Signal.SetDefaultColor(Color.Magenta);
     dn2Signal.HideBubble();
     dn2Signal.HideTitle();
