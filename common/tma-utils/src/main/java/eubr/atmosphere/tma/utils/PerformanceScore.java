package eubr.atmosphere.tma.utils;

public class PerformanceScore implements Score {

    public static final Double MAX_THROUGHPUT = 575.00;
    public static final Double MAX_RESPONSE_TIME = 150.00;

    // Values used for the z-normalization
    public static final Double MEAN_THROUGHPUT = 202.2773;
    public static final Double STD_DEV_THROUGHPUT = 204.1939;
    public static final Double MEAN_RESPONSE_TIME = 16.2114;
    public static final Double STD_RESPONSE_TIME = 4.8114;

    private Double score;
    private Double throughput;
    private Double responseTime;
    private Double demand;
    private Double rateRequestUnderContracted;

    public PerformanceScore() {
        super();
        this.throughput = 0.0;
        this.responseTime = 0.0;
        this.demand = 0.0;
        this.rateRequestUnderContracted = 0.0;
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

    public Double getDemand() {
        return demand;
    }

    public void setDemand(Double demand) {
        this.demand = demand;
    }

    public Double getRateRequestUnderContracted() {
        return rateRequestUnderContracted;
    }

    public void setRateRequestUnderContracted(Double rateRequestUnderContracted) {
        this.rateRequestUnderContracted = rateRequestUnderContracted;
    }
    
    @Override
    public String toString() {
        return "Score [throughput: " + this.getThroughput() +
              ", responseTime: " + this.getResponseTime() +
              ", demand: " + this.getDemand() +
              ", rateRequestUnderContracted: " + this.getRateRequestUnderContracted() + "]";
    }

    public Double getScoreZNorm() {
        Double a5 = (this.getThroughput() - MEAN_THROUGHPUT) / STD_DEV_THROUGHPUT;
        Double a6 = (this.getResponseTime() - MEAN_RESPONSE_TIME) / STD_RESPONSE_TIME;
        this.score = 0.5 * a5 - 0.5 * a6;
        return this.score;
    }

    // this is the old version, which uses the maximum values to normalize.
    @Override
    public Double getScore() {
        Double a5 = this.getThroughput() / MAX_THROUGHPUT;
        Double a6 = this.getResponseTime() / MAX_RESPONSE_TIME;

        // This operation transforms the response time into a benefit attribute
        // as it is a cost attribute by default
        a6 = 1.0 - a6;

        this.score = 0.5 * a5 + 0.5 * a6;
        
        return this.score;
    }

	@Override
	public long getValueTime() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getMetricId() {
		// TODO Auto-generated method stub
		return 0;
	}
}
