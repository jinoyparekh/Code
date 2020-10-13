# MACDr

declare lower;

input fastLength = 12;
input slowLength = 26;
input MACDLength = 9;
input averageType = AverageType.EXPONENTIAL;
input showBreakoutSignals = no;

plot Value = MovingAverage(averageType, close, fastLength) - MovingAverage(averageType, close, slowLength);
plot Avg = MovingAverage(averageType, Value, MACDLength);

plot Diff = Value - Avg;
plot ZeroLine = 0;

plot UpSignal = if Diff crosses above ZeroLine then ZeroLine else Double.NaN;
plot DownSignal = if Diff crosses below ZeroLine then ZeroLine else Double.NaN;

UpSignal.SetHiding(!showBreakoutSignals);
DownSignal.SetHiding(!showBreakoutSignals);

Value.SetDefaultColor(GetColor(1));
Avg.SetDefaultColor(GetColor(8));
Diff.SetDefaultColor(GetColor(5));
Diff.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Diff.SetLineWeight(3);
Diff.DefineColor("Positive and Up", Color.GREEN);
Diff.DefineColor("Positive and Down", Color.DARK_GREEN);
Diff.DefineColor("Negative and Down", Color.RED);
Diff.DefineColor("Negative and Up", Color.DARK_RED);
Diff.AssignValueColor(if Diff >= 0 then if Diff > Diff[1] then Diff.color("Positive and Up") else Diff.color("Positive and Down") else if Diff < 

Diff[1] then Diff.color("Negative and Down") else Diff.color("Negative and Up"));
ZeroLine.SetDefaultColor(GetColor(0));
UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);

def buy = Diff crosses above 0;
def sell = Diff crosses below 0;
plot buySignal = if buy then 0 else Double.NaN;
plot sellSignal = if sell then 0 else Double.NaN;

buySignal.SetDefaultColor(Color.Cyan);
buySignal.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
buySignal.SetLineWeight(3);
buySignal.HideBubble();

sellSignal.SetDefaultColor(Color.Yellow);
sellSignal.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
sellSignal.SetLineWeight(3);
sellSignal.HideBubble();
