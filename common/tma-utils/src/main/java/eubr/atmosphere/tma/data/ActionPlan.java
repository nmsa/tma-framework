package eubr.atmosphere.tma.data;

import java.util.ArrayList;
import java.util.List;

public class ActionPlan {
    
    public ActionPlan(int planId, int actionId, int executionOrder) {
        super();
        this.planId = planId;
        this.actionId = actionId;
        this.executionOrder = executionOrder;
        this.configurationList = new ArrayList<ConfigurationData>();
    }

    public enum STATUS {
        TO_DO,
        IN_PROGRESS,
        COMPLETED;

        @Override
        public String toString() {
            return Integer.toString(ordinal());
        }

        public static STATUS valueOf(int ordinal) {
            return (ordinal < values().length) ? values()[ordinal]
                    : COMPLETED;
        }
    }

    private int planId;
    private int actionId;
    private int executionOrder;
    private STATUS status;
    private List<ConfigurationData> configurationList;

    public int getPlanId() {
        return planId;
    }

    public void setPlanId(int planId) {
        this.planId = planId;
    }

    public int getActionId() {
        return actionId;
    }

    public void setActionId(int actionId) {
        this.actionId = actionId;
    }

    public int getExecutionOrder() {
        return executionOrder;
    }

    public void setExecutionOrder(int executionOrder) {
        this.executionOrder = executionOrder;
    }

    public STATUS getStatus() {
        return status;
    }

    public void setStatus(STATUS status) {
        this.status = status;
    }

    public List<ConfigurationData> getConfigurationList() {
        return configurationList;
    }

    public void addConfiguration(ConfigurationData configuration) {
        this.configurationList.add(configuration);
    }
}