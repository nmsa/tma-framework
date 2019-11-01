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
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getResourceId() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getMetricId() {
		// TODO Auto-generated method stub
		return 0;
	}
	
}
