package eubr.atmosphere.tma.utils;

import java.util.Date;

/**
 * Used to provide privacy score attributes
 * 
 * @author JorgeLuiz
 */
public class PrivacyScore extends AbstractTrustworthinessScore implements Score {

	private Integer configurationProfileId;
	private Integer attributeId;
	private Double instanceId;
	private Double k;
	private Double threshold;
	private Double score;
	private Date timestamp;

	public PrivacyScore(Integer configurationProfileId, Integer attributeId, Double instanceId, Double score,
			Date timestamp, Integer planId) {
		super();
		this.configurationProfileId = configurationProfileId;
		this.attributeId = attributeId;
		this.instanceId = instanceId;
		this.score = score;
		this.timestamp = timestamp;
		this.planId = planId;
	}

	@Override
	public Double getScore() {
		return score;
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

	public Double getInstanceId() {
		return instanceId;
	}

	public void setInstanceId(Double instanceId) {
		this.instanceId = instanceId;
	}

	public Double getK() {
		return k;
	}

	public void setK(Double k) {
		this.k = k;
	}

	public Double getThreshold() {
		return threshold;
	}

	public void setThreshold(Double threshold) {
		this.threshold = threshold;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	@Override
	public String toString() {
		return "PrivacyScore [score=" + score + ", configurationProfileId=" + configurationProfileId + ", attributeId="
				+ attributeId + ", k=" + k + ", instanceId=" + instanceId + ", threshold=" + threshold + ", timestamp="
				+ timestamp + "]";
	}

	@Override
	public Integer getPlanId() {
		return null;
	}
	
}
