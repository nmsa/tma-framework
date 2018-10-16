package eubr.atmosphere.tma.data;

public class Actuator {

    private int actuatorId;
    private String address;
    private byte[] pubKey;

    public Actuator(int actuatorId, String address, byte[] pubKey) {
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

    public byte[] getPubKey() {
        return pubKey;
    }

    public void setPubKey(byte[] pubKey) {
        this.pubKey = pubKey;
    }

    @Override
    public String toString() {
        return "Actuator [actuatorId: " + this.getActuatorId() +
              ", address: " + this.getAddress() + "]";
    }
}
