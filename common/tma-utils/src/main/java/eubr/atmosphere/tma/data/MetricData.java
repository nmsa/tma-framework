package eubr.atmosphere.tma.data;

public class MetricData {

    private int metricId;
    private long valueTime;
    private int resourceId;
    
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

    public int getResourceId() {
        return resourceId;
    }

    public void setResourceId(int resourceId) {
        this.resourceId = resourceId;
    }
}
