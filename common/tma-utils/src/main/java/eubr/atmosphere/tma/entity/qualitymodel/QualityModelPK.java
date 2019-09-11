package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;

import javax.persistence.Embeddable;

/**
 * The primary key class for the QualityModel database table.
 * 
 */
@Embeddable
public class QualityModelPK implements Serializable {

	private static final long serialVersionUID = -7825876313571517420L;

	private int qualityModelId;

	private int metricId;

	public QualityModelPK() {
	}
	public int getQualityModelId() {
		return this.qualityModelId;
	}
	public void setQualityModelId(int qualityModelId) {
		this.qualityModelId = qualityModelId;
	}
	public int getMetricId() {
		return this.metricId;
	}
	public void setMetricId(int metricId) {
		this.metricId = metricId;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof QualityModelPK)) {
			return false;
		}
		QualityModelPK castOther = (QualityModelPK)other;
		return 
			(this.qualityModelId == castOther.qualityModelId)
			&& (this.metricId == castOther.metricId);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.qualityModelId;
		hash = hash * prime + this.metricId;
		
		return hash;
	}
}