Code:
# Modified PSAR 

declare lower;

input TimeFrame1 = AggregationPeriod.MIN;
input TimeFrame2 = AggregationPeriod.TWO_MIN;
input TimeFrame3 = AggregationPeriod.FIVE_MIN;
input TimeFrame4 = AggregationPeriod.TEN_MIN;
input TimeFrame5 = AggregationPeriod.FIFTEEN_MIN;
input PaintBars = {default "yes", "no"};

def close1 = Close(Period = TimeFrame1);
def close2 = Close(Period = TimeFrame2);
def close3 = Close(Period = TimeFrame3);
def close4 = Close(Period = TimeFrame4);
def close5 = Close(Period = TimeFrame5);

def low1 = Low(Period = TimeFrame1);
def low2 = Low(Period = TimeFrame2);
def low3 = Low(Period = TimeFrame3);
def low4 = Low(Period = TimeFrame4);
def low5 = Low(Period = TimeFrame5);

def high1 = High(Period = TimeFrame1);
def high2 = High(Period = TimeFrame2);
def high3 = High(Period = TimeFrame3);
def high4 = High(Period = TimeFrame4);
def high5 = High(Period = TimeFrame5);

input accelerationFactor = 0.02;
input accelerationLimit = 0.2;

assert(accelerationFactor > 0, "'acceleration factor' must be positive: " + accelerationFactor);
assert(accelerationLimit >= accelerationFactor, "'acceleration limit' (" + accelerationLimit + ") must be greater than or equal to 'acceleration factor' (" + accelerationFactor + ")");

##### Chart Time-frame (Time-frame 1)
def state = {default init, long, short};
def extreme;
def SAR;
def acc;

switch (state[1]) {
case init:
    state = state.long;
    acc = accelerationFactor;
    extreme = high;
    SAR = low;
case short:
    if (SAR[1] < high)
    then {
        state = state.long;
        acc = accelerationFactor;
        extreme = high;
        SAR = extreme[1];
    } else {
        state = state.short;
        if (low < extreme[1])
        then {
            acc = min(acc[1] + accelerationFactor, accelerationLimit);
            extreme = low;
        } else {
            acc = acc[1];
            extreme = extreme[1];
        }
        SAR = max(max(high, high[1]), SAR[1] + acc * (extreme - SAR[1]));
    }
case long:
    if (SAR[1] > low)
    then {
        state = state.short;
        acc = accelerationFactor;
        extreme = low;
        SAR = extreme[1];
    } else {
        state = state.long;
        if (high > extreme[1])
        then {
            acc = min(acc[1] + accelerationFactor, accelerationLimit);
            extreme = high;
        } else {
            acc = acc[1];
            extreme = extreme[1];
        }
        SAR = min(min(low, low[1]), SAR[1] + acc * (extreme - SAR[1]));
    }
}

##### Time-frame 2
def state2 = {default init, long, short};
def extreme2;
def SAR2;
def acc2;

switch (state2[1]) {
case init:
    state2 = state2.long;
    acc2 = accelerationFactor;
    extreme2 = high2;
    SAR2 = low2;
case short:
    if (SAR2[1] < high2)
    then {
        state2 = state2.long;
        acc2 = accelerationFactor;
        extreme2 = high2;
        SAR2 = extreme2[1];
    } else {
        state2 = state2.short;
        if (low2 < extreme2[1])
        then {
            acc2 = min(acc2[1] + accelerationFactor, accelerationLimit);
            extreme2 = low2;
        } else {
            acc2 = acc2[1];
            extreme2 = extreme2[1];
        }
        SAR2 = max(max(high2, high2[1]), SAR2[1] + acc2 * (extreme2 - SAR2[1]));
    }
case long:
    if (SAR2[1] > low2)
    then {
        state2 = state2.short;
        acc2 = accelerationFactor;
        extreme2 = low2;
        SAR2 = extreme2[1];
    } else {
        state2 = state2.long;
        if (high2 > extreme2[1])
        then {
            acc2 = min(acc2[1] + accelerationFactor, accelerationLimit);
            extreme2 = high2;
        } else {
            acc2 = acc2[1];
            extreme2 = extreme2[1];
        }
        SAR2 = min(min(low2, low2[1]), SAR2[1] + acc2 * (extreme2 - SAR2[1]));
    }
}

