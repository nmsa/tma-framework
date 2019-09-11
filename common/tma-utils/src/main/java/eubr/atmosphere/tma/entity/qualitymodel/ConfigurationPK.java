package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the Configuration database table.
 * 
 */
@Embeddable
public class ConfigurationPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	private int configurationId;

	private int actionId;

	public ConfigurationPK() {
	}
	public int getConfigurationId() {
		return this.configurationId;
	}
	public void setConfigurationId(int configurationId) {
		this.configurationId = configurationId;
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
		if (!(other instanceof ConfigurationPK)) {
			return false;
		}
		ConfigurationPK castOther = (ConfigurationPK)other;
		return 
			(this.configurationId == castOther.configurationId)
			&& (this.actionId == castOther.actionId);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.configurationId;
		hash = hash * prime + this.actionId;
		
		return hash;
	}
}