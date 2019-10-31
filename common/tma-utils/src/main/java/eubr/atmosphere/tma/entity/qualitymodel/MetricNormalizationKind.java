package eubr.atmosphere.tma.entity.qualitymodel;

/**
 * Metric normalization kind enumeration
 * @author JorgeLuiz
 */
public enum MetricNormalizationKind {

	BENEFIT(0, "AVERAGE"), COST(1, "MINIMUM");

	private Integer valor;
	private String label;

	private MetricNormalizationKind(Integer valor, String label) {
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
