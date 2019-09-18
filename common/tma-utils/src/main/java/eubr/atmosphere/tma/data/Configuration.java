package eubr.atmosphere.tma.data;

public class Configuration {

    private String keyName;
    private String value; // This field is different from the one of the database
    private int configurationId;

    public Configuration(int configurationId, String keyName, String value) {
        this.configurationId = configurationId;
        this.keyName = keyName;
        this.value = value;
    }

    public int getConfigurationId() {
        return configurationId;
    }

    public void setConfigurationId(int configurationId) {
        this.configurationId = configurationId;
    }

    public String getKeyName() {
        return keyName;
    }

    public void setKeyName(String keyName) {
        this.keyName = keyName;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}