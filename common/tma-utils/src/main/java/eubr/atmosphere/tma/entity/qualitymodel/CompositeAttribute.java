package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.NamedQuery;


/**
 * The persistent class for the CompositeAttribute database table.
 * 
 */
@Entity
@NamedQuery(name="CompositeAttribute.findAll", query="SELECT c FROM CompositeAttribute c")
public class CompositeAttribute implements Serializable {

	private static final long serialVersionUID = -2585607435377058624L;

	@EmbeddedId
	private CompositeAttributePK id;

	private int attributeAggregationOperator;

	public CompositeAttribute() {
	}

	public CompositeAttributePK getId() {
		return this.id;
	}

	public void setId(CompositeAttributePK id) {
		this.id = id;
	}

	public int getAttributeAggregationOperator() {
		return this.attributeAggregationOperator;
	}

	public void setAttributeAggregationOperator(int attributeAggregationOperator) {
		this.attributeAggregationOperator = attributeAggregationOperator;
	}

}