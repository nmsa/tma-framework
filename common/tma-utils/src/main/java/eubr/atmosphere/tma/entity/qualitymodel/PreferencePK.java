package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the Preference database table.
 * 
 */
@Embeddable
public class PreferencePK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	private int configurationProfileID;

	private int metricId;

	public PreferencePK() {
	}
	public int getConfigurationProfileID() {
		return this.configurationProfileID;
	}
	public void setConfigurationProfileID(int configurationProfileID) {
		this.configurationProfileID = configurationProfileID;
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
		if (!(other instanceof PreferencePK)) {
			return false;
		}
		PreferencePK castOther = (PreferencePK)other;
		return 
			(this.configurationProfileID == castOther.configurationProfileID)
			&& (this.metricId == castOther.metricId);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.configurationProfileID;
		hash = hash * prime + this.metricId;
		
		return hash;
	}
}