package eubr.atmosphere.tma.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import eubr.atmosphere.tma.entity.qualitymodel.Data;
import eubr.atmosphere.tma.entity.qualitymodel.DataPK;
import eubr.atmosphere.tma.entity.qualitymodel.MetricData;
import eubr.atmosphere.tma.entity.qualitymodel.MetricDataPK;

public class QualityModelManager {

	private static final Logger LOGGER = LoggerFactory.getLogger(QualityModelManager.class);

	public int saveMetricData(MetricData metricData) {
		String sql = "INSERT INTO MetricData(id, resourceId, value) VALUES (?, ?, ?)";
		PreparedStatement ps;
		try {
			ps = DatabaseManager.getConnectionInstance().prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			MetricDataPK metricDataPK = new MetricDataPK();
			metricDataPK.setMetricId(metricData.getId().getMetricId());
			metricDataPK.setValueTime(metricData.getId().getValueTime());
			ps.setObject(1, metricDataPK);
			ps.setInt(2, metricData.getResourceId());
			ps.setDouble(3, metricData.getValue());
			DatabaseManager databaseManager = new DatabaseManager();
			return databaseManager.execute(ps);
		} catch (SQLException e) {
			LOGGER.error("[ATMOSPHERE] Error when inserting MetricData in the database.", e);
		}
		return -1;
	}
	
	public List<Data> getLimitedDataListByIdAndTimestamp(Integer descriptionId, Date date) {

		List<Data> dataList = new ArrayList<>();
		PreparedStatement ps = null;
		String sql = "SELECT d.probeId, d.descriptionId, d.resourceId, d.valueTime, d.value FROM Data d WHERE d.descriptionId = ? and d.valueTime = ?";

		try {

			ps = DatabaseManager.getConnectionInstance().prepareStatement(sql);
			ps.setInt(1, descriptionId);
			ps.setTimestamp(2, new Timestamp(date.getTime()));

			ResultSet rs = DatabaseManager.executeQuery(ps);
			if (rs.next()) {

				Data data = new Data();
				DataPK dataPK = new DataPK();
				dataPK.setProbeId(rs.getInt("probeId"));
				dataPK.setDescriptionId(rs.getInt("descriptionId"));
				dataPK.setResourceId(rs.getInt("resourceId"));
				dataPK.setValueTime(rs.getDate("valueTime"));
				data.setId(dataPK);
				data.setValue(rs.getDouble("value"));

				dataList.add(data);

			}

			return dataList;
		} catch (SQLException e) {
			LOGGER.error("[ATMOSPHERE] Error when getting Data list by ID and Timestamp.", e);
		}

		return null;
	}

}
