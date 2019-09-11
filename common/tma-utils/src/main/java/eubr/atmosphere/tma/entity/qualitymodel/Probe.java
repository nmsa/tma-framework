package eubr.atmosphere.tma.entity.qualitymodel;

import java.io.Serializable;
import javax.persistence.*;
import java.sql.Timestamp;


/**
 * The persistent class for the Probe database table.
 * 
 */
@Entity
@NamedQuery(name="Probe.findAll", query="SELECT p FROM Probe p")
public class Probe implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int probeId;

	private String password;

	private String probeName;

	private String salt;

	private String token;

	private Timestamp tokenExpiration;

	public Probe() {
	}

	public int getProbeId() {
		return this.probeId;
	}

	public void setProbeId(int probeId) {
		this.probeId = probeId;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getProbeName() {
		return this.probeName;
	}

	public void setProbeName(String probeName) {
		this.probeName = probeName;
	}

	public String getSalt() {
		return this.salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public String getToken() {
		return this.token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Timestamp getTokenExpiration() {
		return this.tokenExpiration;
	}

	public void setTokenExpiration(Timestamp tokenExpiration) {
		this.tokenExpiration = tokenExpiration;
	}

}