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
	private MetricDataPK id;

	private int resourceId;

	private double value;

//	//bi-directional many-to-one association to Attribute
//	@ManyToOne
//	@JoinColumn(name="metricId")
//	private MetricAttributeView metric;
	
	public MetricData() {
	}

	public MetricDataPK getId() {
		return this.id;
	}

	public void setId(MetricDataPK id) {
		this.id = id;
	}

	public int getResourceId() {
		return this.resourceId;
	}

	public void setResourceId(int resourceId) {
		this.resourceId = resourceId;
	}

	public double getValue() {
		return this.value;
	}

	public void setValue(double value) {
		this.value = value;
	}

}