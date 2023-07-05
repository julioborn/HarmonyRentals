package HarmonyRentals;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HarmonyRentalsApp {
	public static final String endpoint = "http://localhost:5173";
	public static final String urlLocalObackend = "localhost";
	//cambiar urlLocalObackend por "localhost" en caso de correr en forma local.
	//cambiar urlLocalObackend por "3.145.94.82" en caso de correr en bucket.
	//esto modifica linea 41 en AuthenticationService.

	public static void main(String[] args) {

		SpringApplication.run(HarmonyRentalsApp.class, args);
	}

}
