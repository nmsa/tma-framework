package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;


/**
 * The persistent class for the Preference database table.
 * 
 */
@Entity
@NamedQuery(name="Preference.findAll", query="SELECT p FROM Preference p")
public class Preference implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private PreferencePK id;

	private double threshold;

	private double weight;

	//bi-directional one-to-one association to Attribute
	@ManyToOne
	@JoinColumn(name="metricId")
	private Metric metric;
	
	//bi-directional many-to-one association to ConfigurationProfile
	@ManyToOne
	@JoinColumn(name="configurationprofileID")
	private ConfigurationProfile configurationprofile;
	
	public Preference() {
	}

	public PreferencePK getId() {
		return this.id;
	}

	public void setId(PreferencePK id) {
		this.id = id;
	}

	public double getThreshold() {
		return this.threshold;
	}

	public void setThreshold(double threshold) {
		this.threshold = threshold;
	}

	public double getWeight() {
		return this.weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public ConfigurationProfile getConfigurationprofile() {
		return configurationprofile;
	}

	public void setConfigurationprofile(ConfigurationProfile configurationprofile) {
		this.configurationprofile = configurationprofile;
	}

}