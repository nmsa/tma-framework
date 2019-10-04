package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.NamedQuery;

import eubr.atmosphere.tma.database.QualityModelManager;
import eubr.atmosphere.tma.exceptions.UndefinedMetricException;
import eubr.atmosphere.tma.utils.ListUtils;


/**
 * The persistent class for the LeafAttribute database table.
 * 
 */
@Entity
@NamedQuery(name="LeafAttribute.findAll", query="SELECT l FROM LeafAttribute l")
public class LeafAttribute extends Metric implements Serializable {

	private static final long serialVersionUID = 4281619788455567958L;

	private int descriptionId;

	private double maximumThreshold;

	@Enumerated(EnumType.ORDINAL)
	private MetricAggregationOperator metricAggregationOperator = MetricAggregationOperator.AVERAGE;

	private double minimumThreshold;

	@Enumerated(EnumType.ORDINAL)
	private MetricNormalizationKind normalizationKind = MetricNormalizationKind.BENEFIT;

	private String normalizationMethod;

	private int numSamples;

	public LeafAttribute() {
	}

	public LeafAttribute(double maximumThreshold, MetricAggregationOperator metricAggregationOperator,
			double minimumThreshold, MetricNormalizationKind normalizationKind, String normalizationMethod,
			int numSamples) {
		super();
		this.maximumThreshold = maximumThreshold;
		this.metricAggregationOperator = metricAggregationOperator;
		this.minimumThreshold = minimumThreshold;
		this.normalizationKind = normalizationKind;
		this.normalizationMethod = normalizationMethod;
		this.numSamples = numSamples;
	}

	public MetricData calculate(ConfigurationProfile profile, QualityModel qm, MetricData metricData, Date timestamp)
			throws UndefinedMetricException {

		if (profile == null || ListUtils.isEmpty(profile.getPreferences()) || qm == null) {
			throw new UndefinedMetricException(
					"No defined preference or quality model for leaf attribute " + this.getMetricName());
		}

		switch (metricAggregationOperator) {
		case AVERAGE:
			metricData.setValue(calculateAverage(profile, metricData, timestamp));
			break;
		case MINIMUM:
			metricData.setValue(calculateMinimum(profile, metricData, timestamp));
			break;
		case MAXIMUM:
			metricData.setValue(calculateMaximum(profile, metricData, timestamp));
			break;
		case SUM:
			metricData.setValue(calculateSum(profile, metricData, timestamp));
			break;
		default:
			throw new UnsupportedOperationException();
		}
		
		metricData.getId().setValueTime(new Timestamp(System.currentTimeMillis()));
		metricData.getId().setMetricId(qm.getId().getMetricId());
		// Stores calculated score in MetricData
		QualityModelManager qmm = new QualityModelManager();
		qmm.saveMetricData(metricData);
		
		return metricData;
	}

	protected double calculateAverage(ConfigurationProfile profile, MetricData metricData, Date timestamp) {
		
		double average = 0;
		double amount = 0;
		
		QualityModelManager qmm = new QualityModelManager();
		Iterator<Preference> iterPreference = profile.getPreferences().iterator();
		while (iterPreference.hasNext()) {
			
			Preference preference = iterPreference.next();
			Integer metricId = preference.getId().getMetricId();
			
			if (metricId == this.getId()) {
				List<Data> data =  qmm.getLimitedDataListByIdAndTimestamp(this.getDescriptionId(), timestamp);

				// Set resource id in MetricData
				Data d = ListUtils.getFirstElement(data);
				metricData.setResourceId(d.getId().getResourceId());
				
				amount += (double) data.size();
				Iterator<Data> iterData = data.iterator();
				while (iterData.hasNext()) {
					Data measure = iterData.next();
					average += measure.getValue();
				}
			}
		}

		if (this.normalizationKind == MetricNormalizationKind.COST) {
			return 1 - (average / amount);
		}
		return average / amount;
	}

