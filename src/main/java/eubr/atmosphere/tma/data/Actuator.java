package eubr.atmosphere.tma.data;

public class Actuator {

    private int actuatorId;
    private String address;
    private String pubKey;

    public Actuator(int actuatorId, String address, String pubKey) {
        super();
        this.actuatorId = actuatorId;
        this.address = address;
        this.pubKey = pubKey;
    }

    public int getActuatorId() {
        return actuatorId;
    }

    public void setActuatorId(int actuatorId) {
        this.actuatorId = actuatorId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPubKey() {
        return pubKey;
    }

    public void setPubKey(String pubKey) {
        this.pubKey = pubKey;
    }

    @Override
    public String toString() {
        return "Actuator [actuatorId: " + this.getActuatorId() +
              ", address: " + this.getAddress() + "]";
    }
}
