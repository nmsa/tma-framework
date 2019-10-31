package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the ActionPlan database table.
 * 
 */
@Entity
@NamedQuery(name="ActionPlan.findAll", query="SELECT a FROM ActionPlan a")
public class ActionPlan implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private ActionPlanPK id;

	private int executionOrder;

	private int status;

	public ActionPlan() {
	}

	public ActionPlanPK getId() {
		return this.id;
	}

	public void setId(ActionPlanPK id) {
		this.id = id;
	}

	public int getExecutionOrder() {
		return this.executionOrder;
	}

	public void setExecutionOrder(int executionOrder) {
		this.executionOrder = executionOrder;
	}

	public int getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

}