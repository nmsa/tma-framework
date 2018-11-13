package eubr.atmosphere.tma.utils;

public class Score {

    public Score() {
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
    private long timestamp;

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

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "Score [cpuPod: " + this.getCpuPod() +
              ", memoryPod: " + this.getMemoryPod() +
              ", cpuNode: " + this.getCpuNode() +
              ", memoryNode: " + this.getMemoryNode() +
              ", timestamp: " + this.getTimestamp() + "]";
    }

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
}
