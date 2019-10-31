package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;


/**
 * The persistent class for the Metric database table.
 * 
 */
@Entity
@NamedQuery(name="Metric.findAll", query="SELECT m FROM Metric m")
public class Metric implements Serializable {

	private static final long serialVersionUID = 1997521195416292643L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int metricId;

	private int blockLevel;

	private String metricName;

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