package eubr.atmosphere.tma.utils;

/**
 * Used to provide privacy score attributes
 * 
 * @author JorgeLuiz
 */
public class PrivacyScore implements Score {

	private Integer configurationProfileId;
	private Integer attributeId;
	private Double score;
	private Double threshold;

	public PrivacyScore(Integer configurationProfileId, Integer attributeId, Double score, Double threshold) {
		super();
		this.configurationProfileId = configurationProfileId;
		this.attributeId = attributeId;
		this.score = score;
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
	
}
