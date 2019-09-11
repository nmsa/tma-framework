package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import eubr.atmosphere.tma.exceptions.UndefinedException;

/**
 * The persistent class for the Metric database table.
 * 
 */
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@NamedQuery(name="Metric.findAll", query="SELECT m FROM Metric m")
public abstract class Metric implements Serializable {

	private static final long serialVersionUID = 1997521195416292643L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int metricId;

	private int blockLevel;

	private String metricName;

	//bi-directional one-to-many association to Historicaldata
	@OneToMany (mappedBy="metric", fetch = FetchType.LAZY)
	private List<MetricData> metricData;
	
	//bi-directional many-to-one association to Preference
	@OneToMany(mappedBy="configurationprofile", fetch = FetchType.EAGER)
	@Fetch(FetchMode.SUBSELECT)
	@LazyCollection(LazyCollectionOption.FALSE)
	private Set<Preference> preferences;
	
	//bi-directional many-to-one association to compositeattribute
	@ManyToOne
	@JoinColumn(name="compositeattributeId")
	private CompositeAttribute compositeattribute;
	
	public abstract MetricData calculate(ConfigurationProfile user, QualityModel qm, Date timestamp)
			throws UndefinedException;
	
	public Metric() {
	}

	public int getMetricId() {
		return this.metricId;
	}

	public void setMetricId(int metricId) {
		this.metricId = metricId;
	}

	public int getBlockLevel() {
		return this.blockLevel;
	}

	public void setBlockLevel(int blockLevel) {
		this.blockLevel = blockLevel;
	}

	public String getMetricName() {
		return this.metricName;
	}

	public void setMetricName(String metricName) {
		this.metricName = metricName;
	}

}