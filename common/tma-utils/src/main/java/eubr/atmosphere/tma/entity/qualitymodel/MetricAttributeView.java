package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;

import eubr.atmosphere.tma.exceptions.UndefinedException;

/**
 * The persistent class for the Metric database table.
 * 
 */
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@NamedQuery(name="MetricAttributeView.findAll", query="SELECT m FROM MetricAttributeView m")
public abstract class MetricAttributeView implements Serializable {

	private static final long serialVersionUID = 1997521195416292643L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int metricId;

	private String name;
	
	//bi-directional many-to-one association to compositeattribute
	@ManyToOne
	@JoinColumn(name="compositeattributeId")
	private CompositeAttributeView compositeattribute;
	
	public abstract MetricData calculate(ConfigurationProfile user, Date timestamp)
			throws UndefinedException;
	
	public MetricAttributeView() {
	}

	public int getId() {
		return this.metricId;
	}

	public void setId(int id) {
		this.metricId = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public CompositeAttributeView getCompositeattribute() {
		return compositeattribute;
	}

	public void setCompositeattribute(CompositeAttributeView compositeattribute) {
		this.compositeattribute = compositeattribute;
	}

	@Override
	public String toString() {
		return "MetricAttributeView [metricId=" + metricId + ", name=" + name + ", compositeattribute="
				+ compositeattribute + "]";
	}
	
}