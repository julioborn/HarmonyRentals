package HarmonyRentals.Exceptions;

public class RentalDateConflictException extends RuntimeException {
    public RentalDateConflictException(String message) {
        super(message);
    }
}
