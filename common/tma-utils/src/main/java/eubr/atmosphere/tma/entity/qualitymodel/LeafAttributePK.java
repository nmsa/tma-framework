package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;

import javax.persistence.Embeddable;

/**
 * The primary key class for the LeafAttribute database table.
 * 
 */
@Embeddable
public class LeafAttributePK implements Serializable {

	private static final long serialVersionUID = 5116290542208827444L;

	private int descriptionId;

	private int metricId;

	public LeafAttributePK() {
	}
	public int getDescriptionId() {
		return this.descriptionId;
	}
	public void setDescriptionId(int descriptionId) {
		this.descriptionId = descriptionId;
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
		if (!(other instanceof LeafAttributePK)) {
			return false;
		}
		LeafAttributePK castOther = (LeafAttributePK)other;
		return 
			(this.descriptionId == castOther.descriptionId)
			&& (this.metricId == castOther.metricId);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.descriptionId;
		hash = hash * prime + this.metricId;
		
		return hash;
	}
}