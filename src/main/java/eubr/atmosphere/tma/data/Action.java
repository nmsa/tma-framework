package eubr.atmosphere.tma.data;

import java.util.ArrayList;
import java.util.List;

public class Action {

    private String actionName;
    private int resourceId;
    private List<Configuration> configurationList;

    public Action(String action, int resourceId) {
        this.actionName = action;
        this.resourceId = resourceId;
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

    public List<Configuration> getConfigurationList() {
        return configurationList;
    }

    public void addConfiguration(Configuration configuration) {
        this.configurationList.add(configuration);
    }
}
