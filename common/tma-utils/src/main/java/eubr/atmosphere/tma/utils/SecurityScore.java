package eubr.atmosphere.tma.utils;

import java.util.Arrays;
import java.util.LinkedList;

public class SecurityScore implements Score {

	private Double score;
	// Constructor of SecurityCloudEAScore

	public SecurityScore() {
		super();
		// initialization of this class variables
	}

	// information required for calculation of Security Score
	private double existenceOfBestPractice;
	private double existenceOfCheckAreas;
	private double existenceOfPolicy;
	private double existenceOfSecurityControl;
	private double existenceOfSecurityDefnition;

	// metrics used for calculation of security Score

	private double complianceWithVendorBestPractices_VBP;
	private double[] complianceWithBestPracticesForEachPolicy_VBPP;
	private int numberOfPolicies = 5;

	private double complianceWithIndustryDefinedConfiguration_SIC;
	private double[] complianceWithIndustryDefConfForEachPolicy_SICP;

	private double complianceWithAllSecurityStandards_SS;
	private double[] complianceWithEachSecurityStandard_CSS;
	private int numberOfStandards = 5;

	private double totalSecurityPoliciesInPlace_SP;
	private double[] policiesInPlaceForEachTechnology_P;
	private int numberOfTechnologies = 5;

	private double totalSecurityCoverage_SC;
	private double[] securityCoverageOfEachTechnology_SCT;

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

	@Override
	public Double getScore() {
		this.calculateScore();
		return this.score;
	}

	public double getExistenceOfBestPractice() {
		return existenceOfBestPractice;
	}

	public void setExistenceOfBestPractice(double existenceOfBestPractice) {
		this.existenceOfBestPractice = existenceOfBestPractice;
	}

	public double getExistenceOfCheckAreas() {
		return existenceOfCheckAreas;
	}

	public void setExistenceOfCheckAreas(double existenceOfCheckAreas) {
		this.existenceOfCheckAreas = existenceOfCheckAreas;
	}

	public double getExistenceOfPolicy() {
		return existenceOfPolicy;
	}

	public void setExistenceOfPolicy(double existenceOfPolicy) {
		this.existenceOfPolicy = existenceOfPolicy;
	}

	public double getExistenceOfSecurityControl() {
		return existenceOfSecurityControl;
	}

	public void setExistenceOfSecurityControl(double existenceOfSecurityControl) {
		this.existenceOfSecurityControl = existenceOfSecurityControl;
	}

	public double getExistenceOfSecuritySefnition() {
		return existenceOfSecurityDefnition;
	}

	public void setExistenceOfSecuritySefnition(double existenceOfSecurityDefnition) {
		this.existenceOfSecurityDefnition = existenceOfSecurityDefnition;
	}

