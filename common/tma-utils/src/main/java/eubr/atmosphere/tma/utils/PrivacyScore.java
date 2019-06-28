package eubr.atmosphere.tma.utils;

import java.util.Date;

public class PrivacyScore implements Score {

	private Double score;
	private Integer configurationProfileId;
	private Integer attributeId;
	private Double k;
	private Double instanceId;
	private Double threshold;
	private Date timestamp;
	
	public PrivacyScore(Double score, Integer configurationProfileId, Integer attributeId, Double k, Double instanceId, Date timestamp) {
		super();
		this.score = score;
		this.configurationProfileId = configurationProfileId;
		this.attributeId = attributeId;
		this.k = k;
		this.instanceId = instanceId;
		this.timestamp = timestamp;
	}

	@Override
	public Double getScore() {
		return score;
	}

	@Override
	public String toString() {
		return "PrivacyScore [score=" + score + ", configurationProfileId=" + configurationProfileId + ", attributeId="
				+ attributeId + ", k=" + k + ", instanceId=" + instanceId + ", threshold=" + threshold + ", timestamp="
				+ timestamp + "]";
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
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

	public Double getK() {
		return k;
	}

	public void setK(Double k) {
		this.k = k;
	}

	public Double getInstanceId() {
		return instanceId;
	}

	public void setInstanceId(Double instanceId) {
		this.instanceId = instanceId;
	}

	public Double getThreshold() {
		return threshold;
	}

	public void setThreshold(Double threshold) {
		this.threshold = threshold;
	}

}
