package eubr.atmosphere.tma.utils;

/**
 * Used to provide privacy score attributes
 * 
 * @author JorgeLuiz
 */
public class PrivacyScore implements Score {

	private Double score;
	private Integer configurationProfileId;
	private Integer attributeId;
	private Double threshold;
    private int metricId;
    private int resourceId;
    private long valueTime;

	public PrivacyScore(Integer configurationProfileId, Integer attributeId, Double score, Double threshold) {
		super();
		this.score = score;
		this.configurationProfileId = configurationProfileId;
		this.attributeId = attributeId;
		this.threshold = threshold;
	}

	@Override
	public Double getScore() {
		return this.score;
	}

	public void setScore(Double score) {
		this.score = score;
	}
	
	public Integer getConfigurationProfileId() {
		return configurationProfileId;
	}

	public void setConfigurationProfileId(Integer configurationProfileId) {
		this.configurationProfileId = configurationProfileId;
	}

	public Integer getAttributeId() {
		return attributeId;
	}

	public void setAttributeId(Integer attributeId) {
		this.attributeId = attributeId;
	}

	public Double getThreshold() {
		return threshold;
	}

	public void setThreshold(Double threshold) {
		this.threshold = threshold;
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
