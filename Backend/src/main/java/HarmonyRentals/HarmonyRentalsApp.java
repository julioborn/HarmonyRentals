package HarmonyRentals;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HarmonyRentalsApp {
	public static final String endpoint = "http://buckets3-harmonyrentals-front.s3-website.us-east-2.amazonaws.com/";
	public static final String urlLocalObackend = "3.145.94.82";
	//cambiar urlLocalObackend por "localhost" en caso de correr en forma local.
	//cambiar urlLocalObackend por "3.145.94.82" en caso de correr en bucket.
	//esto modifica linea 41 en AuthenticationService.

	public static void main(String[] args) {

		SpringApplication.run(HarmonyRentalsApp.class, args);
	}

}
