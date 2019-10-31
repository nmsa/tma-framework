package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the ConfigurationData database table.
 * 
 */
@Embeddable
public class ConfigurationDataPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	private int planId;

	private int actionId;

	public ConfigurationDataPK() {
	}
	public int getPlanId() {
		return this.planId;
	}
	public void setPlanId(int planId) {
		this.planId = planId;
	}
	public int getActionId() {
		return this.actionId;
	}
	public void setActionId(int actionId) {
		this.actionId = actionId;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof ConfigurationDataPK)) {
			return false;
		}
		ConfigurationDataPK castOther = (ConfigurationDataPK)other;
		return 
			(this.planId == castOther.planId)
			&& (this.actionId == castOther.actionId);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.planId;
		hash = hash * prime + this.actionId;
		
		return hash;
	}
}