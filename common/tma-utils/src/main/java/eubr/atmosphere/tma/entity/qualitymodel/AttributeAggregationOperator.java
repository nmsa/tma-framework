package eubr.atmosphere.tma.entity.qualitymodel;

/**
 * Attribute aggregation operator enumeration
 * @author JorgeLuiz
 */
public enum AttributeAggregationOperator {
	
	NEUTRALITY(0, "NEUTRALITY"), SIMULTANEITY(1, "SIMULTANEITY"), REPLACEABILITY(2, "REPLACEABILITY");

	private Integer valor;
	private String label;

	private AttributeAggregationOperator(Integer valor, String label) {
		this.valor = valor;
		this.label = label;
	}

	public Integer getValor() {
		return valor;
	}

	public String getLabel() {
		return label;
	}

	public static AttributeAggregationOperator getEnumByValor(Integer valor) {
		if (valor == null) {
			return null;
		}
		for (AttributeAggregationOperator item : AttributeAggregationOperator.values()) {
			if (item.getValor().intValue() == valor.intValue()) {
				return item;
			}
		}
		return null;
	}
	
}