##### Time-frame 3
def state3 = {default init, long, short};
def extreme3;
def SAR3;
def acc3;

switch (state3[1]) {
case init:
    state3 = state3.long;
    acc3 = accelerationFactor;
    extreme3 = high3;
    SAR3 = low3;
case short:
    if (SAR3[1] < high3)
    then {
        state3 = state3.long;
        acc3 = accelerationFactor;
        extreme3 = high3;
        SAR3 = extreme3[1];
    } else {
        state3 = state3.short;
        if (low3 < extreme3[1])
        then {
            acc3 = min(acc3[1] + accelerationFactor, accelerationLimit);
            extreme3 = low3;
        } else {
            acc3 = acc3[1];
            extreme3 = extreme3[1];
        }
        SAR3 = max(max(high3, high3[1]), SAR3[1] + acc3 * (extreme3 - SAR3[1]));
    }
case long:
    if (SAR3[1] > low3)
    then {
        state3 = state3.short;
        acc3 = accelerationFactor;
        extreme3 = low3;
        SAR3 = extreme3[1];
    } else {
        state3 = state3.long;
        if (high3 > extreme3[1])
        then {
            acc3 = min(acc3[1] + accelerationFactor, accelerationLimit);
            extreme3 = high3;
        } else {
            acc3 = acc3[1];
            extreme3 = extreme3[1];
        }
        SAR3 = min(min(low3, low3[1]), SAR3[1] + acc3 * (extreme3 - SAR3[1]));
    }
}

##### Time-frame 4
def state4 = {default init, long, short};
def extreme4;
def SAR4;
def acc4;

switch (state4[1]) {
case init:
    state4 = state4.long;
    acc4 = accelerationFactor;
    extreme4 = high4;
    SAR4 = low4;
case short:
    if (SAR4[1] < high4)
    then {
        state4 = state4.long;
        acc4 = accelerationFactor;
        extreme4 = high4;
        SAR4 = extreme4[1];
    } else {
        state4 = state4.short;
        if (low4 < extreme4[1])
        then {
            acc4 = min(acc4[1] + accelerationFactor, accelerationLimit);
            extreme4 = low4;
        } else {
            acc4 = acc4[1];
            extreme4 = extreme4[1];
        }
        SAR4 = max(max(high4, high4[1]), SAR4[1] + acc4 * (extreme4 - SAR4[1]));
    }
case long:
    if (SAR4[1] > low4)
    then {
        state4 = state4.short;
        acc4 = accelerationFactor;
        extreme4 = low4;
        SAR4 = extreme4[1];
    } else {
        state4 = state4.long;
        if (high4 > extreme4[1])
        then {
            acc4 = min(acc4[1] + accelerationFactor, accelerationLimit);
            extreme4 = high4;
        } else {
            acc4 = acc4[1];
            extreme4 = extreme4[1];
        }
        SAR4 = min(min(low4, low4[1]), SAR4[1] + acc4 * (extreme4 - SAR4[1]));
    }
}

##### time-frame 5
def state5 = {default init, long, short};
def extreme5;
def SAR5;
def acc5;

switch (state5[1]) {
case init:
    state5 = state5.long;
    acc5 = accelerationFactor;
    extreme5 = high5;
    SAR5 = low5;
case short:
    if (SAR5[1] < high5)
    then {
        state5 = state5.long;
        acc5 = accelerationFactor;
        extreme5 = high5;
        SAR5 = extreme5[1];
    } else {
        state5 = state5.short;
        if (low5 < extreme5[1])
        then {
            acc5 = min(acc5[1] + accelerationFactor, accelerationLimit);
            extreme5 = low5;
        } else {
            acc5 = acc5[1];
            extreme5 = extreme5[1];
        }
        SAR5 = max(max(high5, high5[1]), SAR5[1] + acc5 * (extreme5 - SAR5[1]));
    }
case long:
    if (SAR5[1] > low5)
    then {
        state5 = state5.short;
        acc5 = accelerationFactor;
        extreme5 = low5;
        SAR5 = extreme5[1];
    } else {
        state5 = state5.long;
        if (high5 > extreme5[1])
        then {
            acc5 = min(acc5[1] + accelerationFactor, accelerationLimit);
            extreme5 = high5;
        } else {
            acc5 = acc5[1];
            extreme5 = extreme5[1];
        }
        SAR5 = min(min(low5, low5[1]), SAR5[1] + acc5 * (extreme5 - SAR5[1]));
    }
}

