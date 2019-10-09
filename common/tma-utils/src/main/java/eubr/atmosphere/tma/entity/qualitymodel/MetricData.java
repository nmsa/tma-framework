package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.NamedQuery;


/**
 * The persistent class for the MetricData database table.
 * 
 */
@Entity
@NamedQuery(name="MetricData.findAll", query="SELECT m FROM MetricData m")
public class MetricData implements Serializable {

	private static final long serialVersionUID = 3587381440538246279L;

	@EmbeddedId
	private MetricDataPK metricId;

	private Integer resourceId;

	private double value;
	
	public MetricData() {
	}

	public MetricDataPK getMetricId() {
		return metricId;
	}

	public void setMetricId(MetricDataPK metricId) {
		this.metricId = metricId;
	}

	public Integer getResourceId() {
		return this.resourceId;
	}

	public void setResourceId(Integer resourceId) {
		this.resourceId = resourceId;
	}

	public double getValue() {
		return this.value;
	}

	public void setValue(double value) {
		this.value = value;
	}

}