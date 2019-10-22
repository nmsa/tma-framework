package eubr.atmosphere.tma.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DatabaseManager {
    private static Connection connection = null;
    private Statement statement = null;
    private ResultSet resultSet = null;

    private static final Logger LOGGER = LoggerFactory.getLogger(DatabaseManager.class);

    public static Connection getConnectionInstance() {
        // This will load the MySQL driver, each DB has its own driver
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        // Setup the connection with the DB
        try {
            if ((connection == null) || connection.isClosed()) {
            	connection = DriverManager
                        .getConnection("jdbc:mysql://mysql-0.mysql.default.svc.cluster.local:3306/knowledge?"
                                + "user=root&password=passtobereplaced");
            }
        } catch (SQLException e) {
            LOGGER.error(e.getMessage());
        }
        return connection;
    }
    
    public static Connection getConnectionInstanceSqlite() {
        // SQLite connection string
        String url = "jdbc:sqlite:/Users/josealexandredabruzzopereira/"
                + "Projects/tma-framework-k/development/TMA-Admin/sqlite/db/"
                + "adminDatabase";

        try {
            if ((connection == null) || connection.isClosed()) {
                connection = DriverManager.getConnection(url);
            }
        } catch (SQLException e) {
            LOGGER.error(e.getMessage());
        }

        return connection;
    }

    public static ResultSet executeQuery(String sql) {
        Connection conn = getConnectionInstance();
        Statement stmt;
        ResultSet rs = null;
        try {
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
        } catch (SQLException e) {
            LOGGER.error(e.getMessage());
        }
        return rs;
    }

    public static ResultSet executeQuery(PreparedStatement ps) {
        ResultSet rs = null;
        try {
            rs = ps.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rs;
    }

    public void close() {
        try {
            if (resultSet != null) {
                resultSet.close();
            }

            if (statement != null) {
                statement.close();
            }

            if (connection != null && !connection.isClosed()) {
                connection.close();
            }
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
    }

    public int execute(PreparedStatement ps) {
        int key = -1;
        try {
            ps.execute();
            ResultSet generatedKeys = ps.getGeneratedKeys();
            if (generatedKeys.next()) {
                key = generatedKeys.getInt(1);
            }
        } catch (SQLException e) {
            LOGGER.error(e.getMessage());
        }
        return key;
    }
}
