package eubr.atmosphere.tma.utils;

public class ResourceConsumptionScore implements Score {

    public ResourceConsumptionScore() {
        super();
        this.cpuPod = 0.0;
        this.memoryPod = 0.0;
        this.cpuNode = 0.0;
        this.memoryNode = 0.0;
    }

    private Double cpuPod;
    private Double memoryPod;
    private Double cpuNode;
    private Double memoryNode;
    private Double score;
    private int metricId;
    private int resourceId;
    private long valueTime;

    public Double getCpuPod() {
        return cpuPod;
    }

    public void setCpuPod(Double cpuPod) {
        this.cpuPod = cpuPod;
    }

    public Double getMemoryPod() {
        return memoryPod;
    }

    public void setMemoryPod(Double memoryPod) {
        this.memoryPod = memoryPod;
    }

    public Double getCpuNode() {
        return cpuNode;
    }

    public void setCpuNode(Double cpuNode) {
        this.cpuNode = cpuNode;
    }

    public Double getMemoryNode() {
        return memoryNode;
    }

    public void setMemoryNode(Double memoryNode) {
        this.memoryNode = memoryNode;
    }

    @Override
    public String toString() {
        return "Score [cpuPod: " + this.getCpuPod() +
              ", memoryPod: " + this.getMemoryPod() +
              ", cpuNode: " + this.getCpuNode() +
              ", memoryNode: " + this.getMemoryNode() + "]";
    }

    @Override
    public Double getScore() {
        if (this.getCpuNode() == 0 || this.getMemoryNode() == 0)
            return 0.0;
        Double a1 = this.getCpuPod() / this.getCpuNode();
        Double a2 = this.getMemoryPod() / this.getMemoryNode();
        this.score = 0.65 * a1 + 0.35 * a2;

        return this.score;
    }

    public String getCsvLine() {
        return this.getCpuPod().toString() +
            "," + this.getMemoryPod().toString() +
            "," + this.getCpuNode().toString() +
            "," + this.getMemoryNode().toString() +
            "," + this.getScore().toString();
    }

    public boolean isValid() {
         return this.getCpuNode()!= null && this.getCpuPod()!= null &&
                 this.getMemoryNode()!= null && this.getMemoryPod()!= null;
    }

	@Override
	public long getValueTime() {
		return this.valueTime;
	}

	public void setValueTime(long valueTime) {
		this.valueTime = valueTime;
	}

	@Override
	public int getResourceId() {
		return this.resourceId;
	}

	public void setResourceId(int resourceId) {
		this.resourceId = resourceId;
	}
	
	@Override
	public int getMetricId() {
		return this.metricId;
	}

	public void setMetricId(int metricId) {
		this.metricId = metricId;
	}
}
