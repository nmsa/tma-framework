package eubr.atmosphere.tma.utils;

import java.util.List;

import eubr.atmosphere.tma.data.Configuration;

/**
 * Message format to be sent to execute component 
 * 
 * @author JorgeLuiz
 */
public class MessageExecute {

	private String action;
	private Integer resourceId;
	private Integer messageId;
	private long timestamp;
	private List<Configuration> configuration;
	
	public MessageExecute(String action, Integer resourceId, Integer messageId, long timestamp,
			List<Configuration> configuration) {
		super();
		this.action = action;
		this.resourceId = resourceId;
		this.messageId = messageId;
		this.timestamp = timestamp;
		this.configuration = configuration;
	}
	
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public Integer getResourceId() {
		return resourceId;
	}
	public void setResourceId(Integer resourceId) {
		this.resourceId = resourceId;
	}
	public Integer getMessageId() {
		return messageId;
	}
	public void setMessageId(Integer messageId) {
		this.messageId = messageId;
	}
	public long getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}
	public List<Configuration> getConfiguration() {
		return configuration;
	}
	public void setConfiguration(List<Configuration> configuration) {
		this.configuration = configuration;
	}	
	
}
