package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the Configuration database table.
 * 
 */
@Entity
@NamedQuery(name="Configuration.findAll", query="SELECT c FROM Configuration c")
public class Configuration implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private ConfigurationPK id;

	private String domain;

	private String keyName;

	public Configuration() {
	}

	public ConfigurationPK getId() {
		return this.id;
	}

	public void setId(ConfigurationPK id) {
		this.id = id;
	}

	public String getDomain() {
		return this.domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public String getKeyName() {
		return this.keyName;
	}

	public void setKeyName(String keyName) {
		this.keyName = keyName;
	}

}