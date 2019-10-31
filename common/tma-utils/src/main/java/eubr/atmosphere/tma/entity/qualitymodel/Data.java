package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.NamedQuery;


/**
 * The persistent class for the Data database table.
 * 
 */
@Entity
@NamedQuery(name="Data.findAll", query="SELECT d FROM Data d")
public class Data implements Serializable {

	private static final long serialVersionUID = -5621304497194586503L;

	@EmbeddedId
	private DataPK id;

	private double value;

	public Data() {
	}

	public DataPK getId() {
		return this.id;
	}

	public void setId(DataPK id) {
		this.id = id;
	}

	public double getValue() {
		return this.value;
	}

	public void setValue(double value) {
		this.value = value;
	}

}