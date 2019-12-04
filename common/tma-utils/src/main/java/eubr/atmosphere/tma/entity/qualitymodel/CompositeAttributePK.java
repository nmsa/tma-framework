package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;

import javax.persistence.Embeddable;

/**
 * The primary key class for the CompositeAttribute database table.
 * 
 */
@Embeddable
public class CompositeAttributePK implements Serializable {

	private static final long serialVersionUID = 1253496569786476374L;

	private int parentMetric;

	private int childMetric;

	public CompositeAttributePK() {
	}
	public int getParentMetric() {
		return this.parentMetric;
	}
	public void setParentMetric(int parentMetric) {
		this.parentMetric = parentMetric;
	}
	public int getChildMetric() {
		return this.childMetric;
	}
	public void setChildMetric(int childMetric) {
		this.childMetric = childMetric;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof CompositeAttributePK)) {
			return false;
		}
		CompositeAttributePK castOther = (CompositeAttributePK)other;
		return 
			(this.parentMetric == castOther.parentMetric)
			&& (this.childMetric == castOther.childMetric);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.parentMetric;
		hash = hash * prime + this.childMetric;
		
		return hash;
	}
}