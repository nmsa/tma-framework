package eubr.atmosphere.tma.utils;

public class PerformanceScore implements Score {

    public static final Double MAX_THROUGHPUT = 575.00;
    public static final Double MAX_RESPONSE_TIME = 150.00;

    // Values used for the z-normalization
    public static final Double MEAN_THROUGHPUT = 206.4624;
    public static final Double STD_DEV_THROUGHPUT = 197.0407;
    public static final Double MEAN_RESPONSE_TIME = 38.6027;
    public static final Double STD_RESPONSE_TIME = 209.7015;

    private Double score;
    private Double throughput;
    private Double responseTime;

    public PerformanceScore() {
        super();
        this.throughput = 0.0;
        this.responseTime = 0.0;
    }

    public Double getThroughput() {
        return throughput;
    }

    public void setThroughput(Double throughput) {
        this.throughput = throughput;
    }

    public Double getResponseTime() {
        return responseTime;
    }

    public void setResponseTime(Double responseTime) {
        this.responseTime = responseTime;
    }
    
    @Override
    public String toString() {
        return "Score [throughput: " + this.getThroughput() +
              ", responseTime: " + this.getResponseTime() + "]";
    }

    @Override
    public Double getScore() {
        Double a5 = (this.getThroughput() - MEAN_THROUGHPUT) / STD_DEV_THROUGHPUT;
        Double a6 = (this.getResponseTime() - MEAN_RESPONSE_TIME) / STD_RESPONSE_TIME;
        this.score = 0.5 * a5 - 0.5 * a6;
        return this.score;
    }

    // this is the old version, which uses the maximum values to normalize.
    public Double getScoreMinMaxNormalization() {
        Double a5 = this.getThroughput() / MAX_THROUGHPUT;
        Double a6 = this.getResponseTime() / MAX_RESPONSE_TIME;

        // This operation transforms the response time into a benefit attribute
        // as it is a cost attribute by default
        a6 = 1.0 - a6;

        this.score = 0.5 * a5 + 0.5 * a6;
        
        return this.score;
    }
}
