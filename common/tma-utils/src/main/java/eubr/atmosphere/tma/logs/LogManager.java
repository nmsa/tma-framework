package eubr.atmosphere.tma.logs;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import eubr.atmosphere.tma.database.DatabaseManager;
import java.sql.Types;

public class LogManager {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(LogManager.class);

    
    public static int insertLog(String origin, int originId, String description, String previousValue, String newValue, String component, int logGroupId, String target, int targetId) {
        String sql =
                "INSERT INTO logs(logTime, origin,originId,description,previousValue,newValue,component,logGroupId,target,targetId) VALUES (FROM_UNIXTIME(?), ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        PreparedStatement ps;

        DatabaseManager databaseManager = new DatabaseManager();

        try {
            ps = databaseManager.getConnectionInstance().prepareStatement(
                    sql, Statement.RETURN_GENERATED_KEYS);
            
            ps.setLong(1, Instant.now().getEpochSecond());
            ps.setString(2, origin);
            
            //check if originId is not null
            if(originId == -1)
                ps.setNull(3, Types.INTEGER);
            else
                ps.setInt(3, originId);
            
            if(description == null)
                ps.setNull(4, Types.VARCHAR);
            else
                ps.setString(4,description);
            
            ps.setString(5,previousValue);
            ps.setString(6,newValue);
            ps.setString(7,component);
            
            //check if logGroupId is not null
            if(logGroupId == -1)
                ps.setNull(8, Types.INTEGER);
            else
                ps.setInt(8,logGroupId);
            
            ps.setString(9,target);
            
            //check if targetId is not null
            if(targetId == -1)
                ps.setNull(10, Types.INTEGER);
            else
                ps.setInt(10,targetId);
            
            return databaseManager.execute(ps);
        
        } catch (SQLException e) {
            //In case connection to the database is not available, use Logger to have some kind of debug
            Logger LOGGER = LoggerFactory.getLogger(LogManager.class);
            LOGGER.error("[ATMOSPHERE] Error when inserting a Log in the database.", e);
        }
        return -1;
    }

}
