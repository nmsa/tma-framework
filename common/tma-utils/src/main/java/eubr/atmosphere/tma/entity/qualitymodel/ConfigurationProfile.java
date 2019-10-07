package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;


/**
 * The persistent class for the ConfigurationProfile database table.
 * 
 */
@Entity
@NamedQuery(name="ConfigurationProfile.findAll", query="SELECT c FROM ConfigurationProfile c")
public class ConfigurationProfile implements Serializable {
	
	private static final long serialVersionUID = -983651499697443392L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int configurationProfileID;

	private String profileName;

	//bi-directional many-to-one association to Preference
	@OneToMany(mappedBy="configurationprofile", fetch = FetchType.EAGER)
	@Fetch(FetchMode.SUBSELECT)
	@LazyCollection(LazyCollectionOption.FALSE)
	private Set<Preference> preferences;
	
	public ConfigurationProfile() {
	}

	public int getConfigurationProfileID() {
		return this.configurationProfileID;
	}

	public void setConfigurationProfileID(int configurationProfileID) {
		this.configurationProfileID = configurationProfileID;
	}

	public String getProfileName() {
		return this.profileName;
	}

	public void setProfileName(String profileName) {
		this.profileName = profileName;
	}

	public Set<Preference> getPreferences() {
		return preferences;
	}

	public void setPreferences(Set<Preference> preferences) {
		this.preferences = preferences;
	}

	public Preference getPreference(MetricAttributeView child) {
		for (Preference p : preferences) {
			if (child.getId() == p.getId().getMetricId()) {
				return p;
			}
		}
		return null;
	}
	
	public Preference addPreference(Preference preference) {
		getPreferences().add(preference);
		preference.setConfigurationprofile(this);

		return preference;
	}

	public Preference removePreference(Preference preference) {
		getPreferences().remove(preference);
		preference.setConfigurationprofile(null);

		return preference;
	}

	@Override
	public String toString() {
		return "ConfigurationProfile [preferences=" + preferences + "]";
	}
	
}