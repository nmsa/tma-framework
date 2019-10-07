package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
@NamedQuery(name="CompositeAttributeView.findAll", query="SELECT c FROM CompositeAttributeView c")
public class CompositeAttributeView extends MetricAttributeView implements Serializable {

	private static final long serialVersionUID = -4332026256817210342L;
	
	@Enumerated(EnumType.ORDINAL)
	private AttributeAggregationOperator attributeAggregationOperator = AttributeAggregationOperator.NEUTRALITY;
	
	// bi-directional many-to-one association to Metric
	@OneToMany(mappedBy="compositeattribute", fetch = FetchType.EAGER)
	@Fetch(FetchMode.SUBSELECT)
	@LazyCollection(LazyCollectionOption.FALSE)
	private List<MetricAttributeView> children;

	public CompositeAttributeView() {
	}
	
	public MetricData calculate(ConfigurationProfile profile, QualityModel qm, MetricData metricData, Date timestamp) throws UndefinedException {
		
		if (profile == null || ListUtils.isEmpty(profile.getPreferences()) || qm == null) {
			throw new UndefinedMetricException(
					"No defined preference or quality model for leaf attribute " + this.getName());
		}

		switch (attributeAggregationOperator) {
		case NEUTRALITY:
			metricData.setValue(calculateNeutrality(profile, qm, metricData, timestamp));
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

		metricData.getId().setMetricId(this.getId());
		metricData.getId().setValueTime(new Timestamp(System.currentTimeMillis()));
		// Stores calculated score in MetricData
		QualityModelManager qmm = new QualityModelManager();
		qmm.saveMetricData(metricData);
		
		return metricData;
	}

	protected double calculateNeutrality(ConfigurationProfile profile, QualityModel qm, MetricData metricData, Date timestamp) throws UndefinedException {
		double score = 0.0;
		if (ListUtils.isNotEmpty(children)) {
			for (MetricAttributeView child : children) {
				if (!child.equals(this)) {
					Preference childPref = profile.getPreference(child);
					try {
						score += child.calculate(profile, qm, metricData, timestamp).getValue() * childPref.getWeight();
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
			for (MetricAttributeView child : children) {
				if (!child.equals(this)) {
					Preference childPref = profile.getPreference(child);
					try {
						double scoreAux = child.calculate(profile, qm, null, timestamp).getValue() * childPref.getWeight();
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
			for (MetricAttributeView child : children) {
				if (!child.equals(this)) {
					Preference childPref = profile.getPreference(child);
					try {
						double scoreAux = child.calculate(profile, qm, null, timestamp).getValue() * childPref.getWeight();
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

	public List<MetricAttributeView> getChildren() {
		if (children == null) {
			children = new ArrayList<MetricAttributeView>();
		}
		return children;
	}

	public void setChildren(List<MetricAttributeView> children) {
		this.children = children;
	}

}