input length = 20;
input price  = OHLC4;

def v  = volume;
def pD = if   price - price[1] != 0
         then price - price[1]
         else pD[1];
def pvD = AbsValue(v - v[1]) / pD;

script Scale {
    input c = 0;
    input Min = 0;
    input Max = 1;
    def hh = HighestAll(c);
    def ll = LowestAll(c);
    plot Range = (((Max - Min) * (c - ll)) /  (hh - ll)) + Min;
}

plot 
nPVD = Average(scale(pvd, Lowest(price, length), Highest(price, length)), 2);
nPVD.SetDefaultColor(Color.Cyan);

assignPriceColor(if   price < nPVD 
                 then Color.DownTick
                 else Color.UpTick);
