package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * The primary key class for the MetricData database table.
 * 
 */
@Embeddable
public class MetricDataPK implements Serializable {

	private static final long serialVersionUID = -3816108786691682169L;

	private int metricId;

	@Temporal(TemporalType.TIMESTAMP)
	private java.util.Date valueTime;

	public MetricDataPK() {
	}
	public int getMetricId() {
		return this.metricId;
	}
	public void setMetricId(int metricId) {
		this.metricId = metricId;
	}
	public java.util.Date getValueTime() {
		return this.valueTime;
	}
	public void setValueTime(java.util.Date valueTime) {
		this.valueTime = valueTime;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof MetricDataPK)) {
			return false;
		}
		MetricDataPK castOther = (MetricDataPK)other;
		return 
			(this.metricId == castOther.metricId)
			&& this.valueTime.equals(castOther.valueTime);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.metricId;
		hash = hash * prime + this.valueTime.hashCode();
		
		return hash;
	}
}