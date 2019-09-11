package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * The primary key class for the Data database table.
 * 
 */
@Embeddable
public class DataPK implements Serializable {

	private static final long serialVersionUID = -6614824542862354507L;

	private int probeId;

	private int descriptionId;

	private int resourceId;

	@Temporal(TemporalType.TIMESTAMP)
	private java.util.Date valueTime;

	public DataPK() {
	}
	public int getProbeId() {
		return this.probeId;
	}
	public void setProbeId(int probeId) {
		this.probeId = probeId;
	}
	public int getDescriptionId() {
		return this.descriptionId;
	}
	public void setDescriptionId(int descriptionId) {
		this.descriptionId = descriptionId;
	}
	public int getResourceId() {
		return this.resourceId;
	}
	public void setResourceId(int resourceId) {
		this.resourceId = resourceId;
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
		if (!(other instanceof DataPK)) {
			return false;
		}
		DataPK castOther = (DataPK)other;
		return 
			(this.probeId == castOther.probeId)
			&& (this.descriptionId == castOther.descriptionId)
			&& (this.resourceId == castOther.resourceId)
			&& this.valueTime.equals(castOther.valueTime);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.probeId;
		hash = hash * prime + this.descriptionId;
		hash = hash * prime + this.resourceId;
		hash = hash * prime + this.valueTime.hashCode();
		
		return hash;
	}
}