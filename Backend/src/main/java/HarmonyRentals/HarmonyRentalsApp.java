package HarmonyRentals;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HarmonyRentalsApp {
	public static final String endpoint = "http://localhost:5173";

	public static void main(String[] args) {

		SpringApplication.run(HarmonyRentalsApp.class, args);
	}

}