##### Plots
plot PSAR = if IsNaN(SAR) then Double.NaN else 1;
PSAR.SetPaintingStrategy(PaintingStrategy.POINTS);
PSAR.SetLineWeight(lineWeight = 3);
PSAR.DefineColor("Buy", GetColor(0));
PSAR.DefineColor("Sell", GetColor(1));
PSAR.AssignValueColor(if state == state.long
    then PSAR.Color("Sell")
    else PSAR.Color("Buy"));

plot PSAR2 = if IsNaN(SAR2) then Double.NaN else 2;
PSAR2.SetPaintingStrategy(PaintingStrategy.POINTS);
PSAR2.SetLineWeight(lineWeight = 3);
PSAR2.DefineColor("Buy", GetColor(0));
PSAR2.DefineColor("Sell", GetColor(1));
PSAR2.AssignValueColor(if state2 == state2.long
    then PSAR2.Color("Sell")
    else PSAR2.Color("Buy"));

plot PSAR3 = if IsNaN(SAR3) then Double.NaN else 3;
PSAR3.SetPaintingStrategy(PaintingStrategy.POINTS);
PSAR3.SetLineWeight(lineWeight = 3);
PSAR3.DefineColor("Buy", GetColor(0));
PSAR3.DefineColor("Sell", GetColor(1));
PSAR3.AssignValueColor(if state3 == state3.long
    then PSAR3.Color("Sell")
    else PSAR3.Color("Buy"));

plot PSAR4 = if IsNaN(SAR4) then Double.NaN else 4;
PSAR4.SetPaintingStrategy(PaintingStrategy.POINTS);
PSAR4.SetLineWeight(lineWeight = 3);
PSAR4.DefineColor("Buy", GetColor(0));
PSAR4.DefineColor("Sell", GetColor(1));
PSAR4.AssignValueColor(if state4 == state4.long
    then PSAR4.Color("Sell")
    else PSAR4.Color("Buy"));

plot PSAR5 = if IsNaN(SAR5) then Double.NaN else 5;
PSAR5.SetPaintingStrategy(PaintingStrategy.POINTS);
PSAR5.SetLineWeight(lineWeight = 3);
PSAR5.DefineColor("Buy", GetColor(0));
PSAR5.DefineColor("Sell", GetColor(1));
PSAR5.AssignValueColor(if state5 == state5.long
    then PSAR5.Color("Sell")
    else PSAR5.Color("Buy"));

def PSAR_TF1 = if state == state.long then 0 else 1;
def PSAR_TF2 = if state2 == state2.long then 0 else 1;
def PSAR_TF3 = if state3 == state3.long then 0 else 1;
def PSAR_TF4 = if state4 == state4.long then 0 else 1;
def PSAR_TF5 = if state5 == state5.long then 0 else 1;


plot MTF_PSAR = 6;
MTF_PSAR.SetPaintingStrategy(PaintingStrategy.SQUARES);
MTF_PSAR.SetLineWeight(lineWeight = 3);
MTF_PSAR.DefineColor("Buy", GetColor(5));
MTF_PSAR.DefineColor("Sell", GetColor(6));
MTF_PSAR.AssignValueColor ( if (PSAR_TF1 + PSAR_TF2 + PSAR_TF3 + PSAR_TF4 + PSAR_TF5) >= 3 then MTF_PSAR.Color("Buy") else MTF_PSAR.Color("Sell"));

AssignPriceColor ( if PaintBars is false and (PSAR_TF1 + PSAR_TF2 + PSAR_TF3 + PSAR_TF4 + PSAR_TF5) >= 3 then MTF_PSAR.Color("Buy") else if PaintBars is false and (PSAR_TF1 + PSAR_TF2 + PSAR_TF3 + PSAR_TF4 + PSAR_TF5) < 3 then MTF_PSAR.Color("Sell") else Color.CURRENT);
