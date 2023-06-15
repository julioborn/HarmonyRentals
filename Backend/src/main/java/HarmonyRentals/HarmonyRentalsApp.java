package HarmonyRentals;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HarmonyRentalsApp {
	public static final String endpoint = "http://buckets3-harmonyrentals-front.s3-website.us-east-2.amazonaws.com";

	public static void main(String[] args) {

		SpringApplication.run(HarmonyRentalsApp.class, args);
	}

}
