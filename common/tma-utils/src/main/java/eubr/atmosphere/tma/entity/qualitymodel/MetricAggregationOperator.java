package eubr.atmosphere.tma.entity.qualitymodel;

/**
 * Metric aggregation operator enumeration
 * @author JorgeLuiz
 */
public enum MetricAggregationOperator {
	
	AVERAGE(0, "AVERAGE"), MINIMUM(1, "MINIMUM"), MAXIMUM(2, "MAXIMUM"), SUM(3, "SUM");

	private Integer valor;
	private String label;

	private MetricAggregationOperator(Integer valor, String label) {
		this.valor = valor;
		this.label = label;
	}

	public Integer getValor() {
		return valor;
	}

	public String getLabel() {
		return label;
	}

	public static MetricAggregationOperator getEnumByValor(Integer valor) {
		if (valor == null) {
			return null;
		}
		for (MetricAggregationOperator item : MetricAggregationOperator.values()) {
			if (item.getValor().intValue() == valor.intValue()) {
				return item;
			}
		}
		return null;
	}
	
}
