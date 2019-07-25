package eubr.atmosphere.tma.data;

import java.util.ArrayList;
import java.util.List;

public class Plan {
        
    private Integer planId;
    private int metricId;   // TODO: Metric is related with action (remove it)
    private int qualityModelId;
    private long valueTime;  // change name to createdTime
    private PlanStatus status;  // change name to planStatus
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

    public PlanStatus getStatus() {
        return status;
    }

    public void setStatus(PlanStatus status) {
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
