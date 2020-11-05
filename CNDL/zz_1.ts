# ZZ1

input showBubblesChange = no;   # Price Change between Zigzags
input showBubblesPrice = no;    # Price at Zigzag High/Low
input showBubblesBarCount = no; # Bar Count between Zigzags
input showBubblesVolume = no;   # Volume at Zigzag Reversals

input BubbleOffset = .0005;
input PercentAmount = .01;
input RevAmount = .05;
input ATRreversal = 3.0;
input ATRlength = 5;

def zz = ZigZagHighLow("price h" = high, "price l" = low, "percentage reversal" = PercentAmount,
"absolute reversal" = RevAmount, "atr length" = ATRlength, "atr reversal" = ATRreversal);

def ReversalAmount = if (close * PercentAmount / 100) > Max(RevAmount < ATRreversal * reference ATR(ATRlength), RevAmount)
                     then (close * PercentAmount / 100)
                     else if RevAmount < ATRreversal * reference ATR(ATRlength)
                          then ATRreversal * reference ATR(ATRlength)
                          else RevAmount;

def zzSave = if !IsNaN(zz) then zz else GetValue(zzSave, 1);
def chg = (if zzSave == high then high else low) - GetValue(zzSave, 1);
def isUp = chg >= 0;
def isConf = AbsValue(chg) >= ReversalAmount or (IsNaN(GetValue(zz, 1)) and GetValue(isConf, 1));

def xxHigh = if zzSave == high then high else xxHigh[1];
def chgHigh = high - xxHigh[1];
def xxLow = if zzSave == low then low else xxLow[1];
def chgLow = low - xxLow[1];

def zzCount = if zzSave[1] != zzSave then 1 else if zzSave[1] == zzSave then zzCount[1] + 1 else 0;
def zzCountHiLo = if zzCountHiLo[1] == 0 and (zzSave == high or zzSave == low) then 1
                  else if zzSave == high or zzSave == low then zzCountHiLo[1] + 1
                  else zzCountHiLo[1];
def zzHiLo = if zzSave == high or zzSave == low then zzCountHiLo else zzCountHiLo + 1;
def zzCountHigh = if zzSave == high then zzCount[1] else Double.NaN;
def zzCountLow  = if zzSave == low then zzCount[1] else Double.NaN;

def vol = if BarNumber() == 0 then 0 else volume + vol[1];
def vol1 = if BarNumber() == 1 then volume else vol1[1];
def xxVol = if zzSave == high or zzSave == low then TotalSum(volume) else xxVol[1];
def chgVol =  if xxvol - xxVol[1] + vol1 == vol then vol else xxVol - xxVol[1];

AddLabel(BarNumber() != 1, (if isConf then "Confirmed " else "Unconfirmed ") + "ZigZag: " + chg + "  ATRrev " + Round(reference ATR(ATRlength) * ATRreversal, 2) + "  RevAmt " + Round(ReversalAmount, 2), if !isConf then Color.Dark_Orange else if isUp then Color.Green else Color.Red);

plot zzp = if isUp <= 1 then zz else Double.NaN;
zzp.AssignValueColor(if isUp then Color.Green else if !isUp then Color.Red else Color.Dark_Orange);
zzp.SetStyle(Curve.FIRM);
zzp.EnableApproximation();
zzp.HideBubble();

AddChartBubble(showBubblesChange and !IsNaN(zz) and BarNumber() != 1, if isUp then high * (1 + BubbleOffset) else low * (1 - BubbleOffset), "$" + Round(chg, 2), if isUp and chgHigh > 0 then Color.Green else if isUp and chgHigh < 0 then Color.Red else if isUp then Color.Yellow else if !isUp and chgLow > 0 then Color.Green else if !isUp and chgLow < 0 then Color.Red else Color.Yellow, isUp);

AddChartBubble(showBubblesPrice and !IsNaN(zz) and BarNumber() != 1, if isUp then high * (1 + BubbleOffset) else low * (1 - BubbleOffset), if isUp then "$" + high else "$" + low, if isUp and chgHigh > 0 then Color.Green else if isUp and chgHigh < 0 then Color.Red else if isUp then Color.Yellow else if !isUp and chgLow > 0 then Color.Green else if !isUp and chgLow < 0 then Color.Red else Color.Yellow, isUp);

AddChartBubble(showBubblesBarCount and !IsNaN(zz) and BarNumber() != 1, if isUp then high * (1 + BubbleOffset) else low * (1 - BubbleOffset), if zzSave == high then zzCountHigh else zzCountLow, if isUp and chgHigh > 0 then Color.Green else if isUp and chgHigh < 0 then Color.Red else if isUp then Color.Yellow else if !isUp and chgLow > 0 then Color.Green else if !isUp and chgLow < 0 then Color.Red else Color.Yellow, if isUp then yes else no);

AddChartBubble(showBubblesVolume and !IsNaN(zz) and BarNumber() != 1, if isUp then high * (1 + bubbleoffset) else low * (1 - bubbleoffset), chgVol, if isUp and chghigh > 0 then Color.Green else if isUp and chghigh < 0 then Color.Red else if isUp then Color.Yellow else if !isUp and chglow > 0 then Color.Green else if !isUp and chglow < 0 then Color.Red else Color.Yellow, if isUp then yes else no);
