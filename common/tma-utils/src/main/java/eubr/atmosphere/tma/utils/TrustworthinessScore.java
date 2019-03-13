package eubr.atmosphere.tma.utils;

public class TrustworthinessScore implements Score {

    private Double score;
    private ResourceConsumptionScore resourceConsumptionScore; 
    private PerformanceScore performanceScore;
    private Integer podCount;
    private long timestamp;
    
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
                + ", timestamp=" + timestamp
                + "]";
    }

    private void calculateScore() {
        if (this.getPodCount() == 0) {
            this.score = 0.0;
        } else {
            this.score = resourceConsumptionScore.getScore() / this.getPodCount();

            if (performanceScore.getScore() > 0.0)
                this.score = 0.4 * this.score + 0.6 * performanceScore.getScore();
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

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public ResourceConsumptionScore getResourceConsumptionScore() {
        return this.resourceConsumptionScore;
    }

    public PerformanceScore getPerformanceScore() {
        return this.performanceScore;
    }
}
