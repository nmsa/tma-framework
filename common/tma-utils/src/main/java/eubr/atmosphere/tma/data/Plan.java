package eubr.atmosphere.tma.data;

import java.util.ArrayList;
import java.util.List;

public class Plan {

    // Maybe this class will need to be moved to tma-utils
    
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
    
    private Integer planId;
    private int metricId;
    private long valueTime;
    private STATUS status;
    private List<ActionPlan> actionList;
    private int resourceId;

    public Plan() {
        super();
        this.actionList = new ArrayList<ActionPlan>();
    }
    
    public Integer getPlanId() {
        return planId;
    }

    public void setPlanId(Integer planId) {
        this.planId = planId;
    }

    public int getMetricId() {
        return metricId;
    }

    public void setMetricId(int metricId) {
        this.metricId = metricId;
    }

    public STATUS getStatus() {
        return status;
    }

    public void setStatus(STATUS status) {
        this.status = status;
    }

    public long getValueTime() {
        return valueTime;
    }

    public void setValueTime(long valueTime) {
        this.valueTime = valueTime;
    }

    public List<ActionPlan> getActionList() {
        return actionList;
    }

    public void addAction(ActionPlan action) {
        this.actionList.add(action);
    }
    
    public int getResourceId() {
        return resourceId;
    }

    public void setResourceId(int resourceId) {
        this.resourceId = resourceId;
    }
}
