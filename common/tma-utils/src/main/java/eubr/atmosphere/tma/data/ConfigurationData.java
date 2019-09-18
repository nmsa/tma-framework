package eubr.atmosphere.tma.data;

public class ConfigurationData {

    private int configurationId;
    private String value;

    public ConfigurationData(int configurationId, String value) {
        this.configurationId = configurationId;
        this.value = value;
    }

    public int getConfigurationId() {
        return configurationId;
    }

    public void setConfigurationId(int configurationId) {
        this.configurationId = configurationId;
    }
    
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}