package eubr.atmosphere.tma.utils;

public class TrustworthinessScore implements Score {

    private Double score;
    private ResourceConsumptionScore resourceConsumptionScore; 
    private PerformanceScore performanceScore;
    private Integer podCount;
    private int metricId;
    private int resourceId;
    private long valueTime;
    
    public TrustworthinessScore(ResourceConsumptionScore resourceConsumptionPodScore, 
            PerformanceScore performanceScore) {
        this.resourceConsumptionScore = resourceConsumptionPodScore;
        this.performanceScore = performanceScore;
        this.podCount = 0;
        this.score = 0.0;
    }
    
    @Override
    public String toString() {
        this.calculateScore();
        return "TrustworthinessScore [score=" + score
                + ", resourceConsumptionScore=" + resourceConsumptionScore
                + ", performanceScore=" + performanceScore
                + ", podCount=" + podCount
                + ", valueTime=" + valueTime
                + "]";
    }

    private void calculateScore() {
        if (this.getPodCount() == 0) {
            this.score = 0.0;
        } else {
            this.score = resourceConsumptionScore.getScore() / this.getPodCount();

            if (performanceScore.getScore() > 0.0)
                this.score = 0.4 * (1 - this.score) + 0.6 * performanceScore.getScore();
        }
    }

    @Override
    public Double getScore() {
        return this.score;
    }

    public Integer getPodCount() {
        return podCount;
    }

    public void setPodCount(Integer podCount) {
        this.podCount = podCount;
    }

    public ResourceConsumptionScore getResourceConsumptionScore() {
        return this.resourceConsumptionScore;
    }

    public PerformanceScore getPerformanceScore() {
        return this.performanceScore;
    }

	@Override
	public long getValueTime() {
		return this.valueTime;
	}

	public void setValueTime(long valueTime) {
		this.valueTime = valueTime;
	}

	@Override
	public int getResourceId() {
		return this.resourceId;
	}

	public void setResourceId(int resourceId) {
		this.resourceId = resourceId;
	}
	
	@Override
	public int getMetricId() {
		return this.metricId;
	}

	public void setMetricId(int metricId) {
		this.metricId = metricId;
	}
}
