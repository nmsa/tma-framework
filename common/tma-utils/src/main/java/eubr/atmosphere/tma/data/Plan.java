package eubr.atmosphere.tma.data;

import java.util.ArrayList;
import java.util.List;

import eubr.atmosphere.tma.data.ActionPlan.STATUS;

public class Plan {
        
    private Integer planId;
    private int metricId;
    private int qualityModelId;
    private long valueTime;
    private STATUS status;
    private List<ActionPlan> actionList;

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

    public int getQualityModelId() {
        return qualityModelId;
    }

    public void setQualityModelId(int qualityModelId) {
        this.qualityModelId = qualityModelId;
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
}