	protected double calculateMinimum(ConfigurationProfile profile, MetricData metricData, Date timestamp) {
		double minimum = 0;
		QualityModelManager qmm = new QualityModelManager();
		Iterator<Preference> iterPreference = profile.getPreferences().iterator();
		while (iterPreference.hasNext()) {

			Preference preference = iterPreference.next();
			Integer metricId = preference.getId().getMetricId();

			if (metricId == this.getId()) {
				List<Data> data = qmm.getLimitedDataListByIdAndTimestamp(this.getDescriptionId(), timestamp);
				
				// Set resource id in MetricData
				Data d = ListUtils.getFirstElement(data);
				metricData.setResourceId(d.getId().getResourceId());
				
				Iterator<Data> iterData = data.iterator();
				while (iterData.hasNext()) {
					Data measure = iterData.next();
					if (measure.getValue() < minimum)
						minimum = measure.getValue();
				}
			}
		}

		if (this.normalizationKind == MetricNormalizationKind.COST) {
			return 1 - minimum;
		}
		return minimum;
	}

	protected double calculateMaximum(ConfigurationProfile profile, MetricData metricData, Date timestamp) {
		double maximum = 0;
		QualityModelManager qmm = new QualityModelManager();
		Iterator<Preference> iterPreference = profile.getPreferences().iterator();
		while (iterPreference.hasNext()) {

			Preference preference = iterPreference.next();
			Integer metricId = preference.getId().getMetricId();

			if (metricId == this.getId()) {
				List<Data> data = qmm.getLimitedDataListByIdAndTimestamp(this.getDescriptionId(), timestamp);
				
				// Set resource id in MetricData
				Data d = ListUtils.getFirstElement(data);
				metricData.setResourceId(d.getId().getResourceId());
				
				Iterator<Data> iterData = data.iterator();
				while (iterData.hasNext()) {
					Data measure = iterData.next();
					if (measure.getValue() > maximum)
						maximum = measure.getValue();
				}
			}
		}

		if (this.normalizationKind == MetricNormalizationKind.COST) {
			return 1 - maximum;
		}
		return maximum;
	}

	protected double calculateSum(ConfigurationProfile profile, MetricData metricData, Date timestamp) {
		double sum = 0;
		QualityModelManager qmm = new QualityModelManager();
		Iterator<Preference> iterPreference = profile.getPreferences().iterator();
		while (iterPreference.hasNext()) {

			Preference preference = iterPreference.next();
			Integer metricId = preference.getId().getMetricId();

			if (metricId == this.getId()) {
				List<Data> data = qmm.getLimitedDataListByIdAndTimestamp(this.getDescriptionId(), timestamp);
				
				// Set resource id in MetricData
				Data d = ListUtils.getFirstElement(data);
				metricData.setResourceId(d.getId().getResourceId());
				
				Iterator<Data> iterData = data.iterator();
				while (iterData.hasNext()) {
					Data measure = iterData.next();
					sum += measure.getValue();
				}
			}
		}


		if (this.normalizationKind == MetricNormalizationKind.COST) {
			return 1 - sum;
		}
		return sum;
	}

	public int getDescriptionId() {
		return descriptionId;
	}

	public void setDescriptionId(int descriptionId) {
		this.descriptionId = descriptionId;
	}

	public double getMaximumThreshold() {
		return this.maximumThreshold;
	}

	public void setMaximumThreshold(double maximumThreshold) {
		this.maximumThreshold = maximumThreshold;
	}

	public MetricAggregationOperator getMetricAggregationOperator() {
		return metricAggregationOperator;
	}

	public void setMetricAggregationOperator(MetricAggregationOperator metricAggregationOperator) {
		this.metricAggregationOperator = metricAggregationOperator;
	}

	public double getMinimumThreshold() {
		return this.minimumThreshold;
	}

	public void setMinimumThreshold(double minimumThreshold) {
		this.minimumThreshold = minimumThreshold;
	}

	public MetricNormalizationKind getNormalizationKind() {
		return normalizationKind;
	}

	public void setNormalizationKind(MetricNormalizationKind normalizationKind) {
		this.normalizationKind = normalizationKind;
	}

	public String getNormalizationMethod() {
		return this.normalizationMethod;
	}

	public void setNormalizationMethod(String normalizationMethod) {
		this.normalizationMethod = normalizationMethod;
	}

	public int getNumSamples() {
		return this.numSamples;
	}

	public void setNumSamples(int numSamples) {
		this.numSamples = numSamples;
	}

}