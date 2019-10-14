package eubr.atmosphere.tma.data;

public class MetricData {

    private int metricId;
    private long valueTime;
    
    public int getMetricId() {
        return metricId;
    }
    public void setMetricId(int metricId) {
        this.metricId = metricId;
    }

    public long getValueTime() {
        return valueTime;
    }

    public void setValueTime(long valueTime) {
        this.valueTime = valueTime;
    }
}
