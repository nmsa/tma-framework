package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import eubr.atmosphere.tma.database.QualityModelManager;
import eubr.atmosphere.tma.exceptions.UndefinedException;
import eubr.atmosphere.tma.exceptions.UndefinedMetricException;
import eubr.atmosphere.tma.utils.ListUtils;


/**
 * The persistent class for the CompositeAttribute database table.
 * 
 */
@Entity
@NamedQuery(name="CompositeAttribute.findAll", query="SELECT c FROM CompositeAttribute c")
public class CompositeAttribute extends Metric implements Serializable {

	private static final long serialVersionUID = -4332026256817210342L;

	@EmbeddedId
	private CompositeAttributePK id;
	
	@Enumerated(EnumType.ORDINAL)
	private AttributeAggregationOperator attributeAggregationOperator = AttributeAggregationOperator.NEUTRALITY;
	
	// bi-directional many-to-one association to Metric
	@OneToMany(mappedBy="compositeattribute", fetch = FetchType.EAGER)
	@Fetch(FetchMode.SUBSELECT)
	@LazyCollection(LazyCollectionOption.FALSE)
	private List<Metric> children;

	public CompositeAttribute() {
	}

	public CompositeAttributePK getId() {
		return this.id;
	}

	public void setId(CompositeAttributePK id) {
		this.id = id;
	}
	
	public MetricData calculate(ConfigurationProfile profile, QualityModel qm, Date timestamp) throws UndefinedException {
		
		if (profile == null || ListUtils.isEmpty(profile.getPreferences()) || qm == null) {
			throw new UndefinedMetricException(
					"No defined preference or quality model for leaf attribute " + this.getMetricName());
		}

		MetricData metricData = new MetricData();
		metricData.getId().setValueTime(new Timestamp(System.currentTimeMillis()));
		metricData.getId().setMetricId(qm.getId().getMetricId());
		//TODO: verify how to set resourceId

		switch (attributeAggregationOperator) {
		case NEUTRALITY:
			metricData.setValue(calculateNeutrality(profile, qm, timestamp));
			break;
		case REPLACEABILITY:
			metricData.setValue(calculateReplaceability(profile, qm, timestamp));
			break;
		case SIMULTANEITY:
			metricData.setValue(calculateSimultaneity(profile, qm, timestamp));
			break;
		default:
			throw new UnsupportedOperationException();
		}

		// Stores calculated score in HistoricalDate
		QualityModelManager qmm = new QualityModelManager();
		qmm.saveMetricData(metricData);
		
		return metricData;
	}
	
	protected double calculateNeutrality(ConfigurationProfile profile, QualityModel qm, Date timestamp) throws UndefinedException {
		double score = 0.0;
		if (ListUtils.isNotEmpty(children)) {
			for (Metric child : children) {
				if (!child.equals(this)) {
					Preference childPref = profile.getPreference(child);
					try {
						score += child.calculate(profile, qm, timestamp).getValue() * childPref.getWeight();
					} catch (UndefinedMetricException e) {
						e.printStackTrace();
					}
				}
			}
		}
		return score;
	}

	protected double calculateSimultaneity(ConfigurationProfile profile, QualityModel qm, Date timestamp) throws UndefinedException {
		double score = 0.0;
		if (ListUtils.isNotEmpty(this.children)) {
			for (Metric child : children) {
				if (!child.equals(this)) {
					Preference childPref = profile.getPreference(child);
					try {
						double scoreAux = child.calculate(profile, qm, timestamp).getValue() * childPref.getWeight();
						if (scoreAux < childPref.getThreshold()) {
							score = 0.0;
							break;
						}
						score += scoreAux;
					} catch (UndefinedMetricException e) {
						e.printStackTrace();
					}
				}
			}
		}
		return score;
	}

	protected double calculateReplaceability(ConfigurationProfile profile, QualityModel qm, Date timestamp) throws UndefinedException {
		double score = 0.0;
		if (ListUtils.isNotEmpty(this.children)) {
			for (Metric child : children) {
				if (!child.equals(this)) {
					Preference childPref = profile.getPreference(child);
					try {
						double scoreAux = child.calculate(profile, qm, timestamp).getValue() * childPref.getWeight();
						if (scoreAux > childPref.getThreshold()) {
							score += scoreAux;
						}
					} catch (UndefinedMetricException e) {
						e.printStackTrace();
					}
				}
			}
		}
		return score;
	}
	
	public AttributeAggregationOperator getAttributeAggregationOperator() {
		return attributeAggregationOperator;
	}

	public void setAttributeAggregationOperator(AttributeAggregationOperator attributeAggregationOperator) {
		this.attributeAggregationOperator = attributeAggregationOperator;
	}

	public List<Metric> getChildren() {
		if (children == null) {
			children = new ArrayList<Metric>();
		}
		return children;
	}

	public void setChildren(List<Metric> children) {
		this.children = children;
	}

}