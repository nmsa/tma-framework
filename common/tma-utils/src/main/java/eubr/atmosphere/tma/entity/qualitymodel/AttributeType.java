package eubr.atmosphere.tma.entity.qualitymodel;

/**
 * Attribute type enumeration
 * @author JorgeLuiz
 */
public enum AttributeType {
	
	ROOT(0, "ROOT"), COMPOSITE(1, "COMPOSITE"), LEAF(2, "LEAF");

	private Integer valor;
	private String label;

	private AttributeType(Integer valor, String label) {
		this.valor = valor;
		this.label = label;
	}

	public Integer getValor() {
		return valor;
	}

	public String getLabel() {
		return label;
	}

	public static AttributeType getEnumByValor(Integer valor) {
		if (valor == null) {
			return null;
		}
		for (AttributeType item : AttributeType.values()) {
			if (item.getValor().intValue() == valor.intValue()) {
				return item;
			}
		}
		return null;
	}
	
	public boolean isRoot() {
		return this == ROOT;
	}
	
	public boolean isComposite() {
		return this == COMPOSITE;
	}
	
	public boolean isLeaf() {
		return this == LEAF;
	}
}