	//////// setters and getters for number of policies, standards, and technologies
	//////// in place

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
		return "SecurityScore [Final Score=" + this.score + ", Availability Score=" + this.availabilityLevel_A
				+ ", Integrity Score=" + this.integrityLevel_I + ", Confidentiality Score="
				+ this.confidentialityLevel_C + ", timestamp=" + System.currentTimeMillis() + "]";
	}

	private void calculateScore() {
		int bestPractices[][] = splitDigits(existenceOfBestPractice, this.numberOfPolicies);
		int securityDefinitions[][] = splitDigits(existenceOfSecurityDefnition, this.numberOfPolicies);
		int checkAreas[][] = splitDigits(existenceOfCheckAreas, this.numberOfStandards);
		int policies[][] = splitDigits(existenceOfPolicy, this.numberOfTechnologies);
		int securityControls[][] = splitDigits(existenceOfSecurityControl, this.numberOfTechnologies);

		// calculate complianceWithVendorBestPractices_VBP
		this.complianceWithVendorBestPractices_VBP = 0;
		this.complianceWithBestPracticesForEachPolicy_VBPP = new double[this.numberOfPolicies];
		for (int i = 0; i < this.numberOfPolicies; i++) {
			for (int j = 0; j < bestPractices[i].length; j++)
				this.complianceWithBestPracticesForEachPolicy_VBPP[i] += bestPractices[i][j]
						* this.VBPP_AttributesWeights[j];

			this.complianceWithVendorBestPractices_VBP += this.complianceWithBestPracticesForEachPolicy_VBPP[i]
					* this.VBP_AttributesWeights[i];
		}

		// calculate complianceWithIndustryDefinedConfiguration_SIC

		this.complianceWithIndustryDefinedConfiguration_SIC = 0;
		this.complianceWithIndustryDefConfForEachPolicy_SICP = new double[this.numberOfPolicies];
		for (int i = 0; i < this.numberOfPolicies; i++) {
			for (int j = 0; j < securityDefinitions[i].length; j++)
				this.complianceWithIndustryDefConfForEachPolicy_SICP[i] += securityDefinitions[i][j]
						* this.SICP_AttributesWeights[j];

			this.complianceWithIndustryDefinedConfiguration_SIC += this.complianceWithIndustryDefConfForEachPolicy_SICP[i]
					* this.SIC_AttributesWeights[i];
		}

		// calculate complianceWithAllSecurityStandards_SS

		this.complianceWithAllSecurityStandards_SS = 0;
		this.complianceWithEachSecurityStandard_CSS = new double[this.numberOfStandards];
		for (int i = 0; i < this.numberOfStandards; i++) {
			for (int j = 0; j < checkAreas[i].length; j++)
				this.complianceWithEachSecurityStandard_CSS[i] += checkAreas[i][j] * this.CSS_AttributesWeiths[j];

			this.complianceWithAllSecurityStandards_SS += this.complianceWithEachSecurityStandard_CSS[i]
					* this.SS_AttributesWeights[i];
		}

		// calculate totalSecurityPoliciesInPlace_SP

		this.totalSecurityPoliciesInPlace_SP = 0;
		this.policiesInPlaceForEachTechnology_P = new double[this.numberOfTechnologies];
		for (int i = 0; i < this.numberOfTechnologies; i++) {
			for (int j = 0; j < policies[i].length; j++)
				this.policiesInPlaceForEachTechnology_P[i] += policies[i][j] * this.P_AttributesWeights[j];

			this.totalSecurityPoliciesInPlace_SP += this.policiesInPlaceForEachTechnology_P[i]
					* this.SP_AttributesWeights[i];
		}

		// calculate totalSecurityCoverage_SC
		this.totalSecurityCoverage_SC = 0;
		this.securityCoverageOfEachTechnology_SCT = new double[this.numberOfTechnologies];
		for (int i = 0; i < this.numberOfTechnologies; i++) {
			for (int j = 0; j < securityControls[i].length; j++)
				this.securityCoverageOfEachTechnology_SCT[i] += securityControls[i][j] * this.SCT_AttributesWeights[j];

			this.totalSecurityCoverage_SC += this.securityCoverageOfEachTechnology_SCT[i]
					* this.SC_AttributesWeights[i];
		}

		// calculate availabilityLevel_A
		this.availabilityLevel_A = this.totalSecurityCoverage_SC * this.A_AttributesWeights[0]
				+ this.complianceWithIndustryDefinedConfiguration_SIC * this.A_AttributesWeights[1]
				+ this.complianceWithVendorBestPractices_VBP * this.A_AttributesWeights[2];

		// calculate integrityLevel_I;
		this.integrityLevel_I = this.complianceWithAllSecurityStandards_SS;

		// calculate confidentialityLevel_C;
		// C_AttributesWeights
		this.confidentialityLevel_C = this.totalSecurityCoverage_SC * this.C_AttributesWeights[0]
				+ this.totalSecurityPoliciesInPlace_SP * this.C_AttributesWeights[1];

		// calculate final score
		// S_AttributesWeights
		this.score = this.availabilityLevel_A * S_AttributesWeights[0] + this.integrityLevel_I * S_AttributesWeights[1]
				+ this.confidentialityLevel_C * S_AttributesWeights[2];
	}

	private static int[][] splitDigits(double num, int numberOfPolicies) {
		long number = (long) num;
		int length = String.valueOf(number).length();
		System.out.println(number + " " + length);
		int[][] digits = new int[numberOfPolicies][length / numberOfPolicies];
		int l = 0;
		int nop = 0;
		while (number > 0) {
			digits[nop][l++] = (int) (number % 10);
			number = number / 10;

			if (l == length / numberOfPolicies) {
				l = 0;
				nop++;
			}
		}
		return digits;
	}

}
