package eubr.atmosphere.tma.data;

import java.util.ArrayList;
import java.util.List;

public class Action {

    private String actionName;
    private int resourceId;
    private int actuatorId;
    private List<Configuration> configurationList;

    public Action(String action, int resourceId, int actuatorId) {
        this.actionName = action;
        this.resourceId = resourceId;
        this.actuatorId = actuatorId;
        this.configurationList = new ArrayList<Configuration>();
    }

    public String getAction() {
        return actionName;
    }

    public void setAction(String action) {
        this.actionName = action;
    }

    public int getResourceId() {
        return resourceId;
    }

    public void setResourceId(int resourceId) {
        this.resourceId = resourceId;
    }

    public int getActuatorId() {
        return actuatorId;
    }

    public void setActuatorId(int actuatorId) {
        this.actuatorId = actuatorId;
    }

    public List<Configuration> getConfigurationList() {
        return configurationList;
    }

    public void addConfiguration(Configuration configuration) {
        this.configurationList.add(configuration);
    }
}
