package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.NamedQuery;


/**
 * The persistent class for the QualityModel database table.
 * 
 */
@Entity
@NamedQuery(name="QualityModel.findAll", query="SELECT q FROM QualityModel q")
public class QualityModel implements Serializable {

	private static final long serialVersionUID = -7461021484583017453L;

	@EmbeddedId
	private QualityModelPK id;

	private double businessThreshold;

	private int modelDescriptionReference;

	private String modelName;

	public QualityModel() {
	}

	public QualityModelPK getId() {
		return this.id;
	}

	public void setId(QualityModelPK id) {
		this.id = id;
	}

	public double getBusinessThreshold() {
		return this.businessThreshold;
	}

	public void setBusinessThreshold(double businessThreshold) {
		this.businessThreshold = businessThreshold;
	}

	public int getModelDescriptionReference() {
		return this.modelDescriptionReference;
	}

	public void setModelDescriptionReference(int modelDescriptionReference) {
		this.modelDescriptionReference = modelDescriptionReference;
	}

	public String getModelName() {
		return this.modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

}