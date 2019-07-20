package eubr.atmosphere.tma.utils;

/**
 * Message format to be sent to execute component 
 * 
 * @author JorgeLuiz
 */
public class MessageExecute {

	private Integer resourceId;
	private String actionName;
	private Integer actuatorId;
	private PrivacyScore configuration;
	
	public MessageExecute(Integer resourceId, String actionName, Integer actuatorId,
			PrivacyScore configuration) {
		super();
		this.resourceId = resourceId;
		this.actionName = actionName;
		this.actuatorId = actuatorId;
		this.configuration = configuration;
	}
	
	public Integer getResourceId() {
		return resourceId;
	}
	public void setResourceId(Integer resourceId) {
		this.resourceId = resourceId;
	}
	public String getActionName() {
		return actionName;
	}
	public void setActionName(String actionName) {
		this.actionName = actionName;
	}
    public Integer getActuatorId() {
    	return this.actuatorId;
    }
	public void setActuatorId(Integer actuatorId) {
		this.actuatorId = actuatorId;
	}
	public PrivacyScore getConfiguration() {
		return configuration;
	}
	public void setConfiguration(PrivacyScore configuration) {
		this.configuration = configuration;
	}	
}
