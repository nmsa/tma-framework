package eubr.atmosphere.tma.data;

public enum PlanStatus {

    TO_DO,
    IN_PROGRESS,
    COMPLETED;
    
    @Override
    public String toString() {
        return Integer.toString(ordinal());
    }

    public static PlanStatus valueOf(int ordinal) {
        return (ordinal < values().length) ? values()[ordinal]
                : COMPLETED;
    }
	
}
