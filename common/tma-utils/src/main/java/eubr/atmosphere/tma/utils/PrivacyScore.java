package eubr.atmosphere.tma.utils;

/**
 * Used to provide privacy score attributes
 * 
 * @author JorgeLuiz
 */
public class PrivacyScore implements Score {

	private Double score;

	public PrivacyScore(Double score) {
		super();
		this.score = score;
	}

	@Override
	public Double getScore() {
		return this.score;
	}

	public void setScore(Double score) {
		this.score = score;
	}
	
}
