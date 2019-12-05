package eubr.atmosphere.tma.utils;

import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SecurityScore implements Score {

	private static final Logger LOGGER = LoggerFactory.getLogger(SecurityScore.class);

	private Double score = -1.0;
	private int resourceId;
	private long timestamp;
	private int metricId;

	// Constructor of SecurityScore
	public SecurityScore() {
		super();
	}

	/**
	 * The following HashMaps store data required for calculation of Security Score.
	 * each HashMap maps desscriptionId with a value. It stores the values for
	 * several descriptions whose values are required for calculating one specific
	 * metric. As an example, existenceOfBestPractice stores the values for
	 * existence of best practices within each policy in order to be used for
	 * calculating Compliance with Vendor Best Practices (VBP).
	 */
	private HashMap<Integer, Double> existenceOfBestPractice = new HashMap<Integer, Double>();
	private HashMap<Integer, Double> existenceOfCheckAreas = new HashMap<Integer, Double>();
	private HashMap<Integer, Double> existenceOfPolicy = new HashMap<Integer, Double>();
	private HashMap<Integer, Double> existenceOfSecurityControl = new HashMap<Integer, Double>();
	private HashMap<Integer, Double> existenceOfSecurityDefinition = new HashMap<Integer, Double>();

	// metrics used for calculation of security Score

	private double complianceWithVendorBestPractices_VBP;
	private static final int numberOfPolicies = 3;

	private double complianceWithIndustryDefinedConfiguration_SIC;

	private double complianceWithAllSecurityStandards_SS;
	private static final int numberOfStandards = 6;

	private double totalSecurityPoliciesInPlace_SP;
	private static final int numberOfTechnologies = 6;

	private double totalSecurityCoverage_SC;

	private double availabilityLevel_A;
	private double integrityLevel_I;
	private double confidentialityLevel_C;

	///////////////////////// weights of attributes and sub-attributes

	private double[] S_AttributesWeights;
	private double[] A_AttributesWeights;
	private double[] I_AttributesWeights;
	private double[] C_AttributesWeights;
	private double[] SCT_AttributesWeights;
	private double[] SC_AttributesWeights;
	private double[] P_AttributesWeights;
	private double[] SP_AttributesWeights;
	private double[] SS_AttributesWeights;
	private double[] CSS_AttributesWeiths;
	private double[] SIC_AttributesWeights;
	private double[] SICP_AttributesWeights;
	private double[] VBP_AttributesWeights;
	private double[] VBPP_AttributesWeights;

	// getter and setters

	public Double getScore() {
		// verifies whether is score has already been calculated or not.
		if ((this.score == null) || (this.score == -1.0))
			this.calculateScore();
		return this.score;
	}

	public void setExistenceOfBestPractice(int resourceId, double existenceOfBestPractice) {
		this.existenceOfBestPractice.put(resourceId, existenceOfBestPractice);
	}

	public void setExistenceOfCheckAreas(int resourceId, double existenceOfCheckAreas) {
		this.existenceOfCheckAreas.put(resourceId, existenceOfCheckAreas);
	}

	public void setExistenceOfPolicy(int resourceId, double existenceOfPolicy) {
		this.existenceOfPolicy.put(resourceId, existenceOfPolicy);
	}

	public void setExistenceOfSecurityControl(int resourceId, double existenceOfSecurityControl) {
		this.existenceOfSecurityControl.put(resourceId, existenceOfSecurityControl);
	}

	public void setExistenceOfSecurityDefinition(int resourceId, double existenceOfSecurityDefinition) {
		this.existenceOfSecurityDefinition.put(resourceId, existenceOfSecurityDefinition);
	}

	//////// setters and getters for attributes weights
	public double[] getS_AttributesWeights() {
		return S_AttributesWeights;
	}

	public void setS_AttributesWeights(double[] s_AttributesWeights) {
		S_AttributesWeights = s_AttributesWeights;
	}

	public double[] getA_AttributesWeights() {
		return A_AttributesWeights;
	}

	public void setA_AttributesWeights(double[] a_AttributesWeights) {
		A_AttributesWeights = a_AttributesWeights;
	}

	public double[] getI_AttributesWeights() {
		return I_AttributesWeights;
	}

	public void setI_AttributesWeights(double[] i_AttributesWeights) {
		I_AttributesWeights = i_AttributesWeights;
	}

	public double[] getC_AttributesWeights() {
		return C_AttributesWeights;
	}

	public void setC_AttributesWeights(double[] c_AttributesWeights) {
		C_AttributesWeights = c_AttributesWeights;
	}

	public double[] getSCT_AttributesWeights() {
		return SCT_AttributesWeights;
	}

	public void setSCT_AttributesWeights(double[] sCT_AttributesWeights) {
		SCT_AttributesWeights = sCT_AttributesWeights;
	}

	public double[] getSC_AttributesWeights() {
		return SC_AttributesWeights;
	}

	public void setSC_AttributesWeights(double[] sC_AttributesWeights) {
		SC_AttributesWeights = sC_AttributesWeights;
	}

	public double[] getP_AttributesWeights() {
		return P_AttributesWeights;
	}

	public void setP_AttributesWeights(double[] p_AttributesWeights) {
		P_AttributesWeights = p_AttributesWeights;
	}

	public double[] getSP_AttributesWeights() {
		return SP_AttributesWeights;
	}

	public void setSP_AttributesWeights(double[] sP_AttributesWeights) {
		SP_AttributesWeights = sP_AttributesWeights;
	}

	public double[] getSS_AttributesWeights() {
		return SS_AttributesWeights;
	}

	public void setSS_AttributesWeights(double[] sS_AttributesWeights) {
		SS_AttributesWeights = sS_AttributesWeights;
	}

	public double[] getCSS_AttributesWeiths() {
		return CSS_AttributesWeiths;
	}

	public void setCSS_AttributesWeiths(double[] cSS_AttributesWeiths) {
		CSS_AttributesWeiths = cSS_AttributesWeiths;
	}

	public double[] getSIC_AttributesWeights() {
		return SIC_AttributesWeights;
	}

	public void setSIC_AttributesWeights(double[] sIC_AttributesWeights) {
		SIC_AttributesWeights = sIC_AttributesWeights;
	}

	public double[] getSICP_AttributesWeights() {
		return SICP_AttributesWeights;
	}

	public void setSICP_AttributesWeights(double[] sICP_AttributesWeights) {
		SICP_AttributesWeights = sICP_AttributesWeights;
	}

	public double[] getVBP_AttributesWeights() {
		return VBP_AttributesWeights;
	}

	public void setVBP_AttributesWeights(double[] vBP_AttributesWeights) {
		VBP_AttributesWeights = vBP_AttributesWeights;
	}

	public double[] getVBPP_AttributesWeights() {
		return VBPP_AttributesWeights;
	}

	public void setVBPP_AttributesWeights(double[] vBPP_AttributesWeights) {
		VBPP_AttributesWeights = vBPP_AttributesWeights;
	}

	/////// getters for the value of each metric
	public double getComplianceWithVendorBestPractices() {
		return complianceWithVendorBestPractices_VBP;
	}

	public double getComplianceWithIndustryDefinedConfiguration() {
		return complianceWithIndustryDefinedConfiguration_SIC;
	}

	public double getComplianceWithAllSecurityStandards() {
		return complianceWithAllSecurityStandards_SS;
	}

	public double getTotalSecurityPoliciesInPlace() {
		return totalSecurityPoliciesInPlace_SP;
	}

	public double getTotalSecurityCoverage() {
		return totalSecurityCoverage_SC;
	}

	public double getAvailabilityLevel() {
		return availabilityLevel_A;
	}

	public double getIntegrityLevel() {
		return integrityLevel_I;
	}

	public double getConfidentialityLevel() {
		return confidentialityLevel_C;
	}

	@Override
	public String toString() {
		this.calculateScore();
		return "SecurityScore [Final Score= " + this.score + ", Availability Score= " + this.availabilityLevel_A
				+ ", Integrity Score= " + this.integrityLevel_I + ", Confidentiality Score= "
				+ this.confidentialityLevel_C + ", Compliance With Security Standards= "
				+ this.complianceWithAllSecurityStandards_SS + ", Compliance With Industry Defined Configuration= "
				+ this.complianceWithIndustryDefinedConfiguration_SIC + ", Compliance With Vendor Best Practices= "
				+ this.complianceWithVendorBestPractices_VBP + ", Total Security Coverage= "
				+ this.totalSecurityCoverage_SC + ", Total Security Policies In Place= "
				+ this.totalSecurityPoliciesInPlace_SP + ", timestamp=" + System.currentTimeMillis() + "]";
	}

	/**
	 * This methods calculates the security score using the data, collected from
	 * several resources, regarding the attributes and sub-attributes are involved
	 * in the calculation of the score. There are several metrics and sub-metrics
	 * involved in the calculation of the score that have to be calculated before
	 * the score is calculated.
	 */
	private void calculateScore() {
		// verifies whether all data required are provided or not
		if (existenceOfBestPractice.isEmpty() || existenceOfSecurityDefinition.isEmpty()
				|| existenceOfCheckAreas.isEmpty() || existenceOfPolicy.isEmpty()
				|| existenceOfSecurityControl.isEmpty()) {

			LOGGER.info("Some data is missing for calculation of the score!");
			return;
		}

		int bestPractices[][] = splitDigits(existenceOfBestPractice, numberOfPolicies);
		int securityDefinitions[][] = splitDigits(existenceOfSecurityDefinition, numberOfPolicies);
		int checkAreas[][] = splitDigits(existenceOfCheckAreas, numberOfStandards);
		int policies[][] = splitDigits(existenceOfPolicy, numberOfTechnologies);
		int securityControls[][] = splitDigits(existenceOfSecurityControl, numberOfTechnologies);

		// calculate complianceWithVendorBestPractices_VBP
		this.complianceWithVendorBestPractices_VBP = calculateMetric(numberOfPolicies, bestPractices,
				this.VBPP_AttributesWeights, this.VBP_AttributesWeights);

		// calculate complianceWithIndustryDefinedConfiguration_SIC
		this.complianceWithIndustryDefinedConfiguration_SIC = calculateMetric(numberOfPolicies, securityDefinitions,
				this.SICP_AttributesWeights, this.SIC_AttributesWeights);

		// calculate complianceWithAllSecurityStandards_SS
		this.complianceWithAllSecurityStandards_SS = calculateMetric(numberOfStandards, checkAreas,
				this.CSS_AttributesWeiths, this.SS_AttributesWeights);

		// calculate totalSecurityPoliciesInPlace_SP
		this.totalSecurityPoliciesInPlace_SP = calculateMetric(numberOfTechnologies, policies, this.P_AttributesWeights,
				this.SP_AttributesWeights);

		// calculate totalSecurityCoverage_SC
		this.totalSecurityCoverage_SC = calculateMetric(numberOfTechnologies, securityControls,
				this.SCT_AttributesWeights, this.SC_AttributesWeights);

		// calculate availabilityLevel_A
		if (this.A_AttributesWeights == null)
			this.A_AttributesWeights = setDefaultWeights(3);

		this.availabilityLevel_A = this.totalSecurityCoverage_SC * this.A_AttributesWeights[0]
				+ this.complianceWithIndustryDefinedConfiguration_SIC * this.A_AttributesWeights[1]
				+ this.complianceWithVendorBestPractices_VBP * this.A_AttributesWeights[2];

		// calculate integrityLevel_I;
		this.integrityLevel_I = this.complianceWithAllSecurityStandards_SS;

		// calculate confidentialityLevel_C;
		if (this.C_AttributesWeights == null)
			this.C_AttributesWeights = setDefaultWeights(2);

		this.confidentialityLevel_C = this.totalSecurityCoverage_SC * this.C_AttributesWeights[0]
				+ this.totalSecurityPoliciesInPlace_SP * this.C_AttributesWeights[1];

		// calculate final score
		if (this.S_AttributesWeights == null)
			this.S_AttributesWeights = setDefaultWeights(3);

		this.score = this.availabilityLevel_A * S_AttributesWeights[0] + this.integrityLevel_I * S_AttributesWeights[1]
				+ this.confidentialityLevel_C * S_AttributesWeights[2];
	}

	/**
	 * This method calculates the value of each metric that is required for
	 * calculation of score. To do so, the values of attributes and sub-attributes
	 */
	private double calculateMetric(int numOfAttributes, int[][] ArrtibutesValues, double[] SubAttributesWeights,
			double[] AttributesWeights) {

		if (SubAttributesWeights == null)
			SubAttributesWeights = setDefaultWeights(ArrtibutesValues[0].length);
		if (AttributesWeights == null)
			AttributesWeights = setDefaultWeights(numOfAttributes);

		double metric = 0.0;
		double[] subattribute = new double[numOfAttributes];
		for (int i = 0; i < numOfAttributes; i++) {
			for (int j = 0; j < ArrtibutesValues[i].length; j++)
				subattribute[i] += ArrtibutesValues[i][j] * SubAttributesWeights[j];

			metric += subattribute[i] * AttributesWeights[i];
		}

		return metric;
	}

	/**
	 * In the case no weight has been assigned to the attributes and sub-attributes,
	 * an equal weight is assigned to each.
	 */
	private double[] setDefaultWeights(int numOfAtt) {
		double[] weights = new double[numOfAtt];
		double w = 1.0 / numOfAtt;
		for (int i = 0; i < numOfAtt; i++)
			weights[i] = w;
		return weights;
	}

	/**
	 * This method is responsible for splitting the value provided for each resource
	 * that includes collected data for several attributes. For instance, existence
	 * of security definition x is a resource whose value represents the existence
	 * of this security definition in various technologies (which are attributes) in
	 * a sequence of 0/1.
	 */
	private static int[][] splitDigits(HashMap<Integer, Double> values, int numberOfAttributes) {

		int numberOfSubAatributes = values.size();
		int[][] digits = new int[numberOfAttributes][numberOfSubAatributes];

		int subAttributeCounter = 0;
		for (Double val : values.values()) {
			for (int i = 0; i < numberOfAttributes; i++) {
				digits[i][subAttributeCounter] = (int) (val % 10.0);
				val = val / 10.0;
			}
			subAttributeCounter++;
		}

		return digits;
	}

	public void setMetricId(int id) {
		this.metricId = id;
	}

	public void setValueTime(long l) {
		this.timestamp = l;

	}

	public void setResourceId(int id) {
		this.resourceId = id;
	}

	@Override
	public long getValueTime() {
		return this.timestamp;
	}

	@Override
	public int getResourceId() {
		return this.resourceId;
	}

	@Override
	public int getMetricId() {
		return this.metricId;
	}

}
