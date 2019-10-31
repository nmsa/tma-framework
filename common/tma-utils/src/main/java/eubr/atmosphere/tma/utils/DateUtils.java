package eubr.atmosphere.tma.utils;

import java.util.Calendar;
import java.util.Date;

/**
 * Useful methods for calculations related to Date
 * @author JorgeLuiz
 */
public class DateUtils {

	private static final DateUtils INSTANCE = new DateUtils();
	
	private DateUtils() {}
	
	public static DateUtils getInstance() {
		return INSTANCE;
	}
	
	public boolean isSameTime(Date d1, Date d2) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(d1);
		int d1Hrs = calendar.get(Calendar.HOUR_OF_DAY);
		int d1Min = calendar.get(Calendar.MINUTE);
		int d1Sec = calendar.get(Calendar.SECOND);
		
		calendar.setTime(d2);
		int d2Hrs = calendar.get(Calendar.HOUR_OF_DAY);
		int d2Min = calendar.get(Calendar.MINUTE);
		int d2Sec = calendar.get(Calendar.SECOND);
		
		return d1Hrs == d2Hrs && d1Min == d2Min && d1Sec == d2Sec;
	}
	
}
