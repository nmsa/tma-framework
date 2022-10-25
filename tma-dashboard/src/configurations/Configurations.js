export default function Configurations() {
    const API_IP_ADDRESS = "192.168.1.68" //"10.3.3.68"
    const API_PORT = "8080"

    const configData = {
        "API_BASE_URL": "http://" + API_IP_ADDRESS + ":" + API_PORT + "/",
    }

    return configData;
}